"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { lookbookImage } from "../lib/assets";
import { formatPrice } from "../lib/products";

export function BannerSection() {
  return (
    <section className="banner" aria-labelledby="banner-title">
      <div className="banner__copy">
        <p className="eyebrow">New collection · Vol. 02</p>
        <h1 className="banner__title" id="banner-title">
          Clothes that earn<br />their place.
        </h1>
        <p className="banner__lead">
          A considered edit of natural-fibre pieces built for repeat wear —
          not for a moment, but for the years ahead.
        </p>
        <div className="banner__actions">
          <Link href="/products" className="banner__btn banner__btn--primary">
            Shop the collection
          </Link>
          <Link href="/collections" className="banner__btn banner__btn--ghost">
            View lookbook
          </Link>
        </div>
      </div>

      <div className="banner__visual" aria-label="Editorial campaign portrait">
        <span className="banner__ring" aria-hidden="true" />
        <div className="banner__image-wrap">
          <Image
            src={lookbookImage(0, 1080)}
            alt="Model in the Wool Overcoat — natural stone colourway"
            fill
            priority
            sizes="(max-width: 640px) 88vw, (max-width: 1024px) 50vw, 540px"
            className="banner__model"
          />
        </div>
        <Link
          href="/products/wool-overcoat"
          className="banner__tag"
          aria-label="View featured piece: The Wool Overcoat, $285"
        >
          <span className="banner__tag-dot" aria-hidden="true" />
          <div className="banner__tag-text">
            <span className="banner__tag-label">The Wool Overcoat</span>
            <span className="banner__tag-price">{formatPrice(285, "USD")}</span>
          </div>
          <span className="banner__tag-arrow" aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
}
