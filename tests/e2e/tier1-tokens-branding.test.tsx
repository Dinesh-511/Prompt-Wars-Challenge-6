// ============================================================
// tests/e2e/tier1-tokens-branding.test.tsx
// Tier 1: Feature Coverage — Features F01 (Tokens) & F03 (Branding)
// Strictly follows specifications in SCOPE.md and Explorer 2 Report
// ============================================================

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import fs from 'fs';
import path from 'path';
import App from '@/App';
import { BRANDING } from '@/config/branding';
import { HeroAqiDisplay } from '@/components/Dashboard/HeroAqiDisplay';
import { ShieldLogo } from '@/components/ui/Icons';
import { getAQIColor, calculateAQICategory } from '@/lib/aqiCompute';

describe('Tier 1 — Feature 01: Centralized Design Tokens (F1)', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute('data-theme');
    document.documentElement.className = '';
  });

  afterEach(() => {
    cleanup();
  });

  it('T1-F01-01: Light Theme CSS Variable Root Declarations', () => {
    // 1. Verify CSS variables exist in src/index.css master token file
    const cssContent = fs.readFileSync(path.resolve(process.cwd(), 'src/index.css'), 'utf-8');
    expect(cssContent).toContain('--bg-base: #f8fafc;');
    expect(cssContent).toContain('--bg-surface: #ffffff;');
    expect(cssContent).toContain('--primary: #0891b2;');
    expect(cssContent).toContain('--status-good: #10b981;');
    expect(cssContent).toContain('--text-primary: #0f172a;');

    // 2. Verify mounting App sets data-theme="light" on root element
    render(<App />);
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
  });

  it('T1-F01-02: Dark Theme Theme Attribute Toggle', () => {
    render(<App />);

    // Click theme toggle button in DesktopSidebar
    const themeBtns = screen.getAllByRole('button', { name: /switch to dark theme/i });
    expect(themeBtns.length).toBeGreaterThan(0);
    fireEvent.click(themeBtns[0]);

    // Verify root attributes switch to dark
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    expect(document.documentElement.classList.contains('dark')).toBe(true);

    // Verify theme toggle button label flips to light theme switch
    expect(screen.getAllByRole('button', { name: /switch to light theme/i }).length).toBeGreaterThan(0);
  });

  it('T1-F01-03: EPA Semantic Status Palette Mapping', () => {
    // Verify getAQIColor mappings for all standard EPA bands
    expect(getAQIColor(35)).toBe('#10b981'); // Good
    expect(getAQIColor(75)).toBe('#f59e0b'); // Moderate
    expect(getAQIColor(125)).toBe('#f97316'); // Unhealthy for Sensitive Groups
    expect(getAQIColor(175)).toBe('#ef4444'); // Unhealthy
    expect(getAQIColor(250)).toBe('#a855f7'); // Very Unhealthy
    expect(getAQIColor(400)).toBe('#881337'); // Hazardous

    // Test HeroAqiDisplay rendering corresponding categories & styles
    const testCases = [
      { aqi: 35, category: calculateAQICategory(35), color: getAQIColor(35) },
      { aqi: 175, category: calculateAQICategory(175), color: getAQIColor(175) },
      { aqi: 400, category: calculateAQICategory(400), color: getAQIColor(400) },
    ];

    for (const { aqi, category, color } of testCases) {
      const { unmount } = render(
        <HeroAqiDisplay
          aqi={aqi}
          aqiColor={color}
          aqiCategory={category}
          dominantPollutant="PM2.5"
          spectrumPosition={(aqi / 500) * 100}
        />
      );
      expect(screen.getAllByText(aqi.toString()).length).toBeGreaterThan(0);
      expect(screen.getAllByText(category).length).toBeGreaterThan(0);
      unmount();
    }
  });

  it('T1-F01-04: Typography Scale & Font Families', () => {
    render(<App />);

    // Main workspace title should have tracking-tight and font-extrabold
    const workspaceHeading = screen.getByRole('heading', { level: 1 });
    expect(workspaceHeading).toHaveClass('font-extrabold');
    expect(workspaceHeading).toHaveClass('tracking-tight');

    // Telemetry readouts and station badges should have font-mono
    const stationBadge = screen.getByText(/Station \[STN-/i);
    expect(stationBadge).toHaveClass('font-mono');
  });

  it('T1-F01-05: High-Contrast Accessibility Mode Surface Contrast', () => {
    const { container } = render(<App />);

    // Select "Contrast" (high-contrast) in sidebar accessibility mode selector
    const a11ySelect = container.querySelector('#sidebar-a11y') as HTMLSelectElement;
    expect(a11ySelect).toBeInTheDocument();
    fireEvent.change(a11ySelect, { target: { value: 'high-contrast' } });

    // Verify main outer container applies contrast-125
    const outerWrapper = container.firstElementChild;
    expect(outerWrapper).toHaveClass('contrast-125');
  });
});

describe('Tier 1 — Feature 03: Enterprise Brand Identity & Assets (F3)', () => {
  afterEach(() => {
    cleanup();
  });

  it('T1-F03-01: Centralized Branding Configuration Values', () => {
    render(<App />);

    // 1. Product Name from BRANDING is rendered
    expect(screen.getAllByText(BRANDING.productName).length).toBeGreaterThan(0);

    // 2. Version from BRANDING is rendered in footer
    expect(screen.getByText(BRANDING.version)).toBeInTheDocument();

    // 3. Engine attribution text is rendered in footer
    expect(screen.getByText(/Powered by/i)).toBeInTheDocument();
    expect(screen.getByText(/Community Engine/i)).toBeInTheDocument();
  });

  it('T1-F03-02: HTML Document Metadata & Title', () => {
    const htmlPath = path.resolve(process.cwd(), 'index.html');
    const htmlContent = fs.readFileSync(htmlPath, 'utf-8');

    // Title starts with or contains AirWay
    expect(htmlContent).toMatch(/<title>AirWay/);

    // og:site_name metadata is AirWay
    expect(htmlContent).toContain('property="og:site_name" content="AirWay"');

    // Favicon is present
    expect(htmlContent).toContain('rel="icon"');
  });

  it('T1-F03-03: SVG Brand Logo Rendering', () => {
    const { container } = render(<ShieldLogo size={24} className="test-shield-logo" />);
    const svg = container.querySelector('svg');

    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute('viewBox', '0 0 24 24');
    expect(svg).toHaveClass('test-shield-logo');

    // Verify shield outline path and checkmark path
    const paths = svg?.querySelectorAll('path');
    expect(paths && paths.length).toBeGreaterThanOrEqual(1);
  });

  it('T1-F03-04: Absence of Legacy Stadium Tokens', () => {
    const cssPath = path.resolve(process.cwd(), 'src/index.css');
    const cssContent = fs.readFileSync(cssPath, 'utf-8');

    // Zero active --stadium- tokens
    expect(cssContent).not.toMatch(/--stadium-/);

    // Rendered app must not contain raw stadium utility classes
    const { container } = render(<App />);
    expect(container.innerHTML).not.toContain('stadium-');
  });

  it('T1-F03-05: Purge of Legacy Prototype Artifacts', () => {
    // Scan rendered DOM across viewports to confirm no familytreehub2025 artifacts
    const { container } = render(<App />);
    expect(container.textContent).not.toContain('familytreehub2025');

    // Scan branding configuration object
    const brandingStr = JSON.stringify(BRANDING);
    expect(brandingStr).not.toContain('familytreehub2025');
  });
});
