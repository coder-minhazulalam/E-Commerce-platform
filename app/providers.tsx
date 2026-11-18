"use client";

import React, { type ReactNode } from "react";
import { HeroUIProvider } from "@heroui/react";
import { AuthProvider } from "../lib/auth-context";
import { BagProvider } from "../lib/cart-context";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <HeroUIProvider>
      <AuthProvider>
        <BagProvider>{children}</BagProvider>
      </AuthProvider>
    </HeroUIProvider>
  );
}
