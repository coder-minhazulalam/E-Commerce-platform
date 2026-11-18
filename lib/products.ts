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
  featured?: boolean;
};

export type ProductSort = "featured" | "price-asc" | "price-desc" | "name-asc";
export type ProductPage = { items: Product[]; page: number; pageSize: number; total: number };
export type ProductQuery = { category?: string; q?: string; sort?: ProductSort; page?: number; pageSize?: number; featured?: boolean };

export const CATALOG_PRODUCTS: Product[] = [
  { id: "product-001", slug: "wool-overcoat", name: "The Wool Overcoat", category: "Outerwear", description: "A structured mid-length overcoat in heavyweight wool blend. Notch lapel, double-breasted button closure, fully lined.", price: 285, currency: "USD", imageIndex: 0, imageAlt: "Wool overcoat in natural stone, belted at the waist", featured: true },
  { id: "product-002", slug: "linen-wide-leg-trousers", name: "Linen Wide-Leg Trousers", category: "Bottoms", description: "Wide-leg trousers in breathable linen. High rise, elasticated back waistband, two front slash pockets.", price: 125, currency: "USD", imageIndex: 1, imageAlt: "Linen wide-leg trousers in ecru, cropped slightly above the ankle", featured: true },
  { id: "product-003", slug: "ribbed-knit-crewneck", name: "Ribbed Knit Crewneck", category: "Knitwear", description: "An everyday crewneck in fine-gauge ribbed cotton. Relaxed fit, dropped shoulders, raw hem finish.", price: 98, currency: "USD", imageIndex: 2, imageAlt: "Ribbed knit crewneck in oat, tucked loosely into trousers", featured: true },
  { id: "product-004", slug: "relaxed-oxford-shirt", name: "Relaxed Oxford Shirt", category: "Shirts", description: "Classic Oxford weave cotton shirt. Relaxed cut through the chest and waist, button-down collar, single chest pocket.", price: 88, currency: "USD", imageIndex: 3, imageAlt: "Relaxed Oxford shirt in pale blue, half-tucked" },
  { id: "product-005", slug: "tailored-blazer", name: "The Tailored Blazer", category: "Outerwear", description: "A clean-lined tailored blazer in stretch-wool blend. Single-breasted, lightly padded shoulders, flap pockets.", price: 245, currency: "USD", imageIndex: 4, imageAlt: "Tailored blazer in charcoal, worn open over a white shirt", featured: true },
  { id: "product-006", slug: "slip-midi-dress", name: "Slip Midi Dress", category: "Dresses", description: "Bias-cut slip dress in washed silk-look satin. Midi length, adjustable straps, side seam slit.", price: 168, currency: "USD", imageIndex: 5, imageAlt: "Slip midi dress in champagne satin, worn with a cardigan" },
  { id: "product-007", slug: "high-rise-straight-jeans", name: "High-Rise Straight Jeans", category: "Denim", description: "Straight-leg jeans in rigid selvedge denim. High waist, clean front, two back patch pockets.", price: 145, currency: "USD", imageIndex: 6, imageAlt: "High-rise straight jeans in deep indigo, cuffed at the ankle" },
  { id: "product-008", slug: "merino-turtleneck", name: "Fine Merino Turtleneck", category: "Knitwear", description: "An ultra-fine merino wool turtleneck. Slim fit, ribbed knit construction, long sleeve.", price: 115, currency: "USD", imageIndex: 7, imageAlt: "Fine merino turtleneck in ivory, tucked into high-waist trousers" },
  { id: "product-009", slug: "canvas-work-jacket", name: "Washed Canvas Jacket", category: "Outerwear", description: "A utility work jacket in washed canvas cotton. Relaxed fit, four flap pockets, raw denim-style finish.", price: 195, currency: "USD", imageIndex: 8, imageAlt: "Washed canvas jacket in sand, worn over a knit" },
];

export function productListUrl(query: ProductQuery = {}): string {
  const params = new URLSearchParams();
  if (query.category) params.set("category", query.category);
  if (query.q) params.set("q", query.q);
  if (query.sort) params.set("sort", query.sort);
  if (query.page !== undefined) params.set("page", String(query.page));
  if (query.pageSize !== undefined) params.set("pageSize", String(query.pageSize));
  if (query.featured) params.set("featured", "true");
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

export function getLocalProduct(idOrSlug: string): Product | undefined {
  const n = idOrSlug.toLowerCase();
  return CATALOG_PRODUCTS.find((p) => p.id.toLowerCase() === n || p.slug.toLowerCase() === n);
}

export function getFeaturedProducts(): Product[] {
  return CATALOG_PRODUCTS.filter((p) => p.featured);
}
