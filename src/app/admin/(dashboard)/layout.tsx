import type { ReactNode } from "react";
import Link from "next/link";
import { SunflowerMark } from "@/components/icons";
import { LogoutButton } from "@/components/admin/LogoutButton";

export default function AdminDashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-line bg-white">
        <div className="max-w-6xl mx-auto px-5 md:px-10 h-16 flex items-center justify-between">
          <Link href="/admin/productos" className="flex items-center gap-2.5">
            <SunflowerMark size={28} />
            <span className="font-display font-semibold">KARYSOLÉ admin</span>
          </Link>

          <nav className="flex items-center gap-6">
            <Link href="/admin/productos" className="text-sm font-medium hover:text-primary-dark">
              Productos
            </Link>
            <LogoutButton />
          </nav>
        </div>
      </header>

      <main className="flex-1 max-w-6xl mx-auto w-full px-5 md:px-10 py-8">{children}</main>
    </div>
  );
}
