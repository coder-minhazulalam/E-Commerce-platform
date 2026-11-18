"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { lookbookImage } from "../lib/assets";
import { NINE_LOOKS, type Look, type LookItemDot } from "../lib/looks";
import { formatPrice, getLocalProduct, type Product } from "../lib/products";

interface LookbookViewerProps {
  initialLookId?: string;
  initialViewMode?: "ring" | "grid";
  compact?: boolean;
}

export function LookbookViewer({
  initialLookId,
  initialViewMode = "ring",
  compact = false,
}: LookbookViewerProps) {
  const [viewMode, setViewMode] = useState<"ring" | "grid">(initialViewMode);
  const [activeIndex, setActiveIndex] = useState<number>(() => {
    if (initialLookId) {
      const idx = NINE_LOOKS.findIndex(
        (l) =>
          l.id.toLowerCase() === initialLookId.toLowerCase() ||
          l.slug.toLowerCase() === initialLookId.toLowerCase(),
      );
      return idx >= 0 ? idx : 0;
    }
    return 0;
  });

  const [activeDotId, setActiveDotId] = useState<string | null>(null);
  const viewerRef = useRef<HTMLDivElement>(null);

  const activeLook = NINE_LOOKS[activeIndex] || NINE_LOOKS[0];

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + NINE_LOOKS.length) % NINE_LOOKS.length);
    setActiveDotId(null);
  }, []);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % NINE_LOOKS.length);
    setActiveDotId(null);
  }, []);

  const handleSelectLook = (index: number) => {
    setActiveIndex(index);
    setActiveDotId(null);
    if (viewMode === "grid") {
      setViewMode("ring");
    }
  };

  // Keyboard navigation for Ring View
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      // Don't intercept if focus is inside an input/select
      if (
        document.activeElement?.tagName === "INPUT" ||
        document.activeElement?.tagName === "SELECT" ||
        document.activeElement?.tagName === "TEXTAREA"
      ) {
        return;
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        handlePrev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        handleNext();
      } else if (e.key === "Escape") {
        setActiveDotId(null);
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [handlePrev, handleNext]);

  return (
    <section
      ref={viewerRef}
      className={`lookbook-viewer ${compact ? "lookbook-viewer--compact" : ""}`}
      aria-label="Editorial Lookbook"
    >
      {/* Live announcement for assistive tech */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {`Viewing look 0${activeLook.lookNumber} of 09: ${activeLook.title}`}
      </div>

      {/* Header controls: Lookbook headline & Mode Switcher */}
      <div className="lookbook-controls">
        <div className="lookbook-controls__meta">
          <p className="section-index">
            {`Look 0${activeLook.lookNumber} / 09`}
          </p>
          <span className="lookbook-controls__title-tag">{activeLook.title}</span>
        </div>

        <div
          className="view-mode-toggle"
          role="tablist"
          aria-label="Lookbook layout style"
        >
          <button
            type="button"
            role="tab"
            aria-selected={viewMode === "ring"}
            className={`view-mode-btn ${viewMode === "ring" ? "view-mode-btn--active" : ""}`}
            onClick={() => setViewMode("ring")}
          >
            Ring view
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={viewMode === "grid"}
            className={`view-mode-btn ${viewMode === "grid" ? "view-mode-btn--active" : ""}`}
            onClick={() => setViewMode("grid")}
          >
            Grid view
          </button>
        </div>
      </div>

      {viewMode === "ring" ? (
        <div className="ring-view">
          {/* Circular / Orbital Navigation Strip */}
          <nav className="ring-nav" aria-label="Nine looks selector">
            <button
              type="button"
              className="ring-nav__arrow ring-nav__arrow--prev"
              onClick={handlePrev}
              aria-label="Previous look (Left Arrow)"
              title="Previous look"
            >
              ←
            </button>

            <div className="ring-nav__dial" role="tablist" aria-label="Looks index">
              {NINE_LOOKS.map((look, idx) => {
                const isActive = idx === activeIndex;
                return (
                  <button
                    key={look.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-label={`Look 0${look.lookNumber}: ${look.title}`}
                    className={`ring-nav__pill ${isActive ? "ring-nav__pill--active" : ""}`}
                    onClick={() => handleSelectLook(idx)}
                  >
                    <span className="ring-nav__num">{`0${look.lookNumber}`}</span>
                    <span className="ring-nav__label">{look.title}</span>
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              className="ring-nav__arrow ring-nav__arrow--next"
              onClick={handleNext}
              aria-label="Next look (Right Arrow)"
              title="Next look"
            >
              →
            </button>
          </nav>

          {/* Active Focus Look Viewer */}
          <div className="focus-viewer">
            {/* Visual stage with ring and interactive model */}
            <div className="focus-viewer__stage" aria-label={`Model portrait for ${activeLook.title}`}>
              <span className="focus-viewer__ring" aria-hidden="true" />

              <div className="focus-viewer__media">
                <Image
                  src={lookbookImage(activeLook.imageIndex, 980)}
                  alt={activeLook.imageAlt}
                  fill
                  priority
                  sizes="(max-width: 850px) 92vw, 580px"
                  className="focus-viewer__image"
                />

                {/* Interactive Item Dots */}
                <div className="focus-viewer__dots" aria-label="Tagged items on look">
                  {activeLook.itemDots.map((dot: LookItemDot) => {
                    const isDotActive = activeDotId === dot.id;
                    const product: Product | undefined = getLocalProduct(dot.productId);

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

                        {/* Interactive Tooltip Card */}
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

            {/* Look editorial details and product pills */}
            <div className="focus-viewer__details">
              <div className="focus-viewer__header">
                <p className="eyebrow">{activeLook.subtitle}</p>
                <h3 className="focus-viewer__title">{activeLook.title}</h3>
                <p className="focus-viewer__description">{activeLook.description}</p>
              </div>

              {/* Product Pills */}
              <div className="product-pills-section">
                <p className="product-pills__label">Pieces in this look</p>
                <div className="product-pills" role="list">
                  {activeLook.itemDots.map((dot) => {
                    const product = getLocalProduct(dot.productId);
                    if (!product) return null;
                    const isHighlighted = activeDotId === dot.id;

                    return (
                      <div
                        key={dot.id}
                        role="listitem"
                        className={`product-pill ${isHighlighted ? "product-pill--highlighted" : ""}`}
                        onMouseEnter={() => setActiveDotId(dot.id)}
                        onMouseLeave={() => setActiveDotId(null)}
                        onFocus={() => setActiveDotId(dot.id)}
                      >
                        <Link href={`/shop/${product.slug}`} className="product-pill__link">
                          <span className="product-pill__dot" aria-hidden="true" />
                          <span className="product-pill__name">{product.name}</span>
                          <span className="product-pill__price">
                            {formatPrice(product.price, product.currency)}
                          </span>
                        </Link>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Quick actions: deep link to look detail */}
              <div className="focus-viewer__actions">
                <Link
                  href={`/looks/${activeLook.slug}`}
                  className="focus-viewer__cta"
                >
                  Inspect look details →
                </Link>
                <Link href="/shop" className="hero__text-link">
                  Browse entire catalog
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Grid View: 9 editorial looks in responsive layout */
        <div className="looks-grid" role="tabpanel" aria-label="Nine looks gallery">
          {NINE_LOOKS.map((look, idx) => {
            const isCurrentlyActive = idx === activeIndex;
            return (
              <article
                key={look.id}
                className={`look-card ${isCurrentlyActive ? "look-card--selected" : ""}`}
              >
                <div className="look-card__media">
                  <span className="look-card__badge">{`0${look.lookNumber}`}</span>
                  <Image
                    src={lookbookImage(look.imageIndex, 540)}
                    alt={look.imageAlt}
                    fill
                    sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
                    className="look-card__img"
                  />
                </div>

                <div className="look-card__body">
                  <p className="look-card__subtitle">{look.subtitle}</p>
                  <h3 className="look-card__title">{look.title}</h3>
                  <p className="look-card__desc">{look.description}</p>

                  <div className="look-card__footer">
                    <span className="look-card__items-count">
                      {`${look.productIds.length} pieces`}
                    </span>
                    <div className="look-card__actions">
                      <button
                        type="button"
                        className="look-card__focus-btn"
                        onClick={() => handleSelectLook(idx)}
                      >
                        Focus in ring
                      </button>
                      <Link
                        href={`/looks/${look.slug}`}
                        className="look-card__view-link"
                      >
                        Look page →
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}
