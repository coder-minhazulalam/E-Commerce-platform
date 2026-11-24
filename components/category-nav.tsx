"use client";

import React from "react";

const CATEGORIES = [
  { id: "all", label: "ALL PIECES" },
  { id: "panjabi", label: "PANJABI" },
  { id: "shirts", label: "SHIRTS" },
  { id: "pants", label: "PANTS" },
  { id: "saree", label: "SAREE" },
  { id: "three-piece", label: "THREE-PIECE" },
  { id: "lehenga", label: "LEHENGA" },
  { id: "suits", label: "SUITS & BLAZERS" },
  { id: "kids", label: "THE LITTLE EDIT (KIDS)" },
];

interface CategoryNavProps {
  activeCategory: string;
  onSelectCategory: (cat: string) => void;
}

export function CategoryNav({ activeCategory, onSelectCategory }: CategoryNavProps) {
  return (
    <section id="category-nav" className="w-full bg-[#f6f3ee] py-6 border-y border-[#c3c8c2]/30">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <span className="text-[11px] uppercase text-[#434844] tracking-[0.16em] font-medium">
          SHOP THE COLLECTION
        </span>
        <nav aria-label="Category Navigation" className="flex flex-wrap items-center gap-x-6 sm:gap-x-8 gap-y-3">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => onSelectCategory(cat.id)}
                className={`cat-nav-item text-xs uppercase tracking-wider cursor-pointer font-medium transition-colors ${
                  isActive ? "active text-[#1c1c19] font-semibold" : "text-[#434844] hover:text-[#1c1c19]"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </nav>
      </div>
    </section>
  );
}
