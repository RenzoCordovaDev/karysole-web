import type { CategorySlug } from "./types";

export interface CategoryInfo {
  slug: CategorySlug;
  label: string;
  description: string;
}

export const CATEGORIES: CategoryInfo[] = [
  { slug: "mujer", label: "Mujer", description: "Vestidos, blusas, pantalones y faldas para cada día." },
  { slug: "hombre", label: "Hombre", description: "Camisas, pantalones y básicos con un toque moderno." },
  { slug: "perfumeria", label: "Perfumería", description: "Fragancias para cada ocasión." },
  { slug: "cuidado-piel", label: "Cuidado de piel", description: "Cremas y rutinas para brillar todos los días." },
];

export function getCategory(slug: string): CategoryInfo | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}

export function getCategoryLabel(slug: string): string {
  return getCategory(slug)?.label ?? slug;
}
