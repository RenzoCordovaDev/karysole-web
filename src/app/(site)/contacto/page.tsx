import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contacto — KARYSOLÉ",
};

export default function ContactoPage() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;

  return (
    <div className="max-w-xl mx-auto px-5 md:px-10 py-16">
      <h1 className="font-display font-semibold text-3xl mb-3">Contacto</h1>
      <p className="text-muted mb-8">
        ¿Tienes dudas sobre una talla, un pedido o un cambio? Escríbenos, te respondemos con gusto.
      </p>

      <div className="flex flex-col gap-4">
        <a
          href={whatsappNumber ? `https://wa.me/${whatsappNumber.replace(/\D/g, "")}` : "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between bg-white border border-line rounded-2xl px-5 py-4"
        >
          <span className="font-semibold">WhatsApp</span>
          <span className="text-muted text-sm">{whatsappNumber ?? "Configura tu número en .env.local"}</span>
        </a>

        <a
          href="mailto:hola@karysole.com"
          className="flex items-center justify-between bg-white border border-line rounded-2xl px-5 py-4"
        >
          <span className="font-semibold">Correo</span>
          <span className="text-muted text-sm">hola@karysole.com</span>
        </a>

        <div className="flex items-center justify-between bg-white border border-line rounded-2xl px-5 py-4">
          <span className="font-semibold">Ubicación</span>
          <span className="text-muted text-sm">[Tu ciudad]</span>
        </div>
      </div>
    </div>
  );
}
