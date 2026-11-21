/**
 * AURAVEIL RESORT & SPA — Contact Module JavaScript
 * Handles:
 * 1. Navbar scroll states and mobile drawer toggle
 * 2. Form field validations (Full name, Email, Phone, Subject, Message)
 * 3. Clear error rendering and accessibility states
 * 4. Polished frontend demo success view (no actual email sent)
 */

(function () {
  'use strict';

  // --- DOM ELEMENTS ---
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');

  const contactForm = document.getElementById('contact-form');
  const contactSuccessCard = document.getElementById('contact-success-card');
  const contactName = document.getElementById('contact-name');
  const contactEmail = document.getElementById('contact-email');
  const contactPhone = document.getElementById('contact-phone');
  const contactSubject = document.getElementById('contact-subject');
  const contactMessage = document.getElementById('contact-message');
  const resetContactBtn = document.getElementById('reset-contact-btn');
  const successGuestName = document.getElementById('success-guest-name');
  const successSubject = document.getElementById('success-subject');

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

  // --- 2. VALIDATION HELPERS ---
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
    if (!phone) return true; // Optional if blank, but if provided must be valid
    const cleaned = phone.replace(/[\s\-\(\)\.]/g, '');
    const re = /^\+?[0-9]{7,15}$/;
    return re.test(cleaned);
  }

  // --- 3. FORM VALIDATION ---
  function validateContactForm() {
    let isValid = true;
    let firstInvalidInput = null;

    // Full Name
    const nameVal = contactName.value.trim();
    if (!nameVal) {
      showError(contactName, 'Full name is required.');
      isValid = false;
      if (!firstInvalidInput) firstInvalidInput = contactName;
    } else if (nameVal.length < 2) {
      showError(contactName, 'Full name must be at least 2 characters.');
      isValid = false;
      if (!firstInvalidInput) firstInvalidInput = contactName;
    } else {
      clearError(contactName);
    }

    // Email
    const emailVal = contactEmail.value.trim();
    if (!emailVal) {
      showError(contactEmail, 'Email address is required.');
      isValid = false;
      if (!firstInvalidInput) firstInvalidInput = contactEmail;
    } else if (!validateEmail(emailVal)) {
      showError(contactEmail, 'Please enter a valid email address.');
      isValid = false;
      if (!firstInvalidInput) firstInvalidInput = contactEmail;
    } else {
      clearError(contactEmail);
    }

    // Phone (Optional, but if filled must be valid)
    const phoneVal = contactPhone.value.trim();
    if (phoneVal && !validatePhone(phoneVal)) {
      showError(contactPhone, 'Please enter a valid telephone number (7 to 15 digits).');
      isValid = false;
      if (!firstInvalidInput) firstInvalidInput = contactPhone;
    } else {
      clearError(contactPhone);
    }

    // Subject
    const subjectVal = contactSubject.value.trim();
    if (!subjectVal) {
      showError(contactSubject, 'Please select or enter an inquiry subject.');
      isValid = false;
      if (!firstInvalidInput) firstInvalidInput = contactSubject;
    } else {
      clearError(contactSubject);
    }

    // Message
    const msgVal = contactMessage.value.trim();
    if (!msgVal) {
      showError(contactMessage, 'Please write your message or inquiry.');
      isValid = false;
      if (!firstInvalidInput) firstInvalidInput = contactMessage;
    } else if (msgVal.length < 10) {
      showError(contactMessage, 'Message must be at least 10 characters.');
      isValid = false;
      if (!firstInvalidInput) firstInvalidInput = contactMessage;
    } else {
      clearError(contactMessage);
    }

    if (!isValid && firstInvalidInput) {
      firstInvalidInput.focus();
    }

    return isValid;
  }

  // --- 4. SUCCESS DEMO DISPLAY ---
  function showSuccess() {
    if (successGuestName) {
      successGuestName.textContent = contactName.value.trim();
    }
    if (successSubject) {
      const subjectText = contactSubject.options ? contactSubject.options[contactSubject.selectedIndex].text : contactSubject.value;
      successSubject.textContent = subjectText;
    }

    contactForm.style.display = 'none';
    contactSuccessCard.classList.add('is-active');
    contactSuccessCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  function resetForm() {
    contactForm.reset();
    contactForm.style.display = 'block';
    contactSuccessCard.classList.remove('is-active');

    [contactName, contactEmail, contactPhone, contactSubject, contactMessage].forEach(clearError);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // --- 5. INITIALIZATION ---
  document.addEventListener('DOMContentLoaded', function () {
    initNavbar();

    // Blur listeners for active inline cleanup
    [contactName, contactEmail, contactPhone, contactSubject, contactMessage].forEach(function (input) {
      input.addEventListener('blur', function () {
        if (input.value.trim()) {
          clearError(input);
        }
      });
      input.addEventListener('input', function () {
        if (input.classList.contains('is-invalid') && input.value.trim()) {
          clearError(input);
        }
      });
    });

    // Form submission
    if (contactForm) {
      contactForm.addEventListener('submit', function (e) {
        e.preventDefault();
        if (validateContactForm()) {
          showSuccess();
        }
      });
    }

    // Reset button
    if (resetContactBtn) {
      resetContactBtn.addEventListener('click', resetForm);
    }
  });

})();
