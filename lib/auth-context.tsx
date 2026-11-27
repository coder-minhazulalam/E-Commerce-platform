"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "./supabase";

export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  role: "customer" | "admin";
  lastLoginAt?: string;
}

export interface AuthResult {
  success: boolean;
  error?: string;
  user?: UserProfile;
}

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isLoading: boolean;
  isAuthModalOpen: boolean;
  openAuthModal: (reason?: string) => void;
  closeAuthModal: () => void;
  login: (email: string, fullName?: string, password?: string) => Promise<AuthResult>;
  adminLogin: (email: string, passkey: string) => Promise<AuthResult>;
  logout: () => void;
  authReason: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_STORAGE_KEY = "ootfy_auth_user_v1";

// Secret Admin Credentials exclusively for Atelier Director
export const ADMIN_CONFIG = {
  EMAIL: "admin@ootfy.com",
  PASSKEY: "OotfyAtelier2026!Admin",
  ROLE: "admin" as const,
  NAME: "Atelier Director",
};

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

  const adminLogin = async (email: string, passkey: string): Promise<AuthResult> => {
    const trimmedEmail = email.trim().toLowerCase();
    if (trimmedEmail !== ADMIN_CONFIG.EMAIL.toLowerCase()) {
      return {
        success: false,
        error: "Unrecognized administrative email address.",
      };
    }

    if (passkey !== ADMIN_CONFIG.PASSKEY) {
      return {
        success: false,
        error: "Incorrect secret Atelier passkey. Access restricted.",
      };
    }

    const adminUser: UserProfile = {
      id: "usr_atelier_director",
      email: ADMIN_CONFIG.EMAIL,
      fullName: ADMIN_CONFIG.NAME,
      role: "admin",
      lastLoginAt: new Date().toISOString(),
    };

    setUser(adminUser);
    try {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(adminUser));
    } catch {}

    closeAuthModal();
    return { success: true, user: adminUser };
  };

  const login = async (
    email: string,
    fullName: string = "Atelier Patron",
    password?: string
  ): Promise<AuthResult> => {
    const trimmedEmail = email.trim().toLowerCase();

    // Check if email is admin email
    if (trimmedEmail === ADMIN_CONFIG.EMAIL.toLowerCase() || trimmedEmail.includes("admin")) {
      if (!password) {
        return {
          success: false,
          error: "Atelier Director requires the secret administrative passkey.",
        };
      }
      if (password !== ADMIN_CONFIG.PASSKEY) {
        return {
          success: false,
          error: "Invalid admin passkey. Access denied.",
        };
      }

      const adminUser: UserProfile = {
        id: "usr_atelier_director",
        email: ADMIN_CONFIG.EMAIL,
        fullName: fullName.trim() || ADMIN_CONFIG.NAME,
        role: "admin",
        lastLoginAt: new Date().toISOString(),
      };

      setUser(adminUser);
      try {
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(adminUser));
      } catch {}

      closeAuthModal();
      return { success: true, user: adminUser };
    }

    // Standard Customer Login
    const newUser: UserProfile = {
      id: `usr_${Date.now()}`,
      email: trimmedEmail,
      fullName: fullName.trim() || "Atelier Patron",
      role: "customer",
      lastLoginAt: new Date().toISOString(),
    };

    setUser(newUser);
    try {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(newUser));
    } catch {}

    closeAuthModal();
    return { success: true, user: newUser };
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
        isAdmin: user?.role === "admin",
        isLoading,
        isAuthModalOpen,
        openAuthModal,
        closeAuthModal,
        login,
        adminLogin,
        logout,
        authReason,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

const defaultFallbackContext: AuthContextType = {
  user: null,
  isAuthenticated: false,
  isAdmin: false,
  isLoading: false,
  isAuthModalOpen: false,
  openAuthModal: () => {},
  closeAuthModal: () => {},
  login: async () => ({ success: false }),
  adminLogin: async () => ({ success: false }),
  logout: () => {},
  authReason: "",
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    return defaultFallbackContext;
  }
  return context;
}
