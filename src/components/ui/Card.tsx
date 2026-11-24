// ============================================================
// src/components/ui/Card.tsx
// Precision Container & Card System (Linear/Stripe Craftsmanship)
// Dual Theme (Light & Dark) Support & Clean Spatial Hierarchy
// ============================================================

import type { HTMLAttributes, ReactNode } from 'react';

export type CardVariant = 'default' | 'elevated' | 'interactive' | 'accent';
export type CardPadding = 'none' | 'sm' | 'md' | 'lg';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  padding?: CardPadding;
  children: ReactNode;
}

export function Card({
  variant = 'default',
  padding = 'md',
  className = '',
  children,
  ...props
}: CardProps) {
  const variantStyles: Record<CardVariant, string> = {
    default: 'glass glass-panel rounded-2xl',
    elevated: 'glass glass-panel-elevated rounded-2xl',
    interactive: 'glass glass-panel glass-panel-interactive rounded-2xl cursor-pointer',
    accent:
      'glass bg-[var(--primary-subtle,#ecfeff)]/40 border border-[var(--border-primary,rgba(8,145,178,0.35))] dark:bg-cyan-950/20 dark:border-cyan-500/30 rounded-2xl shadow-sm',
  };

  const paddingStyles: Record<CardPadding, string> = {
    none: 'p-0',
    sm: 'p-3.5 sm:p-4',
    md: 'p-5 sm:p-6',
    lg: 'p-6 sm:p-8',
  };

  return (
    <div
      className={`${variantStyles[variant]} ${paddingStyles[padding]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({
  className = '',
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`flex flex-col gap-1 mb-4 ${className}`} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({
  className = '',
  children,
  ...props
}: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={`text-base sm:text-lg font-bold text-[var(--text-primary,#0f172a)] dark:text-white tracking-tight flex items-center gap-2 ${className}`}
      {...props}
    >
      {children}
    </h3>
  );
}

export function CardDescription({
  className = '',
  children,
  ...props
}: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={`text-xs text-[var(--text-muted,#64748b)] dark:text-slate-400 leading-relaxed ${className}`}
      {...props}
    >
      {children}
    </p>
  );
}

export function CardContent({
  className = '',
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`${className}`} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({
  className = '',
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`mt-6 pt-4 border-t border-[var(--border-subtle,rgba(15,23,42,0.08))] dark:border-slate-800/80 flex items-center justify-between gap-3 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
