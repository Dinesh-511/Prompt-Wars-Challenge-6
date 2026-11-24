// ============================================================
// src/config/branding.ts
// Centralized Rebranded Configuration: AirWay
// Enterprise Atmospheric Intelligence & Safe Passage Platform
// ============================================================

export const BRANDING = {
  productName: 'AirWay',
  productNameShort: 'AirWay',
  suiteName: 'AirWay Enterprise Clean Air & Exposure Intelligence Platform',
  tagline: 'Precision atmospheric intelligence • Low-exposure urban navigation & resilience',
  companyName: 'AirWay Technologies Inc.',
  version: '3.0.0 Enterprise Edition',
  buildTag: '2026.11-ENTERPRISE',
  supportEmail: 'support@airway.org',
  portalName: 'AirWay Safe Passage & Clean Air Portal',

  // Contact info contract
  contact: {
    email: 'contact@airway.org',
    support: 'support@airway.org',
  },

  // Core Engine
  engineName: 'AirWay Community Engine',
  engineBadge: 'Powered by AirWay Community Engine',

  // Compliance & Standards badges
  standards: [
    { label: 'WCAG 2.2 AA', tooltip: 'Full accessibility & twin representation' },
    { label: 'EPA Standardized', tooltip: 'Calibrated air quality sub-indexes' },
    { label: 'Community Powered', tooltip: 'Hyperlocal clean route sharing & neighborhood pledges' },
    { label: 'Gemini 3.1 AI', tooltip: 'Server-side neural routine optimization' },
  ],

  // Theme primary palettes
  colors: {
    primary: '#0891b2',
    primaryHover: '#0e7490',
    secondary: '#0284c7',
    accent: '#06b6d4',
    backgroundLight: '#f8fafc',
    backgroundDark: '#050811',
    surfaceLight: '#ffffff',
    surfaceDark: '#0a101f',
    textPrimaryLight: '#0f172a',
    textPrimaryDark: '#f8fafc',
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
  },

  // Structured design tokens contract
  tokens: {
    colors: {
      brandPrimary: '#0891b2',
      brandPrimaryHover: '#0e7490',
      brandSecondary: '#0284c7',
      brandAccent: '#06b6d4',
      statusGood: '#10b981',
      statusModerate: '#f59e0b',
      statusSensitive: '#f97316',
      statusUnhealthy: '#ef4444',
      statusVeryUnhealthy: '#a855f7',
      statusHazardous: '#881337',
    },
    typography: {
      fontSans: "'Inter', system-ui, -apple-system, sans-serif",
      fontMono: "'JetBrains Mono', 'Fira Code', monospace",
    },
    spacing: {
      xs: '0.25rem',
      sm: '0.5rem',
      md: '1rem',
      lg: '1.5rem',
      xl: '2rem',
    },
    radius: {
      sm: '0.375rem',
      md: '0.5rem',
      lg: '0.75rem',
      xl: '1rem',
      full: '9999px',
    },
    elevation: {
      xs: '0 1px 2px 0 rgba(0, 0, 0, 0.04)',
      sm: '0 1px 3px 0 rgba(0, 0, 0, 0.05)',
      card: '0 1px 3px 0 rgba(0, 0, 0, 0.04), 0 0 0 1px rgba(15, 23, 42, 0.06)',
      elevated: '0 10px 25px -5px rgba(0, 0, 0, 0.06), 0 0 0 1px rgba(15, 23, 42, 0.08)',
    },
  },
} as const;

export type BrandingConfig = typeof BRANDING;
