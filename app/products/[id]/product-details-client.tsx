"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Heart,
  ShoppingBag,
  Sparkles,
  ShieldCheck,
  Truck,
  RotateCcw,
  Check,
  ChevronRight,
  ArrowLeft,
  Share2,
} from "lucide-react";
import { type OotfyProduct, formatPriceBDT } from "../../../lib/products";
import { SiteHeader } from "../../../components/site-header";
import { ProductCard, PRODUCT_IMAGE_MAP } from "../../../components/product-card";
import { SiteFooter } from "../../../components/site-footer";
import { ToastNotification } from "../../../components/toast-notification";

interface ProductDetailsClientProps {
  product: OotfyProduct;
  fallbackHero: string;
  relatedProducts: OotfyProduct[];
}

export function ProductDetailsClient({
  product,
  fallbackHero,
  relatedProducts,
}: ProductDetailsClientProps) {
  // Image gallery views: Tailored photographic perspectives for this specific garment
  const galleryImages = React.useMemo(() => {
    if (fallbackHero.includes("unsplash.com")) {
      const baseUrl = fallbackHero.split("?")[0];
      return [
        { label: "Master Packshot", url: `${baseUrl}?q=85&w=1200&auto=format&fit=crop` },
        { label: "Craft & Collar Macro", url: `${baseUrl}?q=85&w=1200&auto=format&fit=crop&crop=top` },
        { label: "Weave & Textile Detail", url: `${baseUrl}?q=85&w=1200&auto=format&fit=crop&crop=entropy` },
        { label: "Sculptural Drape", url: `${baseUrl}?q=85&w=1200&auto=format&fit=crop&crop=bottom` },
      ];
    }

    if (product.id === "OOT-SAR-002" || product.category === "Saree") {
      return [
        { label: "Full Saree Drape", url: fallbackHero },
        { label: "Zari Weave Macro", url: "/assets/eid/eid-muslin-detail.jpg" },
        { label: "Pallu Presentation", url: "/assets/products/jamdani-saree-clean.jpg" },
        { label: "Atelier Folded Box", url: "/assets/eid/eid-folded-silks.jpg" },
      ];
    }

    if (product.id === "OOT-PAN-005" || product.id === "OOT-PAN-001" || product.category === "Panjabi") {
      return [
        { label: "Full Atelier Silhouette", url: fallbackHero },
        { label: "Hand-Embroidered Placket", url: "/assets/eid/eid-muslin-detail.jpg" },
        { label: "Brass Stand Drape", url: "/assets/eid/eid-espresso-panjabi.jpg" },
        { label: "Pressed Presentation", url: "/assets/eid/eid-folded-silks.jpg" },
      ];
    }

    return [
      { label: "Master Silhouette", url: fallbackHero },
      { label: "Craft Perspective", url: fallbackHero },
      { label: "Atelier Presentation", url: fallbackHero },
      { label: "Folded Packshot", url: fallbackHero },
    ];
  }, [fallbackHero, product.id, product.category]);

  const [activeImage, setActiveImage] = useState(galleryImages[0].url);
  const [selectedColor, setSelectedColor] = useState(
    product.colors?.find((c) => c.is_default)?.name || product.colors?.[0]?.name || "Default"
  );
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || "Standard");
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [cartCount, setCartCount] = useState(1);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"craft" | "details" | "care" | "shipping">("craft");

  const handleAddToCart = () => {
    setCartCount((c) => c + quantity);
    setToastMessage(`Added ${quantity} × ${product.name} (${selectedSize}) to bag`);
  };

  const handleToggleWishlist = () => {
    setIsWishlisted((prev) => !prev);
    setToastMessage(
      !isWishlisted
        ? `Saved ${product.name} to atelier wishlist`
        : `Removed ${product.name} from atelier wishlist`
    );
  };

  return (
    <div className="w-full min-h-screen bg-[#fcf9f4] text-[#1c1c19] flex flex-col font-sans selection:bg-[#fed892] selection:text-[#785d24]">
      {/* 1. Sticky Nav Header */}
      <SiteHeader
        wishlistCount={isWishlisted ? 1 : 0}
        cartCount={cartCount}
        onOpenSearch={() => setToastMessage("Search functionality opening...")}
      />

      <main className="w-full flex-1 pt-24 sm:pt-28">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-6 sm:py-10">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#737873] mb-8">
            <Link href="/" className="hover:text-[#1c1c19] transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-[#c3c8c2]" />
            <Link href="/shop" className="hover:text-[#1c1c19] transition-colors">
              Shop
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-[#c3c8c2]" />
            <span className="text-[#737873]">{product.category}</span>
            <ChevronRight className="w-3.5 h-3.5 text-[#c3c8c2]" />
            <span className="text-[#1c1c19] font-medium truncate max-w-[200px] sm:max-w-none">
              {product.name}
            </span>
          </nav>

          {/* Two-Column Atelier Product Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
            {/* Left Column: Photographic Gallery (7 Cols) */}
            <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-4">
              {/* Thumbnails Strip */}
              <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-visible pb-2 md:pb-0 shrink-0">
                {galleryImages.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImage(img.url)}
                    className={`relative w-20 h-24 sm:w-24 sm:h-32 bg-[#f6f3ee] overflow-hidden border transition-all cursor-pointer shrink-0 ${
                      activeImage === img.url
                        ? "border-[#243329] ring-1 ring-[#243329]"
                        : "border-transparent hover:border-[#c3c8c2]"
                    }`}
                  >
                    <Image
                      src={img.url}
                      alt={`${product.name} view ${idx + 1}`}
                      fill
                      unoptimized
                      onError={() => {
                        // Fallback to primary hero
                        if (img.url !== fallbackHero) {
                          setActiveImage(fallbackHero);
                        }
                      }}
                      className="object-cover object-center"
                    />
                  </button>
                ))}
              </div>

              {/* Master Preview Image */}
              <div className="flex-1 relative aspect-[3/4] bg-[#f6f3ee] overflow-hidden border border-[#c3c8c2]/40">
                <Image
                  src={activeImage}
                  alt={product.name}
                  fill
                  unoptimized
                  onError={() => {
                    setActiveImage(fallbackHero);
                  }}
                  className="object-cover object-center transition-all duration-500"
                  priority
                />

                {/* Badge Overlay */}
                {product.badge && (
                  <span
                    className={`absolute top-4 left-4 px-3 py-1 text-xs uppercase font-semibold tracking-widest z-10 ${
                      product.badge === "LIMITED"
                        ? "bg-[#243329] text-white"
                        : product.badge === "EXCLUSIVE"
                        ? "bg-[#755a21] text-white"
                        : "bg-[#fcf9f4]/95 text-[#1c1c19] backdrop-blur-sm shadow-sm"
                    }`}
                  >
                    {product.badge}
                  </span>
                )}
              </div>
            </div>

            {/* Right Column: Garment Specifications & Actions (5 Cols) */}
            <div className="lg:col-span-5 flex flex-col justify-start">
              {/* Collection / Subtitle */}
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs uppercase tracking-widest text-[#755a21] font-medium">
                  {product.collection || "The New Bangladeshi Edit"}
                </span>
                <span className="text-[11px] uppercase tracking-wider text-[#737873] bg-[#ebe8e3] px-2 py-0.5">
                  {product.stock_status || "In Stock — Atelier"}
                </span>
              </div>

              {/* Garment Title */}
              <h1 className="font-serif text-3xl sm:text-4xl text-[#1c1c19] tracking-tight leading-tight mb-2">
                {product.name}
              </h1>

              {product.subtitle_or_tagline && (
                <p className="text-sm text-[#737873] tracking-wide mb-4">
                  {product.subtitle_or_tagline}
                </p>
              )}

              {/* Price in BDT */}
              <div className="flex items-baseline gap-3 py-3 border-y border-[#c3c8c2]/30 mb-6">
                <span className="font-serif text-2xl sm:text-3xl font-medium text-[#1c1c19]">
                  {formatPriceBDT(product.price_bdt)}
                </span>
                {product.original_price_bdt && (
                  <span className="text-sm text-[#737873] line-through">
                    {formatPriceBDT(product.original_price_bdt)}
                  </span>
                )}
                {product.original_price_bdt && (
                  <span className="text-xs uppercase tracking-wider text-[#755a21] font-semibold">
                    Save {Math.round(((product.original_price_bdt - product.price_bdt) / product.original_price_bdt) * 100)}%
                  </span>
                )}
              </div>

              {/* Quick Craft Pills */}
              <div className="grid grid-cols-2 gap-3 mb-6 p-3 bg-[#f6f3ee] text-xs">
                <div>
                  <span className="text-[#737873] uppercase text-[10px] tracking-wider block">Craft Technique</span>
                  <span className="font-medium text-[#1c1c19] mt-0.5 block">{product.craft_technique}</span>
                </div>
                <div>
                  <span className="text-[#737873] uppercase text-[10px] tracking-wider block">Fit Cut</span>
                  <span className="font-medium text-[#1c1c19] mt-0.5 block">{product.fit_recommendation}</span>
                </div>
              </div>

              {/* Color Options */}
              {product.colors && product.colors.length > 0 && (
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs uppercase tracking-widest text-[#434844] font-medium">
                      Colorway: <span className="text-[#1c1c19]">{selectedColor}</span>
                    </span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    {product.colors.map((color, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setSelectedColor(color.name)}
                        className={`w-7 h-7 rounded-full border-2 transition-transform cursor-pointer relative ${
                          selectedColor === color.name
                            ? "border-[#243329] scale-110 ring-2 ring-[#243329]/20"
                            : "border-transparent hover:scale-105"
                        }`}
                        style={{ backgroundColor: color.hex }}
                        title={color.name}
                      >
                        {selectedColor === color.name && (
                          <span className="sr-only">Selected {color.name}</span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Size Selector */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs uppercase tracking-widest text-[#434844] font-medium">
                      Select Size: <span className="text-[#1c1c19]">{selectedSize}</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => setToastMessage("Standard Dhaka Atelier fit true to size. Complimentary size exchange available.")}
                      className="text-[11px] uppercase tracking-wider text-[#755a21] hover:underline cursor-pointer"
                    >
                      Size Guide
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        type="button"
                        onClick={() => setSelectedSize(size)}
                        className={`min-w-[48px] px-3 py-2 text-xs uppercase tracking-wider font-medium border transition-colors cursor-pointer ${
                          selectedSize === size
                            ? "bg-[#243329] text-white border-[#243329]"
                            : "bg-[#f6f3ee] text-[#1c1c19] border-[#c3c8c2]/50 hover:border-[#1c1c19]"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons: Add to Bag & Wishlist */}
              <div className="flex items-center gap-3 pt-2 mb-8">
                {/* Quantity */}
                <div className="flex items-center border border-[#c3c8c2] bg-[#f6f3ee]">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-10 h-12 flex items-center justify-center text-[#1c1c19] hover:bg-[#ebe8e3] cursor-pointer"
                  >
                    -
                  </button>
                  <span className="w-8 text-center text-xs font-medium">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-10 h-12 flex items-center justify-center text-[#1c1c19] hover:bg-[#ebe8e3] cursor-pointer"
                  >
                    +
                  </button>
                </div>

                {/* Add to Bag */}
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="flex-1 h-12 bg-[#243329] hover:bg-[#1a261e] text-white text-xs uppercase tracking-widest font-medium flex items-center justify-center gap-2 shadow transition-all cursor-pointer active:scale-[0.99]"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add To Bag</span>
                </button>

                {/* Wishlist */}
                <button
                  type="button"
                  aria-label="Wishlist"
                  onClick={handleToggleWishlist}
                  className={`w-12 h-12 border flex items-center justify-center transition-colors cursor-pointer ${
                    isWishlisted
                      ? "border-[#755a21] bg-[#755a21]/10 text-[#755a21]"
                      : "border-[#c3c8c2] text-[#434844] hover:text-[#1c1c19] hover:border-[#1c1c19]"
                  }`}
                  title={isWishlisted ? "In Wishlist" : "Add to Wishlist"}
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? "fill-[#755a21]" : ""}`} />
                </button>
              </div>

              {/* Trust & Guarantee Callouts */}
              <div className="grid grid-cols-2 gap-3 py-4 border-t border-[#c3c8c2]/30 text-xs text-[#434844]">
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-[#243329]" />
                  <span>Complimentary Dhaka Atelier Delivery</span>
                </div>
                <div className="flex items-center gap-2">
                  <RotateCcw className="w-4 h-4 text-[#243329]" />
                  <span>7-Day Bespoke Exchange</span>
                </div>
              </div>

              {/* Atelier Details Accordion Tabs */}
              <div className="mt-6 border-t border-[#c3c8c2]/30">
                <div className="flex border-b border-[#c3c8c2]/30">
                  <button
                    type="button"
                    onClick={() => setActiveTab("craft")}
                    className={`py-3 px-4 text-xs uppercase tracking-wider font-medium border-b-2 transition-all cursor-pointer ${
                      activeTab === "craft"
                        ? "border-[#243329] text-[#1c1c19]"
                        : "border-transparent text-[#737873] hover:text-[#1c1c19]"
                    }`}
                  >
                    Craft & Fabric
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab("details")}
                    className={`py-3 px-4 text-xs uppercase tracking-wider font-medium border-b-2 transition-all cursor-pointer ${
                      activeTab === "details"
                        ? "border-[#243329] text-[#1c1c19]"
                        : "border-transparent text-[#737873] hover:text-[#1c1c19]"
                    }`}
                  >
                    Description
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab("care")}
                    className={`py-3 px-4 text-xs uppercase tracking-wider font-medium border-b-2 transition-all cursor-pointer ${
                      activeTab === "care"
                        ? "border-[#243329] text-[#1c1c19]"
                        : "border-transparent text-[#737873] hover:text-[#1c1c19]"
                    }`}
                  >
                    Care Guide
                  </button>
                </div>

                <div className="py-4 text-xs text-[#434844] leading-relaxed">
                  {activeTab === "craft" && (
                    <div className="space-y-2">
                      <p><span className="font-medium text-[#1c1c19]">Fabric Composition:</span> {product.fabric}</p>
                      <p><span className="font-medium text-[#1c1c19]">Artisanal Method:</span> {product.craft_technique}</p>
                      <p><span className="font-medium text-[#1c1c19]">Silhouette Drape:</span> {product.fit_recommendation}</p>
                    </div>
                  )}
                  {activeTab === "details" && (
                    <p>{product.description}</p>
                  )}
                  {activeTab === "care" && (
                    <p>Dry clean only. Store on wide wooden hanger away from direct moisture. Steam iron on reverse silk setting.</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Related Atelier Pieces Section */}
          {relatedProducts.length > 0 && (
            <section className="mt-20 pt-12 border-t border-[#c3c8c2]/30">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <span className="text-[11px] uppercase tracking-widest text-[#755a21] font-medium block">
                    Curated Companions
                  </span>
                  <h2 className="font-serif text-2xl sm:text-3xl text-[#1c1c19]">
                    Related Atelier Pieces
                  </h2>
                </div>
                <Link
                  href="/shop"
                  className="text-xs uppercase tracking-widest text-[#1c1c19] hover:text-[#755a21] font-medium"
                >
                  View All Pieces →
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map((p) => (
                  <ProductCard
                    key={p.id}
                    product={p}
                    showPrice={false}
                    onQuickAdd={(item) => {
                      setCartCount((c) => c + 1);
                      setToastMessage(`Added ${item.name} to bag`);
                    }}
                    onToggleWishlist={(item) => {
                      setToastMessage(`Saved ${item.name} to wishlist`);
                    }}
                  />
                ))}
              </div>
            </section>
          )}
        </div>
      </main>

      {/* Site Footer */}
      <SiteFooter onNotify={(msg) => setToastMessage(msg)} />

      {/* Toast Notification */}
      {toastMessage && (
        <ToastNotification
          message={toastMessage}
          onClose={() => setToastMessage(null)}
        />
      )}
    </div>
  );
}
