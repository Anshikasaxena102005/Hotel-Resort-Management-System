/* Mobile Navigation Toggle */
(function () {
  var toggle = document.getElementById('nav-toggle');
  var menu = document.getElementById('nav-menu');
  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      var isOpen = menu.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  }
}());

/* Facilities Filtering & Quick View Modal */
document.addEventListener('DOMContentLoaded', function () {
  var filterBtns = document.querySelectorAll('.filter-btn');
  var facilityCards = document.querySelectorAll('.facility-showcase');
  var modalBackdrop = document.getElementById('facility-modal-backdrop');
  var modalClose = document.getElementById('facility-modal-close');

  /* Category Filter */
  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      filterBtns.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');

      var filter = btn.getAttribute('data-filter') || 'all';
      facilityCards.forEach(function (card) {
        var category = card.getAttribute('data-category') || '';
        if (filter === 'all' || category === filter) {
          card.style.display = 'grid';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  /* Quick View Modal Handler */
  function openQuickView(card) {
    if (!modalBackdrop) return;

    var title = (card.querySelector('.facility-showcase__heading') || {}).textContent || '';
    var tag = (card.querySelector('.facility-showcase__tag') || {}).textContent || '';
    var desc = (card.querySelector('.facility-showcase__desc') || {}).textContent || '';
    var imgEl = card.querySelector('.facility-showcase__img');
    var imgSrc = imgEl ? imgEl.src : '';
    var metaChips = card.querySelectorAll('.facility-meta-chip');
    var features = card.querySelectorAll('.facility-feature-item');

    var modalTitle = document.getElementById('modal-title');
    var modalTag = document.getElementById('modal-tag');
    var modalDesc = document.getElementById('modal-desc');
    var modalImg = document.getElementById('modal-img');
    var modalMeta = document.getElementById('modal-meta');
    var modalFeatures = document.getElementById('modal-features');

    if (modalTitle) modalTitle.textContent = title;
    if (modalTag) modalTag.textContent = tag;
    if (modalDesc) modalDesc.textContent = desc;
    if (modalImg) modalImg.src = imgSrc;

    if (modalMeta) {
      modalMeta.innerHTML = '';
      metaChips.forEach(function (chip) {
        var span = document.createElement('span');
        span.className = 'facility-meta-chip';
        span.innerHTML = chip.innerHTML;
        modalMeta.appendChild(span);
      });
    }

    if (modalFeatures) {
      modalFeatures.innerHTML = '';
      features.forEach(function (feat) {
        var span = document.createElement('span');
        span.className = 'facility-feature-item';
        span.textContent = feat.textContent;
        modalFeatures.appendChild(span);
      });
    }

    modalBackdrop.classList.add('is-active');
    document.body.style.overflow = 'hidden';
  }

  function closeQuickView() {
    if (!modalBackdrop) return;
    modalBackdrop.classList.remove('is-active');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('.btn-quick-view').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      var card = btn.closest('.facility-showcase');
      if (card) openQuickView(card);
    });
  });

  if (modalClose) {
    modalClose.addEventListener('click', closeQuickView);
  }

  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', function (e) {
      if (e.target === modalBackdrop) closeQuickView();
    });
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modalBackdrop && modalBackdrop.classList.contains('is-active')) {
      closeQuickView();
    }
  });

  /* Smooth scroll highlight if anchor is in URL */
  if (window.location.hash) {
    var target = document.querySelector(window.location.hash);
    if (target) {
      setTimeout(function () {
        target.scrollIntoView({ behavior: 'smooth', block: 'center' });
        target.style.outline = '2px solid var(--color-gold)';
        target.style.outlineOffset = '6px';
        setTimeout(function () {
          target.style.outline = 'none';
        }, 2500);
      }, 300);
    }
  }
});
