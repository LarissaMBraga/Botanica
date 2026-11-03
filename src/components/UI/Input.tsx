
import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  helperText?: string;
}

export default function Input({
  label,
  error,
  helperText,
  id,
  className = "",
  ...props
}: InputProps) {
  const inputId = id || props.name;

  return (
    <div className="ui-field">
      <label htmlFor={inputId}>{label}</label>

      <input
        {...props}
        id={inputId}
        className={`ui-input ${error ? "ui-input-error" : ""} ${className}`}
        aria-invalid={Boolean(error)}
        aria-describedby={
          error
            ? `${inputId}-error`
            : helperText
              ? `${inputId}-helper`
              : undefined
        }
      />

      {error && (
        <span className="field-error" id={`${inputId}-error`}>
          {error}
        </span>
      )}

      {!error && helperText && (
        <small className="field-helper" id={`${inputId}-helper`}>
          {helperText}
        </small>
      )}
    </div>
  );
}
