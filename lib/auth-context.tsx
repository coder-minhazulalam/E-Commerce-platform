"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "./supabase";

export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  role: "customer" | "admin";
}

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isAuthModalOpen: boolean;
  openAuthModal: (reason?: string) => void;
  closeAuthModal: () => void;
  login: (email: string, fullName?: string) => Promise<boolean>;
  logout: () => void;
  authReason: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_STORAGE_KEY = "ootfy_auth_user_v1";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authReason, setAuthReason] = useState("");

  useEffect(() => {
    try {
      const stored = localStorage.getItem(AUTH_STORAGE_KEY);
      if (stored) {
        setUser(JSON.parse(stored));
      }
    } catch {
      // Storage unavailable
    }
    setIsLoading(false);
  }, []);

  const openAuthModal = (reason: string = "Sign in to access exclusive atelier details") => {
    setAuthReason(reason);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
    setAuthReason("");
  };

  const login = async (email: string, fullName: string = "Atelier Patron"): Promise<boolean> => {
    const newUser: UserProfile = {
      id: `usr_${Date.now()}`,
      email: email.trim(),
      fullName: fullName.trim() || "Atelier Patron",
      role: email.includes("admin") ? "admin" : "customer",
    };

    setUser(newUser);
    try {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(newUser));
    } catch {}

    closeAuthModal();
    return true;
  };

  const logout = () => {
    setUser(null);
    try {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    } catch {}
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        isAuthModalOpen,
        openAuthModal,
        closeAuthModal,
        login,
        logout,
        authReason,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    return {
      user: null,
      isAuthenticated: false,
      isLoading: false,
      isAuthModalOpen: false,
      openAuthModal: () => {},
      closeAuthModal: () => {},
      login: async () => false,
      logout: () => {},
      authReason: "",
    };
  }
  return context;
}
