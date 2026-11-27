"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Search, ArrowUpDown, Filter } from "lucide-react";
import { OOTFY_PRODUCTS, type OotfyProduct } from "../../lib/products";
import { SiteHeader } from "../../components/site-header";
import { CategoryNav } from "../../components/category-nav";
import { ProductCard } from "../../components/product-card";
import { SiteFooter } from "../../components/site-footer";
import { ToastNotification } from "../../components/toast-notification";
import { useCart } from "../../lib/cart-context";

const COLLECTIONS = [
  "All Collections",
  "The Eid Edit",
  "The New Bangladeshi Edit",
  "Atelier Signatures",
  "The Little Edit",
] as const;

export default function ShopPage() {
  const { addItem, totalCount } = useCart();
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeGender, setActiveGender] = useState<"All" | "Men" | "Women" | "Kids">("All");
  const [activeCollection, setActiveCollection] = useState<string>("All Collections");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc" | "name-asc">("featured");
  const [wishlistIds, setWishlistIds] = useState<Set<string>>(new Set());
  const [cartCount, setCartCount] = useState(1);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const filteredProducts = useMemo(() => {
    let list = [...OOTFY_PRODUCTS];

    // Category Filter
    if (activeCategory !== "all") {
      const target = activeCategory.toLowerCase().replace(/[\s-_]+/g, "");
      list = list.filter((p) => {
        const pCat = p.category.toLowerCase().replace(/[\s-_]+/g, "");
        if (target === "suits") {
          return pCat === "suit" || pCat === "blazer" || pCat === "suits";
        }
        if (target === "kids") {
          return pCat === "kids" || p.gender.toLowerCase() === "kids";
        }
        if (target === "threepiece") {
          return pCat === "threepiece" || pCat === "salwarkameez" || pCat === "kurti";
        }
        return pCat === target;
      });
    }

    // Collection Filter
    if (activeCollection !== "All Collections") {
      list = list.filter((p) => p.collection.toLowerCase() === activeCollection.toLowerCase());
    }

    // Gender Filter
    if (activeGender !== "All") {
      list = list.filter((p) => p.gender.toLowerCase() === activeGender.toLowerCase());
    }

    // Search Query Filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.fabric.toLowerCase().includes(q) ||
          p.craft_technique.toLowerCase().includes(q)
      );
    }

    // Sorting
    if (sortBy === "price-asc") {
      list.sort((a, b) => a.price_bdt - b.price_bdt);
    } else if (sortBy === "price-desc") {
      list.sort((a, b) => b.price_bdt - a.price_bdt);
    } else if (sortBy === "name-asc") {
      list.sort((a, b) => a.name.localeCompare(b.name));
    }

    return list;
  }, [activeCategory, activeCollection, activeGender, searchQuery, sortBy]);

  const handleQuickAdd = (product: OotfyProduct) => {
    addItem(product);
    setToastMessage(`Added ${product.name} to your bag`);
  };

  const handleToggleWishlist = (product: OotfyProduct) => {
    setWishlistIds((prev) => {
      const next = new Set(prev);
      if (next.has(product.id)) {
        next.delete(product.id);
        setToastMessage(`Removed ${product.name} from atelier wishlist`);
      } else {
        next.add(product.id);
        setToastMessage(`Saved ${product.name} to atelier wishlist`);
      }
      return next;
    });
  };

  const resetAllFilters = () => {
    setActiveCategory("all");
    setActiveGender("All");
    setActiveCollection("All Collections");
    setSearchQuery("");
  };

  const hasActiveFilters =
    activeCategory !== "all" ||
    activeGender !== "All" ||
    activeCollection !== "All Collections" ||
    Boolean(searchQuery.trim());

  return (
    <div className="w-full min-h-screen bg-[#fcf9f4] text-[#1c1c19] flex flex-col font-sans selection:bg-[#fed892] selection:text-[#785d24]">
      {/* 1. Header with Shop active */}
      <SiteHeader
        wishlistCount={wishlistIds.size}
        cartCount={cartCount}
        onOpenSearch={() => {}}
      />

      <main className="w-full flex-1 pt-24 sm:pt-28">
        {/* Editorial Collection Header */}
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-8 lg:py-12 border-b border-[#c3c8c2]/30">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <nav className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#737873] mb-3">
                <Link href="/" className="hover:text-[#1c1c19] transition-colors">
                  Home
                </Link>
                <span>/</span>
                <span className="text-[#1c1c19] font-medium">Shop</span>
              </nav>
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1c1c19] tracking-tight">
                The Atelier Catalog
              </h1>
              <p className="text-xs sm:text-sm text-[#434844] mt-2 max-w-xl font-light">
                50 handcrafted Bangladeshi masterworks · Pure artisanal silhouettes · Zero models · 100% garment-first craft.
              </p>
            </div>

            {/* Quick Search & Sort Bar */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative">
                <Search className="w-4 h-4 text-[#737873] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search fabric, craft, style..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 pr-3 py-2 text-xs bg-[#f6f3ee] border border-[#c3c8c2]/60 focus:border-[#243329] focus:outline-none w-56 sm:w-64 tracking-wide text-[#1c1c19] placeholder:text-[#737873]"
                />
              </div>

              <div className="flex items-center gap-1.5 bg-[#f6f3ee] border border-[#c3c8c2]/60 px-3 py-2 text-xs">
                <ArrowUpDown className="w-3.5 h-3.5 text-[#737873]" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-transparent text-xs text-[#1c1c19] focus:outline-none cursor-pointer tracking-wider"
                >
                  <option value="featured">Featured</option>
                  <option value="name-asc">Alphabetical (A-Z)</option>
                  <option value="price-asc">Price (Low to High)</option>
                  <option value="price-desc">Price (High to Low)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Filtering Control Rows: Collections & Gender */}
          <div className="mt-6 pt-4 border-t border-[#c3c8c2]/20 flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Gender Filter */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] uppercase tracking-widest text-[#737873] mr-1">
                Gender:
              </span>
              {(["All", "Men", "Women", "Kids"] as const).map((gender) => (
                <button
                  key={gender}
                  type="button"
                  onClick={() => setActiveGender(gender)}
                  className={`text-xs uppercase tracking-widest px-3 py-1.5 transition-all cursor-pointer font-medium ${
                    activeGender === gender
                      ? "bg-[#243329] text-white"
                      : "bg-[#f6f3ee] text-[#434844] hover:bg-[#ebe8e3] hover:text-[#1c1c19]"
                  }`}
                >
                  {gender}
                </button>
              ))}
            </div>

            {/* Collection Filter */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] uppercase tracking-widest text-[#737873] mr-1">
                Collection:
              </span>
              {COLLECTIONS.map((col) => (
                <button
                  key={col}
                  type="button"
                  onClick={() => setActiveCollection(col)}
                  className={`text-xs uppercase tracking-widest px-3 py-1.5 transition-all cursor-pointer font-medium ${
                    activeCollection === col
                      ? "bg-[#755a21] text-white"
                      : "bg-[#f6f3ee] text-[#434844] hover:bg-[#ebe8e3] hover:text-[#1c1c19]"
                  }`}
                >
                  {col}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 2. Category Navigation Bar */}
        <CategoryNav
          activeCategory={activeCategory}
          onSelectCategory={(catId) => setActiveCategory(catId)}
        />

        {/* 3. Catalog Products Grid */}
        <section className="max-w-[1440px] mx-auto px-6 lg:px-12 py-10 lg:py-14">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#c3c8c2]/30 text-xs text-[#434844]">
            <p className="uppercase tracking-widest">
              Showing <span className="font-semibold text-[#1c1c19]">{filteredProducts.length}</span> of {OOTFY_PRODUCTS.length} Atelier Creations
            </p>
            {hasActiveFilters && (
              <button
                type="button"
                onClick={resetAllFilters}
                className="uppercase tracking-widest text-[#755a21] hover:underline font-medium cursor-pointer"
              >
                Reset All Filters
              </button>
            )}
          </div>

          {filteredProducts.length === 0 ? (
            <div className="py-20 text-center">
              <p className="font-serif text-2xl text-[#1c1c19]">No garments match your filters</p>
              <p className="text-xs text-[#737873] mt-2">Try clearing your search or selecting another category.</p>
              <button
                type="button"
                onClick={resetAllFilters}
                className="mt-6 px-6 py-2.5 bg-[#243329] text-white text-xs uppercase tracking-widest font-medium hover:bg-[#1a261e] cursor-pointer"
              >
                View Full Collection
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onQuickAdd={handleQuickAdd}
                  onToggleWishlist={handleToggleWishlist}
                  isWishlisted={wishlistIds.has(product.id)}
                  showPrice={false}
                />
              ))}
            </div>
          )}
        </section>
      </main>

      <SiteFooter onNotify={(msg) => setToastMessage(msg)} />

      {toastMessage && (
        <ToastNotification
          message={toastMessage}
          onClose={() => setToastMessage(null)}
        />
      )}
    </div>
  );
}
