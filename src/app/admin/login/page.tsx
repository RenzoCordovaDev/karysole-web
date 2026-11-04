import { Suspense } from "react";
import { SunflowerMark } from "@/components/icons";
import { loginAction } from "./actions";

type SearchParams = Promise<{ error?: string; from?: string }>;

async function LoginForm({ searchParams }: { searchParams: SearchParams }) {
  const { error, from } = await searchParams;

  const errorMessage =
    error === "no-config"
      ? "Falta configurar ADMIN_PASSWORD en las variables de entorno."
      : error === "invalid"
        ? "Contraseña incorrecta."
        : null;

  return (
    <form action={loginAction} className="flex flex-col gap-4">
      <input type="hidden" name="from" value={from ?? "/admin/productos"} />

      <div>
        <label htmlFor="password" className="block text-xs font-bold uppercase tracking-wide text-primary-dark mb-2">
          Contraseña
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoFocus
          className="w-full h-11 px-3.5 rounded-[10px] border border-line bg-white text-sm focus:outline-none focus:border-primary-dark"
        />
      </div>

      {errorMessage && <p className="text-sm text-red-600">{errorMessage}</p>}

      <button
        type="submit"
        className="w-full h-12 bg-primary text-white rounded-full text-sm font-semibold hover:bg-primary-dark active:scale-[0.98] transition-all shadow-sm hover:shadow-md"
      >
        Entrar
      </button>
    </form>
  );
}

export default function AdminLoginPage({ searchParams }: { searchParams: SearchParams }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-cream px-5">
      <div className="w-full max-w-sm bg-white border border-line rounded-2xl p-8 shadow-sm">
        <div className="flex items-center gap-2.5 mb-6">
          <SunflowerMark size={32} />
          <span className="font-display font-semibold text-lg">KARYSOLÉ admin</span>
        </div>

        <Suspense fallback={<div className="h-[172px]" />}>
          <LoginForm searchParams={searchParams} />
        </Suspense>
      </div>
    </div>
  );
}
