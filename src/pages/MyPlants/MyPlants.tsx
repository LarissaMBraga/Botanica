
import { useMemo, useState } from "react";
import { Plus, Search, Sprout } from "lucide-react";
import type { Plant } from "../../types/plant";
import PlantGrid from "../../components/Plants/PlantGrid";
import EmptyState from "../../components/Common/EmptyState";
import "./MyPlants.css";

interface MyPlantsProps {
  plants: Plant[];
  onAdd: () => void;
  onSelect: (plant: Plant) => void;
}

export default function MyPlants({
  plants,
  onAdd,
  onSelect
}: MyPlantsProps) {
  const [search, setSearch] = useState("");

  const filteredPlants = useMemo(() => {
    const query = search.toLowerCase().trim();

    return plants.filter(plant =>
      plant.name.toLowerCase().includes(query) ||
      plant.species.toLowerCase().includes(query) ||
      plant.category.toLowerCase().includes(query)
    );
  }, [plants, search]);

  return (
    <section className="my-plants-page">
      <div className="collection-heading">
        <div>
          <span className="eyebrow">YOUR PERSONAL GARDEN</span>
          <h2>My plants<span className="heading-period">.</span></h2>
          <p>
            Every plant has a story. Keep yours growing.
          </p>
        </div>

        <button className="primary-button" onClick={onAdd}>
          <Plus size={17} />
          Add a plant
        </button>
      </div>

      <div className="collection-toolbar">
        <div className="collection-count">
          <Sprout size={17} />
          <span>
            {plants.length} {plants.length === 1 ? "plant" : "plants"} in your garden
          </span>
        </div>

        <label className="search-box">
          <Search size={17} />
          <input
            type="search"
            value={search}
            onChange={event => setSearch(event.target.value)}
            placeholder="Search your plants..."
          />
        </label>
      </div>

      {filteredPlants.length > 0 ? (
        <PlantGrid
          plants={filteredPlants}
          onSelect={onSelect}
        />
      ) : plants.length > 0 ? (
        <EmptyState
          title="No plants found."
          description="Try another name, species or category."
        />
      ) : (
        <EmptyState
          title="Your garden is waiting."
          description="Add your first plant and start documenting its journey."
          actionLabel="Add your first plant"
          onAction={onAdd}
        />
      )}
    </section>
  );
}
