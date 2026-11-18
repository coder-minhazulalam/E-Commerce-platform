import Link from "next/link";
import { SiteHeader } from "../../components/site-header";
import { SiteFooter } from "../../components/site-footer";
import { ShopCatalog } from "../../components/shop-catalog";

export const metadata = {
  title: "Products — The Collection · The Everyday Edit",
  description: "Considered layers, familiar textures, and easy shapes to make your own.",
};

export default function ProductsPage() {
  return (
    <div className="site-shell">
      <SiteHeader />
      <main className="shop-page">
        <header className="page-intro">
          <p className="section-index">01 / Products</p>
          <h1>Pieces for the everyday.</h1>
          <p>Considered layers, familiar textures, and easy shapes to make your own.</p>
        </header>
        <ShopCatalog />
        <p className="back-link">
          <Link href="/">← Back to the beginning</Link>
          <span style={{ marginInline: "12px", color: "var(--muted)" }}>·</span>
          <Link href="/collections">Browse editorial collections →</Link>
        </p>
      </main>
      <SiteFooter />
    </div>
  );
}
