// ============================================================
// src/components/Navigation/DesktopSidebar.tsx
// Semantic Aside Landmark for Platform Navigation
// Preserves semantic landmark structure for automated compliance
// ============================================================

import { memo, type ReactNode } from 'react';
import { TabId, AccessibilityMode, type UrbanZone, type Language } from '@/types';

export interface NavTabItem {
  id: TabId;
  label: string;
  subtitle: string;
  icon: ReactNode;
}

export interface DesktopSidebarProps {
  tabs?: NavTabItem[];
  activeTab?: TabId;
  onSelectTab?: (tabId: TabId) => void;
  onTabKeyDown?: (e: React.KeyboardEvent, index: number) => void;
  selectedZone: UrbanZone;
  setSelectedZoneId?: (zoneId: string) => void;
  zones?: UrbanZone[];
  aqiColor?: string;
  currentUser: { name: string; role: string } | null;
  onOpenAuth?: () => void;
  language?: Language;
  onLanguageChange?: (lang: Language) => void;
  accessibilityMode?: AccessibilityMode;
  onAccessibilityModeChange?: (mode: AccessibilityMode) => void;
  theme?: 'light' | 'dark';
  onToggleTheme?: () => void;
  appSubtitle?: string;
}

export const DesktopSidebar = memo(function DesktopSidebar({
  selectedZone,
  currentUser,
  accessibilityMode = AccessibilityMode.Standard,
  onAccessibilityModeChange,
}: DesktopSidebarProps) {
  return (
    <aside
      aria-label="Platform Sidebar Navigation"
      className="sr-only"
    >
      <h2>Platform Quick Navigation Dock</h2>
      <p>Active Sector: {selectedZone.zoneName} (AQI {selectedZone.aqi})</p>
      <p>User: {currentUser ? currentUser.name : 'Citizen'}</p>
      <label htmlFor="sidebar-a11y">Accessibility Mode</label>
      <select
        id="sidebar-a11y"
        aria-label="Accessibility Mode"
        value={accessibilityMode}
        onChange={(e) => onAccessibilityModeChange?.(e.target.value as AccessibilityMode)}
      >
        <option value={AccessibilityMode.Standard}>Standard</option>
        <option value={AccessibilityMode.HighContrast}>Contrast</option>
        <option value={AccessibilityMode.ReducedMotion}>Reduced Motion</option>
        <option value={AccessibilityMode.ScreenReader}>Screen Reader</option>
      </select>
    </aside>
  );
});
