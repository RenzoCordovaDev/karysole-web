import type { Metadata } from "next";
import { SunflowerMark } from "@/components/icons";

export const metadata: Metadata = {
  title: "Sobre nosotros — KARYSOLÉ",
};

export default function NosotrosPage() {
  return (
    <div className="max-w-3xl mx-auto px-5 md:px-10 py-16 text-center">
      <div className="w-44 h-44 mx-auto rounded-full bg-gradient-to-br from-line to-primary flex items-center justify-center mb-8">
        <SunflowerMark size={90} />
      </div>

      <span className="inline-block bg-line text-primary-dark text-[13px] font-semibold uppercase tracking-wide px-3.5 py-1.5 rounded-full mb-5">
        Nuestra historia
      </span>

      <h1 className="font-display font-semibold text-3xl md:text-4xl mb-5">
        La historia detrás del nombre
      </h1>

      <p className="text-[16px] leading-relaxed text-muted mb-5">
        KARYSOLÉ nace de Karyn y del girasol: una flor que siempre busca la luz. Cada prenda y cada
        producto que elegimos busca lo mismo para quien lo usa — calidez, sencillez y un poco de
        brillo propio en el día a día.
      </p>

      <p className="text-[16px] leading-relaxed text-muted">
        Elegimos cada prenda, fragancia y producto de cuidado con calma, pensando en que se sientan
        tan bien como se ven. Por eso cuidamos los detalles, desde la selección hasta el empaque de
        cada pedido.
      </p>
    </div>
  );
}
