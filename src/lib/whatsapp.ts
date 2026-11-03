import type { CartItem } from "./cart";

/**
 * Número de WhatsApp de la tienda, en formato internacional sin "+"
 * (ej. 51999999999). Se configura en .env.local como
 * NEXT_PUBLIC_WHATSAPP_NUMBER.
 */
export function buildWhatsAppOrderLink(items: CartItem[], subtotal: number): string {
  const lines = [
    "¡Hola KARYSOLÉ! Quiero hacer este pedido:",
    "",
    ...items.map((item) => {
      const variant = [item.size, item.color].filter(Boolean).join(" · ");
      const variantText = variant ? ` (${variant})` : "";
      return `• ${item.name}${variantText} x${item.quantity} — S/ ${(item.price * item.quantity).toFixed(2)}`;
    }),
    "",
    `Total: S/ ${subtotal.toFixed(2)}`,
    "",
    "Quedo atento/a para coordinar el pago y el envío. ¡Gracias!",
  ];

  const text = encodeURIComponent(lines.join("\n"));
  const rawNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "";
  const number = rawNumber.replace(/\D/g, "");

  return number ? `https://wa.me/${number}?text=${text}` : `https://wa.me/?text=${text}`;
}
