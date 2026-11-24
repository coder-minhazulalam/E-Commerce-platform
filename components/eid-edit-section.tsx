"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export function EidEditSection() {
  return (
    <section className="w-full bg-[#f6f3ee] py-16 lg:py-24 border-y border-[#c3c8c2]/30">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-8 lg:mb-12">
          <div className="lg:col-span-7">
            <span className="text-[11px] uppercase text-[#755a21] block mb-1 tracking-widest font-medium">
              Seasonal Capsule
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1c1c19] uppercase tracking-tight">
              THE EID EDIT
            </h2>
          </div>
          <div className="lg:col-span-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <p className="text-base text-[#434844] font-normal">
              Crafted for celebrations. Designed for today.
            </p>
            <a
              href="#category-nav"
              className="group text-xs uppercase tracking-widest text-[#1c1c19] hover:text-[#755a21] transition-colors whitespace-nowrap inline-flex items-center gap-2 font-medium"
            >
              <span>Explore Edit</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>
        </div>

        {/* Asymmetric 3-Image Editorial Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          {/* Main Large Vertical Visual */}
          <div className="lg:col-span-7">
            <div className="w-full aspect-[4/5] bg-[#f0ede9] overflow-hidden relative group cursor-pointer shadow-sm">
              <Image
                src="/assets/eid/eid-espresso-panjabi.jpg"
                alt="The Eid Edit Featured Panjabi"
                fill
                unoptimized
                priority
                className="object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 58vw"
              />
              <div className="absolute bottom-6 left-6 bg-[#fcf9f4]/90 backdrop-blur-sm px-4 py-2 border border-[#c3c8c2]/30 transition-all duration-300 group-hover:bg-[#fcf9f4]">
                <span className="text-[11px] uppercase tracking-wider text-[#1c1c19] font-medium">
                  Zardozi &amp; Silk · Midnight Espresso
                </span>
              </div>
            </div>
          </div>

          {/* Stacked Secondary Details */}
          <div className="lg:col-span-5 flex flex-col gap-6 lg:gap-8">
            <div className="w-full aspect-[4/3] bg-[#f0ede9] overflow-hidden relative group cursor-pointer shadow-sm">
              <Image
                src="/assets/eid/eid-muslin-detail.jpg"
                alt="Eid Edit Embroidery Detail"
                fill
                unoptimized
                className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 42vw"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors pointer-events-none" />
              <div className="absolute bottom-4 left-4 bg-[#fcf9f4]/90 backdrop-blur-sm px-3 py-1 text-[11px] uppercase tracking-wider font-medium">
                Detail: Muslin &amp; Zari Handloom
              </div>
            </div>

            <div className="w-full aspect-[4/3] bg-[#f0ede9] overflow-hidden relative group cursor-pointer shadow-sm">
              <Image
                src="/assets/eid/eid-folded-silks.jpg"
                alt="Eid Edit Folded Silks"
                fill
                unoptimized
                className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 42vw"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors pointer-events-none" />
              <div className="absolute bottom-4 left-4 bg-[#fcf9f4]/90 backdrop-blur-sm px-3 py-1 text-[11px] uppercase tracking-wider font-medium">
                Palette: Earth &amp; Raw Silk
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
