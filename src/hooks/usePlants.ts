
import { useLocalStorage } from "./useLocalStorage";
import { useJournal } from "./useJournal";
import { initialPlants } from "../data/initialPlants";
import type { Plant } from "../types/plant";

export function usePlants() {
  const [plants, setPlants] = useLocalStorage<Plant[]>(
    "botanica-plants",
    initialPlants
  );

  const journal = useJournal({
    plants,
    setPlants
  });

  function addPlant(plant: Omit<Plant, "id" | "notes" | "createdAt">) {
    const newPlant: Plant = {
      ...plant,
      id: crypto.randomUUID(),
      notes: [],
      createdAt: new Date().toISOString()
    };

    setPlants(current => [newPlant, ...current]);

    return newPlant;
  }

  function updatePlant(id: string, updates: Partial<Plant>) {
    setPlants(current =>
      current.map(plant =>
        plant.id === id ? { ...plant, ...updates } : plant
      )
    );
  }

  function deletePlant(id: string) {
    setPlants(current => current.filter(plant => plant.id !== id));
  }

  return {
    plants,
    setPlants,
    addPlant,
    updatePlant,
    deletePlant,
    ...journal
  };
}
