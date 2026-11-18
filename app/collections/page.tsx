import React from "react";
import Link from "next/link";
import { SiteHeader } from "../../components/site-header";
import { SiteFooter } from "../../components/site-footer";
import { CollectionViewer } from "../../components/collection-viewer";

export const metadata = {
  title: "Collections — Nine Looks · The Everyday Edit",
  description:
    "An intentional collection of nine looks designed for repeat wear and everyday ease.",
};

export default function CollectionsPage() {
  return (
    <div className="site-shell">
      <SiteHeader />
      <main className="looks-page">
        <header className="page-intro">
          <p className="section-index">02 / Collections</p>
          <h1>Nine collections. Room to make them yours.</h1>
          <p>
            An intentionally small edit of thoughtfully styled silhouettes: easy to wear,
            designed to work together, and ready for real life.
          </p>
        </header>

        <CollectionViewer />

        <div className="looks-page__footer">
          <p className="back-link">
            <Link href="/">← Back to the beginning</Link>
            <span style={{ marginInline: "12px", color: "var(--muted)" }}>·</span>
            <Link href="/products">Explore individual pieces →</Link>
          </p>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
