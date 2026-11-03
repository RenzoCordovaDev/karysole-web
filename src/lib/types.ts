export type CategorySlug = "mujer" | "hombre" | "perfumeria" | "cuidado-piel";

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: CategorySlug;
  price: number;
  compareAtPrice: number | null;
  description: string;
  imageUrl: string | null;
  sizes: string[];
  colors: string[];
  isNew: boolean;
  createdAt: string;
}
