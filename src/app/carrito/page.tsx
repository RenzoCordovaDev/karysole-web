"use client";

import Link from "next/link";
import { itemKey, useCart } from "@/lib/cart";
import { buildWhatsAppOrderLink } from "@/lib/whatsapp";

export default function CartPage() {
  const { items, updateQuantity, removeItem, subtotal } = useCart();

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-5 md:px-10 py-20 text-center">
        <h1 className="font-display font-semibold text-3xl mb-3">Tu carrito está vacío</h1>
        <p className="text-muted mb-8">Explora la colección y encuentra algo que te haga florecer.</p>
        <Link href="/" className="bg-accent text-ink rounded-full px-8 py-3.5 font-semibold text-[15px]">
          Ver colección
        </Link>
      </div>
    );
  }

  const whatsappLink = buildWhatsAppOrderLink(items, subtotal);

  return (
    <div className="max-w-4xl mx-auto px-5 md:px-10 py-10">
      <h1 className="font-display font-semibold text-3xl mb-8">Tu carrito</h1>

      <div className="flex flex-col gap-4 mb-8">
        {items.map((item) => {
          const key = itemKey(item);
          return (
            <div key={key} className="flex items-center gap-4 bg-white border border-line rounded-2xl p-4">
              <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-line to-primary shrink-0" />

              <div className="flex-1 min-w-0">
                <p className="font-display font-semibold">{item.name}</p>
                {(item.size || item.color) && (
                  <p className="text-xs text-muted">
                    {[item.size, item.color].filter(Boolean).join(" · ")}
                  </p>
                )}
                <p className="text-sm font-semibold mt-1">S/ {item.price.toFixed(2)}</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  aria-label={`Restar cantidad de ${item.name}`}
                  onClick={() => updateQuantity(key, item.quantity - 1)}
                  className="w-8 h-8 rounded-full border border-line font-semibold"
                >
                  −
                </button>
                <span className="w-6 text-center text-sm font-semibold">{item.quantity}</span>
                <button
                  type="button"
                  aria-label={`Sumar cantidad de ${item.name}`}
                  onClick={() => updateQuantity(key, item.quantity + 1)}
                  className="w-8 h-8 rounded-full border border-line font-semibold"
                >
                  +
                </button>
              </div>

              <button
                type="button"
                aria-label={`Quitar ${item.name} del carrito`}
                onClick={() => removeItem(key)}
                className="text-sm text-muted hover:text-ink underline shrink-0"
              >
                Quitar
              </button>
            </div>
          );
        })}
      </div>

      <div className="bg-white border border-line rounded-2xl p-6 flex flex-col gap-4">
        <div className="flex items-center justify-between text-lg font-semibold">
          <span>Subtotal</span>
          <span>S/ {subtotal.toFixed(2)}</span>
        </div>
        <p className="text-sm text-muted -mt-2">
          El envío y la confirmación final se coordinan por WhatsApp.
        </p>
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full h-12 flex items-center justify-center bg-accent text-ink rounded-full text-sm font-semibold hover:brightness-95 active:scale-[0.98] transition-all shadow-sm hover:shadow-md"
        >
          Finalizar pedido por WhatsApp
        </a>
      </div>
    </div>
  );
}
