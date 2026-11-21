/**
 * AURAVEIL RESORT & SPA — Services Page JavaScript
 * Branch: feature/facilities-services
 * Vanilla JS only. No dependencies. Loaded with defer.
 */

(function () {
  'use strict';

  /* ============================================================
     1. NAVBAR — scroll state + mobile toggle
     ============================================================ */
  var navbar = document.getElementById('navbar');
  var SCROLL_THRESHOLD = 60;

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

  /* Mobile toggle */
  var navToggle = document.getElementById('nav-toggle');
  var navMenu   = document.getElementById('nav-menu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function () {
      var isOpen = navMenu.classList.toggle('is-open');
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


  /* ============================================================
     2. SCROLL-REVEAL (IntersectionObserver)
     ============================================================ */
  if (!('IntersectionObserver' in window)) {
    document.querySelectorAll('.reveal').forEach(function (el) {
      el.classList.add('is-visible');
    });
  } else {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    document.querySelectorAll('.reveal').forEach(function (el) {
      revealObserver.observe(el);
    });
  }


  /* ============================================================
     3. EXPANDABLE EXCURSION CARD DETAILS
        Toggle aria-expanded + .is-open on the details panel.
        Keyboard accessible (Enter / Space on the button).
     ============================================================ */
  var toggleButtons = document.querySelectorAll('.svc-excursion-card__toggle');

  toggleButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var targetId  = btn.getAttribute('aria-controls');
      var panel     = targetId ? document.getElementById(targetId) : null;
      if (!panel) return;

      var isExpanded = btn.getAttribute('aria-expanded') === 'true';

      /* Close any other open panel first */
      toggleButtons.forEach(function (otherBtn) {
        if (otherBtn === btn) return;
        var otherId    = otherBtn.getAttribute('aria-controls');
        var otherPanel = otherId ? document.getElementById(otherId) : null;
        otherBtn.setAttribute('aria-expanded', 'false');
        otherBtn.querySelector('span').textContent = 'Explore Details';
        if (otherPanel) otherPanel.classList.remove('is-open');
      });

      /* Toggle current panel */
      var nextState = !isExpanded;
      btn.setAttribute('aria-expanded', nextState ? 'true' : 'false');
      btn.querySelector('span').textContent = nextState ? 'Close Details' : 'Explore Details';
      panel.classList.toggle('is-open', nextState);
    });
  });


  /* ============================================================
     4. PERSONALISED EXPERIENCE CARDS — interactive selection
        Clicking / focusing a card adds .is-selected for a visual
        highlight cue. Keyboard-accessible via tabindex="0".
     ============================================================ */
  var personalCards = document.querySelectorAll('.svc-personal-card');

  function selectCard(card) {
    personalCards.forEach(function (c) {
      c.classList.remove('is-selected');
    });
    card.classList.add('is-selected');
  }

  personalCards.forEach(function (card) {
    card.addEventListener('click', function () {
      selectCard(card);
    });

    card.addEventListener('keydown', function (e) {
      /* Activate on Enter or Space */
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        selectCard(card);
      }
    });

  });


  /* ============================================================
     5. ON-LOAD: scroll to hash if present in URL
        Handles deep links like services.html#excursions
     ============================================================ */
  window.addEventListener('load', function () {
    var hash = window.location.hash;
    if (!hash) return;

    var target = document.querySelector(hash);
    if (!target) return;

    setTimeout(function () {
      var navbarEl = document.getElementById('navbar');
      var offset   = (navbarEl ? navbarEl.offsetHeight : 72) + 24;
      var top      = target.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top: top, behavior: 'smooth' });
    }, 120);
  });

}());
