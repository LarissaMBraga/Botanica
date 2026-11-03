
import type { ReactNode, ButtonHTMLAttributes } from "react";
import { LoaderCircle } from "lucide-react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "danger" | "ghost";
  loading?: boolean;
  icon?: ReactNode;
}

export default function Button({
  children,
  variant = "primary",
  loading = false,
  icon,
  disabled,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      disabled={disabled || loading}
      className={`ui-button ui-button-${variant} ${className}`}
    >
      {loading ? (
        <LoaderCircle size={17} className="loading-spinner" />
      ) : (
        icon
      )}

      {children}
    </button>
  );
}
