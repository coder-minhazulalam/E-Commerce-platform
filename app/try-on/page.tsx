"use client";

import React, { Suspense, useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { OOTFY_PRODUCTS, type OotfyProduct } from "../../lib/products";
import { VirtualTryonStudio } from "../../components/virtual-tryon-studio";
import { SiteHeader } from "../../components/site-header";
import { SiteFooter } from "../../components/site-footer";
import { ToastNotification } from "../../components/toast-notification";

function TryOnContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const productId = searchParams?.get("id") || "OOT-PAN-001";

  const [activeProduct, setActiveProduct] = useState<OotfyProduct>(
    () => OOTFY_PRODUCTS.find((p) => p.id === productId) || OOTFY_PRODUCTS[0]
  );
  const [cartCount, setCartCount] = useState(1);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    if (productId) {
      const found = OOTFY_PRODUCTS.find((p) => p.id === productId);
      if (found) setActiveProduct(found);
    }
  }, [productId]);

  const handleAddToCart = (
    item: OotfyProduct,
    size: string,
    color: string,
    bodyPreset: string
  ) => {
    setCartCount((c) => c + 1);
    setToastMessage(`Added to Bag: ${item.name} (${size} · ${bodyPreset} Fit)`);
  };

  return (
    <div className="w-full min-h-screen bg-[#fcf9f4] text-[#1c1c19] flex flex-col font-sans">
      {toastMessage && (
        <ToastNotification
          message={toastMessage}
          onClose={() => setToastMessage(null)}
        />
      )}

      <SiteHeader
        wishlistCount={0}
        cartCount={cartCount}
        onOpenSearch={() => setToastMessage("Search functionality opening...")}
      />

      <main className="w-full flex-1 pt-20 sm:pt-24">
        <VirtualTryonStudio
          product={activeProduct}
          onClose={() => router.push(`/products/${activeProduct.id}`)}
          onAddToCart={handleAddToCart}
          onSelectProduct={(newP) => {
            setActiveProduct(newP);
            setToastMessage(`Switched outfit to: ${newP.name}`);
          }}
          allProducts={OOTFY_PRODUCTS}
        />
      </main>

      <SiteFooter />
    </div>
  );
}

export default function TryOnPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#fcf9f4]" />}>
      <TryOnContent />
    </Suspense>
  );
}
