"use client";

import React, { useState } from "react";
import Image from "next/image";
import { type OotfyProduct, formatPriceBDT } from "../lib/products";

interface ProductCardProps {
  product: OotfyProduct;
  onQuickAdd?: (product: OotfyProduct) => void;
  onToggleWishlist?: (product: OotfyProduct) => void;
  isWishlisted?: boolean;
}

export function ProductCard({
  product,
  onQuickAdd,
  onToggleWishlist,
  isWishlisted = false,
}: ProductCardProps) {
  const [popping, setPopping] = useState(false);

  // Fallback photography mapping from code.html if asset URL is relative
  const imageMap: Record<string, string> = {
    "OOT-PAN-001":
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAx8vW0kFmfEnUl9PaTDPEbJNorq41yiqZjWR-glADPlcJJbHgsY-xm40du1UXIWNvrkB95PgVSEPU1Oa7hwYSTAjCwE3IITd29a7kpehW8hKoxsCATTq0tQz1B17Cj22aPJhZJVQQu2xDTCedNjxv9LzkR7H7Fq1gl5Opt9rX5meYURqxkO7Z21C-GvxdB3Ier8f_fCahkL85k_aM2vzmQIUJ1iN9S9f_SVXVy9-w",
    "OOT-SAR-002":
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDEcTHm37Xg86Anzf2GNEAFWn4Hs4qXAIJtPxTTP44m3EcM6EpESpbZoItlKNYcn534Rh3SXUW4lzlaDXalX8uaeenot8wT2qUBlnppIZcd4MFhTY5RQFnbi_O79xDcgSVkoZhmyGabQ_SpdKNN76IjNFcWfGnfcGRgf8lWdrZExB5JFpsZeZroABpDpSP0Jr0xi4xJg4mY_y6hU410xGroXzb84HQOdgNc4wTVrXE",
    "OOT-BLZ-003":
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCoFHKrK_pzA3MAoy-T41foeGmDQxJ0Wzcvk68JSpVpPJUty7qH4nx0IJNuFFjnKMHMiMIAj2Tr2EEv1p_AlVi5BQdKmUq2X_s_MA93FcfeqLhoiAuLsTu4NZypKr3W3iSvlftVfCEVpAV3JilELtV5jpN7qPlAHKbYJbXV9tsTf8AEvJyeIilVwSj3dV5Sf-rmKRzrYePi7PCtsrj2-xIHmGw4MF3WILCYvms8xyM",
    "OOT-TRP-004":
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBaHEhrOg3rqjVYFyAaT_FhKLFkCkrCMOZOGzHAgOQabQL6MjrKy9tH16rH4EI7wi6b2dORwohONtNL_fOwNRd25jXY5bHVv2cYlP_PQA3_v573jK1EuaEWCvAFmgFPT0nM-S3OH4CF8Q3PKAq0x0X2BkKhlC-n2e1OkeUnn3NXr4ik6CnPtcsIe5JVCorVtqXe70WtHKYZouQx1Wpc8sxj702NGJNsORjJ9LEaDPY",
    "OOT-PAN-005":
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAlHxT9a54dLcyokiwx7H_bzlRZyUPfxuO-b1pZ4NW1rc8f-PiooIwIfcW8aNnLVWxNQp1GNxzynr9XfDXZapZ6QwKy2oaaxp5c6qsKoQZtGg1SR8wGv0MGNkwlQxIV9nplGd11SyLjykbZnpyh091diOfdjb6DO9-KU9gJT84zZ9gy6-OQ0V8f8g0IhesvVkOWoLIg7D1-UHz_uIn922tCC0eLYqg4dDHAOSBNQD0",
    "OOT-SHT-007":
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDkho7GRGanucC5LObsfZbrhRkfflXmrqZSVX2dIQIYYJHZl9Z_6i1wxWSWhg7WScfqasuirL_gfLs9XIlwZH2zioeEupmoY0duuxc8-5tuH8bEFZ3GELo8eDEOwGN70kGd8dgyds3Fly1YMVLEtYuR2r6ldcQeRaF4GOMN48hmphElDZQFQFoCGe7loxlLMmLkgHNYvZ0UxznsjWhAhORHKCPb7-o_-av2YZTPdGs",
    "OOT-PNT-008":
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD_sl1s-rT1jL4gihSPUtemgnbulNFdRvXMSwQACnkPPgXP64mG6K6Hvb2_WwmH-dOYsBO2eR5FwRvlS9KlfAryHZgQLgD4V2e8jKTAEbo0H_HJXcmMYyXM0RKi7hRK6_q-tcEjHyKBqCyGNa9XA9sWmHJKM3CYyuwhN_NeEXmdtdx52UrQHj-KoTp4IZpaFMLu-Mw_AmMu9YBegBW1hj-19vlPIWlrgOqtUjbFAxY",
    "OOT-SAR-009":
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD72gHZPVdMYtTmQBh2rwGAqVYBd-FgoGz0dmgQHhcVEfIc9Nt6DlFfmsUfWT6f-Q4sMRQNfOMbR8t3UBXYMW_aTya2qZp5xguRuH2hKusKiFszoRa82gpOT0zncf0pha9zkReM-mHEYhVR2HalCLz8tZ8V3QRKTAiAysFcDD0uL2bXZ3zsthEOZpDhiVlqxNajrkDhMDzY-6ESss1qZHVDDZvaHvvom17XkVrMob4",
    "OOT-SUT-010":
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAqyrJTi9nfT1P_Di0ZavWYRlZQKt4gQQ9uVi337kVqznaHvZNLLji3PwQBM6Ksjf5RGTEhTAx_OuGb3sRSO69ilPKqmizPOEyWbJjJAXtRLAU3w2zcshQ0DJU_EpFYRhr0yjxPEN_wm1Pv8GO4h3AWa_OxeG-ibCX5lqnhHWmq6hCEPbbh9UFmxReEYx_SmqPjSjEOR6OU3pmzbsT7pvPWLIk9wS-nwSNfj8Pekyw",
    "OOT-PAN-014":
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCeQSxquca6_eFBohygNnrAoIapcJGaMfofzrEmDPRb3zPxuW9P6IovnVCXVC5z97rXztB6lESH8fQskzP2GO-RoueMsra5Si2rvJLw9qERDxJeypiZOeael6njgxExI-CBy0Vk3OblYdhwjtsU0x1ZxXYWaOKPW_h7-ZXRkSHU3Adwh4yMX-KwEL-7ejUOI7ujkBBEhIcAb94wfinTAHs0TGf1Mo5vJsuSEDUEYgw",
  };

  const imgSrc =
    imageMap[product.id] ||
    product.images?.hero_flatlay ||
    imageMap["OOT-PAN-001"];

  const handleHeartClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPopping(true);
    setTimeout(() => setPopping(false), 400);
    onToggleWishlist?.(product);
  };

  return (
    <article className="group flex flex-col relative select-none">
      {/* Media Box */}
      <div className="relative w-full aspect-[3/4] bg-[#f6f3ee] overflow-hidden mb-3 cursor-pointer">
        <Image
          src={imgSrc}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />

        {/* Badge */}
        {product.badge && (
          <span
            className={`absolute top-3 left-3 px-2.5 py-1 text-[10px] uppercase font-semibold tracking-widest ${
              product.badge === "LIMITED"
                ? "bg-[#243329] text-white"
                : product.badge === "EXCLUSIVE"
                ? "bg-[#755a21] text-white"
                : "bg-[#fcf9f4]/95 text-[#1c1c19] backdrop-blur-sm shadow-sm"
            }`}
          >
            {product.badge}
          </span>
        )}

        {/* Wishlist Button */}
        <button
          type="button"
          aria-label={`Save ${product.name} to wishlist`}
          onClick={handleHeartClick}
          className={`wishlist-btn absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-sm shadow-sm transition-all duration-200 hover:scale-110 cursor-pointer ${
            popping ? "heart-pop" : ""
          } ${
            isWishlisted
              ? "bg-[#fcf9f4] text-[#755a21]"
              : "bg-[#fcf9f4]/90 text-[#434844] hover:text-[#1c1c19]"
          }`}
        >
          <span
            className="material-symbols-outlined text-[18px]"
            style={{
              fontVariationSettings: isWishlisted ? "'FILL' 1" : "'FILL' 0",
              color: isWishlisted ? "#755a21" : undefined,
            }}
          >
            favorite
          </span>
        </button>

        {/* Quick Add To Bag Hover Drawer */}
        <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/60 via-black/20 to-transparent translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onQuickAdd?.(product);
            }}
            className="w-full bg-[#fcf9f4]/95 hover:bg-[#fcf9f4] text-[#1c1c19] text-[11px] uppercase tracking-wider py-2.5 px-3 flex items-center justify-center gap-1.5 backdrop-blur-sm shadow transition-colors active:scale-95 font-medium cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">add_shopping_bag</span>
            <span>Quick Add</span>
          </button>
        </div>
      </div>

      {/* Meta Information */}
      <div className="flex flex-col">
        <h3 className="font-serif text-lg sm:text-xl text-[#1c1c19] group-hover:text-[#755a21] transition-colors cursor-pointer leading-snug">
          {product.name}
        </h3>
        <div className="flex items-center gap-2 mt-1">
          <p className="text-sm font-medium text-[#1c1c19]">
            {formatPriceBDT(product.price_bdt)}
          </p>
          {product.original_price_bdt && (
            <p className="text-xs text-[#737873] line-through">
              {formatPriceBDT(product.original_price_bdt)}
            </p>
          )}
        </div>
        {product.subtitle_or_tagline && (
          <p className="text-[11px] text-[#434844] mt-0.5 tracking-wide line-clamp-1">
            {product.subtitle_or_tagline}
          </p>
        )}
      </div>
    </article>
  );
}
