"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Sparkles, RotateCcw, Eye } from "lucide-react";

interface VirtualTryonTeaserProps {
  onLaunchModal?: () => void;
}

export function VirtualTryonTeaser({ onLaunchModal }: VirtualTryonTeaserProps) {
  const [angle, setAngle] = useState<"front" | "perspective" | "back">("front");

  const angleConfig = {
    front: {
      label: "Preview: Front 0°",
      transform: "scale(1) rotate(0deg)",
    },
    perspective: {
      label: "Preview: Perspective ¾ 45°",
      transform: "scale(1.04) rotate(1.2deg)",
    },
    back: {
      label: "Preview: Back Profile 180°",
      transform: "scale(1.02) rotate(-1.5deg)",
    },
  };

  return (
    <section className="w-full bg-[#243329] text-white py-16 lg:py-24">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Text */}
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

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={onLaunchModal}
                className="tryon-pulse inline-flex items-center justify-center gap-2 bg-[#fcf9f4] text-[#1c1c19] text-xs uppercase tracking-widest px-8 py-4 hover:bg-[#f6f3ee] transition-all group cursor-pointer font-medium shadow-sm"
              >
                <span>Launch Virtual Try-On</span>
                <Sparkles className="w-4 h-4 text-[#755a21] transition-transform duration-300 group-hover:scale-110" />
              </button>
            </div>
          </div>

          {/* Right Interactive Avatar Box */}
          <div className="lg:col-span-6">
            <div className="w-full aspect-[4/5] bg-[#3a4a3f] overflow-hidden relative shadow-2xl group select-none">
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCeQSxquca6_eFBohygNnrAoIapcJGaMfofzrEmDPRb3zPxuW9P6IovnVCXVC5z97rXztB6lESH8fQskzP2GO-RoueMsra5Si2rvJLw9qERDxJeypiZOeael6njgxExI-CBy0Vk3OblYdhwjtsU0x1ZxXYWaOKPW_h7-ZXRkSHU3Adwh4yMX-KwEL-7ejUOI7ujkBBEhIcAb94wfinTAHs0TGf1Mo5vJsuSEDUEYgw"
                alt="Virtual Try-On Black Panjabi Preview"
                fill
                unoptimized
                className="object-cover object-top transition-transform duration-500 ease-out"
                style={{ transform: angleConfig[angle].transform }}
                sizes="(max-width: 1024px) 100vw, 50vw"
              />

              {/* View Angle Pill */}
              <div className="absolute top-6 right-6 bg-[#fcf9f4]/95 text-[#1c1c19] px-3 py-1.5 text-[10px] uppercase tracking-wider backdrop-blur-sm shadow-sm font-semibold">
                {angleConfig[angle].label}
              </div>

              {/* Angle Switcher Controls */}
              <div className="absolute bottom-6 inset-x-6 flex items-center justify-between pointer-events-auto">
                <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-md p-1.5 rounded-full border border-white/10">
                  <button
                    type="button"
                    onClick={() => setAngle("front")}
                    className={`px-3 py-1 rounded-full text-[10px] uppercase tracking-wider transition-all cursor-pointer font-medium ${
                      angle === "front"
                        ? "bg-white text-black font-semibold shadow-sm"
                        : "text-white/80 hover:text-white"
                    }`}
                  >
                    Front
                  </button>
                  <button
                    type="button"
                    onClick={() => setAngle("perspective")}
                    className={`px-3 py-1 rounded-full text-[10px] uppercase tracking-wider transition-all cursor-pointer font-medium ${
                      angle === "perspective"
                        ? "bg-white text-black font-semibold shadow-sm"
                        : "text-white/80 hover:text-white"
                    }`}
                  >
                    ¾ View
                  </button>
                  <button
                    type="button"
                    onClick={() => setAngle("back")}
                    className={`px-3 py-1 rounded-full text-[10px] uppercase tracking-wider transition-all cursor-pointer font-medium ${
                      angle === "back"
                        ? "bg-white text-black font-semibold shadow-sm"
                        : "text-white/80 hover:text-white"
                    }`}
                  >
                    Back
                  </button>
                </div>

                <span className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-white/90 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 font-medium">
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>3D Rotate</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
