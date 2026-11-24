"use client";

import React, { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Heart,
  ShoppingBag,
  Sparkles,
  ShieldCheck,
  Truck,
  RotateCcw,
  Check,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  ArrowLeft,
  Share2,
  Eye,
  Maximize2,
} from "lucide-react";
import { type OotfyProduct, formatPriceBDT, OOTFY_PRODUCTS } from "../../../lib/products";
import { SiteHeader } from "../../../components/site-header";
import { ProductCard, PRODUCT_IMAGE_MAP } from "../../../components/product-card";
import { SiteFooter } from "../../../components/site-footer";
import { ToastNotification } from "../../../components/toast-notification";
import { VirtualTryonStudio } from "../../../components/virtual-tryon-studio";

interface ProductDetailsClientProps {
  product: OotfyProduct;
  fallbackHero: string;
  relatedProducts: OotfyProduct[];
}

export function ProductDetailsClient({
  product: initialProduct,
  fallbackHero: initialFallbackHero,
  relatedProducts,
}: ProductDetailsClientProps) {
  const searchParams = useSearchParams();
  const [activeProduct, setActiveProduct] = useState<OotfyProduct>(initialProduct);
  const [isTryOnActive, setIsTryOnActive] = useState(false);

  // Check query params on mount
  useEffect(() => {
    if (searchParams?.get("tryon") === "true") {
      setIsTryOnActive(true);
    }
  }, [searchParams]);

  // Current product fallback hero
  const currentHero = useMemo(() => {
    return (
      PRODUCT_IMAGE_MAP[activeProduct.id] ||
      activeProduct.images?.hero_flatlay ||
      initialFallbackHero
    );
  }, [activeProduct.id, initialFallbackHero, activeProduct.images?.hero_flatlay]);

  // 4 Canonical Atelier Perspectives matching design reference:
  // 01 / FRONT, 02 / FIT, 03 / WEAVE, 04 / FOLDED
  const galleryImages = useMemo(() => {
    if (currentHero.includes("unsplash.com")) {
      const baseUrl = currentHero.split("?")[0];
      return [
        {
          tag: "01 / FRONT",
          label: "Hero Silhouette",
          url: `${baseUrl}?q=85&w=1200&auto=format&fit=crop`,
        },
        {
          tag: "02 / FIT",
          label: "Sculptural Drape",
          url: `${baseUrl}?q=85&w=1200&auto=format&fit=crop&crop=bottom`,
        },
        {
          tag: "03 / WEAVE",
          label: "Collar & Weave Macro",
          url: `${baseUrl}?q=85&w=1200&auto=format&fit=crop&crop=top`,
        },
        {
          tag: "04 / FOLDED",
          label: "Packshot Presentation",
          url: `${baseUrl}?q=85&w=1200&auto=format&fit=crop&crop=entropy`,
        },
      ];
    }

    if (activeProduct.id === "OOT-SAR-002" || activeProduct.category === "Saree") {
      return [
        {
          tag: "01 / FRONT",
          label: "Full Saree Drape",
          url: currentHero,
        },
        {
          tag: "02 / FIT",
          label: "Pallu Presentation",
          url: "/assets/products/jamdani-saree-clean.jpg",
        },
        {
          tag: "03 / WEAVE",
          label: "Zari Weave Macro",
          url: "/assets/eid/eid-muslin-detail.jpg",
        },
        {
          tag: "04 / FOLDED",
          label: "Atelier Folded Box",
          url: "/assets/eid/eid-folded-silks.jpg",
        },
      ];
    }

    if (
      activeProduct.id === "OOT-PAN-005" ||
      activeProduct.id === "OOT-PAN-001" ||
      activeProduct.category === "Panjabi"
    ) {
      return [
        {
          tag: "01 / FRONT",
          label: "Full Atelier Silhouette",
          url: currentHero,
        },
        {
          tag: "02 / FIT",
          label: "Brass Stand Drape",
          url: "/assets/eid/eid-espresso-panjabi.jpg",
        },
        {
          tag: "03 / WEAVE",
          label: "Hand-Embroidered Placket",
          url: "/assets/eid/eid-muslin-detail.jpg",
        },
        {
          tag: "04 / FOLDED",
          label: "Pressed Presentation",
          url: "/assets/eid/eid-folded-silks.jpg",
        },
      ];
    }

    return [
      {
        tag: "01 / FRONT",
        label: "Master Silhouette",
        url: currentHero,
      },
      {
        tag: "02 / FIT",
        label: "Atelier Hanging",
        url: currentHero,
      },
      {
        tag: "03 / WEAVE",
        label: "Weave Detail",
        url: currentHero,
      },
      {
        tag: "04 / FOLDED",
        label: "Folded Packshot",
        url: currentHero,
      },
    ];
  }, [currentHero, activeProduct.id, activeProduct.category]);

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const activeImage = galleryImages[activeImageIndex]?.url || currentHero;

  const [selectedColor, setSelectedColor] = useState(
    activeProduct.colors?.find((c) => c.is_default)?.name ||
      activeProduct.colors?.[0]?.name ||
      "Default"
  );
  const [selectedSize, setSelectedSize] = useState(
    activeProduct.sizes?.[0] || "Standard"
  );
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [cartCount, setCartCount] = useState(1);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Accordion states
  const [fabricOpen, setFabricOpen] = useState(true);
  const [shippingOpen, setShippingOpen] = useState(false);

  // Sync state when product switches
  useEffect(() => {
    setActiveImageIndex(0);
    setSelectedColor(
      activeProduct.colors?.find((c) => c.is_default)?.name ||
        activeProduct.colors?.[0]?.name ||
        "Default"
    );
    setSelectedSize(activeProduct.sizes?.[0] || "Standard");
  }, [activeProduct]);

  const handleAddToCart = () => {
    setCartCount((c) => c + quantity);
    setToastMessage(`Added ${quantity} × ${activeProduct.name} (${selectedSize}) to bag`);
  };

  const handleBuyNow = () => {
    setCartCount((c) => c + quantity);
    setToastMessage(`Proceeding to atelier checkout for ${activeProduct.name}...`);
  };

  const handleToggleWishlist = () => {
    setIsWishlisted((prev) => !prev);
    setToastMessage(
      !isWishlisted
        ? `Saved ${activeProduct.name} to atelier wishlist`
        : `Removed ${activeProduct.name} from atelier wishlist`
    );
  };

  const handleStudioAddToCart = (
    item: OotfyProduct,
    size: string,
    color: string,
    bodyPreset: string
  ) => {
    setCartCount((c) => c + 1);
    setToastMessage(`Added to Bag: ${item.name} (${size} · ${bodyPreset} Fit)`);
  };

  return (
    <div className="w-full min-h-screen bg-[#fcf9f4] text-[#1c1c19] flex flex-col font-sans selection:bg-[#fed892] selection:text-[#785d24]">
      {/* Toast Notification */}
      {toastMessage && (
        <ToastNotification
          message={toastMessage}
          onClose={() => setToastMessage(null)}
        />
      )}

      {/* 1. Sticky Nav Header */}
      <SiteHeader
        wishlistCount={isWishlisted ? 1 : 0}
        cartCount={cartCount}
        onOpenSearch={() => setToastMessage("Search functionality opening...")}
      />

      {/* Conditional Rendering: VIRTUAL TRY-ON STUDIO or ATELIER PRODUCT DETAILS */}
      {isTryOnActive ? (
        <main className="w-full flex-1 pt-20 sm:pt-24 animate-fadeIn">
          <VirtualTryonStudio
            product={activeProduct}
            onClose={() => {
              setIsTryOnActive(false);
              if (typeof window !== "undefined" && typeof window.scrollTo === "function") {
                try {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                } catch (_) {}
              }
            }}
            onAddToCart={handleStudioAddToCart}
            onSelectProduct={(newP) => {
              setActiveProduct(newP);
              setToastMessage(`Switched outfit to: ${newP.name}`);
            }}
            allProducts={OOTFY_PRODUCTS}
          />
        </main>
      ) : (
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
              <span className="text-[#737873]">{activeProduct.category}</span>
              <ChevronRight className="w-3.5 h-3.5 text-[#c3c8c2]" />
              <span className="text-[#1c1c19] font-medium truncate max-w-[200px] sm:max-w-none">
                {activeProduct.name}
              </span>
            </nav>

            {/* Two-Column Atelier Product Layout (Matching Left Design Reference) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
              {/* Left Column: Photographic Gallery (7 Cols) */}
              <div className="lg:col-span-7 flex flex-col">
                {/* Master Preview Image */}
                <div className="relative aspect-[4/5] sm:aspect-[3/4] bg-[#f6f3ee] overflow-hidden border border-[#c3c8c2]/50 shadow-sm group">
                  <Image
                    src={activeImage}
                    alt={activeProduct.name}
                    fill
                    unoptimized
                    priority
                    className="object-cover object-center transition-all duration-500 group-hover:scale-102"
                  />

                  {/* Top-Left Pill Badge: [ 01 / HERO VIEW ] */}
                  <div className="absolute top-4 left-4 z-10 inline-flex items-center gap-1.5 px-3 py-1 bg-[#fcf9f4]/95 backdrop-blur-sm border border-[#c3c8c2]/40 text-[10px] uppercase font-semibold tracking-widest text-[#1c1c19] shadow-sm">
                    <span>
                      {galleryImages[activeImageIndex]?.tag || "01 / HERO VIEW"}
                    </span>
                  </div>

                  {/* Badge Overlay */}
                  {activeProduct.badge && (
                    <span
                      className={`absolute top-4 right-4 px-3 py-1 text-[10px] uppercase font-semibold tracking-widest z-10 ${
                        activeProduct.badge === "LIMITED"
                          ? "bg-[#243329] text-white"
                          : activeProduct.badge === "EXCLUSIVE"
                          ? "bg-[#755a21] text-white"
                          : "bg-[#fcf9f4]/95 text-[#1c1c19] backdrop-blur-sm shadow-sm"
                      }`}
                    >
                      {activeProduct.badge}
                    </span>
                  )}

                  {/* Bottom-Right 360 / Interactive Hint */}
                  <button
                    type="button"
                    onClick={() => {
                      setIsTryOnActive(true);
                      if (typeof window !== "undefined" && typeof window.scrollTo === "function") {
                        try {
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        } catch (_) {}
                      }
                    }}
                    className="absolute bottom-4 right-4 z-10 px-3 py-1.5 bg-[#fcf9f4]/90 backdrop-blur-sm border border-[#c3c8c2]/50 text-[10px] uppercase tracking-wider font-semibold text-[#1c1c19] hover:bg-white flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#755a21]" />
                    <span>360° Try-On</span>
                  </button>
                </div>

                {/* 4 Horizontal Thumbnail Cards Underneath: 01/FRONT, 02/FIT, 03/WEAVE, 04/FOLDED */}
                <div className="grid grid-cols-4 gap-2.5 sm:gap-4 mt-4">
                  {galleryImages.map((img, idx) => {
                    const isActive = activeImageIndex === idx;
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setActiveImageIndex(idx)}
                        className={`relative aspect-[3/4] bg-[#f6f3ee] overflow-hidden border transition-all cursor-pointer flex flex-col justify-end p-1.5 sm:p-2 ${
                          isActive
                            ? "border-[#243329] ring-2 ring-[#243329]/25 shadow-sm"
                            : "border-[#c3c8c2]/50 hover:border-[#1c1c19]/80"
                        }`}
                      >
                        <Image
                          src={img.url}
                          alt={`${activeProduct.name} ${img.tag}`}
                          fill
                          unoptimized
                          className="object-cover object-center"
                        />
                        {/* Label Pill at bottom */}
                        <div
                          className={`relative z-10 text-[9px] sm:text-[10px] uppercase font-semibold tracking-wider px-1.5 py-0.5 text-center truncate backdrop-blur-md transition-colors ${
                            isActive
                              ? "bg-[#243329] text-white"
                              : "bg-[#fcf9f4]/90 text-[#1c1c19] border border-[#c3c8c2]/40"
                          }`}
                        >
                          {img.tag}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Right Column: Garment Specifications & Actions (5 Cols) */}
              <div className="lg:col-span-5 flex flex-col justify-start">
                {/* Category Breadcrumb Tag */}
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] uppercase tracking-[0.2em] text-[#755a21] font-semibold">
                    {activeProduct.gender.toUpperCase()} / {activeProduct.category.toUpperCase()} / ATELIER {activeProduct.id.split("-").pop()}
                  </span>
                  <span className="text-[10px] uppercase tracking-wider text-[#737873] bg-[#ebe8e3] px-2 py-0.5">
                    {activeProduct.stock_status || "In Stock — Atelier"}
                  </span>
                </div>

                {/* Garment Title */}
                <h1 className="font-serif text-3xl sm:text-4xl text-[#1c1c19] tracking-tight leading-tight mb-2">
                  {activeProduct.name}
                </h1>

                {/* Price in BDT */}
                <div className="flex items-baseline gap-3 py-3 border-y border-[#c3c8c2]/30 mb-4">
                  <span className="font-serif text-2xl sm:text-3xl font-semibold text-[#1c1c19]">
                    {formatPriceBDT(activeProduct.price_bdt)}
                  </span>
                  {activeProduct.original_price_bdt && (
                    <span className="text-sm text-[#737873] line-through">
                      {formatPriceBDT(activeProduct.original_price_bdt)}
                    </span>
                  )}
                  {activeProduct.original_price_bdt && (
                    <span className="text-xs uppercase tracking-wider text-[#755a21] font-semibold">
                      Save {Math.round(((activeProduct.original_price_bdt - activeProduct.price_bdt) / activeProduct.original_price_bdt) * 100)}%
                    </span>
                  )}
                </div>

                {/* Garment Description */}
                <p className="text-sm text-[#5a605b] leading-relaxed mb-6">
                  {activeProduct.description}
                </p>

                {/* Color Options */}
                {activeProduct.colors && activeProduct.colors.length > 0 && (
                  <div className="mb-6">
                    <label className="text-xs uppercase tracking-widest text-[#1c1c19] font-semibold block mb-2">
                      Color: <span className="text-[#755a21]">{selectedColor}</span>
                    </label>
                    <div className="flex items-center gap-2.5">
                      {activeProduct.colors.map((color, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setSelectedColor(color.name)}
                          className={`w-7 h-7 rounded-full border-2 transition-transform cursor-pointer relative ${
                            selectedColor === color.name
                              ? "border-[#243329] scale-110 ring-2 ring-[#243329]/25"
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
                {activeProduct.sizes && activeProduct.sizes.length > 0 && (
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs uppercase tracking-widest text-[#1c1c19] font-semibold">
                        Size: <span className="text-[#755a21]">{selectedSize}</span>
                      </label>
                      <button
                        type="button"
                        onClick={() =>
                          setToastMessage(
                            "Dhaka Atelier fits true to size. Complimentary bespoke adjustments available upon order confirmation."
                          )
                        }
                        className="text-[11px] uppercase tracking-wider text-[#755a21] underline underline-offset-4 hover:text-[#1c1c19] cursor-pointer"
                      >
                        Size Guide
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {activeProduct.sizes.map((size) => (
                        <button
                          key={size}
                          type="button"
                          onClick={() => setSelectedSize(size)}
                          className={`min-w-[48px] px-3.5 py-2 text-xs uppercase tracking-wider font-semibold border transition-all cursor-pointer ${
                            selectedSize === size
                              ? "bg-[#243329] text-white border-[#243329] shadow-sm"
                              : "bg-[#f6f3ee] text-[#1c1c19] border-[#c3c8c2]/60 hover:border-[#1c1c19]"
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Actions Section: Add to Cart, Buy Now, and SEE IT ON YOU */}
                <div className="space-y-3 pt-2 mb-8">
                  {/* Quantity & Add to Cart Row */}
                  <div className="flex items-center gap-3">
                    <div className="flex items-center border border-[#c3c8c2] bg-[#f6f3ee] h-12">
                      <button
                        type="button"
                        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                        className="w-10 h-full flex items-center justify-center text-[#1c1c19] hover:bg-[#ebe8e3] cursor-pointer"
                      >
                        -
                      </button>
                      <span className="w-8 text-center text-xs font-semibold">
                        {quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => setQuantity((q) => q + 1)}
                        className="w-10 h-full flex items-center justify-center text-[#1c1c19] hover:bg-[#ebe8e3] cursor-pointer"
                      >
                        +
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={handleAddToCart}
                      className="flex-1 h-12 bg-[#243329] hover:bg-[#1a261e] text-white text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 shadow transition-all cursor-pointer active:scale-[0.99]"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add To Cart</span>
                    </button>

                    {/* Wishlist Button */}
                    <button
                      type="button"
                      aria-label="Wishlist"
                      onClick={handleToggleWishlist}
                      className={`w-12 h-12 border flex items-center justify-center transition-colors cursor-pointer shrink-0 ${
                        isWishlisted
                          ? "border-[#755a21] bg-[#755a21]/10 text-[#755a21]"
                          : "border-[#c3c8c2] text-[#434844] hover:text-[#1c1c19] hover:border-[#1c1c19]"
                      }`}
                      title={isWishlisted ? "In Wishlist" : "Add to Wishlist"}
                    >
                      <Heart
                        className={`w-5 h-5 ${isWishlisted ? "fill-[#755a21]" : ""}`}
                      />
                    </button>
                  </div>

                  {/* Buy Now Button */}
                  <button
                    type="button"
                    onClick={handleBuyNow}
                    className="w-full h-12 bg-[#f6f3ee] hover:bg-[#ebe8e3] text-[#1c1c19] border border-[#c3c8c2] text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-[0.99]"
                  >
                    <span>Buy Now</span>
                  </button>

                  {/* ✨ SEE IT ON YOU Button (Directly switches to Virtual Try-On screen!) */}
                  <button
                    type="button"
                    onClick={() => {
                      setIsTryOnActive(true);
                      if (typeof window !== "undefined" && typeof window.scrollTo === "function") {
                        try {
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        } catch (_) {}
                      }
                    }}
                    className="w-full h-12 bg-gradient-to-r from-[#243329]/5 via-[#755a21]/15 to-[#243329]/5 hover:from-[#243329]/10 hover:via-[#755a21]/25 hover:to-[#243329]/10 border border-[#755a21]/50 text-[#1c1c19] text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2.5 shadow-sm transition-all cursor-pointer active:scale-[0.99]"
                  >
                    <Sparkles className="w-4 h-4 text-[#755a21]" />
                    <span>See It On You</span>
                  </button>
                </div>

                {/* Collapsible Accordions: FABRIC & CARE, SHIPPING & RETURNS */}
                <div className="border-t border-[#c3c8c2]/40 divide-y divide-[#c3c8c2]/30">
                  {/* Fabric & Care Accordion */}
                  <div>
                    <button
                      type="button"
                      onClick={() => setFabricOpen(!fabricOpen)}
                      className="w-full py-4 flex items-center justify-between text-left text-xs uppercase tracking-wider font-semibold text-[#1c1c19] hover:text-[#755a21] transition-colors cursor-pointer"
                    >
                      <span>Fabric & Care</span>
                      {fabricOpen ? (
                        <ChevronUp className="w-4 h-4 text-[#737873]" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-[#737873]" />
                      )}
                    </button>
                    {fabricOpen && (
                      <div className="pb-4 text-xs text-[#5a605b] space-y-2 leading-relaxed animate-fadeIn">
                        <p>
                          <span className="font-semibold text-[#1c1c19]">
                            Fabric:
                          </span>{" "}
                          {activeProduct.fabric}
                        </p>
                        <p>
                          <span className="font-semibold text-[#1c1c19]">
                            Craft Technique:
                          </span>{" "}
                          {activeProduct.craft_technique}
                        </p>
                        <p>
                          <span className="font-semibold text-[#1c1c19]">
                            Fit Cut:
                          </span>{" "}
                          {activeProduct.fit_recommendation}
                        </p>
                        <p className="pt-1 text-[#737873]">
                          Care: Delicate dry clean recommended. Store on wide
                          natural cedar hanger in breathable garment bag. Steam on
                          reverse with low temperature.
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Shipping & Returns Accordion */}
                  <div>
                    <button
                      type="button"
                      onClick={() => setShippingOpen(!shippingOpen)}
                      className="w-full py-4 flex items-center justify-between text-left text-xs uppercase tracking-wider font-semibold text-[#1c1c19] hover:text-[#755a21] transition-colors cursor-pointer"
                    >
                      <span>Shipping & Returns</span>
                      {shippingOpen ? (
                        <ChevronUp className="w-4 h-4 text-[#737873]" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-[#737873]" />
                      )}
                    </button>
                    {shippingOpen && (
                      <div className="pb-4 text-xs text-[#5a605b] space-y-2 leading-relaxed animate-fadeIn">
                        <div className="flex items-center gap-2 text-[#243329]">
                          <Truck className="w-4 h-4" />
                          <span>
                            Complimentary Dhaka Atelier Delivery (24-48 Hours)
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-[#243329]">
                          <RotateCcw className="w-4 h-4" />
                          <span>
                            7-Day Bespoke Size & Drape Exchange Available
                          </span>
                        </div>
                        <p className="pt-1 text-[#737873]">
                          Nationwide courier across Bangladesh within 48-72 hours.
                          Each piece arrives in handcrafted archival muslin box.
                        </p>
                      </div>
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
                    <span className="text-[11px] uppercase tracking-widest text-[#755a21] font-semibold block">
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
                        setToastMessage(`Toggled ${item.name} in wishlist`);
                      }}
                    />
                  ))}
                </div>
              </section>
            )}
          </div>
        </main>
      )}

      {/* Footer */}
      <SiteFooter />
    </div>
  );
}
