export type Product = {
  id: string;
  slug: string;
  name: string;
  category: string;
  description: string;
  price: number;
  currency: string;
  imageIndex: number;
  imageAlt: string;
};

export type ProductSort = "featured" | "price-asc" | "price-desc" | "name-asc";
export type ProductPage = { items: Product[]; page: number; pageSize: number; total: number };
export type ProductQuery = { category?: string; q?: string; sort?: ProductSort; page?: number; pageSize?: number };

export function productListUrl(query: ProductQuery = {}): string {
  const params = new URLSearchParams();
  if (query.category) params.set("category", query.category);
  if (query.q) params.set("q", query.q);
  if (query.sort) params.set("sort", query.sort);
  if (query.page !== undefined) params.set("page", String(query.page));
  if (query.pageSize !== undefined) params.set("pageSize", String(query.pageSize));
  const suffix = params.toString();
  return `/api/products${suffix ? `?${suffix}` : ""}`;
}

export async function getProducts(query: ProductQuery = {}, signal?: AbortSignal): Promise<ProductPage> {
  const response = await fetch(productListUrl(query), { signal });
  if (!response.ok) throw new Error(`Products could not be loaded (${response.status})`);
  return response.json() as Promise<ProductPage>;
}

export async function getProduct(slug: string, signal?: AbortSignal): Promise<Product> {
  const response = await fetch(`/api/products/${encodeURIComponent(slug)}`, { signal });
  if (!response.ok) throw new Error(`Product could not be loaded (${response.status})`);
  const result = (await response.json()) as { item: Product };
  return result.item;
}

export const CATALOG_PRODUCTS: Product[] = [
  { id: "product-001", slug: "linen-shirt", name: "Linen Shirt", category: "Clothing", description: "A relaxed-fit linen shirt.", price: 68, currency: "USD", imageIndex: 0, imageAlt: "Campaign image 1" },
  { id: "product-002", slug: "canvas-tote", name: "Canvas Tote", category: "Accessories", description: "A roomy everyday canvas tote.", price: 32, currency: "USD", imageIndex: 1, imageAlt: "Campaign image 2" },
  { id: "product-003", slug: "ceramic-vase", name: "Ceramic Vase", category: "Home", description: "A handcrafted-look ceramic vase.", price: 54, currency: "USD", imageIndex: 2, imageAlt: "Campaign image 3" },
  { id: "product-004", slug: "cotton-scarf", name: "Cotton Scarf", category: "Accessories", description: "A soft woven cotton scarf.", price: 45, currency: "USD", imageIndex: 3, imageAlt: "Campaign image 4" },
  { id: "product-005", slug: "striped-tshirt", name: "Striped T-Shirt", category: "Clothing", description: "A classic striped cotton T-shirt.", price: 38, currency: "USD", imageIndex: 4, imageAlt: "Campaign image 5" },
  { id: "product-006", slug: "table-lamp", name: "Table Lamp", category: "Home", description: "A compact table lamp for warm light.", price: 110, currency: "USD", imageIndex: 5, imageAlt: "Campaign image 6" },
  { id: "product-007", slug: "leather-wallet", name: "Leather Wallet", category: "Accessories", description: "A slim everyday wallet.", price: 72, currency: "USD", imageIndex: 6, imageAlt: "Campaign image 7" },
  { id: "product-008", slug: "cotton-trousers", name: "Cotton Trousers", category: "Clothing", description: "Straight-leg cotton trousers.", price: 84, currency: "USD", imageIndex: 7, imageAlt: "Campaign image 8" },
  { id: "product-009", slug: "throw-blanket", name: "Throw Blanket", category: "Home", description: "A lightweight woven throw blanket.", price: 96, currency: "USD", imageIndex: 8, imageAlt: "Campaign image 9" },
];

export function formatPrice(amount: number, currency: string): string {
  return new Intl.NumberFormat(undefined, { style: "currency", currency }).format(amount);
}

export function getLocalProduct(idOrSlug: string): Product | undefined {
  const normalized = idOrSlug.toLowerCase();
  return CATALOG_PRODUCTS.find(
    (p) => p.id.toLowerCase() === normalized || p.slug.toLowerCase() === normalized,
  );
}
