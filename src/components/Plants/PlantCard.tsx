
import { ArrowUpRight, Droplets, BookOpen } from "lucide-react";
import type { Plant } from "../../types/plant";

interface PlantCardProps {
  plant: Plant;
  onSelect: (plant: Plant) => void;
}

export default function PlantCard({
  plant,
  onSelect
}: PlantCardProps) {
  return (
    <button
      type="button"
      className="plant-card"
      onClick={() => onSelect(plant)}
    >
      <div className="plant-card-image">
        <img src={plant.image} alt={plant.name} />

        <span className="plant-category">
          {plant.category}
        </span>

        <span className="plant-card-arrow">
          <ArrowUpRight size={17} />
        </span>
      </div>

      <div className="plant-card-content">
        <div className="plant-card-heading">
          <h4>{plant.name}</h4>
          <span className="plant-species">{plant.species}</span>
        </div>

        <p className="plant-description">
          {plant.description || "A little green addition to your garden."}
        </p>

        <div className="plant-card-footer">
          <span>
            <Droplets size={14} />
            Every {plant.wateringFrequency} days
          </span>

          <span>
            <BookOpen size={14} />
            {plant.notes.length} notes
          </span>
        </div>
      </div>
    </button>
  );
}
