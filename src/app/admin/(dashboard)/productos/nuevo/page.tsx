import { Suspense } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ProductForm } from "@/components/admin/ProductForm";
import { isSupabaseAdminConfigured } from "@/lib/supabase-admin";
import { createProductAction } from "../actions";

type SearchParams = Promise<{ error?: string }>;

async function NewProductForm({ searchParams }: { searchParams: SearchParams }) {
  const { error } = await searchParams;
  return <ProductForm action={createProductAction} error={error} submitLabel="Crear producto" />;
}

export default function NewProductPage({ searchParams }: { searchParams: SearchParams }) {
  if (!isSupabaseAdminConfigured) {
    redirect("/admin/productos");
  }

  return (
    <div>
      <Link href="/admin/productos" className="text-sm text-muted hover:text-ink mb-4 inline-block">
        ← Volver a productos
      </Link>
      <h1 className="font-display font-semibold text-2xl mb-6">Nuevo producto</h1>
      <Suspense fallback={null}>
        <NewProductForm searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
