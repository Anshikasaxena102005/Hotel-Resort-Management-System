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

/* Rooms Filtering, Live Search & Sorting */
document.addEventListener('DOMContentLoaded', function () {
  var filterBtns = document.querySelectorAll('.filter-btn');
  var searchInput = document.getElementById('room-search-input');
  var sortSelect = document.getElementById('room-sort-select');
  var roomsContainer = document.querySelector('.rooms-grid');
  var countDisplay = document.getElementById('room-count-badge');

  if (!roomsContainer) return;

  var cards = Array.from(roomsContainer.querySelectorAll('.room-card'));
  var activeFilter = 'all';
  var searchQuery = '';

  function applyFiltersAndSort() {
    var visibleCards = [];

    cards.forEach(function (card) {
      var category = card.getAttribute('data-category') || '';
      var title = (card.querySelector('.room-card__title') || {}).textContent || '';
      var desc = (card.querySelector('.room-card__desc') || {}).textContent || '';
      var badge = (card.querySelector('.room-card__badge') || {}).textContent || '';

      var fullText = (title + ' ' + desc + ' ' + badge).toLowerCase();
      var matchesCategory = (activeFilter === 'all' || category === activeFilter);
      var matchesSearch = (!searchQuery || fullText.indexOf(searchQuery.toLowerCase()) !== -1);

      if (matchesCategory && matchesSearch) {
        card.style.display = 'flex';
        visibleCards.push(card);
      } else {
        card.style.display = 'none';
      }
    });

    if (sortSelect) {
      var sortValue = sortSelect.value;
      if (sortValue === 'price-asc') {
        visibleCards.sort(function (a, b) {
          return parseFloat(a.getAttribute('data-price') || 0) - parseFloat(b.getAttribute('data-price') || 0);
        });
      } else if (sortValue === 'price-desc') {
        visibleCards.sort(function (a, b) {
          return parseFloat(b.getAttribute('data-price') || 0) - parseFloat(a.getAttribute('data-price') || 0);
        });
      }

      visibleCards.forEach(function (card) {
        roomsContainer.appendChild(card);
      });
    }

    if (countDisplay) {
      countDisplay.textContent = 'Showing ' + visibleCards.length + ' of ' + cards.length + ' Sanctuaries';
    }
  }

  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      filterBtns.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      activeFilter = btn.getAttribute('data-filter') || 'all';
      applyFiltersAndSort();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', function (e) {
      searchQuery = e.target.value.trim();
      applyFiltersAndSort();
    });
  }

  if (sortSelect) {
    sortSelect.addEventListener('change', function () {
      applyFiltersAndSort();
    });
  }

  applyFiltersAndSort();
});
