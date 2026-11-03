
import { Plus } from "lucide-react";

interface WelcomeBannerProps {
  onAdd: () => void;
}

export default function WelcomeBanner({ onAdd }: WelcomeBannerProps) {
  return (
    <div className="welcome-row">
      <div>
        <span className="eyebrow">MONDAY, YOUR GARDEN IS CALLING</span>
        <h2>
          Growing something<br />
          beautiful<span className="heading-period">.</span>
        </h2>
        <p>Every leaf tells a story. Keep track of yours.</p>
      </div>

      <button className="primary-button" onClick={onAdd}>
        <Plus size={18} />
        Add a plant
      </button>
    </div>
  );
}
