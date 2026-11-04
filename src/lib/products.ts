import { supabase } from "./supabase";
import { sampleProducts } from "./sample-products";
import type { CategorySlug, Product } from "./types";

export interface ProductRow {
  id: string;
  slug: string;
  name: string;
  category: CategorySlug;
  price: number;
  compare_at_price: number | null;
  description: string | null;
  image_url: string | null;
  sizes: string[] | null;
  colors: string[] | null;
  is_new: boolean | null;
  created_at: string;
}

export function mapRow(row: ProductRow): Product {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    category: row.category,
    price: row.price,
    compareAtPrice: row.compare_at_price,
    description: row.description ?? "",
    imageUrl: row.image_url,
    sizes: row.sizes ?? [],
    colors: row.colors ?? [],
    isNew: row.is_new ?? false,
    createdAt: row.created_at,
  };
}

export async function getFeaturedProducts(limit = 4): Promise<Product[]> {
  if (!supabase) {
    return [...sampleProducts]
      .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
      .slice(0, limit);
  }

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error || !data) return sampleProducts.slice(0, limit);
  return data.map(mapRow);
}

export async function getProductsByCategory(category: CategorySlug): Promise<Product[]> {
  if (!supabase) {
    return sampleProducts.filter((p) => p.category === category);
  }

  const { data, error } = await supabase.from("products").select("*").eq("category", category);

  if (error || !data) return sampleProducts.filter((p) => p.category === category);
  return data.map(mapRow);
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  if (!supabase) {
    return sampleProducts.find((p) => p.slug === slug) ?? null;
  }

  const { data, error } = await supabase.from("products").select("*").eq("slug", slug).single();

  if (error || !data) return sampleProducts.find((p) => p.slug === slug) ?? null;
  return mapRow(data);
}

export async function getAllProductSlugs(): Promise<{ slug: string }[]> {
  if (!supabase) return sampleProducts.map((p) => ({ slug: p.slug }));

  const { data, error } = await supabase.from("products").select("slug");
  if (error || !data) return sampleProducts.map((p) => ({ slug: p.slug }));
  return data;
}
