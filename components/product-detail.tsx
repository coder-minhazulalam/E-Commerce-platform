"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { lookbookImage } from "../lib/assets";
import { formatPrice, getProduct, type Product } from "../lib/products";
import { useBag } from "../lib/cart-context";

const SIZES = ["XS", "S", "M", "L", "XL"];

export function ProductDetail({ slug }: { slug: string }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [state, setState] = useState<"loading" | "ready" | "error">("loading");
  const [selectedSize, setSelectedSize] = useState<string>("M");
  const [quantity, setQuantity] = useState<number>(1);
  const [isAdding, setIsAdding] = useState(false);
  const { addItem } = useBag();

  useEffect(() => {
    const controller = new AbortController();
    setState("loading");
    getProduct(slug, controller.signal)
      .then((value) => {
        setProduct(value);
        setState("ready");
      })
      .catch((error: unknown) => {
        if (!(error instanceof DOMException && error.name === "AbortError")) {
          setState("error");
        }
      });
    return () => controller.abort();
  }, [slug]);

  const handleAddToBag = () => {
    if (!product) return;
    setIsAdding(true);
    addItem({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      currency: product.currency,
      size: selectedSize,
      quantity,
      imageIndex: product.imageIndex,
      category: product.category,
    });
    setTimeout(() => setIsAdding(false), 600);
  };

  if (state === "loading") {
    return <p className="catalog-message" role="status">Opening the piece…</p>;
  }

  if (state === "error" || !product) {
    return (
      <section className="detail-error" role="alert">
        <p>This piece is not available right now.</p>
        <Link href="/products">Return to products</Link>
      </section>
    );
  }

  return (
    <article className="product-detail">
      <div className="product-detail__image">
        <Image
          src={lookbookImage(product.imageIndex, 1100)}
          alt={product.imageAlt}
          fill
          priority
          sizes="(max-width: 800px) 100vw, 55vw"
        />
      </div>
      <div className="product-detail__copy">
        <p className="section-index">{product.category}</p>
        <h1>{product.name}</h1>
        <p className="product-detail__price">{formatPrice(product.price, product.currency)}</p>
        <p className="product-detail__description">{product.description}</p>

        {/* Purchase Options: Size Selection & Add to Bag */}
        <div className="product-purchase-box" aria-label="Purchase options">
          <div className="size-selector">
            <div className="size-selector__header">
              <span className="size-selector__label">Select Size</span>
              <span className="size-selector__guide">Size Guide</span>
            </div>
            <div className="size-options" role="radiogroup" aria-label="Available sizes">
              {SIZES.map((size) => (
                <button
                  key={size}
                  type="button"
                  role="radio"
                  aria-checked={selectedSize === size}
                  className={`size-btn ${selectedSize === size ? "size-btn--selected" : ""}`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="purchase-action-row">
            <div className="qty-picker" aria-label="Item quantity">
              <button
                type="button"
                className="qty-picker__btn"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                aria-label="Decrease quantity"
              >
                −
              </button>
              <span className="qty-picker__num">{quantity}</span>
              <button
                type="button"
                className="qty-picker__btn"
                onClick={() => setQuantity((q) => q + 1)}
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>

            <button
              type="button"
              className="banner__btn banner__btn--primary add-to-bag-btn"
              onClick={handleAddToBag}
            >
              {isAdding ? "Adding to Bag…" : `Add to Bag · ${formatPrice(product.price * quantity, product.currency)}`}
            </button>
          </div>

          <p className="stock-notice">
            <span className="stock-dot" aria-hidden="true" />
            In stock · Complimentary shipping over $150
          </p>
        </div>

        <p className="detail-note">A considered piece, ready for wherever the day takes you.</p>
        <Link className="hero__text-link" href="/products">
          ← Back to products
        </Link>
      </div>
    </article>
  );
}
