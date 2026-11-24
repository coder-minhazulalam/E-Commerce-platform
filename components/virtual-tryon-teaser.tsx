"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Sparkles, ShoppingBag, Eye, Check, Info, ZoomIn } from "lucide-react";

interface VirtualTryonTeaserProps {
  onLaunchModal?: () => void;
  onQuickAdd?: (productName: string) => void;
}

interface GarmentOption {
  id: string;
  name: string;
  tagline: string;
  price: number;
  originalPrice: number | null;
  fabric: string;
  craft: string;
  fitDescription: string;
  views: {
    silhouette: {
      url: string;
      label: string;
      description: string;
    };
    macro: {
      url: string;
      label: string;
      description: string;
    };
    folded: {
      url: string;
      label: string;
      description: string;
    };
  };
  hotspots: Array<{
    id: string;
    top: string;
    left: string;
    title: string;
    detail: string;
  }>;
}

const GARMENTS: GarmentOption[] = [
  {
    id: "zardozi-panjabi",
    name: "Zardozi Embroidered Silk Kurta",
    tagline: "The Eid Edit · Midnight Espresso",
    price: 7200,
    originalPrice: 8500,
    fabric: "100% Rajshahi Tussar Silk",
    craft: "Old-Dhaka Antique Gold Zardozi Work",
    fitDescription: "Tailored drape with 2.5\" chest ease for celebratory evening comfort.",
    views: {
      silhouette: {
        url: "/assets/eid/eid-espresso-panjabi.jpg",
        label: "Full Silhouette · Brass Stand",
        description: "Hanging full drape on minimalist atelier stand",
      },
      macro: {
        url: "/assets/eid/eid-muslin-detail.jpg",
        label: "Craft Macro · 5X Zoom",
        description: "Hand-embossed zari threadwork along the placket",
      },
      folded: {
        url: "/assets/eid/eid-folded-silks.jpg",
        label: "Atelier Folded · Travertine",
        description: "Sculptural hand-pressed silk presentation",
      },
    },
    hotspots: [
      {
        id: "collar",
        top: "22%",
        left: "50%",
        title: "Mandarin Collar",
        detail: "Hand-finished stand collar with antique bullion zardozi wire.",
      },
      {
        id: "placket",
        top: "38%",
        left: "52%",
        title: "Chest Placket",
        detail: "Concealed closure with hand-sewn mother-of-pearl buttons.",
      },
      {
        id: "cuff",
        top: "54%",
        left: "34%",
        title: "Sleeve Cuff",
        detail: "Tonal hand-stitch detailing along tailored French cuffs.",
      },
    ],
  },
  {
    id: "ivory-panjabi",
    name: "Embroidered Ivory Panjabi",
    tagline: "Atelier Signatures · Handloom Muslin",
    price: 2490,
    originalPrice: 2990,
    fabric: "80% Organic Cotton, 20% Mulberry Silk",
    craft: "Dhakai Tonal Hand-Embroidery",
    fitDescription: "Effortless relaxed drape in breathable heritage muslin blend.",
    views: {
      silhouette: {
        url: "/assets/hero/hero-banner-master.jpg",
        label: "Full Silhouette · Natural Light",
        description: "Minimalist brass hanging presentation in sunlit atelier",
      },
      macro: {
        url: "/assets/eid/eid-muslin-detail.jpg",
        label: "Weave Detail · Fine Muslin",
        description: "Translucent handloom cotton-silk threads with geometric motifs",
      },
      folded: {
        url: "/assets/eid/eid-folded-silks.jpg",
        label: "Folded Capsule · Atelier Box",
        description: "Hand-wrapped in breathable acid-free muslin tissue",
      },
    },
    hotspots: [
      {
        id: "collar",
        top: "24%",
        left: "48%",
        title: "Tonal Collar",
        detail: "Subtle tone-on-tone Dhakai threadwork on mandarin neck.",
      },
      {
        id: "fabric",
        top: "45%",
        left: "52%",
        title: "Heritage Muslin",
        detail: "Lightweight 80/20 cotton-silk spun on traditional pit looms.",
      },
    ],
  },
  {
    id: "jamdani-saree",
    name: "Handloom Jamdani Saree",
    tagline: "Heritage Weave · 6 Yards Muslin",
    price: 8900,
    originalPrice: 10500,
    fabric: "100% Fine Count Khadi Muslin",
    craft: "Traditional Shitalakhya Jamdani Weave",
    fitDescription: "Classic architectural 6-yard drape with supplementary weft motifs.",
    views: {
      silhouette: {
        url: "/assets/products/jamdani-saree-clean.jpg",
        label: "Full Weave · Jamdani Drape",
        description: "Hand-finished floral Jamdani weave in natural ivory & gold",
      },
      macro: {
        url: "/assets/eid/eid-muslin-detail.jpg",
        label: "Pallu Motifs · Supplementary Weft",
        description: "Geometrical flora painstakingly laid by Dhakai master weavers",
      },
      folded: {
        url: "/assets/eid/eid-folded-silks.jpg",
        label: "Archive Fold · Travertine Slab",
        description: "Museum-grade archival storage fold",
      },
    },
    hotspots: [
      {
        id: "border",
        top: "35%",
        left: "42%",
        title: "Jamdani Selvedge",
        detail: "Intricate floral jaal motifs woven thread-by-thread on pit looms.",
      },
      {
        id: "pallu",
        top: "60%",
        left: "58%",
        title: "Zari Border",
        detail: "Metallic antique zari threads blended with sheer cotton muslin.",
      },
    ],
  },
];

const SIZES = [
  {
    code: "38R",
    label: "38R (S)",
    chest: '38.5"',
    length: '41.5"',
    shoulder: '17.5"',
    sleeve: '25.0"',
  },
  {
    code: "40R",
    label: "40R (M)",
    chest: '40.5"',
    length: '42.0"',
    shoulder: '18.2"',
    sleeve: '25.5"',
  },
  {
    code: "42R",
    label: "42R (L)",
    chest: '42.5"',
    length: '43.0"',
    shoulder: '18.8"',
    sleeve: '26.0"',
  },
  {
    code: "44R",
    label: "44R (XL)",
    chest: '44.5"',
    length: '43.5"',
    shoulder: '19.4"',
    sleeve: '26.5"',
  },
];

export function VirtualTryonTeaser({ onLaunchModal, onQuickAdd }: VirtualTryonTeaserProps) {
  const [selectedGarmentIndex, setSelectedGarmentIndex] = useState(0);
  const [activeView, setActiveView] = useState<"silhouette" | "macro" | "folded">("silhouette");
  const [selectedSizeIndex, setSelectedSizeIndex] = useState(1); // 40R default
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);

  const garment = GARMENTS[selectedGarmentIndex];
  const currentView = garment.views[activeView];
  const sizeSpec = SIZES[selectedSizeIndex];

  const handleAdd = () => {
    if (onQuickAdd) {
      onQuickAdd(`${garment.name} (${sizeSpec.code})`);
    }
  };

  return (
    <section className="w-full bg-[#1b251f] text-[#fcf9f4] py-16 lg:py-24 border-y border-[#3a4a3f]/40 relative overflow-hidden">
      {/* Background Subtle Atelier Atmosphere */}
      <div className="absolute inset-0 bg-radial-gradient from-[#243329] to-[#151e18] pointer-events-none opacity-80" />

      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          
          {/* Left Column: Atelier Narrative & Interactive Silhouette Configurator */}
          <div className="lg:col-span-6 flex flex-col items-start gap-6 lg:gap-7">
            {/* Eyebrow Status */}
            <div className="inline-flex items-center gap-2.5 px-3 py-1 bg-[#28382d] rounded-full border border-white/10 text-[11px] uppercase tracking-[0.2em] text-[#fed892] font-medium">
              <span className="w-2 h-2 rounded-full bg-[#fed892] animate-pulse"></span>
              <span>Interactive Silhouette Atelier</span>
            </div>

            {/* Main Headline */}
            <div>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white uppercase tracking-tight leading-[1.1]">
                SEE IT ON YOU
              </h2>
              <p className="text-sm sm:text-base text-[#a7b9ab] mt-3 max-w-lg leading-relaxed font-normal">
                Inspect proportions, artisanal drape, and textile weight before dispatch. Select an atelier silhouette below to explore high-definition photographic perspectives.
              </p>
            </div>

            {/* Garment Selector Tabs */}
            <div className="w-full border-b border-white/10 pb-4">
              <span className="text-[10px] uppercase tracking-widest text-[#b9cbbd] block mb-2 font-medium">
                Select Atelier Silhouette
              </span>
              <div className="flex flex-wrap gap-2">
                {GARMENTS.map((g, idx) => (
                  <button
                    key={g.id}
                    type="button"
                    onClick={() => {
                      setSelectedGarmentIndex(idx);
                      setActiveHotspot(null);
                    }}
                    className={`px-4 py-2 text-xs uppercase tracking-wider transition-all cursor-pointer font-medium border ${
                      selectedGarmentIndex === idx
                        ? "bg-[#fcf9f4] text-[#1c1c19] border-[#fcf9f4] shadow-md font-semibold"
                        : "bg-black/30 text-white/80 border-white/15 hover:border-white/40 hover:text-white"
                    }`}
                  >
                    {idx + 1}. {g.name.split(" ")[0]} {g.name.split(" ")[1]}
                  </button>
                ))}
              </div>
            </div>

            {/* Garment Specs Summary */}
            <div className="w-full space-y-3 bg-[#223026] p-5 border border-white/10">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[#fed892] font-semibold block">
                    {garment.tagline}
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl text-white mt-0.5">
                    {garment.name}
                  </h3>
                </div>
                <div className="text-right">
                  <div className="text-lg sm:text-xl font-serif text-[#fed892]">
                    ৳ {garment.price.toLocaleString()}
                  </div>
                  {garment.originalPrice && (
                    <div className="text-xs text-[#a7b9ab] line-through">
                      ৳ {garment.originalPrice.toLocaleString()}
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-3 border-t border-white/10 text-xs">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#a7b9ab] block">
                    Fabric Composition
                  </span>
                  <span className="text-white font-medium">{garment.fabric}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#a7b9ab] block">
                    Artisanal Technique
                  </span>
                  <span className="text-white font-medium">{garment.craft}</span>
                </div>
              </div>

              {/* Sizing & Proportion Diagnostic */}
              <div className="pt-3 border-t border-white/10">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] uppercase tracking-wider text-[#a7b9ab] font-medium">
                    Select Fit Size
                  </span>
                  <span className="text-[10px] text-[#fed892] font-mono">
                    Chest {sizeSpec.chest} · Length {sizeSpec.length}
                  </span>
                </div>
                <div className="grid grid-cols-4 gap-1.5">
                  {SIZES.map((s, sIdx) => (
                    <button
                      key={s.code}
                      type="button"
                      onClick={() => setSelectedSizeIndex(sIdx)}
                      className={`py-1.5 text-center text-xs tracking-wider transition-all cursor-pointer border ${
                        selectedSizeIndex === sIdx
                          ? "bg-white text-black font-semibold border-white shadow-sm"
                          : "bg-black/20 text-white/70 border-white/10 hover:border-white/30 hover:text-white"
                      }`}
                    >
                      {s.code}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 w-full pt-1">
              <button
                type="button"
                onClick={handleAdd}
                className="flex-1 min-w-[200px] bg-[#fcf9f4] text-[#1c1c19] py-4 px-6 uppercase tracking-widest text-xs font-semibold hover:bg-[#fed892] transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-lg"
              >
                <ShoppingBag className="w-4 h-4 text-[#1c1c19]" />
                <span>Add To Bag ({sizeSpec.code}) · ৳ {garment.price.toLocaleString()}</span>
              </button>
              {onLaunchModal && (
                <button
                  type="button"
                  onClick={onLaunchModal}
                  className="px-6 py-4 border border-white/20 text-white uppercase tracking-widest text-xs font-medium hover:bg-white/10 transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#fed892]" />
                  <span>Atelier Notes</span>
                </button>
              )}
            </div>
          </div>

          {/* Right Column: Master Photographic Showcase with High-Res View Switcher */}
          <div className="lg:col-span-6">
            <div className="w-full aspect-[4/5] bg-[#141d17] border border-white/15 overflow-hidden relative shadow-2xl group select-none">
              
              {/* Main High-Res Image with smooth transition */}
              <div className="relative w-full h-full overflow-hidden">
                <Image
                  key={`${garment.id}-${activeView}`}
                  src={currentView.url}
                  alt={currentView.label}
                  fill
                  unoptimized
                  priority
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />

                {/* Subtle Cinematic Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 pointer-events-none" />
              </div>

              {/* Interactive Craft Hotspot Pins */}
              {activeView === "silhouette" &&
                garment.hotspots.map((h) => {
                  const isActive = activeHotspot === h.id;
                  return (
                    <div
                      key={h.id}
                      className="absolute z-20"
                      style={{ top: h.top, left: h.left }}
                    >
                      <button
                        type="button"
                        onClick={() => setActiveHotspot(isActive ? null : h.id)}
                        className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all shadow-lg cursor-pointer ${
                          isActive
                            ? "bg-[#fed892] text-[#1c1c19] scale-110 ring-4 ring-[#fed892]/30"
                            : "bg-[#fcf9f4]/90 text-[#1c1c19] hover:bg-white hover:scale-105"
                        }`}
                        title={h.title}
                        aria-label={h.title}
                      >
                        +
                      </button>

                      {/* Hotspot Floating Tooltip */}
                      {isActive && (
                        <div className="absolute left-8 top-1/2 -translate-y-1/2 w-52 sm:w-60 bg-[#fcf9f4] text-[#1c1c19] p-3 shadow-2xl border border-[#c3c8c2] z-30 animate-fade-in text-left">
                          <div className="flex items-center justify-between pb-1 border-b border-[#c3c8c2]/30 mb-1">
                            <span className="text-[10px] uppercase font-bold text-[#755a21] tracking-wider">
                              {h.title}
                            </span>
                            <button
                              type="button"
                              onClick={() => setActiveHotspot(null)}
                              className="text-xs text-[#434844] hover:text-black"
                            >
                              ✕
                            </button>
                          </div>
                          <p className="text-[11px] leading-relaxed text-[#434844]">
                            {h.detail}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}

              {/* Top View Mode Badge */}
              <div className="absolute top-6 right-6 bg-[#fcf9f4]/95 text-[#1c1c19] px-3.5 py-1.5 text-[10px] uppercase tracking-wider backdrop-blur-sm shadow-md font-semibold flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#755a21]"></span>
                <span>{currentView.label}</span>
              </div>

              {/* Bottom Interactive View Angle Selector Bar */}
              <div className="absolute bottom-6 inset-x-6 flex flex-col sm:flex-row items-center justify-between gap-3 pointer-events-auto">
                {/* 3 View Tabs: FULL SILHOUETTE | CRAFT MACRO | ATELIER FOLDED */}
                <div className="flex items-center gap-1 bg-black/75 backdrop-blur-md p-1.5 rounded-full border border-white/20 shadow-xl">
                  <button
                    type="button"
                    onClick={() => {
                      setActiveView("silhouette");
                      setActiveHotspot(null);
                    }}
                    className={`px-3.5 py-1.5 rounded-full text-[10px] uppercase tracking-wider transition-all cursor-pointer font-medium ${
                      activeView === "silhouette"
                        ? "bg-white text-black font-semibold shadow-md"
                        : "text-white/80 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    Silhouette
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveView("macro");
                      setActiveHotspot(null);
                    }}
                    className={`px-3.5 py-1.5 rounded-full text-[10px] uppercase tracking-wider transition-all cursor-pointer font-medium ${
                      activeView === "macro"
                        ? "bg-white text-black font-semibold shadow-md"
                        : "text-white/80 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    Craft Macro
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveView("folded");
                      setActiveHotspot(null);
                    }}
                    className={`px-3.5 py-1.5 rounded-full text-[10px] uppercase tracking-wider transition-all cursor-pointer font-medium ${
                      activeView === "folded"
                        ? "bg-white text-black font-semibold shadow-md"
                        : "text-white/80 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    Atelier Folded
                  </button>
                </div>

                {/* View Hint */}
                <div className="text-[10px] uppercase tracking-wider text-white/80 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/15 hidden sm:inline-flex items-center gap-1.5 font-medium">
                  <Eye className="w-3.5 h-3.5 text-[#fed892]" />
                  <span>100% Clothing-Only</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
