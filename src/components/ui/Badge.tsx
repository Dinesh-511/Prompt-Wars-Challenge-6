// ============================================================
// src/components/ui/Badge.tsx
// Status Pill & Metric Badge Component (Linear/Stripe Craftsmanship)
// Dual-Theme Support (Light & Dark) with WCAG AA Compliant Contrast
// ============================================================

import type { HTMLAttributes, ReactNode } from 'react';

export type BadgeVariant =
  | 'emerald'
  | 'cyan'
  | 'amber'
  | 'rose'
  | 'violet'
  | 'slate'
  | 'outline'
  | 'good'
  | 'moderate'
  | 'sensitive'
  | 'unhealthy'
  | 'very-unhealthy'
  | 'hazardous';

export type BadgeSize = 'sm' | 'md' | 'lg';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: BadgeSize;
  hasDot?: boolean;
  dot?: boolean; // Dual support per PROJECT.md interface contract
  isPulsing?: boolean;
  pulse?: boolean; // Dual support per PROJECT.md interface contract
  children: ReactNode;
}

export function Badge({
  variant = 'emerald',
  size = 'md',
  hasDot = false,
  dot,
  isPulsing = false,
  pulse,
  className = '',
  children,
  ...props
}: BadgeProps) {
  const showDot = dot ?? hasDot ?? false;
  const isAnimated = pulse ?? isPulsing ?? false;

  const normalizedVariant: 'emerald' | 'cyan' | 'amber' | 'rose' | 'violet' | 'slate' | 'outline' =
    variant === 'good'
      ? 'emerald'
      : variant === 'moderate' || variant === 'sensitive'
      ? 'amber'
      : variant === 'unhealthy'
      ? 'rose'
      : variant === 'very-unhealthy' || variant === 'hazardous'
      ? 'violet'
      : variant;

  const variantStyles: Record<
    'emerald' | 'cyan' | 'amber' | 'rose' | 'violet' | 'slate' | 'outline',
    { classes: string; dot: string }
  > = {
    emerald: {
      classes:
        'bg-emerald-50 text-emerald-800 border-emerald-200/90 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-500/30',
      dot: 'bg-emerald-500 dark:bg-emerald-400',
    },
    cyan: {
      classes:
        'bg-sky-50 text-sky-800 border-sky-200/90 dark:bg-sky-950/60 dark:text-sky-300 dark:border-sky-500/30',
      dot: 'bg-sky-500 dark:bg-sky-400',
    },
    amber: {
      classes:
        'bg-amber-50 text-amber-900 border-amber-200/90 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-500/30',
      dot: 'bg-amber-500 dark:bg-amber-400',
    },
    rose: {
      classes:
        'bg-rose-50 text-rose-900 border-rose-200/90 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-500/30',
      dot: 'bg-rose-500 dark:bg-rose-400',
    },
    violet: {
      classes:
        'bg-violet-50 text-violet-900 border-violet-200/90 dark:bg-violet-950/60 dark:text-violet-300 dark:border-violet-500/30',
      dot: 'bg-violet-500 dark:bg-violet-400',
    },
    slate: {
      classes:
        'bg-slate-100 text-slate-800 border-slate-200 dark:bg-slate-800/80 dark:text-slate-300 dark:border-slate-700/60',
      dot: 'bg-slate-500 dark:bg-slate-400',
    },
    outline: {
      classes:
        'bg-transparent text-[var(--text-secondary,#334155)] border-[var(--border-medium,rgba(15,23,42,0.12))] dark:text-slate-300 dark:border-slate-700',
      dot: 'bg-slate-500 dark:bg-slate-400',
    },
  };

  const sizeStyles: Record<BadgeSize, string> = {
    sm: 'px-2 py-0.5 text-[10px] gap-1',
    md: 'px-2.5 py-0.5 text-[11px] gap-1.5',
    lg: 'px-3 py-1 text-xs gap-2',
  };

  const current = variantStyles[normalizedVariant];

  return (
    <span
      className={`inline-flex items-center rounded-full font-semibold tracking-tight border shadow-2xs ${sizeStyles[size]} ${current.classes} ${className}`}
      {...props}
    >
      {showDot && (
        <span
          className={`w-1.5 h-1.5 rounded-full ${current.dot} ${
            isAnimated ? 'animate-pulse' : ''
          }`}
          aria-hidden="true"
        />
      )}
      <span>{children}</span>
    </span>
  );
}
