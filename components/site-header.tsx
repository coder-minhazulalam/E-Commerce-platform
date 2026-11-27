"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Heart, ShoppingBag, User, LogOut } from "lucide-react";
import { useCart } from "../lib/cart-context";
import { useAuth } from "../lib/auth-context";
import { SearchModal } from "./search-modal";

interface SiteHeaderProps {
  wishlistCount?: number;
  cartCount?: number;
  onOpenSearch?: () => void;
  onOpenBag?: () => void;
}

export function SiteHeader({
  wishlistCount = 0,
  cartCount: propCartCount,
  onOpenSearch,
  onOpenBag,
}: SiteHeaderProps) {
  const pathname = usePathname() || "/";
  const [scrolled, setScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { totalCount, openBag } = useCart();
  const { isAuthenticated, user, openAuthModal, logout } = useAuth();

  const effectiveCartCount = propCartCount !== undefined ? propCartCount : totalCount;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearchClick = () => {
    if (onOpenSearch) {
      onOpenSearch();
    }
    setIsSearchOpen(true);
  };

  const handleBagClick = () => {
    if (onOpenBag) {
      onOpenBag();
    } else {
      openBag();
    }
  };

  const handleAccountClick = () => {
    if (!isAuthenticated) {
      openAuthModal("Sign in to your Atelier patron profile");
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 w-full z-40 transition-all duration-300 ${
          scrolled
            ? "bg-[#fcf9f4]/85 backdrop-blur-2xl shadow-sm border-b border-[#c3c8c2]/40"
            : "bg-[#fcf9f4]/80 backdrop-blur-xl border-b border-white/20"
        }`}
        id="site-header"
      >
        <div className="w-full transition-all duration-300">
          {/* Top Announcement Bar */}
          <div
            className={`h-8 bg-[#f6f3ee]/80 backdrop-blur-md flex items-center justify-center px-4 sm:px-8 border-b border-[#c3c8c2]/30 transition-all duration-300 ${
              scrolled ? "h-0 opacity-0 overflow-hidden" : "h-8 opacity-100"
            }`}
            id="top-announcement-bar"
          >
            <p className="text-[11px] uppercase text-[#434844] tracking-[0.14em] font-medium text-center">
              Complimentary delivery across Bangladesh on orders over ৳5,000
            </p>
          </div>

          {/* Main Nav Bar with luxury Glassmorphism */}
          <div
            className={`h-16 transition-all duration-300 ${
              scrolled ? "bg-[#fcf9f4]/60 backdrop-blur-2xl" : "bg-transparent"
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

              {/* Navigation Links - Home & Shop Only */}
              <nav className="hidden md:flex items-center gap-8 lg:gap-10" aria-label="Primary navigation">
                <Link
                  href="/"
                  className={`uppercase transition-colors font-medium relative py-1 text-xs tracking-widest ${
                    pathname === "/"
                      ? "text-[#1c1c19] after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1.5px] after:bg-[#243329]"
                      : "text-[#434844] hover:text-[#1c1c19]"
                  }`}
                >
                  Home
                </Link>
                <Link
                  href="/shop"
                  className={`uppercase transition-colors font-medium relative py-1 text-xs tracking-widest ${
                    pathname.startsWith("/shop")
                      ? "text-[#1c1c19] after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1.5px] after:bg-[#243329]"
                      : "text-[#434844] hover:text-[#1c1c19]"
                  }`}
                >
                  Shop
                </Link>
              </nav>

              {/* Action Icons */}
              <div className="flex items-center gap-4 lg:gap-6">
                {/* Search Button */}
                <button
                  aria-label="Search"
                  onClick={handleSearchClick}
                  className="text-[#434844] hover:text-[#1c1c19] transition-transform duration-200 hover:scale-110 flex items-center cursor-pointer p-1.5 rounded-full hover:bg-black/5"
                  type="button"
                >
                  <Search className="w-5 h-5" />
                </button>

                {/* Wishlist Button */}
                <button
                  aria-label="Wishlist"
                  className="text-[#434844] hover:text-[#1c1c19] transition-transform duration-200 hover:scale-110 flex items-center relative cursor-pointer p-1.5 rounded-full hover:bg-black/5"
                  type="button"
                >
                  <Heart className="w-5 h-5" />
                  {wishlistCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#755a21] text-[9px] font-bold text-white rounded-full flex items-center justify-center shadow-sm">
                      {wishlistCount}
                    </span>
                  )}
                </button>

                {/* Bag Button */}
                <button
                  aria-label="Bag"
                  onClick={handleBagClick}
                  className="text-[#434844] hover:text-[#1c1c19] transition-transform duration-200 hover:scale-110 flex items-center relative cursor-pointer p-1.5 rounded-full hover:bg-black/5"
                  type="button"
                >
                  <ShoppingBag className="w-5 h-5" />
                  {effectiveCartCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#243329] text-[9px] font-bold text-white rounded-full flex items-center justify-center shadow-sm animate-pulse">
                      {effectiveCartCount}
                    </span>
                  )}
                </button>

                {/* Account / Patron Profile */}
                {isAuthenticated && user ? (
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => openAuthModal("Update your Atelier patron account details")}
                      className="flex items-center gap-1.5 px-2.5 py-1 bg-[#243329] text-[#fed892] rounded-full text-xs font-medium cursor-pointer shadow-sm hover:opacity-90 transition-opacity"
                      title={user.email}
                    >
                      <User className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline max-w-[90px] truncate">{user.fullName.split(" ")[0]}</span>
                    </button>
                    <button
                      type="button"
                      onClick={logout}
                      aria-label="Log Out"
                      title="Log Out"
                      className="p-1.5 text-[#737873] hover:text-red-700 transition-colors cursor-pointer"
                    >
                      <LogOut className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <button
                    aria-label="Sign In"
                    onClick={handleAccountClick}
                    className="flex items-center hover:opacity-85 transition-opacity cursor-pointer p-1 rounded-full hover:bg-black/5"
                    type="button"
                    title="Sign In"
                  >
                    <div className="w-8 h-8 rounded-full bg-[#ebe8e3] text-[#243329] border border-[#c3c8c2] flex items-center justify-center text-xs font-semibold shadow-sm">
                      <User className="w-4 h-4 text-[#243329]" />
                    </div>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Embedded Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
