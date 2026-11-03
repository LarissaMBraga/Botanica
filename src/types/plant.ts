
import type { PlantNote } from "./journal";

export type { PlantNote } from "./journal";

export type PlantCategory =
  | "Indoor"
  | "Outdoor"
  | "Succulent"
  | "Herb"
  | "Tropical"
  | "Other";

export interface Plant {
  id: string;
  name: string;
  species: string;
  category: PlantCategory;
  plantedAt: string;
  wateringFrequency: number;
  description: string;
  image: string;
  notes: PlantNote[];
  createdAt: string;
}

export type PlantFormData = Omit<
  Plant,
  "id" | "notes" | "createdAt"
>;
