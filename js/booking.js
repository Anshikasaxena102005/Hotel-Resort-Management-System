/**
 * AURAVEIL RESORT & SPA — Booking Module JavaScript
 * Handles:
 * 1. Navbar scroll states and mobile drawer toggle
 * 2. URL search parameters (?package=romance | wellness | adventure)
 * 3. Date constraints & validation (no past dates, checkout > checkin)
 * 4. Guest count constraints & validation
 * 5. Dynamic live booking summary & demo price calculation
 * 6. Accessible form validation with clear error feedback
 * 7. Polished demo confirmation modal
 */

(function () {
  'use strict';

  // --- ROOM DATA & PRICING (From Project Specifications) ---
  const ROOM_CATALOG = {
    deluxe: {
      name: 'Deluxe Garden Suite',
      rate: 28500,
      image: 'assets/images/room-deluxe-suite.jpg',
      maxGuests: 3,
      desc: 'Marble floors, king canopy bed, private terrace opening onto gardens.'
    },
    villa: {
      name: 'Tropical Garden Villa',
      rate: 58000,
      image: 'assets/images/room-garden-villa.jpg',
      maxGuests: 4,
      desc: 'Stone bathing pavilion, hand-carved canopy bed, fragrant walled garden.'
    },
    penthouse: {
      name: 'Penthouse Collection',
      rate: 95000,
      image: 'assets/images/room-penthouse.jpg',
      maxGuests: 6,
      desc: '320° panoramic ocean views, private plunge pool, butler & chef service.'
    }
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

  // --- 2. DATE LOGIC & CONSTRAINTS ---
  function formatDateToISO(date) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }

  function addDays(date, days) {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  function initDates() {
    const today = new Date();
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
    checkOutInput.addEventListener('change', handleCheckOutChange);
  }

  function handleCheckInChange() {
    clearError(checkInInput);
    clearError(checkOutInput);

    if (!checkInInput.value) {
      showError(checkInInput, 'Please select a valid check-in date.');
      return;
    }

    const checkInDate = new Date(checkInInput.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (checkInDate < today) {
      showError(checkInInput, 'Check-in date cannot be in the past.');
      return;
    }

    // Set checkout minimum to checkin + 1 day
    const minCheckOut = addDays(checkInDate, 1);
    const minCheckOutISO = formatDateToISO(minCheckOut);
    checkOutInput.min = minCheckOutISO;

    // If checkout is now <= checkin, bump checkout forward automatically
    if (!checkOutInput.value || new Date(checkOutInput.value) <= checkInDate) {
      checkOutInput.value = minCheckOutISO;
    }

    updateSummary();
  }

  function handleCheckOutChange() {
    clearError(checkOutInput);

    if (!checkOutInput.value) {
      showError(checkOutInput, 'Please select a valid check-out date.');
      return;
    }

    if (checkInInput.value) {
      const checkInDate = new Date(checkInInput.value);
      const checkOutDate = new Date(checkOutInput.value);

      if (checkOutDate <= checkInDate) {
        showError(checkOutInput, 'Check-out date must be later than check-in date.');
        return;
      }
    }

    updateSummary();
  }

  // --- 3. URL QUERY PARAMETER HANDLING ---
  function parseQueryParams() {
    const params = new URLSearchParams(window.location.search);
    const packageParam = params.get('package');

    if (packageParam && PACKAGES[packageParam.toLowerCase()]) {
      const key = packageParam.toLowerCase();
      packageSelect.value = key;

      // Recommended default rooms based on package theme
      if (key === 'romance') {
        roomCategorySelect.value = 'villa';
      } else if (key === 'wellness') {
        roomCategorySelect.value = 'deluxe';
      } else if (key === 'adventure') {
        roomCategorySelect.value = 'penthouse';
      }

      displayPackageHighlight(key);
    } else {
      // Default initial room selection
      roomCategorySelect.value = 'deluxe';
      hidePackageHighlight();
    }
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
    const room = ROOM_CATALOG[selectedRoomKey] || ROOM_CATALOG.deluxe;

    // Room info
    summaryRoomName.textContent = room.name;
    summaryRoomImg.src = room.image;
    summaryRoomImg.alt = room.name;
    summaryRatePerNight.textContent = `${formatCurrency(room.rate)} / night`;

    // Dates & Nights
    let nights = 0;
    if (checkInInput.value && checkOutInput.value) {
      const start = new Date(checkInInput.value);
      const end = new Date(checkOutInput.value);
      const diffTime = end.getTime() - start.getTime();
      nights = Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
    }

    if (nights > 0 && checkInInput.value && checkOutInput.value) {
      const inDate = new Date(checkInInput.value).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
      const outDate = new Date(checkOutInput.value).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
      summaryDates.textContent = `${inDate} — ${outDate}`;
      summaryNights.textContent = `${nights} ${nights === 1 ? 'Night' : 'Nights'}`;
    } else {
      summaryDates.textContent = 'Dates Pending';
      summaryNights.textContent = '—';
    }

    // Guests
    const adults = parseInt(adultsInput.value, 10) || 1;
    const children = parseInt(childrenInput.value, 10) || 0;
    const guestStr = `${adults} ${adults === 1 ? 'Adult' : 'Adults'}` + (children > 0 ? `, ${children} ${children === 1 ? 'Child' : 'Children'}` : '');
    summaryGuests.textContent = guestStr;

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

    // Pricing calculation
    if (nights > 0) {
      const baseTotal = room.rate * nights;
      summarySubtotal.textContent = formatCurrency(baseTotal);
      summaryTotal.textContent = formatCurrency(baseTotal);
    } else {
      summarySubtotal.textContent = formatCurrency(room.rate);
      summaryTotal.textContent = formatCurrency(room.rate);
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
    // Allows optional +, digits, spaces, hyphens, brackets, min 7 digits
    const cleaned = phone.replace(/[\s\-\(\)\.]/g, '');
    const re = /^\+?[0-9]{7,15}$/;
    return re.test(cleaned);
  }

  // --- 6. FULL FORM VALIDATION & SUBMISSION ---
  function validateForm() {
    let isValid = true;
    let firstInvalidInput = null;

    // Full Name
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

    // Email
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

    // Phone
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

    // Check-in Date
    if (!checkInInput.value) {
      showError(checkInInput, 'Please choose a check-in date.');
      isValid = false;
      if (!firstInvalidInput) firstInvalidInput = checkInInput;
    } else {
      const checkInDate = new Date(checkInInput.value);
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

    // Check-out Date
    if (!checkOutInput.value) {
      showError(checkOutInput, 'Please choose a check-out date.');
      isValid = false;
      if (!firstInvalidInput) firstInvalidInput = checkOutInput;
    } else if (checkInInput.value) {
      const checkInDate = new Date(checkInInput.value);
      const checkOutDate = new Date(checkOutInput.value);
      if (checkOutDate <= checkInDate) {
        showError(checkOutInput, 'Check-out date must be later than check-in date.');
        isValid = false;
        if (!firstInvalidInput) firstInvalidInput = checkOutInput;
      } else {
        clearError(checkOutInput);
      }
    }

    // Adults Count
    const adults = parseInt(adultsInput.value, 10);
    if (isNaN(adults) || adults < 1) {
      showError(adultsInput, 'At least 1 adult is required.');
      isValid = false;
      if (!firstInvalidInput) firstInvalidInput = adultsInput;
    } else if (adults > 10) {
      showError(adultsInput, 'For reservations of more than 10 adults, please contact our concierge.');
      isValid = false;
      if (!firstInvalidInput) firstInvalidInput = adultsInput;
    } else {
      clearError(adultsInput);
    }

    // Children Count
    const children = parseInt(childrenInput.value, 10);
    if (isNaN(children) || children < 0) {
      showError(childrenInput, 'Children count cannot be negative.');
      isValid = false;
      if (!firstInvalidInput) firstInvalidInput = childrenInput;
    } else {
      clearError(childrenInput);
    }

    // Room Category Selection
    if (!roomCategorySelect.value || !ROOM_CATALOG[roomCategorySelect.value]) {
      showError(roomCategorySelect, 'Please select a room category.');
      isValid = false;
      if (!firstInvalidInput) firstInvalidInput = roomCategorySelect;
    } else {
      clearError(roomCategorySelect);
    }

    // Capacity Check
    if (roomCategorySelect.value && ROOM_CATALOG[roomCategorySelect.value]) {
      const room = ROOM_CATALOG[roomCategorySelect.value];
      const totalGuests = (parseInt(adultsInput.value, 10) || 0) + (parseInt(childrenInput.value, 10) || 0);
      if (totalGuests > room.maxGuests) {
        showError(roomCategorySelect, `${room.name} accommodates up to ${room.maxGuests} guests. Consider multiple suites or the Penthouse Collection.`);
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
    const room = ROOM_CATALOG[roomKey] || ROOM_CATALOG.deluxe;
    const nights = Math.max(1, Math.ceil((new Date(checkOutInput.value) - new Date(checkInInput.value)) / (1000 * 60 * 60 * 24)));
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
    roomCategorySelect.value = 'deluxe';
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

    // Live update listeners
    roomCategorySelect.addEventListener('change', function () {
      clearError(roomCategorySelect);
      updateSummary();
    });

    packageSelect.addEventListener('change', function () {
      updateSummary();
    });

    adultsInput.addEventListener('input', function () {
      clearError(adultsInput);
      updateSummary();
    });

    childrenInput.addEventListener('input', function () {
      clearError(childrenInput);
      updateSummary();
    });

    // Blur validation for inputs
    [guestName, guestEmail, guestPhone].forEach(function (input) {
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
