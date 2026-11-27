"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, X, ArrowRight } from "lucide-react";
import { OOTFY_PRODUCTS, formatPriceBDT } from "../lib/products";
import { PRODUCT_IMAGE_MAP } from "./product-card";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const results = query.trim()
    ? OOTFY_PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase()) ||
          p.fabric.toLowerCase().includes(query.toLowerCase()) ||
          p.craft_technique.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 8)
    : [];

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 md:p-12 flex flex-col items-center animate-fadeIn"
      role="dialog"
      aria-modal="true"
    >
      {/* Dark Glass Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-[#0c1712]/75 backdrop-blur-md transition-opacity"
      />

      {/* Search Container */}
      <div className="relative w-full max-w-2xl bg-[#fcf9f4] border border-[#c3c8c2]/60 shadow-2xl z-10 overflow-hidden">
        {/* Search Bar Input */}
        <div className="p-4 sm:p-6 border-b border-[#c3c8c2]/40 bg-[#f6f3ee] flex items-center gap-3">
          <Search className="w-5 h-5 text-[#755a21] shrink-0" />
          <input
            type="text"
            autoFocus
            placeholder="Search masterworks by weave, fabric, garment, or motif..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-sm sm:text-base text-[#1c1c19] placeholder:text-[#737873] focus:outline-none tracking-wide"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="text-xs uppercase text-[#737873] hover:text-[#1c1c19]"
            >
              Clear
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close search"
            className="w-8 h-8 rounded-full bg-white border border-[#c3c8c2]/50 flex items-center justify-center text-[#434844] hover:text-[#1c1c19] cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Suggestions or Results */}
        <div className="p-4 sm:p-6 max-h-[60vh] overflow-y-auto">
          {!query.trim() ? (
            <div>
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#737873] font-semibold block mb-3">
                Suggested Searches
              </span>
              <div className="flex flex-wrap gap-2">
                {["Jamdani Saree", "Silk Panjabi", "Trousers", "Linen Shirt", "Zardozi", "Lehenga"].map(
                  (tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => setQuery(tag)}
                      className="px-3 py-1.5 bg-[#f6f3ee] hover:bg-[#ebe8e3] border border-[#c3c8c2]/40 text-xs text-[#434844] hover:text-[#1c1c19] transition-colors"
                    >
                      {tag}
                    </button>
                  )
                )}
              </div>
            </div>
          ) : results.length === 0 ? (
            <div className="py-12 text-center text-[#737873]">
              <p className="font-serif text-lg text-[#1c1c19]">No atelier pieces found</p>
              <p className="text-xs mt-1">Try searching for "Panjabi", "Saree", or "Linen".</p>
            </div>
          ) : (
            <div className="space-y-3">
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#737873] font-semibold block mb-2">
                Found {results.length} Atelier Masterworks
              </span>
              {results.map((product) => {
                const img =
                  PRODUCT_IMAGE_MAP[product.id] ||
                  product.images?.hero_flatlay ||
                  "/assets/products/jamdani-saree-clean.jpg";

                return (
                  <Link
                    key={product.id}
                    href={`/products/${product.id}`}
                    onClick={onClose}
                    className="flex items-center gap-4 p-2.5 bg-white hover:bg-[#f6f3ee] border border-[#c3c8c2]/30 transition-colors group"
                  >
                    <div className="relative w-12 h-14 bg-[#f6f3ee] border border-[#c3c8c2]/40 overflow-hidden shrink-0">
                      <Image
                        src={img}
                        alt={product.name}
                        fill
                        unoptimized
                        className="object-cover object-center group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-serif text-sm text-[#1c1c19] group-hover:underline line-clamp-1">
                        {product.name}
                      </h4>
                      <p className="text-[11px] text-[#737873] uppercase tracking-wider mt-0.5">
                        {product.category} · {product.fabric}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-semibold text-[#1c1c19]">
                        {formatPriceBDT(product.price_bdt)}
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
