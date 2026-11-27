"use client";

import React, { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import {
  CheckCircle2,
  Package,
  Calendar,
  Truck,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";
import { useCart } from "../../../lib/cart-context";
import { formatPriceBDT } from "../../../lib/products";
import { SiteHeader } from "../../../components/site-header";
import { SiteFooter } from "../../../components/site-footer";
import { PRODUCT_IMAGE_MAP } from "../../../components/product-card";

function OrderConfirmationContent() {
  const searchParams = useSearchParams();
  const queryOrderId = searchParams?.get("orderId");
  const { latestOrder } = useCart();

  const displayOrderId = queryOrderId || latestOrder?.orderId || "OOT-729481";
  const items = latestOrder?.items || [];
  const checkout = latestOrder?.checkout;
  const grandTotal = latestOrder?.total || 7200;

  return (
    <div className="max-w-[1000px] mx-auto px-6 lg:px-12 py-10 lg:py-16">
      {/* Success Banner */}
      <div className="bg-[#f6f3ee] border border-[#c3c8c2]/50 p-8 sm:p-12 text-center shadow-sm relative overflow-hidden">
        <div className="w-16 h-16 rounded-full bg-[#243329] text-white flex items-center justify-center mx-auto mb-6 shadow-md">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#ebe8e3] text-[11px] uppercase tracking-[0.2em] text-[#755a21] font-semibold mb-3">
          <span>Order Confirmed · Atelier Dispatch Dispatched</span>
        </div>

        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1c1c19] tracking-tight mb-3">
          Thank You for Supporting Handloom Craft
        </h1>
        <p className="text-xs sm:text-sm text-[#434844] max-w-xl mx-auto leading-relaxed font-light">
          Your order <span className="font-semibold text-[#1c1c19]">{displayOrderId}</span> has been received by our Dhaka studio. Our master artisans are preparing your hand-finished garment for dispatch.
        </p>

        <div className="mt-8 pt-6 border-t border-[#c3c8c2]/30 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs text-[#434844]">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[#755a21]" />
            <span>Estimated Delivery: <strong className="text-[#1c1c19]">2 to 4 Days</strong></span>
          </div>
          <div className="flex items-center gap-2">
            <Truck className="w-4 h-4 text-[#755a21]" />
            <span>Courier: <strong className="text-[#1c1c19]">RedX / Steadfast Express</strong></span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#755a21]" />
            <span>Payment: <strong className="text-[#1c1c19] uppercase">{checkout?.paymentMethod || "COD"}</strong></span>
          </div>
        </div>
      </div>

      {/* Order Details & Summary Grid */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Delivery Recipient Info (5 cols) */}
        <div className="md:col-span-5 bg-[#f6f3ee] p-6 border border-[#c3c8c2]/40 text-xs space-y-4">
          <h2 className="font-serif text-lg text-[#1c1c19] pb-3 border-b border-[#c3c8c2]/30">
            Delivery Details
          </h2>

          <div className="space-y-3 text-[#434844]">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-[#737873] block mb-0.5">
                Recipient
              </span>
              <p className="font-medium text-[#1c1c19] text-sm">
                {checkout?.fullName || "Valued Patron"}
              </p>
            </div>

            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-[#755a21] shrink-0 mt-0.5" />
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#737873] block mb-0.5">
                  Address
                </span>
                <p className="leading-relaxed">
                  {checkout?.address || "Atelier Delivery Address, Dhaka"}
                </p>
                <p className="text-[#737873]">
                  {checkout?.city || "Dhaka"} - {checkout?.postalCode || "1212"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-[#755a21] shrink-0" />
              <span>{checkout?.phone || "+880 1700-000000"}</span>
            </div>

            {checkout?.email && (
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#755a21] shrink-0" />
                <span>{checkout.email}</span>
              </div>
            )}

            {checkout?.bespokeTailoringNotes && (
              <div className="pt-3 border-t border-[#c3c8c2]/30">
                <span className="text-[10px] uppercase tracking-wider text-[#755a21] font-semibold block mb-1">
                  Bespoke Sizing Request
                </span>
                <p className="italic bg-white p-2.5 border border-[#c3c8c2]/40 text-[#1c1c19]">
                  "{checkout.bespokeTailoringNotes}"
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Purchased Items List (7 cols) */}
        <div className="md:col-span-7 bg-[#f6f3ee] p-6 border border-[#c3c8c2]/40 text-xs space-y-4">
          <h2 className="font-serif text-lg text-[#1c1c19] pb-3 border-b border-[#c3c8c2]/30 flex items-center justify-between">
            <span>Garments in Order</span>
            <span className="text-xs uppercase tracking-wider text-[#755a21] font-semibold">
              {items.length} {items.length === 1 ? "Piece" : "Pieces"}
            </span>
          </h2>

          <div className="space-y-4 max-h-72 overflow-y-auto pr-1">
            {items.length === 0 ? (
              <div className="py-6 text-center text-[#737873]">
                <Package className="w-8 h-8 text-[#c3c8c2] mx-auto mb-2" />
                <span>Ordered pieces logged directly into atelier dispatch queue.</span>
              </div>
            ) : (
              items.map((item) => {
                const itemImg =
                  PRODUCT_IMAGE_MAP[item.product.id] ||
                  item.product.images?.hero_flatlay ||
                  "/assets/products/jamdani-saree-clean.jpg";

                return (
                  <div key={`${item.id}-${item.size}`} className="flex gap-4 pb-4 border-b border-[#c3c8c2]/20">
                    <div className="relative w-16 h-20 bg-white border border-[#c3c8c2]/40 overflow-hidden shrink-0">
                      <Image
                        src={itemImg}
                        alt={item.product.name}
                        fill
                        unoptimized
                        className="object-cover object-center"
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <p className="font-medium text-[#1c1c19] text-sm">
                          {item.product.name}
                        </p>
                        <p className="text-[11px] text-[#737873] uppercase tracking-wider mt-0.5">
                          Size: <strong className="text-[#1c1c19]">{item.size}</strong> · Qty: {item.quantity}
                        </p>
                      </div>
                      <p className="font-semibold text-[#1c1c19]">
                        {formatPriceBDT(item.product.price_bdt * item.quantity)}
                      </p>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Order Final Total */}
          <div className="pt-4 border-t border-[#c3c8c2]/30 space-y-1.5 text-xs text-[#434844]">
            <div className="flex justify-between">
              <span>Total Amount Due</span>
              <span className="font-serif text-lg font-semibold text-[#1c1c19]">
                {formatPriceBDT(grandTotal)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Links */}
      <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
        <Link
          href="/shop"
          className="px-8 py-3.5 bg-[#243329] hover:bg-[#1a261e] text-white text-xs uppercase tracking-widest font-semibold flex items-center gap-2 cursor-pointer transition-colors shadow-sm"
        >
          <span>Continue Shopping</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
        <Link
          href="/"
          className="px-8 py-3.5 bg-white border border-[#c3c8c2]/60 hover:bg-[#ebe8e3] text-[#1c1c19] text-xs uppercase tracking-widest font-semibold transition-colors"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
}

export default function OrderConfirmationPage() {
  return (
    <div className="w-full min-h-screen bg-[#fcf9f4] text-[#1c1c19] flex flex-col font-sans selection:bg-[#fed892] selection:text-[#785d24]">
      <SiteHeader />
      <main className="w-full flex-1 pt-24 sm:pt-28">
        <Suspense fallback={
          <div className="py-24 text-center">
            <p className="font-serif text-xl text-[#1c1c19]">Loading order details...</p>
          </div>
        }>
          <OrderConfirmationContent />
        </Suspense>
      </main>
      <SiteFooter />
    </div>
  );
}
