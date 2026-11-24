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
  // 1. Embroidered Ivory Panjabi (Folded flatlay on linen, garment only)
  "OOT-PAN-001":
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAx8vW0kFmfEnUl9PaTDPEbJNorq41yiqZjWR-glADPlcJJbHgsY-xm40du1UXIWNvrkB95PgVSEPU1Oa7hwYSTAjCwE3IITd29a7kpehW8hKoxsCATTq0tQz1B17Cj22aPJhZJVQQu2xDTCedNjxv9LzkR7H7Fq1gl5Opt9rX5meYURqxkO7Z21C-GvxdB3Ier8f_fCahkL85k_aM2vzmQIUJ1iN9S9f_SVXVy9-w=s0",
  // 2. Handloom Jamdani Saree (Muslin & gold zari weave macro, garment only, NO brand watermark)
  "OOT-SAR-002":
    "/assets/products/jamdani-saree-clean.jpg",
  // 3. Tailored Olive Blazer (Hanging on walnut wooden hanger, garment only)
  "OOT-BLZ-003":
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCoFHKrK_pzA3MAoy-T41foeGmDQxJ0Wzcvk68JSpVpPJUty7qH4nx0IJNuFFjnKMHMiMIAj2Tr2EEv1p_AlVi5BQdKmUq2X_s_MA93FcfeqLhoiAuLsTu4NZypKr3W3iSvlftVfCEVpAV3JilELtV5jpN7qPlAHKbYJbXV9tsTf8AEvJyeIilVwSj3dV5Sf-rmKRzrYePi7PCtsrj2-xIHmGw4MF3WILCYvms8xyM=s0",
  // 4. Raw Silk Three-Piece (Studio flatlay ensemble on travertine, garment only)
  "OOT-TRP-004":
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBaHEhrOg3rqjVYFyAaT_FhKLFkCkrCMOZOGzHAgOQabQL6MjrKy9tH16rH4EI7wi6b2dORwohONtNL_fOwNRd25jXY5bHVv2cYlP_PQA3_v573jK1EuaEWCvAFmgFPT0nM-S3OH4CF8Q3PKAq0x0X2BkKhlC-n2e1OkeUnn3NXr4ik6CnPtcsIe5JVCorVtqXe70WtHKYZouQx1Wpc8sxj702NGJNsORjJ9LEaDPY=s0",
  // 5. Zardozi Silk Kurta (Deep espresso silk panjabi on brass stand, garment only)
  "OOT-PAN-005":
    "/assets/eid/eid-espresso-panjabi.jpg",
  // 6. Antique Gold Tissue Saree (Folded raw silks on travertine stone, garment only)
  "OOT-SAR-006":
    "/assets/eid/eid-folded-silks.jpg",
  // 7. Mandarin Cotton Shirt (Hanging on minimal wooden hanger, garment only)
  "OOT-SHT-007":
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDkho7GRGanucC5LObsfZbrhRkfflXmrqZSVX2dIQIYYJHZl9Z_6i1wxWSWhg7WScfqasuirL_gfLs9XIlwZH2zioeEupmoY0duuxc8-5tuH8bEFZ3GELo8eDEOwGN70kGd8dgyds3Fly1YMVLEtYuR2r6ldcQeRaF4GOMN48hmphElDZQFQFoCGe7loxlLMmLkgHNYvZ0UxznsjWhAhORHKCPb7-o_-av2YZTPdGs=s0",
  // 8. Pleated Linen Trousers (Folded flatlay on travertine, garment only)
  "OOT-PNT-008":
    "https://lh3.googleusercontent.com/aida-public/AB6AXuD_sl1s-rT1jL4gihSPUtemgnbulNFdRvXMSwQACnkPPgXP64mG6K6Hvb2_WwmH-dOYsBO2eR5FwRvlS9KlfAryHZgQLgD4V2e8jKTAEbo0H_HJXcmMYyXM0RKi7hRK6_q-tcEjHyKBqCyGNa9XA9sWmHJKM3CYyuwhN_NeEXmdtdx52UrQHj-KoTp4IZpaFMLu-Mw_AmMu9YBegBW1hj-19vlPIWlrgOqtUjbFAxY=s0",
  // 9. Katan Silk Saree (Draped on alabaster pedestal, garment only, NO brand watermark)
  "OOT-SAR-009":
    "https://lh3.googleusercontent.com/aida-public/AB6AXuD72gHZPVdMYtTmQBh2rwGAqVYBd-FgoGz0dmgQHhcVEfIc9Nt6DlFfmsUfWT6f-Q4sMRQNfOMbR8t3UBXYMW_aTya2qZp5xguRuH2hKusKiFszoRa82gpOT0zncf0pha9zkReM-mHEYhVR2HalCLz8tZ8V3QRKTAiAysFcDD0uL2bXZ3zsthEOZpDhiVlqxNajrkDhMDzY-6ESss1qZHVDDZvaHvvom17XkVrMob4=s0",
  // 10. Structured Wool Suit (Hanging on structured hanger, garment only)
  "OOT-SUT-010":
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAqyrJTi9nfT1P_Di0ZavWYRlZQKt4gQQ9uVi337kVqznaHvZNLLji3PwQBM6Ksjf5RGTEhTAx_OuGb3sRSO69ilPKqmizPOEyWbJjJAXtRLAU3w2zcshQ0DJU_EpFYRhr0yjxPEN_wm1Pv8GO4h3AWa_OxeG-ibCX5lqnhHWmq6hCEPbbh9UFmxReEYx_SmqPjSjEOR6OU3pmzbsT7pvPWLIk9wS-nwSNfj8Pekyw=s0",
  // 11. Dhakai Panjabi (Hanging on brass hanger, garment only)
  "OOT-PAN-011":
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCua08J3bqXRcnBLFIc44WM9WsVxOnAAg28SNwXK4lp6Ce0iAzpBJYKlB7PIHzIBPij1H_rbO4ZEMXqJ8BscO9KLIMx_GolCSnVirGq7Nu1Nev-pFgZ8jqJiHh-xYqoYA-Mct08q996xytLK4N8VVD_Lo5vx3rOcyNfnORRk_kXsbUlU2pjvXSuNfmwA0vTrIHAlimLRf6G5s8GR-8y42MNb5_gM79OdXVD_ljpLTY=s0",
  // 12. Linen Overshirt (Hanging on wooden hanger, garment only)
  "OOT-SHT-012":
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDkho7GRGanucC5LObsfZbrhRkfflXmrqZSVX2dIQIYYJHZl9Z_6i1wxWSWhg7WScfqasuirL_gfLs9XIlwZH2zioeEupmoY0duuxc8-5tuH8bEFZ3GELo8eDEOwGN70kGd8dgyds3Fly1YMVLEtYuR2r6ldcQeRaF4GOMN48hmphElDZQFQFoCGe7loxlLMmLkgHNYvZ0UxznsjWhAhORHKCPb7-o_-av2YZTPdGs=s0",
  // 13. Jamdani Lehenga (Craft flatlay on alabaster, garment only)
  "OOT-LHN-013":
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBaHEhrOg3rqjVYFyAaT_FhKLFkCkrCMOZOGzHAgOQabQL6MjrKy9tH16rH4EI7wi6b2dORwohONtNL_fOwNRd25jXY5bHVv2cYlP_PQA3_v573jK1EuaEWCvAFmgFPT0nM-S3OH4CF8Q3PKAq0x0X2BkKhlC-n2e1OkeUnn3NXr4ik6CnPtcsIe5JVCorVtqXe70WtHKYZouQx1Wpc8sxj702NGJNsORjJ9LEaDPY=s0",
  // 14. Obsidian Panjabi (Tailored panjabi on digital mannequin form, garment only)
  "OOT-PAN-014":
    "/assets/tryon/tryon-avatar-mannequin.jpg",
  // 15. Junior Jamdani Panjabi (Folded flatlay on linen, garment only)
  "OOT-KID-015":
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAx8vW0kFmfEnUl9PaTDPEbJNorq41yiqZjWR-glADPlcJJbHgsY-xm40du1UXIWNvrkB95PgVSEPU1Oa7hwYSTAjCwE3IITd29a7kpehW8hKoxsCATTq0tQz1B17Cj22aPJhZJVQQu2xDTCedNjxv9LzkR7H7Fq1gl5Opt9rX5meYURqxkO7Z21C-GvxdB3Ier8f_fCahkL85k_aM2vzmQIUJ1iN9S9f_SVXVy9-w=s0",
  // 16. Girls Chanderi Kurti (Flatlay ensemble, garment only)
  "OOT-KID-016":
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBaHEhrOg3rqjVYFyAaT_FhKLFkCkrCMOZOGzHAgOQabQL6MjrKy9tH16rH4EI7wi6b2dORwohONtNL_fOwNRd25jXY5bHVv2cYlP_PQA3_v573jK1EuaEWCvAFmgFPT0nM-S3OH4CF8Q3PKAq0x0X2BkKhlC-n2e1OkeUnn3NXr4ik6CnPtcsIe5JVCorVtqXe70WtHKYZouQx1Wpc8sxj702NGJNsORjJ9LEaDPY=s0",
  // 17. Silk Kurti (Folded silks & raw fabric, garment only)
  "OOT-KUR-017":
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAYAFI_PmmauTCrm73TRCjj9Gevg-iIOPNnIMA2vXYOHYf5jALiTM7imQ9s_EH-7ht0ryf1qGxIMrIlApFTt66mJiK_hRskBhuya8Qth9QaLsb6RUIs9tADGdHqVSU1EODql9mLkxW7hSiE_Q92yyE_Gn7SPqLbbEJKY__D3IzzQDLnS0Z2e5S79HhdWI__isNQlL9jW9bAmBCiTdraouLZKeeE6AgSVWXojJf6ZIQ=s0",
  // 18. Salwar Kameez (Raw silk flatlay ensemble, garment only)
  "OOT-SLW-018":
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBaHEhrOg3rqjVYFyAaT_FhKLFkCkrCMOZOGzHAgOQabQL6MjrKy9tH16rH4EI7wi6b2dORwohONtNL_fOwNRd25jXY5bHVv2cYlP_PQA3_v573jK1EuaEWCvAFmgFPT0nM-S3OH4CF8Q3PKAq0x0X2BkKhlC-n2e1OkeUnn3NXr4ik6CnPtcsIe5JVCorVtqXe70WtHKYZouQx1Wpc8sxj702NGJNsORjJ9LEaDPY=s0",
  // 19. Khadi Panjabi (Folded flatlay, garment only)
  "OOT-PAN-019":
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAx8vW0kFmfEnUl9PaTDPEbJNorq41yiqZjWR-glADPlcJJbHgsY-xm40du1UXIWNvrkB95PgVSEPU1Oa7hwYSTAjCwE3IITd29a7kpehW8hKoxsCATTq0tQz1B17Cj22aPJhZJVQQu2xDTCedNjxv9LzkR7H7Fq1gl5Opt9rX5meYURqxkO7Z21C-GvxdB3Ier8f_fCahkL85k_aM2vzmQIUJ1iN9S9f_SVXVy9-w=s0",
  // 20. Charcoal Trousers (Folded flatlay, garment only)
  "OOT-PNT-020":
    "https://lh3.googleusercontent.com/aida-public/AB6AXuD_sl1s-rT1jL4gihSPUtemgnbulNFdRvXMSwQACnkPPgXP64mG6K6Hvb2_WwmH-dOYsBO2eR5FwRvlS9KlfAryHZgQLgD4V2e8jKTAEbo0H_HJXcmMYyXM0RKi7hRK6_q-tcEjHyKBqCyGNa9XA9sWmHJKM3CYyuwhN_NeEXmdtdx52UrQHj-KoTp4IZpaFMLu-Mw_AmMu9YBegBW1hj-19vlPIWlrgOqtUjbFAxY=s0",
  // 21. Muslin Jamdani Saree (Muslin & metallic zari weave detail, garment only, NO brand name)
  "OOT-SAR-021":
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBeQcivkgTtkfnKeO-ByW7wpzBO4JIOtGHPjj2SYlb8EIcaZ59Z3TRu88zjZ2TXH_31oUeBCa2_QM6tQDjdAI3LlyoNXoqpyA_ySh8kACVIYY5fHPgDQGd92NeDL9sM5-ZRQ2XUvwAjUHAdXsVqqd5ncYIbfujibuehHISlhUQueAkZ_tRKmPQoRDtebrNIiLHuJTs3lrijLnnZ4aJUmADlUq6bCLYDaQSHFjmkHyM=s0",
  // 22. Tuxedo Shirt (Hanging shirt, garment only)
  "OOT-SHT-022":
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDkho7GRGanucC5LObsfZbrhRkfflXmrqZSVX2dIQIYYJHZl9Z_6i1wxWSWhg7WScfqasuirL_gfLs9XIlwZH2zioeEupmoY0duuxc8-5tuH8bEFZ3GELo8eDEOwGN70kGd8dgyds3Fly1YMVLEtYuR2r6ldcQeRaF4GOMN48hmphElDZQFQFoCGe7loxlLMmLkgHNYvZ0UxznsjWhAhORHKCPb7-o_-av2YZTPdGs=s0",
  // 23. Bandhgala Jacket (Hanging tailored jacket, garment only)
  "OOT-BLZ-023":
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCoFHKrK_pzA3MAoy-T41foeGmDQxJ0Wzcvk68JSpVpPJUty7qH4nx0IJNuFFjnKMHMiMIAj2Tr2EEv1p_AlVi5BQdKmUq2X_s_MA93FcfeqLhoiAuLsTu4NZypKr3W3iSvlftVfCEVpAV3JilELtV5jpN7qPlAHKbYJbXV9tsTf8AEvJyeIilVwSj3dV5Sf-rmKRzrYePi7PCtsrj2-xIHmGw4MF3WILCYvms8xyM=s0",
  // 24. Gold Leaf Three-Piece (Flatlay ensemble, garment only)
  "OOT-TRP-024":
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBaHEhrOg3rqjVYFyAaT_FhKLFkCkrCMOZOGzHAgOQabQL6MjrKy9tH16rH4EI7wi6b2dORwohONtNL_fOwNRd25jXY5bHVv2cYlP_PQA3_v573jK1EuaEWCvAFmgFPT0nM-S3OH4CF8Q3PKAq0x0X2BkKhlC-n2e1OkeUnn3NXr4ik6CnPtcsIe5JVCorVtqXe70WtHKYZouQx1Wpc8sxj702NGJNsORjJ9LEaDPY=s0",
  // 25. Tussar Panjabi (Hanging Panjabi, garment only)
  "OOT-PAN-025":
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAlHxT9a54dLcyokiwx7H_bzlRZyUPfxuO-b1pZ4NW1rc8f-PiooIwIfcW8aNnLVWxNQp1GNxzynr9XfDXZapZ6QwKy2oaaxp5c6qsKoQZtGg1SR8wGv0MGNkwlQxIV9nplGd11SyLjykbZnpyh091diOfdjb6DO9-KU9gJT84zZ9gy6-OQ0V8f8g0IhesvVkOWoLIg7D1-UHz_uIn922tCC0eLYqg4dDHAOSBNQD0=s0",
  // 26. Matka Silk Saree (Draped on alabaster pedestal, garment only, NO brand name)
  "OOT-SAR-026":
    "https://lh3.googleusercontent.com/aida-public/AB6AXuD72gHZPVdMYtTmQBh2rwGAqVYBd-FgoGz0dmgQHhcVEfIc9Nt6DlFfmsUfWT6f-Q4sMRQNfOMbR8t3UBXYMW_aTya2qZp5xguRuH2hKusKiFszoRa82gpOT0zncf0pha9zkReM-mHEYhVR2HalCLz8tZ8V3QRKTAiAysFcDD0uL2bXZ3zsthEOZpDhiVlqxNajrkDhMDzY-6ESss1qZHVDDZvaHvvom17XkVrMob4=s0",
  // 27. Drawstring Pants (Folded trousers, garment only)
  "OOT-PNT-027":
    "https://lh3.googleusercontent.com/aida-public/AB6AXuD_sl1s-rT1jL4gihSPUtemgnbulNFdRvXMSwQACnkPPgXP64mG6K6Hvb2_WwmH-dOYsBO2eR5FwRvlS9KlfAryHZgQLgD4V2e8jKTAEbo0H_HJXcmMYyXM0RKi7hRK6_q-tcEjHyKBqCyGNa9XA9sWmHJKM3CYyuwhN_NeEXmdtdx52UrQHj-KoTp4IZpaFMLu-Mw_AmMu9YBegBW1hj-19vlPIWlrgOqtUjbFAxY=s0",
  // 28. Indigo Khadi Shirt (Hanging shirt, garment only)
  "OOT-SHT-028":
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDkho7GRGanucC5LObsfZbrhRkfflXmrqZSVX2dIQIYYJHZl9Z_6i1wxWSWhg7WScfqasuirL_gfLs9XIlwZH2zioeEupmoY0duuxc8-5tuH8bEFZ3GELo8eDEOwGN70kGd8dgyds3Fly1YMVLEtYuR2r6ldcQeRaF4GOMN48hmphElDZQFQFoCGe7loxlLMmLkgHNYvZ0UxznsjWhAhORHKCPb7-o_-av2YZTPdGs=s0",
  // 29. Organza Lehenga (Silks & textile flatlay, garment only)
  "OOT-LHN-029":
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAYAFI_PmmauTCrm73TRCjj9Gevg-iIOPNnIMA2vXYOHYf5jALiTM7imQ9s_EH-7ht0ryf1qGxIMrIlApFTt66mJiK_hRskBhuya8Qth9QaLsb6RUIs9tADGdHqVSU1EODql9mLkxW7hSiE_Q92yyE_Gn7SPqLbbEJKY__D3IzzQDLnS0Z2e5S79HhdWI__isNQlL9jW9bAmBCiTdraouLZKeeE6AgSVWXojJf6ZIQ=s0",
  // 30. Minimalist Linen Panjabi (Folded flatlay, garment only)
  "OOT-PAN-030":
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAx8vW0kFmfEnUl9PaTDPEbJNorq41yiqZjWR-glADPlcJJbHgsY-xm40du1UXIWNvrkB95PgVSEPU1Oa7hwYSTAjCwE3IITd29a7kpehW8hKoxsCATTq0tQz1B17Cj22aPJhZJVQQu2xDTCedNjxv9LzkR7H7Fq1gl5Opt9rX5meYURqxkO7Z21C-GvxdB3Ier8f_fCahkL85k_aM2vzmQIUJ1iN9S9f_SVXVy9-w=s0",
  // 31. Crimson Khadi Jamdani Saree
  "OOT-SAR-031":
    "https://lh3.googleusercontent.com/aida-public/AB6AXuD72gHZPVdMYtTmQBh2rwGAqVYBd-FgoGz0dmgQHhcVEfIc9Nt6DlFfmsUfWT6f-Q4sMRQNfOMbR8t3UBXYMW_aTya2qZp5xguRuH2hKusKiFszoRa82gpOT0zncf0pha9zkReM-mHEYhVR2HalCLz8tZ8V3QRKTAiAysFcDD0uL2bXZ3zsthEOZpDhiVlqxNajrkDhMDzY-6ESss1qZHVDDZvaHvvom17XkVrMob4=s0",
  // 32. Layered Muslin Angrakha Three-Piece
  "OOT-TRP-032":
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBaHEhrOg3rqjVYFyAaT_FhKLFkCkrCMOZOGzHAgOQabQL6MjrKy9tH16rH4EI7wi6b2dORwohONtNL_fOwNRd25jXY5bHVv2cYlP_PQA3_v573jK1EuaEWCvAFmgFPT0nM-S3OH4CF8Q3PKAq0x0X2BkKhlC-n2e1OkeUnn3NXr4ik6CnPtcsIe5JVCorVtqXe70WtHKYZouQx1Wpc8sxj702NGJNsORjJ9LEaDPY=s0",
  // 33. Bespoke Pintuck Khadi Tunic
  "OOT-KUR-033":
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAYAFI_PmmauTCrm73TRCjj9Gevg-iIOPNnIMA2vXYOHYf5jALiTM7imQ9s_EH-7ht0ryf1qGxIMrIlApFTt66mJiK_hRskBhuya8Qth9QaLsb6RUIs9tADGdHqVSU1EODql9mLkxW7hSiE_Q92yyE_Gn7SPqLbbEJKY__D3IzzQDLnS0Z2e5S79HhdWI__isNQlL9jW9bAmBCiTdraouLZKeeE6AgSVWXojJf6ZIQ=s0",
  // 34. Burnished Gold Tissue Banarasi Saree
  "OOT-SAR-034":
    "/assets/eid/eid-folded-silks.jpg",
  // 35. Wide-Leg Raw Silk Trousers
  "OOT-PNT-035":
    "https://lh3.googleusercontent.com/aida-public/AB6AXuD_sl1s-rT1jL4gihSPUtemgnbulNFdRvXMSwQACnkPPgXP64mG6K6Hvb2_WwmH-dOYsBO2eR5FwRvlS9KlfAryHZgQLgD4V2e8jKTAEbo0H_HJXcmMYyXM0RKi7hRK6_q-tcEjHyKBqCyGNa9XA9sWmHJKM3CYyuwhN_NeEXmdtdx52UrQHj-KoTp4IZpaFMLu-Mw_AmMu9YBegBW1hj-19vlPIWlrgOqtUjbFAxY=s0",
  // 36. Structured Raw Silk Tuxedo Vest
  "OOT-BLZ-036":
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCoFHKrK_pzA3MAoy-T41foeGmDQxJ0Wzcvk68JSpVpPJUty7qH4nx0IJNuFFjnKMHMiMIAj2Tr2EEv1p_AlVi5BQdKmUq2X_s_MA93FcfeqLhoiAuLsTu4NZypKr3W3iSvlftVfCEVpAV3JilELtV5jpN7qPlAHKbYJbXV9tsTf8AEvJyeIilVwSj3dV5Sf-rmKRzrYePi7PCtsrj2-xIHmGw4MF3WILCYvms8xyM=s0",
  // 37. Midnight Indigo Zari Jamdani Lehenga
  "OOT-LHN-037":
    "/assets/products/jamdani-saree-clean.jpg",
  // 38. Natural Mulberry Silk Tangail Saree
  "OOT-SAR-038":
    "https://lh3.googleusercontent.com/aida-public/AB6AXuD72gHZPVdMYtTmQBh2rwGAqVYBd-FgoGz0dmgQHhcVEfIc9Nt6DlFfmsUfWT6f-Q4sMRQNfOMbR8t3UBXYMW_aTya2qZp5xguRuH2hKusKiFszoRa82gpOT0zncf0pha9zkReM-mHEYhVR2HalCLz8tZ8V3QRKTAiAysFcDD0uL2bXZ3zsthEOZpDhiVlqxNajrkDhMDzY-6ESss1qZHVDDZvaHvvom17XkVrMob4=s0",
  // 39. Minimalist Slate Grey Panjabi
  "OOT-PAN-039":
    "/assets/eid/eid-espresso-panjabi.jpg",
  // 40. Tonal Marled Linen Panjabi
  "OOT-PAN-040":
    "/assets/hero/hero-banner-master.jpg",
  // 41. Camp-Collar Relaxed Linen Shirt
  "OOT-SHT-041":
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDkho7GRGanucC5LObsfZbrhRkfflXmrqZSVX2dIQIYYJHZl9Z_6i1wxWSWhg7WScfqasuirL_gfLs9XIlwZH2zioeEupmoY0duuxc8-5tuH8bEFZ3GELo8eDEOwGN70kGd8dgyds3Fly1YMVLEtYuR2r6ldcQeRaF4GOMN48hmphElDZQFQFoCGe7loxlLMmLkgHNYvZ0UxznsjWhAhORHKCPb7-o_-av2YZTPdGs=s0",
  // 42. Midnight Double-Breasted Wool Blazer
  "OOT-BLZ-042":
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAqyrJTi9nfT1P_Di0ZavWYRlZQKt4gQQ9uVi337kVqznaHvZNLLji3PwQBM6Ksjf5RGTEhTAx_OuGb3sRSO69ilPKqmizPOEyWbJjJAXtRLAU3w2zcshQ0DJU_EpFYRhr0yjxPEN_wm1Pv8GO4h3AWa_OxeG-ibCX5lqnhHWmq6hCEPbbh9UFmxReEYx_SmqPjSjEOR6OU3pmzbsT7pvPWLIk9wS-nwSNfj8Pekyw=s0",
  // 43. Bespoke Off-White Gurkha Trousers
  "OOT-PNT-043":
    "https://lh3.googleusercontent.com/aida-public/AB6AXuD_sl1s-rT1jL4gihSPUtemgnbulNFdRvXMSwQACnkPPgXP64mG6K6Hvb2_WwmH-dOYsBO2eR5FwRvlS9KlfAryHZgQLgD4V2e8jKTAEbo0H_HJXcmMYyXM0RKi7hRK6_q-tcEjHyKBqCyGNa9XA9sWmHJKM3CYyuwhN_NeEXmdtdx52UrQHj-KoTp4IZpaFMLu-Mw_AmMu9YBegBW1hj-19vlPIWlrgOqtUjbFAxY=s0",
  // 44. Natural Ecru Raw-Silk Shirt
  "OOT-SHT-044":
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDkho7GRGanucC5LObsfZbrhRkfflXmrqZSVX2dIQIYYJHZl9Z_6i1wxWSWhg7WScfqasuirL_gfLs9XIlwZH2zioeEupmoY0duuxc8-5tuH8bEFZ3GELo8eDEOwGN70kGd8dgyds3Fly1YMVLEtYuR2r6ldcQeRaF4GOMN48hmphElDZQFQFoCGe7loxlLMmLkgHNYvZ0UxznsjWhAhORHKCPb7-o_-av2YZTPdGs=s0",
  // 45. Boys Olive Khadi Panjabi Set
  "OOT-KID-045":
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAx8vW0kFmfEnUl9PaTDPEbJNorq41yiqZjWR-glADPlcJJbHgsY-xm40du1UXIWNvrkB95PgVSEPU1Oa7hwYSTAjCwE3IITd29a7kpehW8hKoxsCATTq0tQz1B17Cj22aPJhZJVQQu2xDTCedNjxv9LzkR7H7Fq1gl5Opt9rX5meYURqxkO7Z21C-GvxdB3Ier8f_fCahkL85k_aM2vzmQIUJ1iN9S9f_SVXVy9-w=s0",
  // 46. Girls Jamdani Floral Tunic & Salwar
  "OOT-KID-046":
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBaHEhrOg3rqjVYFyAaT_FhKLFkCkrCMOZOGzHAgOQabQL6MjrKy9tH16rH4EI7wi6b2dORwohONtNL_fOwNRd25jXY5bHVv2cYlP_PQA3_v573jK1EuaEWCvAFmgFPT0nM-S3OH4CF8Q3PKAq0x0X2BkKhlC-n2e1OkeUnn3NXr4ik6CnPtcsIe5JVCorVtqXe70WtHKYZouQx1Wpc8sxj702NGJNsORjJ9LEaDPY=s0",
  // 47. Junior Tailored Linen Kurta Shirt
  "OOT-KID-047":
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAx8vW0kFmfEnUl9PaTDPEbJNorq41yiqZjWR-glADPlcJJbHgsY-xm40du1UXIWNvrkB95PgVSEPU1Oa7hwYSTAjCwE3IITd29a7kpehW8hKoxsCATTq0tQz1B17Cj22aPJhZJVQQu2xDTCedNjxv9LzkR7H7Fq1gl5Opt9rX5meYURqxkO7Z21C-GvxdB3Ier8f_fCahkL85k_aM2vzmQIUJ1iN9S9f_SVXVy9-w=s0",
  // 48. Girls Organza Tiered Festive Frock
  "OOT-KID-048":
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBaHEhrOg3rqjVYFyAaT_FhKLFkCkrCMOZOGzHAgOQabQL6MjrKy9tH16rH4EI7wi6b2dORwohONtNL_fOwNRd25jXY5bHVv2cYlP_PQA3_v573jK1EuaEWCvAFmgFPT0nM-S3OH4CF8Q3PKAq0x0X2BkKhlC-n2e1OkeUnn3NXr4ik6CnPtcsIe5JVCorVtqXe70WtHKYZouQx1Wpc8sxj702NGJNsORjJ9LEaDPY=s0",
  // 49. Boys Raw Silk Bandhgala Waistcoat Set
  "OOT-KID-049":
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCoFHKrK_pzA3MAoy-T41foeGmDQxJ0Wzcvk68JSpVpPJUty7qH4nx0IJNuFFjnKMHMiMIAj2Tr2EEv1p_AlVi5BQdKmUq2X_s_MA93FcfeqLhoiAuLsTu4NZypKr3W3iSvlftVfCEVpAV3JilELtV5jpN7qPlAHKbYJbXV9tsTf8AEvJyeIilVwSj3dV5Sf-rmKRzrYePi7PCtsrj2-xIHmGw4MF3WILCYvms8xyM=s0",
  // 50. Junior Monochrome Muslin Kurti Set
  "OOT-KID-050":
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBeQcivkgTtkfnKeO-ByW7wpzBO4JIOtGHPjj2SYlb8EIcaZ59Z3TRu88zjZ2TXH_31oUeBCa2_QM6tQDjdAI3LlyoNXoqpyA_ySh8kACVIYY5fHPgDQGd92NeDL9sM5-ZRQ2XUvwAjUHAdXsVqqd5ncYIbfujibuehHISlhUQueAkZ_tRKmPQoRDtebrNIiLHuJTs3lrijLnnZ4aJUmADlUq6bCLYDaQSHFjmkHyM=s0",
};

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
