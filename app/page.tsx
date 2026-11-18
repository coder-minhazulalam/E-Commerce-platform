import React from "react";
import Image from "next/image";
import { HeroCTA } from "../components/hero-cta";
import { LookbookViewer } from "../components/lookbook-viewer";
import { SiteHeader } from "../components/site-header";
import { lookbookImage } from "../lib/assets";

export default function HomePage() {
  return (
    <div className="site-shell">
      <SiteHeader />
      <main>
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero__copy">
            <p className="eyebrow">A considered collection · Vol. 01</p>
            <h1 className="hero__title" id="hero-title">
              A little less noise. A little more you.
            </h1>
            <p className="hero__description">
              An intentionally small edit of thoughtfully chosen pieces: easy to wear, made to work together, and ready for real life. Find fewer things you love and wear them often.
            </p>
            <div className="hero__actions">
              <HeroCTA />
              <a className="hero__text-link" href="/shop">
                Explore the edit
              </a>
            </div>
            <p className="hero__note">Considered, versatile, and made for repeat wear.</p>
          </div>

          <div className="hero__visual" aria-label="Editorial lookbook portrait">
            <span className="hero__ring" aria-hidden="true" />
            <Image
              className="hero__model"
              src={lookbookImage(0, 914)}
              alt="Model wearing a relaxed, neutral-toned look"
              fill
              priority
              sizes="(max-width: 850px) 90vw, 48vw"
            />
          </div>
        </section>

        <section className="edit-strip" id="lookbook" aria-labelledby="lookbook-title">
          <div>
            <p className="section-index">01 / Lookbook</p>
            <h2 className="edit-strip__title" id="lookbook-title">
              Nine looks. Room to make them yours.
            </h2>
          </div>
          <p className="edit-strip__count">09 — 01</p>
        </section>

        <div className="home-lookbook-container">
          <LookbookViewer />
        </div>

        <span id="approach" className="sr-only">
          Our approach: thoughtful pieces for everyday wear.
        </span>
      </main>
    </div>
  );
}
