"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { lookbookImage } from "../lib/assets";

export function BannerSection() {
  return (
    <section className="olaf-hero" aria-labelledby="hero-title">
      {/* Top capsule ticker */}
      <div className="olaf-hero__ticker">
        <span className="ticker-pill">AUTUMN / WINTER 2026</span>
        <span className="ticker-divider">·</span>
        <span className="ticker-text">CONTEMPORARY UNIFORMS</span>
        <span className="ticker-divider">·</span>
        <span className="ticker-text">DESIGNED IN AMSTERDAM</span>
      </div>

      <div className="olaf-hero__grid">
        {/* Left column: Editorial copy & CTAs */}
        <div className="olaf-hero__copy">
          <p className="olaf-hero__index">DROP 01 / 04 — CORE CAPSULE</p>
          <h1 id="hero-title" className="olaf-hero__title">
            <span>TIMELESS</span>
            <span>SILHOUETTES.</span>
            <span className="title-highlight">STREETWEAR</span>
            <span>REFINED.</span>
          </h1>

          <p className="olaf-hero__desc">
            An intentional edit of structured outerwear, heavyweight knitwear, and architectural
            everyday cuts. Conceived in Amsterdam with uncompromised material honesty.
          </p>

          <div className="olaf-hero__actions">
            <Link href="/products" className="olaf-btn olaf-btn--primary">
              Shop collection <span aria-hidden="true">↗</span>
            </Link>
            <Link href="/collections" className="olaf-btn olaf-btn--outline">
              View lookbook [09]
            </Link>
          </div>

          <div className="olaf-hero__badges">
            <div className="olaf-badge">
              <span className="olaf-badge__number">01</span>
              <span className="olaf-badge__text">Natural Fibers Only</span>
            </div>
            <div className="olaf-badge">
              <span className="olaf-badge__number">02</span>
              <span className="olaf-badge__text">Unisex Relaxed Cut</span>
            </div>
            <div className="olaf-badge">
              <span className="olaf-badge__number">03</span>
              <span className="olaf-badge__text">Free Delivery $150+</span>
            </div>
          </div>
        </div>

        {/* Right column: Editorial imagery with floating tag */}
        <div className="olaf-hero__visual">
          <div className="olaf-hero__frame">
            <div className="olaf-hero__meta-corner top-left">
              <span>EDITION NO. 01</span>
            </div>
            <div className="olaf-hero__meta-corner top-right">
              <span>AW / 26</span>
            </div>

            <div className="olaf-hero__img-wrap">
              <Image
                src={lookbookImage(0, 1200)}
                alt="Model wearing the Wool Overcoat in an editorial studio setting"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                className="olaf-hero__img"
              />
            </div>

            {/* Floating garment tag */}
            <Link
              href="/products/wool-overcoat"
              className="olaf-tag"
              aria-label="View featured piece: The Wool Overcoat"
            >
              <div className="olaf-tag__bar">
                <span className="olaf-tag__dot" />
                <span className="olaf-tag__sku">SKU #EE-W01</span>
              </div>
              <div className="olaf-tag__body">
                <p className="olaf-tag__name">The Wool Overcoat</p>
                <p className="olaf-tag__price">$285.00 · Charcoal</p>
              </div>
              <span className="olaf-tag__arrow" aria-hidden="true">
                ↗
              </span>
            </Link>

            <div className="olaf-hero__meta-corner bottom-left">
              <span>AMSTERDAM</span>
            </div>
            <div className="olaf-hero__meta-corner bottom-right">
              <span>LOOK 01 / 09</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
