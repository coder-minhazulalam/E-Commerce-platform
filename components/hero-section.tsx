"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export function HeroSection() {
  return (
    <section className="w-full bg-[#fcf9f4] overflow-hidden pt-28 pb-16 lg:pt-32 lg:pb-24">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Editorial Copy */}
          <div className="lg:col-span-5 flex flex-col items-start gap-6 lg:gap-8 py-4">
            <span className="text-[11px] uppercase text-[#755a21] tracking-[0.2em] font-medium animate-hero-1 inline-flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#755a21] inline-block"></span>
              Atelier Dispatch 01
            </span>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#1c1c19] uppercase animate-hero-2 leading-[1.05] tracking-tight">
              WOVEN BY HAND, TAILORED FOR TIME
            </h1>

            <p className="text-base sm:text-lg text-[#434844] max-w-md animate-hero-3 font-normal leading-relaxed">
              Tradition, refined for today. Handloom Jamdani, pure Rajshahi silks, and sculptural Bangladeshi silhouettes.
            </p>

            <div className="pt-2 animate-hero-4">
              <a
                href="#new-arrivals"
                className="group inline-flex items-center justify-center gap-3 bg-[#243329] text-white text-xs uppercase tracking-widest px-8 py-4 hover:bg-[#3a4a3f] transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 shadow-sm font-medium cursor-pointer"
              >
                <span>Shop Collection</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </div>
          </div>

          {/* Right Featured Imagery */}
          <div className="lg:col-span-7">
            <div className="w-full aspect-[4/5] bg-[#f6f3ee] overflow-hidden relative group cursor-pointer shadow-sm">
              <Image
                src="/assets/hero/hero-panjabi-craft.jpg"
                alt="Luxury Ivory Embroidered Panjabi"
                fill
                priority
                unoptimized
                className="object-cover object-top transition-transform duration-1000 ease-out group-hover:scale-[1.03]"
                sizes="(max-width: 1024px) 100vw, 58vw"
              />
              <div className="absolute bottom-6 left-6 bg-[#fcf9f4]/90 backdrop-blur-md px-4 py-2 border border-[#c3c8c2]/40 flex items-center gap-3 shadow-sm transition-all duration-300 group-hover:bg-[#fcf9f4]">
                <span className="text-[11px] uppercase tracking-wider text-[#1c1c19] font-medium">
                  01 / Handloom &amp; Craft
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#755a21]"></span>
                <span className="text-[10px] uppercase text-[#434844] font-medium">
                  Bespoke Fit
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
