// ============================================================
// src/components/Auth/views/ForgotPasswordForm.tsx
// Password Recovery Dispatch View (Linear/Stripe Craftsmanship)
// ============================================================

import type { FormEvent } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { UserIcon } from '@/components/ui/Icons';

export interface ForgotPasswordFormProps {
  email: string;
  setEmail: (email: string) => void;
  isLoading: boolean;
  onSubmit: (e: FormEvent) => void;
  onNavigateLogin: () => void;
}

export function ForgotPasswordForm({
  email,
  setEmail,
  isLoading,
  onSubmit,
  onNavigateLogin,
}: ForgotPasswordFormProps) {
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <Input
        id="forgot-email"
        label="Account Email"
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="analyst@aeropulse.org"
        leftIcon={<UserIcon size={16} />}
        helperText="We will dispatch a zero-knowledge recovery link and OTP code"
      />

      <Button
        type="submit"
        variant="primary"
        size="md"
        isLoading={isLoading}
        className="w-full shadow-md shadow-cyan-600/20"
      >
        Dispatch Recovery Token
      </Button>

      <div className="text-center text-xs text-slate-500 dark:text-slate-400 pt-3 border-t border-slate-200/80 dark:border-slate-800">
        <button
          type="button"
          onClick={onNavigateLogin}
          className="text-cyan-600 dark:text-cyan-400 font-bold hover:underline"
        >
          ← Return to Secure Sign In
        </button>
      </div>
    </form>
  );
}
