"use client";

import React, { type ReactNode } from "react";
import { HeroUIProvider } from "@heroui/react";
import { CartProvider } from "../lib/cart-context";
import { BagDrawer } from "../components/bag-drawer";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <HeroUIProvider>
      <CartProvider>
        {children}
        <BagDrawer />
      </CartProvider>
    </HeroUIProvider>
  );
}
