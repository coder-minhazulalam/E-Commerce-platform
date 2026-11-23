"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

interface SiteHeaderProps {
  wishlistCount?: number;
  cartCount?: number;
  onOpenSearch?: () => void;
}

export function SiteHeader({ wishlistCount = 0, cartCount = 0, onOpenSearch }: SiteHeaderProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 w-full z-50 bg-[#fcf9f4]/95 transition-all duration-300" id="site-header">
      <div className="w-full transition-all duration-300">
        {/* Top Announcement Bar */}
        <div
          className={`h-8 bg-[#f6f3ee] flex items-center justify-center px-4 sm:px-8 border-b border-[#c3c8c2]/30 transition-all duration-300 ${
            scrolled ? "h-0 opacity-0 overflow-hidden" : "h-8 opacity-100"
          }`}
          id="top-announcement-bar"
        >
          <p className="text-[11px] uppercase text-[#434844] tracking-[0.14em] font-medium text-center">
            Complimentary delivery across Bangladesh on orders over ৳5,000
          </p>
        </div>

        {/* Main Nav Bar */}
        <div
          className={`h-16 bg-[#fcf9f4]/90 backdrop-blur-xl border-b transition-all duration-300 ${
            scrolled ? "border-[#c3c8c2] shadow-sm bg-[#fcf9f4]/98" : "border-[#c3c8c2]/40"
          }`}
          id="main-nav-bar"
        >
          <div className="max-w-[1440px] mx-auto h-full px-6 lg:px-12 flex items-center justify-between">
            {/* Logo */}
            <Link className="flex items-center gap-2 text-[#1c1c19] group" href="/">
              <span className="font-serif text-2xl lg:text-3xl tracking-[0.25em] uppercase text-[#1c1c19] group-hover:opacity-80 transition-opacity font-medium">
                OOTFY
              </span>
            </Link>

            {/* Navigation Links */}
            <nav className="hidden md:flex items-center gap-8 lg:gap-10" aria-label="Primary navigation">
              <Link
                href="/"
                className="uppercase transition-colors text-[#1c1c19] font-medium relative py-1 text-xs tracking-widest after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1.5px] after:bg-[#243329]"
              >
                Home
              </Link>
              <Link
                href="#new-arrivals"
                className="text-xs uppercase text-[#434844] hover:text-[#1c1c19] transition-colors py-1 tracking-widest font-medium"
              >
                Shop
              </Link>
              <Link
                href="#category-nav"
                className="text-xs uppercase text-[#434844] hover:text-[#1c1c19] transition-colors py-1 tracking-widest font-medium"
              >
                Men
              </Link>
              <Link
                href="#category-nav"
                className="text-xs uppercase text-[#434844] hover:text-[#1c1c19] transition-colors py-1 tracking-widest font-medium"
              >
                Women
              </Link>
              <Link
                href="#category-nav"
                className="text-xs uppercase text-[#434844] hover:text-[#1c1c19] transition-colors py-1 tracking-widest font-medium"
              >
                Kids
              </Link>
            </nav>

            {/* Action Icons */}
            <div className="flex items-center gap-4 lg:gap-6">
              <button
                aria-label="Search"
                onClick={onOpenSearch}
                className="text-[#434844] hover:text-[#1c1c19] transition-transform duration-200 hover:scale-110 flex items-center cursor-pointer"
                type="button"
              >
                <span className="material-symbols-outlined text-[20px]">search</span>
              </button>

              <button
                aria-label="Wishlist"
                className="text-[#434844] hover:text-[#1c1c19] transition-transform duration-200 hover:scale-110 flex items-center relative cursor-pointer"
                type="button"
              >
                <span className="material-symbols-outlined text-[20px]">favorite</span>
                {wishlistCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-[#755a21] text-[9px] font-bold text-white rounded-full flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </button>

              <button
                aria-label="Bag"
                className="text-[#434844] hover:text-[#1c1c19] transition-transform duration-200 hover:scale-110 flex items-center relative cursor-pointer"
                type="button"
              >
                <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-[#243329] text-[9px] font-bold text-white rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>

              <button
                aria-label="Account"
                className="flex items-center hover:opacity-85 transition-opacity cursor-pointer"
                type="button"
              >
                <div className="w-8 h-8 rounded-full bg-[#ebe8e3] text-[#243329] border border-[#c3c8c2] flex items-center justify-center text-xs font-semibold">
                  M
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
