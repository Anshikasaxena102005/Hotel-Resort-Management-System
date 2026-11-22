/**
 * AURAVEIL RESORT & SPA — Facilities Page JavaScript
 * Branch: feature/facilities-services
 * Vanilla JS only. No dependencies. Loaded with defer.
 */

(function () {
  'use strict';

  /* ============================================================
     1. NAVBAR — scroll state + mobile toggle
        (identical pattern to index.html inline script,
         but placed in external file per assignment spec)
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
        Same logic as index.html — activates .reveal elements
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
     3. STICKY SECTION NAV — active pill tracking
        Uses IntersectionObserver to highlight the pill for the
        section currently most visible in the viewport.
     ============================================================ */
  var facSections = ['pool', 'spa', 'dining', 'events'];
  var navLinks    = document.querySelectorAll('.fac-nav__link');

  if (navLinks.length && 'IntersectionObserver' in window) {

    var sectionVisibility = {};

    facSections.forEach(function (id) {
      sectionVisibility[id] = false;
    });

    function setActiveNavLink(id) {
      navLinks.forEach(function (link) {
        link.classList.toggle('is-active', link.dataset.section === id);
      });
    }

    var sectionObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var id = entry.target.id;
        sectionVisibility[id] = entry.isIntersecting;
      });

      /* Activate the first visible section in document order */
      for (var i = 0; i < facSections.length; i++) {
        if (sectionVisibility[facSections[i]]) {
          setActiveNavLink(facSections[i]);
          return;
        }
      }

      /* Nothing visible — clear active state */
      navLinks.forEach(function (link) {
        link.classList.remove('is-active');
      });
    }, {
      threshold: 0.25,
      rootMargin: '-80px 0px -40% 0px'
    });

    facSections.forEach(function (id) {
      var el = document.getElementById(id);
      if (el) sectionObserver.observe(el);
    });
  }


  /* ============================================================
     4. SMOOTH SCROLL for section nav pill links
        (html { scroll-behavior: smooth } handles most cases,
         but we also ensure hash navigation works predictably
         with the sticky nav offset)
     ============================================================ */
  navLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
      var targetId = link.getAttribute('href');
      if (!targetId || targetId.charAt(0) !== '#') return;

      var targetEl = document.querySelector(targetId);
      if (!targetEl) return;

      e.preventDefault();

      var facNav    = document.querySelector('.fac-nav');
      var navbarEl  = document.getElementById('navbar');
      var offset    = (navbarEl ? navbarEl.offsetHeight : 72) + (facNav ? facNav.offsetHeight : 48) + 16;

      var targetTop = targetEl.getBoundingClientRect().top + window.pageYOffset - offset;

      window.scrollTo({ top: targetTop, behavior: 'smooth' });

      /* Update URL hash without jumping */
      if (history.pushState) {
        history.pushState(null, '', targetId);
      }
    });
  });


  /* ============================================================
     5. ON-LOAD: scroll to hash if present in URL
        Handles deep links like facilities.html#spa
     ============================================================ */
  window.addEventListener('load', function () {
    var hash = window.location.hash;
    if (!hash) return;

    var target = document.querySelector(hash);
    if (!target) return;

    /* Small delay to allow sticky nav to settle */
    setTimeout(function () {
      var facNav   = document.querySelector('.fac-nav');
      var navbarEl = document.getElementById('navbar');
      var offset   = (navbarEl ? navbarEl.offsetHeight : 72) + (facNav ? facNav.offsetHeight : 48) + 16;
      var top      = target.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top: top, behavior: 'smooth' });
    }, 120);
  });

}());
