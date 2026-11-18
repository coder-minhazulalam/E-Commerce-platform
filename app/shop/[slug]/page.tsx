import { SiteHeader } from "../../../components/site-header";
import { ProductDetail } from "../../../components/product-detail";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return { title: `${decodeURIComponent(slug)} — The edit` };
}
export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <div className="site-shell"><SiteHeader /><main className="shop-page"><ProductDetail slug={slug} /></main></div>;
}
