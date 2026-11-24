// ============================================================
// src/components/ui/Select.tsx
// Precision Design-System Select Component
// Dual-Theme Support (Light & Dark) & Custom Chevron Styling
// ============================================================

import { forwardRef, type SelectHTMLAttributes, type ReactNode } from 'react';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helperText?: string;
  options?: SelectOption[];
  fullWidth?: boolean;
  children?: ReactNode;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  {
    label,
    error,
    helperText,
    options,
    fullWidth = true,
    id,
    disabled,
    className = '',
    children,
    ...props
  },
  ref
) {
  const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className={`flex flex-col gap-1.5 ${fullWidth ? 'w-full' : ''}`}>
      {label && (
        <label
          htmlFor={selectId}
          className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center justify-between"
        >
          <span>{label}</span>
          {props.required && (
            <span className="text-[10px] text-cyan-600 dark:text-cyan-400 font-mono font-medium">
              Required
            </span>
          )}
        </label>
      )}

      <div className="relative flex items-center">
        <select
          ref={ref}
          id={selectId}
          disabled={disabled}
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={
            error ? `${selectId}-error` : helperText ? `${selectId}-helper` : undefined
          }
          className={`w-full appearance-none bg-white dark:bg-slate-900/90 text-slate-900 dark:text-slate-100 rounded-xl text-xs sm:text-sm font-semibold border transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-1 dark:focus:ring-offset-slate-950 disabled:opacity-50 disabled:cursor-not-allowed pl-3.5 pr-10 py-2.5 min-h-[44px] cursor-pointer ${
            error
              ? 'border-rose-400 dark:border-rose-600/80 focus:ring-rose-500 focus:border-rose-500'
              : 'border-slate-200/90 dark:border-slate-700/80 hover:border-slate-300 dark:hover:border-slate-600 focus:ring-cyan-500 focus:border-cyan-500'
          } shadow-2xs ${className}`}
          {...props}
        >
          {options
            ? options.map((opt) => (
                <option
                  key={opt.value}
                  value={opt.value}
                  disabled={opt.disabled}
                  className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                >
                  {opt.label}
                </option>
              ))
            : children}
        </select>

        {/* Custom Chevron Indicator */}
        <div
          className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400 dark:text-slate-500"
          aria-hidden="true"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </div>

      {error ? (
        <p
          id={`${selectId}-error`}
          role="alert"
          className="text-[11px] font-semibold text-rose-600 dark:text-rose-400 flex items-center gap-1 mt-0.5"
        >
          <span>⚠</span>
          <span>{error}</span>
        </p>
      ) : helperText ? (
        <p
          id={`${selectId}-helper`}
          className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5"
        >
          {helperText}
        </p>
      ) : null}
    </div>
  );
});

