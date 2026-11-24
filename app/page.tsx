"use client";

import React, { useState, useEffect } from "react";
import { OOTFY_PRODUCTS, getProducts, type OotfyProduct } from "../lib/products";
import { SiteHeader } from "../components/site-header";
import { HeroSection } from "../components/hero-section";
import { CategoryNav } from "../components/category-nav";
import { NewArrivalsSection } from "../components/new-arrivals-section";
import { EidEditSection } from "../components/eid-edit-section";
import { VirtualTryonTeaser } from "../components/virtual-tryon-teaser";
import { BestSellersSection } from "../components/best-sellers-section";
import { BrandPhilosophySection } from "../components/brand-philosophy-section";
import { ReviewsNewsletterSection } from "../components/reviews-newsletter-section";
import { SiteFooter } from "../components/site-footer";
import { ToastNotification } from "../components/toast-notification";

export default function HomePage() {
  const [products, setProducts] = useState<OotfyProduct[]>(OOTFY_PRODUCTS);
  const [activeCategory, setActiveCategory] = useState("all");
  const [wishlistIds, setWishlistIds] = useState<Set<string>>(new Set());
  const [cartCount, setCartCount] = useState(1);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Fetch initial products (from Supabase or local catalog fallback)
  useEffect(() => {
    let active = true;
    getProducts()
      .then((res) => {
        if (active && res.items && res.items.length > 0) {
          setProducts(res.items);
        }
      })
      .catch(() => {
        // Fallback already uses OOTFY_PRODUCTS
      });

    return () => {
      active = false;
    };
  }, []);

  const handleSelectCategory = (catId: string) => {
    setActiveCategory(catId);
    if (catId === "all") {
      setProducts(OOTFY_PRODUCTS);
    } else {
      const filtered = OOTFY_PRODUCTS.filter((p) => {
        const pCat = p.category.toLowerCase().replace(/[\s-_]+/g, "");
        const target = catId.replace(/[\s-_]+/g, "");
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
      setProducts(filtered.length > 0 ? filtered : OOTFY_PRODUCTS);
    }
  };

  const handleQuickAdd = (product: OotfyProduct) => {
    setCartCount((prev) => prev + 1);
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

  const handleLaunchTryOn = () => {
    setToastMessage("Initializing Virtual Try-On 3D Atelier...");
  };

  return (
    <div className="w-full min-h-screen bg-[#fcf9f4] text-[#1c1c19] flex flex-col font-sans selection:bg-[#fed892] selection:text-[#785d24]">
      {/* 1. Sticky Navigation Header */}
      <SiteHeader
        wishlistCount={wishlistIds.size}
        cartCount={cartCount}
        onOpenSearch={() => setToastMessage("Search functionality opening...")}
      />

      {/* Main Page Content */}
      <main className="w-full flex-1">
        {/* 2. Hero Section */}
        <HeroSection />

        {/* 3. Category Navigation Filter */}
        <CategoryNav
          activeCategory={activeCategory}
          onSelectCategory={handleSelectCategory}
        />

        {/* 4. New Arrivals Curated Releases */}
        <NewArrivalsSection
          products={products}
          onQuickAdd={handleQuickAdd}
          onToggleWishlist={handleToggleWishlist}
          wishlistIds={wishlistIds}
        />

        {/* 5. The Eid Edit Seasonal Capsule */}
        <EidEditSection />

        {/* 6. Virtual Try-On Teaser ("SEE IT ON YOU") */}
        <VirtualTryonTeaser
          onLaunchModal={handleLaunchTryOn}
          onQuickAdd={(name) => {
            setCartCount((c) => c + 1);
            setToastMessage(`Added ${name} to your bag`);
          }}
        />

        {/* 7. Best Sellers (Atelier Signatures) */}
        <BestSellersSection
          products={OOTFY_PRODUCTS}
          onQuickAdd={handleQuickAdd}
          onToggleWishlist={handleToggleWishlist}
          wishlistIds={wishlistIds}
        />

        {/* 8. Brand Philosophy */}
        <BrandPhilosophySection />

        {/* 9. Client Dispatches & Private List */}
        <ReviewsNewsletterSection onNotify={(msg) => setToastMessage(msg)} />
      </main>

      {/* 10. Site Footer */}
      <SiteFooter onNotify={(msg) => setToastMessage(msg)} />

      {/* Floating Toast Feedback */}
      <ToastNotification
        message={toastMessage}
        onClose={() => setToastMessage(null)}
      />
    </div>
  );
}
