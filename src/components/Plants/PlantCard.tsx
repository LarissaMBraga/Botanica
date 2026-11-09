
import { ArrowUpRight, Droplets, BookOpen } from "lucide-react";
import type { Plant } from "../../types/plant";

interface PlantCardProps {
  plant: Plant;
  onSelect: (plant: Plant) => void;
}

function getResponsiveImageSource(image: string) {
  try {
    const url = new URL(image);

    if (url.hostname !== "images.unsplash.com") {
      return undefined;
    }

    const widths = [320, 480, 640, 800];

    const srcSet = widths
      .map(width => {
        const responsiveUrl = new URL(url);

        responsiveUrl.searchParams.set("auto", "format");
        responsiveUrl.searchParams.set("fit", "max");
        responsiveUrl.searchParams.set("w", String(width));
        responsiveUrl.searchParams.set("q", "75");

        return `${responsiveUrl.toString()} ${width}w`;
      })
      .join(", ");

    return srcSet;
  } catch {
    return undefined;
  }
}

export default function PlantCard({
  plant,
  onSelect
}: PlantCardProps) {
  const imageSrcSet = getResponsiveImageSource(plant.image);

  return (
    <button
      type="button"
      className="plant-card"
      onClick={() => onSelect(plant)}
    >
      <div className="plant-card-image">
        <img
          src={plant.image}
          srcSet={imageSrcSet}
          sizes="(max-width: 650px) 100vw, (max-width: 1000px) 50vw, 33vw"
          alt={plant.name}
          decoding="async"
        />

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
