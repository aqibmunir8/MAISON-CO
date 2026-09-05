"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Clock,
  MapPin,
  Award,
  ArrowRight,
  CheckCircle2,
  Instagram,
  Facebook,
  Twitter,
  Mail,
} from "lucide-react";
import { Button } from "@/components/ui/Button";

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;

    setLoading(true);
    // Simulate lightweight client-side subscription
    setTimeout(() => {
      setLoading(false);
      setSubscribed(true);
    }, 600);
  };

  return (
    <footer className="bg-[#121316] text-[#FAFAF8] pt-16 pb-12 border-t border-[#26282E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 pb-12 border-b border-[#26282E]">
          {/* Col 1: Manifesto & Newsletter */}
          <div className="space-y-5">
            <div>
              <div className="flex items-baseline gap-1">
                <span className="font-display font-bold text-2xl tracking-tight text-white">
                  MAISON
                </span>
                <span className="font-display font-bold text-2xl tracking-tight text-[#B4461B]">
                  &amp;
                </span>
                <span className="font-display font-bold text-2xl tracking-tight text-white">
                  CO.
                </span>
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#B4461B] ml-0.5 mb-1" />
              </div>
              <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#848C9E] mt-0.5">
                All-Day Brasserie &amp; Bakery
              </p>
            </div>

            <p className="text-sm text-[#848C9E] leading-relaxed">
              Rooted in wild-yeast fermentation, wood-fired hearth cooking, and
              uncompromising seasonal terroir. Crafted for dawn coffees, leisurely
              midday repasts, and vibrant candlelit dinners.
            </p>

            <div className="pt-2">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-2">
                Cellar &amp; Bake Dispatches
              </h4>
              <p className="text-xs text-[#848C9E] mb-3">
                Receive seasonal bake schedules, special harvests &amp; rare cellar allocations.
              </p>

              {subscribed ? (
                <div className="flex items-center gap-2 p-3 rounded-lg bg-[#1E6B52]/20 border border-[#1E6B52]/40 text-[#4EBA97] text-xs font-medium">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>You are subscribed to cellar &amp; bake dispatches.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="space-y-2">
                  <div className="flex items-stretch gap-2">
                    <div className="relative flex-1">
                      <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#848C9E]" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email..."
                        className="w-full pl-9 pr-3 py-2 bg-[#1A1B20] border border-[#2D3039] rounded-lg text-xs text-white placeholder-[#848C9E] focus:outline-none focus:border-[#B4461B] transition-colors"
                      />
                    </div>
                    <Button
                      type="submit"
                      variant="primary"
                      size="sm"
                      isLoading={loading}
                      className="px-3 text-xs shrink-0 rounded-lg"
                      rightIcon={!loading && <ArrowRight className="w-3.5 h-3.5" />}
                    >
                      Join
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* Col 2: Service Hours Matrix */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#B4461B]" />
              <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
                Service Matrix
              </h3>
            </div>

            <ul className="space-y-4 text-xs text-[#848C9E]">
              <li className="p-3 rounded-lg bg-[#1A1B20] border border-[#26282E]/80">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-semibold text-white">Morning Bakery &amp; Coffee</span>
                  <span className="text-[#CBB590] font-mono text-[11px]">7:00 AM – 4:00 PM</span>
                </div>
                <p className="text-[11px] text-[#848C9E]">
                  Wild-yeast viennoiserie, sourdough baguettes, single-origin espresso.
                </p>
              </li>

              <li className="p-3 rounded-lg bg-[#1A1B20] border border-[#26282E]/80">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-semibold text-white">All-Day Brunch</span>
                  <span className="text-[#CBB590] font-mono text-[11px]">9:00 AM – 3:30 PM</span>
                </div>
                <p className="text-[11px] text-[#848C9E]">
                  Soft herb scrambles, tartines, farm salads, natural spritzes.
                </p>
              </li>

              <li className="p-3 rounded-lg bg-[#1A1B20] border border-[#26282E]/80">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-semibold text-white">Evening Brasserie &amp; Hearth</span>
                  <span className="text-[#CBB590] font-mono text-[11px]">5:00 PM – 10:00 PM</span>
                </div>
                <p className="text-[11px] text-[#848C9E]">
                  Wood-fired dry-aged ribeye, bouillabaisse, biodynamic low-intervention wine.
                </p>
              </li>
            </ul>
          </div>

          {/* Col 3: Location & Transit */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#B4461B]" />
              <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
                Location &amp; Transit
              </h3>
            </div>

            <div className="space-y-3 text-xs text-[#848C9E]">
              <div>
                <p className="font-semibold text-white">Maison &amp; Co. Flagship</p>
                <p>482 Saint-Germain Avenue</p>
                <p>New York, NY 10014</p>
                <p className="text-[11px] text-[#848C9E] mt-1">Cross streets: Hudson &amp; Perry</p>
              </div>

              <div className="pt-2 border-t border-[#26282E] space-y-2">
                <div>
                  <p className="font-semibold text-white">Valet Parking</p>
                  <p className="text-[11px]">Complimentary dinner valet service nightly from 5:30 PM.</p>
                </div>
                <div>
                  <p className="font-semibold text-white">Subway Transit</p>
                  <p className="text-[11px]">
                    <span className="inline-block px-1 py-0.5 rounded bg-red-600 text-white font-mono text-[9px] mr-1">1</span>
                    Christopher St Station (2 blocks)
                  </p>
                  <p className="text-[11px] mt-0.5">
                    <span className="inline-block px-1 py-0.5 rounded bg-blue-600 text-white font-mono text-[9px] mr-1">A C E</span>
                    West 4th St Station (4 blocks)
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Col 4: Recognition & Socials */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-[#B4461B]" />
              <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
                Recognition
              </h3>
            </div>

            <ul className="space-y-2.5 text-xs text-[#848C9E]">
              <li className="flex items-start gap-2">
                <span className="text-[#CBB590] mt-0.5">★</span>
                <div>
                  <span className="font-medium text-white">Michelin Guide Selected</span>
                  <p className="text-[11px] text-[#848C9E]">2024 – 2026</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#CBB590] mt-0.5">★</span>
                <div>
                  <span className="font-medium text-white">Eater 38 Essential</span>
                  <p className="text-[11px] text-[#848C9E]">Best All-Day Dining &amp; Bakery</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#CBB590] mt-0.5">★</span>
                <div>
                  <span className="font-medium text-white">James Beard Foundation</span>
                  <p className="text-[11px] text-[#848C9E]">Outstanding Pastry &amp; Bakery Nominee</p>
                </div>
              </li>
            </ul>

            <div className="pt-3 border-t border-[#26282E]">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-2.5">
                Connect
              </h4>
              <div className="flex items-center gap-2.5">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="p-2 rounded-full bg-[#1A1B20] text-[#848C9E] hover:text-white hover:bg-[#26282E] transition-colors"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="p-2 rounded-full bg-[#1A1B20] text-[#848C9E] hover:text-white hover:bg-[#26282E] transition-colors"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter"
                  className="p-2 rounded-full bg-[#1A1B20] text-[#848C9E] hover:text-white hover:bg-[#26282E] transition-colors"
                >
                  <Twitter className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#848C9E]">
          <p>© 2026 Maison &amp; Co. Culinary Group. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-6">
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/accessibility" className="hover:text-white transition-colors">
              Accessibility Statement
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms &amp; Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
