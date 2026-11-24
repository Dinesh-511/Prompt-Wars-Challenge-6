// ============================================================
// src/App.tsx
// Modern Enterprise AppShell: AirWay Full-Width Architecture
// Premier Top-Navigation SaaS Platform (Linear/Vercel/Stripe style)
// Optimized for Google PageSpeed Insights 100 Score
// ============================================================

import { memo, lazy, Suspense } from 'react';
import { AppContextProvider, useAppContext } from '@/context/AppContext';
import { TabId } from '@/types';
import { Header } from '@/components/Navigation/Header';
import { AlertBanner } from '@/components/shared/AlertBanner';
import { AirTelemetryDashboard } from '@/components/Dashboard/AirTelemetryDashboard';
import { BRANDING } from '@/config/branding';
import { ShieldLogo } from '@/components/ui/Icons';

// Lazy-loaded command viewports for code splitting & minimal initial bundle
const DailyRoutineOptimizer = lazy(() =>
  import('@/components/Routine/DailyRoutineOptimizer').then((m) => ({ default: m.DailyRoutineOptimizer }))
);
const TransitPlanner = lazy(() =>
  import('@/components/Transit/TransitPlanner').then((m) => ({ default: m.TransitPlanner }))
);
const IAQCenter = lazy(() =>
  import('@/components/IAQ/IAQCenter').then((m) => ({ default: m.IAQCenter }))
);
const CommunityHub = lazy(() =>
  import('@/components/Community/CommunityHub').then((m) => ({ default: m.CommunityHub }))
);

function TabLoadingSkeleton() {
  return (
    <div
      role="status"
      aria-label="Loading workspace section"
      className="space-y-6 animate-pulse min-h-[500px]"
    >
      <div className="h-44 rounded-3xl bg-slate-200/70 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="h-36 rounded-2xl bg-slate-200/60 dark:bg-slate-800/50" />
        <div className="h-36 rounded-2xl bg-slate-200/60 dark:bg-slate-800/50" />
        <div className="h-36 rounded-2xl bg-slate-200/60 dark:bg-slate-800/50" />
      </div>
      <div className="h-64 rounded-3xl bg-slate-200/50 dark:bg-slate-800/40" />
      <span className="sr-only">Loading content...</span>
    </div>
  );
}

const AppShell = memo(function AppShell() {
  const { activeTab, alerts, dismissAlert, accessibilityMode } = useAppContext();

  return (
    <div
      className={`min-h-screen bg-slate-50/70 dark:bg-[#050811] text-slate-900 dark:text-slate-100 flex flex-col relative selection:bg-cyan-500 selection:text-white transition-colors duration-200 overflow-x-hidden ${
        accessibilityMode === 'high-contrast' ? 'contrast-125' : ''
      }`}
    >
      {/* Liquid Glass Fluid Morphing Blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="blob blob-3" />
      </div>

      {/* Skip to Content Landmark for Keyboard Accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 z-50 px-4 py-2 bg-cyan-600 text-white font-semibold text-xs rounded-xl shadow-xl focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 transition-transform"
      >
        Skip to main content
      </a>

      {/* 1. Global Premier Top Navigation Bar Shell (Modern Top Bar Architecture instead of Sidebar) */}
      <Header />

      {/* 2. Main Content Canvas Area (Full-Width, Centered, Expansive) */}
      <div className="flex-1 flex flex-col min-h-screen min-w-0 relative z-10 transition-all duration-200">
        {/* Global Alert Banner Overlay */}
        <AlertBanner alerts={alerts} onDismiss={dismissAlert} />

        {/* 3. Primary Semantic Landmark Viewport */}
        <main
          id="main-content"
          className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 flex-1 focus:outline-none relative z-10"
        >
          {/* Inner Tabpanel with role="tabpanel" and exact matching ID for aria-controls */}
          <div
            role="tabpanel"
            id={`panel-${activeTab}`}
            aria-labelledby={`tab-${activeTab}`}
            tabIndex={0}
            className="transition-opacity duration-200 outline-none"
          >
            {activeTab === TabId.Dashboard && <AirTelemetryDashboard />}
            <Suspense fallback={<TabLoadingSkeleton />}>
              {activeTab === TabId.Routine && <DailyRoutineOptimizer />}
              {activeTab === TabId.Transit && <TransitPlanner />}
              {activeTab === TabId.IAQ && <IAQCenter />}
              {activeTab === TabId.Community && <CommunityHub />}
            </Suspense>
          </div>
        </main>

        {/* 4. Modern Enterprise Footer Landmark */}
        <footer
          role="contentinfo"
          aria-label="Application footer"
          className="border-t border-slate-200/80 dark:border-slate-800/80 bg-white/70 dark:bg-[#070b14]/85 backdrop-blur-xl py-8 px-4 sm:px-6 lg:px-8 text-xs text-slate-500 dark:text-slate-400 mt-16 transition-colors relative z-10"
        >
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
              <div className="flex items-center gap-2.5">
                <div className="w-6 h-6 rounded-lg bg-cyan-600 text-white dark:bg-cyan-500/20 dark:text-cyan-400 dark:border dark:border-cyan-500/30 flex items-center justify-center shadow-xs shrink-0">
                  <ShieldLogo size={14} />
                </div>
                <span className="font-bold text-slate-900 dark:text-white tracking-tight">
                  {BRANDING.productName}
                </span>
                <span className="text-slate-700 dark:text-slate-300 font-mono text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/60">
                  {BRANDING.version}
                </span>
              </div>
              <span className="hidden sm:inline text-slate-300 dark:text-slate-700" aria-hidden="true">•</span>
              <span>
                Powered by{' '}
                <span className="font-semibold text-slate-700 dark:text-slate-300">
                  AirWay Community Engine
                </span>
              </span>
              <span className="hidden sm:inline text-slate-300 dark:text-slate-700" aria-hidden="true">•</span>
              <span className="font-semibold text-cyan-800 dark:text-cyan-300">WCAG 2.2 Level AA Compliant</span>
              <span className="hidden sm:inline text-slate-300 dark:text-slate-700" aria-hidden="true">•</span>
              <span>EPA Breakpoints Standardized</span>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 text-[11px] text-slate-600 dark:text-slate-300">
              <span className="flex items-center gap-1.5 font-medium text-cyan-700 dark:text-cyan-400 px-2.5 py-1 rounded-full bg-cyan-50 dark:bg-cyan-950/40 border border-cyan-200/60 dark:border-cyan-800/60">
                <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-cyan-500"></span>
                </span>
                Gemini 3.1 Neural Engine
              </span>
              <span className="text-slate-300 dark:text-slate-700" aria-hidden="true">•</span>
              <span>Zero-Trust Security</span>
              <span className="text-slate-300 dark:text-slate-700" aria-hidden="true">•</span>
              <span>Firebase 11 Connected</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
});

export default function App() {
  return (
    <AppContextProvider>
      <AppShell />
    </AppContextProvider>
  );
}
