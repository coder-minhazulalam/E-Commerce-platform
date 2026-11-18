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

export function formatPrice(amount: number, currency: string): string {
  return new Intl.NumberFormat(undefined, { style: "currency", currency }).format(amount);
}
