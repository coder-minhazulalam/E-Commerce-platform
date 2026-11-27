"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { X, Lock, Mail, User, ShieldCheck, Sparkles, ArrowRight, Eye, EyeOff, KeyRound } from "lucide-react";
import { useAuth } from "../lib/auth-context";

export function AuthModal() {
  const router = useRouter();
  const { isAuthModalOpen, closeAuthModal, login, authReason } = useAuth();
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [passkey, setPasskey] = useState("");
  const [showPasskey, setShowPasskey] = useState(false);
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isAuthModalOpen) return null;

  const isDirectorEmail = email.trim().toLowerCase() === "admin@ootfy.com" || isAdminMode;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !email.includes("@")) {
      setError("Please enter a valid email address");
      return;
    }

    if (isDirectorEmail && !passkey.trim()) {
      setError("Please enter the secret Atelier Director passkey");
      return;
    }

    setLoading(true);
    await new Promise((r) => setTimeout(r, 400));
    const result = await login(email, fullName || "Atelier Patron", passkey);
    setLoading(false);

    if (!result.success) {
      setError(result.error || "Authentication failed. Please check credentials.");
      return;
    }

    if (result.user?.role === "admin") {
      router.push("/admin");
    }
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
        className="fixed inset-0 bg-[#0c1712]/75 backdrop-blur-md transition-opacity"
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-md bg-[#fcf9f4] border border-[#c3c8c2]/70 shadow-2xl p-6 sm:p-8 z-10">
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
            {isDirectorEmail ? (
              <KeyRound className="w-5 h-5 text-[#fed892]" />
            ) : (
              <Lock className="w-5 h-5 text-[#fed892]" />
            )}
          </div>
          <span className="text-[10px] uppercase tracking-[0.2em] text-[#755a21] font-semibold">
            {isDirectorEmail ? "OOTFY ATELIER DIRECTOR ACCESS" : "OOTFY ATELIER PATRON ACCESS"}
          </span>
          <h2 className="font-serif text-2xl text-[#1c1c19] tracking-tight mt-1">
            {isDirectorEmail ? "Admin Console Login" : "Sign In to Continue"}
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
              {isDirectorEmail ? "Director Name" : "Your Name"}
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-[#737873] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder={isDirectorEmail ? "Atelier Director" : "e.g. Tanzim Rahman"}
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
                placeholder={isAdminMode ? "admin@ootfy.com" : "tanzim@example.com"}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 bg-white border border-[#c3c8c2]/60 text-xs focus:outline-none focus:border-[#243329]"
              />
            </div>
          </div>

          {/* Secret Passkey field when Admin Email is detected or Admin Mode selected */}
          {isDirectorEmail && (
            <div className="animate-fadeIn">
              <div className="flex items-center justify-between mb-1">
                <label className="block uppercase tracking-wider text-[#755a21] font-semibold">
                  Secret Atelier Passkey *
                </label>
                <span className="text-[10px] text-[#737873]">Confidential</span>
              </div>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-[#755a21] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type={showPasskey ? "text" : "password"}
                  required
                  placeholder="Enter secret admin passkey"
                  value={passkey}
                  onChange={(e) => setPasskey(e.target.value)}
                  className="w-full pl-9 pr-10 py-2.5 bg-[#fefdf9] border border-[#755a21]/50 text-xs focus:outline-none focus:border-[#243329] focus:ring-1 focus:ring-[#755a21]/30 font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowPasskey(!showPasskey)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#737873] hover:text-[#1c1c19] cursor-pointer"
                  aria-label={showPasskey ? "Hide passkey" : "Show passkey"}
                >
                  {showPasskey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
          )}

          {error && (
            <div className="p-2.5 bg-red-50 border border-red-200 text-red-700 text-[11px] leading-relaxed">
              {error}
            </div>
          )}

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[#243329] hover:bg-[#1a261e] text-white text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm disabled:opacity-50"
            >
              {loading ? (
                <span>Authenticating with Atelier...</span>
              ) : (
                <>
                  <span>{isDirectorEmail ? "Enter Atelier Console" : "Enter Atelier"}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>

        {/* Admin Quick Switch Toggle */}
        <div className="mt-5 pt-3 border-t border-[#c3c8c2]/30 flex items-center justify-between text-[11px] text-[#737873]">
          <button
            type="button"
            onClick={() => {
              setError("");
              if (!isAdminMode) {
                setIsAdminMode(true);
                setEmail("admin@ootfy.com");
              } else {
                setIsAdminMode(false);
                setEmail("");
                setPasskey("");
              }
            }}
            className="text-[#755a21] hover:underline font-medium cursor-pointer"
          >
            {isAdminMode ? "← Switch to Patron Sign In" : "Atelier Director Passkey Sign In →"}
          </button>
          <span className="text-[10px] uppercase tracking-wider text-[#737873]">Protected RBAC</span>
        </div>
      </div>
    </div>
  );
}
