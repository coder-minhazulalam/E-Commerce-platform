import Link from "next/link";
import { SiteHeader } from "../../components/site-header";
import { ShopCatalog } from "../../components/shop-catalog";

export const metadata = { title: "Shop the edit" };
export default function ShopPage() {
  return <div className="site-shell"><SiteHeader /><main className="shop-page"><header className="page-intro"><p className="section-index">The collection</p><h1>Pieces for the everyday.</h1><p>Considered layers, familiar textures, and easy shapes to make your own.</p></header><ShopCatalog /><p className="back-link"><Link href="/">← Back to the beginning</Link></p></main></div>;
}
