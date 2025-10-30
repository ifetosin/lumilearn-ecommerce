/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Course } from "@/types/courses";

interface CartContextType {
  cart: Course[];
  addToCart: (course: Course) => void;
  removeFromCart: (slug: string) => void;
  clearCart: () => void;
  getTotal: () => number;
  isInCart: (slug: string) => boolean;
  ready: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  // ✅ Load cart from localStorage on client only
  const [cart, setCart] = useState<Course[]>(() => {
    if (typeof window === "undefined") return []; // SSR guard
    try {
      const stored = localStorage.getItem("cart");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // ✅ Track when client is ready
  const [ready, setReady] = useState(false);
  useEffect(() => {
    setReady(true);
  }, []);

  // ✅ Persist cart to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);

  const addToCart = (course: Course) => {
    setCart((prev) =>
      prev.some((item) => item.slug === course.slug) ? prev : [...prev, course]
    );
  };

  const removeFromCart = (slug: string) => {
    setCart((prev) => prev.filter((item) => item.slug !== slug));
  };

  const clearCart = () => setCart([]);

  const getTotal = () => cart.reduce((sum, item) => sum + item.price, 0);

  const isInCart = (slug: string) => cart.some((item) => item.slug === slug);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart, getTotal, isInCart, ready }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
}
