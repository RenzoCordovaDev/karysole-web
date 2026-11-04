"use client";

import { useTransition } from "react";
import { TrashIcon } from "@/components/icons";
import type { CategorySlug } from "@/lib/types";
import { deleteProductAction } from "@/app/admin/(dashboard)/productos/actions";

export function DeleteProductButton({
  id,
  name,
  category,
  slug,
}: {
  id: string;
  name: string;
  category: CategorySlug;
  slug: string;
}) {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      type="button"
      aria-label={`Eliminar ${name}`}
      disabled={isPending}
      onClick={() => {
        if (!window.confirm(`¿Eliminar "${name}"? Esta acción no se puede deshacer.`)) return;
        startTransition(() => {
          deleteProductAction(id, category, slug);
        });
      }}
      className="w-9 h-9 rounded-full border border-line flex items-center justify-center text-ink hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition-colors disabled:opacity-50"
    >
      <TrashIcon size={15} />
    </button>
  );
}
