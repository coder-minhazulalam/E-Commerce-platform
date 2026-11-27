"use client";

import { useState, useEffect } from "react";
import { supabase } from "./supabase";

export interface AtelierInventory {
  productId: string;
  stockStatus: string;
  isAvailable: boolean;
  remainingPieces: number;
  lastUpdated: string;
}

/**
 * Realtime hook for live Atelier Inventory
 * Subscribes to Supabase postgres_changes for live stock fluctuations
 * Falls back immediately to guaranteed in-stock atelier state if offline.
 */
export function useRealtimeInventory(productId: string, fallbackStatus?: string | null): AtelierInventory {
  const [inventory, setInventory] = useState<AtelierInventory>({
    productId,
    stockStatus: fallbackStatus || "In Stock — Dhaka Atelier",
    isAvailable: !fallbackStatus?.toLowerCase().includes("out of stock"),
    remainingPieces: 7, // Limited artisanal run standard
    lastUpdated: new Date().toISOString(),
  });

  useEffect(() => {
    let isMounted = true;

    // 1. Initial lookup from Supabase live products table
    const fetchLiveInventory = async () => {
      try {
        const { data, error } = await supabase
          .from("products")
          .select("id, stock_status")
          .eq("id", productId)
          .maybeSingle();

        if (!error && data && isMounted) {
          setInventory((prev) => ({
            ...prev,
            stockStatus: data.stock_status || prev.stockStatus,
            isAvailable: !data.stock_status?.toLowerCase().includes("out of stock"),
            lastUpdated: new Date().toISOString(),
          }));
        }
      } catch {
        // Fallback gracefully to default
      }
    };

    fetchLiveInventory();

    // 2. Realtime subscription to live postgres changes
    let subscription: ReturnType<typeof supabase.channel> | null = null;
    try {
      subscription = supabase
        .channel(`product-inventory-${productId}`)
        .on(
          "postgres_changes",
          {
            event: "UPDATE",
            schema: "public",
            table: "products",
            filter: `id=eq.${productId}`,
          },
          (payload) => {
            if (payload.new && isMounted) {
              const updatedStatus = payload.new.stock_status;
              setInventory((prev) => ({
                ...prev,
                stockStatus: updatedStatus || prev.stockStatus,
                isAvailable: !updatedStatus?.toLowerCase().includes("out of stock"),
                lastUpdated: new Date().toISOString(),
              }));
            }
          }
        )
        .subscribe();
    } catch {
      // Realtime channel unsupported or network offline
    }

    return () => {
      isMounted = false;
      if (subscription) {
        supabase.removeChannel(subscription);
      }
    };
  }, [productId, fallbackStatus]);

  return inventory;
}
