
import {
  ArrowLeft,
  CalendarDays,
  Droplets,
  Leaf,
  Trash2,
  Camera,
  BookOpen
} from "lucide-react";
import type { Plant } from "../../types/plant";
import { readImage } from "../../utils/imageUtils";

const CURRENT_DATE = Date.now();

interface PlantDetailsProps {
  plant: Plant;
  onBack: () => void;
  onDelete: (id: string) => void;
  onPhotoUpdate: (image: string) => void;
  onAddNote: () => void;
}

export default function PlantDetails({
  plant,
  onBack,
  onDelete,
  onPhotoUpdate,
  onAddNote
}: PlantDetailsProps) {
  return (
    <section className="plant-details">
      <button className="back-button" onClick={onBack}>
        <ArrowLeft size={17} />
        Back to collection
      </button>

      <div className="plant-profile-hero">
        <div className="plant-profile-image">
          <img src={plant.image} alt={plant.name} />

          <label className="photo-update-button">
            <Camera size={16} />
            Update photo
            <input
              type="file"
              accept="image/png,image/jpeg,image/webp"
              hidden
              onChange={async event => {
                const file = event.target.files?.[0];

                if (!file) return;

                try {
                  onPhotoUpdate(await readImage(file));
                } catch {
                  event.target.value = "";
                }
              }}
            />
          </label>
        </div>

        <div className="plant-profile-info">
          <span className="plant-category">{plant.category}</span>
          <h2>{plant.name}</h2>
          <p className="plant-species">{plant.species}</p>
          <p>{plant.description}</p>

          <div className="plant-profile-actions">
            <button className="primary-button" onClick={onAddNote}>
              <BookOpen size={17} />
              Add journal entry
            </button>

            <button
              className="delete-button"
              onClick={() => onDelete(plant.id)}
            >
              <Trash2 size={17} />
              Delete plant
            </button>
          </div>
        </div>
      </div>

      <div className="plant-facts">
        <div className="plant-fact">
          <CalendarDays size={18} />
          <div>
            <span>Planting date</span>
            <strong>
              {new Date(`${plant.plantedAt}T00:00:00`).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric"
              })}
            </strong>
          </div>
        </div>

        <div className="plant-fact">
          <Droplets size={18} />
          <div>
            <span>Watering frequency</span>
            <strong>Every {plant.wateringFrequency} days</strong>
          </div>
        </div>

        <div className="plant-fact">
          <Leaf size={18} />
          <div>
            <span>Days in your garden</span>
            <strong>
              {Math.max(
                0,
                Math.floor(
                  (CURRENT_DATE - new Date(`${plant.plantedAt}T00:00:00`).getTime()) /
                  86400000
                )
              )} days
            </strong>
          </div>
        </div>
      </div>
    </section>
  );
}
