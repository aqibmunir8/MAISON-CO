# 🥐 Maison & Co. All-Day Brasserie & Bakery — Website UI/UX Specification

> **Document Type:** Complete Product UI/UX Architecture & Content Blueprint  
> **Target Concept:** All-Day Cafe, Bakery & Modern Brasserie  
> **Aesthetic Direction:** Apple-Grade Minimalist, Pure Clean White Backdrop (`#FAFAF8` / `#FFFFFF`), Warm Terracotta (`#B4461B`) & Champagne Gold (`#CBB590`) Accents  
> **Frontend Stack:** Next.js (App Router), Tailwind CSS, Framer Motion, Lucide / Phosphor Icons  
> **Date:** September 2026  

---

## 📑 Table of Contents
1. [Brand Identity & Design System](#1-brand-identity--design-system)
2. [Global Navigation & Layout Architecture](#2-global-navigation--layout-architecture)
3. [Page Specifications](#3-page-specifications)
   - [3.1 Homepage (`/`)](#31-homepage-)
   - [3.2 All-Day Menu & Cellar (`/menu`)](#32-all-day-menu--cellar-menu)
   - [3.3 Our Story & Craft (`/story`)](#33-our-story--craft-story)
   - [3.4 Private Dining & Catering (`/events-catering`)](#34-private-dining--catering-events-catering)
   - [3.5 Visit & Contact (`/contact`)](#35-visit--contact-contact)
4. [Interactive Features & Modals](#4-interactive-features--modals)
5. [Component Library & Interactive Patterns](#5-component-library--interactive-patterns)
6. [Accessibility (a11y) & Technical Quality Standards](#6-accessibility-a11y--technical-quality-standards)
7. [Next.js Project Structure & File Map](#7-nextjs-project-structure--file-map)

---

## 1. Brand Identity & Design System

### 1.1 Color Palette & Tokens
The design follows an ultra-clean, Apple-inspired aesthetic featuring a crisp warm porcelain canvas, deep obsidian typography for maximum legibility (contrast > 14:1), warm terracotta accents for culinary warmth, and champagne gold for bakery cues.

```css
:root {
  /* Surface & Canvas */
  --color-background: #FAFAF8;          /* Warm Porcelain / Clean Canvas */
  --color-surface-card: #FFFFFF;        /* Pure Crisp White */
  --color-surface-subtle: #F4F4F0;      /* Muted Linen Grey */
  --color-surface-elevated: #FFFFFF;    /* Floating Overlays & Modals */
  
  /* Typography & Core Content */
  --color-foreground: #121316;          /* Deep Obsidian Slate */
  --color-foreground-muted: #525866;    /* Editorial Charcoal */
  --color-foreground-subtle: #848C9E;   /* Secondary Meta Text */
  
  /* Brand Accents */
  --color-primary: #B4461B;             /* Warm Terracotta / Hearth Flame */
  --color-primary-hover: #963813;       /* Deep Searing Terracotta */
  --color-on-primary: #FFFFFF;          /* Pure White Text on Primary */
  
  --color-accent-gold: #CBB590;         /* Vintage Champagne Gold */
  --color-accent-fresh: #1E6B52;        /* Botanical Herb / Sage */
  --color-accent-fresh-subtle: #E8F3EE; /* Delicate Herb Tint */
  
  /* Structural & Borders */
  --color-border: #E8E8E2;              /* 1px Fine Geometric Stroke */
  --color-border-hover: #C5C5BB;        /* Active Border Focus */
  --color-ring: #B4461B;                /* 2px Accessible Focus Ring */

  /* Functional / Validation */
  --color-destructive: #C92A2A;         /* Error Crimson */
  --color-destructive-bg: #FDF2F2;      /* Error Background */
  --color-success: #1E6B52;             /* Success Botanical */
  --color-success-bg: #E8F3EE;          /* Success Background */
}
```

### 1.2 Typography System
- **Display & Headings:** `Outfit` (Modern, architectural geometric sans-serif)
- **Body & Editorial Prose:** `Work Sans` (Crisp, Swiss-inspired, 16px base, 1.6 line height)
- **Tabular Figures & Badges:** `JetBrains Mono` / `Space Mono` (Numeric prices, times, fermentation hours)

```css
/* Typography Scale */
--text-display-2xl: clamp(2.75rem, 6vw, 4.5rem); /* Line height: 1.08, Tracking: -0.03em */
--text-display-xl:  clamp(2.25rem, 4.5vw, 3.25rem); /* Line height: 1.15, Tracking: -0.025em */
--text-h1:          clamp(1.875rem, 3.5vw, 2.5rem);  /* Line height: 1.2,  Tracking: -0.02em */
--text-h2:          clamp(1.5rem, 2.5vw, 2rem);      /* Line height: 1.25, Tracking: -0.015em */
--text-h3:          1.25rem;                         /* 20px, Line height: 1.4 */
--text-body-lg:     1.125rem;                        /* 18px, Line height: 1.6 */
--text-body:        1rem;                            /* 16px, Line height: 1.6 */
--text-sm:          0.875rem;                        /* 14px, Line height: 1.5 */
--text-xs:          0.75rem;                         /* 12px, Line height: 1.4, Tracking: 0.05em */
```

### 1.3 Spacing & Radius
- **Grid Scale:** 8-point incremental spacing (`8px`, `16px`, `24px`, `32px`, `48px`, `64px`, `96px`, `128px`)
- **Border Radius:**
  - `rounded-sm`: `4px` (Tags, dietary badges)
  - `rounded-md`: `8px` (Buttons, inputs, menu cards)
  - `rounded-lg`: `16px` (Bento tiles, modal cards)
  - `rounded-full`: `9999px` (Pill buttons, active indicators)

---

## 2. Global Navigation & Layout Architecture

### 2.1 Sticky Minimalist Header
- **Layout:** Fixed header with glassmorphism blur (`bg-white/90 backdrop-blur-md border-b border-[#E8E8E2]`).
- **Brand Identity:** **MAISON & CO.** in bold uppercase modern sans with terracotta dot accent. Subtitle: *ALL-DAY BRASSERIE & BAKERY · EST. 2021*.
- **Navigation Links:**
  - `Home` (`/`)
  - `All-Day Menu` (`/menu`)
  - `Our Story & Craft` (`/story`)
  - `Private Dining & Catering` (`/events-catering`)
  - `Visit & Contact` (`/contact`)
- **Utility Actions:**
  - *Live Status Pill:* `🟢 Open Today: 7:00 AM – 10:00 PM`
  - *Bakery Cart Trigger:* Badge counter displaying items in the pickup cart.
  - *Primary CTA Button:* **"Reserve a Table"** (triggers instant modal).
  - *Mobile Menu Trigger:* Animated hamburger toggle with accessible drawer.

### 2.2 Global Footer
- **Section 1: The Maison Manifesto & Newsletter:** Seasonal bake schedule and private cellar allocations signup.
- **Section 2: Operating Hours Matrix:**
  - *Morning Bakery & Specialty Coffee:* Mon–Sun: 7:00 AM – 3:30 PM
  - *All-Day Brunch & Lunch:* Mon–Fri: 11:00 AM – 3:30 PM | Sat & Sun: 9:00 AM – 3:30 PM
  - *Evening Brasserie & Hearth:* Tue–Sun: 5:00 PM – 10:00 PM
- **Section 3: Location & Transit:** 482 Saint-Germain Avenue, Suite 100 · Valet parking available · 2 min from Metro.
- **Section 4: Accolades & Socials:** Michelin Guide Selected 2024–2026, Eater 38 Essential, James Beard Foundation Nominee.

---

## 3. Page Specifications

### 3.1 Homepage (`/`)
- **Apple Bento Grid Hero:**
  - Large focal frame with high-resolution visual of artisanal pastries, morning pour-overs, and evening hearth dishes.
  - Stat Tile 1: `48h` sourdough fermentation cycle.
  - Stat Tile 2: `100%` organic local farm sourcing.
  - Live seasonal pill badge: `Autumn Harvest Menu Active · Serving All-Day Brunch Now`.
  - Action buttons: `Reserve a Table` & `Explore All-Day Menu`.
- **The 3 Pillars of Craft:**
  1. *Wild-Yeast Sourdough & Viennoiserie:* Baked fresh thrice daily.
  2. *Single-Origin Specialty Roastery:* Direct-trade roasted beans.
  3. *Wood-Fired Brasserie & Natural Cellar:* Ember hearth cooking and biodynamic wines.
- **Signature Dish Spotlight (3-Column Grid):**
  - *Morning:* House Brioche French Toast (caramelized figs, smoked maple mascarpone).
  - *Midday:* Heirloom Burrata & Wood-Fired Sourdough (charred peaches, basil oil).
  - *Evening:* Prime Steak Frites (bone marrow herb butter, wild watercress).
- **Atmosphere & Dining Spaces:** Photo showcase of morning coffee bar, sunlit garden patio, and evening candlelit cellar.
- **Press & Accolades Banner:** Quotes from Michelin Guide, Eater, and Bon Appétit.
- **Direct Reservation Callout:** Large banner inviting guests to book tables or inquire for private events.

### 3.2 All-Day Menu & Cellar (`/menu`)
- **Interactive Meal Period Switcher:**
  - `Morning & Bakery (7:00 AM – 11:30 AM)`
  - `All-Day Brunch (10:00 AM – 3:30 PM)`
  - `Midday & Lunch (11:30 AM – 4:30 PM)`
  - `Evening Brasserie & Hearth (5:00 PM – 10:00 PM)`
  - `Specialty Coffee, Beverages & Cellar`
- **Real-Time Dietary Filters & Instant Search:** Toggles for `Vegetarian [V]`, `Vegan [VG]`, `Gluten-Free [GF]`, `Dairy-Free [DF]` with instant dish filtering and active count badges.
- **Dish Cards:** Clear title, tabular mono price, artisanal ingredient list, dietary tags, beverage pairing recommendation, and "Add to Pickup Order" action.

### 3.3 Our Story & Craft (`/story`)
- **The Founding Narrative:** Michelin-trained Chef Julian Ross & Head Baker Antoine Mercier creating an unpretentious, craft-driven all-day brasserie.
- **The 3 Pillars Deep-Dive:** Comprehensive breakdown of daily bake schedules, coffee extraction science, and open-flame cooking.
- **Interactive Purveyor Map:** Showcase of partner farms (Heritage Valley Farm, Bodega Bay Fishery, Wildwood Foraging Co-op) with distance miles and specialty produce.
- **Sustainability & Team Manifesto:** Zero seed oils, 100% composted organic prep, 4-day kitchen work weeks.

### 3.4 Private Dining & Catering (`/events-catering`)
- **Dedicated Spaces Showcase:**
  - *The Baker’s Mezzanine* (12–18 guests seated)
  - *The Garden Orangery* (Up to 40 seated / 60 reception)
  - *Full Restaurant Buyout* (Up to 120 seated)
- **Interactive 3-Step Event Inquiry Builder:**
  - Step 1: Date, timeframe, guest slider (8 to 120+), event type.
  - Step 2: Space selection, dining format (4-Course Prix Fixe, Family Feast, Passed Canapés), wine pairing add-on.
  - Step 3: Contact information, budget range, special dietary notes, submission with `<24-Hour Guarantee>`.
- **Catering & Events FAQ:** Deposit terms, corkage policy, AV presentation setups.

### 3.5 Visit & Contact (`/contact`)
- **Location & Arrival Matrix:** Interactive styled map preview, valet parking notes, transit directions.
- **Direct Channels:** General reservations, event planning, press, career inquiries.
- **Guest Guidelines:** Attire recommendations, cancellation terms, family & children amenities.

---

## 4. Interactive Features & Modals

1. **Interactive Table Reservation Modal:**
   - Guest count selector (1–8+ guests).
   - Date picker & meal period selector.
   - Real-time time slot selector (e.g., 6:30 PM, 7:00 PM, 7:30 PM).
   - Seating zone preference (Main Dining Room, Garden Patio, Chef's Counter).
   - Guest contact details with instant confirmation code and feedback toast.
2. **Bakery & Coffee Online Pickup Cart:**
   - Slide-out drawer tracking fresh sourdough loaves, morning pastries, and whole-bean coffee bags.
   - Quantity controls, pickup time selector, subtotal calculation, simulated checkout.

---

## 5. Accessibility (a11y) & Technical Standards

- **WCAG 2.2 AA Compliance:** High contrast text (> 14:1 for headers, > 4.5:1 for body).
- **Keyboard Navigation:** Full focus trapping in modals and drawers, Escape key dismissal.
- **Motion Accessibility:** Framer Motion spring physics with `prefers-reduced-motion` fallbacks.
- **Semantic HTML & Live Regions:** `aria-live="polite"` for filter and cart count updates.

---

## 6. Next.js Project Structure & File Map

```
restaurant-website/
├── app/
│   ├── layout.tsx              # Root layout with fonts, header, footer, cart drawer & reservation modal
│   ├── page.tsx                # Homepage (Hero Bento, 3 Pillars, Signatures, Atmosphere, Press)
│   ├── menu/
│   │   └── page.tsx            # Interactive All-Day Menu, Dietary Filters & Search
│   ├── story/
│   │   └── page.tsx            # The 3 Craft Pillars, Purveyor Map & Sustainability
│   ├── events-catering/
│   │   └── page.tsx            # Private Spaces, Catering Packages & 3-Step Inquiry Form
│   ├── contact/
│   │   └── page.tsx            # Location, Hours Matrix, Directions & Direct Inquiries
│   └── globals.css             # Tailwind tokens, CSS variables & typography
├── components/
│   ├── layout/
│   │   ├── Header.tsx          # Sticky navigation with live status & cart trigger
│   │   ├── Footer.tsx          # Multi-column footer & newsletter
│   │   └── MobileNav.tsx       # Accessible mobile menu drawer
│   ├── ui/
│   │   ├── Button.tsx          # Primary, Secondary, Ghost, Icon button variants
│   │   ├── Badge.tsx           # Dietary, status, and season tags
│   │   ├── Accordion.tsx       # Accessible FAQ expander
│   │   └── Modal.tsx           # Accessible focus-trapped dialog
│   ├── sections/
│   │   ├── HeroBento.tsx       # Apple-style Bento grid hero
│   │   ├── MenuFilter.tsx      # Real-time category & dietary switcher
│   │   ├── DishCard.tsx        # Individual dish presentation card
│   │   ├── PurveyorGrid.tsx    # Interactive farm & producer showcase
│   │   └── EventForm.tsx       # Multi-step private event booking form
│   ├── reservation/
│   │   └── BookingModal.tsx    # Table reservation modal overlay
│   └── cart/
│       └── CartDrawer.tsx      # Slide-out bakery & coffee pickup cart
├── data/
│   ├── menu-data.ts            # Structured menu items, prices, pairings, allergens
│   ├── team-data.ts            # Chef, baker, and sommelier profiles
│   ├── spaces-data.ts          # Event room capacities, minimums, photos
│   └── purveyors-data.ts       # Local farm locations & specialty produce
└── tailwind.config.ts          # Color tokens, typography scale & animation configs
```
