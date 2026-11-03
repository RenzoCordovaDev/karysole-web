# KARYSOLÉ

Tienda online de ropa (mujer y hombre), perfumería y cuidado de piel. Construida con
Next.js, Tailwind CSS y Supabase, pensada para desplegarse gratis en Vercel.

## Stack

- **Next.js 16** (App Router) + TypeScript
- **Tailwind CSS 4** — paleta de marca definida en [`src/app/globals.css`](src/app/globals.css)
- **Supabase** — catálogo de productos (base de datos Postgres gratuita)
- **Carrito** en `localStorage` + **checkout por WhatsApp** (sin pasarela de pagos)

Mientras no conectes Supabase, la tienda funciona igual usando un catálogo de
ejemplo (`src/lib/sample-products.ts`), así puedes revisar todo el sitio sin
configurar nada primero.

## Primeros pasos (desarrollo local)

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Conectar Supabase (catálogo real)

1. Crea una cuenta gratis en [supabase.com](https://supabase.com) y un proyecto nuevo.
2. En el panel, ve a **SQL Editor** y ejecuta el contenido de
   [`supabase/schema.sql`](supabase/schema.sql). Esto crea la tabla `products`
   con permiso de lectura pública e inserta 4 productos de ejemplo.
3. Ve a **Project Settings → API** y copia la **URL** y la **anon public key**.
4. Copia `.env.local.example` como `.env.local` y pega esos valores:

   ```bash
   NEXT_PUBLIC_SUPABASE_URL=https://tuproyecto.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
   ```

5. Reinicia `npm run dev`. El catálogo ahora se lee desde Supabase.

Para agregar o editar productos, usa el **Table Editor** de Supabase
directamente (no hace falta un panel de administración aparte para el MVP).

## Configurar WhatsApp para pedidos

El botón "Finalizar pedido por WhatsApp" arma un mensaje con el resumen del
carrito y lo abre en WhatsApp. Para que abra directo tu número, agrega en
`.env.local`:

```bash
NEXT_PUBLIC_WHATSAPP_NUMBER=51999999999
```

(Formato internacional, sin "+" ni espacios.)

## Desplegar gratis en Vercel

1. Sube este proyecto a un repositorio de GitHub.
2. Entra a [vercel.com](https://vercel.com), conecta tu cuenta de GitHub e
   importa el repositorio.
3. En **Environment Variables**, agrega las mismas variables de tu
   `.env.local` (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`,
   `NEXT_PUBLIC_WHATSAPP_NUMBER`).
4. Deploy. Vercel te da un dominio gratuito (`tu-proyecto.vercel.app`); puedes
   conectar un dominio propio más adelante desde el mismo panel.

## Estructura del proyecto

```
src/
  app/
    page.tsx                 Home
    categoria/[slug]/        Catálogo por categoría (mujer, hombre, perfumeria, cuidado-piel)
    producto/[slug]/         Ficha de producto
    carrito/                 Carrito + checkout por WhatsApp
    nosotros/                Historia de la marca
    contacto/                Datos de contacto
  components/                Header, Footer, ProductCard, CatalogGrid, etc.
  lib/
    products.ts               Lectura de productos (Supabase o catálogo de ejemplo)
    cart.tsx                  Contexto del carrito (localStorage)
    whatsapp.ts                Arma el link de pedido por WhatsApp
supabase/schema.sql           Esquema SQL + productos de ejemplo
```

## Pendiente para una v2

- Panel de administración propio (por ahora: Table Editor de Supabase)
- Pagos en línea (Stripe) en lugar de / además de WhatsApp
- Cuentas de usuario e historial de pedidos
- Newsletter conectada a un proveedor real (Mailchimp, Resend, etc.)
