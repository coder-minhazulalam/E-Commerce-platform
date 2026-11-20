import React from "react";
import Link from "next/link";

export function BrandStory() {
  return (
    <section className="olaf-story" id="approach" aria-labelledby="story-heading">
      <div className="olaf-story__inner">
        <div className="olaf-story__lead">
          <p className="olaf-story__label">OUR MANIFESTO</p>
          <h2 id="story-heading" className="olaf-story__title">
            CONTEMPORARY UNIFORMS FOR LIFE IN MOTION.
          </h2>
          <p className="olaf-story__statement">
            Born out of Amsterdam&rsquo;s creative fabric, we blend the sharp lines of classic European
            tailoring with the relaxed attitude of modern streetwear. Pieces meant to be worn daily,
            shared among friends, and cherished season after season.
          </p>
          <div className="olaf-story__actions">
            <Link href="/products" className="olaf-btn olaf-btn--primary">
              Explore The Catalog ↗
            </Link>
          </div>
        </div>

        <div className="olaf-story__pillars">
          <div className="olaf-pillar">
            <span className="olaf-pillar__index">01</span>
            <h3 className="olaf-pillar__title">INTENTIONAL SILHOUETTE</h3>
            <p className="olaf-pillar__text">
              Relaxed drops, dropped shoulders, and architectural cuts engineered for fluid movement.
              Every seam serves purpose and longevity.
            </p>
          </div>

          <div className="olaf-pillar">
            <span className="olaf-pillar__index">02</span>
            <h3 className="olaf-pillar__title">MATERIAL HONESTY</h3>
            <p className="olaf-pillar__text">
              We insist on heavy pure wools, organic twills, and crisp linens sourced from certified
              European mills. No synthetic shortcuts.
            </p>
          </div>

          <div className="olaf-pillar">
            <span className="olaf-pillar__index">03</span>
            <h3 className="olaf-pillar__title">COMMUNITY & FRIENDS</h3>
            <p className="olaf-pillar__text">
              Inspired by the motto &ldquo;Our Life as Friends&rdquo; — collaborating with local
              artists, photographers, and independent makers worldwide.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
