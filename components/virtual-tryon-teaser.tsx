"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { Sparkles, RotateCcw, Check, ShoppingBag, X, SlidersHorizontal } from "lucide-react";

interface VirtualTryonTeaserProps {
  onLaunchModal?: () => void;
  onQuickAdd?: (productName: string) => void;
}

export function VirtualTryonTeaser({ onLaunchModal, onQuickAdd }: VirtualTryonTeaserProps) {
  const [angle, setAngle] = useState<"front" | "perspective" | "back">("front");
  const [rotationDeg, setRotationDeg] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isAutoRotating, setIsAutoRotating] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState("40R (M)");
  const [selectedColor, setSelectedColor] = useState("Obsidian Black");
  const dragStartX = useRef(0);
  const currentRotRef = useRef(0);
  const autoRotateTimer = useRef<NodeJS.Timeout | null>(null);

  // Sync angle preset with degree rotation
  const setPresetAngle = useCallback((preset: "front" | "perspective" | "back") => {
    setIsAutoRotating(false);
    setAngle(preset);
    if (preset === "front") {
      setRotationDeg(0);
      currentRotRef.current = 0;
    } else if (preset === "perspective") {
      setRotationDeg(-32);
      currentRotRef.current = -32;
    } else if (preset === "back") {
      setRotationDeg(180);
      currentRotRef.current = 180;
    }
  }, []);

  // Handle Drag / Touch Rotation
  const handlePointerDown = (e: React.PointerEvent) => {
    setIsAutoRotating(false);
    setIsDragging(true);
    dragStartX.current = e.clientX;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - dragStartX.current;
    dragStartX.current = e.clientX;
    
    // Scale sensitivity
    const newRot = (currentRotRef.current + deltaX * 0.8) % 360;
    currentRotRef.current = newRot;
    setRotationDeg(newRot);

    // Update active pill button based on current rotation
    const normalized = ((newRot % 360) + 360) % 360;
    if (normalized > 135 && normalized < 225) {
      setAngle("back");
    } else if ((normalized > 15 && normalized <= 135) || (normalized > 225 && normalized < 345)) {
      setAngle("perspective");
    } else {
      setAngle("front");
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (isDragging) {
      setIsDragging(false);
      try {
        (e.target as HTMLElement).releasePointerCapture(e.pointerId);
      } catch {
        // Pointer already released
      }
    }
  };

  // Auto 360 Turntable rotation
  const toggleAutoRotate = () => {
    if (isAutoRotating) {
      setIsAutoRotating(false);
    } else {
      setIsAutoRotating(true);
    }
  };

  useEffect(() => {
    if (isAutoRotating) {
      const interval = setInterval(() => {
        setRotationDeg((prev) => {
          const next = (prev + 1.5) % 360;
          currentRotRef.current = next;
          const normalized = ((next % 360) + 360) % 360;
          if (normalized > 135 && normalized < 225) {
            setAngle("back");
          } else if ((normalized > 20 && normalized <= 135) || (normalized > 225 && normalized < 340)) {
            setAngle("perspective");
          } else {
            setAngle("front");
          }
          return next;
        });
      }, 30);
      return () => clearInterval(interval);
    }
  }, [isAutoRotating]);

  // Normalized rotation for rendering backface vs frontface
  const normalizedRot = ((rotationDeg % 360) + 360) % 360;
  const isBackSide = normalizedRot > 90 && normalizedRot < 270;

  // View Angle Label Display
  const getDisplayLabel = () => {
    if (angle === "front") return "Preview: Front 0° · Atelier Studio";
    if (angle === "perspective") return "Preview: Perspective ¾ 45° · Depth View";
    return "Preview: Back Profile 180° · Tailored Yoke";
  };

  const handleLaunch = () => {
    if (onLaunchModal) {
      onLaunchModal();
    }
    setIsModalOpen(true);
  };

  return (
    <>
      <section className="w-full bg-[#243329] text-white py-16 lg:py-24">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Narrative Column */}
            <div className="lg:col-span-6 flex flex-col items-start gap-6 lg:gap-8">
              <span className="text-[11px] uppercase text-[#b9cbbd] tracking-[0.2em] flex items-center gap-2 font-medium">
                <span className="w-2 h-2 rounded-full bg-[#fed892] animate-pulse"></span>
                Interactive Atelier
              </span>

              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white uppercase tracking-tight">
                SEE IT ON YOU
              </h2>

              <p className="text-base text-[#a7b9ab] max-w-md leading-relaxed font-normal">
                Experience bespoke proportion and drape before you order. Preview our tailored silhouettes on a neutral digital form mapped to standard South Asian tailoring proportions.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  type="button"
                  onClick={handleLaunch}
                  className="tryon-pulse inline-flex items-center justify-center gap-2 bg-[#fcf9f4] text-[#1c1c19] text-xs uppercase tracking-widest px-8 py-4 hover:bg-[#f6f3ee] transition-all group cursor-pointer font-medium shadow-sm"
                >
                  <span>Launch Virtual Try-On</span>
                  <Sparkles className="w-4 h-4 text-[#755a21] transition-transform duration-300 group-hover:scale-110" />
                </button>
                <div className="flex items-center gap-2 text-xs text-[#b9cbbd]/80">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#fed892]"></span>
                  <span>Drag avatar for 360° rotation</span>
                </div>
              </div>
            </div>

            {/* Right Interactive 3D Avatar Box */}
            <div className="lg:col-span-6">
              <div 
                className={`w-full aspect-[4/5] bg-[#1a231d] overflow-hidden relative shadow-2xl group select-none ${
                  isDragging ? "cursor-grabbing" : "cursor-grab"
                }`}
                style={{ perspective: "1200px" }}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerCancel={handlePointerUp}
              >
                {/* 3D Rotating Avatar Card */}
                <div
                  className="relative w-full h-full"
                  style={{
                    transformStyle: "preserve-3d",
                    transform: `rotateY(${rotationDeg}deg) ${angle === "perspective" && !isDragging ? "rotateX(2deg) scale(1.03)" : "scale(1)"}`,
                    transition: isDragging || isAutoRotating ? "none" : "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                >
                  {/* FRONT FACE */}
                  <div
                    className="absolute inset-0 w-full h-full"
                    style={{
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                    }}
                  >
                    <Image
                      src="/assets/tryon/tryon-avatar-mannequin.jpg"
                      alt="Virtual Try-On Front Preview"
                      fill
                      unoptimized
                      priority
                      className="object-cover object-center pointer-events-none"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />

                    {/* Realistic 3D Dynamic Lighting Shading based on angle */}
                    <div
                      className="absolute inset-0 pointer-events-none transition-opacity duration-300"
                      style={{
                        background:
                          angle === "perspective"
                            ? "linear-gradient(110deg, rgba(255,255,255,0.18) 0%, transparent 40%, rgba(0,0,0,0.55) 100%)"
                            : "radial-gradient(circle at 50% 35%, rgba(255,255,255,0.06) 0%, transparent 70%)",
                      }}
                    />
                  </div>

                  {/* BACK FACE (Tailored Back Profile of Panjabi) */}
                  <div
                    className="absolute inset-0 w-full h-full bg-[#1b251e] overflow-hidden"
                    style={{
                      transform: "rotateY(180deg)",
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                    }}
                  >
                    {/* Back Base Mannequin Image */}
                    <Image
                      src="/assets/tryon/tryon-avatar-mannequin.jpg"
                      alt="Virtual Try-On Back Profile Preview"
                      fill
                      unoptimized
                      priority
                      className="object-cover object-center scale-x-[-1] pointer-events-none filter brightness-95"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />

                    {/* Tailored Back Panel Overlay: Smooth Mandarin Collar Back & Vertical Yoke Seam */}
                    <div className="absolute inset-0 flex flex-col items-center pointer-events-none">
                      {/* Back of Neutral Head */}
                      <div className="w-[18%] aspect-[3/4] mt-[8%] rounded-[50%] bg-[#a3a3a0]/80 shadow-inner blur-[0.4px]" />

                      {/* Tailored Mandarin Collar Back Band */}
                      <div className="w-[14%] h-[2.5%] -mt-[1%] bg-[#1c1c1c] rounded-t-sm border-t border-[#333]/60 shadow-md" />

                      {/* Tailored Back Yoke Line across shoulders */}
                      <div className="w-[42%] h-[1px] bg-[#111] shadow-[0_1px_1px_rgba(255,255,255,0.07)] mt-[2%]" />

                      {/* Center-Back Spine Stitching Seam down to hem */}
                      <div className="w-[1.5px] h-[58%] bg-black/80 shadow-[1px_0_1px_rgba(255,255,255,0.05)] mt-[1px]" />
                    </div>

                    {/* Back Lighting Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 pointer-events-none" />
                  </div>
                </div>

                {/* Top View Angle Status Pill */}
                <div className="absolute top-6 right-6 bg-[#fcf9f4]/95 text-[#1c1c19] px-3.5 py-1.5 text-[10px] uppercase tracking-wider backdrop-blur-sm shadow-md font-semibold flex items-center gap-1.5 pointer-events-none">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#755a21] animate-pulse"></span>
                  <span>{getDisplayLabel()}</span>
                </div>

                {/* Angle Controls Pill Bar at Bottom */}
                <div className="absolute bottom-6 inset-x-6 flex items-center justify-between pointer-events-auto">
                  {/* Three Preset Buttons: FRONT | ¾ VIEW | BACK */}
                  <div className="flex items-center gap-1 bg-black/60 backdrop-blur-md p-1.5 rounded-full border border-white/15 shadow-lg">
                    <button
                      type="button"
                      onClick={() => setPresetAngle("front")}
                      className={`px-3.5 py-1.5 rounded-full text-[10px] uppercase tracking-wider transition-all cursor-pointer font-medium ${
                        angle === "front" && !isBackSide
                          ? "bg-white text-black font-semibold shadow-md"
                          : "text-white/80 hover:text-white hover:bg-white/10"
                      }`}
                    >
                      Front
                    </button>
                    <button
                      type="button"
                      onClick={() => setPresetAngle("perspective")}
                      className={`px-3.5 py-1.5 rounded-full text-[10px] uppercase tracking-wider transition-all cursor-pointer font-medium ${
                        angle === "perspective" && !isBackSide
                          ? "bg-white text-black font-semibold shadow-md"
                          : "text-white/80 hover:text-white hover:bg-white/10"
                      }`}
                    >
                      ¾ View
                    </button>
                    <button
                      type="button"
                      onClick={() => setPresetAngle("back")}
                      className={`px-3.5 py-1.5 rounded-full text-[10px] uppercase tracking-wider transition-all cursor-pointer font-medium ${
                        isBackSide || angle === "back"
                          ? "bg-white text-black font-semibold shadow-md"
                          : "text-white/80 hover:text-white hover:bg-white/10"
                      }`}
                    >
                      Back
                    </button>
                  </div>

                  {/* 360 Rotation Toggle */}
                  <button
                    type="button"
                    onClick={toggleAutoRotate}
                    className={`inline-flex items-center gap-1.5 text-[10px] uppercase tracking-wider backdrop-blur-md px-3.5 py-1.5 rounded-full border transition-all cursor-pointer font-medium ${
                      isAutoRotating
                        ? "bg-[#fed892] text-[#243329] border-[#fed892] font-semibold shadow-md"
                        : "text-white/90 bg-black/60 border-white/15 hover:bg-black/80"
                    }`}
                  >
                    <RotateCcw className={`w-3.5 h-3.5 ${isAutoRotating ? "animate-spin" : ""}`} />
                    <span>{isAutoRotating ? "Rotating 360°" : "3D Rotate"}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Virtual Try-On Atelier Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-4xl bg-[#fcf9f4] text-[#1c1c19] shadow-2xl border border-[#c3c8c2]/40 max-h-[92vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-[#c3c8c2]/30">
              <div>
                <span className="text-[11px] uppercase tracking-widest text-[#755a21] font-medium block mb-0.5">
                  Dhaka Atelier Digital Fitting
                </span>
                <h3 className="font-serif text-2xl lg:text-3xl uppercase tracking-tight text-[#1c1c19]">
                  Virtual Try-On 3D Atelier
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-2 hover:bg-[#ebe8e3] rounded-full transition-colors cursor-pointer text-[#434844]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 p-6 lg:p-8">
              {/* Left Column: Interactive 3D Canvas Preview */}
              <div className="md:col-span-7">
                <div 
                  className="w-full aspect-[4/5] bg-[#243329] overflow-hidden relative shadow-lg cursor-grab active:cursor-grabbing select-none"
                  style={{ perspective: "1200px" }}
                  onPointerDown={handlePointerDown}
                  onPointerMove={handlePointerMove}
                  onPointerUp={handlePointerUp}
                >
                  <div
                    className="relative w-full h-full"
                    style={{
                      transformStyle: "preserve-3d",
                      transform: `rotateY(${rotationDeg}deg) ${angle === "perspective" && !isDragging ? "rotateX(2deg) scale(1.03)" : "scale(1)"}`,
                      transition: isDragging || isAutoRotating ? "none" : "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
                    }}
                  >
                    {/* Front */}
                    <div className="absolute inset-0 w-full h-full" style={{ backfaceVisibility: "hidden" }}>
                      <Image
                        src="/assets/tryon/tryon-avatar-mannequin.jpg"
                        alt="Fitting Avatar Front"
                        fill
                        unoptimized
                        priority
                        className="object-cover object-center pointer-events-none"
                      />
                    </div>
                    {/* Back */}
                    <div 
                      className="absolute inset-0 w-full h-full bg-[#1b251e] overflow-hidden" 
                      style={{ transform: "rotateY(180deg)", backfaceVisibility: "hidden" }}
                    >
                      <Image
                        src="/assets/tryon/tryon-avatar-mannequin.jpg"
                        alt="Fitting Avatar Back"
                        fill
                        unoptimized
                        priority
                        className="object-cover object-center scale-x-[-1] pointer-events-none filter brightness-95"
                      />
                      <div className="absolute inset-0 flex flex-col items-center pointer-events-none">
                        <div className="w-[18%] aspect-[3/4] mt-[8%] rounded-[50%] bg-[#a3a3a0]/80 shadow-inner blur-[0.4px]" />
                        <div className="w-[14%] h-[2.5%] -mt-[1%] bg-[#1c1c1c] rounded-t-sm border-t border-[#333]/60 shadow-md" />
                        <div className="w-[42%] h-[1px] bg-[#111] shadow-[0_1px_1px_rgba(255,255,255,0.07)] mt-[2%]" />
                        <div className="w-[1.5px] h-[58%] bg-black/80 mt-[1px]" />
                      </div>
                    </div>
                  </div>

                  {/* Degree Readout Overlay */}
                  <div className="absolute top-4 left-4 bg-black/60 text-white px-3 py-1 text-[10px] uppercase tracking-wider backdrop-blur-md rounded-full border border-white/10 font-mono">
                    Azimuth: {Math.round(normalizedRot)}°
                  </div>

                  {/* Angle Switcher inside Modal */}
                  <div className="absolute bottom-4 inset-x-4 flex items-center justify-between pointer-events-auto">
                    <div className="flex items-center gap-1 bg-black/70 backdrop-blur-md p-1 rounded-full border border-white/15">
                      <button
                        type="button"
                        onClick={() => setPresetAngle("front")}
                        className={`px-3 py-1 rounded-full text-[10px] uppercase tracking-wider font-medium transition-all cursor-pointer ${
                          angle === "front" && !isBackSide ? "bg-white text-black font-semibold" : "text-white/80"
                        }`}
                      >
                        Front
                      </button>
                      <button
                        type="button"
                        onClick={() => setPresetAngle("perspective")}
                        className={`px-3 py-1 rounded-full text-[10px] uppercase tracking-wider font-medium transition-all cursor-pointer ${
                          angle === "perspective" && !isBackSide ? "bg-white text-black font-semibold" : "text-white/80"
                        }`}
                      >
                        ¾ View
                      </button>
                      <button
                        type="button"
                        onClick={() => setPresetAngle("back")}
                        className={`px-3 py-1 rounded-full text-[10px] uppercase tracking-wider font-medium transition-all cursor-pointer ${
                          isBackSide || angle === "back" ? "bg-white text-black font-semibold" : "text-white/80"
                        }`}
                      >
                        Back
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={toggleAutoRotate}
                      className={`text-[10px] uppercase tracking-wider px-3 py-1 rounded-full border transition-all cursor-pointer ${
                        isAutoRotating
                          ? "bg-[#fed892] text-[#243329] border-[#fed892] font-semibold"
                          : "text-white/90 bg-black/60 border-white/15"
                      }`}
                    >
                      {isAutoRotating ? "Stop" : "360° Spin"}
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Column: Tailoring Configuration & Fit Analysis */}
              <div className="md:col-span-5 flex flex-col justify-between gap-6">
                <div>
                  <div className="mb-4">
                    <span className="text-[10px] uppercase tracking-widest text-[#755a21] font-semibold block mb-1">
                      Garment Silhouette
                    </span>
                    <h4 className="font-serif text-xl uppercase tracking-tight text-[#1c1c19]">
                      Obsidian Embroidered Panjabi
                    </h4>
                    <p className="text-xs text-[#434844] mt-1">
                      Pure Rajshahi Silk with tonal Dhakai stitchwork. Mapped to 5-point proportion mannequin.
                    </p>
                    <div className="text-lg font-serif text-[#1c1c19] mt-2">
                      ৳ 6,800
                    </div>
                  </div>

                  {/* Size Selector */}
                  <div className="mb-6 pt-3 border-t border-[#c3c8c2]/30">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] uppercase tracking-wider font-medium text-[#1c1c19]">
                        Select Fit Size
                      </span>
                      <span className="text-[10px] text-[#755a21] font-medium uppercase tracking-wider">
                        Tailored Slim Fit
                      </span>
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                      {["38R (S)", "40R (M)", "42R (L)", "44R (XL)"].map((sz) => (
                        <button
                          key={sz}
                          type="button"
                          onClick={() => setSelectedSize(sz)}
                          className={`py-2 px-1 text-center text-xs tracking-wider transition-all border cursor-pointer ${
                            selectedSize === sz
                              ? "border-[#1c1c19] bg-[#1c1c19] text-white font-medium"
                              : "border-[#c3c8c2] bg-white text-[#1c1c19] hover:border-[#1c1c19]"
                          }`}
                        >
                          {sz}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Proportion Specs Accordion */}
                  <div className="bg-[#f0ede9] p-4 text-xs space-y-2 border border-[#c3c8c2]/30">
                    <span className="text-[10px] uppercase tracking-wider text-[#755a21] font-semibold block mb-1">
                      Proportion Diagnostics
                    </span>
                    <div className="flex justify-between text-[#434844]">
                      <span>Chest Width</span>
                      <span className="font-medium text-[#1c1c19]">
                        {selectedSize.includes("38") ? '38.5"' : selectedSize.includes("40") ? '40.5"' : selectedSize.includes("42") ? '42.5"' : '44.5"'}
                      </span>
                    </div>
                    <div className="flex justify-between text-[#434844]">
                      <span>Garment Length</span>
                      <span className="font-medium text-[#1c1c19]">42.0"</span>
                    </div>
                    <div className="flex justify-between text-[#434844]">
                      <span>Shoulder Span</span>
                      <span className="font-medium text-[#1c1c19]">18.2"</span>
                    </div>
                    <div className="flex justify-between text-[#434844]">
                      <span>Sleeve Length</span>
                      <span className="font-medium text-[#1c1c19]">25.5"</span>
                    </div>
                  </div>
                </div>

                {/* Add to Bag CTA */}
                <div className="pt-4 border-t border-[#c3c8c2]/30 space-y-2">
                  <button
                    type="button"
                    onClick={() => {
                      if (onQuickAdd) {
                        onQuickAdd("Obsidian Embroidered Panjabi");
                      }
                      setIsModalOpen(false);
                    }}
                    className="w-full bg-[#1c1c19] text-white py-3.5 uppercase tracking-widest text-xs font-medium hover:bg-[#755a21] transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Order In Selected Size ({selectedSize.split(" ")[0]})</span>
                  </button>
                  <p className="text-[11px] text-center text-[#737873]">
                    Complimentary bespoke atelier sizing adjustments in Dhaka.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
