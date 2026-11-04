import "server-only";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export const isSupabaseAdminConfigured = Boolean(supabaseUrl && serviceRoleKey);

/**
 * Cliente de Supabase con la clave `service_role`: solo se importa desde
 * código de servidor (Server Actions / Route Handlers del panel /admin).
 * Salta las políticas de RLS, así que nunca debe llegar al navegador.
 */
export const supabaseAdmin: SupabaseClient | null = isSupabaseAdminConfigured
  ? createClient(supabaseUrl as string, serviceRoleKey as string, {
      auth: { persistSession: false },
    })
  : null;
