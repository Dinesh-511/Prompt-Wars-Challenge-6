// ============================================================
// tests/e2e/tier1-air-telemetry.test.tsx
// Tier 1: Feature Coverage — Feature F06 (Air Telemetry Dashboard)
// Strictly follows specifications in SCOPE.md and Explorer 2 Report
// ============================================================

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { AppContextProvider } from '@/context/AppContext';
import { AirTelemetryDashboard } from '@/components/Dashboard/AirTelemetryDashboard';

describe('Tier 1 — Feature 06: Air Telemetry Dashboard (F6)', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    cleanup();
  });

  it('T1-F06-01: Hero AQI Metric & Category Badge Rendering', () => {
    render(
      <AppContextProvider>
        <AirTelemetryDashboard />
      </AppContextProvider>
    );

    // Initial default zone: Central Business District (AQI 218)
    expect(screen.getByRole('text', { name: /Current AQI is 218/i })).toBeInTheDocument();
    expect(screen.getAllByText('Very Unhealthy').length).toBeGreaterThan(0);
    expect(screen.getAllByText('PM2.5').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Central Business District').length).toBeGreaterThan(0);
  });

  it('T1-F06-02: Winter Smog Spike Simulation Trigger', () => {
    render(
      <AppContextProvider>
        <AirTelemetryDashboard />
      </AppContextProvider>
    );

    const spikeBtn = screen.getByRole('button', { name: /Simulate Winter Smog Spike/i });
    expect(spikeBtn).toBeInTheDocument();

    // Trigger smog spike (+45 AQI)
    fireEvent.click(spikeBtn);

    // 218 + 45 = 263
    expect(screen.getByRole('text', { name: /Current AQI is 263/i })).toBeInTheDocument();
    expect(screen.getAllByText('Very Unhealthy').length).toBeGreaterThan(0);
  });

  it('T1-F06-03: Solar Wind Cleansing Simulation Trigger', () => {
    render(
      <AppContextProvider>
        <AirTelemetryDashboard />
      </AppContextProvider>
    );

    const cleanBtn = screen.getByRole('button', { name: /Simulate Solar Wind Cleansing/i });
    expect(cleanBtn).toBeInTheDocument();

    // Trigger solar wind cleansing (-50 AQI) from 218 -> 168
    fireEvent.click(cleanBtn);

    // 168 is in the "Unhealthy" category
    expect(screen.getByRole('text', { name: /Current AQI is 168/i })).toBeInTheDocument();
    expect(screen.getAllByText('Unhealthy').length).toBeGreaterThan(0);
  });

  it('T1-F06-04: Spatial Smog Heatmap Sensor Nodes & Screen Reader Twin', () => {
    render(
      <AppContextProvider>
        <AirTelemetryDashboard />
      </AppContextProvider>
    );

    // Verify SVG heatmap exists (has aria-label and role="group")
    const svgMap = screen.getByLabelText(/Interactive city air quality sector map/i);
    expect(svgMap).toBeInTheDocument();
    expect(svgMap.tagName.toLowerCase()).toBe('svg');

    // Verify screen-reader twin list exists with .sr-only class
    const srList = screen.getByLabelText('Urban air quality heatmap description');
    expect(srList).toBeInTheDocument();
    expect(srList).toHaveClass('sr-only');
    expect(srList.tagName.toLowerCase()).toBe('ul');

    // Verify accessible items exist for all 5 monitored zones
    const items = srList.querySelectorAll('li');
    expect(items.length).toBe(5);
  });

  it('T1-F06-05: Sector Card Quick Selection', () => {
    render(
      <AppContextProvider>
        <AirTelemetryDashboard />
      </AppContextProvider>
    );

    // Find "North Industrial Belt" card in sectors grid
    const industrialCard = screen.getByRole('article', { name: /North Industrial Belt air quality status/i });
    expect(industrialCard).toBeInTheDocument();

    // Click to focus telemetry on North Industrial Belt
    fireEvent.click(industrialCard);

    // Verify hero displays updated station and AQI (342)
    expect(screen.getByRole('text', { name: /Current AQI is 342/i })).toBeInTheDocument();
    expect(screen.getAllByText('Hazardous').length).toBeGreaterThan(0);
    expect(screen.getByText(/Station \[STN-INDUSTRIAL\]/i)).toBeInTheDocument();
  });
});
