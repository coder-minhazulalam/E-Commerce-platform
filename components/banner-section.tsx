"use client";

import React, { useState } from "react";
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
        <Image
          src={lookbookImage(0, 1080)}
          alt="Model in the Wool Overcoat — natural stone colourway"
          fill
          priority
          sizes="(max-width: 850px) 92vw, 52vw"
          className="banner__model"
        />
        <div className="banner__tag" aria-label="Featured product tag">
          <span className="banner__tag-label">The Wool Overcoat</span>
          <span className="banner__tag-price">{formatPrice(285, "USD")}</span>
        </div>
      </div>
    </section>
  );
}
