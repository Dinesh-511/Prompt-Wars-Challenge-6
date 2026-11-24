// ============================================================
// src/components/shared/AlertBanner.tsx
// Modern Assertive Smog & Inversion Hazard Notification Toast
// User-Friendly, Non-Clipping, Minimizable & Dismissible
// Per WCAG 2.2 AA & AirWay Modernized Design System
// ============================================================

import { memo, useState } from 'react';
import type { CommunityAlert } from '@/types';
import { AlertTriangleIcon, CloseIcon } from '@/components/ui/Icons';

interface AlertBannerProps {
  alerts: CommunityAlert[];
  onDismiss: (id: string) => void;
}

export const AlertBanner = memo(function AlertBanner({
  alerts,
  onDismiss,
}: AlertBannerProps) {
  const [isMinimized, setIsMinimized] = useState(false);

  if (!alerts || alerts.length === 0) return null;

  // Minimized Compact Pill Floating State
  if (isMinimized) {
    return (
      <div
        role="alert"
        aria-live="polite"
        className="fixed top-[132px] sm:top-[136px] right-4 sm:right-6 z-50 pointer-events-auto flex items-center gap-2 animate-in fade-in slide-in-from-top-2 duration-200"
      >
        <button
          type="button"
          onClick={() => setIsMinimized(false)}
          className="flex items-center gap-2.5 px-3.5 py-2 rounded-2xl bg-white/95 dark:bg-[#0c1322]/95 border border-rose-300/80 dark:border-rose-500/40 text-slate-900 dark:text-rose-100 shadow-xl backdrop-blur-xl text-xs font-bold hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-all cursor-pointer group"
          aria-label={`Expand ${alerts.length} atmospheric hazard alerts`}
        >
          <span className="relative flex h-2 w-2" aria-hidden="true">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500" />
          </span>
          <span>{alerts.length} Active {alerts.length === 1 ? 'Advisory' : 'Advisories'}</span>
          <span className="text-[10px] bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 px-2 py-0.5 rounded-full font-mono group-hover:bg-rose-200 dark:group-hover:bg-rose-900 transition-colors">
            Show ▾
          </span>
        </button>
        <button
          type="button"
          onClick={() => alerts.forEach((a) => onDismiss(a.id))}
          aria-label="Dismiss all active alerts"
          title="Dismiss all alerts"
          className="w-8 h-8 rounded-xl flex items-center justify-center bg-white/90 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 shadow-md hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors cursor-pointer"
        >
          <CloseIcon size={12} />
        </button>
      </div>
    );
  }

  // Fully Visible, Unclipped Floating Notification Center
  return (
    <div
      role="alert"
      aria-live="assertive"
      aria-atomic="false"
      className="fixed top-[132px] sm:top-[136px] right-4 sm:right-6 left-4 sm:left-auto sm:w-[410px] max-w-full z-50 flex flex-col gap-2.5 pointer-events-none transition-all duration-200"
    >
      {/* Control Strip (Header with Minimize and Dismiss All) */}
      <div className="pointer-events-auto flex items-center justify-between px-2 py-1 rounded-xl bg-white/80 dark:bg-[#070b16]/80 backdrop-blur-md border border-slate-200/80 dark:border-slate-800/80 shadow-xs">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2" aria-hidden="true">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500" />
          </span>
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-700 dark:text-slate-300">
            Hazard Advisories ({alerts.length})
          </span>
        </div>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setIsMinimized(true)}
            className="text-[11px] font-semibold text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white px-2 py-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            title="Minimize alerts to pill"
          >
            Minimize ▴
          </button>
          <span className="text-slate-300 dark:text-slate-700" aria-hidden="true">•</span>
          <button
            type="button"
            onClick={() => alerts.forEach((a) => onDismiss(a.id))}
            className="text-[11px] font-semibold text-rose-600 hover:text-rose-700 dark:text-rose-400 dark:hover:text-rose-300 px-2 py-1 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/50 transition-colors cursor-pointer"
            title="Dismiss all active alerts"
          >
            Dismiss All
          </button>
        </div>
      </div>

      {/* Alert Cards Stack */}
      {alerts.slice(0, 2).map((alert) => {
        const isEmergency = alert.severity === 'emergency';
        return (
          <div
            key={alert.id}
            className={`pointer-events-auto p-4 rounded-2xl shadow-xl backdrop-blur-xl border border-l-4 transition-all duration-200 animate-in slide-in-from-top-3 fade-in ${
              isEmergency
                ? 'bg-white/95 dark:bg-[#15070a]/95 border-rose-200 dark:border-rose-900/60 border-l-rose-500 dark:border-l-rose-500 text-slate-900 dark:text-rose-100 shadow-rose-500/5 ring-1 ring-rose-500/15'
                : 'bg-white/95 dark:bg-[#151005]/95 border-amber-200 dark:border-amber-900/60 border-l-amber-500 dark:border-l-amber-500 text-slate-900 dark:text-amber-100 shadow-amber-500/5 ring-1 ring-amber-500/15'
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3 min-w-0">
                <div
                  className={`p-2 rounded-xl shrink-0 mt-0.5 shadow-2xs ${
                    isEmergency
                      ? 'bg-rose-100 dark:bg-rose-950/80 border border-rose-300 dark:border-rose-700/60 text-rose-700 dark:text-rose-300'
                      : 'bg-amber-100 dark:bg-amber-950/80 border border-amber-300 dark:border-amber-700/60 text-amber-700 dark:text-amber-300'
                  }`}
                >
                  <AlertTriangleIcon size={16} className="animate-pulse" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span
                      className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                        isEmergency
                          ? 'bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-300 border-rose-300/80 dark:border-rose-700/60'
                          : 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border-amber-300/80 dark:border-amber-700/60'
                      }`}
                    >
                      {isEmergency ? 'Critical Emergency' : 'Advisory'}
                    </span>
                    <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 font-mono">
                      {alert.zone}
                    </span>
                  </div>
                  <h2 className="font-bold text-sm text-slate-900 dark:text-white mt-1.5 leading-snug break-words">
                    {alert.headline}
                  </h2>
                </div>
              </div>
              <button
                type="button"
                onClick={() => onDismiss(alert.id)}
                aria-label={`Dismiss alert for ${alert.zone}`}
                title="Dismiss this alert"
                className="text-slate-400 hover:text-slate-700 dark:hover:text-white min-w-[36px] min-h-[36px] flex items-center justify-center rounded-xl hover:bg-slate-100 dark:hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500 cursor-pointer shrink-0"
              >
                <CloseIcon size={14} />
              </button>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-2.5 leading-relaxed pl-0.5">
              {alert.instructions}
            </p>
          </div>
        );
      })}
    </div>
  );
});
