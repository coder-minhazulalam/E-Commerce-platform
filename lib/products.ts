import { supabase } from "./supabase";

export type ProductColor = {
  name: string;
  hex: string;
  is_default: boolean;
};

export type ProductImages = {
  hero_flatlay: string | null;
  hanging_view: string | null;
  fabric_macro_detail: string | null;
  back_view: string | null;
  folded_view: string | null;
  styling_packshot?: string | null;
};

export type OotfyProduct = {
  id: string;
  name: string;
  subtitle_or_tagline: string | null;
  category: string;
  collection: string;
  gender: "Men" | "Women" | "Kids" | "Unisex" | string;
  price_bdt: number;
  original_price_bdt: number | null;
  badge: "NEW" | "LIMITED" | "EXCLUSIVE" | "NEW ATELIER" | string | null;
  description: string;
  fabric: string;
  craft_technique: string;
  colors: ProductColor[];
  sizes: string[];
  stock_status: string;
  images: ProductImages;
  has_3d_view: boolean;
  has_virtual_try_on: boolean;
  avatar_preview_id: string | null;
  fit_recommendation: string;
  featured?: boolean;
};

export type Product = OotfyProduct;

export const OOTFY_PRODUCTS: OotfyProduct[] = [
  {
    "id": "OOT-PAN-001",
    "name": "Embroidered Ivory Panjabi",
    "subtitle_or_tagline": "Atelier Piece 01 / Handloom Craft",
    "category": "Panjabi",
    "collection": "The New Bangladeshi Edit",
    "gender": "Men",
    "price_bdt": 2490,
    "original_price_bdt": 2990,
    "badge": "NEW",
    "description": "Hand-finished cotton-silk Panjabi tailored with delicate tonal threadwork along the mandarin collar and placket. Cut for an effortless drape in breathable heritage muslin blend.",
    "fabric": "80% Organic Handloom Cotton, 20% Mulberry Silk",
    "craft_technique": "Dhakai Tonal Hand-Embroidery",
    "colors": [
      {
        "name": "Ivory",
        "hex": "#FDFCFA",
        "is_default": true
      },
      {
        "name": "Charcoal",
        "hex": "#242424",
        "is_default": false
      },
      {
        "name": "Deep Olive",
        "hex": "#3A4A3F",
        "is_default": false
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "stock_status": "In Stock — Dhaka Atelier",
    "images": {
      "hero_flatlay": "https://lh3.googleusercontent.com/aida-public/AB6AXuAx8vW0kFmfEnUl9PaTDPEbJNorq41yiqZjWR-glADPlcJJbHgsY-xm40du1UXIWNvrkB95PgVSEPU1Oa7hwYSTAjCwE3IITd29a7kpehW8hKoxsCATTq0tQz1B17Cj22aPJhZJVQQu2xDTCedNjxv9LzkR7H7Fq1gl5Opt9rX5meYURqxkO7Z21C-GvxdB3Ier8f_fCahkL85k_aM2vzmQIUJ1iN9S9f_SVXVy9-w=s0",
      "hanging_view": "/assets/products/men/panjabi-embroidered-ivory/hanging_studio.jpg",
      "fabric_macro_detail": "/assets/products/men/panjabi-embroidered-ivory/collar_threadwork_macro.jpg",
      "back_view": "/assets/products/men/panjabi-embroidered-ivory/back_drape.jpg",
      "folded_view": "/assets/products/men/panjabi-embroidered-ivory/folded_packshot.jpg"
    },
    "has_3d_view": true,
    "has_virtual_try_on": true,
    "avatar_preview_id": "tryon_panjabi_ivory_001",
    "fit_recommendation": "Tailored Fit",
    "featured": true
  },
  {
    "id": "OOT-SAR-002",
    "name": "Handloom Jamdani Saree",
    "subtitle_or_tagline": "Heritage Weave / 6 Yards Muslin",
    "category": "Saree",
    "collection": "The New Bangladeshi Edit",
    "gender": "Women",
    "price_bdt": 8900,
    "original_price_bdt": 10500,
    "badge": "LIMITED",
    "description": "Authentic Dhakai Jamdani woven on pit looms using fine count translucent muslin threads. Geometrical flora motifs painstakingly laid with supplementary weft technique.",
    "fabric": "100% Fine Count Khadi Muslin",
    "craft_technique": "Traditional Shitalakhya Jamdani Weave",
    "colors": [
      {
        "name": "Pale Gold Muslin",
        "hex": "#EDE5D8",
        "is_default": true
      },
      {
        "name": "Raw Sand",
        "hex": "#DCD3C1",
        "is_default": false
      }
    ],
    "sizes": [
      "Free Size (6 Yards)"
    ],
    "stock_status": "Low Stock — 3 Pieces Remaining",
    "images": {
      "hero_flatlay": "/assets/products/jamdani-saree-clean.jpg",
      "hanging_view": "/assets/products/women/saree-handloom-jamdani-gold/mannequin_drape.jpg",
      "fabric_macro_detail": "/assets/products/women/saree-handloom-jamdani-gold/pallu_weft_macro.jpg",
      "back_view": "/assets/products/women/saree-handloom-jamdani-gold/pleat_cascade_back.jpg",
      "folded_view": "/assets/products/women/saree-handloom-jamdani-gold/folded_box.jpg"
    },
    "has_3d_view": true,
    "has_virtual_try_on": false,
    "avatar_preview_id": null,
    "fit_recommendation": "Classic Drape",
    "featured": true
  },
  {
    "id": "OOT-BLZ-003",
    "name": "Tailored Olive Linen Blazer",
    "subtitle_or_tagline": "Modern Structured Outerwear",
    "category": "Blazer",
    "collection": "The New Bangladeshi Edit",
    "gender": "Men",
    "price_bdt": 6500,
    "original_price_bdt": null,
    "badge": "NEW",
    "description": "Unstructured single-breasted blazer woven from Belgian flax linen and lined with breathable Bengali cupro. Features horn buttons and natural soft shoulders.",
    "fabric": "100% Breathable European Linen",
    "craft_technique": "Sartorial Half-Canvas Tailoring",
    "colors": [
      {
        "name": "Deep Forest Olive",
        "hex": "#3A4A3F",
        "is_default": true
      },
      {
        "name": "Warm Sand",
        "hex": "#CFC5B2",
        "is_default": false
      }
    ],
    "sizes": [
      "38R",
      "40R",
      "42R",
      "44R"
    ],
    "stock_status": "In Stock — Dhaka Atelier",
    "images": {
      "hero_flatlay": "https://lh3.googleusercontent.com/aida-public/AB6AXuCoFHKrK_pzA3MAoy-T41foeGmDQxJ0Wzcvk68JSpVpPJUty7qH4nx0IJNuFFjnKMHMiMIAj2Tr2EEv1p_AlVi5BQdKmUq2X_s_MA93FcfeqLhoiAuLsTu4NZypKr3W3iSvlftVfCEVpAV3JilELtV5jpN7qPlAHKbYJbXV9tsTf8AEvJyeIilVwSj3dV5Sf-rmKRzrYePi7PCtsrj2-xIHmGw4MF3WILCYvms8xyM=s0",
      "hanging_view": "/assets/products/men/blazer-tailored-olive-linen/wooden_hanger_view.jpg",
      "fabric_macro_detail": "/assets/products/men/blazer-tailored-olive-linen/lapel_horn_button_macro.jpg",
      "back_view": "/assets/products/men/blazer-tailored-olive-linen/vented_back.jpg",
      "folded_view": "/assets/products/men/blazer-tailored-olive-linen/folded_atelier_case.jpg"
    },
    "has_3d_view": true,
    "has_virtual_try_on": true,
    "avatar_preview_id": "tryon_blazer_olive_003",
    "fit_recommendation": "Modern Slim",
    "featured": true
  },
  {
    "id": "OOT-TRP-004",
    "name": "Raw Silk Three-Piece Ensemble",
    "subtitle_or_tagline": "Atelier Festive Capsule",
    "category": "Three-Piece",
    "collection": "The New Bangladeshi Edit",
    "gender": "Women",
    "price_bdt": 4800,
    "original_price_bdt": 5500,
    "badge": "NEW",
    "description": "Comprising an A-line kurti with handcrafted neck piping, matching tapered cigarette trousers, and a lightweight organza dupatta edged with raw fringe.",
    "fabric": "Pure Rajshahi Raw Silk & Silk Organza",
    "craft_technique": "Ari & Zardozi Threadwork",
    "colors": [
      {
        "name": "Warm Sand Taupe",
        "hex": "#CBBBA7",
        "is_default": true
      },
      {
        "name": "Soft Charcoal",
        "hex": "#302E2B",
        "is_default": false
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "stock_status": "In Stock — Dhaka Atelier",
    "images": {
      "hero_flatlay": "https://lh3.googleusercontent.com/aida-public/AB6AXuBaHEhrOg3rqjVYFyAaT_FhKLFkCkrCMOZOGzHAgOQabQL6MjrKy9tH16rH4EI7wi6b2dORwohONtNL_fOwNRd25jXY5bHVv2cYlP_PQA3_v573jK1EuaEWCvAFmgFPT0nM-S3OH4CF8Q3PKAq0x0X2BkKhlC-n2e1OkeUnn3NXr4ik6CnPtcsIe5JVCorVtqXe70WtHKYZouQx1Wpc8sxj702NGJNsORjJ9LEaDPY=s0",
      "hanging_view": "/assets/products/women/threepiece-rawsilk-sand/hanging_triptych.jpg",
      "fabric_macro_detail": "/assets/products/women/threepiece-rawsilk-sand/neckline_ari_macro.jpg",
      "back_view": "/assets/products/women/threepiece-rawsilk-sand/back_tunic_drape.jpg",
      "folded_view": "/assets/products/women/threepiece-rawsilk-sand/folded_dupatta_set.jpg"
    },
    "has_3d_view": false,
    "has_virtual_try_on": true,
    "avatar_preview_id": "tryon_threepiece_sand_004",
    "fit_recommendation": "Fluid Regular",
    "featured": true
  },
  {
    "id": "OOT-PAN-005",
    "name": "Zardozi Embroidered Silk Kurta",
    "subtitle_or_tagline": "The Eid Edit / Midnight Chocolate",
    "category": "Panjabi",
    "collection": "The Eid Edit",
    "gender": "Men",
    "price_bdt": 7200,
    "original_price_bdt": 8500,
    "badge": "LIMITED",
    "description": "Opulent deep espresso silk kurta adorned with antique gold zardozi bullion embroidery on collar, chest placket, and sleeve cuffs.",
    "fabric": "100% Rajshahi Tussar Silk",
    "craft_technique": "Old-Dhaka Antique Zardozi Work",
    "colors": [
      {
        "name": "Deep Chocolate Brown",
        "hex": "#2B1F1D",
        "is_default": true
      },
      {
        "name": "Obsidian Black",
        "hex": "#191919",
        "is_default": false
      }
    ],
    "sizes": [
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "stock_status": "Limited Release — 5 Units Left",
    "images": {
      "hero_flatlay": "/assets/eid/eid-espresso-panjabi.jpg",
      "hanging_view": "/assets/products/men/panjabi-zardozi-chocolate/pedestal_stand_hang.jpg",
      "fabric_macro_detail": "/assets/products/men/panjabi-zardozi-chocolate/bullion_gold_macro.jpg",
      "back_view": "/assets/products/men/panjabi-zardozi-chocolate/back_seamless_cut.jpg",
      "folded_view": "/assets/products/men/panjabi-zardozi-chocolate/gift_casket_folded.jpg"
    },
    "has_3d_view": true,
    "has_virtual_try_on": true,
    "avatar_preview_id": "tryon_panjabi_zardozi_005",
    "fit_recommendation": "Atelier Tailored",
    "featured": true
  },
  {
    "id": "OOT-SAR-006",
    "name": "Antique Gold Zardozi Tissue Saree",
    "subtitle_or_tagline": "Bridal & Festive Heritage Edit",
    "category": "Saree",
    "collection": "The Eid Edit",
    "gender": "Women",
    "price_bdt": 16500,
    "original_price_bdt": 18900,
    "badge": "EXCLUSIVE",
    "description": "Woven with golden metallic threads over an ivory gossamer silk warp. Embellished with fine seed pearls and matte gold sequins along scalloped hand-cut borders.",
    "fabric": "Pure Tissue Silk & Metallic Zari",
    "craft_technique": "Hand-laid Mukaish & Zardozi Borders",
    "colors": [
      {
        "name": "Champagne Gold",
        "hex": "#D4C29D",
        "is_default": true
      }
    ],
    "sizes": [
      "Free Size (6.5 Yards with Blouse Piece)"
    ],
    "stock_status": "Made-to-Order (7 Days Dispatch)",
    "images": {
      "hero_flatlay": "/assets/eid/eid-folded-silks.jpg",
      "hanging_view": "/assets/products/women/saree-gold-tissue-zardozi/atelier_drape_stand.jpg",
      "fabric_macro_detail": "/assets/products/women/saree-gold-tissue-zardozi/scallop_pearl_macro.jpg",
      "back_view": "/assets/products/women/saree-gold-tissue-zardozi/blouse_piece_back.jpg",
      "folded_view": "/assets/products/women/saree-gold-tissue-zardozi/presentation_box_folded.jpg"
    },
    "has_3d_view": false,
    "has_virtual_try_on": false,
    "avatar_preview_id": null,
    "fit_recommendation": "Fluid Regal Drape",
    "featured": true
  },
  {
    "id": "OOT-SHT-007",
    "name": "Mandarin Cotton Everyday Shirt",
    "subtitle_or_tagline": "Atelier Signatures / Monochromatic Essential",
    "category": "Shirts",
    "collection": "Atelier Signatures",
    "gender": "Men",
    "price_bdt": 1950,
    "original_price_bdt": null,
    "badge": null,
    "description": "Clean, unembellished poplin shirt with architectural stand collar, concealed mother-of-pearl button placket, and curved minimalist hemline.",
    "fabric": "100% Combed Long-Staple Cotton",
    "craft_technique": "Single-Needle Fine Stitching",
    "colors": [
      {
        "name": "Optic White",
        "hex": "#FFFFFF",
        "is_default": true
      },
      {
        "name": "Warm Sand",
        "hex": "#E3D8C8",
        "is_default": false
      },
      {
        "name": "Washed Olive",
        "hex": "#4C5B4F",
        "is_default": false
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "stock_status": "In Stock — Dhaka Atelier",
    "images": {
      "hero_flatlay": "https://lh3.googleusercontent.com/aida-public/AB6AXuDkho7GRGanucC5LObsfZbrhRkfflXmrqZSVX2dIQIYYJHZl9Z_6i1wxWSWhg7WScfqasuirL_gfLs9XIlwZH2zioeEupmoY0duuxc8-5tuH8bEFZ3GELo8eDEOwGN70kGd8dgyds3Fly1YMVLEtYuR2r6ldcQeRaF4GOMN48hmphElDZQFQFoCGe7loxlLMmLkgHNYvZ0UxznsjWhAhORHKCPb7-o_-av2YZTPdGs=s0",
      "hanging_view": "/assets/products/men/shirt-mandarin-white/brass_hanger_studio.jpg",
      "fabric_macro_detail": "/assets/products/men/shirt-mandarin-white/pearl_button_placket_macro.jpg",
      "back_view": "/assets/products/men/shirt-mandarin-white/pleated_yoke_back.jpg",
      "folded_view": "/assets/products/men/shirt-mandarin-white/folded_collar_stand.jpg"
    },
    "has_3d_view": true,
    "has_virtual_try_on": true,
    "avatar_preview_id": "tryon_shirt_mandarin_007",
    "fit_recommendation": "Regular Relaxed",
    "featured": false
  },
  {
    "id": "OOT-PNT-008",
    "name": "Pleated Raw-Sand Linen Trousers",
    "subtitle_or_tagline": "Atelier Signatures / Architectural Fit",
    "category": "Pants",
    "collection": "Atelier Signatures",
    "gender": "Men",
    "price_bdt": 2800,
    "original_price_bdt": 3200,
    "badge": null,
    "description": "Double forward pleats, extended tab waistband with side adjusters, and a gentle tapered leg. Breathable raw sand linen ideal for subtropical Dhaka climate.",
    "fabric": "100% Pure Raw Flax Linen",
    "craft_technique": "Bespoke Sartorial Waistband Construction",
    "colors": [
      {
        "name": "Raw Sand",
        "hex": "#D8CDBA",
        "is_default": true
      },
      {
        "name": "Off-White Alabaster",
        "hex": "#F4F0E8",
        "is_default": false
      }
    ],
    "sizes": [
      "30",
      "32",
      "34",
      "36",
      "38"
    ],
    "stock_status": "In Stock — Dhaka Atelier",
    "images": {
      "hero_flatlay": "https://lh3.googleusercontent.com/aida-public/AB6AXuD_sl1s-rT1jL4gihSPUtemgnbulNFdRvXMSwQACnkPPgXP64mG6K6Hvb2_WwmH-dOYsBO2eR5FwRvlS9KlfAryHZgQLgD4V2e8jKTAEbo0H_HJXcmMYyXM0RKi7hRK6_q-tcEjHyKBqCyGNa9XA9sWmHJKM3CYyuwhN_NeEXmdtdx52UrQHj-KoTp4IZpaFMLu-Mw_AmMu9YBegBW1hj-19vlPIWlrgOqtUjbFAxY=s0",
      "hanging_view": "/assets/products/men/trouser-pleated-sand-linen/trouser_bar_hang.jpg",
      "fabric_macro_detail": "/assets/products/men/trouser-pleated-sand-linen/side_buckle_pleat_macro.jpg",
      "back_view": "/assets/products/men/trouser-pleated-sand-linen/rear_welt_pockets_back.jpg",
      "folded_view": "/assets/products/men/trouser-pleated-sand-linen/folded_crease_stack.jpg"
    },
    "has_3d_view": true,
    "has_virtual_try_on": true,
    "avatar_preview_id": "tryon_trouser_sand_008",
    "fit_recommendation": "Tapered Relaxed",
    "featured": false
  },
  {
    "id": "OOT-SAR-009",
    "name": "Katan Silk Handloom Saree",
    "subtitle_or_tagline": "Atelier Signatures / Heritage Gold",
    "category": "Saree",
    "collection": "Atelier Signatures",
    "gender": "Women",
    "price_bdt": 11200,
    "original_price_bdt": 13500,
    "badge": "LIMITED",
    "description": "Heavyweight emerald green katan silk body juxtaposed with a solid burnished antique gold zari border. Soft drape with lustrous natural sheen.",
    "fabric": "100% Pure Mulberry Silk with Metallic Zari",
    "craft_technique": "Mirpur Handloom Katan Weave",
    "colors": [
      {
        "name": "Emerald & Antique Gold",
        "hex": "#27402F",
        "is_default": true
      },
      {
        "name": "Imperial Maroon",
        "hex": "#4A171E",
        "is_default": false
      }
    ],
    "sizes": [
      "Free Size (6 Yards)"
    ],
    "stock_status": "In Stock — 4 Units Remaining",
    "images": {
      "hero_flatlay": "https://lh3.googleusercontent.com/aida-public/AB6AXuD72gHZPVdMYtTmQBh2rwGAqVYBd-FgoGz0dmgQHhcVEfIc9Nt6DlFfmsUfWT6f-Q4sMRQNfOMbR8t3UBXYMW_aTya2qZp5xguRuH2hKusKiFszoRa82gpOT0zncf0pha9zkReM-mHEYhVR2HalCLz8tZ8V3QRKTAiAysFcDD0uL2bXZ3zsthEOZpDhiVlqxNajrkDhMDzY-6ESss1qZHVDDZvaHvvom17XkVrMob4=s0",
      "hanging_view": "/assets/products/women/saree-katan-emerald-gold/flowing_drape_hang.jpg",
      "fabric_macro_detail": "/assets/products/women/saree-katan-emerald-gold/zari_border_sheen_macro.jpg",
      "back_view": "/assets/products/women/saree-katan-emerald-gold/pallu_trailing_back.jpg",
      "folded_view": "/assets/products/women/saree-katan-emerald-gold/muslin_wrapped_folded.jpg"
    },
    "has_3d_view": true,
    "has_virtual_try_on": false,
    "avatar_preview_id": null,
    "fit_recommendation": "Classic Drape",
    "featured": true
  },
  {
    "id": "OOT-SUT-010",
    "name": "Structured Wool Two-Piece Suit",
    "subtitle_or_tagline": "Atelier Signatures / Modern Tailoring",
    "category": "Suit",
    "collection": "Atelier Signatures",
    "gender": "Men",
    "price_bdt": 14500,
    "original_price_bdt": null,
    "badge": "EXCLUSIVE",
    "description": "Architectural midnight charcoal two-piece suit crafted from super-120s lightweight tropical wool. Features notched lapels and flat-front trousers.",
    "fabric": "100% Tropical Merino Wool (Super 120s)",
    "craft_technique": "Full Floating Canvas Construction",
    "colors": [
      {
        "name": "Midnight Charcoal",
        "hex": "#1F2326",
        "is_default": true
      },
      {
        "name": "Deep Espresso",
        "hex": "#2C221E",
        "is_default": false
      }
    ],
    "sizes": [
      "38R",
      "40R",
      "42R",
      "44R"
    ],
    "stock_status": "In Stock — Dhaka Atelier",
    "images": {
      "hero_flatlay": "https://lh3.googleusercontent.com/aida-public/AB6AXuAqyrJTi9nfT1P_Di0ZavWYRlZQKt4gQQ9uVi337kVqznaHvZNLLji3PwQBM6Ksjf5RGTEhTAx_OuGb3sRSO69ilPKqmizPOEyWbJjJAXtRLAU3w2zcshQ0DJU_EpFYRhr0yjxPEN_wm1Pv8GO4h3AWa_OxeG-ibCX5lqnhHWmq6hCEPbbh9UFmxReEYx_SmqPjSjEOR6OU3pmzbsT7pvPWLIk9wS-nwSNfj8Pekyw=s0",
      "hanging_view": "/assets/products/men/suit-structured-charcoal-wool/valet_stand_hang.jpg",
      "fabric_macro_detail": "/assets/products/men/suit-structured-charcoal-wool/notch_lapel_stitch_macro.jpg",
      "back_view": "/assets/products/men/suit-structured-charcoal-wool/double_vent_back.jpg",
      "folded_view": "/assets/products/men/suit-structured-charcoal-wool/canvas_garment_bag_folded.jpg"
    },
    "has_3d_view": true,
    "has_virtual_try_on": true,
    "avatar_preview_id": "tryon_suit_charcoal_010",
    "fit_recommendation": "Structured Modern Fit",
    "featured": true
  },
  {
    "id": "OOT-PAN-011",
    "name": "Dhakai Handloom Embroidered Panjabi",
    "subtitle_or_tagline": "New Atelier Collection / Quick View Feature",
    "category": "Panjabi",
    "collection": "The New Bangladeshi Edit",
    "gender": "Men",
    "price_bdt": 6800,
    "original_price_bdt": 7500,
    "badge": "NEW ATELIER",
    "description": "Hand-spun Bangladeshi cotton enriched with intricate geometric threadwork along the placket. Cut with clean high slits for fluid movement and comfort.",
    "fabric": "100% Hand-Spun Deshi Cotton Muslin",
    "craft_technique": "Dhakai Fine Needle Handwork",
    "colors": [
      {
        "name": "Ivory Alabaster",
        "hex": "#F7F5EE",
        "is_default": true
      },
      {
        "name": "Deep Forest Olive",
        "hex": "#304033",
        "is_default": false
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "stock_status": "In Stock — Dhaka Atelier",
    "images": {
      "hero_flatlay": "https://lh3.googleusercontent.com/aida-public/AB6AXuCua08J3bqXRcnBLFIc44WM9WsVxOnAAg28SNwXK4lp6Ce0iAzpBJYKlB7PIHzIBPij1H_rbO4ZEMXqJ8BscO9KLIMx_GolCSnVirGq7Nu1Nev-pFgZ8jqJiHh-xYqoYA-Mct08q996xytLK4N8VVD_Lo5vx3rOcyNfnORRk_kXsbUlU2pjvXSuNfmwA0vTrIHAlimLRf6G5s8GR-8y42MNb5_gM79OdXVD_ljpLTY=s0",
      "hanging_view": "/assets/products/men/panjabi-dhakai-handloom-ivory/studio_hanger_view.jpg",
      "fabric_macro_detail": "/assets/products/men/panjabi-dhakai-handloom-ivory/geometric_needlework_macro.jpg",
      "back_view": "/assets/products/men/panjabi-dhakai-handloom-ivory/high_slit_profile_back.jpg",
      "folded_view": "/assets/products/men/panjabi-dhakai-handloom-ivory/atelier_cardboard_folded.jpg"
    },
    "has_3d_view": true,
    "has_virtual_try_on": true,
    "avatar_preview_id": "tryon_panjabi_dhakai_011",
    "fit_recommendation": "Comfort Tailored",
    "featured": false
  },
  {
    "id": "OOT-SHT-012",
    "name": "Atelier Linen Overshirt",
    "subtitle_or_tagline": "Account Order #OOT-84920 Delivered Item",
    "category": "Shirts",
    "collection": "Atelier Signatures",
    "gender": "Men",
    "price_bdt": 4850,
    "original_price_bdt": null,
    "badge": null,
    "description": "Heavyweight washed linen overshirt with dual utility chest flap pockets, horn buttons, and straight boxy hemline designed for layering over t-shirts or kurtas.",
    "fabric": "100% French Heavyweight Washed Linen",
    "craft_technique": "Garment Enriched Enzyme Wash",
    "colors": [
      {
        "name": "Deep Olive",
        "hex": "#3A4A3F",
        "is_default": true
      },
      {
        "name": "Raw Sand",
        "hex": "#DACFBD",
        "is_default": false
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "stock_status": "In Stock — Dhaka Atelier",
    "images": {
      "hero_flatlay": "https://lh3.googleusercontent.com/aida-public/AB6AXuDkho7GRGanucC5LObsfZbrhRkfflXmrqZSVX2dIQIYYJHZl9Z_6i1wxWSWhg7WScfqasuirL_gfLs9XIlwZH2zioeEupmoY0duuxc8-5tuH8bEFZ3GELo8eDEOwGN70kGd8dgyds3Fly1YMVLEtYuR2r6ldcQeRaF4GOMN48hmphElDZQFQFoCGe7loxlLMmLkgHNYvZ0UxznsjWhAhORHKCPb7-o_-av2YZTPdGs=s0",
      "hanging_view": "/assets/products/men/overshirt-atelier-linen-olive/natural_oak_hang.jpg",
      "fabric_macro_detail": "/assets/products/men/overshirt-atelier-linen-olive/bellow_pocket_texture_macro.jpg",
      "back_view": "/assets/products/men/overshirt-atelier-linen-olive/straight_yoke_back.jpg",
      "folded_view": "/assets/products/men/overshirt-atelier-linen-olive/industrial_folded_display.jpg"
    },
    "has_3d_view": true,
    "has_virtual_try_on": true,
    "avatar_preview_id": "tryon_overshirt_olive_012",
    "fit_recommendation": "Relaxed Boxy",
    "featured": false
  },
  {
    "id": "OOT-LHN-013",
    "name": "Botanical Jamdani Weave Lehenga",
    "subtitle_or_tagline": "Couture Bridal Capsule",
    "category": "Lehenga",
    "collection": "The Eid Edit",
    "gender": "Women",
    "price_bdt": 28500,
    "original_price_bdt": 32000,
    "badge": "LIMITED",
    "description": "Sixteen-panel flaring lehenga skirt hand-woven with heritage Jamdani vines using gold zari and silk threads over natural ecru base. Paired with a fitted silk choli.",
    "fabric": "Pure Khadi Muslin & Tussar Silk",
    "craft_technique": "Handloom Kalidar Jamdani Weave",
    "colors": [
      {
        "name": "Ecru & Pale Gold",
        "hex": "#EDE5D8",
        "is_default": true
      }
    ],
    "sizes": [
      "Custom Atelier Sizing (XS - XL)"
    ],
    "stock_status": "Bespoke Order (14 Days Crafting)",
    "images": {
      "hero_flatlay": "/assets/eid/nocturne-garment-clean.jpg",
      "hanging_view": "/assets/products/women/lehenga-botanical-jamdani-ecru/mannequin_volumetric_hang.jpg",
      "fabric_macro_detail": "/assets/products/women/lehenga-botanical-jamdani-ecru/kalidar_zari_vine_macro.jpg",
      "back_view": "/assets/products/women/lehenga-botanical-jamdani-ecru/tassled_latkan_back.jpg",
      "folded_view": "/assets/products/women/lehenga-botanical-jamdani-ecru/archive_trunk_folded.jpg"
    },
    "has_3d_view": false,
    "has_virtual_try_on": false,
    "avatar_preview_id": null,
    "fit_recommendation": "Custom Waist & Flare",
    "featured": true
  },
  {
    "id": "OOT-PAN-014",
    "name": "Obsidian Black Minimal Panjabi",
    "subtitle_or_tagline": "Virtual Try-On 3D Featured Preset",
    "category": "Panjabi",
    "collection": "Atelier Signatures",
    "gender": "Men",
    "price_bdt": 3200,
    "original_price_bdt": null,
    "badge": null,
    "description": "Matte black combed cotton-modal Panjabi with concealed placket and tonal matte gunmetal snaps. Architectural side slit finishing for streamlined silhouette.",
    "fabric": "60% Combed Cotton, 40% Lenzing Modal",
    "craft_technique": "Concealed Placket Precision Tailoring",
    "colors": [
      {
        "name": "Obsidian Black",
        "hex": "#121212",
        "is_default": true
      },
      {
        "name": "Ivory Alabaster",
        "hex": "#F8F5F0",
        "is_default": false
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "stock_status": "In Stock — Dhaka Atelier",
    "images": {
      "hero_flatlay": "/assets/eid/eid-espresso-panjabi.jpg",
      "hanging_view": "/assets/products/men/panjabi-obsidian-black-minimal/black_metal_hanger_view.jpg",
      "fabric_macro_detail": "/assets/products/men/panjabi-obsidian-black-minimal/gunmetal_snap_macro.jpg",
      "back_view": "/assets/products/men/panjabi-obsidian-black-minimal/streamlined_spine_back.jpg",
      "folded_view": "/assets/products/men/panjabi-obsidian-black-minimal/matte_crease_folded.jpg"
    },
    "has_3d_view": true,
    "has_virtual_try_on": true,
    "avatar_preview_id": "tryon_panjabi_black_014",
    "fit_recommendation": "Tailored Slim",
    "featured": false
  },
  {
    "id": "OOT-KID-015",
    "name": "Junior Ivory Jamdani Panjabi Set",
    "subtitle_or_tagline": "The Little Edit / Festive Collection",
    "category": "Kids",
    "collection": "The Little Edit",
    "gender": "Kids",
    "price_bdt": 2200,
    "original_price_bdt": null,
    "badge": "NEW",
    "description": "Hypoallergenic organic cotton Panjabi tailored for young boys with breathable jamdani yoke accent. Includes matching cotton pajama trousers with elasticized waistband.",
    "fabric": "100% GOTS Certified Organic Cotton",
    "craft_technique": "Gentle Handloom Weave & Soft Seaming",
    "colors": [
      {
        "name": "Natural Ivory",
        "hex": "#FAF7F2",
        "is_default": true
      },
      {
        "name": "Soft Sage",
        "hex": "#B6C3B9",
        "is_default": false
      }
    ],
    "sizes": [
      "2-3Y",
      "4-5Y",
      "6-7Y",
      "8-9Y",
      "10-12Y"
    ],
    "stock_status": "In Stock — Dhaka Atelier",
    "images": {
      "hero_flatlay": "https://lh3.googleusercontent.com/aida-public/AB6AXuCua08J3bqXRcnBLFIc44WM9WsVxOnAAg28SNwXK4lp6Ce0iAzpBJYKlB7PIHzIBPij1H_rbO4ZEMXqJ8BscO9KLIMx_GolCSnVirGq7Nu1Nev-pFgZ8jqJiHh-xYqoYA-Mct08q996xytLK4N8VVD_Lo5vx3rOcyNfnORRk_kXsbUlU2pjvXSuNfmwA0vTrIHAlimLRf6G5s8GR-8y42MNb5_gM79OdXVD_ljpLTY=s0",
      "hanging_view": "/assets/products/kids/panjabi-junior-jamdani-ivory/child_wooden_hanger.jpg",
      "fabric_macro_detail": "/assets/products/kids/panjabi-junior-jamdani-ivory/soft_yoke_jamdani_macro.jpg",
      "back_view": "/assets/products/kids/panjabi-junior-jamdani-ivory/relaxed_kid_cut_back.jpg",
      "folded_view": "/assets/products/kids/panjabi-junior-jamdani-ivory/pajama_combo_folded.jpg"
    },
    "has_3d_view": false,
    "has_virtual_try_on": false,
    "avatar_preview_id": null,
    "fit_recommendation": "Comfort Kidswear Fit",
    "featured": false
  },
  {
    "id": "OOT-KID-016",
    "name": "Girls Fine Chanderi Kurti Set",
    "subtitle_or_tagline": "The Little Edit / Heritage Festive",
    "category": "Kids",
    "collection": "The Little Edit",
    "gender": "Kids",
    "price_bdt": 2650,
    "original_price_bdt": null,
    "badge": null,
    "description": "Two-piece festive kurti set in pale blush Chanderi with golden booti motifs and scalloped hemline. Paired with soft dhoti-style cotton salwar.",
    "fabric": "Chanderi Cotton-Silk with Mulmul Lining",
    "craft_technique": "Hand-blocked Foil & Thread Finish",
    "colors": [
      {
        "name": "Pale Blush",
        "hex": "#EBDCD6",
        "is_default": true
      },
      {
        "name": "Butter Ivory",
        "hex": "#F4EEDC",
        "is_default": false
      }
    ],
    "sizes": [
      "3-4Y",
      "5-6Y",
      "7-8Y",
      "9-10Y"
    ],
    "stock_status": "In Stock — Dhaka Atelier",
    "images": {
      "hero_flatlay": "https://lh3.googleusercontent.com/aida-public/AB6AXuAYAFI_PmmauTCrm73TRCjj9Gevg-iIOPNnIMA2vXYOHYf5jALiTM7imQ9s_EH-7ht0ryf1qGxIMrIlApFTt66mJiK_hRskBhuya8Qth9QaLsb6RUIs9tADGdHqVSU1EODql9mLkxW7hSiE_Q92yyE_Gn7SPqLbbEJKY__D3IzzQDLnS0Z2e5S79HhdWI__isNQlL9jW9bAmBCiTdraouLZKeeE6AgSVWXojJf6ZIQ=s0",
      "hanging_view": "/assets/products/kids/kurti-girls-chanderi-blush/petite_mannequin_hang.jpg",
      "fabric_macro_detail": "/assets/products/kids/kurti-girls-chanderi-blush/scallop_booti_macro.jpg",
      "back_view": "/assets/products/kids/kurti-girls-chanderi-blush/keyhole_button_back.jpg",
      "folded_view": "/assets/products/kids/kurti-girls-chanderi-blush/dhoti_set_folded.jpg"
    },
    "has_3d_view": false,
    "has_virtual_try_on": false,
    "avatar_preview_id": null,
    "fit_recommendation": "Relaxed A-Line",
    "featured": false
  },
  {
    "id": "OOT-KUR-017",
    "name": "Asymmetric Mulberry Silk Kurti",
    "subtitle_or_tagline": "Womenswear / Minimal Day-to-Evening",
    "category": "Kurti",
    "collection": "The New Bangladeshi Edit",
    "gender": "Women",
    "price_bdt": 3600,
    "original_price_bdt": 4200,
    "badge": null,
    "description": "Contemporary high-low tunic in raw tussar silk featuring a mock cowl neck and structured side slit with horn button accents.",
    "fabric": "100% Indigenous Mulberry Silk",
    "craft_technique": "Precision Bias-Cut Silhouette",
    "colors": [
      {
        "name": "Warm Putty",
        "hex": "#D1C7BA",
        "is_default": true
      },
      {
        "name": "Espresso",
        "hex": "#2C221E",
        "is_default": false
      }
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "stock_status": "In Stock — Dhaka Atelier",
    "images": {
      "hero_flatlay": "https://lh3.googleusercontent.com/aida-public/AB6AXuAYAFI_PmmauTCrm73TRCjj9Gevg-iIOPNnIMA2vXYOHYf5jALiTM7imQ9s_EH-7ht0ryf1qGxIMrIlApFTt66mJiK_hRskBhuya8Qth9QaLsb6RUIs9tADGdHqVSU1EODql9mLkxW7hSiE_Q92yyE_Gn7SPqLbbEJKY__D3IzzQDLnS0Z2e5S79HhdWI__isNQlL9jW9bAmBCiTdraouLZKeeE6AgSVWXojJf6ZIQ=s0",
      "hanging_view": "/assets/products/women/kurti-asymmetric-mulberry-putty/flax_cord_hanger_view.jpg",
      "fabric_macro_detail": "/assets/products/women/kurti-asymmetric-mulberry-putty/cowl_slit_button_macro.jpg",
      "back_view": "/assets/products/women/kurti-asymmetric-mulberry-putty/elongated_hem_back.jpg",
      "folded_view": "/assets/products/women/kurti-asymmetric-mulberry-putty/minimal_creased_folded.jpg"
    },
    "has_3d_view": true,
    "has_virtual_try_on": true,
    "avatar_preview_id": "tryon_kurti_putty_017",
    "fit_recommendation": "Fluid Architectural",
    "featured": false
  },
  {
    "id": "OOT-SLW-018",
    "name": "Classic Tangail Cotton Salwar Kameez",
    "subtitle_or_tagline": "Heritage Daytime Edit",
    "category": "Salwar Kameez",
    "collection": "Atelier Signatures",
    "gender": "Women",
    "price_bdt": 3950,
    "original_price_bdt": null,
    "badge": null,
    "description": "Authentic Tangail handloom cotton three-piece suite woven with understated fish-scale motifs along border. Paired with pure cotton churidar trousers.",
    "fabric": "100% Hand-loomed Tangail Cotton",
    "craft_technique": "Tangail Handloom Border Jacquard",
    "colors": [
      {
        "name": "Natural Ecru",
        "hex": "#F4EFE6",
        "is_default": true
      },
      {
        "name": "Indigo Charcoal",
        "hex": "#2B323D",
        "is_default": false
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "stock_status": "In Stock — Dhaka Atelier",
    "images": {
      "hero_flatlay": "/assets/eid/nocturne-garment-clean.jpg",
      "hanging_view": "/assets/products/women/salwar-tangail-cotton-ecru/studio_rod_drape.jpg",
      "fabric_macro_detail": "/assets/products/women/salwar-tangail-cotton-ecru/fishscale_border_macro.jpg",
      "back_view": "/assets/products/women/salwar-tangail-cotton-ecru/churidar_dupatta_back.jpg",
      "folded_view": "/assets/products/women/salwar-tangail-cotton-ecru/three_piece_stack_folded.jpg"
    },
    "has_3d_view": false,
    "has_virtual_try_on": false,
    "avatar_preview_id": null,
    "fit_recommendation": "Standard Tailored",
    "featured": false
  },
  {
    "id": "OOT-PAN-019",
    "name": "Festive Fine-Khadi Panjabi",
    "subtitle_or_tagline": "Hand-spun Comilla Khadi Capsule",
    "category": "Panjabi",
    "collection": "The Eid Edit",
    "gender": "Men",
    "price_bdt": 3890,
    "original_price_bdt": 4500,
    "badge": "LIMITED",
    "description": "Textured hand-spun Comilla Khadi Panjabi featuring wooden stud buttons and subtle contrast inner yoke binding.",
    "fabric": "100% Artisan-Spun Comilla Khadi Cotton",
    "craft_technique": "Indigenous Hand-Spinning & Weaving",
    "colors": [
      {
        "name": "Warm Oatmeal",
        "hex": "#DDD4C5",
        "is_default": true
      },
      {
        "name": "Muted Moss",
        "hex": "#6C7A6D",
        "is_default": false
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "stock_status": "In Stock — Dhaka Atelier",
    "images": {
      "hero_flatlay": "https://lh3.googleusercontent.com/aida-public/AB6AXuAlHxT9a54dLcyokiwx7H_bzlRZyUPfxuO-b1pZ4NW1rc8f-PiooIwIfcW8aNnLVWxNQp1GNxzynr9XfDXZapZ6QwKy2oaaxp5c6qsKoQZtGg1SR8wGv0MGNkwlQxIV9nplGd11SyLjykbZnpyh091diOfdjb6DO9-KU9gJT84zZ9gy6-OQ0V8f8g0IhesvVkOWoLIg7D1-UHz_uIn922tCC0eLYqg4dDHAOSBNQD0=s0",
      "hanging_view": "/assets/products/men/panjabi-fine-khadi-oatmeal/rustic_wooden_hanger.jpg",
      "fabric_macro_detail": "/assets/products/men/panjabi-fine-khadi-oatmeal/slub_khadi_stud_macro.jpg",
      "back_view": "/assets/products/men/panjabi-fine-khadi-oatmeal/contrast_yoke_back.jpg",
      "folded_view": "/assets/products/men/panjabi-fine-khadi-oatmeal/artisan_paper_folded.jpg"
    },
    "has_3d_view": true,
    "has_virtual_try_on": true,
    "avatar_preview_id": "tryon_panjabi_khadi_019",
    "fit_recommendation": "Classic Straight",
    "featured": false
  },
  {
    "id": "OOT-PNT-020",
    "name": "Tailored Charcoal Wool Trousers",
    "subtitle_or_tagline": "Menswear Essentials",
    "category": "Pants",
    "collection": "Atelier Signatures",
    "gender": "Men",
    "price_bdt": 3400,
    "original_price_bdt": null,
    "badge": null,
    "description": "Mid-rise trousers with crisp front center crease, horn button fly, and tailored blind hem cuffs.",
    "fabric": "90% Tropical Wool, 10% Silk",
    "craft_technique": "Bespoke Split-Curtain Waistband",
    "colors": [
      {
        "name": "Charcoal Grey",
        "hex": "#2E3033",
        "is_default": true
      },
      {
        "name": "Deep Black",
        "hex": "#1A1A1A",
        "is_default": false
      }
    ],
    "sizes": [
      "30",
      "32",
      "34",
      "36",
      "38"
    ],
    "stock_status": "In Stock — Dhaka Atelier",
    "images": {
      "hero_flatlay": "https://lh3.googleusercontent.com/aida-public/AB6AXuD_sl1s-rT1jL4gihSPUtemgnbulNFdRvXMSwQACnkPPgXP64mG6K6Hvb2_WwmH-dOYsBO2eR5FwRvlS9KlfAryHZgQLgD4V2e8jKTAEbo0H_HJXcmMYyXM0RKi7hRK6_q-tcEjHyKBqCyGNa9XA9sWmHJKM3CYyuwhN_NeEXmdtdx52UrQHj-KoTp4IZpaFMLu-Mw_AmMu9YBegBW1hj-19vlPIWlrgOqtUjbFAxY=s0",
      "hanging_view": "/assets/products/men/trouser-tailored-charcoal-wool/clamping_hanger_view.jpg",
      "fabric_macro_detail": "/assets/products/men/trouser-tailored-charcoal-wool/blind_hem_crease_macro.jpg",
      "back_view": "/assets/products/men/trouser-tailored-charcoal-wool/curtain_waistband_back.jpg",
      "folded_view": "/assets/products/men/trouser-tailored-charcoal-wool/flat_creased_stack.jpg"
    },
    "has_3d_view": true,
    "has_virtual_try_on": true,
    "avatar_preview_id": "tryon_trouser_charcoal_020",
    "fit_recommendation": "Slim Straight",
    "featured": false
  },
  {
    "id": "OOT-SAR-021",
    "name": "Monochrome Muslin Jamdani Saree",
    "subtitle_or_tagline": "Modern Heritage Collector Edition",
    "category": "Saree",
    "collection": "The New Bangladeshi Edit",
    "gender": "Women",
    "price_bdt": 14200,
    "original_price_bdt": 16000,
    "badge": "LIMITED",
    "description": "Ultra-lightweight black muslin ground decorated with geometric diamond motifs in pure white cotton thread. Minimalist luxury statement.",
    "fabric": "100% Superfine Handloom Muslin",
    "craft_technique": "Supplementary Weft Needle Weave",
    "colors": [
      {
        "name": "Obsidian & Chalk",
        "hex": "#1E1E1E",
        "is_default": true
      }
    ],
    "sizes": [
      "Free Size (6 Yards)"
    ],
    "stock_status": "2 Units Remaining",
    "images": {
      "hero_flatlay": "https://lh3.googleusercontent.com/aida-public/AB6AXuBeQcivkgTtkfnKeO-ByW7wpzBO4JIOtGHPjj2SYlb8EIcaZ59Z3TRu88zjZ2TXH_31oUeBCa2_QM6tQDjdAI3LlyoNXoqpyA_ySh8kACVIYY5fHPgDQGd92NeDL9sM5-ZRQ2XUvwAjUHAdXsVqqd5ncYIbfujibuehHISlhUQueAkZ_tRKmPQoRDtebrNIiLHuJTs3lrijLnnZ4aJUmADlUq6bCLYDaQSHFjmkHyM=s0",
      "hanging_view": "/assets/products/women/saree-muslin-jamdani-monochrome/backlit_sheer_drape.jpg",
      "fabric_macro_detail": "/assets/products/women/saree-muslin-jamdani-monochrome/diamond_white_thread_macro.jpg",
      "back_view": "/assets/products/women/saree-muslin-jamdani-monochrome/contrast_fall_back.jpg",
      "folded_view": "/assets/products/women/saree-muslin-jamdani-monochrome/black_archive_box_folded.jpg"
    },
    "has_3d_view": false,
    "has_virtual_try_on": false,
    "avatar_preview_id": null,
    "fit_recommendation": "Architectural Drape",
    "featured": true
  },
  {
    "id": "OOT-SHT-022",
    "name": "Pleated Bib Tuxedo Shirt",
    "subtitle_or_tagline": "Evening & Formal Collection",
    "category": "Shirts",
    "collection": "Atelier Signatures",
    "gender": "Men",
    "price_bdt": 2950,
    "original_price_bdt": null,
    "badge": null,
    "description": "Crisp 140s two-ply cotton shirt featuring micro-pin-tuck front bib, French cuffs, and wingtip collar.",
    "fabric": "100% Giza Egyptian Cotton",
    "craft_technique": "Precision Micro-Pin-Tuck Pleating",
    "colors": [
      {
        "name": "Starch White",
        "hex": "#FFFFFF",
        "is_default": true
      }
    ],
    "sizes": [
      "38",
      "39",
      "40",
      "41",
      "42",
      "43"
    ],
    "stock_status": "In Stock — Dhaka Atelier",
    "images": {
      "hero_flatlay": "https://lh3.googleusercontent.com/aida-public/AB6AXuDkho7GRGanucC5LObsfZbrhRkfflXmrqZSVX2dIQIYYJHZl9Z_6i1wxWSWhg7WScfqasuirL_gfLs9XIlwZH2zioeEupmoY0duuxc8-5tuH8bEFZ3GELo8eDEOwGN70kGd8dgyds3Fly1YMVLEtYuR2r6ldcQeRaF4GOMN48hmphElDZQFQFoCGe7loxlLMmLkgHNYvZ0UxznsjWhAhORHKCPb7-o_-av2YZTPdGs=s0",
      "hanging_view": "/assets/products/men/shirt-pleated-bib-tuxedo/tuxedo_stand_hanger.jpg",
      "fabric_macro_detail": "/assets/products/men/shirt-pleated-bib-tuxedo/micro_pintuck_bib_macro.jpg",
      "back_view": "/assets/products/men/shirt-pleated-bib-tuxedo/french_cuff_back.jpg",
      "folded_view": "/assets/products/men/shirt-pleated-bib-tuxedo/collar_stud_band_folded.jpg"
    },
    "has_3d_view": true,
    "has_virtual_try_on": true,
    "avatar_preview_id": "tryon_shirt_tuxedo_022",
    "fit_recommendation": "Sartorial Fitted",
    "featured": false
  },
  {
    "id": "OOT-BLZ-023",
    "name": "Sand Raw Silk Bandhgala Jacket",
    "subtitle_or_tagline": "Traditional Eastern Formalwear",
    "category": "Blazer",
    "collection": "The Eid Edit",
    "gender": "Men",
    "price_bdt": 8800,
    "original_price_bdt": 9900,
    "badge": "EXCLUSIVE",
    "description": "High stand-collar Bandhgala jacket constructed from textured Rajshahi Matka silk with hand-turned brass buttons and chest welt pocket.",
    "fabric": "100% Pure Rajshahi Matka Silk",
    "craft_technique": "Hand-stitched Structured Tailoring",
    "colors": [
      {
        "name": "Warm Sand",
        "hex": "#D1C6B4",
        "is_default": true
      },
      {
        "name": "Midnight Charcoal",
        "hex": "#232628",
        "is_default": false
      }
    ],
    "sizes": [
      "38R",
      "40R",
      "42R",
      "44R"
    ],
    "stock_status": "In Stock — Dhaka Atelier",
    "images": {
      "hero_flatlay": "https://lh3.googleusercontent.com/aida-public/AB6AXuCoFHKrK_pzA3MAoy-T41foeGmDQxJ0Wzcvk68JSpVpPJUty7qH4nx0IJNuFFjnKMHMiMIAj2Tr2EEv1p_AlVi5BQdKmUq2X_s_MA93FcfeqLhoiAuLsTu4NZypKr3W3iSvlftVfCEVpAV3JilELtV5jpN7qPlAHKbYJbXV9tsTf8AEvJyeIilVwSj3dV5Sf-rmKRzrYePi7PCtsrj2-xIHmGw4MF3WILCYvms8xyM=s0",
      "hanging_view": "/assets/products/men/blazer-bandhgala-sand-matka/sculpted_torso_hanger.jpg",
      "fabric_macro_detail": "/assets/products/men/blazer-bandhgala-sand-matka/brass_button_collar_macro.jpg",
      "back_view": "/assets/products/men/blazer-bandhgala-sand-matka/tailored_waist_seam_back.jpg",
      "folded_view": "/assets/products/men/blazer-bandhgala-sand-matka/folded_suit_box.jpg"
    },
    "has_3d_view": true,
    "has_virtual_try_on": true,
    "avatar_preview_id": "tryon_bandhgala_sand_023",
    "fit_recommendation": "Structured Royal",
    "featured": true
  },
  {
    "id": "OOT-TRP-024",
    "name": "Chanderi Gold Leaf Three-Piece",
    "subtitle_or_tagline": "Womenswear Festive Collection",
    "category": "Three-Piece",
    "collection": "The Eid Edit",
    "gender": "Women",
    "price_bdt": 6200,
    "original_price_bdt": 7200,
    "badge": "NEW",
    "description": "Subtle metallic shimmer Chanderi straight kurta, paired with wide palazzo pants and a sheer Kota Doria dupatta with subtle sequin edging.",
    "fabric": "Chanderi Silk-Cotton Blend & Kota Doria",
    "craft_technique": "Hand-done Aari Sequin Embroidery",
    "colors": [
      {
        "name": "Muted Pale Gold",
        "hex": "#DFD3BA",
        "is_default": true
      },
      {
        "name": "Soft Sage Mist",
        "hex": "#C4CEC5",
        "is_default": false
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "stock_status": "In Stock — Dhaka Atelier",
    "images": {
      "hero_flatlay": "https://lh3.googleusercontent.com/aida-public/AB6AXuBaHEhrOg3rqjVYFyAaT_FhKLFkCkrCMOZOGzHAgOQabQL6MjrKy9tH16rH4EI7wi6b2dORwohONtNL_fOwNRd25jXY5bHVv2cYlP_PQA3_v573jK1EuaEWCvAFmgFPT0nM-S3OH4CF8Q3PKAq0x0X2BkKhlC-n2e1OkeUnn3NXr4ik6CnPtcsIe5JVCorVtqXe70WtHKYZouQx1Wpc8sxj702NGJNsORjJ9LEaDPY=s0",
      "hanging_view": "/assets/products/women/threepiece-chanderi-goldleaf/trio_palazzo_hang.jpg",
      "fabric_macro_detail": "/assets/products/women/threepiece-chanderi-goldleaf/aari_sequin_leaf_macro.jpg",
      "back_view": "/assets/products/women/threepiece-chanderi-goldleaf/sheer_kota_dupatta_back.jpg",
      "folded_view": "/assets/products/women/threepiece-chanderi-goldleaf/silk_ribbon_folded.jpg"
    },
    "has_3d_view": false,
    "has_virtual_try_on": true,
    "avatar_preview_id": "tryon_threepiece_gold_024",
    "fit_recommendation": "Relaxed Straight",
    "featured": false
  },
  {
    "id": "OOT-PAN-025",
    "name": "Self-Textured Tussar Panjabi",
    "subtitle_or_tagline": "Atelier Signatures",
    "category": "Panjabi",
    "collection": "Atelier Signatures",
    "gender": "Men",
    "price_bdt": 4400,
    "original_price_bdt": null,
    "badge": null,
    "description": "Textured Tussar silk Panjabi featuring woven micro-rib stripes, mandarin collar with loop buttons, and deep side pocket engineering.",
    "fabric": "Pure Tussar Silk with Cotton Slub",
    "craft_technique": "Jacquard Self-Texture Rib Weave",
    "colors": [
      {
        "name": "Alabaster Cream",
        "hex": "#F6F2E8",
        "is_default": true
      },
      {
        "name": "Charcoal Black",
        "hex": "#1C1D1E",
        "is_default": false
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "stock_status": "In Stock — Dhaka Atelier",
    "images": {
      "hero_flatlay": "https://lh3.googleusercontent.com/aida-public/AB6AXuAlHxT9a54dLcyokiwx7H_bzlRZyUPfxuO-b1pZ4NW1rc8f-PiooIwIfcW8aNnLVWxNQp1GNxzynr9XfDXZapZ6QwKy2oaaxp5c6qsKoQZtGg1SR8wGv0MGNkwlQxIV9nplGd11SyLjykbZnpyh091diOfdjb6DO9-KU9gJT84zZ9gy6-OQ0V8f8g0IhesvVkOWoLIg7D1-UHz_uIn922tCC0eLYqg4dDHAOSBNQD0=s0",
      "hanging_view": "/assets/products/men/panjabi-tussar-rib-cream/sculpted_hanger_studio.jpg",
      "fabric_macro_detail": "/assets/products/men/panjabi-tussar-rib-cream/jacquard_rib_texture_macro.jpg",
      "back_view": "/assets/products/men/panjabi-tussar-rib-cream/deep_pocket_profile_back.jpg",
      "folded_view": "/assets/products/men/panjabi-tussar-rib-cream/clean_square_folded.jpg"
    },
    "has_3d_view": true,
    "has_virtual_try_on": true,
    "avatar_preview_id": "tryon_panjabi_tussar_025",
    "fit_recommendation": "Tailored Regular",
    "featured": false
  },
  {
    "id": "OOT-SAR-026",
    "name": "Matka Silk Minimalist Saree",
    "subtitle_or_tagline": "Atelier Contemporary Weaves",
    "category": "Saree",
    "collection": "Atelier Signatures",
    "gender": "Women",
    "price_bdt": 7900,
    "original_price_bdt": null,
    "badge": null,
    "description": "Hand-spun Matka raw silk saree in natural biscuit tone with a fine selvedge finished in midnight charcoal thread. Drapes with crisp, sculptural grace.",
    "fabric": "100% Hand-spun Mulberry Matka Silk",
    "craft_technique": "Artisanal Pit-Loom Plain Weave",
    "colors": [
      {
        "name": "Natural Biscuit",
        "hex": "#E0D7C6",
        "is_default": true
      }
    ],
    "sizes": [
      "Free Size (6 Yards)"
    ],
    "stock_status": "In Stock — Dhaka Atelier",
    "images": {
      "hero_flatlay": "/assets/eid/eid-folded-silks.jpg",
      "hanging_view": "/assets/products/women/saree-matka-biscuit-selvedge/vertical_drape_hang.jpg",
      "fabric_macro_detail": "/assets/products/women/saree-matka-biscuit-selvedge/charcoal_selvedge_macro.jpg",
      "back_view": "/assets/products/women/saree-matka-biscuit-selvedge/sculptural_fall_back.jpg",
      "folded_view": "/assets/products/women/saree-matka-biscuit-selvedge/jute_tied_folded.jpg"
    },
    "has_3d_view": true,
    "has_virtual_try_on": false,
    "avatar_preview_id": null,
    "fit_recommendation": "Sculptural Crisp",
    "featured": false
  },
  {
    "id": "OOT-PNT-027",
    "name": "Drawstring Relaxed Silk-Linen Pants",
    "subtitle_or_tagline": "Modern Lounge & Festive Trousers",
    "category": "Pants",
    "collection": "The New Bangladeshi Edit",
    "gender": "Men",
    "price_bdt": 2600,
    "original_price_bdt": null,
    "badge": null,
    "description": "Elasticated back waistband with tonal woven drawstring, slanted welt pockets, and relaxed tapered ankle with subtle vented hem.",
    "fabric": "65% Fine Linen, 35% Mulberry Raw Silk",
    "craft_technique": "Garment-softened Hand Wash",
    "colors": [
      {
        "name": "Ivory Alabaster",
        "hex": "#F5F2EB",
        "is_default": true
      },
      {
        "name": "Deep Forest Olive",
        "hex": "#3A4A3F",
        "is_default": false
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "stock_status": "In Stock — Dhaka Atelier",
    "images": {
      "hero_flatlay": "https://lh3.googleusercontent.com/aida-public/AB6AXuD_sl1s-rT1jL4gihSPUtemgnbulNFdRvXMSwQACnkPPgXP64mG6K6Hvb2_WwmH-dOYsBO2eR5FwRvlS9KlfAryHZgQLgD4V2e8jKTAEbo0H_HJXcmMYyXM0RKi7hRK6_q-tcEjHyKBqCyGNa9XA9sWmHJKM3CYyuwhN_NeEXmdtdx52UrQHj-KoTp4IZpaFMLu-Mw_AmMu9YBegBW1hj-19vlPIWlrgOqtUjbFAxY=s0",
      "hanging_view": "/assets/products/men/pants-relaxed-silk-linen-ivory/drawstring_clamp_hang.jpg",
      "fabric_macro_detail": "/assets/products/men/pants-relaxed-silk-linen-ivory/woven_cord_eyelet_macro.jpg",
      "back_view": "/assets/products/men/pants-relaxed-silk-linen-ivory/vented_ankle_hem_back.jpg",
      "folded_view": "/assets/products/men/pants-relaxed-silk-linen-ivory/soft_roll_folded.jpg"
    },
    "has_3d_view": true,
    "has_virtual_try_on": true,
    "avatar_preview_id": "tryon_pants_drawstring_027",
    "fit_recommendation": "Relaxed Tapered",
    "featured": false
  },
  {
    "id": "OOT-SHT-028",
    "name": "Band-Collar Indigo Khadi Shirt",
    "subtitle_or_tagline": "Heritage Plant-Dye Collection",
    "category": "Shirts",
    "collection": "Atelier Signatures",
    "gender": "Men",
    "price_bdt": 2250,
    "original_price_bdt": null,
    "badge": null,
    "description": "Natural plant-dyed indigo khadi cotton shirt with tonal bone buttons, curved hem, and double-stitched reinforced yoke.",
    "fabric": "100% Handloom Khadi Cotton",
    "craft_technique": "Natural Indigo Fermentation Dyeing",
    "colors": [
      {
        "name": "Deep Natural Indigo",
        "hex": "#273248",
        "is_default": true
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "stock_status": "In Stock — Dhaka Atelier",
    "images": {
      "hero_flatlay": "https://lh3.googleusercontent.com/aida-public/AB6AXuDkho7GRGanucC5LObsfZbrhRkfflXmrqZSVX2dIQIYYJHZl9Z_6i1wxWSWhg7WScfqasuirL_gfLs9XIlwZH2zioeEupmoY0duuxc8-5tuH8bEFZ3GELo8eDEOwGN70kGd8dgyds3Fly1YMVLEtYuR2r6ldcQeRaF4GOMN48hmphElDZQFQFoCGe7loxlLMmLkgHNYvZ0UxznsjWhAhORHKCPb7-o_-av2YZTPdGs=s0",
      "hanging_view": "/assets/products/men/shirt-indigo-khadi-bandcollar/rustic_peg_hang.jpg",
      "fabric_macro_detail": "/assets/products/men/shirt-indigo-khadi-bandcollar/indigo_slub_bonebutton_macro.jpg",
      "back_view": "/assets/products/men/shirt-indigo-khadi-bandcollar/reinforced_yoke_back.jpg",
      "folded_view": "/assets/products/men/shirt-indigo-khadi-bandcollar/indigo_dyed_folded.jpg"
    },
    "has_3d_view": true,
    "has_virtual_try_on": true,
    "avatar_preview_id": "tryon_shirt_indigo_028",
    "fit_recommendation": "Casual Tailored",
    "featured": false
  },
  {
    "id": "OOT-LHN-029",
    "name": "Tissue Organza Minimal Lehenga",
    "subtitle_or_tagline": "Modern Festive Collection",
    "category": "Lehenga",
    "collection": "The Eid Edit",
    "gender": "Women",
    "price_bdt": 22500,
    "original_price_bdt": 26000,
    "badge": "LIMITED",
    "description": "Voluminous sheer organza lehenga skirt featuring hand-appliqued tissue borders, tonal cord embroidery, and raw silk bustier top.",
    "fabric": "Silk Tissue Organza & Tussar Silk",
    "craft_technique": "Hand-cut Scalloped Applique & Dori Work",
    "colors": [
      {
        "name": "Muted Warm Sand",
        "hex": "#E6D8C3",
        "is_default": true
      }
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "stock_status": "Made-to-Order (10 Days)",
    "images": {
      "hero_flatlay": "/assets/products/jamdani-saree-clean.jpg",
      "hanging_view": "/assets/products/women/lehenga-tissue-organza-sand/can-can_flared_hang.jpg",
      "fabric_macro_detail": "/assets/products/women/lehenga-tissue-organza-sand/cord_embroidery_border_macro.jpg",
      "back_view": "/assets/products/women/lehenga-tissue-organza-sand/bustier_tie_back.jpg",
      "folded_view": "/assets/products/women/lehenga-tissue-organza-sand/couture_garment_box_folded.jpg"
    },
    "has_3d_view": false,
    "has_virtual_try_on": false,
    "avatar_preview_id": null,
    "fit_recommendation": "High-Waist Flared",
    "featured": true
  },
  {
    "id": "OOT-PAN-030",
    "name": "Monochrome Minimalist Linen Panjabi",
    "subtitle_or_tagline": "Atelier Signatures Capsule",
    "category": "Panjabi",
    "collection": "Atelier Signatures",
    "gender": "Men",
    "price_bdt": 3490,
    "original_price_bdt": null,
    "badge": "NEW",
    "description": "Understated European linen Panjabi cut with high side vents and hidden mother-of-pearl closures for minimal architectural presence.",
    "fabric": "100% Belgian Washed Linen",
    "craft_technique": "Precision French Seaming",
    "colors": [
      {
        "name": "Warm Sand",
        "hex": "#DCD3C1",
        "is_default": true
      },
      {
        "name": "Deep Olive",
        "hex": "#3A4A3F",
        "is_default": false
      },
      {
        "name": "Ivory Alabaster",
        "hex": "#FAF6EE",
        "is_default": false
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "stock_status": "In Stock — Dhaka Atelier",
    "images": {
      "hero_flatlay": "/assets/hero/hero-banner-master.jpg",
      "hanging_view": "/assets/products/men/panjabi-minimalist-linen-sand/studio_hanger_view.jpg",
      "fabric_macro_detail": "/assets/products/men/panjabi-minimalist-linen-sand/french_seam_texture_macro.jpg",
      "back_view": "/assets/products/men/panjabi-minimalist-linen-sand/vented_silhouette_back.jpg",
      "folded_view": "/assets/products/men/panjabi-minimalist-linen-sand/linen_pressed_folded.jpg"
    },
    "has_3d_view": true,
    "has_virtual_try_on": true,
    "avatar_preview_id": "tryon_panjabi_linen_030",
    "fit_recommendation": "Modern Straight",
    "featured": false
  },
  {
    "id": "OOT-SAR-031",
    "name": "Crimson Hand-Spun Khadi Jamdani Saree",
    "subtitle_or_tagline": "Heritage Bridal Capsule",
    "category": "Saree",
    "collection": "The Eid Edit",
    "gender": "Women",
    "price_bdt": 18500,
    "original_price_bdt": 21000,
    "badge": "EXCLUSIVE",
    "description": "Deep madder crimson khadi muslin body hand-loomed with gold zari supplementary weft paisleys. Handcrafted in Narayanganj by master weavers over 45 days.",
    "fabric": "100% Fine Hand-Spun Khadi with Pure Gold Zari",
    "craft_technique": "Dhakai Karigar Pit-Loom Weave",
    "colors": [
      {
        "name": "Heritage Crimson",
        "hex": "#6C1D24",
        "is_default": true
      },
      {
        "name": "Deep Garnet",
        "hex": "#4C1419",
        "is_default": false
      }
    ],
    "sizes": [
      "Free Size (6.5 Yards with Blouse Piece)"
    ],
    "stock_status": "Limited Release — 2 Pieces",
    "images": {
      "hero_flatlay": "/assets/eid/nocturne-garment-clean.jpg",
      "hanging_view": "/assets/products/women/saree-khadi-jamdani-crimson/heritage_arch_drape.jpg",
      "fabric_macro_detail": "/assets/products/women/saree-khadi-jamdani-crimson/gold_paisley_weft_macro.jpg",
      "back_view": "/assets/products/women/saree-khadi-jamdani-crimson/unstitched_blouse_back.jpg",
      "folded_view": "/assets/products/women/saree-khadi-jamdani-crimson/teak_wood_casket_folded.jpg"
    },
    "has_3d_view": true,
    "has_virtual_try_on": false,
    "avatar_preview_id": null,
    "fit_recommendation": "Regal Architectural Drape",
    "featured": true
  },
  {
    "id": "OOT-TRP-032",
    "name": "Layered Muslin Angrakha Three-Piece",
    "subtitle_or_tagline": "The New Bangladeshi Edit",
    "category": "Three-Piece",
    "collection": "The New Bangladeshi Edit",
    "gender": "Women",
    "price_bdt": 7600,
    "original_price_bdt": 8500,
    "badge": "NEW",
    "description": "Wrap-around asymmetrical Angrakha tunic in layered translucent muslin with handmade fabric latkan cords, cigarette linen trousers, and crinkle chiffon dupatta.",
    "fabric": "100% Mulmul Muslin with Pure Linen Trousers",
    "craft_technique": "Hand-stitched Angrakha Overlap & Fabric Bead Ties",
    "colors": [
      {
        "name": "Soft Ivory & Alabaster",
        "hex": "#F9F6F0",
        "is_default": true
      },
      {
        "name": "Dusty Rose Mist",
        "hex": "#D8C2BE",
        "is_default": false
      }
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "stock_status": "In Stock — Dhaka Atelier",
    "images": {
      "hero_flatlay": "/assets/eid/nocturne-garment-clean.jpg",
      "hanging_view": "/assets/products/women/threepiece-angrakha-muslin-ivory/mannequin_overlap_hang.jpg",
      "fabric_macro_detail": "/assets/products/women/threepiece-angrakha-muslin-ivory/latkan_cord_tassel_macro.jpg",
      "back_view": "/assets/products/women/threepiece-angrakha-muslin-ivory/fluid_flare_back.jpg",
      "folded_view": "/assets/products/women/threepiece-angrakha-muslin-ivory/atelier_ribbon_box_folded.jpg"
    },
    "has_3d_view": true,
    "has_virtual_try_on": true,
    "avatar_preview_id": "tryon_threepiece_angrakha_032",
    "fit_recommendation": "Flared Wrap Fit",
    "featured": true
  },
  {
    "id": "OOT-KUR-033",
    "name": "Bespoke Pintuck Khadi Tunic",
    "subtitle_or_tagline": "Atelier Signatures / Everyday Elegance",
    "category": "Kurti",
    "collection": "Atelier Signatures",
    "gender": "Women",
    "price_bdt": 3200,
    "original_price_bdt": null,
    "badge": null,
    "description": "Straight-line artisan tunic engineered with millimeter-spaced front pintucks, high mandarin collar, and hidden in-seam pockets for clean functionality.",
    "fabric": "100% Hand-Spun Comilla Khadi",
    "craft_technique": "Precision Tailored Pin-Tuck Channels",
    "colors": [
      {
        "name": "Sage Green",
        "hex": "#768679",
        "is_default": true
      },
      {
        "name": "Natural Cream",
        "hex": "#F3ECE1",
        "is_default": false
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "stock_status": "In Stock — Dhaka Atelier",
    "images": {
      "hero_flatlay": "https://lh3.googleusercontent.com/aida-public/AB6AXuAYAFI_PmmauTCrm73TRCjj9Gevg-iIOPNnIMA2vXYOHYf5jALiTM7imQ9s_EH-7ht0ryf1qGxIMrIlApFTt66mJiK_hRskBhuya8Qth9QaLsb6RUIs9tADGdHqVSU1EODql9mLkxW7hSiE_Q92yyE_Gn7SPqLbbEJKY__D3IzzQDLnS0Z2e5S79HhdWI__isNQlL9jW9bAmBCiTdraouLZKeeE6AgSVWXojJf6ZIQ=s0",
      "hanging_view": "/assets/products/women/kurti-pintuck-khadi-sage/minimal_rack_hang.jpg",
      "fabric_macro_detail": "/assets/products/women/kurti-pintuck-khadi-sage/millimeter_pintuck_macro.jpg",
      "back_view": "/assets/products/women/kurti-pintuck-khadi-sage/inverted_box_pleat_back.jpg",
      "folded_view": "/assets/products/women/kurti-pintuck-khadi-sage/pressed_atelier_stack_folded.jpg"
    },
    "has_3d_view": false,
    "has_virtual_try_on": true,
    "avatar_preview_id": "tryon_kurti_sage_033",
    "fit_recommendation": "Straight Tailored",
    "featured": false
  },
  {
    "id": "OOT-SAR-034",
    "name": "Burnished Gold Tissue Banarasi Saree",
    "subtitle_or_tagline": "Atelier Masterpiece",
    "category": "Saree",
    "collection": "The Eid Edit",
    "gender": "Women",
    "price_bdt": 24000,
    "original_price_bdt": 27500,
    "badge": "EXCLUSIVE",
    "description": "Ultra-fine tissue silk warp interwoven with pure copper-burnished gold zari motifs inspired by Mughal floral jaal geometry. Drapes like liquid gold.",
    "fabric": "Pure Tissue Silk with Real Copper-Gold Zari",
    "craft_technique": "Kadwa Floral Jaal Handloom Weave",
    "colors": [
      {
        "name": "Burnished Gold",
        "hex": "#C5A869",
        "is_default": true
      }
    ],
    "sizes": [
      "Free Size (6.5 Yards)"
    ],
    "stock_status": "1 Unit in Atelier Vault",
    "images": {
      "hero_flatlay": "/assets/products/jamdani-saree-clean.jpg",
      "hanging_view": "/assets/products/women/saree-tissue-banarasi-burnished-gold/museum_mount_drape.jpg",
      "fabric_macro_detail": "/assets/products/women/saree-tissue-banarasi-burnished-gold/kadwa_jaal_zari_macro.jpg",
      "back_view": "/assets/products/women/saree-tissue-banarasi-burnished-gold/dense_pallu_fall_back.jpg",
      "folded_view": "/assets/products/women/saree-tissue-banarasi-burnished-gold/heritage_silk_sack_folded.jpg"
    },
    "has_3d_view": true,
    "has_virtual_try_on": false,
    "avatar_preview_id": null,
    "fit_recommendation": "Couture Flow",
    "featured": true
  },
  {
    "id": "OOT-PNT-035",
    "name": "Wide-Leg Raw Silk Trousers",
    "subtitle_or_tagline": "Modern Separates Capsule",
    "category": "Pants",
    "collection": "Atelier Signatures",
    "gender": "Women",
    "price_bdt": 3500,
    "original_price_bdt": null,
    "badge": null,
    "description": "Floor-skimming wide palazzo pants cut from heavyweight Rajshahi Matka silk with a tailored flat front, concealed side zip, and deep slash pockets.",
    "fabric": "100% Pure Rajshahi Matka Raw Silk",
    "craft_technique": "Sartorial Blind-Hem Wide-Leg Architecture",
    "colors": [
      {
        "name": "Warm Sand",
        "hex": "#D5C8B4",
        "is_default": true
      },
      {
        "name": "Obsidian Black",
        "hex": "#1C1C1C",
        "is_default": false
      }
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "stock_status": "In Stock — Dhaka Atelier",
    "images": {
      "hero_flatlay": "https://lh3.googleusercontent.com/aida-public/AB6AXuD_sl1s-rT1jL4gihSPUtemgnbulNFdRvXMSwQACnkPPgXP64mG6K6Hvb2_WwmH-dOYsBO2eR5FwRvlS9KlfAryHZgQLgD4V2e8jKTAEbo0H_HJXcmMYyXM0RKi7hRK6_q-tcEjHyKBqCyGNa9XA9sWmHJKM3CYyuwhN_NeEXmdtdx52UrQHj-KoTp4IZpaFMLu-Mw_AmMu9YBegBW1hj-19vlPIWlrgOqtUjbFAxY=s0",
      "hanging_view": "/assets/products/women/pants-wideleg-rawsilk-sand/vertical_leg_fall_hang.jpg",
      "fabric_macro_detail": "/assets/products/women/pants-wideleg-rawsilk-sand/slub_silk_waistband_macro.jpg",
      "back_view": "/assets/products/women/pants-wideleg-rawsilk-sand/tailored_dart_profile_back.jpg",
      "folded_view": "/assets/products/women/pants-wideleg-rawsilk-sand/wide_crease_stack_folded.jpg"
    },
    "has_3d_view": false,
    "has_virtual_try_on": true,
    "avatar_preview_id": "tryon_pants_wideleg_035",
    "fit_recommendation": "High-Rise Wide Leg",
    "featured": false
  },
  {
    "id": "OOT-BLZ-036",
    "name": "Structured Raw Silk Tuxedo Vest",
    "subtitle_or_tagline": "Evening Tailoring Edit",
    "category": "Blazer",
    "collection": "Atelier Signatures",
    "gender": "Women",
    "price_bdt": 4900,
    "original_price_bdt": 5500,
    "badge": "NEW",
    "description": "Sleeveless waistcoat tailored with razor-sharp shawl lapels in raw silk, double welt pockets, and an adjustable back belt cinch.",
    "fabric": "100% Rajshahi Tussar Silk with Mulberry Lining",
    "craft_technique": "Sartorial Floating Chest Piece",
    "colors": [
      {
        "name": "Ivory Alabaster",
        "hex": "#F8F5EE",
        "is_default": true
      },
      {
        "name": "Midnight Charcoal",
        "hex": "#22252A",
        "is_default": false
      }
    ],
    "sizes": [
      "S",
      "M",
      "L"
    ],
    "stock_status": "In Stock — Dhaka Atelier",
    "images": {
      "hero_flatlay": "https://lh3.googleusercontent.com/aida-public/AB6AXuAqyrJTi9nfT1P_Di0ZavWYRlZQKt4gQQ9uVi337kVqznaHvZNLLji3PwQBM6Ksjf5RGTEhTAx_OuGb3sRSO69ilPKqmizPOEyWbJjJAXtRLAU3w2zcshQ0DJU_EpFYRhr0yjxPEN_wm1Pv8GO4h3AWa_OxeG-ibCX5lqnhHWmq6hCEPbbh9UFmxReEYx_SmqPjSjEOR6OU3pmzbsT7pvPWLIk9wS-nwSNfj8Pekyw=s0",
      "hanging_view": "/assets/products/women/vest-tuxedo-rawsilk-ivory/tailor_mannequin_hang.jpg",
      "fabric_macro_detail": "/assets/products/women/vest-tuxedo-rawsilk-ivory/shawl_lapel_welt_macro.jpg",
      "back_view": "/assets/products/women/vest-tuxedo-rawsilk-ivory/cinched_buckle_back.jpg",
      "folded_view": "/assets/products/women/vest-tuxedo-rawsilk-ivory/tailored_waistcoat_folded.jpg"
    },
    "has_3d_view": true,
    "has_virtual_try_on": true,
    "avatar_preview_id": "tryon_vest_rawsilk_036",
    "fit_recommendation": "Tailored Slim Fit",
    "featured": false
  },
  {
    "id": "OOT-LHN-037",
    "name": "Midnight Indigo Zari Jamdani Lehenga",
    "subtitle_or_tagline": "The Eid Edit / Haute Capsule",
    "category": "Lehenga",
    "collection": "The Eid Edit",
    "gender": "Women",
    "price_bdt": 34000,
    "original_price_bdt": 38000,
    "badge": "EXCLUSIVE",
    "description": "Deep fermented indigo muslin lehenga woven with pure antique silver and gold floral bel motifs, hand-pleated with internal horsehair braid hem for sculpted volume.",
    "fabric": "Organic Handloom Khadi Muslin with Natural Indigo",
    "craft_technique": "Fermented Indigo Vat Dyeing & Supplementary Weft",
    "colors": [
      {
        "name": "Midnight Natural Indigo",
        "hex": "#1E2738",
        "is_default": true
      }
    ],
    "sizes": [
      "Custom Atelier Sizing (XS - XL)"
    ],
    "stock_status": "Bespoke Order (18 Days Crafting)",
    "images": {
      "hero_flatlay": "/assets/eid/eid-folded-silks.jpg",
      "hanging_view": "/assets/products/women/lehenga-indigo-jamdani-zari/monumental_flare_hang.jpg",
      "fabric_macro_detail": "/assets/products/women/lehenga-indigo-jamdani-zari/silver_gold_bel_macro.jpg",
      "back_view": "/assets/products/women/lehenga-indigo-jamdani-zari/handwoven_dori_back.jpg",
      "folded_view": "/assets/products/women/lehenga-indigo-jamdani-zari/vault_trunk_folded.jpg"
    },
    "has_3d_view": true,
    "has_virtual_try_on": false,
    "avatar_preview_id": null,
    "fit_recommendation": "Sculpted Volumetric",
    "featured": true
  },
  {
    "id": "OOT-SAR-038",
    "name": "Natural Mulberry Silk Tangail Saree",
    "subtitle_or_tagline": "Atelier Signatures / Everyday Luxury",
    "category": "Saree",
    "collection": "Atelier Signatures",
    "gender": "Women",
    "price_bdt": 6400,
    "original_price_bdt": null,
    "badge": null,
    "description": "Lightweight Tangail handloom saree featuring micro-temple borders in raw sand and ecru thread. Breathable, fluid, and effortless for warm weather gatherings.",
    "fabric": "100% Tangail Mulberry Silk & Combed Cotton",
    "craft_technique": "Tangail Handloom Temple Border Motif",
    "colors": [
      {
        "name": "Alabaster Ecru",
        "hex": "#F4EFE6",
        "is_default": true
      },
      {
        "name": "Muted Moss",
        "hex": "#627063",
        "is_default": false
      }
    ],
    "sizes": [
      "Free Size (6 Yards)"
    ],
    "stock_status": "In Stock — Dhaka Atelier",
    "images": {
      "hero_flatlay": "/assets/eid/eid-folded-silks.jpg",
      "hanging_view": "/assets/products/women/saree-tangail-silk-alabaster/linen_cord_drape_hang.jpg",
      "fabric_macro_detail": "/assets/products/women/saree-tangail-silk-alabaster/temple_border_weave_macro.jpg",
      "back_view": "/assets/products/women/saree-tangail-silk-alabaster/cascade_pallu_back.jpg",
      "folded_view": "/assets/products/women/saree-tangail-silk-alabaster/muslin_bundle_folded.jpg"
    },
    "has_3d_view": false,
    "has_virtual_try_on": false,
    "avatar_preview_id": null,
    "fit_recommendation": "Fluid Soft Drape",
    "featured": false
  },
  {
    "id": "OOT-PAN-039",
    "name": "Minimalist Slate Grey Panjabi",
    "subtitle_or_tagline": "Modern Sartorial Menswear",
    "category": "Panjabi",
    "collection": "Atelier Signatures",
    "gender": "Men",
    "price_bdt": 3100,
    "original_price_bdt": null,
    "badge": null,
    "description": "Cool slate grey modal-linen Panjabi tailored with sharp concealed front buttoning, structured minimal collar band, and reinforced high vents.",
    "fabric": "55% Belgian Linen, 45% Micro-Modal",
    "craft_technique": "Concealed Placket Clean Seam Tailoring",
    "colors": [
      {
        "name": "Slate Grey",
        "hex": "#5D636B",
        "is_default": true
      },
      {
        "name": "Off-White",
        "hex": "#F2EFE9",
        "is_default": false
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "stock_status": "In Stock — Dhaka Atelier",
    "images": {
      "hero_flatlay": "https://lh3.googleusercontent.com/aida-public/AB6AXuCua08J3bqXRcnBLFIc44WM9WsVxOnAAg28SNwXK4lp6Ce0iAzpBJYKlB7PIHzIBPij1H_rbO4ZEMXqJ8BscO9KLIMx_GolCSnVirGq7Nu1Nev-pFgZ8jqJiHh-xYqoYA-Mct08q996xytLK4N8VVD_Lo5vx3rOcyNfnORRk_kXsbUlU2pjvXSuNfmwA0vTrIHAlimLRf6G5s8GR-8y42MNb5_gM79OdXVD_ljpLTY=s0",
      "hanging_view": "/assets/products/men/panjabi-minimalist-slate-grey/steel_hanger_hang.jpg",
      "fabric_macro_detail": "/assets/products/men/panjabi-minimalist-slate-grey/hidden_snap_collar_macro.jpg",
      "back_view": "/assets/products/men/panjabi-minimalist-slate-grey/clean_shoulder_back.jpg",
      "folded_view": "/assets/products/men/panjabi-minimalist-slate-grey/geometric_crease_folded.jpg"
    },
    "has_3d_view": true,
    "has_virtual_try_on": true,
    "avatar_preview_id": "tryon_panjabi_slate_039",
    "fit_recommendation": "Modern Slim",
    "featured": false
  },
  {
    "id": "OOT-PAN-040",
    "name": "Tonal Marled Linen Panjabi",
    "subtitle_or_tagline": "The New Bangladeshi Edit",
    "category": "Panjabi",
    "collection": "The New Bangladeshi Edit",
    "gender": "Men",
    "price_bdt": 4200,
    "original_price_bdt": null,
    "badge": "NEW",
    "description": "Woven with double-twisted ecru and deep olive flax threads creating a heathered marl texture. Finished with hand-turned bone buttons.",
    "fabric": "100% French Twisted Flax Linen",
    "craft_technique": "Cross-Twist Slub Weave",
    "colors": [
      {
        "name": "Olive Ecru Marl",
        "hex": "#4D5648",
        "is_default": true
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "stock_status": "In Stock — Dhaka Atelier",
    "images": {
      "hero_flatlay": "/assets/hero/hero-banner-master.jpg",
      "hanging_view": "/assets/products/men/panjabi-marled-linen-olive/wood_scaffold_hang.jpg",
      "fabric_macro_detail": "/assets/products/men/panjabi-marled-linen-olive/marl_slub_bone_button_macro.jpg",
      "back_view": "/assets/products/men/panjabi-marled-linen-olive/straight_fall_back.jpg",
      "folded_view": "/assets/products/men/panjabi-marled-linen-olive/craft_twine_folded.jpg"
    },
    "has_3d_view": true,
    "has_virtual_try_on": true,
    "avatar_preview_id": "tryon_panjabi_marled_040",
    "fit_recommendation": "Tailored Relaxed",
    "featured": true
  },
  {
    "id": "OOT-SHT-041",
    "name": "Camp-Collar Relaxed Linen Shirt",
    "subtitle_or_tagline": "Summer Atelier Resort Edit",
    "category": "Shirts",
    "collection": "The New Bangladeshi Edit",
    "gender": "Men",
    "price_bdt": 2400,
    "original_price_bdt": null,
    "badge": null,
    "description": "Relaxed cuban camp-collar shirt with seamless French placket, natural horn buttons, and straight vented hem for subtropical leisure.",
    "fabric": "100% Pure European Washed Linen",
    "craft_technique": "Soft Enzyme Garment Washed",
    "colors": [
      {
        "name": "Warm Sand",
        "hex": "#D8CDBC",
        "is_default": true
      },
      {
        "name": "Deep Terracotta",
        "hex": "#8A4C36",
        "is_default": false
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "stock_status": "In Stock — Dhaka Atelier",
    "images": {
      "hero_flatlay": "https://lh3.googleusercontent.com/aida-public/AB6AXuDkho7GRGanucC5LObsfZbrhRkfflXmrqZSVX2dIQIYYJHZl9Z_6i1wxWSWhg7WScfqasuirL_gfLs9XIlwZH2zioeEupmoY0duuxc8-5tuH8bEFZ3GELo8eDEOwGN70kGd8dgyds3Fly1YMVLEtYuR2r6ldcQeRaF4GOMN48hmphElDZQFQFoCGe7loxlLMmLkgHNYvZ0UxznsjWhAhORHKCPb7-o_-av2YZTPdGs=s0",
      "hanging_view": "/assets/products/men/shirt-camp-collar-sand-linen/sunlit_breeze_hang.jpg",
      "fabric_macro_detail": "/assets/products/men/shirt-camp-collar-sand-linen/camp_collar_horn_button_macro.jpg",
      "back_view": "/assets/products/men/shirt-camp-collar-sand-linen/straight_box_pleat_back.jpg",
      "folded_view": "/assets/products/men/shirt-camp-collar-sand-linen/rolled_sleeve_folded.jpg"
    },
    "has_3d_view": true,
    "has_virtual_try_on": true,
    "avatar_preview_id": "tryon_shirt_camp_041",
    "fit_recommendation": "Boxy Casual",
    "featured": false
  },
  {
    "id": "OOT-BLZ-042",
    "name": "Midnight Double-Breasted Wool Blazer",
    "subtitle_or_tagline": "Atelier Tailoring / Formal Capsule",
    "category": "Blazer",
    "collection": "Atelier Signatures",
    "gender": "Men",
    "price_bdt": 9500,
    "original_price_bdt": 11000,
    "badge": "EXCLUSIVE",
    "description": "Six-button double-breasted blazer with architectural peak lapels, horn buttons, cut from super-130s tropical wool for evening distinction.",
    "fabric": "Super-130s Tropical Worsted Wool & Bengali Cupro",
    "craft_technique": "Full Floating Canvas & Hand-set Shoulders",
    "colors": [
      {
        "name": "Midnight Navy",
        "hex": "#181E29",
        "is_default": true
      }
    ],
    "sizes": [
      "38R",
      "40R",
      "42R",
      "44R"
    ],
    "stock_status": "In Stock — Dhaka Atelier",
    "images": {
      "hero_flatlay": "https://lh3.googleusercontent.com/aida-public/AB6AXuCoFHKrK_pzA3MAoy-T41foeGmDQxJ0Wzcvk68JSpVpPJUty7qH4nx0IJNuFFjnKMHMiMIAj2Tr2EEv1p_AlVi5BQdKmUq2X_s_MA93FcfeqLhoiAuLsTu4NZypKr3W3iSvlftVfCEVpAV3JilELtV5jpN7qPlAHKbYJbXV9tsTf8AEvJyeIilVwSj3dV5Sf-rmKRzrYePi7PCtsrj2-xIHmGw4MF3WILCYvms8xyM=s0",
      "hanging_view": "/assets/products/men/blazer-doublebreasted-midnight-wool/sartorial_stand_hang.jpg",
      "fabric_macro_detail": "/assets/products/men/blazer-doublebreasted-midnight-wool/peak_lapel_buttonhole_macro.jpg",
      "back_view": "/assets/products/men/blazer-doublebreasted-midnight-wool/double_flapped_vent_back.jpg",
      "folded_view": "/assets/products/men/blazer-doublebreasted-midnight-wool/velvet_hanger_folded.jpg"
    },
    "has_3d_view": true,
    "has_virtual_try_on": true,
    "avatar_preview_id": "tryon_blazer_db_navy_042",
    "fit_recommendation": "Tailored Architectural",
    "featured": true
  },
  {
    "id": "OOT-PNT-043",
    "name": "Bespoke Off-White Gurkha Trousers",
    "subtitle_or_tagline": "Sartorial Menswear Edit",
    "category": "Pants",
    "collection": "The New Bangladeshi Edit",
    "gender": "Men",
    "price_bdt": 3600,
    "original_price_bdt": null,
    "badge": "NEW",
    "description": "Traditional double-buckle crossover Gurkha waistband, deep double forward pleats, and a 2-inch sartorial turn-up cuff in heavy cotton twill.",
    "fabric": "100% Heavyweight Handloom Cotton Twill",
    "craft_technique": "Crossover Double-Buckle Gurkha Construction",
    "colors": [
      {
        "name": "Off-White Alabaster",
        "hex": "#F4F0E8",
        "is_default": true
      },
      {
        "name": "Classic Khaki",
        "hex": "#B5A48B",
        "is_default": false
      }
    ],
    "sizes": [
      "30",
      "32",
      "34",
      "36",
      "38"
    ],
    "stock_status": "In Stock — Dhaka Atelier",
    "images": {
      "hero_flatlay": "https://lh3.googleusercontent.com/aida-public/AB6AXuD_sl1s-rT1jL4gihSPUtemgnbulNFdRvXMSwQACnkPPgXP64mG6K6Hvb2_WwmH-dOYsBO2eR5FwRvlS9KlfAryHZgQLgD4V2e8jKTAEbo0H_HJXcmMYyXM0RKi7hRK6_q-tcEjHyKBqCyGNa9XA9sWmHJKM3CYyuwhN_NeEXmdtdx52UrQHj-KoTp4IZpaFMLu-Mw_AmMu9YBegBW1hj-19vlPIWlrgOqtUjbFAxY=s0",
      "hanging_view": "/assets/products/men/pants-gurkha-alabaster-twill/buckle_detail_hang.jpg",
      "fabric_macro_detail": "/assets/products/men/pants-gurkha-alabaster-twill/brass_gurkha_buckles_macro.jpg",
      "back_view": "/assets/products/men/pants-gurkha-alabaster-twill/split_waistband_back.jpg",
      "folded_view": "/assets/products/men/pants-gurkha-alabaster-twill/cuffed_hem_folded.jpg"
    },
    "has_3d_view": true,
    "has_virtual_try_on": true,
    "avatar_preview_id": "tryon_pants_gurkha_043",
    "fit_recommendation": "High-Rise Gurkha Tapered",
    "featured": false
  },
  {
    "id": "OOT-SHT-044",
    "name": "Natural Ecru Raw-Silk Shirt",
    "subtitle_or_tagline": "Atelier Luxury Separates",
    "category": "Shirts",
    "collection": "Atelier Signatures",
    "gender": "Men",
    "price_bdt": 3800,
    "original_price_bdt": null,
    "badge": null,
    "description": "Crafted from hand-spun Rajshahi Matka silk with natural slub textures, structured semi-spread collar, and tonal smoked shell buttons.",
    "fabric": "100% Hand-Spun Rajshahi Matka Silk",
    "craft_technique": "Single-Needle Bespoke Seam Tailoring",
    "colors": [
      {
        "name": "Raw Ecru",
        "hex": "#EFE8DA",
        "is_default": true
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "stock_status": "In Stock — Dhaka Atelier",
    "images": {
      "hero_flatlay": "https://lh3.googleusercontent.com/aida-public/AB6AXuDkho7GRGanucC5LObsfZbrhRkfflXmrqZSVX2dIQIYYJHZl9Z_6i1wxWSWhg7WScfqasuirL_gfLs9XIlwZH2zioeEupmoY0duuxc8-5tuH8bEFZ3GELo8eDEOwGN70kGd8dgyds3Fly1YMVLEtYuR2r6ldcQeRaF4GOMN48hmphElDZQFQFoCGe7loxlLMmLkgHNYvZ0UxznsjWhAhORHKCPb7-o_-av2YZTPdGs=s0",
      "hanging_view": "/assets/products/men/shirt-raw-silk-ecru-matka/minimal_hanger_view.jpg",
      "fabric_macro_detail": "/assets/products/men/shirt-raw-silk-ecru-matka/matka_slub_texture_macro.jpg",
      "back_view": "/assets/products/men/shirt-raw-silk-ecru-matka/clean_curved_hem_back.jpg",
      "folded_view": "/assets/products/men/shirt-raw-silk-ecru-matka/linen_tie_folded.jpg"
    },
    "has_3d_view": true,
    "has_virtual_try_on": true,
    "avatar_preview_id": "tryon_shirt_matka_044",
    "fit_recommendation": "Relaxed Sartorial",
    "featured": false
  },
  {
    "id": "OOT-KID-045",
    "name": "Boys Olive Khadi Panjabi Set",
    "subtitle_or_tagline": "The Little Edit / Festive Collection",
    "category": "Kids",
    "collection": "The Little Edit",
    "gender": "Kids",
    "price_bdt": 2350,
    "original_price_bdt": null,
    "badge": "NEW",
    "description": "Breathable earthy olive hand-spun cotton khadi Panjabi with gentle wooden toggle buttons and matching off-white relaxed cotton trousers.",
    "fabric": "100% Handloom Organic Cotton Khadi",
    "craft_technique": "Soft-Touch Seaming for Sensitive Skin",
    "colors": [
      {
        "name": "Earth Olive",
        "hex": "#5A6756",
        "is_default": true
      }
    ],
    "sizes": [
      "2-3Y",
      "4-5Y",
      "6-7Y",
      "8-9Y",
      "10-12Y"
    ],
    "stock_status": "In Stock — Dhaka Atelier",
    "images": {
      "hero_flatlay": "https://lh3.googleusercontent.com/aida-public/AB6AXuAlHxT9a54dLcyokiwx7H_bzlRZyUPfxuO-b1pZ4NW1rc8f-PiooIwIfcW8aNnLVWxNQp1GNxzynr9XfDXZapZ6QwKy2oaaxp5c6qsKoQZtGg1SR8wGv0MGNkwlQxIV9nplGd11SyLjykbZnpyh091diOfdjb6DO9-KU9gJT84zZ9gy6-OQ0V8f8g0IhesvVkOWoLIg7D1-UHz_uIn922tCC0eLYqg4dDHAOSBNQD0=s0",
      "hanging_view": "/assets/products/kids/panjabi-boys-olive-khadi/nursery_wooden_hang.jpg",
      "fabric_macro_detail": "/assets/products/kids/panjabi-boys-olive-khadi/wood_toggle_button_macro.jpg",
      "back_view": "/assets/products/kids/panjabi-boys-olive-khadi/soft_vent_back.jpg",
      "folded_view": "/assets/products/kids/panjabi-boys-olive-khadi/trouser_combo_box_folded.jpg"
    },
    "has_3d_view": false,
    "has_virtual_try_on": false,
    "avatar_preview_id": null,
    "fit_recommendation": "Kids Relaxed Comfort",
    "featured": false
  },
  {
    "id": "OOT-KID-046",
    "name": "Girls Jamdani Floral Tunic & Salwar",
    "subtitle_or_tagline": "The Little Edit / Heritage Capsule",
    "category": "Kids",
    "collection": "The Little Edit",
    "gender": "Kids",
    "price_bdt": 2750,
    "original_price_bdt": null,
    "badge": null,
    "description": "Delicate ivory muslin tunic woven with pastel coral floral Jamdani motifs, paired with soft gathered cotton salwar with gentle elastic cuffs.",
    "fabric": "100% Superfine Muslin Cotton",
    "craft_technique": "Handloom Jamdani Weave & Soft Mulmul Lining",
    "colors": [
      {
        "name": "Ivory & Pastel Coral",
        "hex": "#FAF5ED",
        "is_default": true
      }
    ],
    "sizes": [
      "3-4Y",
      "5-6Y",
      "7-8Y",
      "9-10Y"
    ],
    "stock_status": "In Stock — Dhaka Atelier",
    "images": {
      "hero_flatlay": "/assets/eid/nocturne-garment-clean.jpg",
      "hanging_view": "/assets/products/kids/kurti-girls-jamdani-coral/petite_studio_hang.jpg",
      "fabric_macro_detail": "/assets/products/kids/kurti-girls-jamdani-coral/coral_flora_weft_macro.jpg",
      "back_view": "/assets/products/kids/kurti-girls-jamdani-coral/gentle_gathers_back.jpg",
      "folded_view": "/assets/products/kids/kurti-girls-jamdani-coral/ribbon_wrapped_kid_folded.jpg"
    },
    "has_3d_view": false,
    "has_virtual_try_on": false,
    "avatar_preview_id": null,
    "fit_recommendation": "Kids Flared A-Line",
    "featured": false
  },
  {
    "id": "OOT-KID-047",
    "name": "Junior Tailored Linen Kurta Shirt",
    "subtitle_or_tagline": "The Little Edit / Minimalist Classics",
    "category": "Kids",
    "collection": "The Little Edit",
    "gender": "Kids",
    "price_bdt": 1850,
    "original_price_bdt": null,
    "badge": null,
    "description": "Mandarin stand collar kurta shirt tailored from pre-washed French flax linen with soft rounded hems for all-day festive ease.",
    "fabric": "100% Pre-washed European Linen",
    "craft_technique": "Single-Needle Garment Wash Construction",
    "colors": [
      {
        "name": "Warm Sand",
        "hex": "#DBD0BE",
        "is_default": true
      },
      {
        "name": "Pure Alabaster",
        "hex": "#FFFFFF",
        "is_default": false
      }
    ],
    "sizes": [
      "4-5Y",
      "6-7Y",
      "8-9Y",
      "10-12Y"
    ],
    "stock_status": "In Stock — Dhaka Atelier",
    "images": {
      "hero_flatlay": "https://lh3.googleusercontent.com/aida-public/AB6AXuDkho7GRGanucC5LObsfZbrhRkfflXmrqZSVX2dIQIYYJHZl9Z_6i1wxWSWhg7WScfqasuirL_gfLs9XIlwZH2zioeEupmoY0duuxc8-5tuH8bEFZ3GELo8eDEOwGN70kGd8dgyds3Fly1YMVLEtYuR2r6ldcQeRaF4GOMN48hmphElDZQFQFoCGe7loxlLMmLkgHNYvZ0UxznsjWhAhORHKCPb7-o_-av2YZTPdGs=s0",
      "hanging_view": "/assets/products/kids/kurta-junior-sand-linen/small_brass_hanger.jpg",
      "fabric_macro_detail": "/assets/products/kids/kurta-junior-sand-linen/linen_texture_roundhem_macro.jpg",
      "back_view": "/assets/products/kids/kurta-junior-sand-linen/kid_pleated_yoke_back.jpg",
      "folded_view": "/assets/products/kids/kurta-junior-sand-linen/neat_pocket_folded.jpg"
    },
    "has_3d_view": false,
    "has_virtual_try_on": false,
    "avatar_preview_id": null,
    "fit_recommendation": "Straight Easy Fit",
    "featured": false
  },
  {
    "id": "OOT-KID-048",
    "name": "Girls Organza Tiered Festive Frock",
    "subtitle_or_tagline": "The Little Edit / Eid Special",
    "category": "Kids",
    "collection": "The Eid Edit",
    "gender": "Kids",
    "price_bdt": 3100,
    "original_price_bdt": 3600,
    "badge": "LIMITED",
    "description": "Double-tiered sheer silk organza frock in muted champagne with golden thread scalloped hem and hypoallergenic pure cotton mulmul lining.",
    "fabric": "Silk Organza with 100% Organic Mulmul Lining",
    "craft_technique": "Hand-cut Zari Scalloped Hemming",
    "colors": [
      {
        "name": "Champagne Mist",
        "hex": "#E8DEC9",
        "is_default": true
      }
    ],
    "sizes": [
      "2-3Y",
      "4-5Y",
      "6-7Y",
      "8-9Y"
    ],
    "stock_status": "In Stock — Dhaka Atelier",
    "images": {
      "hero_flatlay": "/assets/products/jamdani-saree-clean.jpg",
      "hanging_view": "/assets/products/kids/dress-girls-organza-champagne/tiered_float_hang.jpg",
      "fabric_macro_detail": "/assets/products/kids/dress-girls-organza-champagne/organza_zari_scallop_macro.jpg",
      "back_view": "/assets/products/kids/dress-girls-organza-champagne/silk_sash_bow_back.jpg",
      "folded_view": "/assets/products/kids/dress-girls-organza-champagne/sweet_gift_box_folded.jpg"
    },
    "has_3d_view": false,
    "has_virtual_try_on": false,
    "avatar_preview_id": null,
    "fit_recommendation": "Tiered Festive Flare",
    "featured": false
  },
  {
    "id": "OOT-KID-049",
    "name": "Boys Raw Silk Bandhgala Waistcoat Set",
    "subtitle_or_tagline": "The Little Edit / Wedding Edit",
    "category": "Kids",
    "collection": "The Eid Edit",
    "gender": "Kids",
    "price_bdt": 3400,
    "original_price_bdt": null,
    "badge": "EXCLUSIVE",
    "description": "Miniature tailored Bandhgala waistcoat in textured Rajshahi Matka silk with brass buttons, worn over a crisp white cotton kurta and pajama trousers.",
    "fabric": "Pure Rajshahi Matka Silk & Combed Cotton",
    "craft_technique": "Bespoke Junior Tailoring",
    "colors": [
      {
        "name": "Warm Sand & White",
        "hex": "#D6C6B0",
        "is_default": true
      }
    ],
    "sizes": [
      "4-5Y",
      "6-7Y",
      "8-9Y",
      "10-12Y"
    ],
    "stock_status": "In Stock — Dhaka Atelier",
    "images": {
      "hero_flatlay": "https://lh3.googleusercontent.com/aida-public/AB6AXuCoFHKrK_pzA3MAoy-T41foeGmDQxJ0Wzcvk68JSpVpPJUty7qH4nx0IJNuFFjnKMHMiMIAj2Tr2EEv1p_AlVi5BQdKmUq2X_s_MA93FcfeqLhoiAuLsTu4NZypKr3W3iSvlftVfCEVpAV3JilELtV5jpN7qPlAHKbYJbXV9tsTf8AEvJyeIilVwSj3dV5Sf-rmKRzrYePi7PCtsrj2-xIHmGw4MF3WILCYvms8xyM=s0",
      "hanging_view": "/assets/products/kids/waistcoat-boys-bandhgala-sand/formal_junior_hang.jpg",
      "fabric_macro_detail": "/assets/products/kids/waistcoat-boys-bandhgala-sand/miniature_brass_button_macro.jpg",
      "back_view": "/assets/products/kids/waistcoat-boys-bandhgala-sand/cinch_strap_back.jpg",
      "folded_view": "/assets/products/kids/waistcoat-boys-bandhgala-sand/complete_ensemble_folded.jpg"
    },
    "has_3d_view": false,
    "has_virtual_try_on": false,
    "avatar_preview_id": null,
    "fit_recommendation": "Tailored Junior Fit",
    "featured": false
  },
  {
    "id": "OOT-KID-050",
    "name": "Junior Monochrome Muslin Kurti Set",
    "subtitle_or_tagline": "The Little Edit / Contemporary Craft",
    "category": "Kids",
    "collection": "Atelier Signatures",
    "gender": "Kids",
    "price_bdt": 2400,
    "original_price_bdt": null,
    "badge": null,
    "description": "Monochrome Dhakai Jamdani kurti for young girls with minimal geometric borders and soft gathered white cotton pajamas.",
    "fabric": "100% Breathable Muslin Cotton",
    "craft_technique": "Supplementary Weft Needlework",
    "colors": [
      {
        "name": "Obsidian & Chalk",
        "hex": "#212121",
        "is_default": true
      }
    ],
    "sizes": [
      "3-4Y",
      "5-6Y",
      "7-8Y",
      "9-10Y"
    ],
    "stock_status": "In Stock — Dhaka Atelier",
    "images": {
      "hero_flatlay": "https://lh3.googleusercontent.com/aida-public/AB6AXuAYAFI_PmmauTCrm73TRCjj9Gevg-iIOPNnIMA2vXYOHYf5jALiTM7imQ9s_EH-7ht0ryf1qGxIMrIlApFTt66mJiK_hRskBhuya8Qth9QaLsb6RUIs9tADGdHqVSU1EODql9mLkxW7hSiE_Q92yyE_Gn7SPqLbbEJKY__D3IzzQDLnS0Z2e5S79HhdWI__isNQlL9jW9bAmBCiTdraouLZKeeE6AgSVWXojJf6ZIQ=s0",
      "hanging_view": "/assets/products/kids/kurti-junior-monochrome-muslin/child_boutique_hang.jpg",
      "fabric_macro_detail": "/assets/products/kids/kurti-junior-monochrome-muslin/geometric_chalk_motif_macro.jpg",
      "back_view": "/assets/products/kids/kurti-junior-monochrome-muslin/button_fastening_back.jpg",
      "folded_view": "/assets/products/kids/kurti-junior-monochrome-muslin/clean_creased_junior_folded.jpg"
    },
    "has_3d_view": false,
    "has_virtual_try_on": false,
    "avatar_preview_id": null,
    "fit_recommendation": "A-Line Relaxed",
    "featured": false
  }
];

export type ProductFilterQuery = {
  category?: string;
  gender?: string;
  collection?: string;
  featured?: boolean;
  q?: string;
  sort?: "price-asc" | "price-desc" | "name-asc";
  page?: number;
  pageSize?: number;
};

export async function getProducts(query: ProductFilterQuery = {}): Promise<{
  items: OotfyProduct[];
  total: number;
  page: number;
  pageSize: number;
}> {
  try {
    let dbQuery = supabase.from("products").select("*", { count: "exact" });
    if (query.category) dbQuery = dbQuery.ilike("category", query.category);
    if (query.gender) dbQuery = dbQuery.ilike("gender", query.gender);
    if (query.collection) dbQuery = dbQuery.ilike("collection", query.collection);
    if (query.featured) dbQuery = dbQuery.eq("featured", true);
    if (query.q) dbQuery = dbQuery.or(`name.ilike.%${query.q}%,description.ilike.%${query.q}%`);

    if (query.sort === "price-asc") dbQuery = dbQuery.order("price_bdt", { ascending: true });
    if (query.sort === "price-desc") dbQuery = dbQuery.order("price_bdt", { ascending: false });
    if (query.sort === "name-asc") dbQuery = dbQuery.order("name", { ascending: true });

    const page = query.page || 1;
    const pageSize = query.pageSize || 12;
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;
    dbQuery = dbQuery.range(from, to);

    const { data, count, error } = await dbQuery;
    if (!error && data && data.length > 0) {
      return {
        items: data as OotfyProduct[],
        total: count || data.length,
        page,
        pageSize,
      };
    }
  } catch {
    // Fallback below
  }

  // Fallback to local catalog
  let items = [...OOTFY_PRODUCTS];
  if (query.category) {
    items = items.filter((p) => p.category.toLowerCase() === query.category!.toLowerCase());
  }
  if (query.gender) {
    items = items.filter((p) => p.gender.toLowerCase() === query.gender!.toLowerCase());
  }
  if (query.collection) {
    items = items.filter((p) => p.collection.toLowerCase() === query.collection!.toLowerCase());
  }
  if (query.featured) {
    items = items.filter((p) => p.featured);
  }
  if (query.q) {
    const q = query.q.toLowerCase();
    items = items.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        (p.subtitle_or_tagline && p.subtitle_or_tagline.toLowerCase().includes(q)) ||
        p.fabric.toLowerCase().includes(q) ||
        p.craft_technique.toLowerCase().includes(q)
    );
  }

  if (query.sort === "price-asc") items.sort((a, b) => a.price_bdt - b.price_bdt);
  if (query.sort === "price-desc") items.sort((a, b) => b.price_bdt - a.price_bdt);
  if (query.sort === "name-asc") items.sort((a, b) => a.name.localeCompare(b.name));

  const page = query.page || 1;
  const pageSize = query.pageSize || items.length;
  const start = (page - 1) * pageSize;

  return {
    items: items.slice(start, start + pageSize),
    total: items.length,
    page,
    pageSize,
  };
}

export async function getProductById(id: string): Promise<OotfyProduct | null> {
  try {
    const { data, error } = await supabase.from("products").select("*").eq("id", id).maybeSingle();
    if (!error && data) return data as OotfyProduct;
  } catch {
    // fallback
  }
  return OOTFY_PRODUCTS.find((p) => p.id === id) || null;
}

export const CATALOG_PRODUCTS: OotfyProduct[] = OOTFY_PRODUCTS;

export function formatPriceBDT(amount: number): string {
  return `৳ ${amount.toLocaleString()}`;
}

export function formatPrice(amount: number, currency: string = "BDT"): string {
  if (currency === "BDT") {
    return formatPriceBDT(amount);
  }
  return `${currency} ${amount.toLocaleString()}`;
}

export type ProductQuery = ProductFilterQuery;

