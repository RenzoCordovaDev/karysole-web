import type { ReactNode } from "react";
import { CATEGORIES } from "@/lib/categories";
import type { Product } from "@/lib/types";

export function ProductForm({
  action,
  product,
  error,
  submitLabel,
}: {
  action: (formData: FormData) => void | Promise<void>;
  product?: Product;
  error?: string;
  submitLabel: string;
}) {
  return (
    <form action={action} className="flex flex-col gap-5 max-w-xl">
      {error && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3.5 py-2.5">{error}</p>
      )}

      <Field label="Nombre">
        <input
          name="name"
          type="text"
          required
          defaultValue={product?.name}
          className="w-full h-11 px-3.5 rounded-[10px] border border-line bg-white text-sm focus:outline-none focus:border-primary-dark"
        />
      </Field>

      <Field label="Slug" hint="Déjalo vacío para generarlo automático desde el nombre.">
        <input
          name="slug"
          type="text"
          defaultValue={product?.slug}
          placeholder="se-genera-solo"
          className="w-full h-11 px-3.5 rounded-[10px] border border-line bg-white text-sm focus:outline-none focus:border-primary-dark"
        />
      </Field>

      <Field label="Categoría">
        <select
          name="category"
          required
          defaultValue={product?.category ?? ""}
          className="w-full h-11 px-3.5 rounded-[10px] border border-line bg-white text-sm focus:outline-none focus:border-primary-dark"
        >
          <option value="" disabled>
            Elige una categoría
          </option>
          {CATEGORIES.map((c) => (
            <option key={c.slug} value={c.slug}>
              {c.label}
            </option>
          ))}
        </select>
      </Field>

      <div className="flex gap-4">
        <Field label="Precio (S/)" className="flex-1">
          <input
            name="price"
            type="number"
            min="0.01"
            step="0.01"
            required
            defaultValue={product?.price}
            className="w-full h-11 px-3.5 rounded-[10px] border border-line bg-white text-sm focus:outline-none focus:border-primary-dark"
          />
        </Field>
        <Field label="Precio anterior (S/)" hint="Opcional, para mostrar descuento." className="flex-1">
          <input
            name="compareAtPrice"
            type="number"
            min="0.01"
            step="0.01"
            defaultValue={product?.compareAtPrice ?? ""}
            className="w-full h-11 px-3.5 rounded-[10px] border border-line bg-white text-sm focus:outline-none focus:border-primary-dark"
          />
        </Field>
      </div>

      <Field label="Descripción">
        <textarea
          name="description"
          rows={3}
          defaultValue={product?.description}
          className="w-full px-3.5 py-2.5 rounded-[10px] border border-line bg-white text-sm focus:outline-none focus:border-primary-dark"
        />
      </Field>

      <Field label="URL de imagen" hint="Opcional. Déjalo vacío si todavía no tienes fotos.">
        <input
          name="imageUrl"
          type="text"
          defaultValue={product?.imageUrl ?? ""}
          className="w-full h-11 px-3.5 rounded-[10px] border border-line bg-white text-sm focus:outline-none focus:border-primary-dark"
        />
      </Field>

      <div className="flex gap-4">
        <Field label="Tallas" hint="Separadas por coma: S, M, L" className="flex-1">
          <input
            name="sizes"
            type="text"
            defaultValue={product?.sizes.join(", ")}
            className="w-full h-11 px-3.5 rounded-[10px] border border-line bg-white text-sm focus:outline-none focus:border-primary-dark"
          />
        </Field>
        <Field label="Colores" hint="Separados por coma: Lila, Negro" className="flex-1">
          <input
            name="colors"
            type="text"
            defaultValue={product?.colors.join(", ")}
            className="w-full h-11 px-3.5 rounded-[10px] border border-line bg-white text-sm focus:outline-none focus:border-primary-dark"
          />
        </Field>
      </div>

      <label className="flex items-center gap-2.5 text-sm font-medium">
        <input type="checkbox" name="isNew" defaultChecked={product?.isNew} className="w-4 h-4" />
        Marcar como nuevo
      </label>

      <button
        type="submit"
        className="w-full md:w-auto h-12 px-6 bg-primary text-white rounded-full text-sm font-semibold hover:bg-primary-dark active:scale-[0.98] transition-all shadow-sm hover:shadow-md"
      >
        {submitLabel}
      </button>
    </form>
  );
}

function Field({
  label,
  hint,
  className = "",
  children,
}: {
  label: string;
  hint?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={className}>
      <label className="block text-xs font-bold uppercase tracking-wide text-primary-dark mb-2">{label}</label>
      {children}
      {hint && <p className="text-xs text-muted mt-1.5">{hint}</p>}
    </div>
  );
}
