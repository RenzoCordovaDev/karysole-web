"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/lib/cart";
import type { Product } from "@/lib/types";

export function AddToCartSection({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [size, setSize] = useState<string | null>(product.sizes[0] ?? null);
  const [color, setColor] = useState<string | null>(product.colors[0] ?? null);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  function handleAdd() {
    addItem(
      {
        id: product.id,
        slug: product.slug,
        name: product.name,
        price: product.price,
        imageUrl: product.imageUrl,
        size,
        color,
      },
      quantity,
    );
    setAdded(true);
  }

  return (
    <div className="flex flex-col gap-5">
      {product.sizes.length > 0 && (
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wide text-primary-dark mb-2.5">Talla</h3>
          <div className="flex flex-wrap gap-2">
            {product.sizes.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => {
                  setSize(s);
                  setAdded(false);
                }}
                className={`min-w-11 h-11 px-3.5 rounded-[10px] text-sm font-semibold border ${
                  size === s ? "border-2 border-primary-dark bg-line text-primary-dark" : "border-line bg-white text-ink"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {product.colors.length > 0 && (
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wide text-primary-dark mb-2.5">Color</h3>
          <div className="flex flex-wrap gap-2">
            {product.colors.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => {
                  setColor(c);
                  setAdded(false);
                }}
                className={`px-4 h-11 rounded-full text-sm font-medium border ${
                  color === c ? "border-2 border-primary-dark bg-line text-primary-dark" : "border-line bg-white text-ink"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      )}

      <div>
        <h3 className="text-xs font-bold uppercase tracking-wide text-primary-dark mb-2.5">Cantidad</h3>
        <div className="flex items-center gap-3">
          <button
            type="button"
            aria-label="Restar cantidad"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="w-10 h-10 rounded-full border border-line font-semibold"
          >
            −
          </button>
          <span className="w-8 text-center font-semibold">{quantity}</span>
          <button
            type="button"
            aria-label="Sumar cantidad"
            onClick={() => setQuantity((q) => q + 1)}
            className="w-10 h-10 rounded-full border border-line font-semibold"
          >
            +
          </button>
        </div>
      </div>

      <button
        type="button"
        onClick={handleAdd}
        className="w-full h-12 bg-primary text-white rounded-full text-sm font-semibold hover:bg-primary-dark active:scale-[0.98] transition-all shadow-sm hover:shadow-md"
      >
        Agregar al carrito
      </button>

      {added && (
        <p className="text-sm text-primary-dark font-medium">
          Agregado al carrito.{" "}
          <Link href="/carrito" className="underline font-semibold">
            Ver carrito
          </Link>
        </p>
      )}
    </div>
  );
}
