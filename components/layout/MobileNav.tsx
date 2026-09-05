"use client";

import React from "react";
import { usePathname } from "next/navigation";
import NextLink from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, ShoppingBag, Clock, MapPin, ChevronRight, Phone } from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { Button } from "@/components/ui/Button";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

const NAV_LINKS = [
  { href: "/", label: "Home", sub: "Brasserie & Bakery Overview" },
  { href: "/menu", label: "Menu & Bakery", sub: "Morning Bakes to Hearth Dinners" },
  { href: "/story", label: "Our Story", sub: "Philosophy, Purveyors & Team" },
  { href: "/events-catering", label: "Private Events & Catering", sub: "Intimate Dinners to Grand Gatherings" },
  { href: "/contact", label: "Contact & Location", sub: "Hours, Directions & Inquiries" },
];

export function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const pathname = usePathname();
  const { openBookingModal, openCart, cartCount } = useStore();

  const handleReserve = () => {
    onClose();
    openBookingModal();
  };

  const handleOpenCart = () => {
    onClose();
    openCart();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 lg:hidden"
            aria-hidden="true"
          />

          {/* Slide-over Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-[#FAFAF8] shadow-modal flex flex-col border-l border-[#E8E8E2] lg:hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-[#E8E8E2] bg-white">
              <div className="flex flex-col">
                <span className="font-display font-bold tracking-tight text-lg text-[#121316]">
                  MAISON <span className="text-[#B4461B]">&amp;</span> CO.
                </span>
                <span className="text-[10px] tracking-widest uppercase font-medium text-[#525866]">
                  Brasserie &amp; Bakery
                </span>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="p-2 -mr-2 rounded-full text-[#525866] hover:text-[#121316] hover:bg-[#F4F4F0] transition-colors focus:outline-none focus:ring-2 focus:ring-[#B4461B]"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Navigation Body */}
            <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
              {/* Quick Status Pill */}
              <div className="flex items-center gap-2.5 px-3.5 py-2 rounded-full bg-[#E8F3EE] border border-[#C2E2D3] text-[#1E6B52] text-xs font-medium">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#1E6B52] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#1E6B52]"></span>
                </span>
                <span>Open Today: 7:00 AM – 10:00 PM</span>
              </div>

              {/* Navigation Links */}
              <nav className="space-y-1">
                {NAV_LINKS.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <NextLink
                      key={link.href}
                      href={link.href}
                      onClick={onClose}
                      className={`group flex items-center justify-between p-3 rounded-lg transition-all ${
                        isActive
                          ? "bg-[#F7EAE3] text-[#B4461B] font-semibold"
                          : "text-[#121316] hover:bg-[#F4F4F0] hover:text-[#B4461B]"
                      }`}
                    >
                      <div className="flex flex-col">
                        <span className="text-base font-display">{link.label}</span>
                        <span className="text-xs text-[#848C9E] group-hover:text-[#525866] transition-colors">
                          {link.sub}
                        </span>
                      </div>
                      <ChevronRight
                        className={`w-4 h-4 transition-transform ${
                          isActive
                            ? "text-[#B4461B] translate-x-0.5"
                            : "text-[#848C9E] group-hover:text-[#121316] group-hover:translate-x-1"
                        }`}
                      />
                    </NextLink>
                  );
                })}
              </nav>

              {/* Location & Quick Info */}
              <div className="p-4 rounded-xl bg-white border border-[#E8E8E2] space-y-3 shadow-subtle text-xs text-[#525866]">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#B4461B] shrink-0 mt-0.5" />
                  <span>482 Saint-Germain Avenue, New York, NY 10014</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Clock className="w-4 h-4 text-[#B4461B] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-[#121316]">Daily Hours</p>
                    <p>Bakery &amp; Coffee: 7:00 AM – 4:00 PM</p>
                    <p>Brunch: 9:00 AM – 3:30 PM</p>
                    <p>Dinner &amp; Hearth: 5:00 PM – 10:00 PM</p>
                  </div>
                </div>
                <div className="flex items-center gap-2.5 pt-1">
                  <Phone className="w-4 h-4 text-[#B4461B] shrink-0" />
                  <span>(212) 555-0198</span>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="p-6 border-t border-[#E8E8E2] bg-white space-y-3">
              <Button
                variant="primary"
                size="lg"
                className="w-full justify-center shadow-sm rounded-full"
                leftIcon={<Calendar className="w-4 h-4" />}
                onClick={handleReserve}
              >
                Reserve a Table
              </Button>
              <Button
                variant="secondary"
                size="lg"
                className="w-full justify-center rounded-full"
                leftIcon={<ShoppingBag className="w-4 h-4" />}
                onClick={handleOpenCart}
              >
                Order Bakery Pickup {cartCount > 0 && `(${cartCount})`}
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
