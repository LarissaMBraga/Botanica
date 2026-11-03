
import {
  Leaf,
  LayoutDashboard,
  Sprout,
  Sun,
  X
} from "lucide-react";
import "./Sidebar.css";

interface SidebarProps {
  page: "dashboard" | "plants";
  plantCount: number;
  mobileMenu: boolean;
  onNavigate: (page: "dashboard" | "plants") => void;
  onClose: () => void;
}

export default function Sidebar({
  page,
  plantCount,
  mobileMenu,
  onNavigate,
  onClose
}: SidebarProps) {
  return (
    <>
      {mobileMenu && (
        <button
          className="sidebar-overlay"
          onClick={onClose}
          aria-label="Close navigation"
        />
      )}

      <aside className={`sidebar ${mobileMenu ? "sidebar-open" : ""}`}>
        <div className="brand">
          <div className="brand-icon">
            <Leaf size={22} />
          </div>

          <div>
            <h1>botanica</h1>
            <span>YOUR PLANT JOURNAL</span>
          </div>

          <button
            className="mobile-close"
            onClick={onClose}
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        <div className="sidebar-label">WORKSPACE</div>

        <nav className="sidebar-nav">
          <button
            className={page === "dashboard" ? "nav-item active" : "nav-item"}
            onClick={() => {
              onNavigate("dashboard");
              onClose();
            }}
          >
            <LayoutDashboard size={18} />
            <span>Overview</span>
          </button>

          <button
            className={page === "plants" ? "nav-item active" : "nav-item"}
            onClick={() => {
              onNavigate("plants");
              onClose();
            }}
          >
            <Sprout size={18} />
            <span>My plants</span>
            <span className="nav-count">{plantCount}</span>
          </button>
        </nav>

        <div className="sidebar-bottom">
          <div className="sidebar-tip">
            <div className="tip-icon">
              <Sun size={18} />
            </div>
            <p>Little by little, a little becomes a lot.</p>
            <span>Keep growing.</span>
          </div>

          <div className="sidebar-profile">
            <div className="profile-avatar">B</div>
            <div>
              <strong>Plant keeper</strong>
              <span>Personal garden</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
