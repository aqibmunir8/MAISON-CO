"use client";

import React, { useState, useEffect, useId } from "react";
import Link from "next/link";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ShoppingBag,
  Plus,
  Minus,
  Trash2,
  Clock,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Store,
  FileText,
  Utensils,
} from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { formatPrice, cn } from "@/lib/utils";

const PICKUP_TIMES = [
  "In 15 minutes (Express)",
  "In 30 minutes",
  "Today at 12:30 PM",
  "Today at 2:00 PM",
  "Tomorrow at 8:00 AM (Fresh Bake)",
];

const TAX_RATE = 0.08875; // 8.875% local sales tax

export function CartDrawer() {
  const {
    isCartOpen,
    closeCart,
    cartItems,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartTotal,
  } = useStore();

  const [isMounted, setIsMounted] = useState(false);
  const [pickupTime, setPickupTime] = useState(PICKUP_TIMES[0]);
  const [specialInstructions, setSpecialInstructions] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<{
    orderId: string;
    pickupTime: string;
    subtotal: number;
    tax: number;
    total: number;
    itemCount: number;
  } | null>(null);

  const titleId = useId();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (!isCartOpen) return;

    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        closeCart();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isCartOpen, closeCart]);

  const subtotal = cartTotal;
  const tax = subtotal * TAX_RATE;
  const total = subtotal + tax;

  const handleCompleteOrder = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      const orderId = `ORD-${Math.floor(1000 + Math.random() * 9000)}`;
      const itemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

      setConfirmedOrder({
        orderId,
        pickupTime,
        subtotal,
        tax,
        total,
        itemCount,
      });

      clearCart();
      setIsSubmitting(false);
    }, 750);
  };

  const handleFinishConfirmation = () => {
    setConfirmedOrder(null);
    closeCart();
    setSpecialInstructions("");
    setPickupTime(PICKUP_TIMES[0]);
  };

  if (!isMounted) return null;

  return createPortal(
    <AnimatePresence>
      {isCartOpen && (
        <div
          className="fixed inset-0 z-50 flex justify-end overflow-hidden"
          role="presentation"
        >
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            onClick={confirmedOrder ? handleFinishConfirmation : closeCart}
            className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
            aria-hidden="true"
          />

          {/* Slide-out Drawer Panel */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 280 }}
            className="relative w-full max-w-md md:max-w-lg bg-[#FAFAF8] h-full shadow-2xl flex flex-col z-10 text-[#121316] focus:outline-none"
          >
            {/* Drawer Header */}
            <div className="p-5 sm:px-6 py-4 bg-white border-b border-[#E8E8E2] flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#F7EAE3] text-[#B4461B] flex items-center justify-center">
                  <ShoppingBag className="w-4 h-4" />
                </div>
                <div>
                  <h2
                    id={titleId}
                    className="font-display text-lg sm:text-xl font-bold text-[#121316] tracking-tight leading-none"
                  >
                    Bakery &amp; Coffee Pickup
                  </h2>
                  <span className="text-[11px] text-[#848C9E] font-medium">
                    Fresh from our hearth &amp; espresso bar
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={confirmedOrder ? handleFinishConfirmation : closeCart}
                className="p-2 rounded-full text-[#848C9E] hover:text-[#121316] hover:bg-[#F4F4F0] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B4461B]"
                aria-label="Close cart drawer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* ORDER CONFIRMATION SCREEN */}
            {confirmedOrder ? (
              <div className="flex-1 overflow-y-auto p-6 sm:p-8 flex flex-col items-center justify-center text-center space-y-6">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="w-16 h-16 rounded-full bg-[#E8F3EE] text-[#1E6B52] flex items-center justify-center shadow-xs"
                >
                  <CheckCircle2 className="w-9 h-9" />
                </motion.div>

                <div className="space-y-1.5">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8F3EE] text-[#1E6B52] font-mono text-xs font-bold tracking-wider">
                    <Sparkles className="w-3.5 h-3.5" />
                    ORDER #{confirmedOrder.orderId}
                  </span>
                  <h3 className="font-display text-2xl font-bold text-[#121316]">
                    Order Received!
                  </h3>
                  <p className="text-xs sm:text-sm text-[#525866] max-w-xs mx-auto leading-relaxed">
                    Our bakers and baristas are preparing your items now for pickup.
                  </p>
                </div>

                {/* Pickup Instructions Box */}
                <div className="w-full bg-white rounded-xl border border-[#E8E8E2] p-5 text-left shadow-xs space-y-3">
                  <div className="flex items-start gap-3">
                    <Store className="w-5 h-5 text-[#B4461B] shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-[#121316]">
                        Pickup Location
                      </h4>
                      <p className="text-xs text-[#525866] mt-0.5">
                        Please head directly to the <strong>Bakery &amp; Coffee Counter</strong> at{" "}
                        <em>Maison &amp; Co., 428 Boulevard Saint-Germain</em>.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 pt-3 border-t border-[#E8E8E2]/80">
                    <Clock className="w-5 h-5 text-[#1E6B52] shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-[#121316]">
                        Estimated Ready Time
                      </h4>
                      <p className="text-xs font-semibold text-[#1E6B52] mt-0.5">
                        {confirmedOrder.pickupTime}
                      </p>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[#E8E8E2]/80 flex justify-between text-xs text-[#525866]">
                    <span>Total Paid ({confirmedOrder.itemCount} items)</span>
                    <span className="font-bold text-[#121316]">
                      {formatPrice(confirmedOrder.total)}
                    </span>
                  </div>
                </div>

                <Button
                  variant="primary"
                  size="lg"
                  onClick={handleFinishConfirmation}
                  className="w-full"
                >
                  Done &amp; Return
                </Button>
              </div>
            ) : cartItems.length === 0 ? (
              /* EMPTY CART STATE */
              <div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-8 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#F4F4F0] text-[#848C9E] flex items-center justify-center">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-display text-xl font-bold text-[#121316]">
                    Your Pickup Bag is Empty
                  </h3>
                  <p className="text-xs sm:text-sm text-[#525866] max-w-xs mx-auto">
                    Explore our morning viennoiserie, hearth sourdough loaves, and specialty coffee.
                  </p>
                </div>
                <Link
                  href="/menu"
                  onClick={closeCart}
                  className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg bg-[#B4461B] text-white text-sm font-medium hover:bg-[#963813] transition-colors shadow-sm"
                >
                  <span>Explore All-Day Menu</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ) : (
              /* CART WITH ITEMS */
              <>
                {/* Scrollable Items List */}
                <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-[#E8E8E2]">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#848C9E]">
                      Selected Items ({cartItems.length})
                    </span>
                    <button
                      type="button"
                      onClick={clearCart}
                      className="text-xs text-[#848C9E] hover:text-red-600 transition-colors"
                    >
                      Clear All
                    </button>
                  </div>

                  {/* Items Stack */}
                  <div className="space-y-3">
                    {cartItems.map((item) => (
                      <div
                        key={item.id}
                        className="bg-white rounded-xl border border-[#E8E8E2] p-3.5 sm:p-4 flex gap-3 sm:gap-4 items-center shadow-xs"
                      >
                        {/* Thumbnail */}
                        <div className="w-14 h-14 rounded-lg bg-[#F4F4F0] border border-[#E8E8E2] shrink-0 overflow-hidden flex items-center justify-center text-[#848C9E]">
                          {item.image ? (
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                (e.target as HTMLElement).style.display = "none";
                              }}
                            />
                          ) : (
                            <Utensils className="w-5 h-5 text-[#CBB590]" />
                          )}
                        </div>

                        {/* Title & Price */}
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-xs sm:text-sm text-[#121316] truncate">
                            {item.name}
                          </h4>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-xs font-bold text-[#B4461B]">
                              {formatPrice(item.price)}
                            </span>
                            <span className="text-[10px] text-[#848C9E]">
                              each · {formatPrice(item.price * item.quantity)} total
                            </span>
                          </div>
                        </div>

                        {/* Quantity controls */}
                        <div className="flex items-center gap-1.5 bg-[#FAFAF8] border border-[#E8E8E2] rounded-lg p-1 shrink-0">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.dishId, item.quantity - 1)}
                            className="w-6 h-6 flex items-center justify-center rounded text-[#525866] hover:text-[#121316] hover:bg-white transition-colors"
                            aria-label={`Decrease quantity for ${item.name}`}
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="w-6 text-center text-xs font-bold text-[#121316]">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.dishId, item.quantity + 1)}
                            className="w-6 h-6 flex items-center justify-center rounded text-[#525866] hover:text-[#121316] hover:bg-white transition-colors"
                            aria-label={`Increase quantity for ${item.name}`}
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Remove item */}
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.dishId)}
                          className="p-1.5 text-[#848C9E] hover:text-red-600 transition-colors shrink-0"
                          aria-label={`Remove ${item.name} from cart`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Pickup Time Slot Selector */}
                  <div className="pt-2">
                    <label className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#525866] mb-2">
                      <Clock className="w-3.5 h-3.5 text-[#B4461B]" />
                      Pickup Time Slot
                    </label>
                    <select
                      value={pickupTime}
                      onChange={(e) => setPickupTime(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-[#E8E8E2] text-xs font-medium text-[#121316] bg-white focus:outline-none focus:border-[#B4461B] focus:ring-2 focus:ring-[#B4461B]/15"
                    >
                      {PICKUP_TIMES.map((time) => (
                        <option key={time} value={time}>
                          {time}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Special Preparation Instructions */}
                  <div>
                    <label className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#525866] mb-1.5">
                      <FileText className="w-3.5 h-3.5 text-[#B4461B]" />
                      Special Preparation Notes (Optional)
                    </label>
                    <input
                      type="text"
                      value={specialInstructions}
                      onChange={(e) => setSpecialInstructions(e.target.value)}
                      placeholder="e.g. Extra hot milk, sliced loaf, oats milk..."
                      className="w-full px-3 py-2 rounded-lg border border-[#E8E8E2] text-xs text-[#121316] bg-white focus:outline-none focus:border-[#B4461B] focus:ring-2 focus:ring-[#B4461B]/15"
                    />
                  </div>
                </div>

                {/* Footer with Price Breakdown and CTA */}
                <div className="p-5 sm:px-6 bg-white border-t border-[#E8E8E2] shrink-0 space-y-3">
                  <div className="space-y-1.5 text-xs text-[#525866]">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="font-medium text-[#121316]">
                        {formatPrice(subtotal)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Estimated NYC Local Tax (8.875%)</span>
                      <span className="font-medium text-[#121316]">{formatPrice(tax)}</span>
                    </div>
                    <div className="flex justify-between text-sm font-bold text-[#121316] pt-2 border-t border-[#E8E8E2]">
                      <span>Total Amount</span>
                      <span className="text-base text-[#B4461B]">{formatPrice(total)}</span>
                    </div>
                  </div>

                  <Button
                    variant="primary"
                    size="lg"
                    onClick={handleCompleteOrder}
                    isLoading={isSubmitting}
                    className="w-full"
                  >
                    Complete Pickup Order · {formatPrice(total)}
                  </Button>

                  <p className="text-[10px] text-center text-[#848C9E]">
                    Pay now or at pickup counter · Freshness guaranteed
                  </p>
                </div>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
