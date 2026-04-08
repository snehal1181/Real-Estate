# 🏡 LuxEstate — Luxury Real Estate Website

> *Defining the Art of Luxury Living Since 2003.*

A fully responsive, multi-page luxury real estate website built with HTML, CSS, and vanilla JavaScript. Designed to showcase premium properties with an elegant, high-end aesthetic.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Pages](#pages)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Contact](#contact)
- [License](#license)

---

## Overview

**LuxEstate** is a premium real estate platform that connects discerning buyers with extraordinary properties. The website showcases exclusive luxury listings in prime locations such as Beverly Hills, Miami Beach, Manhattan, and Scottsdale, with property types ranging from Villas and Mansions to Penthouses and Bungalows.

The project is a static front-end website with no back-end dependencies — making it easy to deploy on any web host.

---

## Pages

| Page | File | Description |
|------|------|-------------|
| **Home** | `index.html` | Hero slider, property search, featured listings, about section |
| **Properties** | `properties.html` | Full property catalogue with filters and pagination |
| **About** | `about.html` | Founder story, mission & vision, meet the team |
| **Contact** | `contact.html` | Contact form, office location, consultation booking |

---

## Features

- ✨ **Animated Preloader** — Custom SVG home icon with waving ring animations
- 🏠 **Hero Slider** — Auto-playing full-screen background image carousel
- 🔍 **Property Search** — Filter by location, type, and price range with URL-parameter routing
- 📄 **Pagination** — Client-side pagination on the Properties page (6 per page)
- 🪟 **Property Detail Modal** — Image carousel + full specs in a Bootstrap modal
- 🌙 **Dark/Light Theme Toggle** — Persists user preference via `localStorage`
- 📱 **Fully Responsive** — Mobile-first layout using Bootstrap 5 grid
- 🎬 **Scroll Animations** — IntersectionObserver-powered fade/slide-in effects
- 📬 **Newsletter Subscription** — Footer email capture field

---

## Tech Stack

| Technology | Purpose |
|------------|---------|
| **HTML5** | Page structure & semantic markup |
| **CSS3** (Vanilla) | Custom styles, animations, dark mode |
| **JavaScript (ES6+)** | Interactivity, filtering, slider, modals |
| **Bootstrap 5.3** | Responsive grid, modals, navbar collapse |
| **Font Awesome 6** | Icons throughout the UI |
| **Google Fonts** | *Playfair Display* (headings) + *Poppins* (body) |
| **Unsplash** | High-quality property photography (CDN) |

---

## Project Structure

```
Real-Estate/
│
├── index.html          # Homepage
├── properties.html     # Properties listing page
├── about.html          # About us page
├── contact.html        # Contact page
│
├── styles.css          # Global / shared styles
├── main.js             # Shared JavaScript logic
│
├── css/
│   ├── home.css        # Homepage-specific styles
│   ├── about.css       # About page-specific styles
│   ├── properties.css  # Properties page-specific styles
│   └── contact.css     # Contact page-specific styles
│
├── README.md           # Project documentation
├── LICENSE.txt         # License information
└── CHANGELOG.txt       # Version history
```

---

## Getting Started

Since this is a purely static website, no build tools or package managers are required.

### Prerequisites

- A modern web browser (Chrome, Firefox, Edge, Safari)
- An internet connection (external CDN assets are loaded at runtime)

### Running Locally

**Option 1 — Open directly:**
Simply open `index.html` in any modern web browser.

**Option 2 — Local development server (recommended):**

Using VS Code + Live Server extension:
1. Install the [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension in VS Code.
2. Right-click `index.html` → **Open with Live Server**.
3. The site will be served at `http://127.0.0.1:5500`.

Using Python's built-in server:
```bash
# Python 3
python -m http.server 5500
```
Then visit `http://localhost:5500` in your browser.

---

## Usage

### Navigation
- Use the top navbar to switch between **Home**, **Properties**, **About**, and **Contact**.
- Click **Book Consultation** to jump directly to the Contact page.
- Toggle 🌙/☀️ to switch between light and dark themes.

### Searching Properties
1. From the **Home** page, use the search box to select *Location*, *Property Type*, and *Price Range*.
2. Click **Search** — the site will redirect to the Properties page with your filters pre-applied.
3. Click **Clear Filters** on the Properties page to reset all filters.

### Viewing Property Details
- Click **View Details** on any property card to open a detailed modal.
- The modal displays a full image carousel (exterior + interiors), price, location, beds, baths, sqft, and a description.

---

## Contact

**LuxEstate Head Office**
- 📍 123 Luxury Lane, Beverly Hills, CA
- 📞 +1 (555) 123-4567
- 📧 info@luxestate.com

**Social Media:**
- Facebook | Twitter | Instagram | LinkedIn

---

## License

This project is licensed under the MIT License. See the [LICENSE.txt](LICENSE.txt) file for full details.

---

*© 2023 LuxEstate. All Rights Reserved.*
