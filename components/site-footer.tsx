"use client";

import React from "react";
import Link from "next/link";

interface SiteFooterProps {
  onNotify?: (msg: string) => void;
}

export function SiteFooter({ onNotify }: SiteFooterProps) {
  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    onNotify?.("Subscribed to private dispatches");
    (e.target as HTMLFormElement).reset();
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
                <Link href="#category-nav" className="text-xs text-[#434844] hover:text-[#1c1c19] transition-colors">
                  Men
                </Link>
              </li>
              <li>
                <Link href="#category-nav" className="text-xs text-[#434844] hover:text-[#1c1c19] transition-colors">
                  Women
                </Link>
              </li>
              <li>
                <Link href="#category-nav" className="text-xs text-[#434844] hover:text-[#1c1c19] transition-colors">
                  Kids
                </Link>
              </li>
              <li>
                <Link href="#new-arrivals" className="text-xs text-[#434844] hover:text-[#1c1c19] transition-colors">
                  All Products
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer */}
          <div>
            <h4 className="text-xs uppercase text-[#1c1c19] mb-4 tracking-widest font-semibold">
              Client Care
            </h4>
            <ul className="space-y-2.5">
              <li>
                <span className="text-xs text-[#434844] hover:text-[#1c1c19] transition-colors cursor-pointer">
                  Complimentary Shipping
                </span>
              </li>
              <li>
                <span className="text-xs text-[#434844] hover:text-[#1c1c19] transition-colors cursor-pointer">
                  Bespoke Returns
                </span>
              </li>
              <li>
                <span className="text-xs text-[#434844] hover:text-[#1c1c19] transition-colors cursor-pointer">
                  Atelier Size Guide
                </span>
              </li>
              <li>
                <span className="text-xs text-[#434844] hover:text-[#1c1c19] transition-colors cursor-pointer">
                  Dhaka Concierge
                </span>
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
                className="text-xs uppercase text-[#1c1c19] hover:text-[#755a21] transition-colors ml-2 font-medium cursor-pointer"
                type="submit"
              >
                Join
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
