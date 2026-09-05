"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  Clock,
  Wheat,
  Leaf,
  ShoppingBag,
  Check,
  CalendarDays,
  Flame,
  Coffee,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { useStore } from "@/context/StoreContext";
import { MENU_ITEMS } from "@/data/menu-data";

export function HeroBento() {
  const { openBookingModal, addToCart, openCart } = useStore();
  const [addedDrop, setAddedDrop] = useState(false);

  const sourdoughItem =
    MENU_ITEMS.find((item) => item.id === "bakery-sourdough-loaf") || {
      id: "bakery-sourdough-loaf",
      name: "Country Sourdough Boule (Whole Loaf)",
      price: 11.0,
      description: "48-hour cold fermented signature loaf.",
      category: "Bread & Pantry",
      mealPeriod: ["breakfast", "brunch", "lunch"],
      dietary: ["VG", "V", "DF"],
      isBakeryPickup: true,
    };

  const handleQuickAdd = () => {
    addToCart(sourdoughItem, 1);
    setAddedDrop(true);
    setTimeout(() => setAddedDrop(false), 2400);
  };

  return (
    <section className="relative w-full pt-6 pb-16 lg:pt-10 lg:pb-24 overflow-hidden">
      {/* Background Ambience Subtle Accents */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-tr from-accent-gold-subtle/50 via-primary/5 to-transparent rounded-full blur-3xl pointer-events-none -z-10"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 lg:gap-6">
          {/* Main Large Focal Tile (Spans 12 cols on mobile, 8 cols on desktop) */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-8 bg-surface rounded-2xl sm:rounded-3xl border border-border p-6 sm:p-10 lg:p-12 flex flex-col justify-between relative overflow-hidden shadow-card group"
          >
            {/* Background Texture & Ambient Visual */}
            <div className="absolute top-0 right-0 w-full sm:w-2/3 h-full overflow-hidden opacity-10 sm:opacity-15 pointer-events-none select-none">
              <img
                src="/assets/hero-sourdough.jpg"
                alt="Freshly baked artisan sourdough loaf on stone counter"
                className="w-full h-full object-cover object-center mix-blend-multiply transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-surface via-surface/80 to-transparent" />
            </div>

            {/* Top Meta: Live Status Pill */}
            <div className="relative z-10 flex flex-wrap items-center gap-2 sm:gap-3 mb-6 sm:mb-8">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent-fresh-subtle text-accent-fresh border border-accent-fresh/25 text-xs font-mono font-medium shadow-subtle">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-fresh opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-fresh" />
                </span>
                <span>Autumn Harvest Menu Active · Serving All-Day Brunch Now</span>
              </div>
              <span className="hidden sm:inline-flex text-foreground-subtle text-xs font-mono">
                Saint-Germain-des-Prés
              </span>
            </div>

            {/* Main Content Area */}
            <div className="relative z-10 max-w-2xl space-y-4 sm:space-y-6">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold font-display tracking-tight text-foreground leading-[1.08]">
                From Morning Hearth to{" "}
                <span className="text-primary italic font-normal">Midnight Cellar.</span>
              </h1>

              <p className="text-base sm:text-lg text-foreground-muted leading-relaxed font-sans max-w-xl">
                An Apple-grade all-day culinary house in Paris. Crafting 48-hour wild sourdough and laminated viennoiserie from dawn, single-origin espresso at midday, and wood-fired French hearth cooking through the evening.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="relative z-10 pt-8 sm:pt-10 flex flex-wrap items-center gap-3 sm:gap-4">
              <Button
                variant="primary"
                size="lg"
                onClick={openBookingModal}
                leftIcon={<CalendarDays className="w-4 h-4" />}
                className="w-full sm:w-auto shadow-md"
              >
                Reserve a Table
              </Button>

              <Link href="/menu" className="w-full sm:w-auto">
                <Button
                  variant="secondary"
                  size="lg"
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                  className="w-full sm:w-auto"
                >
                  Explore All-Day Menu
                </Button>
              </Link>
            </div>

            {/* Subtle bottom detail strip */}
            <div className="relative z-10 mt-8 pt-6 border-t border-border/80 flex flex-wrap items-center justify-between text-xs text-foreground-muted gap-4">
              <div className="flex items-center gap-2">
                <Flame className="w-3.5 h-3.5 text-primary" />
                <span>White Oak Ember Hearth</span>
              </div>
              <div className="flex items-center gap-2">
                <Coffee className="w-3.5 h-3.5 text-accent-gold" />
                <span>Specialty Micro-Lot Roastery</span>
              </div>
              <div className="flex items-center gap-2">
                <Wheat className="w-3.5 h-3.5 text-accent-fresh" />
                <span>Stone-Milled Heritage Wheat</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column Bento Stack (Spans 4 cols on desktop) */}
          <div className="lg:col-span-4 flex flex-col gap-4 lg:gap-6">
            {/* Stat Tile 1: 48h Fermentation */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="bg-surface rounded-2xl sm:rounded-3xl border border-border p-6 flex flex-col justify-between shadow-card relative overflow-hidden group hover:border-border-hover transition-colors"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-accent-gold-subtle flex items-center justify-center text-foreground">
                  <Clock className="w-5 h-5 text-accent-gold-hover" />
                </div>
                <Badge variant="gold" size="sm">
                  Daily Bake Schedule
                </Badge>
              </div>

              <div>
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-4xl sm:text-5xl font-extrabold font-display text-foreground tracking-tight">
                    48h
                  </span>
                  <span className="text-xs font-mono text-foreground-subtle uppercase tracking-wider">
                    Cold Ferment
                  </span>
                </div>
                <h3 className="text-sm font-semibold text-foreground mb-1">
                  Wild-Yeast Sourdough
                </h3>
                <p className="text-xs text-foreground-muted leading-relaxed">
                  Natural wild starter nurtured since 2018. Pulled crisp and blistered from stone hearths at 7:00 AM, 11:30 AM, and 4:00 PM.
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-border flex items-center justify-between text-[11px] font-mono text-foreground-subtle">
                <span>84% Hydration Ratio</span>
                <span className="text-accent-fresh font-medium">Normandy Butter</span>
              </div>
            </motion.div>

            {/* Stat Tile 2: 100% Organic Sourcing */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="bg-surface rounded-2xl sm:rounded-3xl border border-border p-6 flex flex-col justify-between shadow-card relative overflow-hidden group hover:border-border-hover transition-colors"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-accent-fresh-subtle flex items-center justify-center text-accent-fresh">
                  <Leaf className="w-5 h-5" />
                </div>
                <span className="inline-flex items-center gap-1 text-[11px] font-mono text-accent-fresh font-medium">
                  <Sparkles className="w-3 h-3" />
                  Regenerative Soil
                </span>
              </div>

              <div>
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-4xl sm:text-5xl font-extrabold font-display text-foreground tracking-tight">
                    100%
                  </span>
                  <span className="text-xs font-mono text-foreground-subtle uppercase tracking-wider">
                    Organic Farm
                  </span>
                </div>
                <h3 className="text-sm font-semibold text-foreground mb-1">
                  Direct Purveyor Sourcing
                </h3>
                <p className="text-xs text-foreground-muted leading-relaxed">
                  Hudson Valley heirloom produce, Bodega Bay day-boat catches, and single-estate French dairy sourced under 90 miles.
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-border flex items-center justify-between text-[11px] font-mono text-foreground-subtle">
                <span>18 Direct Farm Partners</span>
                <Link
                  href="/story"
                  className="text-primary hover:underline font-sans font-medium text-xs flex items-center gap-0.5"
                >
                  Meet Purveyors →
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Bottom Bento Row: Mini Quick-Action Tile (Spans full width or 12 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-12 bg-surface-subtle/80 border border-border rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-subtle flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-surface border border-border flex items-center justify-center text-primary shadow-subtle shrink-0">
                <Wheat className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono uppercase tracking-wider font-semibold text-primary">
                    Today&apos;s Bakery Drop
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-amber-100 text-amber-900 font-medium">
                    Batch #03 Fresh Out of Hearth
                  </span>
                </div>
                <p className="text-sm font-medium text-foreground mt-0.5">
                  Country Sourdough Boule (Whole Loaf) · $11.00 · Limited to 80 loaves daily
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <Button
                variant={addedDrop ? "secondary" : "primary"}
                size="md"
                onClick={handleQuickAdd}
                leftIcon={
                  addedDrop ? (
                    <Check className="w-4 h-4 text-accent-fresh" />
                  ) : (
                    <ShoppingBag className="w-4 h-4" />
                  )
                }
                className="w-full sm:w-auto"
              >
                {addedDrop ? "Added to Pickup Bag" : "Add Sourdough to Bag ($11)"}
              </Button>

              <button
                type="button"
                onClick={openCart}
                className="text-xs font-mono text-foreground-muted hover:text-foreground underline underline-offset-4 shrink-0 hidden md:inline-block"
              >
                View Bag
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
