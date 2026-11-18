import { type Product } from "./products";

export interface LookItemDot {
  id: string;
  productId: string;
  label: string;
  x: number; // percentage (0-100)
  y: number; // percentage (0-100)
}

export interface Look {
  id: string;
  slug: string;
  lookNumber: number;
  title: string;
  subtitle: string;
  description: string;
  imageIndex: number;
  imageAlt: string;
  productIds: string[];
  itemDots: LookItemDot[];
}

export interface LookWithProducts {
  look: Look;
  products: Product[];
}

// Built-in editorial look fixtures (mirrors backend fixtures for robust client/offline fallback)
export const NINE_LOOKS: Look[] = [
  {
    id: "weekend-edit",
    slug: "look-01",
    lookNumber: 1,
    title: "Weekend Edit",
    subtitle: "Soft layers & relaxed ease",
    description: "Soft layers and relaxed silhouettes for unhurried days.",
    imageIndex: 0,
    imageAlt: "Look 01: Relaxed linen shirt and canvas tote",
    productIds: ["product-001", "product-002", "product-005"],
    itemDots: [
      { id: "dot-1-1", productId: "product-001", label: "Linen Shirt", x: 48, y: 38 },
      { id: "dot-1-2", productId: "product-002", label: "Canvas Tote", x: 28, y: 64 },
      { id: "dot-1-3", productId: "product-005", label: "Striped T-Shirt", x: 52, y: 50 },
    ],
  },
  {
    id: "calm-home",
    slug: "look-02",
    lookNumber: 2,
    title: "Calm Living",
    subtitle: "Tactile textures & warm light",
    description: "Tactile textures and understated elegance for the sanctuary at home.",
    imageIndex: 1,
    imageAlt: "Look 02: Earthy tones with ceramic and lamp accents",
    productIds: ["product-003", "product-006", "product-009"],
    itemDots: [
      { id: "dot-2-1", productId: "product-003", label: "Ceramic Vase", x: 38, y: 44 },
      { id: "dot-2-2", productId: "product-006", label: "Table Lamp", x: 62, y: 52 },
      { id: "dot-2-3", productId: "product-009", label: "Throw Blanket", x: 50, y: 72 },
    ],
  },
  {
    id: "studio-layers",
    slug: "look-03",
    lookNumber: 3,
    title: "Studio Layers",
    subtitle: "Structural drape & quiet form",
    description: "Clean structural tailoring paired with casual everyday ease.",
    imageIndex: 2,
    imageAlt: "Look 03: Pale tailored drape and woven cotton scarf",
    productIds: ["product-001", "product-004", "product-008"],
    itemDots: [
      { id: "dot-3-1", productId: "product-004", label: "Cotton Scarf", x: 50, y: 26 },
      { id: "dot-3-2", productId: "product-001", label: "Linen Shirt", x: 46, y: 42 },
      { id: "dot-3-3", productId: "product-008", label: "Cotton Trousers", x: 52, y: 72 },
    ],
  },
  {
    id: "monochrome-ease",
    slug: "look-04",
    lookNumber: 4,
    title: "Monochrome Ease",
    subtitle: "Graphic contrast & sharp lines",
    description: "Balanced contrast and modern proportions in timeless neutrals.",
    imageIndex: 3,
    imageAlt: "Look 04: Graphic stripes paired with tailored cotton trousers",
    productIds: ["product-005", "product-008", "product-007"],
    itemDots: [
      { id: "dot-4-1", productId: "product-005", label: "Striped T-Shirt", x: 48, y: 38 },
      { id: "dot-4-2", productId: "product-007", label: "Leather Wallet", x: 36, y: 58 },
      { id: "dot-4-3", productId: "product-008", label: "Cotton Trousers", x: 54, y: 74 },
    ],
  },
  {
    id: "coastal-drape",
    slug: "look-05",
    lookNumber: 5,
    title: "Coastal Drape",
    subtitle: "Breezy weaves & sun-washed tone",
    description: "Breathable natural fabrics shaped for effortless summer movement.",
    imageIndex: 4,
    imageAlt: "Look 05: Sun-washed linen weave with canvas tote",
    productIds: ["product-001", "product-002", "product-004"],
    itemDots: [
      { id: "dot-5-1", productId: "product-001", label: "Linen Shirt", x: 50, y: 36 },
      { id: "dot-5-2", productId: "product-004", label: "Cotton Scarf", x: 54, y: 22 },
      { id: "dot-5-3", productId: "product-002", label: "Canvas Tote", x: 70, y: 60 },
    ],
  },
  {
    id: "considered-contour",
    slug: "look-06",
    lookNumber: 6,
    title: "Considered Contour",
    subtitle: "Architectural lines & functional depth",
    description: "Architectural lines meeting soft, tactile utility for the city.",
    imageIndex: 5,
    imageAlt: "Look 06: Minimal silhouette with warm ambient tone",
    productIds: ["product-008", "product-006", "product-007"],
    itemDots: [
      { id: "dot-6-1", productId: "product-006", label: "Table Lamp", x: 68, y: 46 },
      { id: "dot-6-2", productId: "product-007", label: "Leather Wallet", x: 44, y: 54 },
      { id: "dot-6-3", productId: "product-008", label: "Cotton Trousers", x: 52, y: 76 },
    ],
  },
  {
    id: "evening-quiet",
    slug: "look-07",
    lookNumber: 7,
    title: "Evening Quiet",
    subtitle: "Subtle burnish & ink tones",
    description: "Dark muted tones and understated accents tuned for quiet evenings.",
    imageIndex: 6,
    imageAlt: "Look 07: Dark relaxed tailoring and understated leather",
    productIds: ["product-001", "product-007", "product-008"],
    itemDots: [
      { id: "dot-7-1", productId: "product-001", label: "Linen Shirt", x: 48, y: 40 },
      { id: "dot-7-2", productId: "product-007", label: "Leather Wallet", x: 34, y: 56 },
      { id: "dot-7-3", productId: "product-008", label: "Cotton Trousers", x: 50, y: 74 },
    ],
  },
  {
    id: "refined-utility",
    slug: "look-08",
    lookNumber: 8,
    title: "Refined Utility",
    subtitle: "Workwear geometry & tactile canvas",
    description: "Durable craftsmanship focused on essential form and all-day comfort.",
    imageIndex: 7,
    imageAlt: "Look 08: Workwear silhouette with structured canvas tote",
    productIds: ["product-002", "product-008", "product-004"],
    itemDots: [
      { id: "dot-8-1", productId: "product-004", label: "Cotton Scarf", x: 46, y: 24 },
      { id: "dot-8-2", productId: "product-002", label: "Canvas Tote", x: 66, y: 58 },
      { id: "dot-8-3", productId: "product-008", label: "Cotton Trousers", x: 50, y: 72 },
    ],
  },
  {
    id: "warm-neutral",
    slug: "look-09",
    lookNumber: 9,
    title: "Warm Neutral",
    subtitle: "Textured weaves & gentle earthen notes",
    description: "Gentle earthen shades harmonized in soft focus and woven texture.",
    imageIndex: 8,
    imageAlt: "Look 09: Warm neutral layers and cozy woven blanket",
    productIds: ["product-004", "product-005", "product-009"],
    itemDots: [
      { id: "dot-9-1", productId: "product-004", label: "Cotton Scarf", x: 52, y: 28 },
      { id: "dot-9-2", productId: "product-005", label: "Striped T-Shirt", x: 48, y: 44 },
      { id: "dot-9-3", productId: "product-009", label: "Throw Blanket", x: 38, y: 68 },
    ],
  },
];

export async function getLooks(signal?: AbortSignal): Promise<Look[]> {
  try {
    const response = await fetch("/api/looks", { signal });
    if (response.ok) {
      const data = (await response.json()) as { items: Look[] };
      if (Array.isArray(data.items) && data.items.length > 0) {
        return data.items;
      }
    }
  } catch {
    // Fall back to static fixtures
  }
  return NINE_LOOKS;
}

export async function getLook(
  idOrSlug: string,
  signal?: AbortSignal,
): Promise<LookWithProducts | null> {
  const normalized = idOrSlug.toLowerCase();
  try {
    const response = await fetch(`/api/looks/${encodeURIComponent(idOrSlug)}`, { signal });
    if (response.ok) {
      const data = (await response.json()) as { look: Look; products?: Product[] };
      return {
        look: data.look,
        products: data.products ?? [],
      };
    }
  } catch {
    // Fall back to static fixtures
  }

  const localLook = NINE_LOOKS.find(
    (l) =>
      l.id.toLowerCase() === normalized ||
      l.slug.toLowerCase() === normalized ||
      String(l.lookNumber) === normalized,
  );
  if (!localLook) return null;

  return {
    look: localLook,
    products: [],
  };
}

export function getAdjacentLooks(currentIdOrSlug: string, looks: Look[] = NINE_LOOKS) {
  const index = looks.findIndex(
    (l) =>
      l.id.toLowerCase() === currentIdOrSlug.toLowerCase() ||
      l.slug.toLowerCase() === currentIdOrSlug.toLowerCase(),
  );
  if (index === -1) {
    return { prev: looks[looks.length - 1], next: looks[1] };
  }
  const prev = looks[(index - 1 + looks.length) % looks.length];
  const next = looks[(index + 1) % looks.length];
  return { prev, next };
}
