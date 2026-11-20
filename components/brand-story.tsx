import React from "react";
import Link from "next/link";

export function BrandStory() {
  return (
    <section className="olaf-story" id="approach" aria-labelledby="story-heading">
      <div className="olaf-story__inner">
        <div className="olaf-story__lead">
          <p className="olaf-story__label">OUR HERITAGE MANIFESTO</p>
          <h2 id="story-heading" className="olaf-story__title">
            REVERENCE FOR WEAVING TRADITIONS. REFINED FOR TODAY.
          </h2>
          <p className="olaf-story__statement">
            We celebrate South Asia’s rich sartorial history—from Varanasi’s antique brocades to
            Lucknow’s delicate shadow-work and Bengal’s wild Tussar silks. By uniting ancestral handloom
            mastery with contemporary architectural silhouettes, we craft heirloom garments built to
            transcend generations.
          </p>
          <div className="olaf-story__actions">
            <Link href="/products" className="olaf-btn olaf-btn--primary">
              Explore All Outfits ↗
            </Link>
          </div>
        </div>

        <div className="olaf-story__pillars">
          <div className="olaf-pillar">
            <span className="olaf-pillar__index">01</span>
            <h3 className="olaf-pillar__title">ANCESTRAL HANDLOOMS</h3>
            <p className="olaf-pillar__text">
              Every yard of Katan silk, Chanderi, and Tussar is spun and woven by generational artisan
              clusters across India and Bangladesh, preserving intangible cultural heritage.
            </p>
          </div>

          <div className="olaf-pillar">
            <span className="olaf-pillar__index">02</span>
            <h3 className="olaf-pillar__title">PURE METALLIC ZARI</h3>
            <p className="olaf-pillar__text">
              We insist on genuine metallic dabka, resham, and gota patti threadwork hand-finished with
              microscopic precision. No plastic foils or synthetic shortcuts.
            </p>
          </div>

          <div className="olaf-pillar">
            <span className="olaf-pillar__index">03</span>
            <h3 className="olaf-pillar__title">HEIRLOOM INTEGRITY</h3>
            <p className="olaf-pillar__text">
              Outfits designed not for a single occasion, but to be treasured, worn, and passed down as
              timeless expressions of South Asian elegance.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
