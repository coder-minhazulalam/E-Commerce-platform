import React from "react";
import Image from "next/image";
import Link from "next/link";
import { lookbookImage } from "../lib/assets";
import { getFeaturedProducts, formatPrice } from "../lib/products";

export function FeaturedProducts() {
  const featured = getFeaturedProducts().slice(0, 4);

  return (
    <section className="featured-products" aria-labelledby="fp-heading">
      <header className="section-header">
        <div>
          <p className="section-index">03 / New this season</p>
          <h2 id="fp-heading" className="section-title">
            Pieces worth knowing.
          </h2>
        </div>
        <Link href="/products" className="section-all-link">
          See all products →
        </Link>
      </header>

      <div className="featured-products__grid" role="list">
        {featured.map((product) => (
          <article key={product.id} className="fp-card" role="listitem">
            <Link href={`/products/${product.slug}`} className="fp-card__link" aria-label={`View ${product.name}`}>
              <div className="fp-card__media">
                <Image
                  src={lookbookImage(product.imageIndex, 720)}
                  alt={product.imageAlt}
                  fill
                  sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 25vw"
                  className="fp-card__img"
                />
              </div>
              <div className="fp-card__meta">
                <div>
                  <p className="fp-card__category">{product.category}</p>
                  <h3 className="fp-card__name">{product.name}</h3>
                </div>
                <p className="fp-card__price">{formatPrice(product.price, product.currency)}</p>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
