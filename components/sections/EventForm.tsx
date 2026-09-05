"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Clock,
  Users,
  Utensils,
  Wine,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  DollarSign,
  Building2,
  Mail,
  Phone,
  User,
  Info,
  RotateCcw
} from "lucide-react";
import { EVENT_SPACES } from "@/data/spaces-data";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

interface EventFormProps {
  initialSpaceId?: string;
}

type EventType =
  | "corporate"
  | "wedding"
  | "birthday"
  | "cocktail"
  | "breakfast-board";

type Timeframe = "breakfast" | "luncheon" | "evening";

type DiningPackage = "prix-fixe" | "family-feast" | "canapes";

interface PackageDetails {
  id: DiningPackage;
  name: string;
  pricePerPerson: number;
  description: string;
  tag: string;
}

const PACKAGES: PackageDetails[] = [
  {
    id: "prix-fixe",
    name: "4-Course Hearth Prix Fixe",
    pricePerPerson: 115,
    description: "Individually plated seasonal courses highlighting wood-fired meats, ember vegetables, and artisan sourdough.",
    tag: "Refined Dining",
  },
  {
    id: "family-feast",
    name: "Hearth Family Feast",
    pricePerPerson: 95,
    description: "Abundant shared cast-iron platters, whole heritage roasts, wood-grilled brassicas, and hearth flatbreads.",
    tag: "Convivial & Shared",
  },
  {
    id: "canapes",
    name: "Standing Canapés & Raw Bar",
    pricePerPerson: 80,
    description: "Passed micro-bites, chilled regional oysters, tartines, and charcuterie boards for mingling cocktail events.",
    tag: "Cocktail Style",
  },
];

const EVENT_TYPES: { id: EventType; label: string }[] = [
  { id: "corporate", label: "Corporate Dinner / Gala" },
  { id: "wedding", label: "Wedding / Rehearsal Feast" },
  { id: "birthday", label: "Milestone Birthday / Gathering" },
  { id: "cocktail", label: "Cocktail Reception & Raw Bar" },
  { id: "breakfast-board", label: "Breakfast & Bakery Board Meeting" },
];

const TIMEFRAMES: { id: Timeframe; label: string; time: string }[] = [
  { id: "breakfast", label: "Morning / Breakfast", time: "8:00 AM – 11:30 AM" },
  { id: "luncheon", label: "Luncheon & Afternoon", time: "12:00 PM – 4:00 PM" },
  { id: "evening", label: "Evening Brasserie", time: "5:30 PM – 11:00 PM" },
];

export function EventForm({ initialSpaceId }: EventFormProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Form State
  const [eventType, setEventType] = useState<EventType>("corporate");
  const [date, setDate] = useState<string>("");
  const [timeframe, setTimeframe] = useState<Timeframe>("evening");
  const [guestCount, setGuestCount] = useState<number>(24);

  const [selectedSpaceId, setSelectedSpaceId] = useState<string>(
    initialSpaceId || "garden-orangery"
  );
  const [diningPackage, setDiningPackage] = useState<DiningPackage>("prix-fixe");
  const [addWinePairing, setAddWinePairing] = useState<boolean>(true);

  // Step 3 Contact
  const [organizerName, setOrganizerName] = useState<string>("");
  const [company, setCompany] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [specialRequests, setSpecialRequests] = useState<string>("");

  // Confirmation state
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [referenceCode, setReferenceCode] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Recommended Space calculation based on guest count
  const recommendedSpace = useMemo(() => {
    if (guestCount <= 18) {
      return { id: "bakers-mezzanine", name: "The Baker's Mezzanine (12–18 guests)" };
    } else if (guestCount <= 60) {
      return { id: "garden-orangery", name: "The Garden Orangery (Up to 40 seated / 60 standing)" };
    } else {
      return { id: "full-buyout", name: "Full Restaurant & Hearth Buyout (Up to 120 seated / 180 standing)" };
    }
  }, [guestCount]);

  // Selected space details
  const currentSpace = useMemo(() => {
    return EVENT_SPACES.find((s) => s.id === selectedSpaceId) || EVENT_SPACES[1];
  }, [selectedSpaceId]);

  // Cost calculations
  const selectedPkg = useMemo(() => {
    return PACKAGES.find((p) => p.id === diningPackage) || PACKAGES[0];
  }, [diningPackage]);

  const packageCostTotal = guestCount * selectedPkg.pricePerPerson;
  const wineCostTotal = addWinePairing ? guestCount * 55 : 0;
  const estimatedFoodBevTotal = packageCostTotal + wineCostTotal;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const randomSuffix = Math.floor(1000 + Math.random() * 9000);
      setReferenceCode(`EV-2026-${randomSuffix}`);
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setStep(1);
    setOrganizerName("");
    setCompany("");
    setEmail("");
    setPhone("");
    setSpecialRequests("");
    setDate("");
  };

  if (isSubmitted) {
    return (
      <div id="event-inquiry-builder" className="w-full py-16 sm:py-24 bg-background-subtle border-t border-border/80">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-surface rounded-3xl border border-primary/30 p-8 sm:p-12 shadow-elevated text-center space-y-6"
          >
            <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <div className="text-xs font-mono uppercase tracking-widest text-primary font-semibold">
                Inquiry Received & Logged
              </div>
              <h3 className="text-3xl font-display font-bold text-foreground">
                Thank You, {organizerName || "Guest"}
              </h3>
              <p className="text-foreground-muted text-sm sm:text-base max-w-lg mx-auto">
                Your private dining concierge request has been prioritized under reservation code:
              </p>
              <div className="inline-block px-5 py-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xl sm:text-2xl font-mono font-bold text-primary tracking-wider mt-2">
                {referenceCode}
              </div>
            </div>

            {/* Summary Breakdown Card */}
            <div className="p-6 rounded-2xl bg-surface-subtle border border-border text-left space-y-4 max-w-md mx-auto">
              <div className="text-xs font-mono uppercase tracking-wider text-foreground-subtle font-semibold">
                Event Summary Snapshot
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-foreground-muted">Space:</span>
                  <span className="font-medium text-foreground">{currentSpace.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-foreground-muted">Guest Count:</span>
                  <span className="font-medium text-foreground">{guestCount} Guests</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-foreground-muted">Date & Service:</span>
                  <span className="font-medium text-foreground">
                    {date || "Flexible / TBD"} ({timeframe})
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-foreground-muted">Culinary Format:</span>
                  <span className="font-medium text-foreground">{selectedPkg.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-foreground-muted">Wine Pairing:</span>
                  <span className="font-medium text-foreground">
                    {addWinePairing ? "Included ($55/pp)" : "None / A La Carte"}
                  </span>
                </div>
                <div className="pt-2 border-t border-border flex justify-between font-mono font-bold text-base">
                  <span className="text-foreground">Est. Food & Wine:</span>
                  <span className="text-primary">${estimatedFoodBevTotal.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Concierge Guarantee */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono bg-emerald-50 text-emerald-800 border border-emerald-200">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>&lt;24-Hour Event Concierge Guarantee&gt; Direct Follow-up</span>
            </div>

            <div>
              <Button
                variant="outline"
                onClick={handleReset}
                className="gap-2 rounded-xl"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Submit Another Inquiry</span>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <section id="event-inquiry-builder" className="w-full py-16 sm:py-24 bg-background-subtle border-t border-border/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Header Title */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono font-medium bg-primary/10 text-primary border border-primary/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Bespoke Inquiry Builder</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-display tracking-tight text-foreground">
            Plan Your Private Gathering<span className="text-primary">.</span>
          </h2>
          <p className="text-foreground-muted text-sm sm:text-base">
            Configure your space, guest scale, culinary package, and reserve your date with our dedicated private dining sommelier and events team.
          </p>
        </div>

        {/* 3-Step Progress Indicator */}
        <div className="flex items-center justify-between max-w-xl mx-auto mb-10">
          {[
            { num: 1, title: "Scope & Schedule" },
            { num: 2, title: "Space & Menu" },
            { num: 3, title: "Hospitality Details" },
          ].map((item, idx) => {
            const isActive = step === item.num;
            const isDone = step > item.num;
            return (
              <div key={item.num} className="flex items-center gap-3 flex-1 last:flex-none">
                <button
                  type="button"
                  onClick={() => {
                    if (isDone) setStep(item.num as 1 | 2 | 3);
                  }}
                  disabled={!isDone && !isActive}
                  className={cn(
                    "flex items-center gap-2.5 text-xs font-mono uppercase tracking-wider transition-colors",
                    isActive
                      ? "text-primary font-bold"
                      : isDone
                      ? "text-foreground hover:text-primary cursor-pointer"
                      : "text-foreground-subtle cursor-not-allowed"
                  )}
                >
                  <span
                    className={cn(
                      "w-7 h-7 rounded-full flex items-center justify-center font-mono text-xs transition-colors",
                      isActive
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : isDone
                        ? "bg-emerald-500 text-white"
                        : "bg-surface text-foreground-subtle border border-border"
                    )}
                  >
                    {isDone ? <CheckCircle2 className="w-4 h-4" /> : item.num}
                  </span>
                  <span className="hidden sm:inline">{item.title}</span>
                </button>
                {idx < 2 && (
                  <div
                    className={cn(
                      "flex-1 h-0.5 mx-3 hidden sm:block",
                      isDone ? "bg-emerald-500" : "bg-border"
                    )}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* Builder Card */}
        <div className="bg-surface rounded-3xl border border-border p-6 sm:p-10 shadow-card">
          <form onSubmit={handleSubmit}>
            <AnimatePresence mode="wait">
              {/* STEP 1: Scope & Schedule */}
              {step === 1 && (
                <motion.div
                  key="step-1"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-8"
                >
                  {/* Event Type */}
                  <div className="space-y-3">
                    <label className="block text-xs font-mono uppercase tracking-wider text-foreground-subtle font-semibold">
                      1. Select Event Type
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {EVENT_TYPES.map((type) => {
                        const isSelected = eventType === type.id;
                        return (
                          <button
                            type="button"
                            key={type.id}
                            onClick={() => setEventType(type.id)}
                            className={cn(
                              "p-3.5 rounded-2xl text-left text-xs sm:text-sm font-medium border transition-all duration-200",
                              isSelected
                                ? "bg-primary/10 border-primary text-primary shadow-xs font-semibold"
                                : "bg-surface-subtle/50 hover:bg-surface-subtle border-border text-foreground-muted hover:text-foreground"
                            )}
                          >
                            {type.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Date & Timeframe */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="block text-xs font-mono uppercase tracking-wider text-foreground-subtle font-semibold">
                        Desired Event Date
                      </label>
                      <div className="relative">
                        <input
                          type="date"
                          value={date}
                          onChange={(e) => setDate(e.target.value)}
                          min={new Date().toISOString().split("T")[0]}
                          className="w-full px-4 py-3 rounded-xl bg-surface-subtle border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary font-mono"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-xs font-mono uppercase tracking-wider text-foreground-subtle font-semibold">
                        Timeframe & Service
                      </label>
                      <div className="grid grid-cols-1 gap-2">
                        {TIMEFRAMES.map((tf) => (
                          <button
                            type="button"
                            key={tf.id}
                            onClick={() => setTimeframe(tf.id)}
                            className={cn(
                              "flex items-center justify-between px-3.5 py-2.5 rounded-xl border text-xs transition-all",
                              timeframe === tf.id
                                ? "bg-primary/10 border-primary text-primary font-semibold"
                                : "bg-surface-subtle border-border text-foreground-muted hover:text-foreground"
                            )}
                          >
                            <span>{tf.label}</span>
                            <span className="font-mono text-[11px] text-foreground-subtle">
                              {tf.time}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Guest Count Slider & Room Recommendation */}
                  <div className="space-y-4 pt-4 border-t border-border/70">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-mono uppercase tracking-wider text-foreground-subtle font-semibold">
                        Estimated Guest Count: <span className="text-primary font-bold text-base">{guestCount} Guests</span>
                      </label>
                      <span className="text-xs font-mono text-foreground-subtle">
                        (Range: 8 to 150)
                      </span>
                    </div>

                    <input
                      type="range"
                      min={8}
                      max={150}
                      step={2}
                      value={guestCount}
                      onChange={(e) => {
                        const count = parseInt(e.target.value, 10);
                        setGuestCount(count);
                        if (count <= 18) setSelectedSpaceId("bakers-mezzanine");
                        else if (count <= 60) setSelectedSpaceId("garden-orangery");
                        else setSelectedSpaceId("full-buyout");
                      }}
                      className="w-full accent-primary h-2 bg-surface-subtle rounded-lg cursor-pointer"
                    />

                    {/* Recommendation Badge */}
                    <div className="flex items-center gap-2 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-foreground">
                      <Sparkles className="w-4 h-4 text-primary shrink-0" />
                      <div>
                        <span className="font-mono uppercase text-[10px] text-primary font-bold mr-2">
                          Recommended Room:
                        </span>
                        <span className="font-medium">{recommendedSpace.name}</span>
                      </div>
                    </div>
                  </div>

                  {/* Step 1 Actions */}
                  <div className="flex justify-end pt-4">
                    <Button
                      type="button"
                      onClick={() => setStep(2)}
                      className="gap-2 rounded-xl py-5 px-6 font-display"
                    >
                      <span>Proceed to Space & Menu</span>
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                </motion.div>
              )}

              {/* STEP 2: Space & Culinary Package */}
              {step === 2 && (
                <motion.div
                  key="step-2"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-8"
                >
                  {/* Space Selector */}
                  <div className="space-y-3">
                    <label className="block text-xs font-mono uppercase tracking-wider text-foreground-subtle font-semibold">
                      1. Select Private Dining Space
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {EVENT_SPACES.map((space) => {
                        const isSelected = selectedSpaceId === space.id;
                        return (
                          <button
                            type="button"
                            key={space.id}
                            onClick={() => setSelectedSpaceId(space.id)}
                            className={cn(
                              "p-4 rounded-2xl text-left border transition-all duration-200 flex flex-col justify-between space-y-3",
                              isSelected
                                ? "bg-primary/10 border-primary shadow-xs ring-1 ring-primary"
                                : "bg-surface-subtle/50 hover:bg-surface-subtle border-border"
                            )}
                          >
                            <div>
                              <div className="text-sm font-bold font-display text-foreground">
                                {space.name}
                              </div>
                              <div className="text-xs text-foreground-muted mt-1">
                                {space.seatedCapacity} seated / {space.receptionCapacity} standing
                              </div>
                            </div>
                            <div className="text-[11px] font-mono font-medium text-primary">
                              Min Spend: {space.minSpend.split("/")[0]}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Dining Format Package */}
                  <div className="space-y-3">
                    <label className="block text-xs font-mono uppercase tracking-wider text-foreground-subtle font-semibold">
                      2. Choose Culinary Package
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {PACKAGES.map((pkg) => {
                        const isSelected = diningPackage === pkg.id;
                        return (
                          <button
                            type="button"
                            key={pkg.id}
                            onClick={() => setDiningPackage(pkg.id)}
                            className={cn(
                              "p-4 rounded-2xl text-left border transition-all duration-200 flex flex-col justify-between space-y-3",
                              isSelected
                                ? "bg-primary/10 border-primary shadow-xs ring-1 ring-primary"
                                : "bg-surface-subtle/50 hover:bg-surface-subtle border-border"
                            )}
                          >
                            <div>
                              <span className="inline-block px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-surface text-foreground-muted border border-border mb-1.5">
                                {pkg.tag}
                              </span>
                              <div className="text-sm font-bold font-display text-foreground">
                                {pkg.name}
                              </div>
                              <p className="text-xs text-foreground-muted mt-1 leading-relaxed">
                                {pkg.description}
                              </p>
                            </div>
                            <div className="text-base font-mono font-bold text-foreground">
                              ${pkg.pricePerPerson}{" "}
                              <span className="text-xs font-normal text-foreground-muted">
                                / guest
                              </span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Sommelier Wine Addon */}
                  <div className="p-4 rounded-2xl bg-amber-500/5 border border-amber-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Wine className="w-4 h-4 text-primary" />
                        <span className="text-sm font-bold text-foreground">
                          Sommelier Biodynamic Wine Pairing (+ $55 / guest)
                        </span>
                      </div>
                      <p className="text-xs text-foreground-muted">
                        Curated low-intervention pairings with cellar pours guided by our Head Sommelier.
                      </p>
                    </div>

                    <label className="relative inline-flex items-center cursor-pointer shrink-0">
                      <input
                        type="checkbox"
                        checked={addWinePairing}
                        onChange={(e) => setAddWinePairing(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-surface-subtle peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-border after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary border border-border"></div>
                    </label>
                  </div>

                  {/* Live Cost Calculator Banner */}
                  <div className="p-5 rounded-2xl bg-surface-subtle border border-border flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div>
                      <div className="text-xs font-mono uppercase tracking-wider text-foreground-subtle">
                        Live Estimated F&B Total
                      </div>
                      <div className="text-xs text-foreground-muted mt-0.5">
                        {guestCount} Guests × (${selectedPkg.pricePerPerson} {addWinePairing ? "+ $55 wine" : ""})
                      </div>
                    </div>
                    <div className="text-2xl sm:text-3xl font-mono font-bold text-primary">
                      ${estimatedFoodBevTotal.toLocaleString()}
                      <span className="text-xs font-normal text-foreground-muted ml-1">
                        + tax & gratuity
                      </span>
                    </div>
                  </div>

                  {/* Step 2 Actions */}
                  <div className="flex items-center justify-between pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setStep(1)}
                      className="gap-2 rounded-xl"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Back</span>
                    </Button>

                    <Button
                      type="button"
                      onClick={() => setStep(3)}
                      className="gap-2 rounded-xl py-5 px-6 font-display"
                    >
                      <span>Proceed to Contact</span>
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                </motion.div>
              )}

              {/* STEP 3: Contact & Hospitality Details */}
              {step === 3 && (
                <motion.div
                  key="step-3"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-mono uppercase tracking-wider text-foreground-subtle font-semibold">
                        Organizer / Host Name *
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 absolute left-3.5 top-3.5 text-foreground-subtle" />
                        <input
                          type="text"
                          required
                          value={organizerName}
                          onChange={(e) => setOrganizerName(e.target.value)}
                          placeholder="e.g. Alistair Sterling"
                          className="w-full pl-10 pr-4 py-3 rounded-xl bg-surface-subtle border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary font-sans"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-mono uppercase tracking-wider text-foreground-subtle font-semibold">
                        Company / Organization (Optional)
                      </label>
                      <div className="relative">
                        <Building2 className="w-4 h-4 absolute left-3.5 top-3.5 text-foreground-subtle" />
                        <input
                          type="text"
                          value={company}
                          onChange={(e) => setCompany(e.target.value)}
                          placeholder="e.g. Apex Architecture"
                          className="w-full pl-10 pr-4 py-3 rounded-xl bg-surface-subtle border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary font-sans"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-mono uppercase tracking-wider text-foreground-subtle font-semibold">
                        Email Address *
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 absolute left-3.5 top-3.5 text-foreground-subtle" />
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="events@company.com"
                          className="w-full pl-10 pr-4 py-3 rounded-xl bg-surface-subtle border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary font-mono"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-mono uppercase tracking-wider text-foreground-subtle font-semibold">
                        Direct Phone Number *
                      </label>
                      <div className="relative">
                        <Phone className="w-4 h-4 absolute left-3.5 top-3.5 text-foreground-subtle" />
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+1 (555) 019-2834"
                          className="w-full pl-10 pr-4 py-3 rounded-xl bg-surface-subtle border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary font-mono"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-mono uppercase tracking-wider text-foreground-subtle font-semibold">
                      Dietary Accommodations & Special Requests
                    </label>
                    <textarea
                      rows={3}
                      value={specialRequests}
                      onChange={(e) => setSpecialRequests(e.target.value)}
                      placeholder="Please note any severe allergies, AV needs, customized tasting preferences, or schedule nuances..."
                      className="w-full p-3.5 rounded-xl bg-surface-subtle border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary font-sans"
                    />
                  </div>

                  {/* Concierge Guarantee Badge */}
                  <div className="p-4 rounded-2xl bg-emerald-50 text-emerald-900 border border-emerald-200 flex items-center gap-3">
                    <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                    <div className="text-xs">
                      <span className="font-semibold">&lt;24-Hour Event Concierge Guarantee&gt;</span>
                      <p className="text-emerald-800 text-[11px] mt-0.5">
                        Our Private Events Director reviews every inquiry and delivers a customized layout, wine allocation proposal, and contract within one business day.
                      </p>
                    </div>
                  </div>

                  {/* Step 3 Actions */}
                  <div className="flex items-center justify-between pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setStep(2)}
                      className="gap-2 rounded-xl"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Back</span>
                    </Button>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="gap-2 rounded-xl py-5 px-8 font-display shadow-sm"
                    >
                      <span>{isSubmitting ? "Submitting Inquiry..." : "Submit Event Inquiry"}</span>
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </div>
      </div>
    </section>
  );
}
