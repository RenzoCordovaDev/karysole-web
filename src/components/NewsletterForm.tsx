"use client";

import { useState, type FormEvent } from "react";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email) return;
    // MVP: sin backend de newsletter todavía. Queda listo para conectar
    // a Supabase (tabla `subscribers`) o a un proveedor como Mailchimp.
    setSent(true);
  }

  if (sent) {
    return <p className="text-white font-medium">¡Gracias! Te avisaremos de las novedades. 🌻</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-wrap gap-3 justify-center">
      <label htmlFor="newsletter-email" className="sr-only">
        Correo electrónico
      </label>
      <input
        id="newsletter-email"
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="tu@correo.com"
        className="border-none rounded-full px-5 py-3.5 text-sm w-[260px] max-w-full"
      />
      <button type="submit" className="bg-accent text-ink rounded-full px-7 py-3.5 font-semibold text-sm">
        Suscribirme
      </button>
    </form>
  );
}
