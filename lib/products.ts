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
export type ProductQuery = {
  category?: string;
  q?: string;
  sort?: ProductSort;
  page?: number;
  pageSize?: number;
  featured?: boolean;
};

// South Asian Heritage & Contemporary Fusion Outfits
export const CATALOG_PRODUCTS: Product[] = [
  {
    id: "sa-001",
    slug: "royal-zardozi-sherwani",
    name: "Royal Zardozi Sherwani",
    category: "Sherwani",
    description: "Imperial ivory raw silk sherwani adorned with handcrafted metallic Zari & dabka embroidery. Tailored mandarin collar with concealed front placket.",
    price: 340,
    currency: "USD",
    imageIndex: 0,
    imageAlt: "Royal ivory raw silk sherwani with intricate gold zardozi embroidery",
    featured: true,
  },
  {
    id: "sa-002",
    slug: "banarasi-silk-saree",
    name: "Banarasi Katan Silk Saree",
    category: "Saree",
    description: "Pure handwoven Katan silk drape featuring intricate antique gold zari floral jaal with a regal pallu border. Mastercrafted in Varanasi.",
    price: 290,
    currency: "USD",
    imageIndex: 1,
    imageAlt: "Crimson Banarasi Katan silk saree with antique gold zari border",
    featured: true,
  },
  {
    id: "sa-003",
    slug: "chanderi-silk-kurta",
    name: "Heritage Chanderi Kurta Set",
    category: "Kurta",
    description: "Hand-spun Chanderi cotton-silk blend kurta with tonal resham threadwork, paired with tailored ivory churidar trousers.",
    price: 145,
    currency: "USD",
    imageIndex: 2,
    imageAlt: "Ivory and sage handwoven Chanderi silk kurta set with churidar",
    featured: true,
  },
  {
    id: "sa-004",
    slug: "tussar-handloom-panjabi",
    name: "Handloom Tussar Silk Panjabi",
    category: "Panjabi",
    description: "Wild textured Tussar wild silk panjabi with minimalist kantha stitch embroidery along the placket and cuffs. Effortlessly breathable.",
    price: 120,
    currency: "USD",
    imageIndex: 3,
    imageAlt: "Textured beige handloom Tussar silk panjabi with subtle kantha collar",
    featured: true,
  },
  {
    id: "sa-005",
    slug: "velvet-bandhgala-jodhpuri",
    name: "Midnight Velvet Bandhgala",
    category: "Bandhgala",
    description: "Structured royal Jodhpuri silhouette crafted in plush midnight blue velvet with bespoke handcrafted brass crest buttons.",
    price: 275,
    currency: "USD",
    imageIndex: 4,
    imageAlt: "Tailored midnight velvet bandhgala jacket with hammered brass buttons",
    featured: true,
  },
  {
    id: "sa-006",
    slug: "chikankari-organza-anarkali",
    name: "Lucknowi Chikankari Anarkali",
    category: "Anarkali",
    description: "Ethereal hand-embroidered Lucknowi shadow-work chikankari gown in pure silk organza with delicate mukaish embellishments.",
    price: 210,
    currency: "USD",
    imageIndex: 5,
    imageAlt: "Pastel mint Lucknowi chikankari organza anarkali ensemble",
    featured: false,
  },
  {
    id: "sa-007",
    slug: "raw-silk-nehru-vest",
    name: "Raw Silk Bundi Nehru Vest",
    category: "Nehru Vest",
    description: "Sleek tailored Nehru waistcoat in textured Matka raw silk. Classic stand collar with welted breast pocket and horn buttons.",
    price: 135,
    currency: "USD",
    imageIndex: 6,
    imageAlt: "Structured ochre raw silk Nehru vest over an off-white kurta",
    featured: false,
  },
  {
    id: "sa-008",
    slug: "kashmiri-pashmina-shawl",
    name: "Kashmiri Jamawar Pashmina",
    category: "Pashmina",
    description: "Hand-spun high-altitude Himalayan cashmere shawl woven with heritage paisley jaal tapestry patterns from Srinagar.",
    price: 185,
    currency: "USD",
    imageIndex: 7,
    imageAlt: "Authentic hand-spun Kashmiri Jamawar pashmina shawl",
    featured: false,
  },
  {
    id: "sa-009",
    slug: "embroidered-silk-lehenga",
    name: "Gota Patti Raw Silk Lehenga",
    category: "Lehenga",
    description: "Contemporary flared raw silk lehenga ensemble with handcrafted gold gota patti borders, cropped choli, and scalloped dupatta.",
    price: 320,
    currency: "USD",
    imageIndex: 8,
    imageAlt: "Emerald raw silk lehenga with handcrafted gold gota patti embroidery",
    featured: true,
  },
];

const LOOKBOOK_FALLBACK_PRODUCTS: Product[] = [
  {
    id: "product-001",
    slug: "wool-overcoat",
    name: "The Wool Overcoat",
    category: "Outerwear",
    description: "A structured mid-length overcoat in heavyweight wool blend.",
    price: 285,
    currency: "USD",
    imageIndex: 0,
    imageAlt: "Wool overcoat in natural stone, belted at the waist",
    featured: true,
  },
  {
    id: "product-002",
    slug: "linen-wide-leg-trousers",
    name: "Linen Wide-Leg Trousers",
    category: "Bottoms",
    description: "Wide-leg trousers in breathable linen.",
    price: 125,
    currency: "USD",
    imageIndex: 1,
    imageAlt: "Linen wide-leg trousers in ecru",
    featured: true,
  },
  {
    id: "product-003",
    slug: "ribbed-knit-crewneck",
    name: "Ribbed Knit Crewneck",
    category: "Knitwear",
    description: "An everyday crewneck in fine-gauge ribbed cotton.",
    price: 98,
    currency: "USD",
    imageIndex: 2,
    imageAlt: "Ribbed knit crewneck in oat",
    featured: true,
  },
  {
    id: "product-004",
    slug: "relaxed-oxford-shirt",
    name: "Relaxed Oxford Shirt",
    category: "Shirts",
    description: "Classic Oxford weave cotton shirt.",
    price: 88,
    currency: "USD",
    imageIndex: 3,
    imageAlt: "Relaxed Oxford shirt in pale blue",
  },
  {
    id: "product-005",
    slug: "tailored-blazer",
    name: "The Tailored Blazer",
    category: "Outerwear",
    description: "A clean-lined tailored blazer in stretch-wool blend.",
    price: 245,
    currency: "USD",
    imageIndex: 4,
    imageAlt: "Tailored blazer in charcoal",
    featured: true,
  },
  {
    id: "product-006",
    slug: "slip-midi-dress",
    name: "Slip Midi Dress",
    category: "Dresses",
    description: "Bias-cut slip dress in washed silk-look satin.",
    price: 168,
    currency: "USD",
    imageIndex: 5,
    imageAlt: "Slip midi dress in champagne satin",
  },
  {
    id: "product-007",
    slug: "high-rise-straight-jeans",
    name: "High-Rise Straight Jeans",
    category: "Denim",
    description: "Straight-leg jeans in rigid selvedge denim.",
    price: 145,
    currency: "USD",
    imageIndex: 6,
    imageAlt: "High-rise straight jeans in deep indigo",
  },
  {
    id: "product-008",
    slug: "merino-turtleneck",
    name: "Fine Merino Turtleneck",
    category: "Knitwear",
    description: "An ultra-fine merino wool turtleneck.",
    price: 115,
    currency: "USD",
    imageIndex: 7,
    imageAlt: "Fine merino turtleneck in ivory",
  },
  {
    id: "product-009",
    slug: "canvas-work-jacket",
    name: "Washed Canvas Jacket",
    category: "Outerwear",
    description: "A utility work jacket in washed canvas cotton.",
    price: 195,
    currency: "USD",
    imageIndex: 8,
    imageAlt: "Washed canvas jacket in sand",
  },
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
  try {
    const response = await fetch(productListUrl(query), { signal });
    if (response.ok) {
      return (await response.json()) as ProductPage;
    }
  } catch {
    // fallback to local catalog
  }

  let items = [...CATALOG_PRODUCTS];
  if (query.category) {
    items = items.filter((p) => p.category.toLowerCase() === query.category?.toLowerCase());
  }
  if (query.q) {
    const q = query.q.toLowerCase();
    items = items.filter((p) => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
  }
  if (query.featured) {
    items = items.filter((p) => p.featured);
  }
  if (query.sort === "price-asc") items.sort((a, b) => a.price - b.price);
  if (query.sort === "price-desc") items.sort((a, b) => b.price - a.price);
  if (query.sort === "name-asc") items.sort((a, b) => a.name.localeCompare(b.name));

  const page = query.page || 1;
  const pageSize = query.pageSize || items.length;
  const start = (page - 1) * pageSize;

  return {
    items: items.slice(start, start + pageSize),
    page,
    pageSize,
    total: items.length,
  };
}

export async function getProduct(slug: string, signal?: AbortSignal): Promise<Product> {
  try {
    const response = await fetch(`/api/products/${encodeURIComponent(slug)}`, { signal });
    if (response.ok) {
      const result = (await response.json()) as { item: Product };
      return result.item;
    }
  } catch {
    // fallback
  }

  const found = getLocalProduct(slug);
  if (found) return found;
  throw new Error(`Product ${slug} could not be found`);
}

export function formatPrice(amount: number, currency: string): string {
  return new Intl.NumberFormat(undefined, { style: "currency", currency }).format(amount);
}

export function getLocalProduct(idOrSlug: string): Product | undefined {
  const n = idOrSlug.toLowerCase();
  const direct = CATALOG_PRODUCTS.find((p) => p.id.toLowerCase() === n || p.slug.toLowerCase() === n);
  if (direct) return direct;
  return LOOKBOOK_FALLBACK_PRODUCTS.find((p) => p.id.toLowerCase() === n || p.slug.toLowerCase() === n);
}

export function getFeaturedProducts(): Product[] {
  return CATALOG_PRODUCTS.filter((p) => p.featured);
}
