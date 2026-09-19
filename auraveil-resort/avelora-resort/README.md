# AURAVEIL — Luxury Resort & Sanctuary

> *"A Different Kind of Extraordinary"*

A luxury 5-star hotel & resort frontend built from scratch with React, Vite, React Router, Tailwind CSS, and Lucide Icons.

---

## ✦ Key Modules & Features

### 1. Rooms & Suites Listing (`/rooms`)
- **Editorial Hero Section**: Cinematic high-resolution backdrop with quick statistics and smooth navigation cues.
- **Brand Narrative**: Architectural philosophy and holistic hospitality showcase.
- **Editorial Room Cards**: Alternating magazine-style asymmetric desktop layouts, smooth image hover zooms, room specs (Nightly rate in ₹, size, capacity, bedding, vistas), highlighted amenity tags, and direct detail routing.
- **Category Filtering**: Instant switching between All Sanctuaries, Suites & Penthouse, Private Villas, Ocean View, and Garden Retreats.
- **6 Full Sanctuaries**:
  1. *Garden View Room* — ₹12,500 / night
  2. *Ocean View Suite* — ₹18,500 / night
  3. *Private Pool Villa* — ₹27,500 / night
  4. *Grand Residence* — ₹35,000 / night
  5. *Presidential Suite* — ₹48,000 / night
  6. *Auraveil Signature Villa* — ₹65,000 / night

### 2. Dynamic Room Details (`/rooms/:id`)
- **Full-Width Hero Header**: Panoramic photography with contextual breadcrumbs and key attributes.
- **Two-Column Architectural Overview**:
  - *Left*: Expansive photography, curator notes on architectural nuances, and complete technical specifications.
  - *Right*: Detailed room narrative, metric badges, tariff breakdown, and sticky reservation action card.
- **Multi-Category Amenities**: Categorized breakdown (*Comfort & Rest*, *Bathroom & Spa*, *Refreshments & Bar*, *Technology & Entertainment*, *Services & Convenience*).
- **"Inside Your Stay" Gallery**: Interactive full-screen lightbox with multi-image navigation and descriptive captions.
- **"Reserve Your Stay" CTA Banner**: Interactive demo booking modal with guest counts, dates, and instant confirmation preview.
- **Alternative Sanctuaries Carousel**: Direct links to explore other rooms.

### 3. Facilities & Experiences (`/facilities`)
- **Editorial Hero Header**: Relaxing spa & wellness theme.
- **Resort Directory Grid**: Quick jump discovery for all 10 facilities.
- **Magazine Alternating Editorial Sections**:
  - Mix of primary and secondary architectural photography
  - Pull quotes and operating hours
  - Distinctive provisions and location tags
  - Alternating dark charcoal (`#151515`) and warm ivory/cream (`#F4F0E8`) background rhythms.
- **All 10 Facilities Included**:
  1. *Infinity Pool*
  2. *Auraveil Spa*
  3. *Signature Dining*
  4. *Fitness Studio*
  5. *Private Beach*
  6. *Concierge Service*
  7. *Airport Transfers*
  8. *Complimentary Wi-Fi*
  9. *Room Service*
  10. *Business & Events*

### 4. Interactive Reservation System
- Full-featured demo booking modal accessible from Navbar, Room Cards, Room Details, and Facilities.
- Real-time room selector, date pickers, guest counters, special request inputs, and confirmation screen.

---

## ✦ Getting Started

### Installation
```bash
cd auraveil-resort
npm install
```

### Running the Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### Building for Production
```bash
npm run build
```

---

## ✦ Project Structure
```
auraveil-resort/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── RoomHero.jsx
│   │   ├── RoomCard.jsx
│   │   ├── RoomGrid.jsx
│   │   ├── RoomAmenities.jsx
│   │   ├── RoomGallery.jsx
│   │   ├── FacilityHero.jsx
│   │   ├── FacilitySection.jsx
│   │   ├── FacilityCard.jsx
│   │   ├── ReservationModal.jsx
│   │   └── ScrollToTop.jsx
│   ├── pages/
│   │   ├── Rooms.jsx
│   │   ├── RoomDetails.jsx
│   │   ├── Facilities.jsx
│   │   └── NotFound.jsx
│   ├── data/
│   │   ├── rooms.js
│   │   └── facilities.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── vite.config.js
└── package.json
```
