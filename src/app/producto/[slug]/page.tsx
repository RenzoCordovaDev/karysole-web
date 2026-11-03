import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { getAllProductSlugs, getProductBySlug } from "@/lib/products";
import { getCategoryLabel } from "@/lib/categories";
import { AddToCartSection } from "@/components/AddToCartSection";

export async function generateStaticParams() {
  const slugs = await getAllProductSlugs();
  return slugs;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  return { title: product ? `${product.name} — KARYSOLÉ` : "KARYSOLÉ" };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const hasDiscount = Boolean(product.compareAtPrice && product.compareAtPrice > product.price);

  return (
    <div className="max-w-6xl mx-auto px-5 md:px-10 py-8">
      <nav className="text-[13px] text-muted flex items-center gap-2 mb-6 flex-wrap" aria-label="Migas de pan">
        <Link href="/">Inicio</Link>
        <span>›</span>
        <Link href={`/categoria/${product.category}`}>{getCategoryLabel(product.category)}</Link>
        <span>›</span>
        <span className="text-ink font-semibold">{product.name}</span>
      </nav>

      <div className="flex flex-col md:flex-row gap-10">
        <div className="flex-1">
          <div className="aspect-square rounded-2xl bg-gradient-to-br from-line to-primary flex items-center justify-center">
            <span className="text-white font-semibold text-center px-6">{product.name}</span>
          </div>
        </div>

        <div className="flex-1 max-w-md">
          <span className="text-[12px] text-muted uppercase tracking-wide">{getCategoryLabel(product.category)}</span>
          <h1 className="font-display font-semibold text-3xl mt-1 mb-3">{product.name}</h1>

          <div className="flex items-baseline gap-3 mb-5">
            {hasDiscount && (
              <span className="text-sm text-muted line-through">S/ {product.compareAtPrice!.toFixed(2)}</span>
            )}
            <span className="text-2xl font-bold">S/ {product.price.toFixed(2)}</span>
          </div>

          {product.description && (
            <p className="text-sm leading-relaxed text-muted mb-7">{product.description}</p>
          )}

          <AddToCartSection product={product} />
        </div>
      </div>
    </div>
  );
}
