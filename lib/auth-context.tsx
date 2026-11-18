"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase, type User, type Session } from "./supabase";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  isAdmin: boolean;
  signIn: (email: string, password: string) => Promise<{ error: { message: string } | null }>;
  signUp: (
    email: string,
    password: string,
    fullName?: string,
    role?: "customer" | "admin",
  ) => Promise<{ error: { message: string } | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Read session on startup
    const currentSession = supabase.auth.getSession();
    setSession(currentSession);
    setUser(currentSession?.user ?? null);
    setLoading(false);

    // Listen to changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
      setUser(newSession?.user ?? null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    const res = await supabase.auth.signInWithPassword({ email, password });
    if (!res.error && res.data.session) {
      setSession(res.data.session);
      setUser(res.data.session.user);
    }
    return { error: res.error };
  };

  const signUp = async (
    email: string,
    password: string,
    fullName?: string,
    role: "customer" | "admin" = "customer",
  ) => {
    const res = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName || "",
          role,
        },
      },
    });
    if (!res.error && res.data.session) {
      setSession(res.data.session);
      setUser(res.data.session.user);
    }
    return { error: res.error };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setSession(null);
    setUser(null);
  };

  const isAdmin =
    user?.user_metadata?.role === "admin" ||
    (user?.email ? user.email.toLowerCase().includes("admin") : false);

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        loading,
        isAdmin,
        signIn,
        signUp,
        signOut,
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
      session: null,
      loading: false,
      isAdmin: false,
      signIn: async () => ({ error: { message: "Auth provider not mounted" } }),
      signUp: async () => ({ error: { message: "Auth provider not mounted" } }),
      signOut: async () => {},
    };
  }
  return context;
}
