"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { lookbookImage } from "../lib/assets";
import { NINE_COLLECTIONS, getAdjacentCollections, type Collection, type CollectionItemDot } from "../lib/collections";
import { formatPrice, getLocalProduct, type Product } from "../lib/products";

interface CollectionDetailViewProps {
  slug: string;
}

export function CollectionDetailView({ slug }: CollectionDetailViewProps) {
  const normalized = slug.toLowerCase();
  const collection = NINE_COLLECTIONS.find(
    (c) =>
      c.id.toLowerCase() === normalized ||
      c.slug.toLowerCase() === normalized ||
      String(c.number) === normalized,
  );

  const [activeDotId, setActiveDotId] = useState<string | null>(null);

  if (!collection) {
    return (
      <div className="detail-error" role="alert">
        <h2>Collection not found</h2>
        <p>The requested collection is not part of this nine-piece edit.</p>
        <Link href="/collections">← Return to Collections</Link>
      </div>
    );
  }

  const { prev, next } = getAdjacentCollections(collection.slug);
  const collectionProducts: Product[] = collection.productIds
    .map((id) => getLocalProduct(id))
    .filter((p): p is Product => p !== undefined);

  return (
    <article className="look-detail-container" aria-label={`Collection 0${collection.number}: ${collection.title}`}>
      {/* Top breadcrumb & navigation bar */}
      <nav className="look-detail__nav" aria-label="Collection navigation">
        <Link href="/collections" className="look-detail__back-link">
          ← All nine collections
        </Link>
        <div className="look-detail__pagination">
          <Link
            href={`/collections/${prev.slug}`}
            className="look-detail__pag-btn"
            aria-label={`Previous collection: Collection 0${prev.number} ${prev.title}`}
          >
            ← 0{prev.number}
          </Link>
          <span className="look-detail__counter">
            0{collection.number} / 09
          </span>
          <Link
            href={`/collections/${next.slug}`}
            className="look-detail__pag-btn"
            aria-label={`Next collection: Collection 0${next.number} ${next.title}`}
          >
            0{next.number} →
          </Link>
        </div>
      </nav>

      <div className="look-detail__layout">
        {/* Interactive Model Visual */}
        <div className="look-detail__media-wrapper">
          <span className="focus-viewer__ring" aria-hidden="true" />
          <div className="look-detail__media">
            <Image
              src={lookbookImage(collection.imageIndex, 1080)}
              alt={collection.imageAlt}
              fill
              priority
              sizes="(max-width: 850px) 90vw, 560px"
              className="look-detail__image"
            />

            {/* Interactive item dots */}
            <div className="focus-viewer__dots" aria-label="Tagged items on collection">
              {collection.itemDots.map((dot: CollectionItemDot) => {
                const isDotActive = activeDotId === dot.id;
                const product = getLocalProduct(dot.productId);

                return (
                  <div
                    key={dot.id}
                    className="item-dot-wrapper"
                    style={{ left: `${dot.x}%`, top: `${dot.y}%` }}
                  >
                    <button
                      type="button"
                      className={`item-dot ${isDotActive ? "item-dot--active" : ""}`}
                      aria-label={`Item: ${dot.label}`}
                      aria-expanded={isDotActive}
                      onClick={() =>
                        setActiveDotId(isDotActive ? null : dot.id)
                      }
                      onMouseEnter={() => setActiveDotId(dot.id)}
                      onFocus={() => setActiveDotId(dot.id)}
                    >
                      <span className="item-dot__pulse" aria-hidden="true" />
                      <span className="item-dot__core" aria-hidden="true" />
                    </button>

                    {isDotActive && product && (
                      <div
                        className="item-dot__tooltip"
                        role="tooltip"
                        onMouseLeave={() => setActiveDotId(null)}
                      >
                        <p className="item-dot__category">{product.category}</p>
                        <h4 className="item-dot__name">{product.name}</h4>
                        <p className="item-dot__price">
                          {formatPrice(product.price, product.currency)}
                        </p>
                        <Link
                          href={`/products/${product.slug}`}
                          className="item-dot__link"
                        >
                          View piece →
                        </Link>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Collection Information & Detailed Pieces List */}
        <div className="look-detail__content">
          <header className="look-detail__header">
            <p className="section-index">Collection 0{collection.number} / 09</p>
            <h1 className="look-detail__title">{collection.title}</h1>
            <p className="eyebrow">{collection.subtitle}</p>
            <p className="look-detail__description">{collection.description}</p>
          </header>

          <section className="look-detail__pieces" aria-labelledby="pieces-heading">
            <h2 id="pieces-heading" className="look-detail__pieces-title">
              Tagged Pieces ({collectionProducts.length})
            </h2>

            <div className="look-detail__pieces-list" role="list">
              {collectionProducts.map((prod) => {
                const matchingDot = collection.itemDots.find((d) => d.productId === prod.id);
                const isHovered = matchingDot && activeDotId === matchingDot.id;

                return (
                  <div
                    key={prod.id}
                    role="listitem"
                    className={`look-piece-card ${isHovered ? "look-piece-card--highlighted" : ""}`}
                    onMouseEnter={() => matchingDot && setActiveDotId(matchingDot.id)}
                    onMouseLeave={() => setActiveDotId(null)}
                  >
                    <div className="look-piece-card__meta">
                      <p className="look-piece-card__cat">{prod.category}</p>
                      <h3 className="look-piece-card__name">{prod.name}</h3>
                      <p className="look-piece-card__price">
                        {formatPrice(prod.price, prod.currency)}
                      </p>
                    </div>
                    <Link
                      href={`/products/${prod.slug}`}
                      className="look-piece-card__action"
                      aria-label={`View details for ${prod.name}`}
                    >
                      View piece →
                    </Link>
                  </div>
                );
              })}
            </div>
          </section>

          <footer className="look-detail__footer">
            <Link href="/products" className="hero__button" style={{ display: "inline-block", textAlign: "center" }}>
              Shop all pieces
            </Link>
          </footer>
        </div>
      </div>
    </article>
  );
}
