"use client";

import { useEffect, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "./icons";

interface Slide {
  id: string;
  label: string;
  gradient: string;
}

/**
 * Placeholders mientras llegan las fotos reales de modelos de la clienta.
 * Para usar fotos reales: agrega los archivos en /public/hero/ y reemplaza
 * cada slide por un <Image src="/hero/archivo.jpg" .../> (ver comentario
 * más abajo en el render).
 */
const SLIDES: Slide[] = [
  { id: "mujer", label: "Vestidos y blusas", gradient: "from-primary to-line" },
  { id: "hombre", label: "Camisas y básicos", gradient: "from-primary-dark to-primary" },
  { id: "perfumeria", label: "Perfumería", gradient: "from-accent to-cream" },
  { id: "piel", label: "Cuidado de piel", gradient: "from-line to-primary" },
];

const INTERVAL_MS = 4500;

export function HeroSlider() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % SLIDES.length);
    }, INTERVAL_MS);
    return () => clearInterval(id);
  }, [paused]);

  function goTo(i: number) {
    setIndex(i);
  }
  function prev() {
    setIndex((i) => (i - 1 + SLIDES.length) % SLIDES.length);
  }
  function next() {
    setIndex((i) => (i + 1) % SLIDES.length);
  }

  return (
    <div
      className="relative aspect-[16/10] md:aspect-[4/3] rounded-[28px] overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {SLIDES.map((slide, i) => (
        // Reemplazo futuro: <Image src={`/hero/${slide.id}.jpg`} alt={slide.label} fill className="object-cover" />
        <div
          key={slide.id}
          aria-hidden={i !== index}
          className={`absolute inset-0 flex items-center justify-center bg-gradient-to-br ${slide.gradient} transition-opacity duration-700 ease-in-out ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
        >
          <span className="absolute bottom-4 left-4 bg-white/85 text-ink text-xs font-semibold px-3 py-1.5 rounded-full">
            [FOTO: {slide.label}]
          </span>
        </div>
      ))}

      <button
        type="button"
        onClick={prev}
        aria-label="Foto anterior"
        className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 hover:bg-white flex items-center justify-center text-ink shadow-sm transition-colors"
      >
        <ChevronLeftIcon size={17} />
      </button>
      <button
        type="button"
        onClick={next}
        aria-label="Foto siguiente"
        className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 hover:bg-white flex items-center justify-center text-ink shadow-sm transition-colors"
      >
        <ChevronRightIcon size={17} />
      </button>

      <div className="absolute bottom-4 right-4 flex gap-2">
        {SLIDES.map((slide, i) => (
          <button
            key={slide.id}
            type="button"
            aria-label={`Ir a la foto ${i + 1} de ${SLIDES.length}`}
            aria-current={i === index}
            onClick={() => goTo(i)}
            className={`w-2.5 h-2.5 rounded-full transition-colors ${i === index ? "bg-white" : "bg-white/50 hover:bg-white/75"}`}
          />
        ))}
      </div>
    </div>
  );
}
