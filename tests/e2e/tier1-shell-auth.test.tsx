// ============================================================
// tests/e2e/tier1-shell-auth.test.tsx
// Tier 1: Feature Coverage — Features F04 (Shell & Nav) & F05 (Auth Modal)
// Strictly follows specifications in SCOPE.md and Explorer 2 Report
// ============================================================

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor, cleanup } from '@testing-library/react';
import App from '@/App';
import { AuthModal } from '@/components/Auth/AuthModal';

describe('Tier 1 — Feature 04: Shell, Navigation & Viewports (F4)', () => {
  afterEach(() => {
    cleanup();
  });

  it('T1-F04-01: Desktop Sidebar Tab Navigation', async () => {
    render(<App />);

    // Click Routine tab
    const routineTab = screen.getByRole('tab', { name: /Routine Optimizer/i });
    fireEvent.click(routineTab);
    expect(await screen.findByText(/GenAI Daily Routine & Smog Exposure Optimizer/i)).toBeInTheDocument();
    expect(routineTab).toHaveAttribute('aria-selected', 'true');

    // Click Transit tab
    const transitTab = screen.getByRole('tab', { name: /Low-Emission Transit/i });
    fireEvent.click(transitTab);
    expect(await screen.findByText(/Low-Exposure Commute & Transit Path Optimizer/i)).toBeInTheDocument();
    expect(transitTab).toHaveAttribute('aria-selected', 'true');

    // Click IAQ tab
    const iaqTab = screen.getByRole('tab', { name: /Indoor Air & Hacks/i });
    fireEvent.click(iaqTab);
    expect(await screen.findByText(/Room CADR & Indoor Air Quality/i)).toBeInTheDocument();
    expect(iaqTab).toHaveAttribute('aria-selected', 'true');

    // Click Community tab
    const communityTab = screen.getByRole('tab', { name: /Community Action/i });
    fireEvent.click(communityTab);
    expect(await screen.findByText(/Community Smog Abatement Dashboard/i)).toBeInTheDocument();
    expect(communityTab).toHaveAttribute('aria-selected', 'true');

    // Click Dashboard tab back
    const dashboardTab = screen.getByRole('tab', { name: /Air Telemetry/i });
    fireEvent.click(dashboardTab);
    expect(screen.getByLabelText(/Hyperlocal AQI Telemetry Dashboard/i)).toBeInTheDocument();
    expect(dashboardTab).toHaveAttribute('aria-selected', 'true');
  });

  it('T1-F04-02: Workspace Header Dynamic Title & Station Breadcrumb', async () => {
    render(<App />);

    // Initial Dashboard state
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Air Telemetry & Heatmap');
    expect(screen.getByText(/Station:/i)).toBeInTheDocument();
    expect(screen.getAllByText('Central Business District').length).toBeGreaterThan(0);

    // Switch to IAQ tab
    const iaqTab = screen.getByRole('tab', { name: /Indoor Air & Hacks/i });
    fireEvent.click(iaqTab);

    // Header H1 title updates dynamically
    expect(await screen.findByRole('heading', { level: 1 })).toHaveTextContent('Indoor Air Quality & CADR');
    expect(screen.getByText(/Station:/i)).toBeInTheDocument();
    expect(screen.getAllByText('Central Business District').length).toBeGreaterThan(0);
  });

  it('T1-F04-03: Mobile Top Bar & Hamburger Drawer Toggle', () => {
    render(<App />);

    const menuBtn = screen.getByLabelText('Open navigation menu');
    expect(menuBtn).toBeInTheDocument();
    expect(menuBtn).toHaveAttribute('aria-expanded', 'false');

    // Click to open mobile navigation drawer
    fireEvent.click(menuBtn);
    expect(menuBtn).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByLabelText('Close navigation menu')).toBeInTheDocument();

    // Close by clicking again
    fireEvent.click(menuBtn);
    expect(menuBtn).toHaveAttribute('aria-expanded', 'false');
  });

  it('T1-F04-04: Keyboard Skip Link Navigation', () => {
    const { container } = render(<App />);

    const skipLink = container.querySelector('a[href="#main-content"]');
    expect(skipLink).toBeInTheDocument();
    expect(skipLink).toHaveTextContent('Skip to main content');
    expect(skipLink).toHaveClass('sr-only');
    expect(skipLink).toHaveClass('focus:not-sr-only');
  });

  it('T1-F04-05: Semantic HTML Landmarks Conformance', () => {
    const { container } = render(<App />);

    // Exactly one banner
    const banners = screen.getAllByRole('banner');
    expect(banners.length).toBe(1);

    // Exactly one main landmark with id="main-content"
    const mainLandmarks = screen.getAllByRole('main');
    expect(mainLandmarks.length).toBe(1);
    expect(mainLandmarks[0]).toHaveAttribute('id', 'main-content');

    // Exactly one contentinfo (footer)
    const footers = screen.getAllByRole('contentinfo');
    expect(footers.length).toBe(1);

    // Desktop sidebar landmark exists
    const aside = container.querySelector('aside[aria-label="Platform Sidebar Navigation"]');
    expect(aside).toBeInTheDocument();
  });
});

describe('Tier 1 — Feature 05: Citizen & Operator Auth Modal (F5)', () => {
  beforeEach(() => {
    vi.useRealTimers();
  });

  afterEach(() => {
    cleanup();
  });

  it('T1-F05-01: Auth Modal Open and Close Triggers', async () => {
    render(<App />);

    // Open Auth modal via sidebar sign in button
    const authBtn = screen.getByLabelText(/Citizen Portal — Sign In/i);
    fireEvent.click(authBtn);

    // Modal dialog is displayed
    const modal = await screen.findByRole('dialog');
    expect(modal).toBeInTheDocument();
    expect(modal).toHaveAttribute('aria-modal', 'true');
    expect(screen.getByText('Portal Sign In')).toBeInTheDocument();

    // Close modal via close button
    const closeBtn = screen.getByLabelText('Close dialog');
    fireEvent.click(closeBtn);

    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });

  it('T1-F05-02: Operator Quick-Fill Demo Credentials', () => {
    render(<AuthModal isOpen={true} onClose={vi.fn()} />);

    // Click Director Chen fast-fill button
    const quickFillBtn = screen.getByRole('button', { name: /Director Chen/i });
    fireEvent.click(quickFillBtn);

    const emailInput = screen.getByLabelText(/Work \/ Public Health Email/i) as HTMLInputElement;
    const passwordInput = screen.getByLabelText(/Security Key \/ Password/i) as HTMLInputElement;

    expect(emailInput.value).toBe('director.chen@airway.org');
    expect(passwordInput.value).toBe('••••••••••••');
  });

  it('T1-F05-03: Two-Factor OTP Step Transition', async () => {
    render(<AuthModal isOpen={true} onClose={vi.fn()} />);

    // Quick-fill credentials and submit
    fireEvent.click(screen.getByRole('button', { name: /Director Chen/i }));
    fireEvent.click(screen.getByRole('button', { name: /Authenticate & Open Dashboard/i }));

    // Verify view switches to OTP two-factor verification
    expect(await screen.findByText('Two-Factor Verification')).toBeInTheDocument();
    expect(screen.getByText(/Verification passcode dispatched to/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Verify & Finalize Access/i })).toBeInTheDocument();
  });

  it('T1-F05-04: Successful Authentication Session & User Profile Chip', async () => {
    const handleLoginSuccess = vi.fn();
    render(<AuthModal isOpen={true} onClose={vi.fn()} onLoginSuccess={handleLoginSuccess} />);

    // Navigate to OTP view
    fireEvent.click(screen.getByRole('button', { name: /Director Chen/i }));
    fireEvent.click(screen.getByRole('button', { name: /Authenticate & Open Dashboard/i }));
    expect(await screen.findByText('Two-Factor Verification')).toBeInTheDocument();

    // Fill OTP token and submit
    fireEvent.click(screen.getByRole('button', { name: /Auto-fill demo token/i }));
    fireEvent.click(screen.getByRole('button', { name: /Verify & Finalize Access/i }));

    // Login success callback should be called with Operator details
    await waitFor(
      () => {
        expect(handleLoginSuccess).toHaveBeenCalledWith(
          expect.objectContaining({
            name: 'Dr. Sarah Chen',
            role: 'Municipal Resilience Director',
            email: 'director.chen@airway.org',
          })
        );
      },
      { timeout: 3000 }
    );
  });

  it('T1-F05-05: Forgot Password Recovery Form Workflow', async () => {
    render(<AuthModal isOpen={true} onClose={vi.fn()} />);

    // Navigate to forgot password view
    fireEvent.click(screen.getByRole('button', { name: /Forgot key\?/i }));
    expect(screen.getByText('Account Recovery')).toBeInTheDocument();

    const emailInput = screen.getByLabelText(/Account Email/i) as HTMLInputElement;
    fireEvent.change(emailInput, { target: { value: 'director.chen@airway.org' } });

    fireEvent.click(screen.getByRole('button', { name: /Dispatch Recovery Token/i }));

    expect(
      await screen.findByText(/(Password recovery instructions|Recovery link) dispatched to director\.chen@airway\.org/i)
    ).toBeInTheDocument();
  });
});
