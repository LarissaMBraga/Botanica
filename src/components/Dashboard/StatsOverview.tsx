
import type { ReactNode } from "react";
import {
  Sprout,
  BookOpen,
  Droplets
} from "lucide-react";
import type { Plant } from "../../types/plant";

interface StatsOverviewProps {
  plants: Plant[];
  totalNotes: number;
}

export default function StatsOverview({
  plants,
  totalNotes
}: StatsOverviewProps) {
  const totalCategories = new Set(
    plants.map(plant => plant.category)
  ).size;

  return (
    <div className="stats-grid">
      <StatCard
        icon={<Sprout size={19} />}
        label="Total plants"
        value={plants.length}
        detail="In your collection"
      />

      <StatCard
        icon={<BookOpen size={19} />}
        label="Journal entries"
        value={totalNotes}
        detail="Moments recorded"
      />

      <StatCard
        icon={<Droplets size={19} />}
        label="Plant categories"
        value={totalCategories}
        detail="Different varieties"
      />
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  detail
}: {
  icon: ReactNode;
  label: string;
  value: number;
  detail: string;
}) {
  return (
    <div className="stat-card">
      <div className="stat-icon">{icon}</div>
      <span>{label}</span>
      <strong>{value.toString().padStart(2, "0")}</strong>
      <small>{detail}</small>
    </div>
  );
}
