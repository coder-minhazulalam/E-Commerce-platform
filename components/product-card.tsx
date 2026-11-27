"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag, Eye } from "lucide-react";
import { type OotfyProduct, formatPriceBDT } from "../lib/products";

interface ProductCardProps {
  product: OotfyProduct;
  onQuickAdd?: (product: OotfyProduct) => void;
  onToggleWishlist?: (product: OotfyProduct) => void;
  isWishlisted?: boolean;
  showPrice?: boolean;
}

// 100% Clothing-Only / Garment-Only photographic mapping (NO human models/people, NO brand watermarks)
export const PRODUCT_IMAGE_MAP: Record<string, string> = {
  "OOT-PAN-001": "https://lh3.googleusercontent.com/aida-public/AB6AXuAx8vW0kFmfEnUl9PaTDPEbJNorq41yiqZjWR-glADPlcJJbHgsY-xm40du1UXIWNvrkB95PgVSEPU1Oa7hwYSTAjCwE3IITd29a7kpehW8hKoxsCATTq0tQz1B17Cj22aPJhZJVQQu2xDTCedNjxv9LzkR7H7Fq1gl5Opt9rX5meYURqxkO7Z21C-GvxdB3Ier8f_fCahkL85k_aM2vzmQIUJ1iN9S9f_SVXVy9-w=s0",
  "OOT-PAN-005": "/assets/eid/eid-espresso-panjabi.jpg",
  "OOT-PAN-011": "https://lh3.googleusercontent.com/aida-public/AB6AXuCua08J3bqXRcnBLFIc44WM9WsVxOnAAg28SNwXK4lp6Ce0iAzpBJYKlB7PIHzIBPij1H_rbO4ZEMXqJ8BscO9KLIMx_GolCSnVirGq7Nu1Nev-pFgZ8jqJiHh-xYqoYA-Mct08q996xytLK4N8VVD_Lo5vx3rOcyNfnORRk_kXsbUlU2pjvXSuNfmwA0vTrIHAlimLRf6G5s8GR-8y42MNb5_gM79OdXVD_ljpLTY=s0",
  "OOT-PAN-014": "/assets/tryon/tryon-avatar-mannequin.jpg",
  "OOT-PAN-019": "https://images.unsplash.com/photo-1598966739654-5e9a252d8c32?q=80&w=1000&auto=format&fit=crop",
  "OOT-PAN-025": "https://lh3.googleusercontent.com/aida-public/AB6AXuAlHxT9a54dLcyokiwx7H_bzlRZyUPfxuO-b1pZ4NW1rc8f-PiooIwIfcW8aNnLVWxNQp1GNxzynr9XfDXZapZ6QwKy2oaaxp5c6qsKoQZtGg1SR8wGv0MGNkwlQxIV9nplGd11SyLjykbZnpyh091diOfdjb6DO9-KU9gJT84zZ9gy6-OQ0V8f8g0IhesvVkOWoLIg7D1-UHz_uIn922tCC0eLYqg4dDHAOSBNQD0=s0",
  "OOT-PAN-030": "https://images.unsplash.com/photo-1626947346165-4c2288dadc2a?q=80&w=1000&auto=format&fit=crop",
  "OOT-PAN-039": "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1000&auto=format&fit=crop",
  "OOT-PAN-040": "/assets/hero/hero-banner-master.jpg",
  "OOT-SAR-002": "/assets/products/jamdani-saree-clean.jpg",
  "OOT-SAR-006": "/assets/eid/eid-folded-silks.jpg",
  "OOT-SAR-009": "https://lh3.googleusercontent.com/aida-public/AB6AXuD72gHZPVdMYtTmQBh2rwGAqVYBd-FgoGz0dmgQHhcVEfIc9Nt6DlFfmsUfWT6f-Q4sMRQNfOMbR8t3UBXYMW_aTya2qZp5xguRuH2hKusKiFszoRa82gpOT0zncf0pha9zkReM-mHEYhVR2HalCLz8tZ8V3QRKTAiAysFcDD0uL2bXZ3zsthEOZpDhiVlqxNajrkDhMDzY-6ESss1qZHVDDZvaHvvom17XkVrMob4=s0",
  "OOT-SAR-021": "https://lh3.googleusercontent.com/aida-public/AB6AXuBeQcivkgTtkfnKeO-ByW7wpzBO4JIOtGHPjj2SYlb8EIcaZ59Z3TRu88zjZ2TXH_31oUeBCa2_QM6tQDjdAI3LlyoNXoqpyA_ySh8kACVIYY5fHPgDQGd92NeDL9sM5-ZRQ2XUvwAjUHAdXsVqqd5ncYIbfujibuehHISlhUQueAkZ_tRKmPQoRDtebrNIiLHuJTs3lrijLnnZ4aJUmADlUq6bCLYDaQSHFjmkHyM=s0",
  "OOT-SAR-026": "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=1000&auto=format&fit=crop",
  "OOT-SAR-031": "/assets/eid/nocturne-garment-clean.jpg",
  "OOT-SAR-034": "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=1000&auto=format&fit=crop",
  "OOT-SAR-038": "https://images.unsplash.com/photo-1609357605129-26f69add5d6e?q=80&w=1000&auto=format&fit=crop",
  "OOT-BLZ-003": "https://lh3.googleusercontent.com/aida-public/AB6AXuCoFHKrK_pzA3MAoy-T41foeGmDQxJ0Wzcvk68JSpVpPJUty7qH4nx0IJNuFFjnKMHMiMIAj2Tr2EEv1p_AlVi5BQdKmUq2X_s_MA93FcfeqLhoiAuLsTu4NZypKr3W3iSvlftVfCEVpAV3JilELtV5jpN7qPlAHKbYJbXV9tsTf8AEvJyeIilVwSj3dV5Sf-rmKRzrYePi7PCtsrj2-xIHmGw4MF3WILCYvms8xyM=s0",
  "OOT-SUT-010": "https://lh3.googleusercontent.com/aida-public/AB6AXuAqyrJTi9nfT1P_Di0ZavWYRlZQKt4gQQ9uVi337kVqznaHvZNLLji3PwQBM6Ksjf5RGTEhTAx_OuGb3sRSO69ilPKqmizPOEyWbJjJAXtRLAU3w2zcshQ0DJU_EpFYRhr0yjxPEN_wm1Pv8GO4h3AWa_OxeG-ibCX5lqnhHWmq6hCEPbbh9UFmxReEYx_SmqPjSjEOR6OU3pmzbsT7pvPWLIk9wS-nwSNfj8Pekyw=s0",
  "OOT-BLZ-023": "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=1000&auto=format&fit=crop",
  "OOT-BLZ-036": "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1000&auto=format&fit=crop",
  "OOT-BLZ-042": "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1000&auto=format&fit=crop",
  "OOT-TRP-004": "https://lh3.googleusercontent.com/aida-public/AB6AXuBaHEhrOg3rqjVYFyAaT_FhKLFkCkrCMOZOGzHAgOQabQL6MjrKy9tH16rH4EI7wi6b2dORwohONtNL_fOwNRd25jXY5bHVv2cYlP_PQA3_v573jK1EuaEWCvAFmgFPT0nM-S3OH4CF8Q3PKAq0x0X2BkKhlC-n2e1OkeUnn3NXr4ik6CnPtcsIe5JVCorVtqXe70WtHKYZouQx1Wpc8sxj702NGJNsORjJ9LEaDPY=s0",
  "OOT-KUR-017": "https://lh3.googleusercontent.com/aida-public/AB6AXuAYAFI_PmmauTCrm73TRCjj9Gevg-iIOPNnIMA2vXYOHYf5jALiTM7imQ9s_EH-7ht0ryf1qGxIMrIlApFTt66mJiK_hRskBhuya8Qth9QaLsb6RUIs9tADGdHqVSU1EODql9mLkxW7hSiE_Q92yyE_Gn7SPqLbbEJKY__D3IzzQDLnS0Z2e5S79HhdWI__isNQlL9jW9bAmBCiTdraouLZKeeE6AgSVWXojJf6ZIQ=s0",
  "OOT-SLW-018": "https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?q=80&w=1000&auto=format&fit=crop",
  "OOT-TRP-024": "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=1000&auto=format&fit=crop",
  "OOT-TRP-032": "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=1000&auto=format&fit=crop",
  "OOT-KUR-033": "https://images.unsplash.com/photo-1592878904946-b3cd8ae243d0?q=80&w=1000&auto=format&fit=crop",
  "OOT-LHN-013": "https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=1000&auto=format&fit=crop",
  "OOT-LHN-029": "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=1000&auto=format&fit=crop",
  "OOT-LHN-037": "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=1000&auto=format&fit=crop",
  "OOT-SHT-007": "https://lh3.googleusercontent.com/aida-public/AB6AXuDkho7GRGanucC5LObsfZbrhRkfflXmrqZSVX2dIQIYYJHZl9Z_6i1wxWSWhg7WScfqasuirL_gfLs9XIlwZH2zioeEupmoY0duuxc8-5tuH8bEFZ3GELo8eDEOwGN70kGd8dgyds3Fly1YMVLEtYuR2r6ldcQeRaF4GOMN48hmphElDZQFQFoCGe7loxlLMmLkgHNYvZ0UxznsjWhAhORHKCPb7-o_-av2YZTPdGs=s0",
  "OOT-SHT-012": "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=1000&auto=format&fit=crop",
  "OOT-SHT-022": "https://images.unsplash.com/photo-1578932750294-f5075e85f44a?q=80&w=1000&auto=format&fit=crop",
  "OOT-SHT-028": "https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?q=80&w=1000&auto=format&fit=crop",
  "OOT-SHT-041": "https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?q=80&w=1000&auto=format&fit=crop",
  "OOT-SHT-044": "https://images.unsplash.com/photo-1584030373081-f37b7bb4fa8e?q=80&w=1000&auto=format&fit=crop",
  "OOT-PNT-008": "https://lh3.googleusercontent.com/aida-public/AB6AXuD_sl1s-rT1jL4gihSPUtemgnbulNFdRvXMSwQACnkPPgXP64mG6K6Hvb2_WwmH-dOYsBO2eR5FwRvlS9KlfAryHZgQLgD4V2e8jKTAEbo0H_HJXcmMYyXM0RKi7hRK6_q-tcEjHyKBqCyGNa9XA9sWmHJKM3CYyuwhN_NeEXmdtdx52UrQHj-KoTp4IZpaFMLu-Mw_AmMu9YBegBW1hj-19vlPIWlrgOqtUjbFAxY=s0",
  "OOT-PNT-020": "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?q=80&w=1000&auto=format&fit=crop",
  "OOT-PNT-027": "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=1000&auto=format&fit=crop",
  "OOT-PNT-035": "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1000&auto=format&fit=crop",
  "OOT-PNT-043": "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=1000&auto=format&fit=crop",
  "OOT-KID-015": "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=1000&auto=format&fit=crop",
  "OOT-KID-016": "https://images.unsplash.com/photo-1603252109303-2751441dd157?q=80&w=1000&auto=format&fit=crop",
  "OOT-KID-045": "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?q=80&w=1000&auto=format&fit=crop",
  "OOT-KID-046": "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=1000&auto=format&fit=crop",
  "OOT-KID-047": "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?q=80&w=1000&auto=format&fit=crop",
  "OOT-KID-048": "https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?q=80&w=1000&auto=format&fit=crop",
  "OOT-KID-049": "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?q=80&w=1000&auto=format&fit=crop",
  "OOT-KID-050": "https://images.unsplash.com/photo-1514090458221-65bb69cf63e6?q=80&w=1000&auto=format&fit=crop"
};;

export function ProductCard({
  product,
  onQuickAdd,
  onToggleWishlist,
  isWishlisted = false,
  showPrice = false,
}: ProductCardProps) {
  const [popping, setPopping] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [currentImgSrc, setCurrentImgSrc] = useState(
    PRODUCT_IMAGE_MAP[product.id] ||
    product.images?.hero_flatlay ||
    PRODUCT_IMAGE_MAP["OOT-PAN-001"]
  );

  React.useEffect(() => {
    setCurrentImgSrc(
      PRODUCT_IMAGE_MAP[product.id] ||
      product.images?.hero_flatlay ||
      PRODUCT_IMAGE_MAP["OOT-PAN-001"]
    );
  }, [product.id, product.images]);

  const handleHeartClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setPopping(true);
    setTimeout(() => setPopping(false), 400);
    onToggleWishlist?.(product);
  };

  return (
    <article className="group flex flex-col relative select-none">
      {/* Media Box - Structured 3:4 quiet luxury aspect ratio, Garment Only */}
      <div className="relative w-full aspect-[3/4] bg-[#f6f3ee] overflow-hidden mb-3.5 cursor-pointer rounded-none border border-transparent group-hover:border-[#c3c8c2]/50 transition-all duration-300">
        {/* Placeholder skeleton while loading */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-[#ebe8e3] animate-pulse" />
        )}

        <Link href={`/products/${product.id}`} className="absolute inset-0 z-0">
          <Image
            src={currentImgSrc}
            alt={product.name}
            fill
            unoptimized
            onLoad={() => setImageLoaded(true)}
            onError={() => {
              setCurrentImgSrc(PRODUCT_IMAGE_MAP["OOT-PAN-001"]);
              setImageLoaded(true);
            }}
            className={`object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        </Link>

        {/* Badge */}
        {product.badge && (
          <span
            className={`absolute top-3 left-3 px-2.5 py-1 text-[10px] uppercase font-semibold tracking-widest z-10 pointer-events-none ${
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

        {/* Wishlist Button with Lucide Heart */}
        <button
          type="button"
          aria-label={`Save ${product.name} to wishlist`}
          onClick={handleHeartClick}
          className={`wishlist-btn absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-sm shadow-sm transition-all duration-200 hover:scale-110 cursor-pointer z-20 ${
            popping ? "heart-pop" : ""
          } ${
            isWishlisted
              ? "bg-[#fcf9f4] text-[#755a21]"
              : "bg-[#fcf9f4]/90 text-[#434844] hover:text-[#1c1c19]"
          }`}
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              isWishlisted
                ? "fill-[#755a21] text-[#755a21]"
                : "text-[#434844] hover:text-[#1c1c19]"
            }`}
          />
        </button>

        {/* Hover Action Drawer: View Details on hover & Quick Add */}
        <div className="absolute inset-x-0 bottom-0 p-2.5 sm:p-3 bg-gradient-to-t from-black/70 via-black/30 to-transparent translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 flex items-center gap-2 justify-center z-20">
          <Link
            href={`/products/${product.id}`}
            className="flex-1 bg-[#fcf9f4]/95 hover:bg-[#fcf9f4] text-[#1c1c19] text-[11px] uppercase tracking-wider py-2.5 px-3 flex items-center justify-center gap-1.5 backdrop-blur-sm shadow transition-colors active:scale-95 font-medium cursor-pointer text-center"
          >
            <Eye className="w-3.5 h-3.5 text-[#243329]" />
            <span>View Details</span>
          </Link>
          <button
            type="button"
            aria-label={`Quick add ${product.name} to bag`}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onQuickAdd?.(product);
            }}
            className="w-10 h-10 bg-[#243329] hover:bg-[#1a261e] text-white flex items-center justify-center backdrop-blur-sm shadow transition-colors active:scale-95 cursor-pointer flex-shrink-0"
            title="Quick Add to Bag"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Meta Information */}
      <div className="flex flex-col">
        <Link href={`/products/${product.id}`} className="group-hover:text-[#755a21] transition-colors">
          <h3 className="font-serif text-lg sm:text-xl text-[#1c1c19] group-hover:text-[#755a21] transition-colors leading-snug">
            {product.name}
          </h3>
        </Link>
        {showPrice && (
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
        )}
        {product.subtitle_or_tagline && (
          <p className="text-[11px] text-[#434844] mt-0.5 tracking-wide line-clamp-1">
            {product.subtitle_or_tagline}
          </p>
        )}
      </div>
    </article>
  );
}
