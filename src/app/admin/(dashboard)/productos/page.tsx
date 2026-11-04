import { Suspense } from "react";
import Link from "next/link";
import { supabaseAdmin, isSupabaseAdminConfigured } from "@/lib/supabase-admin";
import { mapRow, type ProductRow } from "@/lib/products";
import { sampleProducts } from "@/lib/sample-products";
import { getCategoryLabel } from "@/lib/categories";
import { PlusIcon, PencilIcon } from "@/components/icons";
import { DeleteProductButton } from "@/components/admin/DeleteProductButton";
import { Skeleton } from "@/components/Skeleton";
import type { Product } from "@/lib/types";

type SearchParams = Promise<{ created?: string; updated?: string; deleted?: string; error?: string }>;

async function loadProducts(): Promise<Product[]> {
  if (!isSupabaseAdminConfigured || !supabaseAdmin) {
    return [...sampleProducts].sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
  }

  const { data, error } = await supabaseAdmin
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  if (error || !data) return [];
  return (data as ProductRow[]).map(mapRow);
}

function ProductsListSkeleton() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <Skeleton className="h-8 w-40" />
        <Skeleton className="h-11 w-40 rounded-full" />
      </div>
      <div className="bg-white border border-line rounded-2xl p-4 flex flex-col gap-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-10 w-full" />
        ))}
      </div>
    </div>
  );
}

async function ProductsList({ searchParams }: { searchParams: SearchParams }) {
  const { created, updated, deleted, error } = await searchParams;
  const products = await loadProducts();

  const successMessage = created
    ? "Producto creado."
    : updated
      ? "Producto actualizado."
      : deleted
        ? "Producto eliminado."
        : null;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display font-semibold text-2xl">Productos</h1>
        {isSupabaseAdminConfigured && (
          <Link
            href="/admin/productos/nuevo"
            className="h-11 px-5 inline-flex items-center gap-2 bg-primary text-white rounded-full text-sm font-semibold hover:bg-primary-dark active:scale-[0.98] transition-all shadow-sm"
          >
            <PlusIcon size={15} />
            Nuevo producto
          </Link>
        )}
      </div>

      {!isSupabaseAdminConfigured && (
        <p className="text-sm bg-amber-50 border border-amber-200 text-amber-900 rounded-lg px-4 py-3 mb-6">
          Supabase no está configurado todavía, así que esto es una vista previa del catálogo de
          ejemplo (solo lectura). Agrega <code>NEXT_PUBLIC_SUPABASE_URL</code> y{" "}
          <code>SUPABASE_SERVICE_ROLE_KEY</code> en <code>.env.local</code> para poder crear, editar y
          eliminar productos reales.
        </p>
      )}

      {successMessage && (
        <p className="text-sm bg-green-50 border border-green-200 text-green-800 rounded-lg px-4 py-3 mb-6">
          {successMessage}
        </p>
      )}

      {error && (
        <p className="text-sm bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 mb-6">
          {error}
        </p>
      )}

      <div className="bg-white border border-line rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-line text-left text-xs uppercase tracking-wide text-muted">
              <th className="px-4 py-3">Producto</th>
              <th className="px-4 py-3">Categoría</th>
              <th className="px-4 py-3">Precio</th>
              <th className="px-4 py-3 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b border-line last:border-0">
                <td className="px-4 py-3 font-medium">{product.name}</td>
                <td className="px-4 py-3 text-muted">{getCategoryLabel(product.category)}</td>
                <td className="px-4 py-3">S/ {product.price.toFixed(2)}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-2">
                    {isSupabaseAdminConfigured && (
                      <>
                        <Link
                          href={`/admin/productos/${product.id}`}
                          aria-label={`Editar ${product.name}`}
                          className="w-9 h-9 rounded-full border border-line flex items-center justify-center hover:bg-line transition-colors"
                        >
                          <PencilIcon size={15} />
                        </Link>
                        <DeleteProductButton
                          id={product.id}
                          name={product.name}
                          category={product.category}
                          slug={product.slug}
                        />
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function AdminProductsPage({ searchParams }: { searchParams: SearchParams }) {
  return (
    <Suspense fallback={<ProductsListSkeleton />}>
      <ProductsList searchParams={searchParams} />
    </Suspense>
  );
}
