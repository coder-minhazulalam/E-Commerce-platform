"use client";

import React from "react";

export function BrandPhilosophySection() {
  return (
    <section className="w-full bg-[#f6f3ee] py-16 lg:py-24 border-y border-[#c3c8c2]/30">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 text-center flex flex-col items-center gap-6">
        <span className="text-[11px] uppercase text-[#755a21] tracking-[0.2em] font-medium">
          Philosophy
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1c1c19] uppercase tracking-tight">
          OOTFY — DRESSED DIFFERENT
        </h2>
        <p className="text-base sm:text-lg text-[#434844] max-w-2xl leading-relaxed font-normal">
          Rooted in Bangladeshi handloom heritage, tailored with architectural restraint. Every piece is crafted in small batches with heirloom Dhaka muslin, Rajshahi silks, and European flax linen for enduring elegance.
        </p>
      </div>
    </section>
  );
}
