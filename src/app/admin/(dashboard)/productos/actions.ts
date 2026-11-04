"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { supabaseAdmin, isSupabaseAdminConfigured } from "@/lib/supabase-admin";
import { CATEGORIES } from "@/lib/categories";
import { slugify } from "@/lib/slugify";
import type { CategorySlug } from "@/lib/types";

interface ProductInput {
  slug: string;
  name: string;
  category: CategorySlug;
  price: number;
  compare_at_price: number | null;
  description: string | null;
  image_url: string | null;
  sizes: string[];
  colors: string[];
  is_new: boolean;
}

function parseListField(value: FormDataEntryValue | null): string[] {
  return String(value ?? "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function parseProductInput(formData: FormData): ProductInput | { error: string } {
  const name = String(formData.get("name") ?? "").trim();
  if (!name) return { error: "El nombre es obligatorio." };

  const category = String(formData.get("category") ?? "") as CategorySlug;
  if (!CATEGORIES.some((c) => c.slug === category)) {
    return { error: "Elige una categoría válida." };
  }

  const priceRaw = String(formData.get("price") ?? "");
  const price = Number(priceRaw);
  if (!Number.isFinite(price) || price <= 0) {
    return { error: "El precio debe ser un número mayor a 0." };
  }

  const compareAtPriceRaw = String(formData.get("compareAtPrice") ?? "").trim();
  let compareAtPrice: number | null = null;
  if (compareAtPriceRaw) {
    compareAtPrice = Number(compareAtPriceRaw);
    if (!Number.isFinite(compareAtPrice) || compareAtPrice <= 0) {
      return { error: "El precio anterior debe ser un número mayor a 0." };
    }
  }

  const slugRaw = String(formData.get("slug") ?? "").trim();
  const slug = slugify(slugRaw || name);
  if (!slug) return { error: "No se pudo generar un slug válido a partir del nombre." };

  const description = String(formData.get("description") ?? "").trim();
  const imageUrl = String(formData.get("imageUrl") ?? "").trim();

  return {
    slug,
    name,
    category,
    price,
    compare_at_price: compareAtPrice,
    description: description || null,
    image_url: imageUrl || null,
    sizes: parseListField(formData.get("sizes")),
    colors: parseListField(formData.get("colors")),
    is_new: formData.get("isNew") === "on",
  };
}

function requireSupabaseAdmin() {
  if (!isSupabaseAdminConfigured || !supabaseAdmin) {
    throw new Error(
      "Supabase no está configurado (faltan NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY).",
    );
  }
  return supabaseAdmin;
}

function revalidateStorefront(category: CategorySlug, slug: string) {
  revalidatePath("/");
  revalidatePath(`/categoria/${category}`);
  revalidatePath(`/producto/${slug}`);
}

export async function createProductAction(formData: FormData) {
  const input = parseProductInput(formData);
  if ("error" in input) {
    redirect(`/admin/productos/nuevo?error=${encodeURIComponent(input.error)}`);
  }

  const admin = requireSupabaseAdmin();
  const { error } = await admin.from("products").insert(input);

  if (error) {
    const message = error.code === "23505" ? "Ya existe un producto con ese slug." : error.message;
    redirect(`/admin/productos/nuevo?error=${encodeURIComponent(message)}`);
  }

  revalidateStorefront(input.category, input.slug);
  redirect("/admin/productos?created=1");
}

export async function updateProductAction(id: string, formData: FormData) {
  const input = parseProductInput(formData);
  if ("error" in input) {
    redirect(`/admin/productos/${id}?error=${encodeURIComponent(input.error)}`);
  }

  const admin = requireSupabaseAdmin();
  const { error } = await admin.from("products").update(input).eq("id", id);

  if (error) {
    const message = error.code === "23505" ? "Ya existe un producto con ese slug." : error.message;
    redirect(`/admin/productos/${id}?error=${encodeURIComponent(message)}`);
  }

  revalidateStorefront(input.category, input.slug);
  redirect("/admin/productos?updated=1");
}

export async function deleteProductAction(id: string, category: CategorySlug, slug: string) {
  const admin = requireSupabaseAdmin();
  const { error } = await admin.from("products").delete().eq("id", id);

  if (error) {
    redirect(`/admin/productos?error=${encodeURIComponent(error.message)}`);
  }

  revalidateStorefront(category, slug);
  redirect("/admin/productos?deleted=1");
}
