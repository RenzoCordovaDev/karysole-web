"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart";
import { getCategoryLabel } from "@/lib/categories";
import type { Product } from "@/lib/types";
import { CartIcon, HeartIcon } from "./icons";

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();

  const hasDiscount = Boolean(product.compareAtPrice && product.compareAtPrice > product.price);
  const discountPct = hasDiscount
    ? Math.round(100 - (product.price / (product.compareAtPrice as number)) * 100)
    : null;

  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-line flex flex-col shadow-sm hover:shadow-lg transition-shadow duration-300">
      <Link
        href={`/producto/${product.slug}`}
        className="relative aspect-square block bg-gradient-to-br from-line to-primary flex items-center justify-center"
      >
        {product.isNew && (
          <span className="absolute top-2.5 left-2.5 bg-primary-dark text-white text-[10px] font-bold px-2.5 py-1 rounded-full tracking-wide">
            NUEVO
          </span>
        )}
        {!product.isNew && discountPct && (
          <span className="absolute top-2.5 left-2.5 bg-ink text-accent text-[10px] font-bold px-2.5 py-1 rounded-full tracking-wide">
            -{discountPct}%
          </span>
        )}
        <span className="text-white text-xs font-semibold text-center px-4">{product.name}</span>
        <button
          type="button"
          aria-label="Agregar a favoritos"
          onClick={(e) => e.preventDefault()}
          className="absolute top-2.5 right-2.5 bg-white rounded-full w-7 h-7 flex items-center justify-center text-ink shadow-sm hover:scale-105 transition-transform"
        >
          <HeartIcon size={13} />
        </button>
      </Link>

      <div className="p-4 flex flex-col gap-1.5 flex-1">
        <span className="text-[11px] text-muted uppercase tracking-wide">{getCategoryLabel(product.category)}</span>
        <Link href={`/producto/${product.slug}`} className="font-display font-semibold text-[15px] leading-snug">
          {product.name}
        </Link>
        <div className="flex items-baseline gap-2">
          {hasDiscount && (
            <span className="text-[12px] text-muted line-through">S/ {(product.compareAtPrice as number).toFixed(2)}</span>
          )}
          <span className="text-[15px] font-bold text-ink">S/ {product.price.toFixed(2)}</span>
        </div>

        <button
          type="button"
          onClick={() =>
            addItem({
              id: product.id,
              slug: product.slug,
              name: product.name,
              price: product.price,
              imageUrl: product.imageUrl,
            })
          }
          className="mt-auto w-full h-11 bg-primary text-white rounded-full text-sm font-semibold hover:bg-primary-dark active:scale-[0.98] transition-all shadow-sm hover:shadow-md inline-flex items-center justify-center gap-2"
        >
          <CartIcon size={15} />
          Agregar
        </button>
      </div>
    </div>
  );
}
