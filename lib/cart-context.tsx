"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { formatPrice } from "./products";

export interface BagItem {
  id: string; // unique key `${productId}-${size}`
  productId: string;
  slug: string;
  name: string;
  price: number;
  currency: string;
  size: string;
  quantity: number;
  imageIndex: number;
  category: string;
}

interface BagContextType {
  items: BagItem[];
  addItem: (item: Omit<BagItem, "id">) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearBag: () => void;
  totalItems: number;
  subtotal: number;
  shipping: number;
  total: number;
  isBagOpen: boolean;
  openBag: () => void;
  closeBag: () => void;
}

const BagContext = createContext<BagContextType | undefined>(undefined);

const BAG_STORAGE_KEY = "everyday_edit_bag";

export function BagProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<BagItem[]>([]);
  const [isBagOpen, setIsBagOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load bag from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(BAG_STORAGE_KEY);
      if (stored) {
        setItems(JSON.parse(stored));
      }
    } catch {
      // ignore
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage when items change
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(BAG_STORAGE_KEY, JSON.stringify(items));
      } catch {
        // ignore
      }
    }
  }, [items, isLoaded]);

  const addItem = (item: Omit<BagItem, "id">) => {
    const id = `${item.productId}-${item.size}`;
    setItems((prev) => {
      const existing = prev.find((i) => i.id === id);
      if (existing) {
        return prev.map((i) =>
          i.id === id ? { ...i, quantity: i.quantity + item.quantity } : i,
        );
      }
      return [...prev, { ...item, id }];
    });
    setIsBagOpen(true);
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, quantity } : i)),
    );
  };

  const clearBag = () => {
    setItems([]);
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal >= 150 || subtotal === 0 ? 0 : 15;
  const total = subtotal + shipping;

  return (
    <BagContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearBag,
        totalItems,
        subtotal,
        shipping,
        total,
        isBagOpen,
        openBag: () => setIsBagOpen(true),
        closeBag: () => setIsBagOpen(false),
      }}
    >
      {children}
    </BagContext.Provider>
  );
}

export function useBag() {
  const context = useContext(BagContext);
  if (!context) {
    return {
      items: [],
      addItem: () => {},
      removeItem: () => {},
      updateQuantity: () => {},
      clearBag: () => {},
      totalItems: 0,
      subtotal: 0,
      shipping: 0,
      total: 0,
      isBagOpen: false,
      openBag: () => {},
      closeBag: () => {},
    };
  }
  return context;
}
