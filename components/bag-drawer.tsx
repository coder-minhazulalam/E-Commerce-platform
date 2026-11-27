"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Trash2, Plus, Minus, ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import { useCart } from "../lib/cart-context";
import { formatPriceBDT } from "../lib/products";
import { PRODUCT_IMAGE_MAP } from "./product-card";

export function BagDrawer() {
  const {
    items,
    isBagOpen,
    closeBag,
    updateQuantity,
    removeItem,
    totalCount,
    subtotal,
    shippingFee,
  } = useCart();

  // Prevent background scroll when drawer is open
  useEffect(() => {
    if (isBagOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isBagOpen]);

  if (!isBagOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fadeIn" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
      {/* Dimmed backdrop */}
      <div
        onClick={closeBag}
        className="fixed inset-0 bg-[#0c1712]/60 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#fcf9f4] shadow-2xl border-l border-[#c3c8c2]/50 flex flex-col justify-between">
          {/* Header */}
          <div className="p-6 border-b border-[#c3c8c2]/40 bg-[#f6f3ee] flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#755a21] font-semibold">
                  OOTFY ATELIER
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
              </div>
              <h2 id="slide-over-title" className="font-serif text-xl sm:text-2xl text-[#1c1c19] tracking-tight mt-0.5">
                Your Bag ({totalCount})
              </h2>
            </div>
            <button
              type="button"
              onClick={closeBag}
              aria-label="Close Bag"
              className="w-9 h-9 rounded-full bg-white border border-[#c3c8c2]/60 text-[#434844] hover:text-[#1c1c19] flex items-center justify-center transition-colors cursor-pointer shadow-sm"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Bag Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {items.length === 0 ? (
              <div className="py-20 text-center flex flex-col items-center">
                <div className="w-14 h-14 rounded-full bg-[#f6f3ee] border border-[#c3c8c2]/60 flex items-center justify-center mb-4">
                  <Sparkles className="w-6 h-6 text-[#755a21]" />
                </div>
                <p className="font-serif text-xl text-[#1c1c19]">Your bag is empty</p>
                <p className="text-xs text-[#737873] mt-2 max-w-xs leading-relaxed">
                  Explore our 50 masterworks crafted by Bangladeshi weavers and artisans.
                </p>
                <Link
                  href="/shop"
                  onClick={closeBag}
                  className="mt-6 px-6 py-2.5 bg-[#243329] text-white text-xs uppercase tracking-widest font-medium hover:bg-[#1a261e] cursor-pointer"
                >
                  Explore Atelier
                </Link>
              </div>
            ) : (
              items.map((item) => {
                const itemImg =
                  PRODUCT_IMAGE_MAP[item.product.id] ||
                  item.product.images?.hero_flatlay ||
                  "/assets/products/jamdani-saree-clean.jpg";

                return (
                  <div
                    key={`${item.id}-${item.size}`}
                    className="flex gap-4 pb-6 border-b border-[#c3c8c2]/30 group"
                  >
                    {/* Thumbnail */}
                    <div className="relative w-20 h-24 sm:w-24 sm:h-28 bg-[#f6f3ee] border border-[#c3c8c2]/40 overflow-hidden shrink-0">
                      <Image
                        src={itemImg}
                        alt={item.product.name}
                        fill
                        unoptimized
                        className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <Link
                            href={`/products/${item.product.id}`}
                            onClick={closeBag}
                            className="font-serif text-base text-[#1c1c19] hover:underline leading-snug line-clamp-1"
                          >
                            {item.product.name}
                          </Link>
                          <button
                            type="button"
                            onClick={() => removeItem(item.id, item.size)}
                            aria-label={`Remove ${item.product.name}`}
                            className="text-[#737873] hover:text-red-700 transition-colors p-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <p className="text-[11px] text-[#737873] uppercase tracking-wider mt-1">
                          Size: <span className="font-semibold text-[#1c1c19]">{item.size}</span> · {item.color}
                        </p>
                        <p className="text-xs font-semibold text-[#1c1c19] mt-1.5">
                          {formatPriceBDT(item.product.price_bdt)}
                        </p>
                      </div>

                      {/* Quantity Controller */}
                      <div className="flex items-center gap-3 mt-3">
                        <div className="inline-flex items-center border border-[#c3c8c2]/60 bg-white">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                            className="p-1 sm:p-1.5 text-[#434844] hover:text-[#1c1c19] hover:bg-[#f6f3ee]"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-3 text-xs font-semibold text-[#1c1c19]">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                            className="p-1 sm:p-1.5 text-[#434844] hover:text-[#1c1c19] hover:bg-[#f6f3ee]"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <span className="text-[11px] text-[#737873]">
                          Total: <span className="font-semibold text-[#1c1c19]">{formatPriceBDT(item.product.price_bdt * item.quantity)}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer Summary & Checkout Button */}
          {items.length > 0 && (
            <div className="p-6 bg-[#f6f3ee] border-t border-[#c3c8c2]/40 space-y-4">
              <div className="space-y-1.5 text-xs text-[#434844]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-medium text-[#1c1c19]">{formatPriceBDT(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery (Across Bangladesh)</span>
                  <span className="font-medium text-[#1c1c19]">
                    {shippingFee === 0 ? (
                      <span className="text-emerald-700 font-semibold uppercase tracking-wider text-[11px]">
                        Complimentary
                      </span>
                    ) : (
                      formatPriceBDT(shippingFee)
                    )}
                  </span>
                </div>
                <div className="flex justify-between pt-2 border-t border-[#c3c8c2]/30 text-sm font-semibold text-[#1c1c19]">
                  <span className="font-serif text-base">Estimated Total</span>
                  <span className="font-serif text-base">{formatPriceBDT(subtotal + shippingFee)}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider text-[#755a21] bg-[#fcf9f4] p-2 border border-[#c3c8c2]/30">
                <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                <span>100% Handloom Authenticity Guaranteed</span>
              </div>

              <Link
                href="/checkout"
                onClick={closeBag}
                className="w-full py-3.5 bg-[#243329] hover:bg-[#1a261e] text-white text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm group"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
