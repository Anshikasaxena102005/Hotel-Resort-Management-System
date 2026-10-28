# Rooms & Facilities Module — Auraveil Resort & Spa

**Developer:** Anshika Singh (Group 03, Section 3CB)  
**Project:** Hotel & Resort Management System (Static Website — HTML5 & CSS3)

---

## 📁 Module Structure

```
├── html/
│   ├── rooms.html             # Rooms listing page with filtering & room cards
│   ├── room-details.html      # Individual room specifications, gallery & demo booking
│   └── facilities.html        # Comprehensive resort facilities & amenities showcase
├── css/
│   ├── rooms.css              # Styling for room cards, specs grid, filter bar & sticky booking card
│   ├── facilities.css         # Styling for alternating facility showcases & amenities grid
│   └── style.css              # Main global design system stylesheet
├── data/
│   ├── rooms.json             # JSON mock data matching exact specification (USD rates)
│   └── facilities.json        # JSON mock data for all resort experiences & amenities
└── assets/                    # Optimized photography & media assets
```

---

## 🏨 Included Room Types (Exact Pricing & Specifications)

| Room ID | Room Name | Starting Rate | Max Guests | Bed Type | View |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `deluxe-room` | **Deluxe Room** | **$320** / night | 2 Guests | King or Twin | Resort Courtyard & Garden |
| `premium-room` | **Premium Room** | **$480** / night | 3 Guests | King Bed | Panoramic Azure Bay |
| `executive-suite` | **Executive Suite** | **$720** / night | 4 Guests | Master King + Daybed | Coastline & Horizon |
| `luxury-suite` | **Luxury Suite** | **$950** / night | 4 Guests | Grand California King | Private Oceanfront Penthouse |

---

## 🌿 Featured Facilities & Amenities

1. **Infinity Pool & Ocean Sundeck** (Aquatic Sanctuary, 6:00 AM – 10:00 PM)
2. **Veda Spa & Wellness Pavilion** (Holistic Ayurvedic & Hydrotherapy, 8:00 AM – 9:00 PM)
3. **Michelin-Inspired Signature Dining** (Gastronomic Excellence & 600-label wine cellar)
4. **Fitness Studio & Yoga Pavilion** (Technogym ARTIS suite & Sunrise yoga deck)
5. **Private White Sand Beach** (500m secluded coast with butler service)
6. **Private Yacht & Maritime Charters** (Bespoke 65ft motor yacht excursions)

---

## 🚀 Git & GitHub Push Commands

To push this module to your GitHub branch:

```bash
# 1. Switch or create feature branch
git switch -c feature/rooms-facilities
# (or if using existing branch): git switch feature/facilities

# 2. Stage the module files
git add rooms.html room-details.html facilities.html html/ css/rooms.css css/facilities.css data/

# 3. Commit with a meaningful message
git commit -m "feat(rooms-facilities): Add rooms listing, details, facilities pages and mock data"

# 4. Push to GitHub
git push -u origin feature/rooms-facilities
```
