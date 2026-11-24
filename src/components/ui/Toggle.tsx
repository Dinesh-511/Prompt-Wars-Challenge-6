// ============================================================
// src/components/ui/Toggle.tsx
// Accessible Switch Toggle Component
// Smooth sliding pill micro-interaction & WCAG AA focus indicator
// ============================================================

import { forwardRef, type ButtonHTMLAttributes } from 'react';

export interface ToggleProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'> {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  description?: string;
  size?: 'sm' | 'md';
}

export const Toggle = forwardRef<HTMLButtonElement, ToggleProps>(function Toggle(
  {
    checked,
    onChange,
    label,
    description,
    size = 'md',
    disabled = false,
    className = '',
    ...props
  },
  ref
) {
  const isSm = size === 'sm';

  return (
    <div className={`flex items-center justify-between gap-3 ${className}`}>
      {(label || description) && (
        <div className="flex flex-col text-left">
          {label && (
            <span className="text-xs font-semibold text-slate-900 dark:text-slate-100">
              {label}
            </span>
          )}
          {description && (
            <span className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight">
              {description}
            </span>
          )}
        </div>
      )}

      <button
        ref={ref}
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => !disabled && onChange(!checked)}
        className={`relative inline-flex shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950 disabled:opacity-50 disabled:cursor-not-allowed ${
          isSm ? 'h-5 w-9 p-0.5' : 'h-6 w-11 p-0.5'
        } ${checked ? 'bg-cyan-600 dark:bg-cyan-500' : 'bg-slate-200 dark:bg-slate-700'}`}
        {...props}
      >
        <span
          aria-hidden="true"
          className={`pointer-events-none inline-block transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
            isSm ? 'h-4 w-4' : 'h-5 w-5'
          } ${checked ? (isSm ? 'translate-x-4' : 'translate-x-5') : 'translate-x-0'}`}
        />
      </button>
    </div>
  );
});

