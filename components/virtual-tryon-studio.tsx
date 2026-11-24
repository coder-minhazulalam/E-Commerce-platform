"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Sparkles,
  ShoppingBag,
  RotateCcw,
  ArrowLeft,
  X,
  Check,
  Search,
  Eye,
  Sliders,
  Maximize2,
  RefreshCw,
} from "lucide-react";
import { type OotfyProduct, formatPriceBDT } from "../lib/products";
import { PRODUCT_IMAGE_MAP } from "./product-card";

interface VirtualTryonStudioProps {
  product: OotfyProduct;
  onClose: () => void;
  onAddToCart: (product: OotfyProduct, size: string, color: string, bodyPreset: string) => void;
  onSelectProduct: (product: OotfyProduct) => void;
  allProducts: OotfyProduct[];
}

export type TryonView = "video" | "front" | "threeQuarter" | "back";
export type BodyPreset = "Slim" | "Regular" | "Relaxed";
export type HeightPreset = "Short" | "Medium" | "Tall";

export function VirtualTryonStudio({
  product,
  onClose,
  onAddToCart,
  onSelectProduct,
  allProducts,
}: VirtualTryonStudioProps) {
  const [activeView, setActiveView] = useState<TryonView>("front");
  const [bodyPreset, setBodyPreset] = useState<BodyPreset>("Regular");
  const [heightPreset, setHeightPreset] = useState<HeightPreset>("Medium");
  const [selectedSize, setSelectedSize] = useState<string>(
    product.sizes?.[0] || "M"
  );
  const [selectedColor, setSelectedColor] = useState<string>(
    product.colors?.find((c) => c.is_default)?.name || product.colors?.[0]?.name || "Default"
  );
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerSearch, setDrawerSearch] = useState("");
  const [drawerCategory, setDrawerCategory] = useState("ALL");
  const [isRotating, setIsRotating] = useState(false);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [is360Active, setIs360Active] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [simulationBadge, setSimulationBadge] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  // Sync size & color when product changes
  useEffect(() => {
    setSelectedSize(product.sizes?.[0] || "M");
    setSelectedColor(
      product.colors?.find((c) => c.is_default)?.name || product.colors?.[0]?.name || "Default"
    );
    setSimulationBadge(`Fitted: ${product.name}`);
    const timer = setTimeout(() => setSimulationBadge(null), 2500);
    return () => clearTimeout(timer);
  }, [product]);

  // Video rotation animation loop
  useEffect(() => {
    if (activeView !== "video") {
      setIsRotating(false);
      return;
    }

    setIsRotating(true);
    let animId: number;
    let currentAngle = rotationAngle;

    const loop = () => {
      currentAngle = (currentAngle + 0.4) % 360;
      setRotationAngle(currentAngle);
      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [activeView]);

  // Handle Preset change
  const handleBodyPresetChange = (preset: BodyPreset) => {
    setBodyPreset(preset);
    setSimulationBadge(`Silhouette: ${preset} Tailored Drape`);
    setTimeout(() => setSimulationBadge(null), 2000);
  };

  const handleHeightPresetChange = (preset: HeightPreset) => {
    setHeightPreset(preset);
    const heightLabel = preset === "Short" ? "5'6\"" : preset === "Medium" ? "5'10\"" : "6'2\"";
    setSimulationBadge(`Proportions: ${preset} (${heightLabel})`);
    setTimeout(() => setSimulationBadge(null), 2000);
  };

  const handleSizeChange = (size: string) => {
    setSelectedSize(size);
    setSimulationBadge(`Sizing: Size ${size} Atelier Ease`);
    setTimeout(() => setSimulationBadge(null), 2000);
  };

  // Garment Images Mapping for multi-angle studio rendering
  const garmentHero =
    PRODUCT_IMAGE_MAP[product.id] ||
    product.images?.hero_flatlay ||
    "/assets/products/jamdani-saree-clean.jpg";

  // Derive distinct views from verified images or tailored camera transformations
  const getViewTransform = () => {
    let scaleX = 1;
    let scaleY = 1;
    let rotateY = 0;
    let translateY = 0;

    // Body preset adjustments
    if (bodyPreset === "Slim") scaleX = 0.94;
    if (bodyPreset === "Relaxed") scaleX = 1.06;

    // Height preset adjustments
    if (heightPreset === "Short") scaleY = 0.96;
    if (heightPreset === "Tall") {
      scaleY = 1.04;
      translateY = -8;
    }

    // Camera view adjustments
    if (activeView === "front") {
      rotateY = 0;
    } else if (activeView === "threeQuarter") {
      rotateY = -22;
      scaleX *= 0.96;
    } else if (activeView === "back") {
      rotateY = 180;
    } else if (activeView === "video") {
      rotateY = Math.sin((rotationAngle * Math.PI) / 180) * 32;
    }

    if (is360Active) {
      rotateY = rotationAngle;
    }

    return `perspective(1200px) rotateY(${rotateY}deg) scale(${scaleX}, ${scaleY}) translateY(${translateY}px)`;
  };

  // Mouse drag for interactive 360 degree rotation
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!is360Active) return;
    setIsDragging(true);
    setStartX(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !is360Active) return;
    const delta = e.clientX - startX;
    setRotationAngle((prev) => (prev + delta * 0.5) % 360);
    setStartX(e.clientX);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Filter products for the outfit switcher drawer
  const filteredDrawerProducts = allProducts.filter((p) => {
    const matchesCategory =
      drawerCategory === "ALL" || p.category.toUpperCase() === drawerCategory;
    const matchesSearch =
      !drawerSearch ||
      p.name.toLowerCase().includes(drawerSearch.toLowerCase()) ||
      p.category.toLowerCase().includes(drawerSearch.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="w-full min-h-[calc(100vh-80px)] bg-[#f8f5ef] text-[#1c1c19] flex flex-col font-sans select-none">
      {/* Simulation Feedback Toast Badge */}
      {simulationBadge && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-[#243329]/95 text-white text-[11px] uppercase tracking-widest px-4 py-2 shadow-lg backdrop-blur-md transition-all duration-300 animate-fadeIn">
          {simulationBadge}
        </div>
      )}

      {/* Main Studio Workspace: 2-column Atelier Architecture */}
      <div className="flex-1 max-w-[1600px] w-full mx-auto grid grid-cols-1 lg:grid-cols-12 min-h-[750px]">
        {/* Left Column (65-70% on desktop): 3D Virtual Try-On Stage */}
        <div
          ref={containerRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          className="lg:col-span-8 relative bg-gradient-to-b from-[#f9f7f2] via-[#f5f1ea] to-[#eee8dc] flex flex-col items-center justify-between p-6 sm:p-10 border-r border-[#c3c8c2]/30 overflow-hidden"
        >
          {/* Studio Top Control Header */}
          <div className="w-full flex items-center justify-between z-20">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#755a21] animate-pulse" />
              <span className="text-[11px] uppercase tracking-[0.25em] font-semibold text-[#737873]">
                OOTFY Atelier Studio — 2026
              </span>
            </div>

            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => {
                  setIs360Active(!is360Active);
                  if (!is360Active) {
                    setSimulationBadge("360° Drag Mode Activated · Click & Drag to Orbit");
                    setTimeout(() => setSimulationBadge(null), 2500);
                  }
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-[11px] uppercase tracking-wider font-medium border backdrop-blur-sm transition-all cursor-pointer ${
                  is360Active
                    ? "bg-[#243329] text-white border-[#243329] shadow-sm"
                    : "bg-white/80 text-[#1c1c19] border-[#c3c8c2]/60 hover:bg-white"
                }`}
              >
                <RefreshCw className={`w-3.5 h-3.5 ${is360Active ? "animate-spin" : ""}`} />
                <span>360° Interactive View</span>
              </button>

              <button
                type="button"
                onClick={onClose}
                className="lg:hidden p-2 text-[#737873] hover:text-[#1c1c19] bg-white/80 border border-[#c3c8c2]/60"
                title="Back to Details"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Architectural Daylight & Travertine Studio Ambience */}
          <div className="absolute inset-0 pointer-events-none opacity-40 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/70 via-transparent to-black/5" />
          <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#fed892]/20 rounded-full blur-3xl pointer-events-none" />

          {/* Central Mannequin & Garment Showcase */}
          <div className="relative z-10 w-full flex-1 flex flex-col items-center justify-center my-6">
            {/* The Mannequin & Garment Composition */}
            <div
              className="relative w-[320px] sm:w-[400px] h-[480px] sm:h-[540px] flex items-center justify-center transition-transform duration-500 ease-out"
              style={{
                transform: getViewTransform(),
                transformStyle: "preserve-3d",
              }}
            >
              {/* Minimalist Studio Mannequin Stand Behind */}
              <div className="absolute top-4 w-16 h-20 rounded-full border border-[#c3c8c2]/50 bg-gradient-to-b from-[#e3ded4]/40 to-[#d0c9bc]/50 blur-[0.5px]" />
              <div className="absolute top-20 w-1.5 h-full bg-gradient-to-b from-[#c3c8c2] via-[#aba599] to-[#8d877c] opacity-60" />

              {/* Garment Primary Layer */}
              <div className="relative w-full h-full drop-shadow-[0_20px_35px_rgba(28,28,25,0.18)]">
                <Image
                  src={garmentHero}
                  alt={`${product.name} atelier drape`}
                  fill
                  unoptimized
                  priority
                  className="object-contain object-center transition-all duration-300"
                />

                {/* Subtle Color Cast/Tint overlay if alternative color is selected */}
                {selectedColor !== "Default" && selectedColor !== "Ivory" && (
                  <div
                    className="absolute inset-0 mix-blend-multiply opacity-15 pointer-events-none transition-opacity duration-300"
                    style={{
                      backgroundColor:
                        product.colors?.find((c) => c.name === selectedColor)?.hex ||
                        "transparent",
                    }}
                  />
                )}
              </div>
            </div>

            {/* Travertine Stone Studio Pedestal Platform with Ambient Shadow */}
            <div className="relative -mt-6 flex flex-col items-center">
              {/* Pedestal Top Surface */}
              <div className="w-64 sm:w-80 h-7 rounded-[100%] bg-gradient-to-b from-[#f3eee5] to-[#dfd7c9] border border-[#d2cabb] shadow-sm flex items-center justify-center">
                <div className="w-48 sm:w-60 h-4 rounded-[100%] bg-[#eae3d5]/60 border border-white/40" />
              </div>
              {/* Pedestal Base Drop Shadow */}
              <div className="w-72 sm:w-96 h-8 rounded-[100%] bg-black/15 blur-md -mt-4 pointer-events-none" />
            </div>
          </div>

          {/* Bottom Floating Camera View Pill Bar */}
          <div className="w-full flex flex-col items-center gap-3 z-20">
            <div className="inline-flex items-center p-1.5 bg-[#fcf9f4]/90 backdrop-blur-md border border-[#c3c8c2]/60 rounded-full shadow-md gap-1">
              {(
                [
                  { id: "video", label: "VIDEO" },
                  { id: "front", label: "FRONT" },
                  { id: "threeQuarter", label: "¾ VIEW" },
                  { id: "back", label: "BACK" },
                ] as const
              ).map((v) => (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => {
                    setActiveView(v.id);
                    setIs360Active(false);
                    setSimulationBadge(`Camera Angle: ${v.label}`);
                    setTimeout(() => setSimulationBadge(null), 1800);
                  }}
                  className={`px-4 sm:px-6 py-2 rounded-full text-xs font-semibold tracking-wider transition-all cursor-pointer ${
                    activeView === v.id
                      ? "bg-[#243329] text-white shadow-sm"
                      : "text-[#434844] hover:text-[#1c1c19] hover:bg-[#ebe8e3]/60"
                  }`}
                >
                  {v.label}
                </button>
              ))}
            </div>

            <p className="text-[11px] text-[#737873] tracking-wide text-center">
              Live interactive preview only; not a guarantee of real-world garment.
            </p>
          </div>
        </div>

        {/* Right Column (30-35% on desktop): SEE IT ON YOU Control Console */}
        <div className="lg:col-span-4 bg-[#fcf9f4] p-6 sm:p-10 flex flex-col justify-between overflow-y-auto border-l border-[#c3c8c2]/30">
          <div className="space-y-6">
            {/* Top Navigation & Heading */}
            <div className="flex items-center justify-between pb-4 border-b border-[#c3c8c2]/40">
              <div>
                <span className="text-[11px] uppercase tracking-widest text-[#755a21] font-semibold block">
                  Virtual Atelier
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl text-[#1c1c19] tracking-tight">
                  SEE IT ON YOU
                </h2>
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Back to Product Details"
                className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-[#737873] hover:text-[#1c1c19] py-1 px-2 border border-transparent hover:border-[#c3c8c2] transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Details</span>
              </button>
            </div>

            {/* Selected Garment Miniature Card */}
            <div className="flex items-center gap-3.5 p-3 bg-[#f6f3ee] border border-[#c3c8c2]/50">
              <div className="relative w-16 h-20 bg-white border border-[#c3c8c2]/40 overflow-hidden shrink-0">
                <Image
                  src={garmentHero}
                  alt={product.name}
                  fill
                  unoptimized
                  className="object-cover object-center"
                />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-[10px] uppercase tracking-widest text-[#755a21] font-medium block truncate">
                  {product.category} · {product.collection || "The Eid Edit"}
                </span>
                <h4 className="font-serif text-sm font-semibold text-[#1c1c19] truncate leading-tight mt-0.5">
                  {product.name}
                </h4>
                <p className="text-xs font-medium text-[#1c1c19] mt-1">
                  {formatPriceBDT(product.price_bdt)}
                </p>
              </div>
            </div>

            {/* 1. Body Preset Configurator */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs uppercase tracking-widest text-[#434844] font-semibold">
                  Body Preset: <span className="text-[#1c1c19]">{bodyPreset}</span>
                </label>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {(["Slim", "Regular", "Relaxed"] as BodyPreset[]).map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => handleBodyPresetChange(preset)}
                    className={`py-2 px-3 text-xs uppercase tracking-wider font-medium border text-center transition-all cursor-pointer ${
                      bodyPreset === preset
                        ? "bg-[#243329] text-white border-[#243329] shadow-sm"
                        : "bg-[#f6f3ee] text-[#1c1c19] border-[#c3c8c2]/60 hover:border-[#1c1c19]"
                    }`}
                  >
                    {preset}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Height Proportion Selector */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs uppercase tracking-widest text-[#434844] font-semibold">
                  Height: <span className="text-[#1c1c19]">{heightPreset}</span>
                </label>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {(
                  [
                    { id: "Short", label: "Short", desc: "5'6\"" },
                    { id: "Medium", label: "Medium", desc: "5'10\"" },
                    { id: "Tall", label: "Tall", desc: "6'2\"" },
                  ] as const
                ).map((h) => (
                  <button
                    key={h.id}
                    type="button"
                    onClick={() => handleHeightPresetChange(h.id)}
                    className={`py-2 px-3 text-xs uppercase tracking-wider font-medium border text-center transition-all cursor-pointer ${
                      heightPreset === h.id
                        ? "bg-[#243329] text-white border-[#243329] shadow-sm"
                        : "bg-[#f6f3ee] text-[#1c1c19] border-[#c3c8c2]/60 hover:border-[#1c1c19]"
                    }`}
                  >
                    <span>{h.label}</span>
                    <span className="block text-[10px] opacity-75">{h.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Garment Size Selector */}
            {product.sizes && product.sizes.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs uppercase tracking-widest text-[#434844] font-semibold">
                    Size: <span className="text-[#1c1c19]">{selectedSize}</span>
                  </label>
                  <span className="text-[10px] uppercase text-[#755a21] tracking-wider">
                    Dhaka Atelier Sizing
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => handleSizeChange(size)}
                      className={`min-w-[44px] py-2 px-2.5 text-xs uppercase tracking-wider font-medium border text-center transition-all cursor-pointer ${
                        selectedSize === size
                          ? "bg-[#243329] text-white border-[#243329] shadow-sm"
                          : "bg-[#f6f3ee] text-[#1c1c19] border-[#c3c8c2]/60 hover:border-[#1c1c19]"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* 4. Color Swatches */}
            {product.colors && product.colors.length > 0 && (
              <div>
                <label className="text-xs uppercase tracking-widest text-[#434844] font-semibold block mb-2">
                  Colorway: <span className="text-[#1c1c19]">{selectedColor}</span>
                </label>
                <div className="flex items-center gap-2.5">
                  {product.colors.map((color, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setSelectedColor(color.name);
                        setSimulationBadge(`Colorway: ${color.name}`);
                        setTimeout(() => setSimulationBadge(null), 1800);
                      }}
                      className={`w-7 h-7 rounded-full border-2 transition-transform cursor-pointer relative ${
                        selectedColor === color.name
                          ? "border-[#243329] scale-110 ring-2 ring-[#243329]/25"
                          : "border-transparent hover:scale-105"
                      }`}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    >
                      {selectedColor === color.name && (
                        <span className="sr-only">Selected {color.name}</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Action Row */}
          <div className="space-y-3 pt-6 mt-6 border-t border-[#c3c8c2]/40">
            {/* Primary Add to Cart Button */}
            <button
              type="button"
              onClick={() => onAddToCart(product, selectedSize, selectedColor, bodyPreset)}
              className="w-full h-12 bg-[#243329] hover:bg-[#1a261e] text-white text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer active:scale-[0.99]"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Add To Cart</span>
            </button>

            {/* Switch Outfit Button */}
            <button
              type="button"
              onClick={() => setIsDrawerOpen(true)}
              className="w-full h-11 bg-white hover:bg-[#f6f3ee] text-[#1c1c19] border border-[#c3c8c2] text-xs uppercase tracking-widest font-medium flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-[0.99]"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#755a21]" />
              <span>Try Another Outfit</span>
            </button>
          </div>
        </div>
      </div>

      {/* Slide-over Drawer: Switch Outfit Atelier Catalog */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-md bg-[#fcf9f4] h-full shadow-2xl flex flex-col p-6 overflow-hidden animate-slideInRight">
            {/* Drawer Header */}
            <div className="flex items-center justify-between pb-4 border-b border-[#c3c8c2]/40">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#755a21] font-semibold block">
                  Atelier Wardrobe
                </span>
                <h3 className="font-serif text-xl text-[#1c1c19]">Try Another Outfit</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsDrawerOpen(false)}
                className="p-1.5 text-[#737873] hover:text-[#1c1c19] border border-[#c3c8c2]/50 hover:bg-[#f6f3ee] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Search & Category Filter */}
            <div className="py-4 space-y-3">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#737873]" />
                <input
                  type="text"
                  placeholder="Search pieces (Panjabi, Saree, Kurta)..."
                  value={drawerSearch}
                  onChange={(e) => setDrawerSearch(e.target.value)}
                  className="w-full bg-[#f6f3ee] border border-[#c3c8c2]/60 text-xs py-2.5 pl-9 pr-3 text-[#1c1c19] focus:outline-none focus:border-[#243329]"
                />
              </div>

              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-[11px] uppercase tracking-wider">
                {["ALL", "PANJABI", "SAREE", "SHIRTS", "SUITS & BLAZERS"].map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setDrawerCategory(cat)}
                    className={`px-3 py-1 whitespace-nowrap border transition-colors cursor-pointer ${
                      drawerCategory === cat
                        ? "bg-[#243329] text-white border-[#243329]"
                        : "bg-white text-[#434844] border-[#c3c8c2]/60 hover:text-[#1c1c19]"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Outfits List */}
            <div className="flex-1 overflow-y-auto space-y-3 pr-1">
              {filteredDrawerProducts.map((item) => {
                const imgUrl =
                  PRODUCT_IMAGE_MAP[item.id] ||
                  item.images?.hero_flatlay ||
                  "/assets/products/jamdani-saree-clean.jpg";

                const isSelected = item.id === product.id;

                return (
                  <div
                    key={item.id}
                    onClick={() => {
                      onSelectProduct(item);
                      setIsDrawerOpen(false);
                    }}
                    className={`flex items-center gap-3 p-2.5 border transition-all cursor-pointer ${
                      isSelected
                        ? "bg-[#243329]/5 border-[#243329]"
                        : "bg-white border-[#c3c8c2]/40 hover:border-[#1c1c19] hover:bg-[#f6f3ee]"
                    }`}
                  >
                    <div className="relative w-14 h-16 bg-[#f6f3ee] border border-[#c3c8c2]/40 shrink-0 overflow-hidden">
                      <Image
                        src={imgUrl}
                        alt={item.name}
                        fill
                        unoptimized
                        className="object-cover object-center"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] uppercase tracking-widest text-[#755a21] block truncate">
                        {item.category}
                      </span>
                      <h5 className="font-serif text-xs font-semibold text-[#1c1c19] truncate">
                        {item.name}
                      </h5>
                      <span className="text-xs font-medium text-[#1c1c19] mt-0.5 block">
                        {formatPriceBDT(item.price_bdt)}
                      </span>
                    </div>
                    {isSelected ? (
                      <span className="text-[10px] uppercase font-semibold text-[#243329] bg-[#243329]/10 px-2 py-1">
                        Active
                      </span>
                    ) : (
                      <button
                        type="button"
                        className="text-[10px] uppercase tracking-wider text-[#755a21] font-semibold hover:underline px-2 py-1"
                      >
                        Try On
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
