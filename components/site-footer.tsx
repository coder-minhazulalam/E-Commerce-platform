"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, ShieldCheck, PhoneCall, Sparkles } from "lucide-react";
import { useAuth } from "../lib/auth-context";

interface SiteFooterProps {
  onNotify?: (msg: string) => void;
}

export function SiteFooter({ onNotify }: SiteFooterProps) {
  const { isAuthenticated, openAuthModal, user } = useAuth();

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    onNotify?.("Subscribed to private dispatches");
    (e.target as HTMLFormElement).reset();
  };

  const handleClientCare = (action: string) => {
    if (!isAuthenticated) {
      openAuthModal(`Sign in to contact Dhaka Atelier Concierge & Client Care for ${action}`);
      return;
    }
    onNotify?.(`Dhaka Concierge request received for: ${action}. Welcome, ${user?.fullName}!`);
  };

  return (
    <footer className="w-full bg-[#f6f3ee] border-t border-[#c3c8c2]/50 py-16 lg:py-20">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 pb-12 lg:pb-16 border-b border-[#c3c8c2]/40">
          {/* Shop */}
          <div>
            <h4 className="text-xs uppercase text-[#1c1c19] mb-4 tracking-widest font-semibold">
              Shop
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link href="/shop" className="text-xs text-[#434844] hover:text-[#1c1c19] transition-colors">
                  Men's Collection
                </Link>
              </li>
              <li>
                <Link href="/shop" className="text-xs text-[#434844] hover:text-[#1c1c19] transition-colors">
                  Women's Masterpieces
                </Link>
              </li>
              <li>
                <Link href="/shop" className="text-xs text-[#434844] hover:text-[#1c1c19] transition-colors">
                  Kids Festive Edits
                </Link>
              </li>
              <li>
                <Link href="/shop" className="text-xs text-[#434844] hover:text-[#1c1c19] transition-colors">
                  All 50 Masterworks
                </Link>
              </li>
            </ul>
          </div>

          {/* Client Care - Protected by Login Gate */}
          <div>
            <div className="flex items-center gap-1.5 mb-4">
              <h4 className="text-xs uppercase text-[#1c1c19] tracking-widest font-semibold">
                Client Care
              </h4>
              {!isAuthenticated && (
                <span className="text-[9px] uppercase px-1.5 py-0.5 bg-[#ebe8e3] text-[#755a21] font-semibold border border-[#c3c8c2]/40">
                  Patron Only
                </span>
              )}
            </div>
            <ul className="space-y-2.5">
              <li>
                <button
                  type="button"
                  onClick={() => handleClientCare("Complimentary Shipping Inquiry")}
                  className="text-xs text-[#434844] hover:text-[#1c1c19] transition-colors text-left cursor-pointer"
                >
                  Complimentary Shipping
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleClientCare("Bespoke Return Services")}
                  className="text-xs text-[#434844] hover:text-[#1c1c19] transition-colors text-left cursor-pointer"
                >
                  Bespoke Returns
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleClientCare("Tailor Measurement & Size Consultation")}
                  className="text-xs text-[#434844] hover:text-[#1c1c19] transition-colors text-left cursor-pointer"
                >
                  Atelier Size Guide
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleClientCare("Direct Dhaka Atelier Concierge Call")}
                  className="text-xs text-[#755a21] hover:text-[#1c1c19] font-medium transition-colors text-left cursor-pointer flex items-center gap-1"
                >
                  <PhoneCall className="w-3 h-3" />
                  <span>Dhaka Concierge Desk</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Heritage */}
          <div>
            <h4 className="text-xs uppercase text-[#1c1c19] mb-4 tracking-widest font-semibold">
              Textiles
            </h4>
            <ul className="space-y-2.5">
              <li>
                <span className="text-xs text-[#434844] hover:text-[#1c1c19] transition-colors cursor-pointer">
                  Dhakai Jamdani Weave
                </span>
              </li>
              <li>
                <span className="text-xs text-[#434844] hover:text-[#1c1c19] transition-colors cursor-pointer">
                  Rajshahi Raw Silk
                </span>
              </li>
              <li>
                <span className="text-xs text-[#434844] hover:text-[#1c1c19] transition-colors cursor-pointer">
                  Tangail Handloom
                </span>
              </li>
              <li>
                <span className="text-xs text-[#434844] hover:text-[#1c1c19] transition-colors cursor-pointer">
                  Comilla Hand-Spun Khadi
                </span>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-xs uppercase text-[#1c1c19] mb-4 tracking-widest font-semibold">
              Connect
            </h4>
            <ul className="space-y-2.5">
              <li>
                <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-xs text-[#434844] hover:text-[#1c1c19] transition-colors">
                  Instagram
                </a>
              </li>
              <li>
                <a href="https://facebook.com" target="_blank" rel="noreferrer" className="text-xs text-[#434844] hover:text-[#1c1c19] transition-colors">
                  Facebook
                </a>
              </li>
              <li>
                <a href="https://youtube.com" target="_blank" rel="noreferrer" className="text-xs text-[#434844] hover:text-[#1c1c19] transition-colors">
                  YouTube
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter Box */}
          <div>
            <h4 className="text-xs uppercase text-[#1c1c19] mb-4 tracking-widest font-semibold">
              Newsletter
            </h4>
            <p className="text-xs text-[#434844] mb-4 leading-relaxed">
              Receive curated dispatches on new collections and atelier stories.
            </p>
            <form onSubmit={handleNewsletter} className="flex items-center border-b border-[#c3c8c2] pb-2 focus-within:border-[#243329] transition-colors">
              <input
                className="w-full bg-transparent text-xs text-[#1c1c19] placeholder:text-[#737873] focus:outline-none"
                placeholder="Email address"
                type="email"
                required
              />
              <button
                className="text-xs uppercase text-[#1c1c19] hover:text-[#755a21] transition-colors ml-2 font-medium cursor-pointer inline-flex items-center gap-1"
                type="submit"
              >
                <span>Join</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="font-serif text-xl tracking-[0.25em] uppercase text-[#1c1c19] font-medium">
            OOTFY
          </span>
          <p className="text-xs text-[#737873]">
            © 2026 OOTFY. Crafted in Bangladesh. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
