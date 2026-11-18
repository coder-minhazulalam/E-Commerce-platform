import { SiteHeader } from "../../../components/site-header";
import { SiteFooter } from "../../../components/site-footer";
import { ProductDetail } from "../../../components/product-detail";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return { title: `${decodeURIComponent(slug)} — Products` };
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return (
    <div className="site-shell">
      <SiteHeader />
      <main className="shop-page">
        <ProductDetail slug={slug} />
      </main>
      <SiteFooter />
    </div>
  );
}
