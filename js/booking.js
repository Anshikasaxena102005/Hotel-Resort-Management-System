/**
 * AURAVEIL RESORT & SPA — Booking Module JavaScript
 * Handles:
 * 1. Navbar scroll states and mobile drawer toggle
 * 2. URL search parameters (?room=... & ?package=...)
 * 3. 8 individual room catalog entries mapped to canonical Rooms module slugs
 * 4. Date constraints & validation (no past dates, checkout > checkin, local timezone parsing)
 * 5. Guest count constraints & validation (adults >= 1, children >= 0, capacity checks)
 * 6. Dynamic live booking summary & demo price calculation (room.rate * nights)
 * 7. Accessible form validation with clear real-time error feedback
 * 8. Polished demo confirmation modal
 */

(function () {
  'use strict';

  // --- 8 INDIVIDUAL ROOMS CATALOG (Source of truth: Rooms module) ---
  const ROOM_CATALOG = {
    'deluxe-suite': {
      id: 'deluxe-suite',
      name: 'Deluxe Garden Suite',
      rate: 28500,
      image: 'assets/images/room-deluxe-suite.jpg',
      maxGuests: 3,
      desc: 'Marble floors, a signature king canopy bed, and private stone terrace opening onto manicured gardens.'
    },
    'premier-ocean-suite': {
      id: 'premier-ocean-suite',
      name: 'Premier Ocean Suite',
      rate: 36000,
      image: 'assets/images/room-premier-ocean-suite.jpg',
      maxGuests: 3,
      desc: 'Elevated sea views with an open-plan lounge, sun-drenched private balcony, and freestanding soaking tub.'
    },
    'heritage-courtyard-suite': {
      id: 'heritage-courtyard-suite',
      name: 'Heritage Courtyard Suite',
      rate: 32000,
      image: 'assets/images/room-heritage-suite.jpg',
      maxGuests: 3,
      desc: 'Inspired by Indo-Portuguese architecture with arched verandas, terracotta tiles, and a shaded private courtyard.'
    },
    'garden-villa': {
      id: 'garden-villa',
      name: 'Tropical Garden Villa',
      rate: 58000,
      image: 'assets/images/room-garden-villa.jpg',
      maxGuests: 4,
      desc: 'A secluded botanical sanctuary enclosed by limestone walls with alfresco stone soaking tub and private sun deck.'
    },
    'private-pool-villa': {
      id: 'private-pool-villa',
      name: 'Private Pool Villa',
      rate: 72000,
      image: 'assets/images/room-pool-villa.jpg',
      maxGuests: 4,
      desc: 'Ultimate seclusion featuring your own turquoise plunge pool, shaded poolside cabana, and outdoor rain shower.'
    },
    'royal-beachfront-villa': {
      id: 'royal-beachfront-villa',
      name: 'Royal Beachfront Villa',
      rate: 84000,
      image: 'assets/images/room-beachfront-villa.jpg',
      maxGuests: 5,
      desc: 'Steps from pristine sands with direct private beach access, dual master bedrooms, and an expansive timber deck.'
    },
    'presidential-penthouse': {
      id: 'presidential-penthouse',
      name: 'Presidential Penthouse',
      rate: 95000,
      image: 'assets/images/room-penthouse.jpg',
      maxGuests: 5,
      desc: '320° panoramic ocean views, private rooftop plunge pool, dedicated elevator, and personalized chef service.'
    },
    'royal-horizon-penthouse': {
      id: 'royal-horizon-penthouse',
      name: 'Royal Horizon Penthouse',
      rate: 125000,
      image: 'assets/images/room-royal-horizon-penthouse.jpg',
      maxGuests: 7,
      desc: 'The grandest residence in the resort spanning 320 m² with three master bedrooms, infinity sky pool, and private cellar.'
    }
  };

  // Canonical slug aliases for resilient navigation
  const ROOM_ALIASES = {
    'deluxe-suite': 'deluxe-suite',
    'premier-ocean-suite': 'premier-ocean-suite',
    'heritage-courtyard-suite': 'heritage-courtyard-suite',
    'garden-villa': 'garden-villa',
    'private-pool-villa': 'private-pool-villa',
    'royal-beachfront-villa': 'royal-beachfront-villa',
    'presidential-penthouse': 'presidential-penthouse',
    'royal-horizon-penthouse': 'royal-horizon-penthouse',

    // Compatible shorthand & legacy aliases
    'deluxe': 'deluxe-suite',
    'deluxe-room': 'deluxe-suite',
    'deluxe-garden-suite': 'deluxe-suite',
    'garden-suite': 'deluxe-suite',

    'ocean-suite': 'premier-ocean-suite',
    'premier-suite': 'premier-ocean-suite',

    'heritage-suite': 'heritage-courtyard-suite',
    'courtyard-suite': 'heritage-courtyard-suite',

    'villa': 'garden-villa',
    'tropical-garden-villa': 'garden-villa',

    'pool-villa': 'private-pool-villa',

    'beachfront-villa': 'royal-beachfront-villa',

    'penthouse': 'presidential-penthouse',
    'penthouse-collection': 'presidential-penthouse',
    'luxury-suite': 'presidential-penthouse',

    'horizon-penthouse': 'royal-horizon-penthouse',
    'grand-penthouse': 'royal-horizon-penthouse'
  };

  const PACKAGES = {
    romance: {
      name: 'Eternal Twilight Escape (Romance)',
      tag: 'Romance Package',
      description: 'Private candlelit beach dinner, couples spa journey & champagne welcome.'
    },
    wellness: {
      name: 'The Renewal Retreat (Wellness)',
      tag: 'Wellness Package',
      description: 'Daily sunrise yoga, personalized Ayurveda spa therapies & organic dining.'
    },
    adventure: {
      name: 'Island Explorer Edition (Adventure)',
      tag: 'Adventure Package',
      description: 'Private reef snorkeling, mangrove kayak safari & sunset treetop cocktails.'
    }
  };

  // --- DOM ELEMENTS ---
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');

  const bookingForm = document.getElementById('booking-form');
  const guestName = document.getElementById('guest-name');
  const guestEmail = document.getElementById('guest-email');
  const guestPhone = document.getElementById('guest-phone');
  const checkInInput = document.getElementById('check-in');
  const checkOutInput = document.getElementById('check-out');
  const adultsInput = document.getElementById('adults-count');
  const childrenInput = document.getElementById('children-count');
  const roomCategorySelect = document.getElementById('room-category');
  const packageSelect = document.getElementById('curated-package');
  const specialRequests = document.getElementById('special-requests');
  const packageHighlight = document.getElementById('package-highlight');

  // Summary Elements
  const summaryRoomImg = document.getElementById('summary-room-img');
  const summaryRoomName = document.getElementById('summary-room-name');
  const summaryDates = document.getElementById('summary-dates');
  const summaryNights = document.getElementById('summary-nights');
  const summaryGuests = document.getElementById('summary-guests');
  const summaryPackageRow = document.getElementById('summary-package-row');
  const summaryPackageValue = document.getElementById('summary-package-value');
  const summaryRatePerNight = document.getElementById('summary-rate-per-night');
  const summarySubtotal = document.getElementById('summary-subtotal');
  const summaryTotal = document.getElementById('summary-total');

  // Confirmation Elements
  const confirmationOverlay = document.getElementById('confirmation-overlay');
  const confirmationCloseBtn = document.getElementById('confirmation-close-btn');
  const confirmationBookAnotherBtn = document.getElementById('confirmation-book-another-btn');
  const confirmRefId = document.getElementById('confirm-ref-id');
  const confirmGuest = document.getElementById('confirm-guest');
  const confirmRoom = document.getElementById('confirm-room');
  const confirmDates = document.getElementById('confirm-dates');
  const confirmGuests = document.getElementById('confirm-guests');
  const confirmPackage = document.getElementById('confirm-package');
  const confirmTotal = document.getElementById('confirm-total');

  // --- 1. NAVBAR SCROLL & MOBILE TOGGLE ---
  function initNavbar() {
    const SCROLL_THRESHOLD = 60;
    function updateNavbar() {
      if (!navbar) return;
      if (window.scrollY > SCROLL_THRESHOLD) {
        navbar.classList.remove('navbar--transparent');
        navbar.classList.add('navbar--solid');
      } else {
        navbar.classList.remove('navbar--solid');
        navbar.classList.add('navbar--transparent');
      }
    }
    window.addEventListener('scroll', updateNavbar, { passive: true });
    updateNavbar();

    if (navToggle && navMenu) {
      navToggle.addEventListener('click', function () {
        const isOpen = navMenu.classList.toggle('is-open');
        navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        navToggle.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
        document.body.style.overflow = isOpen ? 'hidden' : '';
      });

      navMenu.querySelectorAll('.navbar__link, .btn').forEach(function (link) {
        link.addEventListener('click', function () {
          navMenu.classList.remove('is-open');
          navToggle.setAttribute('aria-expanded', 'false');
          document.body.style.overflow = '';
        });
      });
    }
  }

  // --- 2. LOCAL DATE LOGIC & CONSTRAINTS ---
  function parseLocalDate(dateStr) {
    if (!dateStr) return null;
    const parts = dateStr.split('-');
    if (parts.length !== 3) return null;
    const y = parseInt(parts[0], 10);
    const m = parseInt(parts[1], 10) - 1;
    const d = parseInt(parts[2], 10);
    return new Date(y, m, d, 0, 0, 0, 0);
  }

  function formatDateToISO(date) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }

  function addDays(date, days) {
    const result = new Date(date.getTime());
    result.setDate(result.getDate() + days);
    return result;
  }

  function initDates() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = addDays(today, 1);
    const threeDaysLater = addDays(today, 4);

    const todayISO = formatDateToISO(today);
    const tomorrowISO = formatDateToISO(tomorrow);
    const defaultCheckOutISO = formatDateToISO(threeDaysLater);

    // Check-in cannot be in the past
    checkInInput.min = todayISO;
    checkInInput.value = tomorrowISO;

    // Check-out must be at least check-in + 1 day
    checkOutInput.min = formatDateToISO(addDays(tomorrow, 1));
    checkOutInput.value = defaultCheckOutISO;

    // Listeners for date adjustments
    checkInInput.addEventListener('change', handleCheckInChange);
    checkInInput.addEventListener('input', handleCheckInChange);
    checkOutInput.addEventListener('change', handleCheckOutChange);
    checkOutInput.addEventListener('input', handleCheckOutChange);
  }

  function handleCheckInChange() {
    clearError(checkInInput);
    clearError(checkOutInput);

    if (!checkInInput.value) {
      showError(checkInInput, 'Please select a valid check-in date.');
      updateSummary();
      return;
    }

    const checkInDate = parseLocalDate(checkInInput.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (checkInDate < today) {
      showError(checkInInput, 'Check-in date cannot be in the past.');
      updateSummary();
      return;
    }

    // Set checkout minimum to checkin + 1 day
    const minCheckOut = addDays(checkInDate, 1);
    const minCheckOutISO = formatDateToISO(minCheckOut);
    checkOutInput.min = minCheckOutISO;

    // If checkout is <= checkin, bump checkout forward automatically
    const currentCheckOut = parseLocalDate(checkOutInput.value);
    if (!currentCheckOut || currentCheckOut <= checkInDate) {
      checkOutInput.value = minCheckOutISO;
    }

    updateSummary();
  }

  function handleCheckOutChange() {
    clearError(checkOutInput);

    if (!checkOutInput.value) {
      showError(checkOutInput, 'Please select a valid check-out date.');
      updateSummary();
      return;
    }

    if (checkInInput.value) {
      const checkInDate = parseLocalDate(checkInInput.value);
      const checkOutDate = parseLocalDate(checkOutInput.value);

      if (checkOutDate <= checkInDate) {
        showError(checkOutInput, 'Check-out date must be later than check-in date.');
        updateSummary();
        return;
      }
    }

    updateSummary();
  }

  // --- 3. URL QUERY PARAMETER HANDLING (room & package) ---
  function mapRoomSlug(slug) {
    if (!slug) return null;
    const cleanSlug = String(slug).trim().toLowerCase();

    // 1. Direct match in ROOM_CATALOG
    if (ROOM_CATALOG[cleanSlug]) {
      return cleanSlug;
    }

    // 2. Direct match in ROOM_ALIASES
    if (ROOM_ALIASES[cleanSlug]) {
      return ROOM_ALIASES[cleanSlug];
    }

    return null;
  }

  function parseQueryParams() {
    const params = new URLSearchParams(window.location.search);
    const roomParam = params.get('room');
    const packageParam = params.get('package');

    let selectedRoomKey = null;

    // 1. Check room query parameter
    if (roomParam) {
      const mapped = mapRoomSlug(roomParam);
      if (mapped && ROOM_CATALOG[mapped]) {
        selectedRoomKey = mapped;
      }
    }

    // 2. Check package query parameter
    if (packageParam && PACKAGES[packageParam.toLowerCase()]) {
      const pkgKey = packageParam.toLowerCase();
      packageSelect.value = pkgKey;
      displayPackageHighlight(pkgKey);

      // Apply package-based room recommendation if no explicit valid room was provided
      if (!selectedRoomKey) {
        if (pkgKey === 'romance') {
          selectedRoomKey = 'garden-villa';
        } else if (pkgKey === 'wellness') {
          selectedRoomKey = 'deluxe-suite';
        } else if (pkgKey === 'adventure') {
          selectedRoomKey = 'presidential-penthouse';
        }
      }
    } else {
      packageSelect.value = 'none';
      hidePackageHighlight();
    }

    // 3. Set room category: explicit mapped room -> package recommendation -> safe default ('deluxe-suite')
    if (selectedRoomKey && ROOM_CATALOG[selectedRoomKey]) {
      roomCategorySelect.value = selectedRoomKey;
    } else {
      // Safe default behavior
      roomCategorySelect.value = 'deluxe-suite';
    }

    // 4. Update the live booking summary immediately
    updateSummary();
  }

  function displayPackageHighlight(pkgKey) {
    if (!packageHighlight) return;
    const pkg = PACKAGES[pkgKey];
    if (pkg) {
      packageHighlight.innerHTML = `<strong>Included: ${pkg.name}</strong><br><span style="color:var(--color-charcoal-soft); font-size:0.75rem;">${pkg.description}</span>`;
      packageHighlight.classList.add('is-active');
    } else {
      packageHighlight.classList.remove('is-active');
    }
  }

  function hidePackageHighlight() {
    if (packageHighlight) {
      packageHighlight.classList.remove('is-active');
      packageHighlight.innerHTML = '';
    }
  }

  // --- 4. DYNAMIC SUMMARY & PRICING ---
  function formatCurrency(amount) {
    return '₹ ' + amount.toLocaleString('en-IN');
  }

  function updateSummary() {
    const selectedRoomKey = roomCategorySelect.value;
    const room = ROOM_CATALOG[selectedRoomKey];

    // Room info
    if (room) {
      summaryRoomName.textContent = room.name;
      summaryRoomImg.src = room.image;
      summaryRoomImg.alt = room.name;
      summaryRatePerNight.textContent = `${formatCurrency(room.rate)} / night`;
    } else {
      summaryRoomName.textContent = 'Select Room Category';
      summaryRoomImg.src = 'assets/images/hero-fallback.jpg';
      summaryRoomImg.alt = 'Auraveil Resort & Spa';
      summaryRatePerNight.textContent = '—';
    }

    // Dates & Nights
    let nights = 0;
    const inDate = parseLocalDate(checkInInput.value);
    const outDate = parseLocalDate(checkOutInput.value);

    if (inDate && outDate && outDate > inDate) {
      const diffTime = outDate.getTime() - inDate.getTime();
      nights = Math.round(diffTime / (1000 * 60 * 60 * 24));
      const inFormatted = inDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
      const outFormatted = outDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
      summaryDates.textContent = `${inFormatted} — ${outFormatted}`;
      summaryNights.textContent = `${nights} ${nights === 1 ? 'Night' : 'Nights'}`;
    } else if (inDate && outDate && outDate <= inDate) {
      summaryDates.textContent = 'Check-out must be after check-in';
      summaryNights.textContent = 'Invalid duration';
    } else {
      summaryDates.textContent = 'Select dates';
      summaryNights.textContent = '—';
    }

    // Guests
    const rawAdults = parseInt(adultsInput.value, 10);
    const rawChildren = parseInt(childrenInput.value, 10);
    const adults = (!isNaN(rawAdults) && rawAdults >= 1) ? rawAdults : null;
    const children = (!isNaN(rawChildren) && rawChildren >= 0) ? rawChildren : 0;

    if (adults !== null) {
      const guestStr = `${adults} ${adults === 1 ? 'Adult' : 'Adults'}` + (children > 0 ? `, ${children} ${children === 1 ? 'Child' : 'Children'}` : '');
      summaryGuests.textContent = guestStr;
    } else {
      summaryGuests.textContent = 'Specify guests';
    }

    // Package
    const selectedPkgKey = packageSelect.value;
    if (selectedPkgKey && PACKAGES[selectedPkgKey]) {
      summaryPackageRow.style.display = 'flex';
      summaryPackageValue.textContent = PACKAGES[selectedPkgKey].name;
      displayPackageHighlight(selectedPkgKey);
    } else {
      summaryPackageRow.style.display = 'none';
      hidePackageHighlight();
    }

    // Pricing calculation: Selected room's exact nightly rate * Number of nights
    if (room && nights > 0) {
      const baseTotal = room.rate * nights;
      summarySubtotal.textContent = formatCurrency(baseTotal);
      summaryTotal.textContent = formatCurrency(baseTotal);
    } else {
      summarySubtotal.textContent = '—';
      summaryTotal.textContent = '—';
    }
  }

  // --- 5. FIELD VALIDATION HELPERS ---
  function showError(inputEl, message) {
    inputEl.classList.add('is-invalid');
    inputEl.setAttribute('aria-invalid', 'true');
    const errorEl = document.getElementById(`${inputEl.id}-error`);
    if (errorEl) {
      errorEl.textContent = message;
    }
  }

  function clearError(inputEl) {
    inputEl.classList.remove('is-invalid');
    inputEl.removeAttribute('aria-invalid');
    const errorEl = document.getElementById(`${inputEl.id}-error`);
    if (errorEl) {
      errorEl.textContent = '';
    }
  }

  function validateEmail(email) {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
  }

  function validatePhone(phone) {
    const cleaned = phone.replace(/[\s\-\(\)\.]/g, '');
    const re = /^\+?[0-9]{7,15}$/;
    return re.test(cleaned);
  }

  // --- 6. FULL FORM VALIDATION & SUBMISSION ---
  function validateForm() {
    let isValid = true;
    let firstInvalidInput = null;

    // 1. Full Name (Required, min 2 chars)
    const nameVal = guestName.value.trim();
    if (!nameVal) {
      showError(guestName, 'Full name is required.');
      isValid = false;
      if (!firstInvalidInput) firstInvalidInput = guestName;
    } else if (nameVal.length < 2) {
      showError(guestName, 'Full name must be at least 2 characters.');
      isValid = false;
      if (!firstInvalidInput) firstInvalidInput = guestName;
    } else {
      clearError(guestName);
    }

    // 2. Email (Required, valid format)
    const emailVal = guestEmail.value.trim();
    if (!emailVal) {
      showError(guestEmail, 'Email address is required.');
      isValid = false;
      if (!firstInvalidInput) firstInvalidInput = guestEmail;
    } else if (!validateEmail(emailVal)) {
      showError(guestEmail, 'Please enter a valid email address (e.g. name@example.com).');
      isValid = false;
      if (!firstInvalidInput) firstInvalidInput = guestEmail;
    } else {
      clearError(guestEmail);
    }

    // 3. Phone (Required, valid format)
    const phoneVal = guestPhone.value.trim();
    if (!phoneVal) {
      showError(guestPhone, 'Phone number is required.');
      isValid = false;
      if (!firstInvalidInput) firstInvalidInput = guestPhone;
    } else if (!validatePhone(phoneVal)) {
      showError(guestPhone, 'Please provide a valid contact number (7 to 15 digits).');
      isValid = false;
      if (!firstInvalidInput) firstInvalidInput = guestPhone;
    } else {
      clearError(guestPhone);
    }

    // 4. Check-in Date (Required, cannot be past)
    if (!checkInInput.value) {
      showError(checkInInput, 'Please choose a check-in date.');
      isValid = false;
      if (!firstInvalidInput) firstInvalidInput = checkInInput;
    } else {
      const checkInDate = parseLocalDate(checkInInput.value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (checkInDate < today) {
        showError(checkInInput, 'Check-in date cannot be in the past.');
        isValid = false;
        if (!firstInvalidInput) firstInvalidInput = checkInInput;
      } else {
        clearError(checkInInput);
      }
    }

    // 5. Check-out Date (Required, must be later than check-in)
    if (!checkOutInput.value) {
      showError(checkOutInput, 'Please choose a check-out date.');
      isValid = false;
      if (!firstInvalidInput) firstInvalidInput = checkOutInput;
    } else if (checkInInput.value) {
      const checkInDate = parseLocalDate(checkInInput.value);
      const checkOutDate = parseLocalDate(checkOutInput.value);
      if (checkOutDate <= checkInDate) {
        showError(checkOutInput, 'Check-out date must be later than check-in date.');
        isValid = false;
        if (!firstInvalidInput) firstInvalidInput = checkOutInput;
      } else {
        clearError(checkOutInput);
      }
    }

    // 6. Adults Count (Required, positive integer >= 1)
    const adultsVal = adultsInput.value.trim();
    const adults = parseInt(adultsVal, 10);
    if (!adultsVal || isNaN(adults) || adults < 1) {
      showError(adultsInput, 'At least 1 adult guest is required.');
      isValid = false;
      if (!firstInvalidInput) firstInvalidInput = adultsInput;
    } else if (adults > 10) {
      showError(adultsInput, 'For reservations of more than 10 adults, please contact our concierge.');
      isValid = false;
      if (!firstInvalidInput) firstInvalidInput = adultsInput;
    } else {
      clearError(adultsInput);
    }

    // 7. Children Count (Required integer >= 0, cannot be negative)
    const childrenVal = childrenInput.value.trim();
    const children = parseInt(childrenVal, 10);
    if (childrenVal === '' || isNaN(children) || children < 0) {
      showError(childrenInput, 'Children count cannot be negative or invalid (enter 0 or more).');
      isValid = false;
      if (!firstInvalidInput) firstInvalidInput = childrenInput;
    } else if (children > 6) {
      showError(childrenInput, 'For reservations of more than 6 children, please contact our concierge.');
      isValid = false;
      if (!firstInvalidInput) firstInvalidInput = childrenInput;
    } else {
      clearError(childrenInput);
    }

    // 8. Room Category Selection (Required)
    if (!roomCategorySelect.value || !ROOM_CATALOG[roomCategorySelect.value]) {
      showError(roomCategorySelect, 'Please select a room category.');
      isValid = false;
      if (!firstInvalidInput) firstInvalidInput = roomCategorySelect;
    } else {
      clearError(roomCategorySelect);
    }

    // 9. Suite Capacity Check
    if (roomCategorySelect.value && ROOM_CATALOG[roomCategorySelect.value] && !isNaN(adults) && adults >= 1 && !isNaN(children) && children >= 0) {
      const room = ROOM_CATALOG[roomCategorySelect.value];
      const totalGuests = adults + children;
      if (totalGuests > room.maxGuests) {
        showError(roomCategorySelect, `${room.name} accommodates up to ${room.maxGuests} guests (currently ${totalGuests} selected). Please adjust guests or select a larger residence.`);
        isValid = false;
        if (!firstInvalidInput) firstInvalidInput = roomCategorySelect;
      }
    }

    if (!isValid && firstInvalidInput) {
      firstInvalidInput.focus();
    }

    return isValid;
  }

  // --- 7. DEMO CONFIRMATION DISPLAY ---
  function showConfirmation() {
    const randomRef = 'AV-DEMO-' + Math.floor(100000 + Math.random() * 900000);
    const roomKey = roomCategorySelect.value;
    const room = ROOM_CATALOG[roomKey] || ROOM_CATALOG['deluxe-suite'];
    
    const inDate = parseLocalDate(checkInInput.value);
    const outDate = parseLocalDate(checkOutInput.value);
    const nights = Math.max(1, Math.round((outDate - inDate) / (1000 * 60 * 60 * 24)));
    const totalEst = formatCurrency(room.rate * nights);

    confirmRefId.textContent = randomRef;
    confirmGuest.textContent = guestName.value.trim();
    confirmRoom.textContent = room.name;
    confirmDates.textContent = `${checkInInput.value} to ${checkOutInput.value} (${nights} ${nights === 1 ? 'night' : 'nights'})`;
    confirmGuests.textContent = `${adultsInput.value} Adults` + (parseInt(childrenInput.value, 10) > 0 ? `, ${childrenInput.value} Children` : '');
    
    const pkg = PACKAGES[packageSelect.value];
    confirmPackage.textContent = pkg ? pkg.name : 'Standard Stay (Room Only)';
    confirmTotal.textContent = `${totalEst} (Indicative)`;

    confirmationOverlay.classList.add('is-active');
    document.body.style.overflow = 'hidden';
  }

  function closeConfirmation() {
    confirmationOverlay.classList.remove('is-active');
    document.body.style.overflow = '';
  }

  function resetBookingForm() {
    closeConfirmation();
    bookingForm.reset();
    initDates();
    roomCategorySelect.value = 'deluxe-suite';
    packageSelect.value = 'none';
    hidePackageHighlight();
    updateSummary();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // --- 8. INITIALIZATION ---
  document.addEventListener('DOMContentLoaded', function () {
    initNavbar();
    initDates();
    parseQueryParams();
    updateSummary();

    // Live update & error clearing listeners
    roomCategorySelect.addEventListener('change', function () {
      clearError(roomCategorySelect);
      updateSummary();
    });

    packageSelect.addEventListener('change', function () {
      updateSummary();
    });

    adultsInput.addEventListener('input', function () {
      clearError(adultsInput);
      clearError(roomCategorySelect);
      updateSummary();
    });

    childrenInput.addEventListener('input', function () {
      clearError(childrenInput);
      clearError(roomCategorySelect);
      updateSummary();
    });

    // Instant error clearing on input typing
    [guestName, guestEmail, guestPhone].forEach(function (input) {
      input.addEventListener('input', function () {
        if (input.classList.contains('is-invalid') && input.value.trim()) {
          clearError(input);
        }
      });
      input.addEventListener('blur', function () {
        if (input.value.trim()) {
          clearError(input);
        }
      });
    });

    // Form submission
    bookingForm.addEventListener('submit', function (e) {
      e.preventDefault();
      if (validateForm()) {
        showConfirmation();
      }
    });

    // Confirmation buttons
    if (confirmationCloseBtn) {
      confirmationCloseBtn.addEventListener('click', closeConfirmation);
    }
    if (confirmationBookAnotherBtn) {
      confirmationBookAnotherBtn.addEventListener('click', resetBookingForm);
    }
    if (confirmationOverlay) {
      confirmationOverlay.addEventListener('click', function (e) {
        if (e.target === confirmationOverlay) {
          closeConfirmation();
        }
      });
    }
  });

})();
