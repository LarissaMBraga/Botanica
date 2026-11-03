
import { LoaderCircle } from "lucide-react";

interface LoadingProps {
  label?: string;
}

export default function Loading({
  label = "Loading..."
}: LoadingProps) {
  return (
    <div className="loading-state" role="status">
      <LoaderCircle size={24} className="loading-spinner" />
      <span>{label}</span>
    </div>
  );
}
