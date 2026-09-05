"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Quote,
  Star,
  Award,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { PRESS_REVIEWS } from "@/data/press-data";

export function PressBanner() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  const reviews = PRESS_REVIEWS;

  useEffect(() => {
    if (!isAutoPlay) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % reviews.length);
    }, 6500);
    return () => clearInterval(timer);
  }, [isAutoPlay, reviews.length]);

  const next = () => {
    setIsAutoPlay(false);
    setActiveIndex((prev) => (prev + 1) % reviews.length);
  };

  const prev = () => {
    setIsAutoPlay(false);
    setActiveIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const activeReview = reviews[activeIndex];

  return (
    <section className="w-full py-16 lg:py-24 bg-surface relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-medium text-primary uppercase tracking-widest">
            <Award className="w-4 h-4" />
            <span>Critical Acclaim</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display tracking-tight text-foreground">
            Recognized by the World&apos;s Finest Palates<span className="text-primary">.</span>
          </h2>
        </div>

        {/* Apple-grade Interactive Spotlight Card */}
        <div className="relative max-w-4xl mx-auto">
          <div className="bg-surface-subtle border border-border rounded-2xl sm:rounded-3xl p-6 sm:p-12 lg:p-14 shadow-card relative overflow-hidden">
            {/* Background Decorative Large Quote Mark */}
            <Quote
              className="absolute -bottom-4 -right-4 w-40 h-40 text-border/40 pointer-events-none -z-0"
              aria-hidden="true"
            />

            <AnimatePresence mode="wait">
              <motion.div
                key={activeReview.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10 flex flex-col justify-between min-h-[220px]"
              >
                {/* Publication Chip & Accolade Tag */}
                <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface text-foreground font-display font-bold text-sm tracking-wide border border-border shadow-subtle">
                    <Sparkles className="w-3.5 h-3.5 text-accent-gold" />
                    <span>{activeReview.publication}</span>
                  </div>

                  {activeReview.accolade && (
                    <span className="text-xs font-mono text-primary font-medium bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
                      {activeReview.accolade}
                    </span>
                  )}
                </div>

                {/* The Quote */}
                <blockquote className="text-lg sm:text-2xl font-display font-medium text-foreground leading-snug tracking-tight mb-8">
                  &ldquo;{activeReview.quote}&rdquo;
                </blockquote>

                {/* Author & Rating Matrix */}
                <div className="flex flex-wrap items-center justify-between border-t border-border/80 pt-4 gap-4 text-xs font-mono">
                  <div className="flex items-center gap-2 text-foreground-muted">
                    <span className="font-semibold text-foreground">
                      {activeReview.author || activeReview.publication}
                    </span>
                    <span>·</span>
                    <span className="text-foreground-subtle">{activeReview.year}</span>
                  </div>

                  {activeReview.rating && (
                    <div className="flex items-center gap-1.5 text-accent-gold font-medium">
                      <Star className="w-3.5 h-3.5 fill-current text-accent-gold" />
                      <span>{activeReview.rating}</span>
                    </div>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Carousel Navigation Arrows */}
            <div className="absolute top-6 right-6 sm:top-8 sm:right-8 flex items-center gap-1 z-20">
              <button
                type="button"
                onClick={prev}
                aria-label="Previous review"
                className="w-8 h-8 rounded-full bg-surface border border-border hover:bg-background-subtle flex items-center justify-center text-foreground-muted hover:text-foreground transition-colors shadow-subtle"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={next}
                aria-label="Next review"
                className="w-8 h-8 rounded-full bg-surface border border-border hover:bg-background-subtle flex items-center justify-center text-foreground-muted hover:text-foreground transition-colors shadow-subtle"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex items-center justify-center gap-2 mt-6">
            {reviews.map((r, idx) => (
              <button
                key={r.id}
                type="button"
                onClick={() => {
                  setIsAutoPlay(false);
                  setActiveIndex(idx);
                }}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  activeIndex === idx
                    ? "w-8 bg-primary"
                    : "w-2 bg-border hover:bg-foreground-subtle"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Publication Chips Strip */}
        <div className="mt-12 pt-8 border-t border-border grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {reviews.map((item) => (
            <div
              key={item.id}
              className="p-3 rounded-xl bg-surface-subtle/50 border border-border/60 hover:bg-surface transition-colors"
            >
              <span className="text-xs font-mono font-semibold text-foreground-muted block">
                {item.publication}
              </span>
              <span className="text-[11px] font-sans text-foreground-subtle block mt-0.5 truncate">
                {item.accolade || item.rating}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
