import React from "react";
import Image from "next/image";
import Link from "next/link";
import { lookbookImage } from "../lib/assets";
import { NINE_COLLECTIONS } from "../lib/collections";

export function CollectionsPreview() {
  const featured = [NINE_COLLECTIONS[0], NINE_COLLECTIONS[1], NINE_COLLECTIONS[4]];

  return (
    <section className="olaf-section" aria-labelledby="coll-prev-heading">
      <header className="olaf-section__header">
        <div className="olaf-section__title-group">
          <p className="olaf-section__label">HERITAGE CAPSULES</p>
          <h2 id="coll-prev-heading" className="olaf-section__title">
            NINE EDITORIAL LOOKS
          </h2>
        </div>
        <Link href="/collections" className="olaf-section__link">
          All 09 Looks <span aria-hidden="true">→</span>
        </Link>
      </header>

      <div className="olaf-collections-grid" role="list">
        {featured.map((col) => (
          <article key={col.id} className="olaf-col-card" role="listitem">
            <Link
              href={`/collections/${col.slug}`}
              className="olaf-col-card__link"
              aria-label={`View ${col.title} collection`}
            >
              <div className="olaf-col-card__media">
                <span className="olaf-col-card__pill">LOOK 0{col.number}</span>
                <Image
                  src={lookbookImage(col.imageIndex, 720)}
                  alt={col.imageAlt}
                  fill
                  sizes="(max-width: 640px) 100vw, 33vw"
                  className="olaf-col-card__img"
                />
                <div className="olaf-col-card__overlay">
                  <span>Explore Lookbook Capsule ↗</span>
                </div>
              </div>
              <div className="olaf-col-card__meta">
                <div className="olaf-col-card__meta-top">
                  <p className="olaf-col-card__tag">HERITAGE EDIT</p>
                  <p className="olaf-col-card__season">AW / 26</p>
                </div>
                <h3 className="olaf-col-card__title">{col.title}</h3>
                <p className="olaf-col-card__sub">{col.subtitle}</p>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
