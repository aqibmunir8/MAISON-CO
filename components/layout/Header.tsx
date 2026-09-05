"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { ShoppingBag, Calendar, Menu } from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { MobileNav } from "./MobileNav";
import { Button } from "@/components/ui/Button";

const NAV_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu & Bakery" },
  { href: "/story", label: "Our Story" },
  { href: "/events-catering", label: "Private Events" },
  { href: "/contact", label: "Contact & Location" },
];

export function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { openBookingModal, openCart, cartCount } = useStore();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 left-0 right-0 z-40 w-full transition-all duration-300 bg-[#FAFAF8]/90 backdrop-blur-md border-b ${
          scrolled
            ? "border-[#E8E8E2] shadow-sm py-2.5"
            : "border-[#E8E8E2]/80 py-3.5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            {/* Left: Brand Logo */}
            <Link
              href="/"
              className="group flex flex-col items-start focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B4461B] rounded-lg p-1 -ml-1"
            >
              <div className="flex items-baseline gap-1">
                <span className="font-display font-bold text-xl sm:text-2xl tracking-tight text-[#121316] transition-colors group-hover:text-[#B4461B]">
                  MAISON
                </span>
                <span className="font-display font-bold text-xl sm:text-2xl tracking-tight text-[#B4461B]">
                  &amp;
                </span>
                <span className="font-display font-bold text-xl sm:text-2xl tracking-tight text-[#121316] transition-colors group-hover:text-[#B4461B]">
                  CO.
                </span>
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#B4461B] ml-0.5 mb-1" />
              </div>
              <span className="text-[9px] sm:text-[10px] uppercase font-semibold tracking-[0.2em] text-[#848C9E] -mt-1 group-hover:text-[#525866] transition-colors">
                All-Day Brasserie &amp; Bakery
              </span>
            </Link>

            {/* Center: Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              {NAV_ITEMS.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`relative px-3 py-1.5 text-sm font-medium transition-colors rounded-full ${
                      isActive
                        ? "text-[#B4461B] font-semibold"
                        : "text-[#525866] hover:text-[#121316] hover:bg-black/[0.03]"
                    }`}
                  >
                    <span>{item.label}</span>
                    {isActive && (
                      <motion.span
                        layoutId="activeNavIndicator"
                        className="absolute bottom-0 left-3 right-3 h-[2px] bg-[#B4461B] rounded-full"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right: Status Pill + Actions */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Live Hours Indicator (Desktop) */}
              <div className="hidden xl:flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8F3EE] border border-[#C2E2D3] text-[#1E6B52] text-xs font-medium">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#1E6B52] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#1E6B52]"></span>
                </span>
                <span>Open Today: 7:00 AM – 10:00 PM</span>
              </div>

              {/* Cart / Pickup Drawer Trigger */}
              <button
                type="button"
                onClick={openCart}
                className="relative p-2 text-[#525866] hover:text-[#121316] hover:bg-[#F4F4F0] rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B4461B]"
                aria-label={`View bakery pickup bag with ${cartCount} items`}
              >
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 flex items-center justify-center min-w-[20px] h-5 px-1 bg-[#B4461B] text-white text-[11px] font-bold rounded-full shadow-sm"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </button>

              {/* Table Booking Modal Trigger */}
              <Button
                variant="primary"
                size="sm"
                onClick={openBookingModal}
                className="hidden sm:inline-flex rounded-full font-medium shadow-sm hover:shadow transition-shadow"
                leftIcon={<Calendar className="w-3.5 h-3.5" />}
              >
                Reserve a Table
              </Button>

              {/* Mobile Menu Trigger */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="p-2 text-[#525866] hover:text-[#121316] hover:bg-[#F4F4F0] rounded-full transition-colors lg:hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B4461B]"
                aria-label="Open mobile navigation menu"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <MobileNav
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </>
  );
}
