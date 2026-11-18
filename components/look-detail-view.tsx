"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { lookbookImage } from "../lib/assets";
import { NINE_LOOKS, getAdjacentLooks, type Look, type LookItemDot } from "../lib/looks";
import { formatPrice, getLocalProduct, type Product } from "../lib/products";

interface LookDetailViewProps {
  lookId: string;
}

export function LookDetailView({ lookId }: LookDetailViewProps) {
  const normalized = lookId.toLowerCase();
  const look = NINE_LOOKS.find(
    (l) =>
      l.id.toLowerCase() === normalized ||
      l.slug.toLowerCase() === normalized ||
      String(l.lookNumber) === normalized,
  );

  const [activeDotId, setActiveDotId] = useState<string | null>(null);

  if (!look) {
    return (
      <div className="detail-error" role="alert">
        <h2>Look not found</h2>
        <p>The requested look is not part of this nine-look edit.</p>
        <Link href="/looks">← Return to the Lookbook</Link>
      </div>
    );
  }

  const { prev, next } = getAdjacentLooks(look.slug);
  const lookProducts: Product[] = look.productIds
    .map((id) => getLocalProduct(id))
    .filter((p): p is Product => p !== undefined);

  return (
    <article className="look-detail-container" aria-label={`Look 0${look.lookNumber}: ${look.title}`}>
      {/* Top breadcrumb & navigation bar */}
      <nav className="look-detail__nav" aria-label="Look navigation">
        <Link href="/looks" className="look-detail__back-link">
          ← All nine looks
        </Link>
        <div className="look-detail__pagination">
          <Link
            href={`/looks/${prev.slug}`}
            className="look-detail__pag-btn"
            aria-label={`Previous look: Look 0${prev.lookNumber} ${prev.title}`}
          >
            ← 0{prev.lookNumber}
          </Link>
          <span className="look-detail__counter">
            0{look.lookNumber} / 09
          </span>
          <Link
            href={`/looks/${next.slug}`}
            className="look-detail__pag-btn"
            aria-label={`Next look: Look 0${next.lookNumber} ${next.title}`}
          >
            0{next.lookNumber} →
          </Link>
        </div>
      </nav>

      <div className="look-detail__layout">
        {/* Interactive Model Visual */}
        <div className="look-detail__media-wrapper">
          <span className="focus-viewer__ring" aria-hidden="true" />
          <div className="look-detail__media">
            <Image
              src={lookbookImage(look.imageIndex, 1080)}
              alt={look.imageAlt}
              fill
              priority
              sizes="(max-width: 850px) 90vw, 560px"
              className="look-detail__image"
            />

            {/* Interactive item dots */}
            <div className="focus-viewer__dots" aria-label="Tagged items on look">
              {look.itemDots.map((dot: LookItemDot) => {
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
                          href={`/shop/${product.slug}`}
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

        {/* Look Information & Detailed Pieces List */}
        <div className="look-detail__content">
          <header className="look-detail__header">
            <p className="section-index">Look 0{look.lookNumber} / 09</p>
            <h1 className="look-detail__title">{look.title}</h1>
            <p className="eyebrow">{look.subtitle}</p>
            <p className="look-detail__description">{look.description}</p>
          </header>

          <section className="look-detail__pieces" aria-labelledby="pieces-heading">
            <h2 id="pieces-heading" className="look-detail__pieces-title">
              Tagged Pieces ({lookProducts.length})
            </h2>

            <div className="look-detail__pieces-list" role="list">
              {lookProducts.map((prod) => {
                const matchingDot = look.itemDots.find((d) => d.productId === prod.id);
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
                      href={`/shop/${prod.slug}`}
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
            <Link href="/shop" className="hero__button" style={{ display: "inline-block", textAlign: "center" }}>
              Shop all pieces
            </Link>
          </footer>
        </div>
      </div>
    </article>
  );
}
