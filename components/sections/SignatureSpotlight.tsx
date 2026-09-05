"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  ShoppingBag,
  CalendarDays,
  Wine,
  Check,
  Flame,
  Sun,
  Moon,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { useStore } from "@/context/StoreContext";
import { MENU_ITEMS } from "@/data/menu-data";
import { DishItem } from "@/types";

interface SpotlightItem {
  dish: DishItem;
  periodLabel: string;
  periodIcon: React.ElementType;
  timeSlot: string;
  image: string;
  actionType: "pickup" | "reserve";
}

const SPOTLIGHTS: SpotlightItem[] = [
  {
    dish:
      MENU_ITEMS.find((d) => d.id === "brunch-brioche-french-toast") || {
        id: "brunch-brioche-french-toast",
        name: "Caramelized Fig Brioche French Toast",
        frenchName: "Pain Perdu aux Figues Rôties",
        description:
          "Custard-soaked thick house brioche, pan-seared with burnt sugar crust, mission fig compote, smoked maple mascarpone cream, and candied pecans.",
        price: 21.0,
        category: "Griddle & Sweet",
        mealPeriod: ["breakfast", "brunch"],
        dietary: ["V"],
        pairing: "Maison Vanilla Bean Flat White",
        seasonal: true,
      },
    periodLabel: "Morning Highlight",
    periodIcon: Sun,
    timeSlot: "Served 7:00 AM – 3:30 PM",
    image: "/assets/spotlight-french-toast.jpg",
    actionType: "pickup",
  },
  {
    dish:
      MENU_ITEMS.find((d) => d.id === "lunch-burrata-tartine") || {
        id: "lunch-burrata-tartine",
        name: "Heirloom Burrata & Charred Peach Sourdough",
        frenchName: "Tartine de Burrata & Pêches Brûlées",
        description:
          "Fresh artisanal Pugliese burrata, wood-charred seasonal stone fruit, crushed pistachio pesto, wild arugula, and 12-year Modena balsamic glaze on grilled sourdough.",
        price: 21.0,
        category: "Sandwiches & Savory",
        mealPeriod: ["lunch", "brunch"],
        dietary: ["V"],
        pairing: "Skin-Contact Pinot Grigio Radikon",
        seasonal: true,
      },
    periodLabel: "Midday Highlight",
    periodIcon: Sparkles,
    timeSlot: "Served 11:30 AM – 4:30 PM",
    image: "/assets/spotlight-burrata-tartine.jpg",
    actionType: "pickup",
  },
  {
    dish:
      MENU_ITEMS.find((d) => d.id === "dinner-steak-frites") || {
        id: "dinner-steak-frites",
        name: "Prime Ribeye Steak Frites",
        frenchName: "Entrecôte Grillée & Frites Maison",
        description:
          "12oz 45-day dry-aged Prime ribeye seared over white oak coals, roasted bone marrow herb butter, wild watercress salad, and triple-cooked beef fat frites with black pepper béarnaise.",
        price: 54.0,
        category: "Wood-Fired Mains",
        mealPeriod: ["dinner"],
        dietary: ["GF", "NF"],
        pairing: "Châteauneuf-du-Pape Château de Beaucastel 2020",
        highlights: ["45-Day Dry-Aged Prime", "Triple-Cooked Frites", "Ember Seared"],
      },
    periodLabel: "Evening Brasserie Hearth",
    periodIcon: Moon,
    timeSlot: "Served 5:00 PM – 10:00 PM",
    image: "/assets/spotlight-steak-frites.jpg",
    actionType: "reserve",
  },
];

export function SignatureSpotlight() {
  const { addToCart, openBookingModal } = useStore();
  const [addedItems, setAddedItems] = useState<Record<string, boolean>>({});

  const handleAdd = (dish: DishItem) => {
    addToCart(dish, 1);
    setAddedItems((prev) => ({ ...prev, [dish.id]: true }));
    setTimeout(() => {
      setAddedItems((prev) => ({ ...prev, [dish.id]: false }));
    }, 2000);
  };

  return (
    <section className="w-full py-16 lg:py-24 bg-surface relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-medium text-primary uppercase tracking-widest">
              <Flame className="w-3.5 h-3.5" />
              <span>Culinary Highlights</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display tracking-tight text-foreground">
              Signature All-Day Dishes<span className="text-primary">.</span>
            </h2>
            <p className="text-foreground-muted text-base sm:text-lg leading-relaxed">
              Carefully calibrated seasonal dishes moving with the rhythm of the day. Each plated with organic produce and paired with natural cellar selections.
            </p>
          </div>

          <div className="shrink-0">
            <Link href="/menu">
              <Button
                variant="outline"
                size="md"
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                View Complete 30+ Item Menu
              </Button>
            </Link>
          </div>
        </div>

        {/* 3 Highlights Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {SPOTLIGHTS.map(({ dish, periodLabel, periodIcon: Icon, timeSlot, image, actionType }, idx) => {
            const isAdded = !!addedItems[dish.id];

            return (
              <motion.div
                key={dish.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: idx * 0.12 }}
                className="group bg-surface rounded-2xl sm:rounded-3xl border border-border overflow-hidden shadow-card hover:shadow-elevated hover:border-border-hover transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Visual Header */}
                  <div className="relative h-60 w-full overflow-hidden bg-surface-subtle">
                    <img
                      src={image}
                      alt={dish.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/75 via-foreground/20 to-transparent" />

                    {/* Top Left Period Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium bg-surface/95 text-foreground backdrop-blur-md shadow-subtle border border-white/20">
                        <Icon className="w-3.5 h-3.5 text-primary" />
                        {periodLabel}
                      </span>
                    </div>

                    {/* Top Right Dietary Badges */}
                    <div className="absolute top-4 right-4 flex items-center gap-1.5">
                      {dish.dietary?.map((tag) => (
                        <Badge key={tag} variant={tag} size="sm" className="bg-surface/90 backdrop-blur-md">
                          {tag}
                        </Badge>
                      ))}
                      {dish.seasonal && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-primary text-white shadow-subtle">
                          Seasonal
                        </span>
                      )}
                    </div>

                    {/* Bottom Title & Price Bar */}
                    <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-2">
                      <div className="text-white">
                        <p className="text-[11px] font-mono tracking-wider uppercase text-accent-gold-subtle">
                          {dish.frenchName}
                        </p>
                        <h3 className="text-lg font-bold font-display text-white leading-tight">
                          {dish.name}
                        </h3>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="text-lg sm:text-xl font-mono font-bold text-white bg-black/40 px-2.5 py-1 rounded-lg backdrop-blur-sm border border-white/10">
                          ${dish.price.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Body Details */}
                  <div className="p-6 space-y-4">
                    <p className="text-xs font-mono text-foreground-subtle flex items-center gap-1">
                      <span>{timeSlot}</span>
                    </p>

                    <p className="text-sm text-foreground-muted leading-relaxed font-sans line-clamp-3">
                      {dish.description}
                    </p>

                    {/* Sommelier Pairing Pill */}
                    {dish.pairing && (
                      <div className="p-3 rounded-xl bg-accent-gold-subtle/80 border border-accent-gold/30 flex items-start gap-2.5 text-xs text-foreground">
                        <Wine className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <div>
                          <span className="font-mono text-[10px] uppercase tracking-wider text-foreground-subtle block">
                            Sommelier Pairing
                          </span>
                          <span className="font-medium">{dish.pairing}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer Action Buttons */}
                <div className="p-6 pt-0 flex items-center gap-2 sm:gap-3">
                  <Link href="/menu" className="flex-1">
                    <Button
                      variant="secondary"
                      size="md"
                      className="w-full text-xs font-medium"
                    >
                      View on Menu
                    </Button>
                  </Link>

                  {actionType === "pickup" ? (
                    <Button
                      variant={isAdded ? "secondary" : "primary"}
                      size="md"
                      onClick={() => handleAdd(dish)}
                      leftIcon={
                        isAdded ? (
                          <Check className="w-3.5 h-3.5 text-accent-fresh" />
                        ) : (
                          <ShoppingBag className="w-3.5 h-3.5" />
                        )
                      }
                      className="flex-1 text-xs"
                    >
                      {isAdded ? "Added to Bag" : "Add to Bag"}
                    </Button>
                  ) : (
                    <Button
                      variant="primary"
                      size="md"
                      onClick={openBookingModal}
                      leftIcon={<CalendarDays className="w-3.5 h-3.5" />}
                      className="flex-1 text-xs"
                    >
                      Reserve Table
                    </Button>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
