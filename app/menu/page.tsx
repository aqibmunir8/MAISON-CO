"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Clock,
  Wine,
  Croissant,
  Leaf,
  ShieldCheck,
  RotateCcw,
  Flame,
  ArrowRight,
  Sun,
  Moon,
  Coffee,
} from "lucide-react";
import { MENU_ITEMS, MENU_CATEGORIES } from "@/data/menu-data";
import { DietaryTag, DishItem, MealPeriod } from "@/types";
import { MenuFilter, MealPeriodFilter, DIETARY_OPTIONS } from "@/components/sections/MenuFilter";
import { DishCard } from "@/components/sections/DishCard";
import { Button } from "@/components/ui/Button";
import { useStore } from "@/context/StoreContext";

// Determine active live service based on local client hour
function getLiveMealPeriod(): { id: MealPeriodFilter; name: string; hours: string; icon: React.ElementType } {
  const hour = new Date().getHours();

  if (hour >= 7 && hour < 11) {
    return {
      id: "breakfast_bakery",
      name: "Breakfast & Morning Bakery",
      hours: "7:00 AM – 11:30 AM",
      icon: Sun,
    };
  } else if (hour >= 11 && hour < 14) {
    return {
      id: "brunch",
      name: "All-Day Brunch & Market Skillets",
      hours: "10:00 AM – 3:30 PM",
      icon: Coffee,
    };
  } else if (hour >= 14 && hour < 17) {
    return {
      id: "lunch",
      name: "Midday Sandwiches & Salads",
      hours: "11:30 AM – 4:30 PM",
      icon: Flame,
    };
  } else {
    return {
      id: "dinner",
      name: "Evening Brasserie & Hearth Fire",
      hours: "5:00 PM – 10:00 PM",
      icon: Moon,
    };
  }
}

export default function MenuPage() {
  const { openBookingModal } = useStore();
  const [activePeriod, setActivePeriod] = useState<MealPeriodFilter>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDietary, setSelectedDietary] = useState<DietaryTag[]>([]);

  const liveService = useMemo(() => getLiveMealPeriod(), []);

  const handleToggleDietary = (tag: DietaryTag) => {
    setSelectedDietary((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleClearFilters = () => {
    setActivePeriod("all");
    setSearchQuery("");
    setSelectedDietary([]);
  };

  // Filter Dishes Logic
  const filteredDishes = useMemo(() => {
    return MENU_ITEMS.filter((dish) => {
      // 1. Meal Period Matching
      if (activePeriod !== "all") {
        if (activePeriod === "breakfast_bakery") {
          const isBreakfast = dish.mealPeriod.includes("breakfast");
          const isBakery =
            dish.category.includes("Bakery") ||
            dish.category.includes("Viennoiserie") ||
            dish.category.includes("Bread");
          if (!isBreakfast && !isBakery) return false;
        } else if (activePeriod === "brunch") {
          if (!dish.mealPeriod.includes("brunch")) return false;
        } else if (activePeriod === "lunch") {
          if (!dish.mealPeriod.includes("lunch")) return false;
        } else if (activePeriod === "dinner") {
          if (!dish.mealPeriod.includes("dinner")) return false;
        } else if (activePeriod === "beverages_cellar") {
          const isDrink =
            dish.mealPeriod.includes("drinks") ||
            dish.category.includes("Coffee") ||
            dish.category.includes("Aperitifs") ||
            dish.category.includes("Wine");
          if (!isDrink) return false;
        }
      }

      // 2. Dietary Tag Matching (dish must satisfy all selected dietary tags)
      if (selectedDietary.length > 0) {
        const hasAllTags = selectedDietary.every((tag) =>
          dish.dietary.includes(tag)
        );
        if (!hasAllTags) return false;
      }

      // 3. Search Query Matching (Name, FrenchName, Description, Category, Highlights, Pairing)
      if (searchQuery.trim().length > 0) {
        const q = searchQuery.toLowerCase().trim();
        const matchName = dish.name.toLowerCase().includes(q);
        const matchFrench = dish.frenchName?.toLowerCase().includes(q) || false;
        const matchDesc = dish.description.toLowerCase().includes(q);
        const matchCat = dish.category.toLowerCase().includes(q);
        const matchHighlights =
          dish.highlights?.some((h) => h.toLowerCase().includes(q)) || false;
        const matchPairing = dish.pairing?.toLowerCase().includes(q) || false;

        if (
          !matchName &&
          !matchFrench &&
          !matchDesc &&
          !matchCat &&
          !matchHighlights &&
          !matchPairing
        ) {
          return false;
        }
      }

      return true;
    });
  }, [activePeriod, selectedDietary, searchQuery]);

  // Dietary counts for quick stats bar
  const stats = useMemo(() => {
    const gfCount = MENU_ITEMS.filter((d) => d.dietary.includes("GF")).length;
    const plantCount = MENU_ITEMS.filter((d) =>
      d.dietary.includes("VG") || d.dietary.includes("V")
    ).length;
    return {
      gfCount,
      plantCount,
    };
  }, []);

  return (
    <div className="flex flex-col w-full min-h-screen bg-[#FCFCFA] text-[#1A1A1A]">
      {/* 1. Page Header */}
      <section className="w-full pt-12 pb-8 sm:pt-16 sm:pb-12 bg-white border-b border-[#E8E8E2] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF6EE] text-[#B4461B] text-xs font-mono font-medium border border-[#E5D7BE]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Sourdough · Hearth · Biodynamic Terroirs</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold font-serif tracking-tight text-[#1A1A1A]">
              All-Day Culinary & Natural Cellar<span className="text-[#B4461B]">.</span>
            </h1>

            <p className="text-sm sm:text-base lg:text-lg text-[#525866] leading-relaxed font-sans">
              Daily morning viennoiserie laminated at 4:00 AM, 48-hour cold-fermented country sourdough, midday market tartines, and wood-fired brasserie hearth cooking paired with low-intervention natural wines.
            </p>
          </div>

          {/* Live Service Banner */}
          <div className="mt-8 p-4 sm:p-5 rounded-2xl bg-[#FAF9F5] border border-[#E8E8E2] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#1E6B52]/10 text-[#1E6B52] flex items-center justify-center shrink-0">
                <liveService.icon className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-mono uppercase tracking-wider text-[#1E6B52] font-semibold">
                    Serving Right Now
                  </span>
                </div>
                <h2 className="text-sm sm:text-base font-bold font-serif text-[#1A1A1A]">
                  {liveService.name} <span className="font-mono text-xs font-normal text-[#717784]">({liveService.hours})</span>
                </h2>
              </div>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setActivePeriod(liveService.id)}
              className="text-xs shrink-0 hover:bg-[#B4461B] hover:text-white hover:border-[#B4461B] transition-colors"
            >
              Filter to Current Service
            </Button>
          </div>

          {/* Quick Dietary Overview Bar */}
          <div className="mt-6 pt-6 border-t border-[#E8E8E2]/60 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono text-[#525866]">
            <div className="flex items-center gap-2 p-2.5 rounded-lg bg-[#FAF9F5]">
              <Leaf className="w-4 h-4 text-[#1E6B52] shrink-0" />
              <span>
                <strong className="text-[#1A1A1A]">{stats.plantCount}</strong> Plant-Forward
              </span>
            </div>
            <div className="flex items-center gap-2 p-2.5 rounded-lg bg-[#FAF9F5]">
              <ShieldCheck className="w-4 h-4 text-[#B4461B] shrink-0" />
              <span>
                <strong className="text-[#1A1A1A]">{stats.gfCount}</strong> Gluten-Free Dishes
              </span>
            </div>
            <div className="flex items-center gap-2 p-2.5 rounded-lg bg-[#FAF9F5]">
              <Croissant className="w-4 h-4 text-[#B4461B] shrink-0" />
              <span>100% Organic Sourcing</span>
            </div>
            <div className="flex items-center gap-2 p-2.5 rounded-lg bg-[#FAF9F5]">
              <Wine className="w-4 h-4 text-[#1E6B52] shrink-0" />
              <span>Low-Intervention Cellar</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Main Menu Interactive Catalog */}
      <section className="w-full py-8 sm:py-12 flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Filter Bar Component */}
          <MenuFilter
            activePeriod={activePeriod}
            onPeriodChange={setActivePeriod}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedDietary={selectedDietary}
            onToggleDietary={handleToggleDietary}
            onClearFilters={handleClearFilters}
            totalResults={filteredDishes.length}
          />

          {/* Dish Grid / Empty State */}
          {filteredDishes.length > 0 ? (
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              <AnimatePresence>
                {filteredDishes.map((dish) => (
                  <DishCard key={dish.id} dish={dish} />
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <div className="py-16 px-6 text-center bg-white border border-[#E8E8E2] rounded-2xl max-w-lg mx-auto space-y-4 shadow-sm">
              <div className="w-12 h-12 rounded-full bg-[#FAF6EE] text-[#B4461B] flex items-center justify-center mx-auto">
                <RotateCcw className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold font-serif text-[#1A1A1A]">
                No Culinary Matches Found
              </h3>
              <p className="text-sm text-[#525866] leading-relaxed">
                We couldn&apos;t find any dishes matching your current filter criteria. Try broadening your dietary selections or resetting filters.
              </p>
              <Button
                variant="primary"
                size="md"
                onClick={handleClearFilters}
                className="text-xs"
              >
                Reset All Filters
              </Button>
            </div>
          )}

          {/* 3. Bottom Sommelier & Bakery Note Card */}
          <div className="mt-12 bg-white border border-[#E8E8E2] rounded-2xl p-6 sm:p-8 lg:p-10 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-8 divide-y md:divide-y-0 md:divide-x divide-[#E8E8E2]">
            {/* Sommelier & Corkage Note */}
            <div className="space-y-3 md:pr-6">
              <div className="flex items-center gap-2 text-[#B4461B] font-mono text-xs uppercase tracking-wider font-semibold">
                <Wine className="w-4 h-4" />
                <span>Cellar Notes & Corkage Policy</span>
              </div>
              <h4 className="text-lg font-bold font-serif text-[#1A1A1A]">
                Natural, Biodynamic & Low-Intervention
              </h4>
              <p className="text-sm text-[#525866] leading-relaxed">
                Our cellar program features small-grower vignerons committed to regenerative viticulture with zero chemical additions. Guests are welcome to bring personal special cellar bottles for a corkage fee of <strong>$35 per 750ml bottle</strong> (maximum 2 bottles per party, waived with purchase of any bottle from our list).
              </p>
            </div>

            {/* Bakery Fresh Loaf Guarantee */}
            <div className="space-y-3 pt-6 md:pt-0 md:pl-6">
              <div className="flex items-center gap-2 text-[#1E6B52] font-mono text-xs uppercase tracking-wider font-semibold">
                <Croissant className="w-4 h-4" />
                <span>Bakery Hearth Reserve</span>
              </div>
              <h4 className="text-lg font-bold font-serif text-[#1A1A1A]">
                Daily Loaf & Viennoiserie Reservation
              </h4>
              <p className="text-sm text-[#525866] leading-relaxed">
                Our 48-hour wild sourdough loaves and morning viennoiserie drop fresh from the stone hearth daily at 7:00 AM. Add whole loaves or pastry boxes to your Pickup Bag before 10:00 AM to ensure reservation before counter sell-out.
              </p>
              <div className="pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={openBookingModal}
                  className="text-xs"
                >
                  Reserve a Table for Service
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
