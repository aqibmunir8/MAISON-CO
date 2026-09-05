"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import { CartItem, DishItem, MealPeriod } from "@/types";

interface StoreContextType {
  isBookingOpen: boolean;
  setIsBookingOpen: (open: boolean) => void;
  openBookingModal: () => void;
  closeBookingModal: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  openCart: () => void;
  closeCart: () => void;
  cartItems: CartItem[];
  addToCart: (dish: DishItem, quantity?: number) => void;
  removeFromCart: (dishId: string) => void;
  updateQuantity: (dishId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
  activeMealFilter: MealPeriod;
  setActiveMealFilter: (period: MealPeriod) => void;
  isHydrated: boolean;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const STORAGE_KEY = "maison_co_cart_v1";

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [activeMealFilter, setActiveMealFilter] = useState<MealPeriod>("brunch");
  const [isHydrated, setIsHydrated] = useState(false);

  // Hydrate cart from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setCartItems(parsed);
        }
      }
    } catch (e) {
      console.warn("Failed to parse cart from localStorage", e);
    } finally {
      setIsHydrated(true);
    }
  }, []);

  // Sync cart to localStorage after hydration
  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems));
    } catch (e) {
      console.warn("Failed to persist cart to localStorage", e);
    }
  }, [cartItems, isHydrated]);

  const openBookingModal = useCallback(() => setIsBookingOpen(true), []);
  const closeBookingModal = useCallback(() => setIsBookingOpen(false), []);
  const openCart = useCallback(() => setIsCartOpen(true), []);
  const closeCart = useCallback(() => setIsCartOpen(false), []);

  const addToCart = useCallback((dish: DishItem, quantity: number = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.dishId === dish.id);
      if (existing) {
        return prev.map((item) =>
          item.dishId === dish.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      const newItem: CartItem = {
        id: `${dish.id}-${Date.now()}`,
        dishId: dish.id,
        name: dish.name,
        price: dish.price,
        quantity,
        image: dish.image,
      };
      return [...prev, newItem];
    });
  }, []);

  const removeFromCart = useCallback((dishId: string) => {
    setCartItems((prev) => prev.filter((item) => item.dishId !== dishId));
  }, []);

  const updateQuantity = useCallback((dishId: string, quantity: number) => {
    if (quantity <= 0) {
      setCartItems((prev) => prev.filter((item) => item.dishId !== dishId));
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.dishId === dishId ? { ...item, quantity } : item
      )
    );
  }, []);

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  const cartTotal = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [cartItems]);

  const cartCount = useMemo(() => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  }, [cartItems]);

  const value = useMemo(
    () => ({
      isBookingOpen,
      setIsBookingOpen,
      openBookingModal,
      closeBookingModal,
      isCartOpen,
      setIsCartOpen,
      openCart,
      closeCart,
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      cartTotal,
      cartCount,
      activeMealFilter,
      setActiveMealFilter,
      isHydrated,
    }),
    [
      isBookingOpen,
      openBookingModal,
      closeBookingModal,
      isCartOpen,
      openCart,
      closeCart,
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      cartTotal,
      cartCount,
      activeMealFilter,
      isHydrated,
    ]
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStore must be used within a StoreProvider");
  }
  return context;
}
