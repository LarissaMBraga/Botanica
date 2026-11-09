
import type { Plant } from "../types/plant";

export const initialPlants: Plant[] = [
  {
    id: "plant-1",
    name: "Monstera",
    species: "Monstera deliciosa",
    category: "Tropical",
    plantedAt: "2026-08-12",
    wateringFrequency: 7,
    description: "A tropical plant with beautiful split leaves.",
    image:
      "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=max&w=600&q=75",
    notes: [
      {
        id: "note-1",
        content: "New leaves are starting to grow.",
        date: "2026-10-20"
      }
    ],
    createdAt: "2026-08-12"
  },
  {
    id: "plant-2",
    name: "Snake Plant",
    species: "Dracaena trifasciata",
    category: "Indoor",
    plantedAt: "2026-07-05",
    wateringFrequency: 14,
    description: "A resilient plant that needs little maintenance.",
    image:
      "https://images.unsplash.com/photo-1593482892290-f54927ae1bb6?auto=format&fit=max&w=600&q=75",
    notes: [],
    createdAt: "2026-07-05"
  },
  {
    id: "plant-3",
    name: "Echeveria",
    species: "Echeveria elegans",
    category: "Succulent",
    plantedAt: "2026-09-18",
    wateringFrequency: 12,
    description: "A small succulent with beautiful rosette leaves.",
    image:
      "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=max&w=600&q=75",
    notes: [],
    createdAt: "2026-09-18"
  }
];
