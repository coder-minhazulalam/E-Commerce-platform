import React from "react";
import Image from "next/image";
import Link from "next/link";
import { lookbookImage } from "../lib/assets";
import { getFeaturedProducts, formatPrice } from "../lib/products";

export function FeaturedProducts() {
  const featured = getFeaturedProducts().slice(0, 4);

  return (
    <section className="olaf-section" aria-labelledby="fp-heading">
      <header className="olaf-section__header">
        <div className="olaf-section__title-group">
          <p className="olaf-section__label">CORE PIECES</p>
          <h2 id="fp-heading" className="olaf-section__title">
            THE EVERYDAY UNIFORM
          </h2>
        </div>
        <Link href="/products" className="olaf-section__link">
          Complete Catalog <span aria-hidden="true">→</span>
        </Link>
      </header>

      <div className="olaf-products-grid" role="list">
        {featured.map((product) => (
          <article key={product.id} className="olaf-prod-card" role="listitem">
            <Link
              href={`/products/${product.slug}`}
              className="olaf-prod-card__link"
              aria-label={`View ${product.name}`}
            >
              <div className="olaf-prod-card__media">
                <span className="olaf-prod-card__badge">{product.category}</span>
                <Image
                  src={lookbookImage(product.imageIndex, 720)}
                  alt={product.imageAlt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="olaf-prod-card__img"
                />
                <div className="olaf-prod-card__hover-cta">
                  <span>View Details ↗</span>
                </div>
              </div>

              <div className="olaf-prod-card__meta">
                <div className="olaf-prod-card__info">
                  <h3 className="olaf-prod-card__name">{product.name}</h3>
                  <p className="olaf-prod-card__desc">{product.description}</p>
                </div>
                <p className="olaf-prod-card__price">
                  {formatPrice(product.price, product.currency)}
                </p>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
