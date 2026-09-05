"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Wine, ShoppingBag, CalendarDays, Check, Sparkles } from "lucide-react";
import { DishItem } from "@/types";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { useStore } from "@/context/StoreContext";

// Fallback high-quality culinary photography mapping based on category or dish
const FALLBACK_IMAGES: Record<string, string> = {
  "Viennoiserie & Bakery":
    "https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=800&auto=format&fit=crop",
  "Bread & Pantry":
    "https://images.unsplash.com/photo-1589367920969-ab8e050bbb04?q=80&w=800&auto=format&fit=crop",
  "Savory Breakfast":
    "https://images.unsplash.com/photo-1525351484163-7529414344d8?q=80&w=800&auto=format&fit=crop",
  "Griddle & Sweet":
    "https://images.unsplash.com/photo-1484723091739-30a097e8f929?q=80&w=800&auto=format&fit=crop",
  "Skillet & Eggs":
    "https://images.unsplash.com/photo-1590412200988-a436970781fa?q=80&w=800&auto=format&fit=crop",
  "Seafood & Tartines":
    "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?q=80&w=800&auto=format&fit=crop",
  "Market Greens & Salads":
    "https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=800&auto=format&fit=crop",
  "Sandwiches & Savory":
    "https://images.unsplash.com/photo-1592417817098-8f3d6910985b?q=80&w=800&auto=format&fit=crop",
  "Soups & Starters":
    "https://images.unsplash.com/photo-1547592166-23ac45744acd?q=80&w=800&auto=format&fit=crop",
  "Wood-Fired Mains":
    "https://images.unsplash.com/photo-1558030006-450675393462?q=80&w=800&auto=format&fit=crop",
  "Hearth & Grains":
    "https://images.unsplash.com/photo-1633964913295-ceb43826e7c9?q=80&w=800&auto=format&fit=crop",
  "Raw Bar & Starters":
    "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?q=80&w=800&auto=format&fit=crop",
  "Specialty Coffee":
    "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=800&auto=format&fit=crop",
  "Aperitifs & Cocktails":
    "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=800&auto=format&fit=crop",
  "Natural Wine by the Glass":
    "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=800&auto=format&fit=crop",
};

interface DishCardProps {
  dish: DishItem;
}

export const DishCard: React.FC<DishCardProps> = ({ dish }) => {
  const { addToCart, openBookingModal } = useStore();
  const [isAdded, setIsAdded] = useState(false);
  const [imgError, setImgError] = useState(false);

  const fallbackImage =
    FALLBACK_IMAGES[dish.category] ||
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=800&auto=format&fit=crop";
  const displayImage = imgError || !dish.image ? fallbackImage : dish.image;

  // Items eligible for direct pickup bag: bakery items, whole bread, coffee, or marked as pickup
  const isPickupItem =
    dish.isBakeryPickup ||
    dish.category === "Viennoiserie & Bakery" ||
    dish.category === "Bread & Pantry" ||
    dish.category === "Specialty Coffee";

  const handleAddToCart = () => {
    addToCart(dish, 1);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 2000);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="group bg-white border border-[#E8E8E2] rounded-xl p-5 sm:p-6 hover:shadow-lg hover:border-[#D0D0C8] transition-all duration-300 flex flex-col justify-between"
    >
      <div>
        {/* Top Media / Thumbnail */}
        <div className="relative w-full h-44 sm:h-48 rounded-lg overflow-hidden bg-[#F4F4F0] mb-4">
          <img
            src={displayImage}
            alt={dish.name}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />

          {/* Category Tag (Top Left) */}
          <div className="absolute top-3 left-3">
            <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-medium bg-white/90 text-[#1A1A1A] backdrop-blur-md shadow-xs border border-white/40">
              {dish.category}
            </span>
          </div>

          {/* Seasonal / Special Badge (Top Right) */}
          {dish.seasonal && (
            <div className="absolute top-3 right-3">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-mono font-semibold bg-[#B4461B] text-white shadow-xs">
                <Sparkles className="w-2.5 h-2.5" />
                Seasonal
              </span>
            </div>
          )}

          {/* Price overlay at bottom corner */}
          <div className="absolute bottom-3 right-3">
            <span className="px-2.5 py-1 rounded-md text-sm sm:text-base font-mono font-bold text-white bg-black/60 backdrop-blur-md border border-white/10 tabular-nums">
              ${dish.price.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Title, French Subtitle & Price header */}
        <div className="mb-2">
          {dish.frenchName && (
            <p className="text-[11px] font-mono tracking-wider text-[#848C9E] uppercase mb-0.5">
              {dish.frenchName}
            </p>
          )}
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-lg sm:text-xl font-bold font-serif text-[#1A1A1A] leading-snug group-hover:text-[#B4461B] transition-colors">
              {dish.name}
            </h3>
            <span className="shrink-0 text-base sm:text-lg font-mono font-semibold text-[#B4461B] tabular-nums">
              ${dish.price.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Evocative Artisanal Description */}
        <p className="text-xs sm:text-sm text-[#525866] leading-relaxed mb-4 font-sans line-clamp-3">
          {dish.description}
        </p>

        {/* Ingredient Tag Pills / Highlights */}
        {dish.highlights && dish.highlights.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3.5">
            {dish.highlights.map((highlight) => (
              <span
                key={highlight}
                className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-[#FAF9F5] text-[#525866] border border-[#E8E8E2]"
              >
                {highlight}
              </span>
            ))}
          </div>
        )}

        {/* Dietary Badges */}
        {dish.dietary && dish.dietary.length > 0 && (
          <div className="flex flex-wrap items-center gap-1.5 mb-4">
            {dish.dietary.map((tag) => (
              <Badge key={tag} variant={tag} size="sm">
                {tag}
              </Badge>
            ))}
            {dish.calories && (
              <span className="text-[10px] font-mono text-[#848C9E] ml-auto">
                {dish.calories} kcal
              </span>
            )}
          </div>
        )}

        {/* Recommended Sommelier Pairing Callout */}
        {dish.pairing && (
          <div className="p-3 rounded-lg bg-[#FAF6EE] border border-[#E5D7BE] flex items-start gap-2 text-xs text-[#1A1A1A] mb-4">
            <Wine className="w-3.5 h-3.5 text-[#B4461B] shrink-0 mt-0.5" />
            <div className="min-w-0 flex-1">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#848C9E] block">
                Sommelier Pairing
              </span>
              <span className="font-medium text-[#2E2822] line-clamp-2">
                {dish.pairing}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Action Button */}
      <div className="pt-2 border-t border-[#F4F4F0] mt-auto">
        {isPickupItem ? (
          <Button
            variant={isAdded ? "secondary" : "primary"}
            size="sm"
            onClick={handleAddToCart}
            leftIcon={
              isAdded ? (
                <Check className="w-3.5 h-3.5 text-[#1E6B52]" />
              ) : (
                <ShoppingBag className="w-3.5 h-3.5" />
              )
            }
            className="w-full text-xs font-medium"
          >
            {isAdded ? "Added to Pickup Bag" : "Add to Pickup Bag"}
          </Button>
        ) : (
          <Button
            variant="outline"
            size="sm"
            onClick={openBookingModal}
            leftIcon={<CalendarDays className="w-3.5 h-3.5 text-[#B4461B]" />}
            className="w-full text-xs font-medium hover:border-[#B4461B] hover:text-[#B4461B]"
          >
            Reserve Table to Dine
          </Button>
        )}
      </div>
    </motion.div>
  );
};
