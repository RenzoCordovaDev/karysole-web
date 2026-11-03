-- Ejecuta este script en Supabase: Panel > SQL Editor > New query.
-- Crea la tabla de productos y permite lectura pública (necesaria para
-- que el catálogo se muestre sin que el visitante inicie sesión).

create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  category text not null check (category in ('mujer', 'hombre', 'perfumeria', 'cuidado-piel')),
  price numeric(10, 2) not null,
  compare_at_price numeric(10, 2),
  description text,
  image_url text,
  sizes text[] default '{}',
  colors text[] default '{}',
  is_new boolean default false,
  created_at timestamptz default now()
);

alter table products enable row level security;

-- Cualquiera puede leer el catálogo (es una tienda pública).
create policy "Lectura pública de productos"
  on products for select
  using (true);

-- Para agregar o editar productos, usa el Table Editor del panel de
-- Supabase (entra con tu cuenta: no pasa por esta política, así que no
-- hace falta una política de escritura pública).

-- Ejemplo de productos iniciales (opcional, puedes borrarlos o editarlos):
insert into products (slug, name, category, price, compare_at_price, description, sizes, colors, is_new)
values
  ('vestido-girasol-midi', 'Vestido Girasol Midi', 'mujer', 104, 149, 'Vestido midi en tono lila con caída fluida.', '{XS,S,M,L,XL}', '{Lila,Negro,Rosa}', true),
  ('camisa-lino-claro', 'Camisa Lino Claro', 'hombre', 54, 94.99, 'Camisa de lino de manga corta, fresca y liviana.', '{S,M,L,XL}', '{Verde,Blanco,Azul}', false),
  ('eau-de-parfum-sole', 'Eau de Parfum Solé', 'perfumeria', 89, null, 'Fragancia floral y cálida con notas de girasol y vainilla, 50ml.', '{50ml,100ml}', '{}', true),
  ('crema-hidratante-petalo', 'Crema Hidratante Pétalo', 'cuidado-piel', 42, null, 'Crema facial hidratante de uso diario con extracto de girasol.', '{50ml}', '{}', false)
on conflict (slug) do nothing;
