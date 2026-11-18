"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SiteHeader } from "../../../components/site-header";
import { SiteFooter } from "../../../components/site-footer";
import { useAuth } from "../../../lib/auth-context";

export default function AuthPage() {
  const router = useRouter();
  const { signIn, signUp, user } = useAuth();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [role, setRole] = useState<"customer" | "admin">("customer");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      if (mode === "login") {
        const res = await signIn(email, password);
        if (res.error) {
          setError(res.error.message);
        } else {
          setSuccess("Welcome back. Redirecting…");
          setTimeout(() => router.push(email.includes("admin") ? "/admin" : "/"), 800);
        }
      } else {
        const res = await signUp(email, password, fullName, role);
        if (res.error) {
          setError(res.error.message);
        } else {
          setSuccess("Account created successfully. Welcome to The Everyday Edit.");
          setTimeout(() => router.push(role === "admin" ? "/admin" : "/"), 1000);
        }
      }
    } catch {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async (asAdmin = false) => {
    setLoading(true);
    setError(null);
    const demoEmail = asAdmin ? "admin@everydayedit.com" : "customer@everydayedit.com";
    const demoPass = "password123";
    const res = await signIn(demoEmail, demoPass);
    if (!res.error) {
      router.push(asAdmin ? "/admin" : "/");
    } else {
      setError(res.error.message);
    }
    setLoading(false);
  };

  return (
    <div className="site-shell">
      <SiteHeader />
      <main className="auth-page">
        <div className="auth-card">
          <header className="auth-card__header">
            <p className="section-index">Supabase Authentication</p>
            <h1 className="auth-card__title">
              {mode === "login" ? "Welcome back." : "Create your wardrobe account."}
            </h1>
            <p className="auth-card__sub">
              {mode === "login"
                ? "Sign in to view past orders, track dispatch, and access exclusive edits."
                : "Join the edit for considered pieces, order history, and tailored sizing."}
            </p>
          </header>

          {/* Mode Switcher Tabs */}
          <div className="auth-tabs" role="tablist" aria-label="Sign in or sign up">
            <button
              type="button"
              role="tab"
              aria-selected={mode === "login"}
              className={`auth-tab ${mode === "login" ? "auth-tab--active" : ""}`}
              onClick={() => {
                setMode("login");
                setError(null);
              }}
            >
              Sign In
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={mode === "signup"}
              className={`auth-tab ${mode === "signup" ? "auth-tab--active" : ""}`}
              onClick={() => {
                setMode("signup");
                setError(null);
              }}
            >
              Create Account
            </button>
          </div>

          {error && (
            <div className="auth-alert auth-alert--error" role="alert">
              {error}
            </div>
          )}

          {success && (
            <div className="auth-alert auth-alert--success" role="status">
              {success}
            </div>
          )}

          <form className="auth-form" onSubmit={handleSubmit}>
            {mode === "signup" && (
              <div className="auth-field">
                <label htmlFor="auth-name">Full Name</label>
                <input
                  id="auth-name"
                  type="text"
                  required
                  placeholder="e.g. Mara T."
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="auth-input"
                />
              </div>
            )}

            <div className="auth-field">
              <label htmlFor="auth-email">Email Address</label>
              <input
                id="auth-email"
                type="email"
                required
                autoComplete="email"
                placeholder="you@domain.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="auth-input"
              />
            </div>

            <div className="auth-field">
              <label htmlFor="auth-password">Password</label>
              <input
                id="auth-password"
                type="password"
                required
                autoComplete={mode === "login" ? "current-password" : "new-password"}
                placeholder="At least 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="auth-input"
              />
            </div>

            {mode === "signup" && (
              <div className="auth-field">
                <label htmlFor="auth-role">Account Access Level</label>
                <select
                  id="auth-role"
                  value={role}
                  onChange={(e) => setRole(e.target.value as "customer" | "admin")}
                  className="auth-input"
                >
                  <option value="customer">Customer (Storefront & Orders)</option>
                  <option value="admin">Admin (Inventory & Store Management)</option>
                </select>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="banner__btn banner__btn--primary auth-submit-btn"
            >
              {loading ? "Verifying with Supabase…" : mode === "login" ? "Sign In" : "Register Account"}
            </button>
          </form>

          {/* Quick Demo Access Bar */}
          <div className="auth-demo-box">
            <p className="auth-demo-label">Quick One-Click Demo Access</p>
            <div className="auth-demo-actions">
              <button
                type="button"
                className="auth-demo-btn"
                onClick={() => handleDemoLogin(false)}
                disabled={loading}
              >
                Sign in as Customer
              </button>
              <button
                type="button"
                className="auth-demo-btn auth-demo-btn--admin"
                onClick={() => handleDemoLogin(true)}
                disabled={loading}
              >
                Sign in as Admin
              </button>
            </div>
          </div>

          <p className="auth-back">
            <Link href="/products">← Return to Collection</Link>
          </p>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
