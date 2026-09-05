"use client";

import React from "react";
import { motion } from "framer-motion";
import { Users, Sparkles, Check, ArrowRight, Maximize2, ShieldAlert } from "lucide-react";
import { EVENT_SPACES } from "@/data/spaces-data";
import { EventSpace } from "@/types";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

interface EventSpacesGridProps {
  onSelectSpace?: (spaceId: string) => void;
}

export function EventSpacesGrid({ onSelectSpace }: EventSpacesGridProps) {
  const handleSelect = (spaceId: string) => {
    if (onSelectSpace) {
      onSelectSpace(spaceId);
    } else {
      const formElement = document.getElementById("event-inquiry-builder");
      if (formElement) {
        formElement.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <section id="private-spaces" className="w-full py-16 sm:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono font-medium bg-amber-50 text-amber-900 border border-amber-200/80 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            <span>Curated Hospitality Enclaves</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display tracking-tight text-foreground">
            Architectural Spaces & Private Dining<span className="text-primary">.</span>
          </h2>
          <p className="text-foreground-muted text-base sm:text-lg leading-relaxed">
            From secluded morning board meetings enveloped in sourdough aromas to glass-canopied twilight feasts and grand architectural buyouts, each private enclave is backed by dedicated sommeliers and bespoke hearth menus.
          </p>
        </div>

        {/* Spaces Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {EVENT_SPACES.map((space: EventSpace, index: number) => {
            return (
              <motion.article
                key={space.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="group flex flex-col justify-between bg-surface rounded-3xl border border-border overflow-hidden shadow-card hover:shadow-elevated hover:border-primary/40 transition-all duration-300"
              >
                <div>
                  {/* Space Image Header */}
                  <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-surface-subtle">
                    {space.image && (
                      <img
                        src={space.image}
                        alt={space.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        loading="lazy"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

                    {/* Square footage & Space Badge */}
                    <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium bg-surface/90 text-foreground backdrop-blur-md border border-white/20 shadow-xs">
                        <Maximize2 className="w-3 h-3 text-primary" />
                        <span>{space.squareFootage} sq ft</span>
                      </span>
                    </div>

                    {/* Capacity Tags */}
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono font-semibold bg-primary text-primary-foreground shadow-sm">
                          <Users className="w-3 h-3" />
                          <span>{space.seatedCapacity} Seated</span>
                        </span>
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono font-medium bg-black/50 text-white/90 backdrop-blur-md border border-white/10">
                          <span>{space.receptionCapacity} Standing</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 sm:p-7 space-y-6">
                    <div>
                      <h3 className="text-2xl font-bold font-display text-foreground group-hover:text-primary transition-colors">
                        {space.name}
                      </h3>
                      <p className="mt-2 text-sm text-foreground-muted leading-relaxed">
                        {space.description}
                      </p>
                    </div>

                    {/* Min Spend Tag in JetBrains Mono */}
                    <div className="p-3.5 rounded-2xl bg-amber-500/5 border border-amber-500/20">
                      <div className="text-[10px] font-mono uppercase tracking-wider text-amber-900 font-semibold mb-1">
                        Minimum Food & Beverage Spend
                      </div>
                      <div className="text-sm sm:text-base font-mono font-bold text-foreground">
                        {space.minSpend}
                      </div>
                    </div>

                    {/* Amenities Checklist */}
                    <div className="space-y-2.5 pt-1">
                      <div className="text-[11px] font-mono uppercase tracking-wider text-foreground-subtle font-semibold">
                        Included Space Amenities
                      </div>
                      <ul className="space-y-2">
                        {space.amenities.map((amenity, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-foreground-muted">
                            <span className="p-0.5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 shrink-0 mt-0.5">
                              <Check className="w-3 h-3" />
                            </span>
                            <span className="leading-snug">{amenity}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Ideal For Badges */}
                    <div className="space-y-2 pt-2 border-t border-border/60">
                      <div className="text-[11px] font-mono uppercase tracking-wider text-foreground-subtle font-semibold">
                        Ideal Occasions
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {space.idealFor.map((item, idx) => (
                          <span
                            key={idx}
                            className="inline-block px-2.5 py-1 rounded-lg text-xs font-sans bg-surface-subtle text-foreground-muted border border-border"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="p-6 sm:p-7 pt-0">
                  <Button
                    onClick={() => handleSelect(space.id)}
                    className="w-full group/btn justify-center gap-2 rounded-xl py-6 font-display text-sm tracking-wide shadow-sm"
                  >
                    <span>Select This Space</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                  </Button>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
