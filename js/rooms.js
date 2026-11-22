
(function () {
  'use strict';


  var ROOMS_DATA = {
    'deluxe-suite': {
      id: 'deluxe-suite',
      name: 'Deluxe Garden Suite',
      category: 'suite',
      categoryLabel: 'Garden Suite',
      badge: 'Garden Level',
      image: 'assets/images/room-deluxe-suite.jpg',
      alt: 'Deluxe Garden Suite featuring king bed with ivory linens, marble floors, and private garden terrace',
      shortDesc: 'Marble floors, a signature king canopy bed, and private stone terrace opening onto manicured gardens — the ideal canvas for a gentle tropical escape.',
      longDesc: 'An exquisite balance of calm and sophistication. The Deluxe Garden Suite combines handcrafted oak accents, an Italian marble en-suite with dual rain shower, and a private stone terrace surrounded by vibrant bougainvillea and palm trees. Designed for discerning travelers seeking peace, privacy, and understated indulgence.',
      occupancy: '2 Adults',
      bed: '1 King Bed (Signature Feather-top)',
      size: '68 m² / 732 sq ft',
      view: 'Manicured Botanical Gardens',
      price: '₹ 28,500',
      period: '/ night',
      amenities: [
        'High-Speed Wi-Fi',
        'Silent Climate Control & AC',
        '24-Hour In-Suite Room Service',
        'Private Garden Terrace Balcony',
        'Italian Marble Bath & Rain Shower',
        'Bespoke Organic Toiletries',
        'Nespresso Coffee Bar & Artisan Teas',
        'In-Room Digital Safe & Smart Controls'
      ],
      bookingUrl: 'booking.html?room=deluxe-suite'
    },
    'premier-ocean-suite': {
      id: 'premier-ocean-suite',
      name: 'Premier Ocean Suite',
      category: 'suite',
      categoryLabel: 'Ocean Suite',
      badge: 'Ocean Vista',
      image: 'assets/images/room-premier-ocean-suite.jpg',
      alt: 'Premier Ocean Suite overlooking coastal waters with private sunset balcony',
      shortDesc: 'Elevated sea views with an open-plan lounge, sun-drenched private balcony, and a freestanding soaking tub facing the golden horizon.',
      longDesc: 'Perched on the upper tiers, the Premier Ocean Suite offers uninterrupted views across the sparkling Arabian Sea. Features a spacious private balcony with daybed, an open-concept living area with bespoke teak furniture, and an en-suite bathroom where you can soak in a freestanding tub while watching the sun dip into the ocean.',
      occupancy: '2 Adults',
      bed: '1 King Bed (Luxury Plush)',
      size: '78 m² / 840 sq ft',
      view: 'Unobstructed Arabian Sea',
      price: '₹ 36,000',
      period: '/ night',
      amenities: [
        'High-Speed Wi-Fi',
        'Individual Climate Control & AC',
        '24-Hour Room Service',
        'Sunset Balcony with Daybed',
        'Oceanfront Freestanding Tub',
        'Organic Sea Salt Bath Amenities',
        'Artisan Espresso Bar',
        'Bose Bluetooth Sound System'
      ],
      bookingUrl: 'booking.html?room=premier-ocean-suite'
    },
    'heritage-courtyard-suite': {
      id: 'heritage-courtyard-suite',
      name: 'Heritage Courtyard Suite',
      category: 'suite',
      categoryLabel: 'Courtyard Suite',
      badge: 'Colonial Charm',
      image: 'assets/images/room-heritage-suite.jpg',
      alt: 'Heritage Courtyard Suite with Portuguese architectural elements and tranquil courtyard view',
      shortDesc: 'Inspired by Indo-Portuguese architecture, boasting arched verandas, terracotta tiles, and a shaded private courtyard with a soothing water fountain.',
      longDesc: 'A serene tribute to Goan architectural heritage. The Heritage Courtyard Suite features high wooden ceilings, hand-painted Portuguese tiles, restored antique furnishings, and an intimate enclosed courtyard where the gentle sound of a stone fountain accompanies your morning espresso.',
      occupancy: '2 Adults',
      bed: '1 King Bed (Carved Teak)',
      size: '72 m² / 775 sq ft',
      view: 'Private Courtyard & Water Fountain',
      price: '₹ 32,000',
      period: '/ night',
      amenities: [
        'High-Speed Wi-Fi',
        'Whisper-Quiet Climate Control',
        '24-Hour In-Suite Dining',
        'Private Courtyard with Fountain',
        'Handcrafted Artisan Bathtub',
        'Locally Sourced Organic Cosmetics',
        'Antique Teak Writing Desk',
        'Complimentary Evening Turndown'
      ],
      bookingUrl: 'booking.html?room=heritage-courtyard-suite'
    },
    'garden-villa': {
      id: 'garden-villa',
      name: 'Tropical Garden Villa',
      category: 'villa',
      categoryLabel: 'Private Villa',
      badge: 'Botanical Sanctuary',
      image: 'assets/images/room-garden-villa.jpg',
      alt: 'Garden Villa with open-air stone bathtub surrounded by tropical flowers and lantern lighting',
      shortDesc: 'A secluded botanical sanctuary enclosed by limestone walls. Indulge in an alfresco stone soaking tub, open-air sun deck, and personal concierge service.',
      longDesc: 'Surrounded by hand-carved limestone walls and ancient tropical flora, the Tropical Garden Villa offers complete privacy and immersion in nature. Features an open-air stone bathing pavilion beneath starlit skies, a hand-crafted teak canopy bed, private sun loungers, and dedicated butler service on call around the clock.',
      occupancy: '3 Guests',
      bed: '1 King Canopy Bed + 1 Daybed',
      size: '120 m² / 1,290 sq ft',
      view: 'Enclosed Private Garden Sanctuary',
      price: '₹ 58,000',
      period: '/ night',
      amenities: [
        'High-Speed Wi-Fi',
        'Multi-Zone Climate Control & AC',
        'Dedicated 24/7 Villa Butler Service',
        'Private Walled Garden & Sun Terrace',
        'Open-Air Stone Tub & Rain Shower',
        'Organic Ayurvedic Bath Amenities',
        'Bose Sound System & Ambient Lighting',
        'Complimentary Sunset Canapés & Tea'
      ],
      bookingUrl: 'booking.html?room=garden-villa'
    },
    'private-pool-villa': {
      id: 'private-pool-villa',
      name: 'Private Pool Villa',
      category: 'villa',
      categoryLabel: 'Pool Villa',
      badge: 'Private Plunge Pool',
      image: 'assets/images/room-pool-villa.jpg',
      alt: 'Private Pool Villa with turquoise plunge pool, sun loungers, and tropical cabana',
      shortDesc: 'Ultimate seclusion featuring your own turquoise plunge pool, shaded poolside cabana, outdoor rain shower, and dedicated butler service.',
      longDesc: 'Your own private resort within the resort. The Private Pool Villa boasts a sun-drenched courtyard centered around a sparkling turquoise plunge pool. Spend languid afternoons on shaded daybeds, indulge in poolside floating breakfasts, and unwind under a starlit outdoor monsoon shower with complete discretion.',
      occupancy: '3 Guests',
      bed: '1 King Bed + Lounge Daybed',
      size: '155 m² / 1,668 sq ft',
      view: 'Private Pool & Enclosed Courtyard',
      price: '₹ 72,000',
      period: '/ night',
      amenities: [
        'High-Speed Wi-Fi',
        'Multi-Zone Climate Control & AC',
        'Dedicated 24/7 Villa Butler Service',
        'Private Freshwater Plunge Pool',
        'Poolside Dining Cabana & Daybeds',
        'Outdoor Starlit Monsoon Shower',
        'Floating Breakfast Experience Available',
        'Complimentary Premium Mini-Bar'
      ],
      bookingUrl: 'booking.html?room=private-pool-villa'
    },
    'royal-beachfront-villa': {
      id: 'royal-beachfront-villa',
      name: 'Royal Beachfront Villa',
      category: 'villa',
      categoryLabel: 'Beachfront Villa',
      badge: 'Direct Beach Access',
      image: 'assets/images/room-beachfront-villa.jpg',
      alt: 'Royal Beachfront Villa set among palm groves directly on the private beach',
      shortDesc: 'Steps from pristine sands with direct private beach access, dual master bedrooms, an expansive timber deck, and personalized host service.',
      longDesc: 'Positioned along Auraveil\'s private coastal fringe, the Royal Beachfront Villa offers direct sandy path access to the shore. Two master king bedrooms with individual en-suite bathrooms, an expansive beachfront timber deck with daybeds, and an intimate dining sala make this the consummate escape for families or couples traveling together.',
      occupancy: '4 Guests',
      bed: '2 King Bedrooms (En-Suite)',
      size: '190 m² / 2,045 sq ft',
      view: 'Beachfront & Coastal Dunes',
      price: '₹ 84,000',
      period: '/ night',
      amenities: [
        'High-Speed Wi-Fi',
        'Zoned Multi-Room Climate Control',
        '24/7 Dedicated Butler Care',
        'Direct Private Beach Path',
        'Dual Master Spa En-Suites',
        'Spacious Living & Dining Pavilion',
        'Sunset Beach Bonfire Setup on Request',
        'Complimentary Airport Chauffeur'
      ],
      bookingUrl: 'booking.html?room=royal-beachfront-villa'
    },
    'presidential-penthouse': {
      id: 'presidential-penthouse',
      name: 'Presidential Penthouse',
      category: 'penthouse',
      categoryLabel: 'Top Floor Exclusive',
      badge: 'Oceanfront Penthouse',
      image: 'assets/images/room-penthouse.jpg',
      alt: 'Presidential Penthouse suite with panoramic floor-to-ceiling windows and ocean sunset view',
      shortDesc: 'Our crown jewel. 320° panoramic ocean views, private rooftop plunge pool, dedicated private elevator, and personalized chef service.',
      longDesc: 'Occupying the entire top tier of the resort, the Presidential Penthouse represents the pinnacle of seaside luxury. Featuring sweeping floor-to-ceiling glass façades, an expansive private sky deck with heated infinity plunge pool, two master king bedrooms with private marble spas, and culinary creations prepared in-suite by our executive chef.',
      occupancy: '4 Adults',
      bed: '2 California King Master Suites',
      size: '240 m² / 2,580 sq ft',
      view: '320° Panoramic Ocean & Coastline',
      price: '₹ 95,000',
      period: '/ night',
      amenities: [
        'Dedicated Ultra-Fast Wi-Fi',
        'Intelligent Climate & Temperature Control',
        'Personal In-Suite Chef & Sommelier',
        'Wraparound Oceanfront Sky Balcony',
        'Private Heated Plunge Pool & Jacuzzi',
        'Dual Master En-Suite Spas & Soaking Tub',
        'Walk-In Wardrobes & Dressing Salon',
        'Complimentary VIP Chauffeur Transfers'
      ],
      bookingUrl: 'booking.html?room=presidential-penthouse'
    },
    'royal-horizon-penthouse': {
      id: 'royal-horizon-penthouse',
      name: 'Royal Horizon Penthouse',
      category: 'penthouse',
      categoryLabel: 'Grand Penthouse',
      badge: 'Sky Sanctuary',
      image: 'assets/images/room-royal-horizon-penthouse.jpg',
      alt: 'Royal Horizon Penthouse sky pool terrace overlooking panoramic coastal horizons',
      shortDesc: 'The grandest residence in the resort. Spanning 320 m² with three master bedrooms, an infinity sky pool, private wine cellar, and 24/7 butler corps.',
      longDesc: 'The grandest architectural expression at Auraveil Resort & Spa. The Royal Horizon Penthouse commands unobstructed 360-degree vistas of the sea and surrounding tropical canopy. Comprising three lavish master suites, an infinity glass-edge sky pool, an in-suite sommelier tasting cellar, private gym pavilion, and round-the-clock bespoke butler and culinary service.',
      occupancy: '6 Guests',
      bed: '3 Grand King Suites',
      size: '320 m² / 3,444 sq ft',
      view: 'Complete 360° Coastal Horizon',
      price: '₹ 1,25,000',
      period: '/ night',
      amenities: [
        'Dedicated Ultra-Fast Wi-Fi',
        'Custom Climate & Aroma System',
        'Private Chef, Butler & Sommelier',
        'Infinity Glass Sky Pool & Hot Tub',
        'Private Wine & Cigar Cellar',
        'Private Fitness & Wellness Salon',
        'Three En-Suite Marble Spas',
        'Complimentary Helicopter / Chauffeur'
      ],
      bookingUrl: 'booking.html?room=royal-horizon-penthouse'
    }
  };

  function initCategoryFilters() {
    var filterBtns = document.querySelectorAll('.filter-btn');
    var roomCards = document.querySelectorAll('.room-card');

    if (!filterBtns.length || !roomCards.length) return;

    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var selectedCategory = this.getAttribute('data-filter');

        filterBtns.forEach(function (b) {
          b.classList.remove('active');
          b.setAttribute('aria-pressed', 'false');
        });
        this.classList.add('active');
        this.setAttribute('aria-pressed', 'true');

        roomCards.forEach(function (card) {
          var cardCategory = card.getAttribute('data-category');
          if (selectedCategory === 'all' || cardCategory === selectedCategory) {
            card.classList.remove('is-hidden');
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          } else {
            card.classList.add('is-hidden');
          }
        });
      });
    });
  }

  var lastFocusedElement = null;

  function initRoomModal() {
    var modal = document.getElementById('room-modal');
    var backdrop = document.getElementById('modal-backdrop');
    var closeBtn = document.getElementById('modal-close-btn');
    var viewButtons = document.querySelectorAll('[data-action="view-details"]');

    if (!modal) return;

    var modalImg = document.getElementById('modal-room-img');
    var modalBadge = document.getElementById('modal-room-badge');
    var modalTitle = document.getElementById('modal-room-title');
    var modalPrice = document.getElementById('modal-room-price');
    var modalPeriod = document.getElementById('modal-room-period');
    var modalOverview = document.getElementById('modal-room-overview');
    var modalOccupancy = document.getElementById('modal-spec-occupancy');
    var modalBed = document.getElementById('modal-spec-bed');
    var modalSize = document.getElementById('modal-spec-size');
    var modalView = document.getElementById('modal-spec-view');
    var modalAmenities = document.getElementById('modal-amenities-list');
    var modalBookBtn = document.getElementById('modal-book-btn');

    function openModal(roomId) {
      var data = ROOMS_DATA[roomId];
      if (!data) return;

      lastFocusedElement = document.activeElement;

      if (modalImg) {
        modalImg.src = data.image;
        modalImg.alt = data.alt;
      }
      if (modalBadge) modalBadge.textContent = data.badge;
      if (modalTitle) modalTitle.textContent = data.name;
      if (modalPrice) modalPrice.textContent = data.price;
      if (modalPeriod) modalPeriod.textContent = data.period;
      if (modalOverview) modalOverview.textContent = data.longDesc;
      if (modalOccupancy) modalOccupancy.textContent = data.occupancy;
      if (modalBed) modalBed.textContent = data.bed;
      if (modalSize) modalSize.textContent = data.size;
      if (modalView) modalView.textContent = data.view;

      if (modalAmenities) {
        modalAmenities.innerHTML = '';
        data.amenities.forEach(function (amenity) {
          var li = document.createElement('li');
          li.className = 'room-modal__amenity-item';
          li.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><polyline points="20 6 9 17 4 12"></polyline></svg><span>' + amenity + '</span>';
          modalAmenities.appendChild(li);
        });
      }

      if (modalBookBtn) {
        modalBookBtn.href = data.bookingUrl;
      }

      modal.classList.add('is-open');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';

      if (closeBtn) {
        setTimeout(function () {
          closeBtn.focus();
        }, 100);
      }
    }

    function closeModal() {
      modal.classList.remove('is-open');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';

      if (lastFocusedElement) {
        lastFocusedElement.focus();
      }
    }

    viewButtons.forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        var roomId = this.getAttribute('data-room-id');
        openModal(roomId);
      });
    });

    if (closeBtn) {
      closeBtn.addEventListener('click', function () {
        closeModal();
      });
    }

    if (backdrop) {
      backdrop.addEventListener('click', function () {
        closeModal();
      });
    }

    window.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' || e.keyCode === 27) {
        if (modal.classList.contains('is-open')) {
          closeModal();
        }
      }
    });
  }

  function initNavbarScroll() {
    var navbar = document.getElementById('navbar');
    var SCROLL_THRESHOLD = 60;

    if (!navbar) return;

    function updateNavbar() {
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
  }

  function initMobileNav() {
    var toggle = document.getElementById('nav-toggle');
    var menu = document.getElementById('nav-menu');

    if (!toggle || !menu) return;

    toggle.addEventListener('click', function () {
      var isOpen = menu.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      toggle.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    menu.querySelectorAll('.navbar__link, .btn').forEach(function (link) {
      link.addEventListener('click', function () {
        menu.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Open navigation menu');
        document.body.style.overflow = '';
      });
    });
  }

  function initScrollReveal() {
    var revealElements = document.querySelectorAll('.reveal');
    if (!revealElements.length) return;

    if (!('IntersectionObserver' in window)) {
      revealElements.forEach(function (el) {
        el.classList.add('is-visible');
      });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -30px 0px'
    });

    revealElements.forEach(function (el) {
      observer.observe(el);
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    initCategoryFilters();
    initRoomModal();
    initNavbarScroll();
    initMobileNav();
    initScrollReveal();
  });

})();
