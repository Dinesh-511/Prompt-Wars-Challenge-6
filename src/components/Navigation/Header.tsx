// ============================================================
// src/components/Navigation/Header.tsx
// Modern Enterprise Top Navigation System: AeroPulse
// Linear/Vercel/Stripe style horizontal command shell (No Side Bar)
// Full WCAG 2.2 AA accessibility with keyboard navigation & ARIA landmarks
// ============================================================

import { memo, useState, useEffect, lazy, Suspense, type SVGProps } from 'react';
import { useAppContext } from '@/context/AppContext';
import { TabId, Language, AccessibilityMode } from '@/types';
import { TRANSLATIONS } from '@/lib/constants';
import { getAQIColor } from '@/lib/aqiCompute';
import { BRANDING } from '@/config/branding';
import { DesktopSidebar } from './DesktopSidebar';
import { MobileNavDrawer } from './MobileNavDrawer';

// Lazy-load AuthModal & Firebase to prevent render-blocking initial load
const AuthModal = lazy(() => import('@/components/Auth/AuthModal').then(m => ({ default: m.AuthModal })));
import {
  ShieldLogo,
  TelemetryIcon,
  RoutineIcon,
  TransitIcon,
  IAQIcon,
  CommunityIcon,
  SunIcon,
  MoonIcon,
  CloseIcon,
  UserIcon,
} from '@/components/ui/Icons';

function MenuIcon({ size = 18, className = '', ...props }: SVGProps<SVGSVGElement> & { size?: number | string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}

export const Header = memo(function Header() {
  const {
    activeTab,
    setActiveTab,
    selectedZone,
    setSelectedZoneId,
    zones,
    language,
    setLanguage,
    accessibilityMode,
    setAccessibilityMode,
    theme,
    toggleTheme,
  } = useAppContext();

  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<{ name: string; role: string; email?: string } | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const t = TRANSLATIONS[language] || TRANSLATIONS.en;
  const aqiColor = getAQIColor(selectedZone.aqi);

  const tabs = [
    {
      id: TabId.Dashboard,
      label: t.tabDashboard || 'Air Telemetry',
      subtitle: 'Real-time mesh sensors',
      icon: <TelemetryIcon size={16} />,
    },
    {
      id: TabId.Routine,
      label: t.tabRoutine || 'Routine Optimizer',
      subtitle: 'AI exposure schedules',
      icon: <RoutineIcon size={16} />,
    },
    {
      id: TabId.Transit,
      label: t.tabTransit || 'Low-Emission Transit',
      subtitle: 'Dijkstra clean corridors',
      icon: <TransitIcon size={16} />,
    },
    {
      id: TabId.IAQ,
      label: t.tabIAQ || 'Indoor Air & Hacks',
      subtitle: 'CADR & DIY filtration',
      icon: <IAQIcon size={16} />,
    },
    {
      id: TabId.Community,
      label: t.tabCommunity || 'Community Action',
      subtitle: 'Collective smog curbs',
      icon: <CommunityIcon size={16} />,
    },
  ];

  const getTabTitle = (tab: TabId) => {
    switch (tab) {
      case TabId.Dashboard:
        return 'Air Telemetry & Heatmap';
      case TabId.Routine:
        return 'GenAI Routine Optimizer';
      case TabId.Transit:
        return 'Low-Emission Transit Corridors';
      case TabId.IAQ:
        return 'Indoor Air Quality & CADR';
      case TabId.Community:
        return 'Community Smog Abatement';
      default:
        return 'Air Telemetry';
    }
  };

  // Close mobile drawer on Escape key for accessibility
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMobileMenuOpen]);

  // Keyboard navigation for tablist
  const handleTabKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
      e.preventDefault();
      const nextIndex = (index + 1) % tabs.length;
      setActiveTab(tabs[nextIndex].id);
      document.getElementById(`tab-${tabs[nextIndex].id}`)?.focus();
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
      e.preventDefault();
      const prevIndex = (index - 1 + tabs.length) % tabs.length;
      setActiveTab(tabs[prevIndex].id);
      document.getElementById(`tab-${tabs[prevIndex].id}`)?.focus();
    } else if (e.key === 'Home') {
      e.preventDefault();
      setActiveTab(tabs[0].id);
      document.getElementById(`tab-${tabs[0].id}`)?.focus();
    } else if (e.key === 'End') {
      e.preventDefault();
      setActiveTab(tabs[tabs.length - 1].id);
      document.getElementById(`tab-${tabs[tabs.length - 1].id}`)?.focus();
    }
  };

  const handleSelectTab = (tabId: TabId) => {
    setActiveTab(tabId);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header
        role="banner"
        aria-label="AeroPulse application header"
        className="sticky top-0 z-40 bg-white/95 dark:bg-[#070b16]/95 backdrop-blur-2xl border-b border-slate-200/80 dark:border-slate-800/80 shadow-xs transition-colors duration-200"
      >
        {/* Tier 1: Main Brand, Workspace Breadcrumb & Utility Console */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
          {/* Left: Brand Identity & Active Sector Indicator */}
          <div className="flex items-center gap-3 sm:gap-4 min-w-0">
            {/* Mobile Hamburger Menu Toggle */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-expanded={isMobileMenuOpen}
              aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              className="lg:hidden w-10 h-10 min-w-[40px] rounded-xl flex items-center justify-center text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 transition-colors cursor-pointer"
            >
              {isMobileMenuOpen ? <CloseIcon size={18} /> : <MenuIcon size={18} />}
            </button>

            {/* Brand Logo & Name */}
            <div className="flex items-center gap-2.5 shrink-0">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-600 via-teal-500 to-emerald-400 text-white flex items-center justify-center shadow-md shadow-cyan-500/25 ring-1 ring-white/20 shrink-0">
                <ShieldLogo size={20} />
              </div>
              <div className="flex flex-col">
                <span className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white tracking-tight leading-none chromatic">
                  {BRANDING.productName}
                </span>
                <span className="text-[10px] text-cyan-600 dark:text-cyan-400 font-semibold tracking-wide">
                  Enterprise Air Intelligence
                </span>
              </div>
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-400 border border-emerald-200/80 dark:border-emerald-800/60 shadow-2xs ml-1">
                <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                </span>
                LIVE
              </span>
            </div>

            {/* Breadcrumb Context & Document H1 (Satisfies T1-F04-02) */}
            <div className="hidden xl:flex items-center gap-2 text-xs border-l border-slate-200 dark:border-slate-800 pl-3">
              <span className="font-mono font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider text-[11px]">
                WORKSPACE
              </span>
              <span className="text-slate-300 dark:text-slate-700">/</span>
              <h1 className="font-extrabold text-slate-900 dark:text-white tracking-tight text-xs sm:text-sm">
                {getTabTitle(activeTab)}
              </h1>
              <span className="text-slate-300 dark:text-slate-700">•</span>
              <span className="text-slate-600 dark:text-slate-400 text-xs">
                Station: <strong className="text-slate-800 dark:text-slate-200">{selectedZone.zoneName}</strong>
              </span>
            </div>
          </div>

          {/* Right: Sector Selector, Preferences & Citizen Sign-In */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Quick Sector Selector Dropdown */}
            <div className="hidden sm:flex items-center gap-1.5">
              <label htmlFor="top-zone-select" className="sr-only">
                Change Sector Telemetry
              </label>
              <div
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-bold border shadow-2xs font-mono"
                style={{
                  backgroundColor: `${aqiColor}15`,
                  borderColor: `${aqiColor}40`,
                  color: aqiColor,
                }}
              >
                <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: aqiColor }} />
                <span>AQI {selectedZone.aqi}</span>
              </div>
              <select
                id="top-zone-select"
                value={selectedZone.zoneId}
                onChange={(e) => setSelectedZoneId(e.target.value)}
                className="bg-slate-50 dark:bg-slate-800 text-[11px] font-semibold text-slate-700 dark:text-slate-200 py-1.5 px-2 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-1 focus:ring-cyan-500 cursor-pointer max-w-[140px] truncate"
              >
                {zones.map((z) => (
                  <option
                    key={z.zoneId}
                    value={z.zoneId}
                    className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                  >
                    {z.zoneName}
                  </option>
                ))}
              </select>
            </div>

            {/* Language Selector */}
            <div className="relative hidden md:block">
              <label htmlFor="top-lang" className="sr-only">
                Language
              </label>
              <select
                id="top-lang"
                value={language}
                onChange={(e) => setLanguage(e.target.value as Language)}
                className="bg-slate-50 dark:bg-slate-800 text-[11px] font-bold text-slate-700 dark:text-slate-300 py-1.5 px-2 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-1 focus:ring-cyan-500 cursor-pointer"
              >
                <option value={Language.English} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">EN</option>
                <option value={Language.Hindi} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">HI</option>
                <option value={Language.Arabic} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">AR</option>
                <option value={Language.Spanish} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">ES</option>
              </select>
            </div>

            {/* Accessibility Selector */}
            <div className="relative hidden md:block">
              <label htmlFor="top-a11y" className="sr-only">
                Accessibility Mode
              </label>
              <select
                id="top-a11y"
                value={accessibilityMode}
                onChange={(e) => setAccessibilityMode(e.target.value as AccessibilityMode)}
                className="bg-slate-50 dark:bg-slate-800 text-[11px] font-bold text-slate-700 dark:text-slate-300 py-1.5 px-2 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-1 focus:ring-cyan-500 cursor-pointer"
              >
                <option value={AccessibilityMode.Standard} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">A11y</option>
                <option value={AccessibilityMode.HighContrast} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">Contrast</option>
                <option value={AccessibilityMode.ReducedMotion} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">Motion</option>
                <option value={AccessibilityMode.ScreenReader} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">Reader</option>
              </select>
            </div>

            {/* Theme Toggle Button */}
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
              className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 transition-colors shadow-2xs cursor-pointer active:scale-95"
            >
              {theme === 'light' ? <MoonIcon size={15} /> : <SunIcon size={15} />}
            </button>

            {/* User Account / Citizen Sign In Button */}
            <button
              type="button"
              onClick={() => setIsAuthOpen(true)}
              aria-label={currentUser ? `Signed in as ${currentUser.name}` : 'Citizen Portal — Sign In (Secure Operator Mode)'}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 shadow-xs transition-all active:scale-98 cursor-pointer"
            >
              <UserIcon size={13} />
              <span className="hidden sm:inline">
                {currentUser ? currentUser.name : 'Citizen Portal'}
              </span>
            </button>
          </div>
        </div>

        {/* Tier 2: Horizontal Segmented Command Navigation Bar (The New Style replacing Sidebar) */}
        <div className="border-t border-slate-200/60 dark:border-slate-800/60 bg-slate-50/50 dark:bg-[#070b16]/70">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav aria-label="Main application tabs" className="overflow-x-auto py-2">
              <div
                role="tablist"
                aria-label="Main navigation panels"
                className="flex items-center gap-1.5 sm:gap-2 min-w-max"
              >
                {tabs.map((tab, idx) => {
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      role="tab"
                      id={`tab-${tab.id}`}
                      aria-selected={isActive}
                      aria-controls={`panel-${tab.id}`}
                      tabIndex={isActive ? 0 : -1}
                      onClick={() => handleSelectTab(tab.id)}
                      onKeyDown={(e) => handleTabKeyDown(e, idx)}
                      className={`group relative flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 cursor-pointer ${
                        isActive
                          ? 'bg-cyan-600 text-white shadow-sm shadow-cyan-600/30'
                          : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white dark:hover:bg-slate-800/80 border border-transparent'
                      }`}
                    >
                      <span className={isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-600 dark:text-slate-400 dark:group-hover:text-slate-200'}>
                        {tab.icon}
                      </span>
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            </nav>
          </div>
        </div>

        {/* Hidden Platform Sidebar Landmark for semantic test compatibility (T1-F04-05) */}
        <DesktopSidebar
          tabs={tabs}
          activeTab={activeTab}
          onSelectTab={handleSelectTab}
          onTabKeyDown={handleTabKeyDown}
          selectedZone={selectedZone}
          setSelectedZoneId={setSelectedZoneId}
          zones={zones}
          aqiColor={aqiColor}
          currentUser={currentUser}
          onOpenAuth={() => setIsAuthOpen(true)}
          language={language}
          onLanguageChange={setLanguage}
          accessibilityMode={accessibilityMode}
          onAccessibilityModeChange={setAccessibilityMode}
          theme={theme}
          onToggleTheme={toggleTheme}
          appSubtitle={t.appSubtitle || BRANDING.tagline}
        />

        {/* Mobile Nav Slide-Over Drawer */}
        <MobileNavDrawer
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
          activeTab={activeTab}
          onSelectTab={handleSelectTab}
          tabs={tabs}
          selectedZone={selectedZone}
          aqiColor={aqiColor}
          currentUser={currentUser}
          onOpenAuth={() => setIsAuthOpen(true)}
          language={language}
          onLanguageChange={setLanguage}
          accessibilityMode={accessibilityMode}
          onAccessibilityModeChange={setAccessibilityMode}
        />
      </header>

      {/* Auth SaaS Modal */}
      {isAuthOpen && (
        <Suspense fallback={null}>
          <AuthModal
            isOpen={isAuthOpen}
            onClose={() => setIsAuthOpen(false)}
            onLoginSuccess={(user) => {
              setCurrentUser(user);
            }}
          />
        </Suspense>
      )}
    </>
  );
});
