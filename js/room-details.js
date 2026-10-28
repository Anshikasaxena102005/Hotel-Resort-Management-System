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

/* Room Details & Pricing Calculator */
var currentRoomId = "deluxe-room";
var currentRate = 320;

var roomDatabase = {
  "deluxe-room": {
    name: "Deluxe Room",
    category: "Garden Sanctuary",
    rate: 320,
    guests: "Up to 2 Guests",
    bed: "King or Twin",
    view: "Resort Courtyard & Garden",
    size: "420 sq.ft. / 39 m²",
    description: "An intimate sanctuary offering warm contemporary comfort, marble bath, and private garden patio.",
    mainImage: "assets/images/room-deluxe-suite.jpg",
    gallery: [
      "assets/images/room-deluxe-suite.jpg",
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=85"
    ],
    amenities: {
      rest: ["King or Twin Plush Pillowtop Beds", "600-thread-count Egyptian Linens", "Down & Hypoallergenic Pillows", "Blackout Linen Drapes"],
      bath: ["Marble Walk-in Rain Shower", "Custom Botanical Bath Amenities", "Plush Terry Robes & Slippers", "Illuminated Vanity Mirror"],
      dining: ["Nespresso Coffee Atelier", "Artisanal Tea Selection", "Curated Local Mini Bar", "Complimentary Spring Water"],
      tech: ["55-inch Ultra HD Smart TV", "Bang & Olufsen Bluetooth Audio", "High-speed Fiber Wi-Fi", "Bedside USB-C Ports"],
      services: ["Twice-daily Housekeeping", "Evening Turndown Ritual", "24-hour In-room Dining", "Private Safe & Steamer"]
    }
  },
  "premium-room": {
    name: "Premium Room",
    category: "Panoramic Azure Bay",
    rate: 480,
    guests: "Up to 3 Guests",
    bed: "King Bed",
    view: "Panoramic Azure Bay",
    size: "580 sq.ft. / 54 m²",
    description: "Expansive living spaces with floor-to-ceiling glass doors opening onto an oceanfront balcony.",
    mainImage: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=85",
      "assets/images/room-garden-villa.jpg",
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=85"
    ],
    amenities: {
      rest: ["Custom King Bed with Sea View", "Fine Italian Linen Sheets", "Aromatherapy Pillow Menu", "Motorized Sun Shades"],
      bath: ["Deep Freestanding Stone Tub", "Twin Vessel Sinks", "Rain & Waterfall Dual Shower", "Luxury Designer Toiletries"],
      dining: ["Temperature-Controlled Wine Fridge", "Handmade Ceramic Espresso Bar", "Artisanal Cocktail Kit", "Daily Fresh Tropical Fruit"],
      tech: ["65-inch 4K OLED Smart TV", "Sonos Sound Architecture", "Ultra-fast Fiber Connection", "Integrated Ambient Lighting Controls"],
      services: ["Dedicated Floor Concierge", "Priority Spa & Dining Booking", "Daily Evening Canapés Service", "Shoeshine & Valet Pressing"]
    }
  },
  "executive-suite": {
    name: "Executive Suite",
    category: "Coastline & Horizon",
    rate: 720,
    guests: "Up to 4 Guests",
    bed: "Master King + Daybed",
    view: "Coastline & Horizon",
    size: "850 sq.ft. / 79 m²",
    description: "Dedicated executive lounge access, separate parlor, deep soaking jacuzzi tub, and bespoke butler service.",
    mainImage: "assets/images/room-garden-villa.jpg",
    gallery: [
      "assets/images/room-garden-villa.jpg",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=85",
      "assets/images/room-deluxe-suite.jpg"
    ],
    amenities: {
      rest: ["Master King Suite + Daybed", "Goose Down Duvets & Silk Linens", "Walk-in Dressing Salon", "Soundproof Architectural Glazing"],
      bath: ["Deep Soaking Jacuzzi Bath", "Private Steam Shower Enclosure", "Heated Marble Floors", "Diptqyue Luxury Fragrances"],
      dining: ["Full Private Cocktail Atelier", "Separate Dining Room", "Sommelier-Selected Wine Refrigerator", "Complimentary Gourmet Basket"],
      tech: ["Multi-Zone Audio System", "Dual 65-inch Smart TVs", "Smart Tablet Room Control", "Wireless Fast Charging Pads"],
      services: ["24-Hour Bespoke Butler Service", "Unpacking & Wardrobe Management", "Fast-track Private Airport Transit", "Laundry & Valet Service"]
    }
  },
  "luxury-suite": {
    name: "Luxury Suite",
    category: "Private Oceanfront Penthouse",
    rate: 950,
    guests: "Up to 4 Guests",
    bed: "Grand California King",
    view: "Private Oceanfront Penthouse",
    size: "1,350 sq.ft. / 125 m²",
    description: "Our signature residence featuring private infinity plunge pool, dining terrace, and evening canapés.",
    mainImage: "assets/images/room-penthouse.jpg",
    gallery: [
      "assets/images/room-penthouse.jpg",
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=85",
      "assets/images/facility-pool.jpg",
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=85"
    ],
    amenities: {
      rest: ["Grand California King Suite", "Private Outdoor Infinity Plunge Pool", "Expansive Sunken Sun Lounge", "800-thread Organic Egyptian Linen"],
      bath: ["Panoramic Ocean-Edge Bathtub", "Open-air Rain Garden Pavilion", "Double Steam Sauna", "Bespoke Apothecary Collection"],
      dining: ["Chef's Prep Kitchen & 8-seat Dining Terrace", "Welcome Dom Pérignon & Canapés", "Unlimited Private Mini Bar", "Daily Caviar & Sunset Tasting"],
      tech: ["75-inch Master Display", "Sonos Architectural Hi-Fi System", "iPad Smart Sanctuary Automation", "Private High-Speed Satellite Link"],
      services: ["Dedicated Personal Head Butler", "Private In-Suite Chef On Call", "Luxury Maybach / Helipad Transfer", "Complimentary Unlimited Laundry"]
    }
  }
};

function loadRoom(roomId) {
  var data = roomDatabase[roomId];
  if (!data) return;
  currentRoomId = roomId;
  currentRate = data.rate;

  var isSubfolder = window.location.pathname.indexOf('/html/') !== -1;
  var imagePrefix = isSubfolder ? '../' : '';

  var breadcrumb = document.getElementById('breadcrumb-room-name');
  if (breadcrumb) breadcrumb.textContent = data.name;

  var titleEl = document.getElementById('detail-room-name');
  if (titleEl) titleEl.textContent = data.name;

  var badgeEl = document.getElementById('detail-category-badge');
  if (badgeEl) badgeEl.textContent = data.category;

  var descEl = document.getElementById('detail-description');
  if (descEl) descEl.textContent = data.description;

  var sizeEl = document.getElementById('detail-size');
  if (sizeEl) sizeEl.textContent = data.size;

  var bedEl = document.getElementById('detail-bed');
  if (bedEl) bedEl.textContent = data.bed;

  var guestsEl = document.getElementById('detail-guests');
  if (guestsEl) guestsEl.textContent = data.guests;

  var viewEl = document.getElementById('detail-view');
  if (viewEl) viewEl.textContent = data.view;

  var priceEl = document.getElementById('sidebar-price');
  if (priceEl) priceEl.textContent = '$' + data.rate;

  var mainImg = document.getElementById('main-image');
  if (mainImg) {
    mainImg.src = data.mainImage.startsWith('http') ? data.mainImage : (imagePrefix + data.mainImage);
  }

  var thumbsContainer = document.getElementById('gallery-thumbs');
  if (thumbsContainer) {
    thumbsContainer.innerHTML = '';
    data.gallery.forEach(function (url, index) {
      var fullUrl = url.startsWith('http') ? url : (imagePrefix + url);
      var thumb = document.createElement('div');
      thumb.className = 'room-thumb' + (index === 0 ? ' active' : '');
      thumb.innerHTML = '<img src="' + fullUrl + '" alt="Thumbnail ' + (index + 1) + '" />';
      thumb.onclick = function () {
        if (mainImg) mainImg.src = fullUrl;
        document.querySelectorAll('.room-thumb').forEach(function (t) { t.classList.remove('active'); });
        thumb.classList.add('active');
      };
      thumbsContainer.appendChild(thumb);
    });
  }

  function renderList(targetId, items) {
    var el = document.getElementById(targetId);
    if (!el || !items) return;
    el.innerHTML = '';
    items.forEach(function (item) {
      var div = document.createElement('div');
      div.className = 'amenities-list-item';
      div.textContent = item;
      el.appendChild(div);
    });
  }

  renderList('amenities-rest', data.amenities.rest);
  renderList('amenities-bath', data.amenities.bath);
  renderList('amenities-dining', data.amenities.dining);
  renderList('amenities-tech', data.amenities.tech);
  renderList('amenities-services', data.amenities.services);

  document.querySelectorAll('.filter-btn').forEach(function (btn) {
    if (btn.getAttribute('onclick') && btn.getAttribute('onclick').indexOf(roomId) !== -1) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  calculatePricing();
}

function calculatePricing() {
  var checkinInput = document.getElementById('res-checkin');
  var checkoutInput = document.getElementById('res-checkout');
  if (!checkinInput || !checkoutInput) return;

  var checkin = checkinInput.value;
  var checkout = checkoutInput.value;
  var nights = 2;

  if (checkin && checkout) {
    var d1 = new Date(checkin);
    var d2 = new Date(checkout);
    var diff = Math.ceil((d2 - d1) / (1000 * 60 * 60 * 24));
    if (diff > 0) nights = diff;
  }

  var subtotal = currentRate * nights;
  var tax = subtotal * 0.12;
  var total = subtotal + tax;

  var rateCalc = document.getElementById('rate-calculation');
  if (rateCalc) rateCalc.textContent = '$' + currentRate + ' × ' + nights + ' Night' + (nights > 1 ? 's' : '');

  var subtotalEl = document.getElementById('subtotal-amount');
  if (subtotalEl) subtotalEl.textContent = '$' + subtotal.toFixed(2);

  var taxEl = document.getElementById('tax-amount');
  if (taxEl) taxEl.textContent = '$' + tax.toFixed(2);

  var totalEl = document.getElementById('total-amount');
  if (totalEl) totalEl.textContent = '$' + total.toFixed(2);
}

function goToBooking() {
  var checkin = (document.getElementById('res-checkin') || {}).value || '';
  var checkout = (document.getElementById('res-checkout') || {}).value || '';
  var guests = (document.getElementById('res-guests') || {}).value || '2';
  var isSubfolder = window.location.pathname.indexOf('/html/') !== -1;
  var bookingPath = isSubfolder ? '../booking.html' : 'booking.html';

  var url = bookingPath + '?room=' + encodeURIComponent(currentRoomId) +
            '&checkin=' + encodeURIComponent(checkin) +
            '&checkout=' + encodeURIComponent(checkout) +
            '&guests=' + encodeURIComponent(guests);
  window.location.href = url;
}

document.addEventListener('DOMContentLoaded', function () {
  var checkinInput = document.getElementById('res-checkin');
  var checkoutInput = document.getElementById('res-checkout');

  if (checkinInput && checkoutInput) {
    var today = new Date();
    var tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 2);

    var d1 = today.toISOString().split('T')[0];
    var d2 = tomorrow.toISOString().split('T')[0];

    checkinInput.value = d1;
    checkinInput.min = d1;

    checkoutInput.value = d2;
    checkoutInput.min = d1;

    checkinInput.addEventListener('change', function () {
      checkoutInput.min = checkinInput.value;
      calculatePricing();
    });
    checkoutInput.addEventListener('change', calculatePricing);
  }

  var params = new URLSearchParams(window.location.search);
  var roomParam = params.get('room') || 'deluxe-room';
  loadRoom(roomParam);
});
