
import { CheckCircle2, AlertCircle, X } from "lucide-react";

export interface ToastData {
  message: string;
  type: "success" | "error";
}

interface ToastProps {
  toast: ToastData | null;
  onClose: () => void;
}

export default function Toast({ toast, onClose }: ToastProps) {
  if (!toast) return null;

  const isSuccess = toast.type === "success";

  return (
    <div
      className={`toast toast-${toast.type}`}
      role={isSuccess ? "status" : "alert"}
      aria-live={isSuccess ? "polite" : "assertive"}
    >
      {isSuccess ? (
        <CheckCircle2 size={19} />
      ) : (
        <AlertCircle size={19} />
      )}

      <span>{toast.message}</span>

      <button
        type="button"
        onClick={onClose}
        aria-label="Dismiss notification"
      >
        <X size={16} />
      </button>
    </div>
  );
}
