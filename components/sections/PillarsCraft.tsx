"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Flame, Wheat, Coffee, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface CraftPillar {
  id: string;
  title: string;
  frenchTitle: string;
  icon: React.ElementType;
  description: string;
  metrics: { label: string; value: string }[];
  image: string;
  alt: string;
  tag: string;
}

const PILLARS: CraftPillar[] = [
  {
    id: "sourdough",
    title: "Wild-Yeast Sourdough & Viennoiserie",
    frenchTitle: "Boulangerie & Levain Naturel",
    icon: Wheat,
    description:
      "Crafted from stone-ground organic heritage wheat, a living wild levain nurtured since 2018, and 84% water hydration. Baked thrice daily at 500°F on refractory stone decks for a blistered mahogany crust and open, custardy honeycomb crumb.",
    metrics: [
      { label: "Fermentation", value: "48 Hours" },
      { label: "Bake Schedule", value: "3x Daily" },
      { label: "Lamination", value: "81 Butter Layers" },
    ],
    image:
      "https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=1000&auto=format&fit=crop",
    alt: "Handcrafted golden sourdough croissants and rustic boules on bakery table",
    tag: "Artisanal Baking",
  },
  {
    id: "roastery",
    title: "Single-Origin Specialty Roastery",
    frenchTitle: "Torréfaction Artisanale & Terroirs",
    icon: Coffee,
    description:
      "Direct-trade micro-lots sourced directly from regenerative cooperatives in Yirgacheffe, Boquete, and Huila. Roasted in micro-batches and pulled at 9-bar pressure on our bespoke dual-boiler machine with calibrated mineral water.",
    metrics: [
      { label: "Sourcing", value: "Direct Trade" },
      { label: "Extraction", value: "9-Bar Precision" },
      { label: "Roast Style", value: "Nordic Light" },
    ],
    image:
      "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=1000&auto=format&fit=crop",
    alt: "Single-origin espresso extraction with velvety golden crema",
    tag: "Specialty Coffee",
  },
  {
    id: "hearth",
    title: "Wood-Fired Brasserie & Natural Cellar",
    frenchTitle: "La Braise & Cave Vivante",
    icon: Flame,
    description:
      "White oak coals burn at 750°F to sear dry-aged heritage meats, blister garden brassicas, and roast whole day-boat turbot. Paired with 150+ low-intervention, biodynamic, and skin-contact orange wines from independent European vignerons.",
    metrics: [
      { label: "Fuel", value: "Aged White Oak" },
      { label: "Cellar", value: "150+ Natural Labels" },
      { label: "Dry-Aging", value: "45-Day Program" },
    ],
    image:
      "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1000&auto=format&fit=crop",
    alt: "Sizzling prime steak over white oak glowing hearth fire",
    tag: "Hearth Gastronomy",
  },
];

export function PillarsCraft() {
  return (
    <section className="w-full py-16 lg:py-24 bg-background-subtle border-y border-border/70 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-medium text-primary uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5" />
              <span>The Culinary Philosophy</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display tracking-tight text-foreground">
              Three Pillars of Maison Craft<span className="text-primary">.</span>
            </h2>
            <p className="text-foreground-muted text-base sm:text-lg leading-relaxed">
              We reject industrial shortcuts. Every loaf, cup of coffee, and wood-fired dish is rooted in long fermentation, direct farmer relationships, and unhurried fire cookery.
            </p>
          </div>

          <div className="shrink-0">
            <Link href="/story">
              <Button
                variant="secondary"
                size="md"
                rightIcon={<ArrowRight className="w-4 h-4" />}
                className="bg-surface shadow-subtle hover:bg-surface"
              >
                Read Our Full Story
              </Button>
            </Link>
          </div>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {PILLARS.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <motion.article
                key={pillar.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="group bg-surface rounded-2xl sm:rounded-3xl border border-border overflow-hidden shadow-card hover:shadow-elevated hover:border-border-hover transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Visual Media Header */}
                  <div className="relative h-52 sm:h-56 w-full overflow-hidden bg-surface-subtle">
                    <img
                      src={pillar.image}
                      alt={pillar.alt}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />

                    {/* Badge on Top Left */}
                    <div className="absolute top-4 left-4">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium bg-surface/95 text-foreground backdrop-blur-md shadow-subtle border border-white/20">
                        <Icon className="w-3.5 h-3.5 text-primary" />
                        {pillar.tag}
                      </span>
                    </div>

                    {/* French Name Title Bottom Overlay */}
                    <div className="absolute bottom-3 left-4 right-4">
                      <span className="text-[11px] font-mono uppercase tracking-widest text-white/90">
                        {pillar.frenchTitle}
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 sm:p-7">
                    <h3 className="text-xl font-bold font-display text-foreground group-hover:text-primary transition-colors mb-3">
                      {pillar.title}
                    </h3>
                    <p className="text-sm text-foreground-muted leading-relaxed font-sans">
                      {pillar.description}
                    </p>
                  </div>
                </div>

                {/* Metrics Footer Matrix */}
                <div className="px-6 pb-6 sm:px-7 sm:pb-7 pt-2">
                  <div className="grid grid-cols-3 gap-2 p-3 bg-surface-subtle rounded-xl border border-border/70 text-center">
                    {pillar.metrics.map((metric) => (
                      <div key={metric.label} className="flex flex-col">
                        <span className="text-[10px] font-mono text-foreground-subtle uppercase tracking-wider">
                          {metric.label}
                        </span>
                        <span className="text-xs font-mono font-semibold text-foreground mt-0.5">
                          {metric.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
