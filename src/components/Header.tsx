"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useCart } from "@/lib/cart";
import { CATEGORIES } from "@/lib/categories";
import { CartIcon, CloseIcon, MenuIcon, SearchIcon, SunflowerMark } from "./icons";

export function Header() {
  const pathname = usePathname();
  const { count } = useCart();
  const [open, setOpen] = useState(false);

  const navLinks = [
    ...CATEGORIES.map((c) => ({ href: `/categoria/${c.slug}`, label: c.label })),
    { href: "/nosotros", label: "Nosotros" },
  ];

  return (
    <>
      <div className="bg-primary-dark text-white text-center text-[13px] font-medium py-2 px-4 tracking-wide">
        Envío a todo el país · Nuevos ingresos cada semana · Pagos vía transferencia o WhatsApp
      </div>

      <header className="sticky top-0 z-20 bg-cream border-b border-line">
        <div className="max-w-6xl mx-auto px-5 md:px-10 py-4 flex items-center justify-between gap-6">
          <Link href="/" className="flex items-center gap-2.5 shrink-0" aria-label="KARYSOLÉ, inicio">
            <SunflowerMark size={34} />
            <span className="font-display font-semibold text-xl md:text-2xl tracking-tight text-ink">
              KARYSOLÉ
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8" aria-label="Navegación principal">
            {navLinks.map((link) => {
              const active = pathname === link.href || pathname?.startsWith(`${link.href}/`);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-[15px] font-medium pb-0.5 border-b-2 transition-colors ${
                    active
                      ? "text-primary-dark font-semibold border-accent"
                      : "text-ink border-transparent hover:text-primary-dark"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3 md:gap-4 text-ink">
            <button aria-label="Buscar" className="hidden sm:flex p-1 hover:text-primary-dark">
              <SearchIcon />
            </button>
            <Link href="/carrito" aria-label={`Carrito, ${count} productos`} className="relative p-1 hover:text-primary-dark">
              <CartIcon />
              {count > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-accent text-ink text-[11px] font-bold rounded-full min-w-[16px] h-4 flex items-center justify-center px-1">
                  {count}
                </span>
              )}
            </Link>
            <button
              aria-label={open ? "Cerrar menú" : "Abrir menú"}
              className="md:hidden p-1"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>

        {open && (
          <nav className="md:hidden px-5 pb-5 flex flex-col gap-4 border-t border-line pt-4" aria-label="Navegación móvil">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[15px] font-medium text-ink"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}
      </header>
    </>
  );
}
