"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Leaf,
  ShieldCheck,
  Sparkles,
  Wheat,
  Milk,
  Fish,
  Layers,
  Calendar,
  CheckCircle2,
  Navigation
} from "lucide-react";
import { PURVEYORS_DATA } from "@/data/purveyors-data";
import { Purveyor, PurveyorCategory } from "@/types";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

interface CategoryTab {
  id: PurveyorCategory;
  label: string;
  icon: React.ElementType;
  count: number;
}

export function PurveyorGrid() {
  const [selectedCategory, setSelectedCategory] = useState<PurveyorCategory>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const categories: CategoryTab[] = useMemo(() => {
    return [
      {
        id: "all",
        label: "All Partners",
        icon: Layers,
        count: PURVEYORS_DATA.length,
      },
      {
        id: "produce-grains",
        label: "Produce & Grains",
        icon: Wheat,
        count: PURVEYORS_DATA.filter((p) => p.category === "produce-grains").length,
      },
      {
        id: "dairy-eggs",
        label: "Dairy & Eggs",
        icon: Milk,
        count: PURVEYORS_DATA.filter((p) => p.category === "dairy-eggs").length,
      },
      {
        id: "seafood-meats",
        label: "Seafood & Meats",
        icon: Fish,
        count: PURVEYORS_DATA.filter((p) => p.category === "seafood-meats").length,
      },
    ];
  }, []);

  const filteredPurveyors = useMemo(() => {
    return PURVEYORS_DATA.filter((purveyor) => {
      const matchesCategory =
        selectedCategory === "all" || purveyor.category === selectedCategory;
      const matchesSearch =
        searchQuery.trim() === "" ||
        purveyor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        purveyor.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        purveyor.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
        purveyor.description.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <section className="w-full py-16 sm:py-24 bg-background-subtle border-t border-border/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono font-medium bg-emerald-50 text-emerald-800 border border-emerald-200/80 shadow-xs">
            <Leaf className="w-3.5 h-3.5 text-emerald-600" />
            <span>Rooted In The Soil & Sea</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display tracking-tight text-foreground">
            Our Regional Farm Purveyors<span className="text-primary">.</span>
          </h2>
          <p className="text-foreground-muted text-base sm:text-lg leading-relaxed">
            Great gastronomy begins six feet beneath the earth and fifty fathoms below the surface. We collaborate exclusively with independent stewards within a 100-mile micro-radius who honor regenerative agriculture, organic integrity, and zero chemical inputs.
          </p>

          {/* Aggregate Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-6 max-w-2xl mx-auto">
            <div className="p-3.5 rounded-2xl bg-surface border border-border text-center shadow-xs">
              <div className="text-2xl font-bold font-display text-primary">63 mi</div>
              <div className="text-[11px] font-mono text-foreground-muted uppercase tracking-wider mt-0.5">
                Avg. Radius
              </div>
            </div>
            <div className="p-3.5 rounded-2xl bg-surface border border-border text-center shadow-xs">
              <div className="text-2xl font-bold font-display text-primary">100%</div>
              <div className="text-[11px] font-mono text-foreground-muted uppercase tracking-wider mt-0.5">
                Direct-Trade
              </div>
            </div>
            <div className="p-3.5 rounded-2xl bg-surface border border-border text-center shadow-xs">
              <div className="text-2xl font-bold font-display text-primary">0%</div>
              <div className="text-[11px] font-mono text-foreground-muted uppercase tracking-wider mt-0.5">
                Seed Oils
              </div>
            </div>
            <div className="p-3.5 rounded-2xl bg-surface border border-border text-center shadow-xs">
              <div className="text-2xl font-bold font-display text-primary">Daily</div>
              <div className="text-[11px] font-mono text-foreground-muted uppercase tracking-wider mt-0.5">
                Harvest Landings
              </div>
            </div>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10">
          {categories.map((tab) => {
            const Icon = tab.icon;
            const isActive = selectedCategory === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id)}
                className={cn(
                  "inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary select-none",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "bg-surface hover:bg-surface-subtle text-foreground-muted hover:text-foreground border border-border"
                )}
              >
                <Icon className={cn("w-4 h-4", isActive ? "text-primary-foreground" : "text-primary")} />
                <span>{tab.label}</span>
                <span
                  className={cn(
                    "px-1.5 py-0.5 rounded-full text-[10px] font-mono",
                    isActive ? "bg-white/20 text-white" : "bg-surface-subtle text-foreground-subtle border border-border/50"
                  )}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Cards Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredPurveyors.map((purveyor) => (
              <motion.article
                key={purveyor.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="group flex flex-col justify-between bg-surface rounded-3xl border border-border overflow-hidden shadow-card hover:shadow-elevated hover:border-primary/30 transition-all duration-300"
              >
                <div>
                  {/* Image & Overlay */}
                  <div className="relative h-56 w-full overflow-hidden bg-surface-subtle">
                    {purveyor.image && (
                      <img
                        src={purveyor.image}
                        alt={purveyor.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        loading="lazy"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    {/* Mileage Chip */}
                    <div className="absolute top-4 left-4">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium bg-surface/95 text-foreground backdrop-blur-md shadow-subtle border border-white/20">
                        <Navigation className="w-3 h-3 text-primary shrink-0" />
                        <span>{purveyor.distanceMiles} miles from Maison</span>
                      </span>
                    </div>

                    {/* Partnered Year */}
                    <div className="absolute top-4 right-4">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-mono text-white/90 bg-black/40 backdrop-blur-md border border-white/10">
                        <Calendar className="w-3 h-3" />
                        <span>Est. {purveyor.partneredSince}</span>
                      </span>
                    </div>

                    {/* Location Name Over Image */}
                    <div className="absolute bottom-3 left-4 right-4 text-white">
                      <div className="flex items-center gap-1.5 text-xs font-mono text-white/80">
                        <MapPin className="w-3.5 h-3.5 text-amber-300 shrink-0" />
                        <span>{purveyor.location}</span>
                      </div>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 sm:p-7 space-y-4">
                    <div>
                      <h3 className="text-xl font-bold font-display text-foreground group-hover:text-primary transition-colors">
                        {purveyor.name}
                      </h3>
                      {purveyor.certification && (
                        <div className="mt-2 flex items-center gap-1.5 text-xs font-mono text-emerald-700">
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>{purveyor.certification}</span>
                        </div>
                      )}
                    </div>

                    {/* Specialty Ingredients */}
                    <div className="p-3 bg-amber-500/5 rounded-xl border border-amber-500/15">
                      <div className="text-[10px] font-mono uppercase tracking-wider text-amber-800 font-semibold mb-1 flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-amber-600" />
                        <span>Specialty Ingredients</span>
                      </div>
                      <p className="text-xs sm:text-sm font-medium text-foreground leading-snug">
                        {purveyor.specialty}
                      </p>
                    </div>

                    {/* Narrative Description */}
                    <p className="text-sm text-foreground-muted leading-relaxed">
                      {purveyor.description}
                    </p>
                  </div>
                </div>

                {/* Sustainable Practices Footer */}
                <div className="px-6 pb-6 sm:px-7 sm:pb-7 pt-2 border-t border-border/50 bg-surface-subtle/40">
                  <div className="text-[11px] font-mono uppercase tracking-wider text-foreground-subtle font-semibold mb-2.5">
                    Ethical & Ecological Standards
                  </div>
                  <ul className="space-y-1.5">
                    {purveyor.sustainablePractices.map((practice, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-foreground-muted">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="leading-tight">{practice}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
