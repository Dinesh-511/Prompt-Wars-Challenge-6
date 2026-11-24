// ============================================================
// src/components/ui/Skeleton.tsx
// Loading State Skeleton & Empty State Primitive
// Dual-Theme Optimized (Light & Dark)
// ============================================================

import type { HTMLAttributes, ReactNode } from 'react';

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'circular' | 'rectangular' | 'card';
  width?: string | number;
  height?: string | number;
}

export function Skeleton({
  variant = 'rectangular',
  width,
  height,
  className = '',
  style,
  ...props
}: SkeletonProps) {
  const variantStyles = {
    text: 'h-4 rounded-md w-full',
    circular: 'rounded-full aspect-square',
    rectangular: 'rounded-xl',
    card: 'rounded-2xl h-48 w-full',
  };

  return (
    <div
      aria-hidden="true"
      style={{ width, height, ...style }}
      className={`skeleton-shimmer bg-slate-200/80 dark:bg-slate-800/50 ${variantStyles[variant]} ${className}`}
      {...props}
    />
  );
}

export interface EmptyStateProps extends HTMLAttributes<HTMLDivElement> {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
}

export function EmptyState({
  icon,
  title,
  description,
  action,
  className = '',
  ...props
}: EmptyStateProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center p-8 text-center rounded-2xl border border-dashed border-[var(--border-medium,rgba(15,23,42,0.12))] dark:border-slate-800 bg-[var(--bg-surface-subtle,#f8fafc)] dark:bg-slate-900/40 my-4 ${className}`}
      {...props}
    >
      {icon && (
        <div className="p-3 rounded-xl bg-[var(--primary-subtle,#ecfeff)] dark:bg-cyan-950/40 text-[var(--primary,#0891b2)] dark:text-cyan-400 border border-[var(--border-primary,rgba(8,145,178,0.35))] dark:border-cyan-500/20 mb-3">
          {icon}
        </div>
      )}
      <h4 className="text-sm font-semibold text-[var(--text-primary,#0f172a)] dark:text-white tracking-tight">
        {title}
      </h4>
      {description && (
        <p className="text-xs text-[var(--text-muted,#64748b)] dark:text-slate-400 max-w-sm mt-1 mb-4 leading-relaxed">
          {description}
        </p>
      )}
      {action && <div>{action}</div>}
    </div>
  );
}
