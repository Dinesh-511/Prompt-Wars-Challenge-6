// ============================================================
// src/components/ui/Button.tsx
// Precision Design-System Button Component (Linear/Stripe Craftsmanship)
// Full Dual Theme Support (Light & Dark) & WCAG 2.2 AA Focus Indicators
// ============================================================

import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'ai';
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  loading?: boolean; // Dual support per PROJECT.md interface contract
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  icon?: ReactNode; // Alias for leftIcon per PROJECT.md interface contract
  fullWidth?: boolean;
  children: ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = 'primary',
    size = 'md',
    isLoading = false,
    loading,
    leftIcon,
    rightIcon,
    icon,
    fullWidth = false,
    disabled,
    className = '',
    children,
    ...props
  },
  ref
) {
  const isSpinning = loading ?? isLoading ?? false;
  const startIcon = !isSpinning ? (leftIcon ?? icon) : null;

  const baseStyles =
    'button relative inline-flex items-center justify-center font-semibold tracking-tight rounded-xl transition-all duration-150 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary,#0891b2)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-surface,#ffffff)] dark:focus-visible:ring-offset-slate-900 disabled:opacity-50 disabled:cursor-not-allowed select-none active:scale-[0.98] cursor-pointer';

  const sizeStyles: Record<ButtonSize, string> = {
    xs: 'px-2.5 py-1 text-xs gap-1.5',
    sm: 'px-3.5 py-1.5 text-xs gap-2',
    md: 'px-4 py-2 text-sm gap-2',
    lg: 'px-5 py-2.5 text-base gap-2.5',
  };

  const variantStyles: Record<ButtonVariant, string> = {
    primary:
      'button--primary bg-[var(--primary,#0891b2)] hover:bg-[var(--primary-hover,#0e7490)] text-[var(--primary-fg,#ffffff)] border border-[var(--border-subtle,rgba(15,23,42,0.08))] shadow-xs dark:bg-[var(--primary,#06b6d4)] dark:hover:bg-[var(--primary-light,#22d3ee)] dark:text-slate-950 dark:border-cyan-400/30',
    secondary:
      'bg-[var(--bg-surface,#ffffff)] hover:bg-[var(--bg-surface-hover,#f1f5f9)] text-[var(--text-primary,#0f172a)] border border-[var(--border-medium,rgba(15,23,42,0.12))] shadow-xs dark:bg-slate-800/90 dark:hover:bg-slate-700 dark:text-slate-100 dark:border-slate-700/80',
    outline:
      'bg-transparent hover:bg-[var(--bg-surface-hover,#f1f5f9)] text-[var(--text-primary,#0f172a)] border border-[var(--border-strong,rgba(15,23,42,0.20))] dark:hover:bg-slate-800/60 dark:text-slate-200 dark:border-slate-700',
    ghost:
      'bg-transparent hover:bg-[var(--bg-surface-hover,#f1f5f9)] text-[var(--text-muted,#64748b)] hover:text-[var(--text-primary,#0f172a)] dark:text-slate-400 dark:hover:text-slate-100 dark:hover:bg-slate-800/60',
    danger:
      'bg-rose-600 hover:bg-rose-700 text-white border border-rose-700/20 shadow-xs dark:bg-rose-600 dark:hover:bg-rose-500 dark:text-white dark:border-rose-500/30',
    ai:
      'bg-slate-900 hover:bg-slate-800 text-[var(--primary-light,#06b6d4)] border border-[var(--border-cyan,rgba(6,182,212,0.40))] shadow-xs dark:bg-slate-900/90 dark:hover:bg-slate-800 dark:text-cyan-300 dark:border-cyan-500/40 shadow-[0_0_12px_rgba(6,182,212,0.15)]',
  };

  const widthStyle = fullWidth ? 'w-full' : '';

  return (
    <button
      ref={ref}
      disabled={disabled || isSpinning}
      aria-busy={isSpinning ? 'true' : undefined}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${widthStyle} ${className}`}
      {...props}
    >
      {isSpinning ? (
        <span
          className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin shrink-0"
          aria-hidden="true"
        />
      ) : (
        startIcon && <span className="shrink-0 leading-none">{startIcon}</span>
      )}
      <span>{children}</span>
      {!isSpinning && rightIcon && <span className="shrink-0 leading-none">{rightIcon}</span>}
    </button>
  );
});
