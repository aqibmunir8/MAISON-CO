"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Wheat,
  Coffee,
  Flame,
  Wine,
  Heart,
  Clock,
  ShieldCheck,
  Award,
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Users,
  Compass,
  Quote,
  ChefHat,
  Droplet,
  Thermometer,
  Zap,
  Leaf
} from "lucide-react";
import { PurveyorGrid } from "@/components/sections/PurveyorGrid";
import { Button } from "@/components/ui/Button";
import { useStore } from "@/context/StoreContext";
import { cn } from "@/lib/utils";

type PillarKey = "sourdough" | "roastery" | "hearth";

export default function StoryPage() {
  const { openBookingModal } = useStore();
  const [activePillar, setActivePillar] = useState<PillarKey>("sourdough");

  return (
    <div className="flex flex-col w-full min-h-screen">
      {/* 1. HERO SECTION */}
      <section className="relative w-full pt-32 pb-20 sm:pt-40 sm:pb-28 lg:pt-44 lg:pb-32 bg-foreground text-background overflow-hidden">
        {/* Subtle Background Ambience */}
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(197,143,76,0.18),transparent_50%),radial-gradient(circle_at_bottom_left,rgba(30,107,82,0.15),transparent_60%)] pointer-events-none"
          aria-hidden="true"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-accent-gold text-xs font-mono font-medium border border-white/15"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Est. 2021 • Saint-Germain-des-Prés & The Pacific Coast</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-6xl lg:text-7xl font-bold font-display tracking-tight text-white leading-[1.08]"
            >
              A Manifesto of Flour, Fire & Fellowship<span className="text-primary">.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg sm:text-xl text-white/80 leading-relaxed font-sans font-normal"
            >
              We began in a historic cobblestone passage off Boulevard Saint-Germain with a singular conviction: the rigor of three-star French gastronomy belongs in an all-day neighborhood home—warm, democratic, and uncompromisingly natural.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="pt-4 flex flex-wrap items-center gap-4"
            >
              <Button
                variant="primary"
                size="lg"
                onClick={openBookingModal}
                leftIcon={<CalendarDays className="w-4 h-4" />}
                className="shadow-lg text-sm sm:text-base font-semibold"
              >
                Reserve Your Table
              </Button>
              <Link href="/menu">
                <Button
                  variant="secondary"
                  size="lg"
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                  className="text-sm sm:text-base bg-white/10 hover:bg-white/20 text-white border-white/20"
                >
                  Explore Today’s Menu
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Hero Bottom Stats Strip */}
        <div className="mt-16 sm:mt-24 border-t border-white/10 bg-white/[0.02]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl sm:text-4xl font-bold font-display text-accent-gold">48h</div>
              <div className="text-xs font-mono text-white/60 uppercase tracking-widest mt-1">
                Wild Levain Ferment
              </div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-bold font-display text-accent-gold">750°F</div>
              <div className="text-xs font-mono text-white/60 uppercase tracking-widest mt-1">
                White Oak Ember Hearth
              </div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-bold font-display text-accent-gold">100%</div>
              <div className="text-xs font-mono text-white/60 uppercase tracking-widest mt-1">
                Zero Seed Oils
              </div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-bold font-display text-accent-gold">150+</div>
              <div className="text-xs font-mono text-white/60 uppercase tracking-widest mt-1">
                Biodynamic Wines
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 1: THE FOUNDING NARRATIVE */}
      <section className="w-full py-16 sm:py-24 lg:py-28 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Narrative Text */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-mono font-medium text-primary uppercase tracking-widest">
                <Compass className="w-3.5 h-3.5" />
                <span>The Founding Narrative</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display tracking-tight text-foreground">
                When Three-Star Rigor Meets Everyday Fellowship<span className="text-primary">.</span>
              </h2>

              <p className="text-base sm:text-lg text-foreground-muted leading-relaxed">
                Maison & Co. was founded in the 6th arrondissement of Paris by Executive Chef <strong>Julian Ross</strong> (formerly of 3-Michelin-starred <em>L’Arpège</em> and <em>Saison</em>) and Master Baker <strong>Antoine Mercier</strong> (a fifth-generation Parisian boulanger).
              </p>

              <p className="text-sm sm:text-base text-foreground-muted leading-relaxed">
                Having spent decades behind rigid tasting-menu velvet ropes, both artisans felt the same restless yearning: true culinary mastery shouldn’t be reserved for special occasions once a year. Great sourdough, expertly pulled single-origin coffee, and pristine fire-roasted seafood should be the soundtrack of your Tuesday morning and Friday twilight.
              </p>

              <div className="p-5 sm:p-6 bg-surface rounded-2xl border border-border/80 relative">
                <Quote className="w-8 h-8 text-primary/20 absolute top-4 right-4" />
                <p className="text-sm sm:text-base italic text-foreground font-serif leading-relaxed">
                  “We stripped away the white tablecloths, the stiff formalities, and the industrial shortcuts. What remains is honest chemistry: heritage flour, living microbes, white oak embers, and generous warmth.”
                </p>
                <div className="mt-4 flex items-center gap-3">
                  <div className="text-xs font-mono">
                    <span className="font-bold text-foreground">Julian Ross & Antoine Mercier</span>
                    <span className="text-foreground-subtle block">Co-Founders, Maison & Co.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Co-Founders Grid */}
            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Julian Ross Card */}
              <div className="bg-surface rounded-3xl border border-border overflow-hidden shadow-card hover:shadow-elevated transition-all duration-300">
                <div className="relative h-64 w-full bg-surface-subtle">
                  <img
                    src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?q=80&w=800&auto=format&fit=crop"
                    alt="Chef Julian Ross"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-4 right-4 text-white">
                    <h3 className="text-lg font-bold font-display">Julian Ross</h3>
                    <p className="text-xs font-mono text-accent-gold">Executive Chef & Co-Founder</p>
                  </div>
                </div>
                <div className="p-5 space-y-3">
                  <div className="text-[11px] font-mono text-foreground-subtle uppercase tracking-wider">
                    Pedigree
                  </div>
                  <p className="text-xs text-foreground-muted leading-relaxed">
                    L’Arpège (Paris, 3★ Michelin), Saison (San Francisco, 3★ Michelin), The French Laundry. James Beard Best Chef Semifinalist 2025.
                  </p>
                  <div className="pt-2 border-t border-border flex items-center gap-1.5 text-xs text-primary font-medium">
                    <ChefHat className="w-3.5 h-3.5" />
                    <span>Hearth & Natural Terroirs</span>
                  </div>
                </div>
              </div>

              {/* Antoine Mercier Card */}
              <div className="bg-surface rounded-3xl border border-border overflow-hidden shadow-card hover:shadow-elevated transition-all duration-300">
                <div className="relative h-64 w-full bg-surface-subtle">
                  <img
                    src="https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=800&auto=format&fit=crop"
                    alt="Master Baker Antoine Mercier"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-4 right-4 text-white">
                    <h3 className="text-lg font-bold font-display">Antoine Mercier</h3>
                    <p className="text-xs font-mono text-accent-gold">Head Baker & Master Viennois</p>
                  </div>
                </div>
                <div className="p-5 space-y-3">
                  <div className="text-[11px] font-mono text-foreground-subtle uppercase tracking-wider">
                    Pedigree
                  </div>
                  <p className="text-xs text-foreground-muted leading-relaxed">
                    Compagnons du Devoir, Boulangerie Poilâne (Paris 6th), Coupe du Monde de la Boulangerie Silver Medalist.
                  </p>
                  <div className="pt-2 border-t border-border flex items-center gap-1.5 text-xs text-primary font-medium">
                    <Wheat className="w-3.5 h-3.5" />
                    <span>Wild Fermentation & Milling</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: DEEP-DIVE SCIENCE OF OUR 3 CRAFT PILLARS */}
      <section className="w-full py-16 sm:py-24 bg-surface-subtle border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-medium text-primary uppercase tracking-widest">
              <Zap className="w-3.5 h-3.5" />
              <span>Microbiology & Craft Precision</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display tracking-tight text-foreground">
              The Science Behind Our Three Pillars<span className="text-primary">.</span>
            </h2>
            <p className="text-foreground-muted text-base sm:text-lg leading-relaxed">
              We do not rely on guesswork or commercial additives. Every morning at Maison is a symphony of wild microbiological balance, thermodynamics, and hyper-regional sourcing.
            </p>
          </div>

          {/* Interactive Pillar Selector Tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            <button
              onClick={() => setActivePillar("sourdough")}
              className={cn(
                "inline-flex items-center gap-2.5 px-5 py-3 rounded-2xl text-sm font-semibold transition-all duration-200 select-none",
                activePillar === "sourdough"
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-surface text-foreground-muted hover:text-foreground border border-border"
              )}
            >
              <Wheat className="w-4 h-4" />
              <span>1. 48-Hour Wild Sourdough</span>
            </button>

            <button
              onClick={() => setActivePillar("roastery")}
              className={cn(
                "inline-flex items-center gap-2.5 px-5 py-3 rounded-2xl text-sm font-semibold transition-all duration-200 select-none",
                activePillar === "roastery"
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-surface text-foreground-muted hover:text-foreground border border-border"
              )}
            >
              <Coffee className="w-4 h-4" />
              <span>2. Single-Origin Roastery</span>
            </button>

            <button
              onClick={() => setActivePillar("hearth")}
              className={cn(
                "inline-flex items-center gap-2.5 px-5 py-3 rounded-2xl text-sm font-semibold transition-all duration-200 select-none",
                activePillar === "hearth"
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-surface text-foreground-muted hover:text-foreground border border-border"
              )}
            >
              <Flame className="w-4 h-4" />
              <span>3. Open-Hearth & Natural Cellar</span>
            </button>
          </div>

          {/* Pillar Content Showcase */}
          <div className="bg-surface rounded-3xl border border-border overflow-hidden shadow-elevated">
            <AnimatePresence mode="wait">
              {activePillar === "sourdough" && (
                <motion.div
                  key="sourdough"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-10 lg:p-12 items-center"
                >
                  <div className="lg:col-span-7 space-y-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium bg-amber-50 text-amber-800 border border-amber-200">
                      <Wheat className="w-3.5 h-3.5 text-amber-600" />
                      <span>Fermentation Science & Boulangerie</span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-display text-foreground">
                      The 48-Hour Wild Sourdough & Viennoiserie
                    </h3>

                    <p className="text-sm sm:text-base text-foreground-muted leading-relaxed">
                      Our starter is a living culture nurtured since 2018 in Paris, dominated by wild <em>Lactobacillus sanfranciscensis</em> and <em>Candida humilis</em>. By stone-milling heirloom Rouge de Bordeaux and Red Fife wheats on-site daily, we preserve the living germ oils that industrial flour mills discard.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                      <div className="p-4 rounded-2xl bg-surface-subtle border border-border">
                        <div className="flex items-center gap-1.5 text-primary text-xs font-mono font-semibold mb-1">
                          <Droplet className="w-3.5 h-3.5" />
                          <span>84% Hydration</span>
                        </div>
                        <p className="text-xs text-foreground-muted">
                          Creates an open, custardy honeycomb crumb with high moisture retention and digestive ease.
                        </p>
                      </div>

                      <div className="p-4 rounded-2xl bg-surface-subtle border border-border">
                        <div className="flex items-center gap-1.5 text-primary text-xs font-mono font-semibold mb-1">
                          <Clock className="w-3.5 h-3.5" />
                          <span>48h Ferment</span>
                        </div>
                        <p className="text-xs text-foreground-muted">
                          Slow cold proofing breaks down complex phytates and gluten proteins into digestible amino acids.
                        </p>
                      </div>

                      <div className="p-4 rounded-2xl bg-surface-subtle border border-border">
                        <div className="flex items-center gap-1.5 text-primary text-xs font-mono font-semibold mb-1">
                          <Thermometer className="w-3.5 h-3.5" />
                          <span>3 Daily Bakes</span>
                        </div>
                        <p className="text-xs text-foreground-muted">
                          Stone decks at 500°F fire at 6:30am, 11:30am, and 4:30pm for warm mahogany crusts all day.
                        </p>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-border flex items-center gap-2 text-xs font-mono text-foreground-subtle">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>81-Layer Viennoiserie laminated with 84% butterfat Normandy cultured butter.</span>
                    </div>
                  </div>

                  <div className="lg:col-span-5">
                    <div className="relative h-80 sm:h-96 w-full rounded-2xl overflow-hidden shadow-card">
                      <img
                        src="https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=900&auto=format&fit=crop"
                        alt="Handcrafted sourdough boules and croissants"
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4 text-white text-xs font-mono">
                        Stone deck bake schedule: 06:30 • 11:30 • 16:30
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activePillar === "roastery" && (
                <motion.div
                  key="roastery"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-10 lg:p-12 items-center"
                >
                  <div className="lg:col-span-7 space-y-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium bg-indigo-50 text-indigo-800 border border-indigo-200">
                      <Coffee className="w-3.5 h-3.5 text-indigo-600" />
                      <span>Thermodynamics & Single-Origin Terroirs</span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-display text-foreground">
                      The Roastery & Single-Origin Extraction
                    </h3>

                    <p className="text-sm sm:text-base text-foreground-muted leading-relaxed">
                      We roast in 5kg micro-batches using a light-medium Nordic curve that amplifies floral jasmine, crisp stone fruit, and bergamot acidity rather than carbon or roast bitterness. We partner directly with regenerative farming cooperatives in Yirgacheffe (Ethiopia) and Huila (Colombia).
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                      <div className="p-4 rounded-2xl bg-surface-subtle border border-border">
                        <div className="flex items-center gap-1.5 text-primary text-xs font-mono font-semibold mb-1">
                          <Droplet className="w-3.5 h-3.5" />
                          <span>130 ppm Water</span>
                        </div>
                        <p className="text-xs text-foreground-muted">
                          Custom magnesium-to-calcium mineralization crafted on-site to unlock delicate origin volatiles.
                        </p>
                      </div>

                      <div className="p-4 rounded-2xl bg-surface-subtle border border-border">
                        <div className="flex items-center gap-1.5 text-primary text-xs font-mono font-semibold mb-1">
                          <Thermometer className="w-3.5 h-3.5" />
                          <span>9-Bar Saturated</span>
                        </div>
                        <p className="text-xs text-foreground-muted">
                          Precision pressure profiling on our bespoke multi-boiler system for velvety crema.
                        </p>
                      </div>

                      <div className="p-4 rounded-2xl bg-surface-subtle border border-border">
                        <div className="flex items-center gap-1.5 text-primary text-xs font-mono font-semibold mb-1">
                          <Users className="w-3.5 h-3.5" />
                          <span>Direct-Trade</span>
                        </div>
                        <p className="text-xs text-foreground-muted">
                          100% direct pricing paying 2.4x Fair Trade minimums straight to partner farm collectives.
                        </p>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-border flex items-center gap-2 text-xs font-mono text-foreground-subtle">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Whole beans roasted weekly and available for take-home purchase at our counter.</span>
                    </div>
                  </div>

                  <div className="lg:col-span-5">
                    <div className="relative h-80 sm:h-96 w-full rounded-2xl overflow-hidden shadow-card">
                      <img
                        src="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=900&auto=format&fit=crop"
                        alt="Espresso extraction and roasted coffee beans"
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4 text-white text-xs font-mono">
                        Direct-Trade: Ethiopia Yirgacheffe & Colombia Huila
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activePillar === "hearth" && (
                <motion.div
                  key="hearth"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-10 lg:p-12 items-center"
                >
                  <div className="lg:col-span-7 space-y-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium bg-emerald-50 text-emerald-800 border border-emerald-200">
                      <Wine className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Open Embers & Living Cellar</span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-display text-foreground">
                      The Open-Hearth Flame & Natural Cellar
                    </h3>

                    <p className="text-sm sm:text-base text-foreground-muted leading-relaxed">
                      Cooking over white oak coals provides intense radiant heat without the acrid hydrocarbons of gas burners. We maintain a strict zero-seed-oil standard across our kitchen, using only grass-fed churned butter, cold-pressed extra virgin olive oil, and rendered heritage pork fat.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                      <div className="p-4 rounded-2xl bg-surface-subtle border border-border">
                        <div className="flex items-center gap-1.5 text-primary text-xs font-mono font-semibold mb-1">
                          <Flame className="w-3.5 h-3.5" />
                          <span>750°F White Oak</span>
                        </div>
                        <p className="text-xs text-foreground-muted">
                          Aged hardwood coals deliver deep Maillard caramelization and clean woodsmoke aromatics.
                        </p>
                      </div>

                      <div className="p-4 rounded-2xl bg-surface-subtle border border-border">
                        <div className="flex items-center gap-1.5 text-primary text-xs font-mono font-semibold mb-1">
                          <Leaf className="w-3.5 h-3.5" />
                          <span>0% Seed Oils</span>
                        </div>
                        <p className="text-xs text-foreground-muted">
                          Never canola, soybean, or industrial seed oils. Only pure cold-pressed extra virgin olive oil & cultured butter.
                        </p>
                      </div>

                      <div className="p-4 rounded-2xl bg-surface-subtle border border-border">
                        <div className="flex items-center gap-1.5 text-primary text-xs font-mono font-semibold mb-1">
                          <Wine className="w-3.5 h-3.5" />
                          <span>150+ Natural Wines</span>
                        </div>
                        <p className="text-xs text-foreground-muted">
                          Curated by Head Sommelier Clara Vance: low-intervention, biodynamic, unfiltered, and orange skin-contact.
                        </p>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-border flex items-center gap-2 text-xs font-mono text-foreground-subtle">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Dry-aging program: Heritage Black Angus & Berkshire pork aged 45 days in-house.</span>
                    </div>
                  </div>

                  <div className="lg:col-span-5">
                    <div className="relative h-80 sm:h-96 w-full rounded-2xl overflow-hidden shadow-card">
                      <img
                        src="https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=900&auto=format&fit=crop"
                        alt="Wood-fired hearth fire cookery"
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4 text-white text-xs font-mono">
                        White Oak Hearth • 150+ Natural Cellar Allocations
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* SECTION 3: INTERACTIVE REGIONAL PURVEYOR SHOWCASE */}
      <PurveyorGrid />

      {/* SECTION 4: TEAM & KITCHEN CULTURE MANIFESTO */}
      <section className="w-full py-16 sm:py-24 lg:py-28 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Header */}
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-mono font-medium text-primary uppercase tracking-widest">
                <Heart className="w-3.5 h-3.5 text-rose-500" />
                <span>Our Social & Ecological Compact</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display tracking-tight text-foreground">
                Kitchen Culture Manifesto<span className="text-primary">.</span>
              </h2>

              <p className="text-base sm:text-lg text-foreground-muted leading-relaxed">
                Hospitality that exhausts its workers or depletes the environment is not sustainable craft. We built Maison on human-centered principles that nurture our cooks, baristas, and dining room guides as deeply as our guests.
              </p>

              <div className="pt-2">
                <div className="p-4 rounded-2xl bg-surface border border-border space-y-2">
                  <div className="flex items-center gap-2 text-foreground font-semibold text-sm">
                    <Award className="w-4 h-4 text-accent-gold" />
                    <span>Certified B-Corp Applicant & Fair-Share Kitchen</span>
                  </div>
                  <p className="text-xs text-foreground-muted leading-relaxed">
                    100% of kitchen and dining room staff receive comprehensive employer-paid healthcare, wellness stipends, and continuous culinary mentorship.
                  </p>
                </div>
              </div>
            </div>

            {/* Right 4-Pillar Grid */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
              {/* Manifesto 1 */}
              <div className="p-6 rounded-3xl bg-surface border border-border shadow-card hover:border-primary/30 transition-all">
                <div className="w-10 h-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                  <Clock className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold font-display text-foreground mb-2">
                  4-Day Kitchen Work Week
                </h3>
                <p className="text-xs sm:text-sm text-foreground-muted leading-relaxed">
                  No 80-hour burnout shifts. Our culinary team works structured 4-day schedules, leaving 3 full days for rest, foraging, and creative life outside the kitchen.
                </p>
              </div>

              {/* Manifesto 2 */}
              <div className="p-6 rounded-3xl bg-surface border border-border shadow-card hover:border-primary/30 transition-all">
                <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-700 flex items-center justify-center mb-4">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold font-display text-foreground mb-2">
                  Living Wage & Revenue Share
                </h3>
                <p className="text-xs sm:text-sm text-foreground-muted leading-relaxed">
                  We abolished tip inequality. All kitchen and front-of-house staff share in equitable profit-sharing and earn well above regional living wages.
                </p>
              </div>

              {/* Manifesto 3 */}
              <div className="p-6 rounded-3xl bg-surface border border-border shadow-card hover:border-primary/30 transition-all">
                <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-700 flex items-center justify-center mb-4">
                  <Leaf className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold font-display text-foreground mb-2">
                  100% Composted Kitchen Scraps
                </h3>
                <p className="text-xs sm:text-sm text-foreground-muted leading-relaxed">
                  Every vegetable trim, coffee ground, and dough scrap returns directly to our partner farms in Sonoma to create nutrient-dense compost for future crops.
                </p>
              </div>

              {/* Manifesto 4 */}
              <div className="p-6 rounded-3xl bg-surface border border-border shadow-card hover:border-primary/30 transition-all">
                <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 text-indigo-700 flex items-center justify-center mb-4">
                  <Droplet className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold font-display text-foreground mb-2">
                  Zero Single-Use Plastics
                </h3>
                <p className="text-xs sm:text-sm text-foreground-muted leading-relaxed">
                  From unbleached bakery parchment and linen bread bags to reusable stainless kegs and glass deposit milk jars, our operations are 100% plastic-free.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: CLOSING QUOTE & TABLE RESERVATION CALLOUT */}
      <section className="w-full py-16 sm:py-24 bg-foreground text-background relative overflow-hidden">
        {/* Ambient Subtle Glow */}
        <div
          className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/20 rounded-full blur-[100px] pointer-events-none"
          aria-hidden="true"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 sm:p-14 lg:p-16 text-center max-w-4xl mx-auto backdrop-blur-md shadow-elevated">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-accent-gold text-xs font-mono font-medium mb-6 border border-white/15">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Experience Our Craft In Person</span>
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold font-display tracking-tight text-white mb-6">
              “Craft is not nostalgia. It is the conscious choice to do things right.”
            </h2>

            <p className="text-base sm:text-lg text-white/75 max-w-2xl mx-auto leading-relaxed mb-8 sm:mb-10 font-sans">
              Whether joining us for morning coffee and still-warm croissants, a relaxed midday salad with natural cider, or an evening tasting over white oak embers, our table is yours.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button
                variant="primary"
                size="lg"
                onClick={openBookingModal}
                leftIcon={<CalendarDays className="w-4 h-4" />}
                className="w-full sm:w-auto shadow-lg text-sm sm:text-base font-semibold"
              >
                Reserve a Table
              </Button>

              <Link href="/menu" className="w-full sm:w-auto">
                <Button
                  variant="secondary"
                  size="lg"
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                  className="w-full sm:w-auto text-sm sm:text-base bg-white/10 hover:bg-white/20 text-white border-white/20"
                >
                  View Seasonal Menu
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
