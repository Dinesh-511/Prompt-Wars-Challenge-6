// ============================================================
// src/components/ui/Modal.tsx
// Accessible SaaS Modal Dialog Component (Linear/Stripe Craftsmanship)
// Dual Theme Support (Light & Dark) & WCAG 2.2 Level AA Focus Management
// ============================================================

import { useEffect, useRef, type ReactNode, type RefObject } from 'react';
import { CloseIcon } from './Icons';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl';
  initialFocusRef?: RefObject<HTMLElement | null>;
  hideCloseButton?: boolean;
}

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function Modal({
  isOpen,
  onClose,
  title,
  description,
  children,
  maxWidth = 'md',
  initialFocusRef,
  hideCloseButton = false,
}: ModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const previousActiveElementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    // 1. Capture previously active element before opening
    if (typeof document !== 'undefined') {
      previousActiveElementRef.current = document.activeElement as HTMLElement | null;
      document.body.style.overflow = 'hidden';
    }

    // 2. Initial focus management
    const timer = setTimeout(() => {
      if (initialFocusRef?.current) {
        initialFocusRef.current.focus();
      } else if (dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
        if (focusable.length > 0) {
          focusable[0].focus();
        } else {
          dialogRef.current.focus();
        }
      }
    }, 10);

    // 3. Keyboard focus trap & Escape key listener
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }

      if (e.key === 'Tab' && dialogRef.current) {
        const focusables = Array.from(
          dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
        ).filter((el) => el.offsetParent !== null || el.getAttribute('tabindex') !== null);

        if (focusables.length === 0) {
          e.preventDefault();
          return;
        }

        const firstElement = focusables[0];
        const lastElement = focusables[focusables.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement || !dialogRef.current.contains(document.activeElement)) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement || !dialogRef.current.contains(document.activeElement)) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('keydown', handleKeyDown);
      if (typeof document !== 'undefined') {
        document.body.style.overflow = 'unset';
      }
      // 4. Restore focus on dialog close
      if (previousActiveElementRef.current && typeof previousActiveElementRef.current.focus === 'function') {
        previousActiveElementRef.current.focus();
      }
    };
  }, [isOpen, onClose, initialFocusRef]);

  if (!isOpen) return null;

  const maxWidthStyles = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      aria-describedby={description ? 'modal-description' : undefined}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/40 dark:bg-black/75 backdrop-blur-sm transition-opacity animate-in fade-in"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Dialog Window */}
      <div
        ref={dialogRef}
        tabIndex={-1}
        className={`relative w-full ${maxWidthStyles[maxWidth]} bg-[var(--bg-surface,#ffffff)] dark:bg-[var(--bg-surface-elevated,#0f172a)] text-[var(--text-primary,#0f172a)] dark:text-slate-100 rounded-2xl p-6 shadow-elevated border border-[var(--border-medium,rgba(15,23,42,0.12))] dark:border-slate-800 z-10 animate-in zoom-in-95 duration-150 focus:outline-none`}
      >
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <h2 id="modal-title" className="text-lg font-bold text-[var(--text-primary,#0f172a)] dark:text-white tracking-tight">
              {title}
            </h2>
            {description && (
              <p id="modal-description" className="text-xs text-[var(--text-muted,#64748b)] dark:text-slate-400 mt-1">
                {description}
              </p>
            )}
          </div>
          {!hideCloseButton && (
            <button
              type="button"
              onClick={onClose}
              aria-label="Close dialog"
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--primary,#0891b2)] cursor-pointer"
            >
              <CloseIcon size={16} />
            </button>
          )}
        </div>

        <div className="mt-2">{children}</div>
      </div>
    </div>
  );
}
