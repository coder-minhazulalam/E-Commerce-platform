import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { OOTFY_PRODUCTS, getProductById, formatPriceBDT } from "../../../lib/products";
import { PRODUCT_IMAGE_MAP } from "../../../components/product-card";
import { ProductDetailsClient } from "./product-details-client";

export function generateStaticParams() {
  return OOTFY_PRODUCTS.map((product) => ({
    id: product.id,
  }));
}

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = OOTFY_PRODUCTS.find((p) => p.id === id) || (await getProductById(id));

  if (!product) {
    notFound();
  }

  // Find related products (same category or gender)
  const relatedProducts = OOTFY_PRODUCTS.filter(
    (p) => p.id !== product.id && (p.category === product.category || p.gender === product.gender)
  ).slice(0, 4);

  const fallbackHero = PRODUCT_IMAGE_MAP[product.id] || product.images?.hero_flatlay || "/assets/products/jamdani-saree-clean.jpg";

  return (
    <ProductDetailsClient
      product={product}
      fallbackHero={fallbackHero}
      relatedProducts={relatedProducts}
    />
  );
}
