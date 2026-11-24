// ============================================================
// src/components/Auth/views/RegisterForm.tsx
// Citizen Profile Enrollment View (Linear/Stripe Craftsmanship)
// ============================================================

import type { FormEvent } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { UserIcon, LockIcon } from '@/components/ui/Icons';

export interface RegisterFormProps {
  fullName: string;
  setFullName: (name: string) => void;
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  isLoading: boolean;
  onSubmit: (e: FormEvent) => void;
  onNavigateLogin: () => void;
}

export function RegisterForm({
  fullName,
  setFullName,
  email,
  setEmail,
  password,
  setPassword,
  isLoading,
  onSubmit,
  onNavigateLogin,
}: RegisterFormProps) {
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <Input
        id="reg-name"
        label="Full Legal / Institutional Name"
        type="text"
        required
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        placeholder="Dr. Maya Raman"
        leftIcon={<UserIcon size={16} />}
      />

      <Input
        id="reg-email"
        label="Official Contact Email"
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="maya@aeropulse.org"
        leftIcon={<UserIcon size={16} />}
      />

      <Input
        id="reg-pwd"
        label="Passphrase (Min. 8 characters)"
        type="password"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="••••••••••••"
        leftIcon={<LockIcon size={16} />}
        helperText="Include numbers and symbols for strong enterprise entropy"
      />

      <Button
        type="submit"
        variant="primary"
        size="md"
        isLoading={isLoading}
        className="w-full mt-2 shadow-md shadow-cyan-600/20"
      >
        Create Profile &amp; Verify Identity
      </Button>

      <div className="text-center text-xs text-slate-500 dark:text-slate-400 pt-3 border-t border-slate-200/80 dark:border-slate-800">
        Already enrolled?{' '}
        <button
          type="button"
          onClick={onNavigateLogin}
          className="text-cyan-600 dark:text-cyan-400 font-bold hover:underline ml-1"
        >
          Sign in to existing account
        </button>
      </div>
    </form>
  );
}
