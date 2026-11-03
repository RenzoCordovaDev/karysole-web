import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

/**
 * `null` mientras no se configuren las variables de entorno de Supabase.
 * El resto de la app usa el catálogo de ejemplo (`sample-products.ts`)
 * como respaldo en ese caso, para poder revisar la tienda sin backend.
 */
export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl as string, supabaseAnonKey as string)
  : null;
