
import { ArrowUp, Leaf } from "lucide-react";
import "./Footer.css";

function GitHubIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="15"
      height="15"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.55.1.76-.24.76-.54v-2.1c-3.1.67-3.76-1.32-3.76-1.32-.5-1.28-1.24-1.62-1.24-1.62-1.01-.69.08-.68.08-.68 1.12.08 1.71 1.15 1.71 1.15 1 .1.76 2.02 3.23 1.54.1-.72.39-1.2.7-1.48-2.47-.28-5.07-1.24-5.07-5.5 0-1.22.44-2.21 1.15-2.99-.12-.28-.5-1.42.11-2.95 0 0 .94-.3 3.05 1.14a10.6 10.6 0 0 1 5.55 0c2.11-1.44 3.05-1.14 3.05-1.14.61 1.53.23 2.67.11 2.95.72.78 1.15 1.77 1.15 2.99 0 4.27-2.6 5.22-5.08 5.49.4.35.75 1.02.75 2.06v3.06c0 .3.2.65.77.54A11.1 11.1 0 0 0 12 .9Z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <a href="#" className="footer-brand" aria-label="Botanica - início">
          <Leaf size={19} />
          <span>BOTANICA</span>
        </a>

        <div className="footer-links">
          <a
            href="https://github.com/LarissaMBraga"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
          >
            <GitHubIcon />
            <span>GitHub</span>
          </a>

          <button
            type="button"
            className="footer-link footer-back-top"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <span>Back to top</span>
            <ArrowUp size={15} />
          </button>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Larissa Moreira Braga.</span>
        <span>Built with React & TypeScript.</span>
      </div>
    </footer>
  );
}
