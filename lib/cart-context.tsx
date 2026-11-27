"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { type OotfyProduct } from "./products";

export interface CartItem {
  id: string; // product.id
  product: OotfyProduct;
  size: string;
  color: string;
  quantity: number;
  addedAt: string;
}

export interface CheckoutDetails {
  // Step 1: Contact & Delivery
  fullName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  district: string;
  postalCode: string;
  deliveryNotes?: string;

  // Step 2: Bespoke & Packaging
  giftWrap: boolean;
  giftMessage?: string;
  bespokeTailoringNotes?: string;

  // Step 3: Payment
  paymentMethod: "cod" | "bkash" | "card";
}

export interface PlacedOrder {
  orderId: string;
  createdAt: string;
  items: CartItem[];
  subtotal: number;
  shippingFee: number;
  giftWrapFee: number;
  total: number;
  checkout: CheckoutDetails;
  status: "Confirmed" | "Artisan Preparing" | "Dispatched" | "Delivered";
  estimatedDelivery: string;
}

interface CartContextType {
  items: CartItem[];
  isBagOpen: boolean;
  openBag: () => void;
  closeBag: () => void;
  addItem: (product: OotfyProduct, size?: string, color?: string, quantity?: number) => void;
  updateQuantity: (id: string, size: string, quantity: number) => void;
  removeItem: (id: string, size: string) => void;
  clearCart: () => void;
  totalCount: number;
  subtotal: number;
  shippingFee: number;
  latestOrder: PlacedOrder | null;
  setLatestOrder: (order: PlacedOrder | null) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const STORAGE_KEY = "ootfy_atelier_cart_v1";
const ORDER_STORAGE_KEY = "ootfy_atelier_latest_order_v1";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isBagOpen, setIsBagOpen] = useState(false);
  const [latestOrder, setLatestOrderState] = useState<PlacedOrder | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem(STORAGE_KEY);
      if (savedCart) {
        setItems(JSON.parse(savedCart));
      }
      const savedOrder = localStorage.getItem(ORDER_STORAGE_KEY);
      if (savedOrder) {
        setLatestOrderState(JSON.parse(savedOrder));
      }
    } catch {
      // Ignore SSR storage access errors
    }
    setIsInitialized(true);
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    if (!isInitialized) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // Storage quota or disabled
    }
  }, [items, isInitialized]);

  const setLatestOrder = (order: PlacedOrder | null) => {
    setLatestOrderState(order);
    try {
      if (order) {
        localStorage.setItem(ORDER_STORAGE_KEY, JSON.stringify(order));
      } else {
        localStorage.removeItem(ORDER_STORAGE_KEY);
      }
    } catch {}
  };

  const openBag = () => setIsBagOpen(true);
  const closeBag = () => setIsBagOpen(false);

  const addItem = (
    product: OotfyProduct,
    size?: string,
    color?: string,
    quantity: number = 1
  ) => {
    const chosenSize = size || product.sizes?.[0] || "M";
    const chosenColor = color || product.colors?.[0]?.name || "Original";

    setItems((prev) => {
      const existingIndex = prev.findIndex(
        (i) => i.id === product.id && i.size === chosenSize
      );

      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity,
        };
        return next;
      }

      return [
        ...prev,
        {
          id: product.id,
          product,
          size: chosenSize,
          color: chosenColor,
          quantity,
          addedAt: new Date().toISOString(),
        },
      ];
    });

    setIsBagOpen(true);
  };

  const updateQuantity = (id: string, size: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id, size);
      return;
    }
    setItems((prev) =>
      prev.map((i) =>
        i.id === id && i.size === size ? { ...i, quantity } : i
      )
    );
  };

  const removeItem = (id: string, size: string) => {
    setItems((prev) => prev.filter((i) => !(i.id === id && i.size === size)));
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price_bdt * item.quantity,
    0
  );
  // Complimentary delivery across Bangladesh on orders over ৳5,000
  const shippingFee = subtotal >= 5000 || subtotal === 0 ? 0 : 120;

  return (
    <CartContext.Provider
      value={{
        items,
        isBagOpen,
        openBag,
        closeBag,
        addItem,
        updateQuantity,
        removeItem,
        clearCart,
        totalCount,
        subtotal,
        shippingFee,
        latestOrder,
        setLatestOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

const defaultFallbackContext: CartContextType = {
  items: [],
  isBagOpen: false,
  openBag: () => {},
  closeBag: () => {},
  addItem: () => {},
  updateQuantity: () => {},
  removeItem: () => {},
  clearCart: () => {},
  totalCount: 0,
  subtotal: 0,
  shippingFee: 0,
  latestOrder: null,
  setLatestOrder: () => {},
};

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    return defaultFallbackContext;
  }
  return context;
}
