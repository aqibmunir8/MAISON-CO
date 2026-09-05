"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  CalendarDays,
  ArrowRight,
  Clock,
  Sparkles,
  MapPin,
  UtensilsCrossed,
} from "lucide-react";
import {
  HeroBento,
  PillarsCraft,
  SignatureSpotlight,
  AtmosphereGallery,
  PressBanner,
} from "@/components/sections";
import { Button } from "@/components/ui/Button";
import { useStore } from "@/context/StoreContext";

export default function HomePage() {
  const { openBookingModal } = useStore();

  return (
    <div className="flex flex-col w-full min-h-screen">
      {/* 1. Hero Bento Grid */}
      <HeroBento />

      {/* 2. Three Pillars of Craft */}
      <PillarsCraft />

      {/* 3. Signature Spotlight All-Day Dishes */}
      <SignatureSpotlight />

      {/* 4. Atmosphere Gallery (Morning, Midday, Evening) */}
      <AtmosphereGallery />

      {/* 5. Press & Critic Accolades Banner */}
      <PressBanner />

      {/* 6. Closing Reservation CTA Banner */}
      <section className="w-full py-16 lg:py-24 bg-foreground text-background relative overflow-hidden">
        {/* Ambient Subtle Glow */}
        <div
          className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/20 rounded-full blur-[100px] pointer-events-none"
          aria-hidden="true"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-white/5 border border-white/10 rounded-2xl sm:rounded-3xl p-8 sm:p-14 lg:p-16 text-center max-w-4xl mx-auto backdrop-blur-md shadow-elevated">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-accent-gold text-xs font-mono font-medium mb-6 border border-white/15">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Join Us at the Hearth</span>
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold font-display tracking-tight text-white mb-6">
              A Table Awaits You<span className="text-primary">.</span>
            </h2>

            <p className="text-base sm:text-lg text-white/70 max-w-xl mx-auto leading-relaxed mb-8 sm:mb-10 font-sans">
              From our morning sourdough drop to evening wood-fired feasts, experience modern hospitality rooted in fire, flour, and natural terroirs.
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

              <Link href="/events-catering" className="w-full sm:w-auto">
                <Button
                  variant="secondary"
                  size="lg"
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                  className="w-full sm:w-auto text-sm sm:text-base"
                >
                  Private Dining & Events
                </Button>
              </Link>
            </div>

            {/* Quick Meta Footer */}
            <div className="mt-10 pt-8 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono text-white/60">
              <div className="flex items-center justify-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-accent-gold" />
                <span>Saint-Germain-des-Prés, Paris</span>
              </div>
              <div className="flex items-center justify-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-accent-fresh" />
                <span>Daily: 7:00 AM – 11:00 PM</span>
              </div>
              <div className="flex items-center justify-center gap-1.5">
                <UtensilsCrossed className="w-3.5 h-3.5 text-primary" />
                <span>Walk-Ins Welcome at Bakery Counter</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
