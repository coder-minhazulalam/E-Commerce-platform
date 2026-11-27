"use client";

import React, { type ReactNode } from "react";
import { HeroUIProvider } from "@heroui/react";
import { AuthProvider } from "../lib/auth-context";
import { AuthModal } from "../components/auth-modal";
import { CartProvider } from "../lib/cart-context";
import { BagDrawer } from "../components/bag-drawer";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <HeroUIProvider>
      <AuthProvider>
        <CartProvider>
          {children}
          <BagDrawer />
          <AuthModal />
        </CartProvider>
      </AuthProvider>
    </HeroUIProvider>
  );
}
