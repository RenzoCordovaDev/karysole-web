import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CATEGORIES, getCategory } from "@/lib/categories";
import { getProductsByCategory } from "@/lib/products";
import { CatalogGrid } from "@/components/CatalogGrid";

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategory(slug);
  return { title: category ? `${category.label} — KARYSOLÉ` : "KARYSOLÉ" };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();

  const products = await getProductsByCategory(category.slug);

  return (
    <div className="max-w-6xl mx-auto px-5 md:px-10 py-8">
      <nav className="text-[13px] text-muted flex items-center gap-2 mb-6" aria-label="Migas de pan">
        <span>Inicio</span>
        <span>›</span>
        <span className="text-ink font-semibold">{category.label}</span>
      </nav>

      <h1 className="font-display font-semibold text-3xl mb-1">{category.label}</h1>
      <p className="text-sm text-muted mb-8">{category.description}</p>

      <CatalogGrid products={products} />
    </div>
  );
}
