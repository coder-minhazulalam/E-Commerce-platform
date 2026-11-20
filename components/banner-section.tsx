"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { lookbookImage } from "../lib/assets";
import { CATALOG_PRODUCTS, formatPrice } from "../lib/products";
import { useBag } from "../lib/cart-context";

export function BannerSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const { addItem, openBag } = useBag();

  const currentOutfit = CATALOG_PRODUCTS[activeIndex] || CATALOG_PRODUCTS[0];

  // Auto-play animation
  useEffect(() => {
    if (!isPlaying) return;
    timerRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % CATALOG_PRODUCTS.length);
    }, 4500);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying]);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % CATALOG_PRODUCTS.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + CATALOG_PRODUCTS.length) % CATALOG_PRODUCTS.length);
  };

  const handleQuickAdd = () => {
    addItem({
      productId: currentOutfit.id,
      slug: currentOutfit.slug,
      name: currentOutfit.name,
      price: currentOutfit.price,
      currency: currentOutfit.currency,
      imageIndex: currentOutfit.imageIndex,
      category: currentOutfit.category,
      size: "M",
      quantity: 1,
    });
    openBag();
  };

  return (
    <section className="central-motion-hero" aria-labelledby="motion-hero-title">
      {/* Background ambient lighting */}
      <div className="motion-ambient motion-ambient--gold" aria-hidden="true" />
      <div className="motion-ambient motion-ambient--silk" aria-hidden="true" />

      {/* Hero Header */}
      <div className="motion-hero__header">
        <div className="motion-badge">
          <span className="motion-badge__dot" />
          <span>SOUTH ASIAN HERITAGE CAPSULE · AUTUMN/WINTER 2026</span>
        </div>
        <h1 id="motion-hero-title" className="motion-hero__title">
          <span>ROYAL SILHOUETTES.</span>
          <span className="motion-title__gradient">SOUTH ASIAN COUTURE.</span>
        </h1>
        <p className="motion-hero__subtitle">
          Handcrafted Banarasi Katan silks, imperial raw silk zardozi, and contemporary bespoke
          tailoring from master artisans across South Asia.
        </p>
      </div>

      {/* CENTRAL ANIMATED MOTION STAGE */}
      <div className="central-stage">
        {/* Animated revolving decorative rings */}
        <div className="stage-rings" aria-hidden="true">
          <span className="stage-ring stage-ring--outer" />
          <span className="stage-ring stage-ring--inner" />
          <span className="stage-ring stage-ring--glow" />
        </div>

        {/* Central Active Featured Outfit Card with Floating Physics */}
        <div className="central-card">
          <div className="central-card__visual">
            <span className="central-card__pill">LOOK 0{currentOutfit.imageIndex + 1} / 09</span>
            <div className="central-card__image-box">
              <Image
                key={currentOutfit.id}
                src={lookbookImage(currentOutfit.imageIndex, 1000)}
                alt={currentOutfit.imageAlt}
                fill
                priority
                sizes="(max-width: 768px) 90vw, 480px"
                className="central-card__img"
              />
            </div>

            {/* Corner metallic brackets */}
            <span className="corner-bracket top-left" aria-hidden="true" />
            <span className="corner-bracket top-right" aria-hidden="true" />
            <span className="corner-bracket bottom-left" aria-hidden="true" />
            <span className="corner-bracket bottom-right" aria-hidden="true" />
          </div>

          {/* Dynamic Floating Glassmorphic Details Bar */}
          <div className="central-card__info-dock">
            <div className="dock-left">
              <span className="dock-category">{currentOutfit.category}</span>
              <h2 className="dock-title">{currentOutfit.name}</h2>
              <p className="dock-desc">{currentOutfit.description}</p>
            </div>

            <div className="dock-right">
              <p className="dock-price">{formatPrice(currentOutfit.price, currentOutfit.currency)}</p>
              <div className="dock-actions">
                <button
                  type="button"
                  onClick={handleQuickAdd}
                  className="dock-btn dock-btn--add"
                  aria-label={`Add ${currentOutfit.name} to bag`}
                >
                  Add to Bag
                </button>
                <Link
                  href={`/products/${currentOutfit.slug}`}
                  className="dock-btn dock-btn--view"
                  aria-label={`View full details of ${currentOutfit.name}`}
                >
                  View Piece ↗
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Orbiting / Satellite Outfit Navigation Chips with Motion */}
        <div className="stage-chips" role="tablist" aria-label="Select South Asian outfit">
          {CATALOG_PRODUCTS.map((prod, idx) => (
            <button
              key={prod.id}
              role="tab"
              aria-selected={idx === activeIndex}
              onClick={() => {
                setActiveIndex(idx);
                setIsPlaying(false);
              }}
              className={`stage-chip stage-chip--${idx + 1} ${idx === activeIndex ? "stage-chip--active" : ""}`}
            >
              <span className="stage-chip__num">0{idx + 1}</span>
              <span className="stage-chip__name">{prod.category}</span>
            </button>
          ))}
        </div>

        {/* Central Motion Controls */}
        <div className="central-controls">
          <button
            type="button"
            onClick={handlePrev}
            className="ctrl-btn ctrl-btn--arrow"
            aria-label="Previous outfit"
          >
            ←
          </button>

          <button
            type="button"
            onClick={() => setIsPlaying(!isPlaying)}
            className={`ctrl-btn ctrl-btn--play ${isPlaying ? "ctrl-btn--playing" : ""}`}
            aria-label={isPlaying ? "Pause auto-rotation" : "Play auto-rotation"}
          >
            <span className="play-pulse" />
            <span>{isPlaying ? "AUTO-MOTION ON" : "PAUSED"}</span>
          </button>

          <button
            type="button"
            onClick={handleNext}
            className="ctrl-btn ctrl-btn--arrow"
            aria-label="Next outfit"
          >
            →
          </button>
        </div>
      </div>

      {/* Bottom Value Highlights Strip */}
      <div className="motion-hero__footer">
        <div className="motion-feature">
          <span className="feature-icon">✦</span>
          <div>
            <h4>Master Artisan Craft</h4>
            <p>Varanasi, Lucknow, Chanderi & Bengal weaving heritage</p>
          </div>
        </div>
        <div className="motion-feature">
          <span className="feature-icon">◈</span>
          <div>
            <h4>100% Pure Natural Silks</h4>
            <p>Mulberry, wild Tussar, organza & Himalayan Pashmina</p>
          </div>
        </div>
        <div className="motion-feature">
          <span className="feature-icon">→</span>
          <div>
            <h4>Global Carbon-Neutral Dispatch</h4>
            <p>Worldwide insured delivery with complimentary shipping over $150</p>
          </div>
        </div>
      </div>
    </section>
  );
}
