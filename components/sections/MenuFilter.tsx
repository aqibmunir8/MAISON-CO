"use client";

import React from "react";
import { motion } from "framer-motion";
import { Search, X, SlidersHorizontal, Check } from "lucide-react";
import { DietaryTag } from "@/types";
import { Badge } from "@/components/ui/Badge";

export type MealPeriodFilter =
  | "all"
  | "breakfast_bakery"
  | "brunch"
  | "lunch"
  | "dinner"
  | "beverages_cellar";

export interface MealPeriodOption {
  id: MealPeriodFilter;
  label: string;
  hours: string;
}

export const MEAL_PERIOD_OPTIONS: MealPeriodOption[] = [
  { id: "all", label: "All Items", hours: "All Day" },
  { id: "breakfast_bakery", label: "Breakfast & Bakery", hours: "7:00 – 11:30 AM" },
  { id: "brunch", label: "All-Day Brunch", hours: "10:00 AM – 3:30 PM" },
  { id: "lunch", label: "Midday & Lunch", hours: "11:30 AM – 4:30 PM" },
  { id: "dinner", label: "Evening Brasserie & Hearth", hours: "5:00 – 10:00 PM" },
  { id: "beverages_cellar", label: "Beverages & Cellar", hours: "All Day" },
];

export interface DietaryOption {
  id: DietaryTag;
  label: string;
  shortLabel: string;
}

export const DIETARY_OPTIONS: DietaryOption[] = [
  { id: "V", label: "Vegetarian", shortLabel: "V" },
  { id: "VG", label: "Vegan", shortLabel: "VG" },
  { id: "GF", label: "Gluten-Free", shortLabel: "GF" },
  { id: "DF", label: "Dairy-Free", shortLabel: "DF" },
  { id: "NF", label: "Nut-Free", shortLabel: "NF" },
];

interface MenuFilterProps {
  activePeriod: MealPeriodFilter;
  onPeriodChange: (period: MealPeriodFilter) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedDietary: DietaryTag[];
  onToggleDietary: (dietary: DietaryTag) => void;
  onClearFilters: () => void;
  totalResults: number;
}

export const MenuFilter: React.FC<MenuFilterProps> = ({
  activePeriod,
  onPeriodChange,
  searchQuery,
  onSearchChange,
  selectedDietary,
  onToggleDietary,
  onClearFilters,
  totalResults,
}) => {
  const isAnyFilterActive =
    activePeriod !== "all" ||
    searchQuery.trim().length > 0 ||
    selectedDietary.length > 0;

  return (
    <div className="w-full space-y-5 bg-[#FAF9F5] border border-[#E8E8E2] rounded-2xl p-4 sm:p-6 shadow-sm">
      {/* 1. Meal Period Pill Switcher */}
      <div className="relative">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none snap-x">
          {MEAL_PERIOD_OPTIONS.map((period) => {
            const isActive = activePeriod === period.id;
            return (
              <button
                key={period.id}
                type="button"
                onClick={() => onPeriodChange(period.id)}
                className={`relative px-4 py-2.5 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-all duration-200 snap-start shrink-0 flex items-center gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B4461B] ${
                  isActive
                    ? "text-white shadow-sm"
                    : "text-[#525866] hover:text-[#1A1A1A] hover:bg-[#EFEFEA] bg-white border border-[#E8E8E2]"
                }`}
                aria-pressed={isActive}
              >
                {isActive && (
                  <motion.div
                    layoutId="activePeriodPill"
                    className="absolute inset-0 bg-[#B4461B] rounded-full"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10 font-serif font-normal">{period.label}</span>
                <span
                  className={`relative z-10 text-[10px] font-mono px-1.5 py-0.5 rounded-full ${
                    isActive
                      ? "bg-black/20 text-white/90"
                      : "bg-[#F4F4F0] text-[#717784]"
                  }`}
                >
                  {period.hours}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Search Bar + Dietary Filter Row */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 pt-2 border-t border-[#E8E8E2]/60">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#717784]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search sourdough, oysters, wagyu, matcha..."
            className="w-full pl-10 pr-10 py-2 text-sm bg-white border border-[#E8E8E2] rounded-xl text-[#1A1A1A] placeholder:text-[#848C9E] focus:outline-none focus:ring-2 focus:ring-[#B4461B]/20 focus:border-[#B4461B] transition-colors"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#717784] hover:text-[#1A1A1A] p-0.5 rounded-full"
              aria-label="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Dietary Filters + Reset */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1.5 text-xs font-mono text-[#717784] mr-1">
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#B4461B]" />
            <span className="hidden sm:inline">Dietary:</span>
          </div>

          {DIETARY_OPTIONS.map((diet) => {
            const isSelected = selectedDietary.includes(diet.id);
            return (
              <button
                key={diet.id}
                type="button"
                onClick={() => onToggleDietary(diet.id)}
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium transition-all border ${
                  isSelected
                    ? "bg-[#1E6B52] text-white border-[#1E6B52] shadow-xs"
                    : "bg-white text-[#525866] border-[#E8E8E2] hover:bg-[#F4F4F0] hover:text-[#1A1A1A]"
                }`}
                aria-pressed={isSelected}
              >
                {isSelected && <Check className="w-3 h-3 stroke-[2.5]" />}
                <span>{diet.label}</span>
                <span className={`text-[10px] ${isSelected ? "text-white/80" : "text-[#848C9E]"}`}>
                  ({diet.shortLabel})
                </span>
              </button>
            );
          })}

          {/* Clear Filters Button */}
          {isAnyFilterActive && (
            <button
              type="button"
              onClick={onClearFilters}
              className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-mono text-[#B4461B] hover:text-[#933412] hover:bg-[#B4461B]/10 border border-transparent transition-colors ml-auto sm:ml-2"
            >
              <X className="w-3 h-3" />
              <span>Clear All</span>
            </button>
          )}
        </div>
      </div>

      {/* 3. Result Counter */}
      <div
        aria-live="polite"
        className="flex items-center justify-between text-xs font-mono text-[#717784] pt-1"
      >
        <span>
          Showing <strong className="text-[#1A1A1A] font-semibold">{totalResults}</strong> {totalResults === 1 ? "culinary creation" : "culinary creations"}
        </span>
        {isAnyFilterActive && (
          <span className="text-[#B4461B] text-[11px]">Filtered view active</span>
        )}
      </div>
    </div>
  );
};
