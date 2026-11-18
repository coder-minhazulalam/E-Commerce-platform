import { type Product } from "./products";

export interface CollectionItemDot {
  id: string;
  productId: string;
  label: string;
  x: number;
  y: number;
}

export interface Collection {
  id: string;
  slug: string;
  number: number;
  title: string;
  subtitle: string;
  description: string;
  imageIndex: number;
  imageAlt: string;
  productIds: string[];
  itemDots: CollectionItemDot[];
}

export interface CollectionWithProducts {
  collection: Collection;
  products: Product[];
}

export const NINE_COLLECTIONS: Collection[] = [
  {
    id: "morning-edit", slug: "morning-edit", number: 1,
    title: "The Morning Edit",
    subtitle: "Soft layers for unhurried starts",
    description: "Easy, considered pieces for the quiet hours before the day begins. Relaxed silhouettes and tactile fabrics for a morning routine worth taking your time over.",
    imageIndex: 0, imageAlt: "Collection 01: Layered morning neutrals in wool and linen",
    productIds: ["product-001", "product-003", "product-004"],
    itemDots: [
      { id: "dot-1-1", productId: "product-001", label: "Wool Overcoat", x: 48, y: 36 },
      { id: "dot-1-2", productId: "product-003", label: "Ribbed Crewneck", x: 44, y: 52 },
      { id: "dot-1-3", productId: "product-004", label: "Oxford Shirt", x: 50, y: 60 },
    ],
  },
  {
    id: "office-hours", slug: "office-hours", number: 2,
    title: "Office Hours",
    subtitle: "Structure without stiffness",
    description: "Composed, polished, and genuinely comfortable. Pieces that work across meetings and commutes without sacrificing an inch of ease.",
    imageIndex: 1, imageAlt: "Collection 02: Tailored linen and blazer for a composed workday",
    productIds: ["product-005", "product-002", "product-008"],
    itemDots: [
      { id: "dot-2-1", productId: "product-005", label: "Tailored Blazer", x: 46, y: 38 },
      { id: "dot-2-2", productId: "product-002", label: "Wide-Leg Trousers", x: 50, y: 68 },
      { id: "dot-2-3", productId: "product-008", label: "Merino Turtleneck", x: 42, y: 50 },
    ],
  },
  {
    id: "weekend-ease", slug: "weekend-ease", number: 3,
    title: "Weekend Ease",
    subtitle: "Familiar fabrics, forgiving fits",
    description: "The pieces that make Saturday feel like a decision you got right. Relaxed fits in natural fabrics that move with you.",
    imageIndex: 2, imageAlt: "Collection 03: Relaxed cotton and denim for an easy weekend",
    productIds: ["product-004", "product-007", "product-003"],
    itemDots: [
      { id: "dot-3-1", productId: "product-004", label: "Oxford Shirt", x: 48, y: 42 },
      { id: "dot-3-2", productId: "product-007", label: "Straight Jeans", x: 52, y: 70 },
      { id: "dot-3-3", productId: "product-003", label: "Ribbed Crewneck", x: 46, y: 54 },
    ],
  },
  {
    id: "layer-game", slug: "layer-game", number: 4,
    title: "The Layer Game",
    subtitle: "Autumn depth, strategic weight",
    description: "When the temperature drops and the light shifts, the right layers carry you from morning coffee to evening plans without a wardrobe change.",
    imageIndex: 3, imageAlt: "Collection 04: Autumn layering in merino and canvas",
    productIds: ["product-009", "product-008", "product-002"],
    itemDots: [
      { id: "dot-4-1", productId: "product-009", label: "Canvas Jacket", x: 48, y: 38 },
      { id: "dot-4-2", productId: "product-008", label: "Merino Turtleneck", x: 44, y: 52 },
      { id: "dot-4-3", productId: "product-002", label: "Wide-Leg Trousers", x: 54, y: 72 },
    ],
  },
  {
    id: "coastal-weekend", slug: "coastal-weekend", number: 5,
    title: "Coastal Weekend",
    subtitle: "Light weaves and salt-air textures",
    description: "Breathable naturals and relaxed silhouettes for the kind of weekend that happens slowly, by the water or somewhere close to it.",
    imageIndex: 4, imageAlt: "Collection 05: Linen and cotton for a coastal escape",
    productIds: ["product-002", "product-004", "product-003"],
    itemDots: [
      { id: "dot-5-1", productId: "product-002", label: "Wide-Leg Trousers", x: 50, y: 66 },
      { id: "dot-5-2", productId: "product-004", label: "Oxford Shirt", x: 46, y: 44 },
      { id: "dot-5-3", productId: "product-003", label: "Ribbed Crewneck", x: 54, y: 52 },
    ],
  },
  {
    id: "golden-hour", slug: "golden-hour", number: 6,
    title: "Golden Hour",
    subtitle: "Evening ease with quiet polish",
    description: "The slipping-between-day-and-evening hour. Soft drape, burnished tone, the kind of dressing that feels like a natural transition.",
    imageIndex: 5, imageAlt: "Collection 06: Soft satin slip and knitwear in evening light",
    productIds: ["product-006", "product-008", "product-005"],
    itemDots: [
      { id: "dot-6-1", productId: "product-006", label: "Slip Midi Dress", x: 50, y: 54 },
      { id: "dot-6-2", productId: "product-008", label: "Merino Turtleneck", x: 44, y: 42 },
      { id: "dot-6-3", productId: "product-005", label: "Tailored Blazer", x: 56, y: 36 },
    ],
  },
  {
    id: "city-dusk", slug: "city-dusk", number: 7,
    title: "City Dusk",
    subtitle: "Sharp lines after sundown",
    description: "Evening in the city. Dark tones, clean silhouettes, the right weight of denim. Composed enough for dinner, relaxed enough for whatever comes next.",
    imageIndex: 6, imageAlt: "Collection 07: Denim and tailoring for an evening in the city",
    productIds: ["product-007", "product-005", "product-008"],
    itemDots: [
      { id: "dot-7-1", productId: "product-007", label: "Straight Jeans", x: 52, y: 68 },
      { id: "dot-7-2", productId: "product-005", label: "Tailored Blazer", x: 46, y: 38 },
      { id: "dot-7-3", productId: "product-008", label: "Merino Turtleneck", x: 44, y: 52 },
    ],
  },
  {
    id: "studio-day", slug: "studio-day", number: 8,
    title: "Studio Day",
    subtitle: "Utility with an editorial edge",
    description: "For the days when comfort and intention matter equally. Hardworking canvas and dependable knitwear built for sustained focus.",
    imageIndex: 7, imageAlt: "Collection 08: Canvas workwear and merino for a focused studio day",
    productIds: ["product-009", "product-003", "product-007"],
    itemDots: [
      { id: "dot-8-1", productId: "product-009", label: "Canvas Jacket", x: 48, y: 36 },
      { id: "dot-8-2", productId: "product-003", label: "Ribbed Crewneck", x: 44, y: 52 },
      { id: "dot-8-3", productId: "product-007", label: "Straight Jeans", x: 52, y: 70 },
    ],
  },
  {
    id: "clean-lines", slug: "clean-lines", number: 9,
    title: "Clean Lines",
    subtitle: "Monochrome discipline, textile warmth",
    description: "Nothing extraneous. Warm neutrals and precise cuts that speak for themselves — the wardrobe distilled to its essential confidence.",
    imageIndex: 8, imageAlt: "Collection 09: Monochrome neutrals in linen and merino",
    productIds: ["product-001", "product-002", "product-008"],
    itemDots: [
      { id: "dot-9-1", productId: "product-001", label: "Wool Overcoat", x: 48, y: 36 },
      { id: "dot-9-2", productId: "product-002", label: "Wide-Leg Trousers", x: 52, y: 70 },
      { id: "dot-9-3", productId: "product-008", label: "Merino Turtleneck", x: 44, y: 52 },
    ],
  },
];

export async function getCollections(signal?: AbortSignal): Promise<Collection[]> {
  try {
    const res = await fetch("/api/collections", { signal });
    if (res.ok) {
      const data = (await res.json()) as { items: Collection[] };
      if (Array.isArray(data.items) && data.items.length > 0) return data.items;
    }
  } catch { /* fall back */ }
  return NINE_COLLECTIONS;
}

export async function getCollection(slug: string, signal?: AbortSignal): Promise<CollectionWithProducts | null> {
  try {
    const res = await fetch(`/api/collections/${encodeURIComponent(slug)}`, { signal });
    if (res.ok) {
      const data = (await res.json()) as { collection: Collection; products?: Product[] };
      return { collection: data.collection, products: data.products ?? [] };
    }
  } catch { /* fall back */ }
  const local = NINE_COLLECTIONS.find(
    (c) => c.id === slug || c.slug === slug || String(c.number) === slug,
  );
  return local ? { collection: local, products: [] } : null;
}

export function getAdjacentCollections(slug: string, list: Collection[] = NINE_COLLECTIONS) {
  const idx = list.findIndex((c) => c.id === slug || c.slug === slug);
  if (idx === -1) return { prev: list[list.length - 1], next: list[1] };
  return {
    prev: list[(idx - 1 + list.length) % list.length],
    next: list[(idx + 1) % list.length],
  };
}
