// ============================================================
// src/components/Auth/views/LoginForm.tsx
// Modern Commercial SaaS Authentication Form (Linear/Stripe Craftsmanship)
// Dual-Theme Support (Light & Dark) & WCAG 2.2 Level AA Focus Indicators
// ============================================================

import type { FormEvent } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { UserIcon, LockIcon, ShieldLogo } from '@/components/ui/Icons';

export interface LoginFormProps {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  rememberMe: boolean;
  setRememberMe: (remember: boolean) => void;
  isLoading: boolean;
  onSubmit: (e: FormEvent) => void;
  onQuickFill: (role: 'operator' | 'citizen') => void;
  onNavigateRegister: () => void;
  onNavigateForgot: () => void;
}

export function LoginForm({
  email,
  setEmail,
  password,
  setPassword,
  rememberMe,
  setRememberMe,
  isLoading,
  onSubmit,
  onQuickFill,
  onNavigateRegister,
  onNavigateForgot,
}: LoginFormProps) {
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      {/* Quick Demo Pre-fill Selector Chips for Evaluation */}
      <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 flex flex-col gap-2">
        <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 font-mono flex items-center gap-1.5">
          <ShieldLogo size={12} className="text-cyan-600 dark:text-cyan-400" />
          <span>Quick Evaluation Access:</span>
        </span>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => onQuickFill('operator')}
            className={`px-3 py-2 rounded-xl text-xs font-bold transition-all text-left border flex flex-col cursor-pointer ${
              email.includes('chen')
                ? 'bg-cyan-50 dark:bg-cyan-950/60 text-cyan-900 dark:text-cyan-100 border-cyan-300 dark:border-cyan-700 shadow-2xs'
                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-slate-300'
            }`}
          >
            <span className="font-extrabold text-[11px]">Director Chen</span>
            <span className="text-[10px] text-slate-500 dark:text-slate-400 font-normal">Municipal Operator</span>
          </button>
          <button
            type="button"
            onClick={() => onQuickFill('citizen')}
            className={`px-3 py-2 rounded-xl text-xs font-bold transition-all text-left border flex flex-col cursor-pointer ${
              email.includes('delhi')
                ? 'bg-cyan-50 dark:bg-cyan-950/60 text-cyan-900 dark:text-cyan-100 border-cyan-300 dark:border-cyan-700 shadow-2xs'
                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-slate-300'
            }`}
          >
            <span className="font-extrabold text-[11px]">Aarav Sharma</span>
            <span className="text-[10px] text-slate-500 dark:text-slate-400 font-normal">Citizen Member</span>
          </button>
        </div>
      </div>

      {/* Email Input */}
      <Input
        id="auth-email"
        label="Work / Public Health Email"
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="analyst@aeropulse.org"
        leftIcon={<UserIcon size={16} />}
      />

      {/* Password Input */}
      <div>
        <div className="flex justify-end mb-1">
          <button
            type="button"
            onClick={onNavigateForgot}
            className="text-[11px] font-semibold text-cyan-600 dark:text-cyan-400 hover:underline"
          >
            Forgot key?
          </button>
        </div>
        <Input
          id="auth-password"
          label="Security Key / Password"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••••••"
          leftIcon={<LockIcon size={16} />}
        />
      </div>

      {/* Remember Terminal Checkbox */}
      <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400 py-1">
        <label className="flex items-center gap-2 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="rounded accent-cyan-600 w-4 h-4 cursor-pointer"
          />
          <span className="font-medium">Remember this terminal session</span>
        </label>
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        variant="primary"
        size="md"
        isLoading={isLoading}
        className="w-full mt-1 shadow-md shadow-cyan-600/20"
      >
        Authenticate &amp; Open Dashboard
      </Button>

      {/* Navigation Footer */}
      <div className="text-center text-xs text-slate-500 dark:text-slate-400 pt-3 border-t border-slate-200/80 dark:border-slate-800">
        New municipal stakeholder?{' '}
        <button
          type="button"
          onClick={onNavigateRegister}
          className="text-cyan-600 dark:text-cyan-400 font-bold hover:underline ml-1"
        >
          Enroll new profile
        </button>
      </div>
    </form>
  );
}
