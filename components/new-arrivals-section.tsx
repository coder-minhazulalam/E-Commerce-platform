"use client";

import React from "react";
import { type OotfyProduct } from "../lib/products";
import { ProductCard } from "./product-card";

interface NewArrivalsSectionProps {
  products: OotfyProduct[];
  onQuickAdd?: (product: OotfyProduct) => void;
  onToggleWishlist?: (product: OotfyProduct) => void;
  wishlistIds?: Set<string>;
}

export function NewArrivalsSection({
  products,
  onQuickAdd,
  onToggleWishlist,
  wishlistIds = new Set(),
}: NewArrivalsSectionProps) {
  // Display initial 4 curated arrivals
  const curatedProducts = products.slice(0, 4);

  return (
    <section className="w-full bg-[#fcf9f4] py-16 lg:py-24" id="new-arrivals">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="flex items-end justify-between mb-8 lg:mb-12">
          <div>
            <span className="text-[11px] uppercase text-[#755a21] block mb-1 tracking-widest font-medium">
              Curated Releases
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1c1c19] tracking-tight">
              New Arrivals
            </h2>
          </div>
          <a
            href="#category-nav"
            className="group text-xs uppercase tracking-widest text-[#1c1c19] hover:text-[#755a21] transition-colors inline-flex items-center gap-1.5 font-medium"
          >
            <span>View All ({products.length})</span>
            <span className="material-symbols-outlined text-[16px] transition-transform duration-300 group-hover:translate-x-1">
              arrow_forward
            </span>
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {curatedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickAdd={onQuickAdd}
              onToggleWishlist={onToggleWishlist}
              isWishlisted={wishlistIds.has(product.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
