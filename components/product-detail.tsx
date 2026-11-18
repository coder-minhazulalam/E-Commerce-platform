"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { lookbookImage } from "../lib/assets";
import { formatPrice, getProduct, type Product } from "../lib/products";

export function ProductDetail({ slug }: { slug: string }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [state, setState] = useState<"loading" | "ready" | "error">("loading");
  useEffect(() => {
    const controller = new AbortController(); setState("loading");
    getProduct(slug, controller.signal).then((value) => { setProduct(value); setState("ready"); }).catch((error: unknown) => { if (!(error instanceof DOMException && error.name === "AbortError")) setState("error"); });
    return () => controller.abort();
  }, [slug]);
  if (state === "loading") return <p className="catalog-message" role="status">Opening the piece…</p>;
  if (state === "error" || !product) return <section className="detail-error" role="alert"><p>This piece is not available right now.</p><Link href="/shop">Return to the edit</Link></section>;
  return <article className="product-detail"><div className="product-detail__image"><Image src={lookbookImage(product.imageIndex, 1100)} alt={product.imageAlt} fill priority sizes="(max-width: 800px) 100vw, 55vw" /></div><div className="product-detail__copy"><p className="section-index">{product.category}</p><h1>{product.name}</h1><p className="product-detail__price">{formatPrice(product.price, product.currency)}</p><p className="product-detail__description">{product.description}</p><p className="detail-note">A considered piece, ready for wherever the day takes you.</p><Link className="hero__text-link" href="/shop">← Back to the edit</Link></div></article>;
}
