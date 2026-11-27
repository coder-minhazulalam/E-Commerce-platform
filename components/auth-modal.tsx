"use client";

import React, { useState } from "react";
import { X, Lock, Mail, User, ShieldCheck, Sparkles, ArrowRight } from "lucide-react";
import { useAuth } from "../lib/auth-context";

export function AuthModal() {
  const { isAuthModalOpen, closeAuthModal, login, authReason } = useAuth();
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isAuthModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !email.includes("@")) {
      setError("Please enter a valid email address");
      return;
    }

    setLoading(true);
    await new Promise((r) => setTimeout(r, 600)); // Smooth patron authentication
    await login(email, fullName || "Atelier Patron");
    setLoading(false);
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 animate-fadeIn"
      role="dialog"
      aria-modal="true"
    >
      {/* Glassmorphic Dark Backdrop */}
      <div
        onClick={closeAuthModal}
        className="fixed inset-0 bg-[#0c1712]/70 backdrop-blur-md transition-opacity"
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-md bg-[#fcf9f4] border border-[#c3c8c2]/60 shadow-2xl p-6 sm:p-8 z-10">
        <button
          type="button"
          onClick={closeAuthModal}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#f6f3ee] hover:bg-white border border-[#c3c8c2]/50 flex items-center justify-center text-[#737873] hover:text-[#1c1c19] transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-full bg-[#243329] text-white flex items-center justify-center mx-auto mb-3 shadow-md">
            <Lock className="w-5 h-5 text-[#fed892]" />
          </div>
          <span className="text-[10px] uppercase tracking-[0.2em] text-[#755a21] font-semibold">
            OOTFY ATELIER PATRON ACCESS
          </span>
          <h2 className="font-serif text-2xl text-[#1c1c19] tracking-tight mt-1">
            Sign In to Continue
          </h2>
          {authReason && (
            <p className="text-xs text-[#5a605b] mt-2 bg-[#f6f3ee] py-2 px-3 border border-[#c3c8c2]/40">
              {authReason}
            </p>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block uppercase tracking-wider text-[#434844] font-medium mb-1">
              Your Name
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-[#737873] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="e.g. Tanzim Rahman"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 bg-white border border-[#c3c8c2]/60 text-xs focus:outline-none focus:border-[#243329]"
              />
            </div>
          </div>

          <div>
            <label className="block uppercase tracking-wider text-[#434844] font-medium mb-1">
              Email Address *
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#737873] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                placeholder="tanzim@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 bg-white border border-[#c3c8c2]/60 text-xs focus:outline-none focus:border-[#243329]"
              />
            </div>
            {error && <p className="text-red-600 text-[11px] mt-1">{error}</p>}
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[#243329] hover:bg-[#1a261e] text-white text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm disabled:opacity-50"
            >
              {loading ? (
                <span>Accessing Atelier...</span>
              ) : (
                <>
                  <span>Enter Atelier</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>

        <div className="mt-6 pt-4 border-t border-[#c3c8c2]/30 flex items-center justify-center gap-2 text-[10px] text-[#737873] uppercase tracking-wider">
          <ShieldCheck className="w-3.5 h-3.5 text-[#755a21]" />
          <span>Members-Only Masterwork Preservation</span>
        </div>
      </div>
    </div>
  );
}
