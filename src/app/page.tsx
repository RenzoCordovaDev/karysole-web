import Link from "next/link";
import { CATEGORIES } from "@/lib/categories";
import { getFeaturedProducts } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";
import { NewsletterForm } from "@/components/NewsletterForm";
import { HeroSlider } from "@/components/HeroSlider";

export default async function HomePage() {
  const products = await getFeaturedProducts(4);

  return (
    <>
      {/* Hero */}
      <section className="max-w-6xl mx-auto px-5 md:px-10 py-14 md:py-20 flex flex-wrap items-center gap-12 md:gap-14">
        <div className="flex-1 min-w-[300px]">
          <h1 className="font-display font-semibold text-4xl md:text-5xl leading-[1.1] mb-5">
            Floreciendo,
            <br />a tu manera.
          </h1>
          <p className="text-[17px] leading-relaxed text-muted max-w-md mb-8">
            Ropa para mujer y hombre, perfumes y cuidado de piel, elegidos con calma. Una tienda
            pensada para sentirse tan bien como se ve.
          </p>
          <div className="flex flex-wrap gap-3.5">
            <a
              href="#productos"
              className="bg-accent text-ink rounded-full px-8 py-4 font-semibold text-[15px]"
            >
              Ver colección
            </a>
            <Link
              href="/categoria/mujer"
              className="border-[1.5px] border-primary-dark text-ink rounded-full px-8 py-4 font-semibold text-[15px]"
            >
              Explorar categorías
            </Link>
          </div>
        </div>
        <div className="flex-1 min-w-[300px]">
          <HeroSlider />
        </div>
      </section>

      {/* Featured products */}
      <section id="productos" className="max-w-6xl mx-auto px-5 md:px-10 pb-20">
        <div className="text-center mb-4">
          <span className="inline-block bg-line text-primary-dark text-[13px] font-semibold uppercase tracking-wide px-3.5 py-1.5 rounded-full">
            Lo más nuevo
          </span>
        </div>
        <div className="flex items-baseline justify-between flex-wrap gap-3 mb-7">
          <h2 className="font-display font-semibold text-3xl md:text-4xl">Nuevos ingresos</h2>
          <Link href="/categoria/mujer" className="text-sm font-semibold text-primary-dark">
            Ver todo →
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-6xl mx-auto px-5 md:px-10 pb-20">
        <div className="text-center mb-9">
          <h2 className="font-display font-semibold text-3xl mb-2">Explora por categoría</h2>
          <p className="text-[15px] text-muted">Para ella, para él, y para cuidarte todos los días</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {CATEGORIES.map((category) => (
            <Link
              key={category.slug}
              href={`/categoria/${category.slug}`}
              className="relative block rounded-[20px] overflow-hidden aspect-[3/4] bg-gradient-to-br from-primary to-line"
            >
              <span className="absolute inset-0 bg-gradient-to-t from-ink/55 to-transparent" />
              <span className="absolute bottom-4 left-4 text-white font-display font-semibold text-xl">
                {category.label}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-primary py-16">
        <div className="max-w-6xl mx-auto px-5 md:px-10 text-center">
          <h2 className="font-display font-semibold text-[28px] text-white mb-2.5">
            Sé parte del jardín KARYSOLÉ
          </h2>
          <p className="text-[15px] text-white/90 mb-7">
            Entérate antes que nadie de nuevos ingresos y promociones.
          </p>
          <NewsletterForm />
        </div>
      </section>
    </>
  );
}
