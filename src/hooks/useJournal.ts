
import { useCallback } from "react";
import type { Dispatch, SetStateAction } from "react";
import type { Plant } from "../types/plant";
import type { PlantNote } from "../types/journal";

interface UseJournalProps {
  plants: Plant[];
  setPlants: Dispatch<SetStateAction<Plant[]>>;
}

export function useJournal({ plants, setPlants }: UseJournalProps) {
  const getNotes = useCallback(
    (plantId: string) => {
      return plants.find(plant => plant.id === plantId)?.notes ?? [];
    },
    [plants]
  );

  const addNote = useCallback(
    (plantId: string, content: string, image?: string) => {
      const note: PlantNote = {
        id: crypto.randomUUID(),
        content,
        date: new Date().toISOString(),
        image
      };

      setPlants(current =>
        current.map(plant =>
          plant.id === plantId
            ? { ...plant, notes: [note, ...plant.notes] }
            : plant
        )
      );

      return note;
    },
    [setPlants]
  );

  const deleteNote = useCallback(
    (plantId: string, noteId: string) => {
      setPlants(current =>
        current.map(plant =>
          plant.id === plantId
            ? {
                ...plant,
                notes: plant.notes.filter(note => note.id !== noteId)
              }
            : plant
        )
      );
    },
    [setPlants]
  );

  return {
    getNotes,
    addNote,
    deleteNote
  };
}
