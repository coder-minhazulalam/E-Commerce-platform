import React from "react";
import Image from "next/image";
import Link from "next/link";
import { lookbookImage } from "../lib/assets";
import { NINE_COLLECTIONS } from "../lib/collections";

export function CollectionsPreview() {
  const featured = [NINE_COLLECTIONS[0], NINE_COLLECTIONS[4], NINE_COLLECTIONS[6]];

  return (
    <section className="collections-preview" aria-labelledby="coll-prev-heading">
      <header className="section-header">
        <div>
          <p className="section-index">02 / Collections</p>
          <h2 id="coll-prev-heading" className="section-title">
            Nine looks. Season-spanning.
          </h2>
        </div>
        <Link href="/collections" className="section-all-link">
          View all nine →
        </Link>
      </header>

      <div className="collections-preview__grid" role="list">
        {featured.map((col) => (
          <article key={col.id} className="col-preview-card" role="listitem">
            <Link href={`/collections/${col.slug}`} className="col-preview-card__link" aria-label={`View ${col.title} collection`}>
              <div className="col-preview-card__media">
                <span className="col-preview-card__badge">0{col.number}</span>
                <Image
                  src={lookbookImage(col.imageIndex, 720)}
                  alt={col.imageAlt}
                  fill
                  sizes="(max-width: 640px) 90vw, 33vw"
                  className="col-preview-card__img"
                />
              </div>
              <div className="col-preview-card__body">
                <p className="col-preview-card__sub">{col.subtitle}</p>
                <h3 className="col-preview-card__title">{col.title}</h3>
                <span className="col-preview-card__cta">View collection →</span>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
