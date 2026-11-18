import React from "react";
import Link from "next/link";
import { SiteHeader } from "../../components/site-header";
import { LookbookViewer } from "../../components/lookbook-viewer";

export const metadata = {
  title: "The Editorial Lookbook · Nine Looks",
  description: "An intentional collection of nine looks designed for repeat wear and everyday ease.",
};

export default function LooksPage() {
  return (
    <div className="site-shell">
      <SiteHeader />
      <main className="looks-page">
        <header className="page-intro">
          <p className="section-index">01 / Lookbook</p>
          <h1>Nine looks. Room to make them yours.</h1>
          <p>
            An intentionally small edit of thoughtfully styled silhouettes: easy to wear,
            designed to work together, and ready for real life.
          </p>
        </header>

        <LookbookViewer />

        <div className="looks-page__footer">
          <p className="back-link">
            <Link href="/">← Back to the beginning</Link>
            <span style={{ marginInline: "12px", color: "var(--muted)" }}>·</span>
            <Link href="/shop">Explore individual pieces →</Link>
          </p>
        </div>
      </main>
    </div>
  );
}
