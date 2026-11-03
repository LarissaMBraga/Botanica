
import { ArrowUpRight } from "lucide-react";
import type { Plant } from "../../types/plant";
import PlantGrid from "../Plants/PlantGrid";
import EmptyState from "../Common/EmptyState";

interface RecentPlantsProps {
  plants: Plant[];
  onViewAll: () => void;
  onSelect: (plant: Plant) => void;
  onAdd: () => void;
}

export default function RecentPlants({
  plants,
  onViewAll,
  onSelect,
  onAdd
}: RecentPlantsProps) {
  return (
    <>
      <div className="section-title-row">
        <div>
          <span className="eyebrow">A LITTLE BIT OF GREEN</span>
          <h3>Recently added</h3>
        </div>

        <button className="text-button" onClick={onViewAll}>
          View collection <ArrowUpRight size={16} />
        </button>
      </div>

      {plants.length > 0 ? (
        <PlantGrid
          plants={plants.slice(0, 3)}
          onSelect={onSelect}
        />
      ) : (
        <EmptyState
          title="Your garden is waiting."
          description="Add your first plant and start documenting its journey."
          actionLabel="Add your first plant"
          onAction={onAdd}
        />
      )}
    </>
  );
}
