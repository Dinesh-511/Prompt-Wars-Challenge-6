// ============================================================
// src/components/Auth/views/AuthSuccessView.tsx
// Authentication Success Confirmation View (Linear/Stripe Craftsmanship)
// ============================================================

import { CheckCircleIcon, ShieldLogo } from '@/components/ui/Icons';
import { BRANDING } from '@/config/branding';

export function AuthSuccessView() {
  return (
    <div className="flex flex-col items-center justify-center py-8 text-center animate-in zoom-in-95">
      <div className="relative mb-4">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-white flex items-center justify-center shadow-lg shadow-emerald-500/30">
          <CheckCircleIcon size={32} />
        </div>
        <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-cyan-600 text-white flex items-center justify-center shadow-xs">
          <ShieldLogo size={12} />
        </div>
      </div>
      <h3 className="text-lg font-extrabold text-slate-900 dark:text-white tracking-tight">
        Terminal Access Granted
      </h3>
      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 max-w-xs leading-relaxed">
        Welcome to the <strong className="text-slate-800 dark:text-slate-200">{BRANDING.productName}</strong> Intelligence Network. Initializing encrypted telemetry streams…
      </p>
      <div className="mt-4 flex items-center gap-2 text-[11px] font-mono font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
        <span>Establishing zero-trust session</span>
      </div>
    </div>
  );
}
