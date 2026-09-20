/**
 * AURAVEIL RESORT & SPA
 * Module: Booking & Enquiry (Anushka Bansal)
 * File: js/booking.js
 */

document.addEventListener('DOMContentLoaded', () => {
  initDateConstraints();
  initGuestRoomsSync();
  initAvailabilityBar();
  initRoomSelection();
  initExperienceParams();
  initBookingForm();
  initMobileNavigation();
  initCardDelays();
  initScrollReveal();
  initNavbarScroll();
});

/* Experience label map */
const SERVICE_EXPERIENCES = {
  spa:       'Auraveil Spa & Holistic Wellness',
  dining:    'Private Chef & Coastal Gastronomy',
  chauffeur: 'Chauffeur & Airport Fleet',
  butler:    '24/7 Dedicated Butler Service',
  yacht:     'Private Yacht & Marine Charters',
  events:    'Curated Celebrations & Galas'
};

/* Room detail map */
const ROOM_DETAILS = {
  'Deluxe Room':    { rate: '$320/night', maxGuests: 2 },
  'Premium Room':   { rate: '$480/night', maxGuests: 3 },
  'Executive Suite':{ rate: '$720/night', maxGuests: 4 },
  'Luxury Suite':   { rate: '$950/night', maxGuests: 4 },
  'Family Room':    { rate: '$560/night', maxGuests: 5 }
};

function formatDateToISO(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

/* ---- Date Constraints ---- */
function initDateConstraints() {
  const availCheckIn  = document.getElementById('availCheckIn');
  const availCheckOut = document.getElementById('availCheckOut');
  const checkIn       = document.getElementById('checkIn');
  const checkOut      = document.getElementById('checkOut');

  const today = formatDateToISO(new Date());
  if (availCheckIn) availCheckIn.min = today;
  if (checkIn)      checkIn.min      = today;

  function syncCheckIn(src, tgtIn, srcOut, tgtOut) {
    const val = src.value;
    if (!val) return;
    const nextDay = new Date(val);
    nextDay.setDate(nextDay.getDate() + 1);
    const nd = formatDateToISO(nextDay);
    if (srcOut) srcOut.min = nd;
    if (tgtOut) tgtOut.min = nd;
    if (srcOut && srcOut.value && srcOut.value <= val) srcOut.value = nd;
    if (tgtOut && tgtOut.value && tgtOut.value <= val) tgtOut.value = nd;
    if (tgtIn && tgtIn.value !== val) tgtIn.value = val;
    if (srcOut && tgtOut && srcOut.value) tgtOut.value = srcOut.value;
  }

  function syncCheckOut(src, tgt) {
    if (src && tgt && src.value) tgt.value = src.value;
  }

  if (availCheckIn)  availCheckIn.addEventListener('change',  () => syncCheckIn(availCheckIn, checkIn, availCheckOut, checkOut));
  if (checkIn)       checkIn.addEventListener('change',       () => syncCheckIn(checkIn, availCheckIn, checkOut, availCheckOut));
  if (availCheckOut) availCheckOut.addEventListener('change', () => syncCheckOut(availCheckOut, checkOut));
  if (checkOut)      checkOut.addEventListener('change',      () => syncCheckOut(checkOut, availCheckOut));
}

/* ---- Guest Count Sync ---- */
function initGuestRoomsSync() {
  const availGuests = document.getElementById('availGuests');
  const guests      = document.getElementById('guests');
  if (!availGuests || !guests) return;
  availGuests.addEventListener('change', () => { guests.value = availGuests.value; });
  guests.addEventListener('change', () => {
    const n = Math.min(5, Math.max(1, parseInt(guests.value, 10) || 1));
    availGuests.value = String(n);
  });
}

/* ---- Availability Bar ---- */
function initAvailabilityBar() {
  const form          = document.getElementById('availabilityForm');
  const availCheckIn  = document.getElementById('availCheckIn');
  const availCheckOut = document.getElementById('availCheckOut');
  const availGuests   = document.getElementById('availGuests');
  const availRooms    = document.getElementById('availRooms');
  const statusText    = document.getElementById('availStatusText');
  const checkIn       = document.getElementById('checkIn');
  const checkOut      = document.getElementById('checkOut');
  const guests        = document.getElementById('guests');
  const roomsSection  = document.getElementById('roomsSection');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!availCheckIn.value) {
      const d = new Date(); d.setDate(d.getDate() + 7);
      availCheckIn.value = formatDateToISO(d);
      if (checkIn) checkIn.value = availCheckIn.value;
    }

    if (!availCheckOut.value || availCheckOut.value <= availCheckIn.value) {
      const d = new Date(availCheckIn.value); d.setDate(d.getDate() + 3);
      availCheckOut.value = formatDateToISO(d);
      if (checkOut) checkOut.value = availCheckOut.value;
    }

    const start = new Date(availCheckIn.value);
    const end   = new Date(availCheckOut.value);
    if (end <= start) {
      if (statusText) statusText.textContent = 'Please choose a check-out date after your check-in date.';
      return;
    }

    const nights = Math.max(1, Math.round((end - start) / 86400000));
    const gc     = availGuests ? availGuests.value : '2';
    const opts   = { month: 'short', day: 'numeric' };
    const fin    = start.toLocaleDateString('en-US', opts);
    const fout   = end.toLocaleDateString('en-US', opts);

    if (checkIn)  checkIn.value  = availCheckIn.value;
    if (checkOut) checkOut.value = availCheckOut.value;
    if (guests)   guests.value   = gc;

    if (statusText) {
      statusText.textContent = `✓ Sanctuaries verified for ${fin} – ${fout} (${nights} night${nights > 1 ? 's' : ''}, ${gc} guest${Number(gc) > 1 ? 's' : ''}). Select your suite below.`;
    }

    if (roomsSection) roomsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
}

/* ---- Room Selection ---- */
function initRoomSelection() {
  const roomCards          = document.querySelectorAll('.room-card');
  const selectBtns         = document.querySelectorAll('.btn-select-room');
  const roomTypeSelect     = document.getElementById('roomType');
  const selectedRoomDisplay= document.getElementById('selectedRoomDisplay');
  const formSection        = document.getElementById('reservationFormSection');

  function updateRoom(name, scroll) {
    if (!name) return;

    if (roomTypeSelect) roomTypeSelect.value = name;

    if (selectedRoomDisplay) {
      const d = ROOM_DETAILS[name];
      selectedRoomDisplay.textContent = `${name}${d ? ` (${d.rate})` : ''}`;
    }

    roomCards.forEach((card) => {
      const btn      = card.querySelector('.btn-select-room');
      const cardRoom = btn ? btn.getAttribute('data-room') : null;
      if (cardRoom === name) {
        card.classList.add('selected-card');
        if (btn) { btn.classList.add('selected'); btn.textContent = 'SELECTED ✓'; }
      } else {
        card.classList.remove('selected-card');
        if (btn) { btn.classList.remove('selected'); btn.textContent = 'SELECT ROOM'; }
      }
    });

    if (scroll && formSection) formSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  selectBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const room = btn.getAttribute('data-room');
      if (room) updateRoom(room, true);
    });
  });

  if (roomTypeSelect) {
    roomTypeSelect.addEventListener('change', () => updateRoom(roomTypeSelect.value, false));
  }

  updateRoom((roomTypeSelect && roomTypeSelect.value) ? roomTypeSelect.value : 'Deluxe Room', false);
}

/* ---- Experience Params ---- */
function initExperienceParams() {
  const banner        = document.getElementById('selectedExperienceBanner');
  const expName       = document.getElementById('selectedExpName');
  const btnChange     = document.getElementById('btnChangeExp');
  const serviceSelect = document.getElementById('selectedService');

  if (!banner || !expName) return;

  const param = new URLSearchParams(window.location.search).get('service')?.toLowerCase();
  if (param && SERVICE_EXPERIENCES[param]) {
    expName.textContent   = SERVICE_EXPERIENCES[param];
    banner.style.display  = 'flex';
    if (serviceSelect) serviceSelect.value = param;
  }

  if (btnChange) {
    btnChange.addEventListener('click', () => {
      banner.style.display = 'none';
      if (serviceSelect) serviceSelect.value = '';
      if (window.history.replaceState)
        window.history.replaceState({}, document.title, window.location.pathname);
    });
  }

  if (serviceSelect) {
    serviceSelect.addEventListener('change', () => {
      const v = serviceSelect.value;
      if (v && SERVICE_EXPERIENCES[v]) {
        expName.textContent  = SERVICE_EXPERIENCES[v];
        banner.style.display = 'flex';
      } else {
        banner.style.display = 'none';
      }
    });
  }
}

/* ---- Booking Form ---- */
function initBookingForm() {
  const form             = document.getElementById('bookingForm');
  const confirmationCard = document.getElementById('confirmationCard');
  const newEnquiryBtn    = document.getElementById('newEnquiryBtn');
  const clearFormBtn     = document.getElementById('clearFormBtn');
  const banner           = document.getElementById('selectedExperienceBanner');
  const statusText       = document.getElementById('availStatusText');
  const roomTypeSelect   = document.getElementById('roomType');

  if (!form || !confirmationCard) return;

  if (clearFormBtn) {
    clearFormBtn.addEventListener('click', () => {
      form.reset();
      if (banner)     banner.style.display = 'none';
      if (roomTypeSelect) {
        roomTypeSelect.value = 'Deluxe Room';
        roomTypeSelect.dispatchEvent(new Event('change'));
      }
      if (statusText) statusText.textContent = 'All 5 luxury sanctuaries are currently available. Select a room below to proceed with your reservation.';
      if (window.history.replaceState)
        window.history.replaceState({}, document.title, window.location.pathname);
    });
  }

  form.addEventListener('submit', (event) => {
    if (!form.checkValidity()) { form.reportValidity(); event.preventDefault(); return; }
    event.preventDefault();

    const fullName       = document.getElementById('fullName')?.value.trim();
    const email          = document.getElementById('email')?.value.trim();
    const phone          = document.getElementById('phone')?.value.trim();
    const roomType       = document.getElementById('roomType')?.value;
    const checkIn        = document.getElementById('checkIn')?.value;
    const checkOut       = document.getElementById('checkOut')?.value;
    const guests         = document.getElementById('guests')?.value;
    const selectedSvc    = document.getElementById('selectedService')?.value;
    const message        = document.getElementById('message')?.value.trim();

    if (new Date(checkOut) <= new Date(checkIn)) {
      alert('Check-out date must be after your check-in date.');
      return;
    }

    const data = {
      id: 'ENQ-' + Date.now().toString().slice(-6),
      name: fullName, email, phone, roomType, checkIn, checkOut,
      guests: Number(guests),
      experience: (selectedSvc && SERVICE_EXPERIENCES[selectedSvc]) ? SERVICE_EXPERIENCES[selectedSvc] : 'None (Room Only)',
      message: message || '(No special requests noted)',
      submittedAt: new Date().toISOString()
    };

    console.log('[Demo Booking] Enquiry:', data);

    const el = (id) => document.getElementById(id);
    if (el('summaryGuest'))  el('summaryGuest').textContent  = data.name;
    if (el('summaryRoom'))   el('summaryRoom').textContent   = data.roomType;
    if (el('summaryDates'))  el('summaryDates').textContent  = `${data.checkIn} to ${data.checkOut}`;
    if (el('summaryGuests')) el('summaryGuests').textContent = `${data.guests} Guest${data.guests > 1 ? 's' : ''}`;

    const expRow = el('summaryExperienceRow');
    const expVal = el('summaryExperience');
    if (expRow && expVal) {
      if (selectedSvc && SERVICE_EXPERIENCES[selectedSvc]) {
        expVal.textContent     = SERVICE_EXPERIENCES[selectedSvc];
        expRow.style.display   = 'flex';
      } else {
        expRow.style.display = 'none';
      }
    }

    form.style.display             = 'none';
    confirmationCard.style.display = 'block';
    confirmationCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });

  if (newEnquiryBtn) {
    newEnquiryBtn.addEventListener('click', () => {
      form.reset();
      if (banner) banner.style.display = 'none';
      confirmationCard.style.display   = 'none';
      form.style.display               = 'flex';
      if (roomTypeSelect) {
        roomTypeSelect.value = 'Deluxe Room';
        roomTypeSelect.dispatchEvent(new Event('change'));
      }
      form.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  }
}

/* ---- Mobile Navigation ---- */
function initMobileNavigation() {
  const navToggle = document.getElementById('navToggle');
  const navMenu   = document.getElementById('navMenu');
  if (!navToggle || !navMenu) return;

  navToggle.addEventListener('click', () => navMenu.classList.toggle('open'));

  document.addEventListener('click', (e) => {
    if (!navToggle.contains(e.target) && !navMenu.contains(e.target) && navMenu.classList.contains('open'))
      navMenu.classList.remove('open');
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('open'))
      navMenu.classList.remove('open');
  });
}

/* ---- Card Stagger Delays ---- */
function initCardDelays() {
  document.querySelectorAll('.card-reveal').forEach((card, i) => {
    card.style.setProperty('--card-delay', `${i * 0.12}s`);
  });
}

/* ---- Scroll Reveal ---- */
function initScrollReveal() {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('is-visible'); revealObs.unobserve(e.target); }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.reveal-on-scroll').forEach((el) => {
    if (reduced) el.classList.add('is-visible');
    else revealObs.observe(el);
  });

  const cardObs = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('is-visible'); cardObs.unobserve(e.target); }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

  document.querySelectorAll('.card-reveal').forEach((card) => {
    if (reduced) card.classList.add('is-visible');
    else cardObs.observe(card);
  });
}

/* ---- Navbar Scroll Shadow ---- */
function initNavbarScroll() {
  const header = document.querySelector('.site-header');
  if (!header) return;
  const update = () => {
    if (window.scrollY > 30) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  };
  window.addEventListener('scroll', update, { passive: true });
  update();
}
