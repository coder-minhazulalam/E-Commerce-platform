/**
 * OOTFY Luxury Fashion E-Commerce — Supabase Database Migration & Sync Script
 * 
 * Synchronizes the 50 atelier masterworks from supabase/ootfy-products.json into
 * the live Supabase PostgreSQL database table `public.products`.
 * If remote database connection fails, falls back gracefully to static catalog.
 */

import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import path from "path";

export async function runSupabaseSync(options: { verbose?: boolean } = {}) {
  const verbose = options.verbose ?? true;

  const supabaseUrl =
    process.env.NEXT_PUBLIC_SUPABASE_URL || "https://yixidvlnirikaaqysgdn.supabase.co";
  const supabaseKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    "sb_publishable_AsSG96tbjJD3aBPC3EvcSA_tw2amkSu";

  if (verbose) {
    console.log(`[Supabase Sync] Connecting to endpoint: ${supabaseUrl}`);
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  // 1. Read seed products from supabase/ootfy-products.json
  const seedPath = path.resolve(process.cwd(), "..", "supabase", "ootfy-products.json");
  const localSeedPath = path.resolve(process.cwd(), "supabase", "ootfy-products.json");

  let seedFile = "";
  if (fs.existsSync(seedPath)) {
    seedFile = fs.readFileSync(seedPath, "utf8");
  } else if (fs.existsSync(localSeedPath)) {
    seedFile = fs.readFileSync(localSeedPath, "utf8");
  } else {
    throw new Error("Could not locate supabase/ootfy-products.json seed file");
  }

  const parsed = JSON.parse(seedFile);
  const products = parsed.products || [];

  if (verbose) {
    console.log(`[Supabase Sync] Loaded ${products.length} canonical atelier products from seed file.`);
  }

  // 2. Upsert into Supabase database
  try {
    const { data, error } = await supabase.from("products").upsert(
      products.map((p: any) => ({
        id: p.id,
        name: p.name,
        subtitle_or_tagline: p.subtitle_or_tagline,
        category: p.category,
        collection: p.collection,
        gender: p.gender,
        price_bdt: p.price_bdt,
        original_price_bdt: p.original_price_bdt,
        badge: p.badge,
        description: p.description,
        fabric: p.fabric,
        craft_technique: p.craft_technique,
        colors: p.colors,
        sizes: p.sizes,
        stock_status: p.stock_status,
        images: p.images,
        has_3d_view: p.has_3d_view,
        has_virtual_try_on: p.has_virtual_try_on,
        avatar_preview_id: p.avatar_preview_id,
        fit_recommendation: p.fit_recommendation,
        featured: p.featured,
        updated_at: new Date().toISOString(),
      })),
      { onConflict: "id" }
    );

    if (error) {
      if (verbose) {
        console.warn(`[Supabase Sync] Database upsert notice: ${error.message}. Local static catalog active as fallback.`);
      }
      return { success: false, error: error.message, fallbackActive: true };
    }

    if (verbose) {
      console.log(`[Supabase Sync] Successfully synchronized all ${products.length} products with Supabase.`);
    }

    return { success: true, count: products.length, fallbackActive: false };
  } catch (err: any) {
    if (verbose) {
      console.warn(`[Supabase Sync] Live connection offline or unreachable (${err.message}). High-performance static fallback active.`);
    }
    return { success: false, error: err.message, fallbackActive: true };
  }
}

// Direct CLI invocation
if (process.argv[1]?.includes("sync-supabase")) {
  runSupabaseSync().catch((err) => {
    console.error("[Supabase Sync] Unhandled exception:", err);
  });
}
