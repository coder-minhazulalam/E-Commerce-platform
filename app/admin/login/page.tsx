"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { KeyRound, Mail, ArrowRight, ShieldCheck, Eye, EyeOff, Lock, Sparkles, AlertCircle } from "lucide-react";
import { useAuth, ADMIN_CONFIG } from "../../../lib/auth-context";

export default function AdminLoginPage() {
  const router = useRouter();
  const { isAdmin, adminLogin } = useAuth();
  const [email, setEmail] = useState(ADMIN_CONFIG.EMAIL);
  const [passkey, setPasskey] = useState("");
  const [showPasskey, setShowPasskey] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAdmin) {
      router.push("/admin");
    }
  }, [isAdmin, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !passkey.trim()) {
      setError("Both administrative email and secret passkey are required.");
      return;
    }

    setLoading(true);
    await new Promise((r) => setTimeout(r, 450));
    const res = await adminLogin(email, passkey);
    setLoading(false);

    if (!res.success) {
      setError(res.error || "Administrative authentication rejected.");
      return;
    }

    router.push("/admin");
  };

  return (
    <div className="min-h-screen bg-[#111914] text-[#fcf9f4] flex flex-col justify-between font-sans selection:bg-[#fed892] selection:text-[#111914] relative overflow-hidden">
      {/* Background Architectural Grid Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#243329_1px,transparent_1px)] [background-size:24px_24px] opacity-25 pointer-events-none" />

      {/* Header */}
      <header className="relative z-10 p-6 sm:p-10 flex items-center justify-between border-b border-white/10">
        <Link href="/" className="font-serif text-2xl tracking-[0.25em] uppercase text-[#fcf9f4] hover:opacity-80 transition-opacity">
          OOTFY
        </Link>
        <div className="flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-[#fed892]">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="uppercase tracking-widest text-[10px] font-semibold">Atelier Secure Gateway</span>
        </div>
      </header>

      {/* Main Login Card */}
      <main className="relative z-10 flex-1 flex items-center justify-center p-6 sm:p-8">
        <div className="w-full max-w-md bg-[#16211a]/90 backdrop-blur-2xl border border-white/15 p-8 sm:p-10 shadow-2xl relative">
          {/* Top Gold Corner Accent */}
          <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
            <div className="bg-[#755a21] w-24 h-24 -rotate-45 transform origin-bottom-right" />
          </div>

          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-full bg-[#243329] border border-[#755a21]/50 flex items-center justify-center mx-auto mb-4 shadow-inner">
              <KeyRound className="w-6 h-6 text-[#fed892]" />
            </div>
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#fed892] font-semibold block mb-1">
              ROLE: ATELIER DIRECTOR
            </span>
            <h1 className="font-serif text-3xl text-white tracking-tight">
              Console Sign-In
            </h1>
            <p className="text-xs text-[#a2aca3] mt-2 leading-relaxed">
              Confidential access to Dhaka handloom inventory, live order dispatch pipelines, and textile catalog management.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5 text-xs">
            <div>
              <label className="block uppercase tracking-wider text-[#a2aca3] font-medium mb-1.5">
                Director Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#737873] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-3 py-3 bg-[#0d1510] border border-white/20 text-white placeholder:text-[#525a53] text-xs focus:outline-none focus:border-[#fed892] tracking-wide"
                  placeholder="admin@ootfy.com"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block uppercase tracking-wider text-[#fed892] font-semibold">
                  Secret Atelier Passkey
                </label>
                <span className="text-[10px] text-[#737873] uppercase tracking-wider">Encrypted</span>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#755a21] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPasskey ? "text" : "password"}
                  required
                  value={passkey}
                  onChange={(e) => setPasskey(e.target.value)}
                  className="w-full pl-10 pr-10 py-3 bg-[#0d1510] border border-[#755a21]/60 text-[#fed892] placeholder:text-[#525a53] text-xs focus:outline-none focus:border-[#fed892] font-mono tracking-wider"
                  placeholder="Enter secret passkey"
                />
                <button
                  type="button"
                  onClick={() => setShowPasskey(!showPasskey)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#737873] hover:text-[#fed892] cursor-pointer"
                  aria-label={showPasskey ? "Hide passkey" : "Show passkey"}
                >
                  {showPasskey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="p-3 bg-red-950/60 border border-red-800 text-red-200 text-[11px] flex items-center gap-2 animate-fadeIn">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-[#fed892] hover:bg-[#eac073] text-[#111914] text-xs uppercase tracking-widest font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg disabled:opacity-50"
            >
              {loading ? (
                <span>Verifying Atelier Access...</span>
              ) : (
                <>
                  <span>Enter Director Console</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick Credential Hint for Authorized Admin */}
          <div className="mt-8 p-3 bg-white/5 border border-white/10 text-[11px] text-[#a2aca3] space-y-1">
            <div className="flex items-center gap-1.5 text-[#fed892] font-semibold text-[10px] uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Authorized Admin Credentials</span>
            </div>
            <p className="font-mono text-[11px] text-white">
              Email: <span className="text-[#fed892]">admin@ootfy.com</span>
            </p>
            <p className="font-mono text-[11px] text-white">
              Secret Passkey: <span className="text-[#fed892]">OotfyAtelier2026!Admin</span>
            </p>
          </div>

          <div className="mt-6 text-center">
            <Link href="/" className="text-xs text-[#a2aca3] hover:text-[#fed892] transition-colors underline underline-offset-4">
              Return to Public Storefront
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 p-6 text-center text-xs text-[#525a53] border-t border-white/10">
        © 2026 OOTFY Atelier Management System. Strictly for authorized personnel.
      </footer>
    </div>
  );
}
