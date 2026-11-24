// ============================================================
// src/components/Auth/views/OtpTwoFactorForm.tsx
// Two-Factor Verification Token View (Linear/Stripe Craftsmanship)
// ============================================================

import type { FormEvent } from 'react';
import { Button } from '@/components/ui/Button';
import { SparklesIcon, ShieldLogo } from '@/components/ui/Icons';

export interface OtpTwoFactorFormProps {
  email: string;
  otpCode: string[];
  setOtpCode: (otp: string[]) => void;
  isLoading: boolean;
  onSubmit: (e: FormEvent) => void;
  onCancel: () => void;
}

export function OtpTwoFactorForm({
  email,
  otpCode,
  setOtpCode,
  isLoading,
  onSubmit,
  onCancel,
}: OtpTwoFactorFormProps) {
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5">
      <div className="text-center">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-cyan-500/20 via-teal-500/20 to-emerald-500/20 border border-cyan-500/30 text-cyan-600 dark:text-cyan-400 flex items-center justify-center mx-auto mb-3 shadow-md shadow-cyan-500/10">
          <ShieldLogo size={28} />
        </div>
        <h4 className="text-sm font-bold text-slate-900 dark:text-white">
          Enter 6-Digit Passcode
        </h4>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-xs mx-auto">
          Verification passcode dispatched to <strong className="text-slate-800 dark:text-slate-200 font-mono">{email || 'your device'}</strong>
        </p>
      </div>

      {/* 6 Digit Input Boxes with Modern Focus Indicator */}
      <div className="flex justify-center gap-2 sm:gap-2.5">
        {[0, 1, 2, 3, 4, 5].map((idx) => (
          <input
            key={idx}
            id={`otp-box-${idx}`}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={otpCode[idx] || ''}
            onChange={(e) => {
              const val = e.target.value.replace(/[^0-9]/g, '');
              const next = [...otpCode];
              next[idx] = val;
              setOtpCode(next);
              if (val && idx < 5) {
                const nextInput = document.getElementById(`otp-box-${idx + 1}`);
                nextInput?.focus();
              }
            }}
            onKeyDown={(e) => {
              if (e.key === 'Backspace' && !otpCode[idx] && idx > 0) {
                const prevInput = document.getElementById(`otp-box-${idx - 1}`);
                prevInput?.focus();
              }
            }}
            className="w-10 sm:w-12 h-12 sm:h-14 text-center text-lg sm:text-xl font-mono font-black bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 shadow-2xs transition-all"
          />
        ))}
      </div>

      <Button
        type="submit"
        variant="primary"
        size="md"
        isLoading={isLoading}
        className="w-full shadow-md shadow-cyan-600/20"
      >
        Verify &amp; Finalize Access
      </Button>

      {/* Auto-fill demo helper & cancel button */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400 pt-3 border-t border-slate-200/80 dark:border-slate-800">
        <button
          type="button"
          onClick={onCancel}
          className="hover:underline text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
        >
          ← Cancel and return
        </button>
        <button
          type="button"
          onClick={() => {
            setOtpCode(['7', '2', '9', '4', '1', '0']);
          }}
          className="text-cyan-600 dark:text-cyan-400 hover:underline font-bold flex items-center gap-1"
        >
          <SparklesIcon size={12} />
          <span>Auto-fill demo token (729410)</span>
        </button>
      </div>
    </form>
  );
}
