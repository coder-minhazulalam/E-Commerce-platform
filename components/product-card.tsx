import Image from "next/image";
import Link from "next/link";
import { lookbookImage } from "../lib/assets";
import { formatPrice, type Product } from "../lib/products";

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="product-card">
      <Link className="product-card__link" href={`/shop/${encodeURIComponent(product.slug)}`} aria-label={`View ${product.name}`}>
        <div className="product-card__image">
          <Image src={lookbookImage(product.imageIndex, 720)} alt={product.imageAlt} fill sizes="(max-width: 620px) 90vw, (max-width: 980px) 45vw, 30vw" />
        </div>
        <div className="product-card__meta">
          <div><p className="product-card__category">{product.category}</p><h3>{product.name}</h3></div>
          <p className="product-card__price">{formatPrice(product.price, product.currency)}</p>
        </div>
      </Link>
    </article>
  );
}

export function ProductGrid({ products, state }: { products: Product[]; state?: "loading" | "error" }) {
  if (state === "loading") return <p className="catalog-message" role="status" aria-live="polite">Gathering the edit…</p>;
  if (state === "error") return <p className="catalog-message" role="alert">The edit could not be loaded. Please try again.</p>;
  if (!products.length) return <p className="catalog-message" role="status">No pieces match just yet. Try changing your search or category.</p>;
  return <div className="product-grid">{products.map((product) => <ProductCard key={product.id} product={product} />)}</div>;
}
