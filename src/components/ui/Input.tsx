// ============================================================
// src/components/ui/Input.tsx
// Precision Design-System Input Component (Linear/Stripe Craftsmanship)
// Dual-Theme Support (Light & Dark) & WCAG 2.2 AA Focus Indicators
// ============================================================

import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  fullWidth?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    label,
    error,
    helperText,
    leftIcon,
    rightIcon,
    fullWidth = true,
    id,
    disabled,
    className = '',
    ...props
  },
  ref
) {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className={`flex flex-col gap-1.5 ${fullWidth ? 'w-full' : ''}`}>
      {label && (
        <label
          htmlFor={inputId}
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
        {leftIcon && (
          <span
            className="absolute left-3.5 text-slate-400 dark:text-slate-500 pointer-events-none flex items-center justify-center shrink-0"
            aria-hidden="true"
          >
            {leftIcon}
          </span>
        )}

        <input
          ref={ref}
          id={inputId}
          disabled={disabled}
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={
            error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined
          }
          className={`w-full bg-white dark:bg-slate-900/90 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 rounded-xl text-xs sm:text-sm font-medium border transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-1 dark:focus:ring-offset-slate-950 disabled:opacity-50 disabled:cursor-not-allowed ${
            leftIcon ? 'pl-10' : 'pl-3.5'
          } ${rightIcon ? 'pr-10' : 'pr-3.5'} py-2.5 min-h-[44px] ${
            error
              ? 'border-rose-400 dark:border-rose-600/80 focus:ring-rose-500 focus:border-rose-500'
              : 'border-slate-200/90 dark:border-slate-700/80 hover:border-slate-300 dark:hover:border-slate-600 focus:ring-cyan-500 focus:border-cyan-500'
          } shadow-2xs ${className}`}
          {...props}
        />

        {rightIcon && (
          <span
            className="absolute right-3.5 text-slate-400 dark:text-slate-500 flex items-center justify-center shrink-0"
            aria-hidden="true"
          >
            {rightIcon}
          </span>
        )}
      </div>

      {error ? (
        <p
          id={`${inputId}-error`}
          role="alert"
          className="text-[11px] font-semibold text-rose-600 dark:text-rose-400 flex items-center gap-1 mt-0.5"
        >
          <span>⚠</span>
          <span>{error}</span>
        </p>
      ) : helperText ? (
        <p
          id={`${inputId}-helper`}
          className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5"
        >
          {helperText}
        </p>
      ) : null}
    </div>
  );
});

