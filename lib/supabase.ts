import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://yixidvlnirikaaqysgdn.supabase.co";
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  "sb_publishable_AsSG96tbjJD3aBPC3EvcSA_tw2amkSu";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
