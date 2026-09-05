# Maison & Co. All-Day Brasserie & Bakery — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a complete, production-grade, Apple-inspired all-day brasserie and bakery website for "Maison & Co." with full interactive features, 5 core pages (`/`, `/menu`, `/story`, `/events-catering`, `/contact`), table reservation flow, pickup ordering cart, real-time dietary menu filtering, and a 3-step catering inquiry form.

**Architecture:** Next.js (App Router) + Tailwind CSS + Framer Motion for spring micro-interactions + Lucide / Phosphor vector icons. State management for the table reservation modal, all-day menu filters, and bakery pickup cart is powered by lightweight React state/context.

**Tech Stack:** Next.js 14+ / React 18+, TypeScript, Tailwind CSS, Framer Motion, Lucide Icons, clsx / tailwind-merge.

## Global Constraints

- **Canvas & Background:** Crisp warm porcelain `#FAFAF8` and pure white `#FFFFFF` cards.
- **Accents:** Warm Terracotta `#B4461B` (hover `#963813`), Champagne Gold `#CBB590`, Botanical Sage `#1E6B52`.
- **Typography:** `Outfit` for display headings, `Work Sans` for body text, `JetBrains Mono` for tabular prices and time slots.
- **Accessibility:** WCAG 2.2 AA compliant, minimum 44px touch targets, full keyboard accessibility with focus traps on modals/drawers, `aria-live` polite regions for cart and filter counters.
- **Zero Placeholders:** All copy, menu items, prices, farm names, and descriptions must be concrete, realistic, and evocative.

---

### Task 1: Scaffolding, Design Tokens, Global Fonts & Layout Setup

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `tailwind.config.ts`
- Create: `postcss.config.js`
- Create: `app/globals.css`
- Create: `app/layout.tsx`
- Create: `lib/utils.ts`

**Interfaces:**
- Produces: Tailwind theme with color tokens (`bg-[#FAFAF8]`, `primary: #B4461B`, `accent-gold: #CBB590`, `accent-fresh: #1E6B52`), font definitions, and root layout with global providers.

- [ ] **Step 1: Create package.json and project configuration**
  Install Next.js, React, Tailwind CSS, Framer Motion, Lucide React, clsx, and tailwind-merge.
- [ ] **Step 2: Configure tailwind.config.ts with custom color tokens & typography scale**
- [ ] **Step 3: Setup app/globals.css with CSS variables and custom scrollbar/utility classes**
- [ ] **Step 4: Create lib/utils.ts for cn() class merging utility**
- [ ] **Step 5: Create app/layout.tsx with metadata and global font wrappers**
- [ ] **Step 6: Run build check to verify setup works**

---

### Task 2: Structured Data Models & Mock Datasets

**Files:**
- Create: `types/index.ts`
- Create: `data/menu-data.ts`
- Create: `data/purveyors-data.ts`
- Create: `data/spaces-data.ts`
- Create: `data/team-data.ts`
- Create: `data/press-data.ts`

**Interfaces:**
- Produces: TypeScript interfaces (`DishItem`, `MenuCategory`, `Purveyor`, `EventSpace`, `TeamMember`, `ReservationDetails`, `CartItem`) and comprehensive datasets with 25+ curated dishes across all meal periods (Breakfast & Bakery, Brunch, Lunch, Dinner, Beverages & Cellar), 4 regional farms, 3 private dining spaces, and team profiles.

- [ ] **Step 1: Write types/index.ts with all core domain types**
- [ ] **Step 2: Create data/menu-data.ts with all meal periods, prices, dietary tags, pairings, and bakery items**
- [ ] **Step 3: Create data/purveyors-data.ts with farm partners, distances, and specialty ingredients**
- [ ] **Step 4: Create data/spaces-data.ts with event room capacities, minimum spends, and amenities**
- [ ] **Step 5: Create data/team-data.ts and data/press-data.ts**
- [ ] **Step 6: Verify data export integrity with a quick test script**

---

### Task 3: Core UI Component Primitives

**Files:**
- Create: `components/ui/Button.tsx`
- Create: `components/ui/Badge.tsx`
- Create: `components/ui/Accordion.tsx`
- Create: `components/ui/Modal.tsx`

**Interfaces:**
- Consumes: `lib/utils.ts`
- Produces: Reusable accessible primitives (`Button` with variants: primary, secondary, ghost, outline; `Badge` with dietary colors; `Accordion` for collapsible FAQ; `Modal` with backdrop blur, keyboard ESC dismissal, and focus trapping).

- [ ] **Step 1: Create components/ui/Button.tsx with spring press animation and loading states**
- [ ] **Step 2: Create components/ui/Badge.tsx with color tokens for dietary tags (GF, V, VG, DF)**
- [ ] **Step 3: Create components/ui/Accordion.tsx with smooth Framer Motion expand/collapse**
- [ ] **Step 4: Create components/ui/Modal.tsx with accessible dialog markup, backdrop blur, and body scroll lock**
- [ ] **Step 5: Test rendering of all primitives**

---

### Task 4: Global Navigation, Header & Footer Components

**Files:**
- Create: `context/StoreContext.tsx`
- Create: `components/layout/Header.tsx`
- Create: `components/layout/MobileNav.tsx`
- Create: `components/layout/Footer.tsx`

**Interfaces:**
- Consumes: `components/ui/Button.tsx`, `types/index.ts`
- Produces: `StoreContext` (managing reservation modal open/close, pickup cart items, active meal filters), sticky minimalist `Header` with live status indicator and cart trigger, animated `MobileNav` drawer, and multi-column `Footer`.

- [ ] **Step 1: Create context/StoreContext.tsx to manage global UI state (reservation modal, cart drawer, cart items)**
- [ ] **Step 2: Create components/layout/Header.tsx with glassmorphism blur, active page pill indicator, cart count badge, and "Reserve a Table" button**
- [ ] **Step 3: Create components/layout/MobileNav.tsx with smooth slide-over menu for mobile screens**
- [ ] **Step 4: Create components/layout/Footer.tsx with hours matrix, newsletter form, location details, and social links**
- [ ] **Step 5: Integrate Header & Footer into app/layout.tsx**

---

### Task 5: Interactive Modals & Pickup Cart Drawer

**Files:**
- Create: `components/reservation/BookingModal.tsx`
- Create: `components/cart/CartDrawer.tsx`

**Interfaces:**
- Consumes: `context/StoreContext.tsx`, `components/ui/Modal.tsx`, `components/ui/Button.tsx`
- Produces: Multi-step interactive table booking flow (guest counter, date picker, time slot chips, seating zone selector, confirmation toast) and slide-out bakery & coffee pickup cart with quantity controls and simulated checkout.

- [ ] **Step 1: Create components/reservation/BookingModal.tsx with 2-step reservation form, time slot selection, and confirmation card**
- [ ] **Step 2: Create components/cart/CartDrawer.tsx with item list, quantity adjusters, subtotal calculation, and pickup time selector**
- [ ] **Step 3: Mount BookingModal and CartDrawer inside app/layout.tsx**
- [ ] **Step 4: Verify open/close and state operations**

---

### Task 6: Homepage (`/`) Implementation

**Files:**
- Create: `components/sections/HeroBento.tsx`
- Create: `components/sections/PillarsCraft.tsx`
- Create: `components/sections/SignatureSpotlight.tsx`
- Create: `components/sections/AtmosphereGallery.tsx`
- Create: `components/sections/PressBanner.tsx`
- Create: `app/page.tsx`

**Interfaces:**
- Consumes: `data/menu-data.ts`, `data/press-data.ts`, `components/ui/Button.tsx`, `components/ui/Badge.tsx`
- Produces: Full Homepage experience featuring the Apple Bento grid hero with live status chips, 3 craft pillars, signature dish cards with dietary badges, atmosphere gallery, press review carousel/strip, and direct reservation CTA.

- [ ] **Step 1: Build components/sections/HeroBento.tsx with 3-tile bento layout, stat badges, and dual CTAs**
- [ ] **Step 2: Build components/sections/PillarsCraft.tsx featuring Sourdough, Coffee Roasting, and Wood-Fired Hearth**
- [ ] **Step 3: Build components/sections/SignatureSpotlight.tsx with 3 curated all-day dishes and pairing recommendations**
- [ ] **Step 4: Build components/sections/AtmosphereGallery.tsx with morning vs. evening space highlights**
- [ ] **Step 5: Build components/sections/PressBanner.tsx with acclaimed critic quotes**
- [ ] **Step 6: Assemble app/page.tsx with all homepage sections and verify layout**

---

### Task 7: All-Day Menu & Cellar Page (`/menu`)

**Files:**
- Create: `components/sections/MenuFilter.tsx`
- Create: `components/sections/DishCard.tsx`
- Create: `app/menu/page.tsx`

**Interfaces:**
- Consumes: `data/menu-data.ts`, `context/StoreContext.tsx`, `components/ui/Badge.tsx`, `components/ui/Button.tsx`
- Produces: Interactive all-day menu page with meal period tabs (Morning & Bakery, Brunch, Lunch, Dinner, Beverages/Cellar), real-time dietary filter toggles (GF, Vegan, V, DF), instant text search, dish cards with ingredient details and "Add to Pickup Cart" action.

- [ ] **Step 1: Build components/sections/MenuFilter.tsx with horizontal category pill switcher, search bar, and dietary filter chips**
- [ ] **Step 2: Build components/sections/DishCard.tsx with title, tabular mono price, artisanal ingredients, dietary badges, wine pairing pill, and "Add to Pickup" button**
- [ ] **Step 3: Assemble app/menu/page.tsx with state filtering, active count indicator, and zero-match empty state**
- [ ] **Step 4: Test filter, search, and cart integration**

---

### Task 8: Our Story & Craft Page (`/story`)

**Files:**
- Create: `components/sections/PurveyorGrid.tsx`
- Create: `app/story/page.tsx`

**Interfaces:**
- Consumes: `data/purveyors-data.ts`, `data/team-data.ts`
- Produces: Story page detailing Chef Julian Ross & Head Baker Antoine Mercier's founding journey, the deep-dive science of 48-hour wild sourdough and single-origin coffee roasting, interactive regional farm purveyor cards with mileage badges, and the zero-waste sustainability manifesto.

- [ ] **Step 1: Build founding narrative and culinary philosophy section**
- [ ] **Step 2: Build deep-dive craft cards for Sourdough, Coffee, and Open-Hearth Flame**
- [ ] **Step 3: Build components/sections/PurveyorGrid.tsx showcasing local farms and organic purveyors**
- [ ] **Step 4: Build sustainability and team manifesto section**
- [ ] **Step 5: Assemble app/story/page.tsx and verify typography and responsive flow**

---

### Task 9: Private Dining & Catering Page (`/events-catering`)

**Files:**
- Create: `components/sections/EventSpacesGrid.tsx`
- Create: `components/sections/EventForm.tsx`
- Create: `app/events-catering/page.tsx`

**Interfaces:**
- Consumes: `data/spaces-data.ts`, `components/ui/Accordion.tsx`, `components/ui/Button.tsx`
- Produces: Private dining page showcasing 3 dedicated spaces (The Baker's Mezzanine, The Garden Orangery, Full Buyout) with capacity/spend details, interactive 3-step event inquiry form with guest slider and cost estimator, and catering FAQ.

- [ ] **Step 1: Build components/sections/EventSpacesGrid.tsx with space photo cards, capacity tags, and feature lists**
- [ ] **Step 2: Build components/sections/EventForm.tsx with 3-step progressive inquiry workflow, live guest slider, and submission feedback**
- [ ] **Step 3: Build catering packages and FAQ accordion**
- [ ] **Step 4: Assemble app/events-catering/page.tsx and test multi-step form validation**

---

### Task 10: Visit & Contact Page (`/contact`)

**Files:**
- Create: `app/contact/page.tsx`

**Interfaces:**
- Consumes: `components/ui/Button.tsx`, `context/StoreContext.tsx`
- Produces: Visit page featuring physical address, styled interactive map visual, valet/transit directions, operating hours matrix across all meal periods, direct department email/phone cards, and guest dining etiquette guidelines.

- [ ] **Step 1: Build location overview with styled map placeholder and transit guides**
- [ ] **Step 2: Build detailed all-day operating hours matrix with current open/closed status**
- [ ] **Step 3: Build department contact cards (Reservations, Events, Press, Careers)**
- [ ] **Step 4: Build dining etiquette and dress code section**
- [ ] **Step 5: Assemble app/contact/page.tsx and test links**

---

### Task 11: End-to-End Build Verification, Accessibility & Polish

**Files:**
- Modify: Any files needing polish

**Interfaces:**
- Produces: Production build verification, testing of all interactive flows (table reservation modal, pickup cart drawer, menu filters, 3-step inquiry form), responsive verification across mobile/tablet/desktop, and WCAG 2.2 AA accessibility audit.

- [ ] **Step 1: Run Next.js production build (`npm run build` or framework equivalent) to ensure 0 TypeScript or linting errors**
- [ ] **Step 2: Verify all page routes navigate cleanly without 404s**
- [ ] **Step 3: Test table booking reservation modal flow end-to-end**
- [ ] **Step 4: Test bakery pickup cart add/remove/checkout flow end-to-end**
- [ ] **Step 5: Test menu filtering and search across all meal periods**
- [ ] **Step 6: Test catering inquiry form submission**
- [ ] **Step 7: Final responsive layout and a11y focus-ring inspection**

---
