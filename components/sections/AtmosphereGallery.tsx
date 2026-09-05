"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sun,
  CloudSun,
  Moon,
  Users,
  Clock,
  Sparkles,
  ArrowRight,
  Music,
  Maximize2,
  CalendarDays,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useStore } from "@/context/StoreContext";

interface TimeZoneAtmosphere {
  id: string;
  tabLabel: string;
  periodName: string;
  hours: string;
  icon: React.ElementType;
  headline: string;
  description: string;
  vibe: string;
  soundscape: string;
  seating: string;
  signatureRitual: string;
  image: string;
  alt: string;
  features: string[];
}

const ATMOSPHERES: TimeZoneAtmosphere[] = [
  {
    id: "morning",
    tabLabel: "Morning",
    periodName: "Morning Sunlit Bakery Counter",
    hours: "7:00 AM – 11:30 AM",
    icon: Sun,
    headline: "Warm Flour, Steam & Parisian Morning Light",
    description:
      "Floor-to-ceiling iron casement windows bathe the Carrera marble counters in crisp morning light. The golden aroma of laminated Normandy butter and 48-hour wild sourdough fills the room as our custom Slayer espresso machine begins its first extractions.",
    vibe: "Energizing, sunlit, bustling, aromatic",
    soundscape: "Soft acoustic jazz, hiss of steam wands, clatter of porcelain saucers",
    seating: "24 Walk-In Marble Counter Stools · Communal Baker’s Table",
    signatureRitual: "Fresh Kouign-Amann warm from hearth paired with a velvety Cortado",
    image:
      "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1200&auto=format&fit=crop",
    alt: "Sun-drenched marble bakery counter with fresh viennoiserie and espresso",
    features: [
      "Walk-In Pastry Case",
      "Direct-Trade Roastery Bar",
      "Complimentary Morning Broadsheets",
      "Grab-and-Go Bag Counter",
    ],
  },
  {
    id: "midday",
    tabLabel: "Midday",
    periodName: "Afternoon Garden Orangery & Patio",
    hours: "12:00 PM – 4:30 PM",
    icon: CloudSun,
    headline: "Breezy Glass Solarium & Natural Wine Lunches",
    description:
      "Dine under a canopy of climbing jasmine, citrus trees, and terracotta urns in our glass conservatory. Retractable glass roof panels open on fair days, creating a seamless indoor-outdoor sanctuary for long lunches and crisp chilled pét-nat.",
    vibe: "Lush, sun-dappled, convivial, botanical",
    soundscape: "Gentle courtyard fountain, French nu-disco, cheerful laughter",
    seating: "40 Seated Orangery Banquettes · Heated Terracotta Patio",
    signatureRitual: "Chilled Pugliese Burrata with peach sourdough & skin-contact orange wine",
    image:
      "https://images.unsplash.com/photo-1543007630-9710e4a00a20?q=80&w=1200&auto=format&fit=crop",
    alt: "Light-filled glass conservatory dining room with greenery and terracotta",
    features: [
      "Retractable Glass Solarium Roof",
      "Living Chef’s Herb Garden",
      "Aperitif & Spritz Bar",
      "Heated Radiant Terracotta Flooring",
    ],
  },
  {
    id: "evening",
    tabLabel: "Evening",
    periodName: "Candlelit Brasserie & Ember Hearth",
    hours: "5:00 PM – 11:00 PM",
    icon: Moon,
    headline: "White Oak Embers, Low Light & Cellar Pours",
    description:
      "As dusk falls over Saint-Germain, Maison & Co. transforms into an intimate, seductive culinary theater. The white oak hearth roars to life, casting amber shadows across dark walnut tables, while sommeliers decant rare biodynamic vintages.",
    vibe: "Intimate, seductive, warm, ember-lit",
    soundscape: "Crackling wood fire, ambient vinyl soul, wine glasses clinking",
    seating: "80 Main Dining Room Seats · 12-Seat Chef’s Hearth Counter",
    signatureRitual: "Dry-Aged Sonoma Duck Crown carved tableside with Châteauneuf-du-Pape",
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1200&auto=format&fit=crop",
    alt: "Atmospheric candlelit restaurant dining room with warm ambient glow and wine cellar",
    features: [
      "Open Hearth Live Fire Counter",
      "150+ Bottle Low-Intervention Cellar",
      "Dedicated Sommelier Tableside Pairings",
      "Late-Night Amaro Digestifs",
    ],
  },
];

export function AtmosphereGallery() {
  const [activeTab, setActiveTab] = useState<string>("morning");
  const { openBookingModal } = useStore();

  const current = ATMOSPHERES.find((a) => a.id === activeTab) || ATMOSPHERES[0];
  const CurrentIcon = current.icon;

  return (
    <section className="w-full py-16 lg:py-24 bg-background-subtle border-y border-border/70 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-12 gap-6">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-medium text-primary uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Architectural Rhythm</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display tracking-tight text-foreground">
              A Space that Shifts with the Sun<span className="text-primary">.</span>
            </h2>
            <p className="text-foreground-muted text-base sm:text-lg leading-relaxed">
              Explore how Maison & Co. transforms from a brisk sunlit morning bakehouse to an intimate, candlelit wood-fired hearth.
            </p>
          </div>

          {/* Interactive Time Switcher Tabs */}
          <div className="flex items-center p-1.5 bg-surface rounded-2xl border border-border shadow-subtle shrink-0">
            {ATMOSPHERES.map((item) => {
              const TabIcon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 select-none ${
                    isActive
                      ? "bg-foreground text-background shadow-sm font-semibold"
                      : "text-foreground-muted hover:text-foreground hover:bg-background-subtle"
                  }`}
                >
                  <TabIcon
                    className={`w-4 h-4 ${
                      isActive ? "text-accent-gold" : "text-foreground-subtle"
                    }`}
                  />
                  <span>{item.tabLabel}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Interactive Display Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 bg-surface rounded-2xl sm:rounded-3xl border border-border p-6 sm:p-10 shadow-card"
          >
            {/* Visual Photo Showcase (7 cols) */}
            <div className="lg:col-span-7 relative h-72 sm:h-96 lg:h-[460px] rounded-2xl overflow-hidden bg-surface-subtle group">
              <img
                src={current.image}
                alt={current.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/75 via-transparent to-transparent" />

              {/* Live Hours Tag */}
              <div className="absolute top-4 left-4">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono font-medium bg-surface/95 text-foreground backdrop-blur-md shadow-subtle border border-white/20">
                  <Clock className="w-3.5 h-3.5 text-primary" />
                  {current.hours}
                </span>
              </div>

              {/* Bottom Overlay Label */}
              <div className="absolute bottom-4 left-4 right-4">
                <p className="text-xs font-mono text-accent-gold uppercase tracking-wider mb-1">
                  {current.periodName}
                </p>
                <h3 className="text-xl sm:text-2xl font-bold font-display text-white">
                  {current.headline}
                </h3>
              </div>
            </div>

            {/* Atmosphere Specs & Description (5 cols) */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-xs font-mono text-primary uppercase tracking-wider font-semibold">
                  <CurrentIcon className="w-4 h-4" />
                  <span>{current.periodName}</span>
                </div>

                <p className="text-sm sm:text-base text-foreground-muted leading-relaxed font-sans">
                  {current.description}
                </p>

                {/* Specs Box */}
                <div className="space-y-3 pt-2">
                  <div className="p-3.5 rounded-xl bg-surface-subtle border border-border/80 space-y-1">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-foreground-subtle flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-primary" />
                      Capacity & Seating Format
                    </span>
                    <p className="text-xs font-medium text-foreground">
                      {current.seating}
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-surface-subtle border border-border/80 space-y-1">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-foreground-subtle flex items-center gap-1.5">
                      <Music className="w-3.5 h-3.5 text-accent-gold" />
                      Acoustics & Sound Architecture
                    </span>
                    <p className="text-xs font-medium text-foreground">
                      {current.soundscape}
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-accent-fresh-subtle/60 border border-accent-fresh/20 space-y-1">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-accent-fresh flex items-center gap-1.5 font-semibold">
                      <Sparkles className="w-3.5 h-3.5" />
                      Signature Experience
                    </span>
                    <p className="text-xs font-medium text-accent-fresh">
                      {current.signatureRitual}
                    </p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <Button
                  variant="primary"
                  size="md"
                  onClick={openBookingModal}
                  leftIcon={<CalendarDays className="w-4 h-4" />}
                  className="flex-1 text-xs"
                >
                  Reserve for {current.tabLabel}
                </Button>

                <Link href="/events-catering">
                  <Button
                    variant="secondary"
                    size="md"
                    rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                    className="text-xs"
                  >
                    Private Hire
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
