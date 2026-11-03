
import type { Plant } from "../../types/plant";
import PlantCard from "./PlantCard";

interface PlantGridProps {
  plants: Plant[];
  onSelect: (plant: Plant) => void;
}

export default function PlantGrid({
  plants,
  onSelect
}: PlantGridProps) {
  return (
    <div className="plant-grid">
      {plants.map(plant => (
        <PlantCard
          key={plant.id}
          plant={plant}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}
