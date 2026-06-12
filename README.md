# Urban Brew Café - Premium Restaurant Website

Urban Brew Café is a modern, premium, production-quality restaurant website built using React, Vite, Tailwind CSS v4, and Framer Motion. It features a dark-luxurious design tailored to a cozy cafe atmosphere with smooth typography, custom animations, a dynamic sticky navigation bar, and interactive ordering, reservation, authentication, and management dashboard systems.

---

## 🌟 Features

- **Premium Responsive Layout**: Designed mobile-first, rendering beautifully on smartphones, tablets, laptops, and large desktop screens.
- **Sticky Glassmorphism Navigation**: Stays pinned to the top on scroll, applying a blur overlay and utilizing scroll-spy to highlight the active section dynamically.
- **Special Experience Offers**: Spotlights promotional deals like the "Weekend Brunch Special" (20% Off Every Sunday) to increase customer conversion rates.
- **Interactive Menu Cards**: Categorized menu grid (Specialty Coffee, Gourmet Mains, Decadent Desserts, and Craft Beverages) with tab filters. Includes "+ Add to Bag" action triggers to buy food online.
- **Takeout Shopping Cart with Home Delivery**: Dynamic slide-out checkout panel. Features:
  - Toggle switcher between **Self-Pickup** (Free) and **Home Delivery** (+₹50 delivery charge).
  - Address and Landmark form input fields showing smooth entrance transitions.
  - Quantity counter increments, subtotal calculations, and a simulated loading checkout spinner.
  - Elegant order confirmation receipt displaying order type, payment totals, delivery duration (35 mins vs 15 mins), and address logs.
- **Interactive Seating Zone Selector**: Enhanced the reservation form with an interactive seating card selector allowing guests to pick **Cozy Booths**, **Window Side**, **Coffee Bar**, or **Garden Patio**, displaying the choice in the final confirmation overlay.
- **Bean-To-Cup Brewing Timeline**: An animated step-by-step progress timeline detailing bean sourcing, roasting, grinding, extraction, and latte micro-foam pouring, complete with beautiful coffee farm and local barista step-specific illustrations (Ethical sourcing, roasting, grinding, espresso, and latte pouring).
- **Dual Theme Switcher**: Dynamic theme switcher toggling between **Cozy Amber** (amber/charcoal tones) and **Midnight Onyx** (slate/silver tones) with smooth 0.5s transitions.
- **User & Admin Authentication Login**: Pinned dialog selector supporting email and password authentication. Features **one-click testing shortcuts** for rapid evaluation:
  - **User Role**: `user@urbanbrew.com` (password: `user123`)
  - **Admin Role**: `admin@urbanbrew.com` (password: `admin123`)
- **Live Admin Dashboard**: Restricted-access administrative control center that connects user checkouts and table bookings in real-time, featuring:
  - **Metrics Panel**: Live counters tracking Active Orders, Today's Bookings, and Table Occupancy Rates.
  - **Takeout & Delivery Orders**: View placed orders and advance their kitchen status: *Pending* -> *Preparing* -> *Out for Delivery* -> *Completed*.
  - **Reservations Log**: Manage guest bookings, times, and seats. Cancelling a booking automatically releases the reserved table.
  - **Table Vacancy Monitor**: Stylized cafe floor layout dividing the 20 tables into Booths, Patio, Bar, and Window zones, displaying occupied/empty statuses and supporting manual toggle overrides.
- **Indian Rupee (₹) Pricing**: Standardized all menu and signature product pricing in Indian Rupees (₹).
- **Dark-Themed Maps**: Embedded Google Maps location card styled with custom dark styling filters.
- **WhatsApp Floating Button**: Features pulsing rings to catch customer attention and opens direct reservation pre-filled chats.

---

## 🛠️ Tech Stack

- **Frontend Core**: [React.js](https://react.dev/) (v19)
- **Scaffolding/Bundler**: [Vite](https://vite.dev/) (v8)
- **Styling & Theme**: [Tailwind CSS v4](https://tailwindcss.com/) (using CSS-first configuration and `@tailwindcss/vite` compiler)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Backend Server**: [Express.js](https://expressjs.com/) (Node.js framework)
- **Database Connection**: [Mongoose](https://mongoosejs.com/)
- **Database**: [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

---

## 📂 Folder Structure

```
Urban-Brew-Cafe/
├── public/
│   └── favicon.svg      # Favicon logo
├── server/              # Backend Express Server
│   ├── .env             # Database connection credentials
│   └── server.js        # Schemas, seeding logic & API endpoints
├── src/
│   ├── assets/          # High-resolution generated food/interior assets
│   │   ├── hero_bg.png     # Café background banner
│   │   ├── espresso.png    # Espresso shot close up
│   │   ├── grinding.png    # Burr coffee grinder
│   │   ├── coffee.png      # Latte art pour
│   │   ├── burger.png      # Wagyu truffle burger
│   │   ├── dining.png      # Seating lounge interior
│   │   └── cheesecake.png  # Strawberry dessert plating
│   ├── components/      # Reusable UI elements
│   │   ├── Button.jsx      # Styled buttons with motion states
│   │   ├── Navbar.jsx      # Sticky responsive navigation with Scroll Spy
│   │   ├── CartDrawer.jsx  # Slide-out checkout drawer with Pickup/Delivery selector
│   │   ├── LoginModal.jsx  # Real database credentials checker
│   │   └── WhatsAppButton.jsx # Pulsing floating contact anchor
│   ├── sections/        # Section-specific content blocks
│   │   ├── Hero.jsx        # Splash page headline & initial CTA buttons
│   │   ├── About.jsx       # Brand story, chef values, and milestones
│   │   ├── BrewingProcess.jsx # Scroll-animated timeline detailing bean-to-cup stages
│   │   ├── Offers.jsx      # Promotional deals cards
│   │   ├── Menu.jsx        # Filterable culinary grid with Cart additions
│   │   ├── Signature.jsx   # Spotlights on best sellers
│   │   ├── Gallery.jsx     # Masonry-style ambiance grid
│   │   ├── Testimonials.jsx# Guest reviews cards
│   │   ├── Reservation.jsx # Fully interactive table booking form with Seating Map
│   │   ├── Contact.jsx     # Opening hours, dark map, and socials
│   │   └── AdminDashboard.jsx # Live admin order, booking, and vacancy manager
│   ├── App.jsx          # Orchestrator and wrapper layout
│   ├── index.css        # Tailwind v4 import, fonts, custom variables & scrollbars
│   └── main.jsx         # App entrypoint
├── index.html           # SEO headers, viewport scaling, and Google Fonts
├── package.json         # Build commands and package dependencies
└── vite.config.js       # Vite configuration with reverse proxy target
```

---

## 🎨 Theme Tokens (Custom HSL Palette)

The styling uses customized CSS theme variables defined inside `src/index.css`:

- **Cozy Amber Theme (Default)**: Warm wooden beige, primary coffee brown, and warm gold highlights.
- **Midnight Onyx Theme**: Sleek titanium silver highlights, titanium grays, and deep slate black backgrounds.
- **Transitions**: Global 0.5s CSS transitions bind color variables for a smooth, gradual fade when switching themes.

---

## 🚀 Getting Started

### 1. Prerequisites

Ensure you have [Node.js](https://nodejs.org/) installed (version 18+ is recommended).

### 2. Extraction & Installation

Clone this repository and navigate to the project directory:

```bash
cd Urban-Brew-Cafe
npm install
```

### 3. Database & Server Setup

Create a file named `.env` inside the `server/` directory and specify your MongoDB Atlas connection string (note that special characters in passwords, e.g. `@`, must be URL-encoded as `%40`):

```env
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/urban_brew?appName=Database
PORT=5000
```

### 4. Running Development Server

To spin up the React frontend and Node/Express backend concurrently:

```bash
npm run dev
```

The React client will be accessible at `http://localhost:5173` and requests prefixed with `/api` will be automatically proxied to the Express backend running at `http://localhost:5000`.

### 5. Compiling Production Build

To compile a minified, production-ready build:

```bash
npm run build
```

Vite will bundle all React assets, compress images, compile Tailwind CSS v4 styles, and dump everything inside the `dist/` directory.

### 6. Previewing Production Build

To locally spin up a web server showcasing the compiled bundle:

```bash
npm run preview
```

---

## 📦 Deployment Instructions

The project is fully compatible with modern serverless hosting providers like **Vercel** or **Netlify**.

### Vercel Deployment (CLI)
1. Install Vercel CLI: `npm install -g vercel`
2. Run `vercel` at the root of the project.
3. Link to your project and configure settings:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Run `vercel --prod` for production releases.

### GitHub Integration
Push the repository to GitHub and import it on [Vercel Dashboard](https://vercel.com). Vercel will auto-detect Vite settings and deploy on every git push.
