"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { type OotfyProduct } from "../lib/products";
import { ProductCard } from "./product-card";

interface BestSellersSectionProps {
  products: OotfyProduct[];
  onQuickAdd?: (product: OotfyProduct) => void;
  onToggleWishlist?: (product: OotfyProduct) => void;
  wishlistIds?: Set<string>;
}

export function BestSellersSection({
  products,
  onQuickAdd,
  onToggleWishlist,
  wishlistIds = new Set(),
}: BestSellersSectionProps) {
  // Best sellers: OOT-SHT-007, OOT-PNT-008, OOT-SAR-009, OOT-SUT-010 (or items 6 to 10)
  const bestSellerIds = ["OOT-SHT-007", "OOT-PNT-008", "OOT-SAR-009", "OOT-SUT-010"];
  const bestSellerProducts = products.filter((p) => bestSellerIds.includes(p.id)).length === 4
    ? products.filter((p) => bestSellerIds.includes(p.id))
    : products.slice(6, 10);

  return (
    <section className="w-full bg-[#fcf9f4] py-16 lg:py-24">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="flex items-end justify-between mb-8 lg:mb-12">
          <div>
            <span className="text-[11px] uppercase text-[#755a21] block mb-1 tracking-widest font-medium">
              Atelier Signatures
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1c1c19] tracking-tight">
              Best Sellers
            </h2>
          </div>
          <Link
            href="/shop"
            className="group text-xs uppercase tracking-widest text-[#1c1c19] hover:text-[#755a21] transition-colors inline-flex items-center gap-2 font-medium"
          >
            <span>Shop All</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {bestSellerProducts.map((product) => (
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
