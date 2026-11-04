import { Suspense } from "react";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ProductForm } from "@/components/admin/ProductForm";
import { supabaseAdmin, isSupabaseAdminConfigured } from "@/lib/supabase-admin";
import { mapRow, type ProductRow } from "@/lib/products";
import { updateProductAction } from "../actions";

type Params = Promise<{ id: string }>;
type SearchParams = Promise<{ error?: string }>;

async function EditProductForm({
  params,
  searchParams,
}: {
  params: Params;
  searchParams: SearchParams;
}) {
  if (!isSupabaseAdminConfigured || !supabaseAdmin) {
    redirect("/admin/productos");
  }

  const { id } = await params;
  const { error } = await searchParams;

  const { data, error: fetchError } = await supabaseAdmin
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  if (fetchError || !data) notFound();

  const product = mapRow(data as ProductRow);

  return (
    <ProductForm
      action={updateProductAction.bind(null, product.id)}
      product={product}
      error={error}
      submitLabel="Guardar cambios"
    />
  );
}

export default function EditProductPage({
  params,
  searchParams,
}: {
  params: Params;
  searchParams: SearchParams;
}) {
  return (
    <div>
      <Link href="/admin/productos" className="text-sm text-muted hover:text-ink mb-4 inline-block">
        ← Volver a productos
      </Link>
      <h1 className="font-display font-semibold text-2xl mb-6">Editar producto</h1>
      <Suspense fallback={null}>
        <EditProductForm params={params} searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
