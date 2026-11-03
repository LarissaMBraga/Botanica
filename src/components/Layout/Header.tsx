
import {
  Bell,
  CalendarDays,
  ChevronRight,
  Menu
} from "lucide-react";
import "./Header.css";

interface HeaderProps {
  title: string;
  onMenuClick: () => void;
  onNotify: (message: string) => void;
}

export default function Header({
  title,
  onMenuClick,
  onNotify
}: HeaderProps) {
  return (
    <header className="topbar">
      <button
        className="mobile-menu"
        onClick={onMenuClick}
        aria-label="Open menu"
      >
        <Menu size={21} />
      </button>

      <div className="breadcrumb">
        <span>Workspace</span>
        <ChevronRight size={14} />
        <strong>{title}</strong>
      </div>

      <div className="topbar-actions">
        <div className="today-label">
          <CalendarDays size={15} />
          {new Date().toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric"
          })}
        </div>

        <button
          className="icon-button"
          onClick={() => onNotify("You're all caught up!")}
          aria-label="Notifications"
        >
          <Bell size={18} />
        </button>
      </div>
    </header>
  );
}
