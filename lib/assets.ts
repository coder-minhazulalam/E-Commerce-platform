/**
 * OOTFY Luxury Fashion - Centralized Asset Registry
 *
 * Rules:
 * - 100% Clothing-Only / Garment-Only photographic assets.
 * - Zero human models or visible persons.
 * - Zero third-party brand watermarks.
 * - Master full-resolution uncompressed assets.
 */

export const ASSETS = {
  hero: {
    banner: "/assets/hero/hero-banner-master.jpg",
  },
  eidEdit: {
    featuredPanjabi: "/assets/eid/eid-espresso-panjabi.jpg",
    muslinDetail: "/assets/eid/eid-muslin-detail.jpg",
    foldedSilks: "/assets/eid/eid-folded-silks.jpg",
  },
  virtualTryon: {
    avatarPreview: "/assets/tryon/tryon-avatar-mannequin.jpg",
  },
  products: {
    jamdaniClean: "/assets/products/jamdani-saree-clean.jpg",
  },
} as const;
