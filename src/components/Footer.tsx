import Link from "next/link";
import { CATEGORIES } from "@/lib/categories";
import { SunflowerMark } from "./icons";

export function Footer() {
  return (
    <footer className="bg-primary-dark text-white pt-14 pb-7">
      <div className="max-w-6xl mx-auto px-5 md:px-10 grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
        <div className="col-span-2 md:col-span-1">
          <div className="flex items-center gap-2.5 mb-3">
            <SunflowerMark size={28} centerColor="#FFFFFF" />
            <span className="font-display font-semibold text-lg">KARYSOLÉ</span>
          </div>
          <p className="text-sm leading-relaxed opacity-85 max-w-[240px]">
            Ropa y cuidado personal elegidos con calma, para que siempre encuentres tu luz.
          </p>
        </div>

        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wide opacity-90 mb-3">Categorías</h4>
          <ul className="flex flex-col gap-2 text-sm opacity-85">
            {CATEGORIES.map((c) => (
              <li key={c.slug}>
                <Link href={`/categoria/${c.slug}`}>{c.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wide opacity-90 mb-3">Ayuda</h4>
          <ul className="flex flex-col gap-2 text-sm opacity-85">
            <li>
              <Link href="/nosotros">Sobre nosotros</Link>
            </li>
            <li>
              <Link href="/contacto">Contacto</Link>
            </li>
            <li>
              <Link href="/carrito">Mi carrito</Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wide opacity-90 mb-3">Contacto</h4>
          <ul className="flex flex-col gap-2 text-sm opacity-85">
            <li>WhatsApp: [tu número]</li>
            <li>[correo@karysole.com]</li>
            <li>[Ciudad]</li>
          </ul>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-5 md:px-10 border-t border-white/20 mt-10 pt-5 text-center text-[13px] opacity-70">
        © 2026 KARYSOLÉ. Todos los derechos reservados.
      </div>
    </footer>
  );
}
