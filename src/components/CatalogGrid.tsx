"use client";

import { useMemo, useState } from "react";
import { ProductCard } from "./ProductCard";
import { ChevronDownIcon } from "./icons";
import type { Product } from "@/lib/types";

const COLOR_HEX: Record<string, string> = {
  Lila: "#C9B8E8",
  Negro: "#2E2A33",
  Blanco: "#FFFFFF",
  Rosa: "#E8A7B8",
  Crema: "#D8C7A8",
  Beige: "#D8C7A8",
  "Azul claro": "#7B93B8",
  Azul: "#7B93B8",
  Verde: "#8FAE8B",
};

type SortOption = "recomendados" | "precio-asc" | "precio-desc" | "novedades";

export function CatalogGrid({ products }: { products: Product[] }) {
  const [sizes, setSizes] = useState<string[]>([]);
  const [colors, setColors] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sort, setSort] = useState<SortOption>("recomendados");

  const availableSizes = useMemo(
    () => Array.from(new Set(products.flatMap((p) => p.sizes))).sort(),
    [products],
  );
  const availableColors = useMemo(
    () => Array.from(new Set(products.flatMap((p) => p.colors))),
    [products],
  );

  function toggle(list: string[], value: string, setList: (v: string[]) => void) {
    setList(list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);
  }

  const filtered = useMemo(() => {
    const min = minPrice ? Number(minPrice) : null;
    const max = maxPrice ? Number(maxPrice) : null;

    let result = products.filter((p) => {
      if (sizes.length > 0 && !p.sizes.some((s) => sizes.includes(s))) return false;
      if (colors.length > 0 && !p.colors.some((c) => colors.includes(c))) return false;
      if (min !== null && p.price < min) return false;
      if (max !== null && p.price > max) return false;
      return true;
    });

    result = [...result];
    if (sort === "precio-asc") result.sort((a, b) => a.price - b.price);
    else if (sort === "precio-desc") result.sort((a, b) => b.price - a.price);
    else if (sort === "novedades") result.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));

    return result;
  }, [products, sizes, colors, minPrice, maxPrice, sort]);

  return (
    <div className="flex flex-col lg:flex-row gap-8 items-start">
      {/* Filters */}
      <aside className="w-full lg:w-64 shrink-0">
        <div className="bg-white border border-line rounded-2xl p-5">
          <h2 className="font-display font-semibold text-lg mb-4">Filtros</h2>

          {availableSizes.length > 0 && (
            <div className="mb-6">
              <h3 className="text-xs font-bold uppercase tracking-wide text-primary-dark mb-3">Talla</h3>
              <div className="flex flex-wrap gap-2.5">
                {availableSizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => toggle(sizes, size, setSizes)}
                    className={`min-w-11 h-10 px-3 rounded-[10px] text-sm font-semibold border ${
                      sizes.includes(size)
                        ? "border-primary-dark bg-line text-primary-dark border-2"
                        : "border-line bg-white text-ink"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {availableColors.length > 0 && (
            <div className="mb-6">
              <h3 className="text-xs font-bold uppercase tracking-wide text-primary-dark mb-3">Color</h3>
              <div className="flex flex-wrap gap-3">
                {availableColors.map((color) => (
                  <button
                    key={color}
                    type="button"
                    aria-label={color}
                    title={color}
                    onClick={() => toggle(colors, color, setColors)}
                    style={{ background: COLOR_HEX[color] ?? "#E8E1F0" }}
                    className={`w-7 h-7 rounded-full ${
                      colors.includes(color) ? "ring-2 ring-primary-dark ring-offset-2" : "border border-line"
                    }`}
                  />
                ))}
              </div>
            </div>
          )}

          <div className="mb-6">
            <h3 className="text-xs font-bold uppercase tracking-wide text-primary-dark mb-3">Precio</h3>
            <div className="flex gap-3">
              <label className="flex-1 text-[11px] text-muted">
                Mín
                <input
                  type="number"
                  min={0}
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  placeholder="S/ 0"
                  className="block w-full border border-line rounded-lg px-3 py-2.5 text-sm mt-1.5"
                />
              </label>
              <label className="flex-1 text-[11px] text-muted">
                Máx
                <input
                  type="number"
                  min={0}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  placeholder="S/ 500"
                  className="block w-full border border-line rounded-lg px-3 py-2.5 text-sm mt-1.5"
                />
              </label>
            </div>
          </div>

          {(sizes.length > 0 || colors.length > 0 || minPrice || maxPrice) && (
            <button
              type="button"
              onClick={() => {
                setSizes([]);
                setColors([]);
                setMinPrice("");
                setMaxPrice("");
              }}
              className="w-full text-sm font-semibold text-primary-dark underline"
            >
              Limpiar filtros
            </button>
          )}
        </div>
      </aside>

      {/* Grid */}
      <div className="flex-1 min-w-0 w-full">
        <div className="flex items-center justify-between gap-4 flex-wrap mb-6">
          <span className="text-sm text-muted">{filtered.length} resultados</span>
          <label className="relative flex items-center text-sm">
            <span className="sr-only">Ordenar por</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortOption)}
              className="appearance-none border border-line rounded-full pl-4 pr-10 py-2 text-sm bg-white"
            >
              <option value="recomendados">Ordenar</option>
              <option value="precio-asc">Precio: menor a mayor</option>
              <option value="precio-desc">Precio: mayor a menor</option>
              <option value="novedades">Novedades</option>
            </select>
            <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-muted">
              <ChevronDownIcon size={15} />
            </span>
          </label>
        </div>

        {filtered.length === 0 ? (
          <p className="text-muted text-sm py-12 text-center">
            No encontramos productos con esos filtros. Prueba quitando alguno.
          </p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
