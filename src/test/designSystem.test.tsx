import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BRANDING } from '@/config/branding';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/Card';
import { Modal } from '@/components/ui/Modal';
import { Skeleton, EmptyState } from '@/components/ui/Skeleton';
import {
  ChevronRightIcon,
  MenuIcon,
  ZapIcon,
  SlidersIcon,
  InfoIcon,
  CheckIcon,
  ShieldLogo,
} from '@/components/ui/Icons';

describe('Milestone 1 Design System & Brand Asset Infrastructure', () => {
  describe('Centralized BRANDING Configuration', () => {
    it('preserves exact productName for test assertions', () => {
      expect(BRANDING.productName).toBe('AirWay');
    });

    it('defines companyName and enterprise suiteName', () => {
      expect(BRANDING.companyName).toBe('AirWay Technologies Inc.');
      expect(BRANDING.suiteName).toContain('Enterprise');
    });

    it('provides contact details conforming to interface contracts', () => {
      expect(BRANDING.contact).toBeDefined();
      expect(BRANDING.contact.email).toBe('contact@airway.org');
      expect(BRANDING.contact.support).toBe('support@airway.org');
    });

    it('contains comprehensive design token hierarchy', () => {
      expect(BRANDING.tokens).toBeDefined();
      expect(BRANDING.tokens.colors.brandPrimary).toBe('#0891b2');
      expect(BRANDING.tokens.colors.statusGood).toBe('#10b981');
      expect(BRANDING.tokens.colors.statusHazardous).toBe('#881337');
      expect(BRANDING.tokens.typography.fontSans).toBeDefined();
      expect(BRANDING.tokens.spacing.md).toBe('1rem');
      expect(BRANDING.tokens.radius.md).toBe('0.5rem');
      expect(BRANDING.tokens.elevation.card).toBeDefined();
    });
  });

  describe('UI Primitive: Button', () => {
    it('renders text content with role button', () => {
      render(<Button>Click Me</Button>);
      expect(screen.getByRole('button', { name: 'Click Me' })).toBeInTheDocument();
    });

    it('handles dual prop aliases for loading state (isLoading and loading)', () => {
      const { rerender } = render(<Button isLoading>Processing 1</Button>);
      const btn1 = screen.getByRole('button', { name: 'Processing 1' });
      expect(btn1).toBeDisabled();
      expect(btn1).toHaveAttribute('aria-busy', 'true');

      rerender(<Button loading>Processing 2</Button>);
      const btn2 = screen.getByRole('button', { name: 'Processing 2' });
      expect(btn2).toBeDisabled();
      expect(btn2).toHaveAttribute('aria-busy', 'true');
    });

    it('handles dual prop aliases for icons (leftIcon and icon)', () => {
      const { rerender } = render(
        <Button leftIcon={<span data-testid="left-icon">IconA</span>}>Button A</Button>
      );
      expect(screen.getByTestId('left-icon')).toBeInTheDocument();

      rerender(
        <Button icon={<span data-testid="icon-alias">IconB</span>}>Button B</Button>
      );
      expect(screen.getByTestId('icon-alias')).toBeInTheDocument();
    });
  });

  describe('UI Primitive: Badge', () => {
    it('renders with default emerald styles', () => {
      render(<Badge>Active Status</Badge>);
      expect(screen.getByText('Active Status')).toBeInTheDocument();
    });

    it('supports semantic status aliases (good, moderate, sensitive, unhealthy, hazardous)', () => {
      const { rerender } = render(<Badge variant="good">Good</Badge>);
      expect(screen.getByText('Good')).toBeInTheDocument();

      rerender(<Badge variant="moderate">Moderate</Badge>);
      expect(screen.getByText('Moderate')).toBeInTheDocument();

      rerender(<Badge variant="sensitive">Sensitive</Badge>);
      expect(screen.getByText('Sensitive')).toBeInTheDocument();

      rerender(<Badge variant="unhealthy">Unhealthy</Badge>);
      expect(screen.getByText('Unhealthy')).toBeInTheDocument();

      rerender(<Badge variant="hazardous">Hazardous</Badge>);
      expect(screen.getByText('Hazardous')).toBeInTheDocument();
    });

    it('supports dual pulse and dot prop aliases', () => {
      const { container } = render(<Badge dot pulse>Live Telemetry</Badge>);
      const dotSpan = container.querySelector('.animate-pulse');
      expect(dotSpan).toBeInTheDocument();
    });

    it('supports size variants (sm, md, lg)', () => {
      const { container, rerender } = render(<Badge size="sm">Small</Badge>);
      expect(container.firstChild).toHaveClass('text-[10px]');

      rerender(<Badge size="lg">Large</Badge>);
      expect(container.firstChild).toHaveClass('text-xs');
    });
  });

  describe('UI Primitive: Card', () => {
    it('renders all Card subcomponents cleanly', () => {
      render(
        <Card padding="sm">
          <CardHeader>
            <CardTitle>Telemetry Report</CardTitle>
            <CardDescription>Hyperlocal sensor metrics</CardDescription>
          </CardHeader>
          <CardContent>Content Area</CardContent>
          <CardFooter>Footer Actions</CardFooter>
        </Card>
      );

      expect(screen.getByText('Telemetry Report')).toBeInTheDocument();
      expect(screen.getByText('Hyperlocal sensor metrics')).toBeInTheDocument();
      expect(screen.getByText('Content Area')).toBeInTheDocument();
      expect(screen.getByText('Footer Actions')).toBeInTheDocument();
    });
  });

  describe('UI Primitive: Modal', () => {
    it('renders accessible dialog with title, description, and closes on Escape', async () => {
      const user = userEvent.setup();
      const onClose = vi.fn();

      render(
        <Modal
          isOpen={true}
          onClose={onClose}
          title="Filter Preferences"
          description="Customize pollutant alert thresholds"
        >
          <button type="button">Inside Button</button>
        </Modal>
      );

      expect(screen.getByRole('dialog')).toBeInTheDocument();
      expect(screen.getByText('Filter Preferences')).toBeInTheDocument();
      expect(screen.getByText('Customize pollutant alert thresholds')).toBeInTheDocument();

      await user.keyboard('{Escape}');
      expect(onClose).toHaveBeenCalled();
    });
  });

  describe('UI Primitive: Skeleton & EmptyState', () => {
    it('renders skeleton with various variants', () => {
      const { container, rerender } = render(<Skeleton variant="circular" width={40} height={40} />);
      expect(container.firstChild).toHaveClass('rounded-full');

      rerender(<Skeleton variant="card" />);
      expect(container.firstChild).toHaveClass('h-48');
    });

    it('renders EmptyState with title and action', () => {
      render(
        <EmptyState
          title="No Stations Found"
          description="Try broadening your geographic radius."
          action={<button>Reset Filters</button>}
        />
      );

      expect(screen.getByText('No Stations Found')).toBeInTheDocument();
      expect(screen.getByText('Try broadening your geographic radius.')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Reset Filters' })).toBeInTheDocument();
    });
  });

  describe('UI Primitive: Icons', () => {
    it('exports all newly added and existing icons', () => {
      const { container } = render(
        <div>
          <ChevronRightIcon data-testid="chevron-right" />
          <MenuIcon data-testid="menu" />
          <ZapIcon data-testid="zap" />
          <SlidersIcon data-testid="sliders" />
          <InfoIcon data-testid="info" />
          <CheckIcon data-testid="check" />
          <ShieldLogo data-testid="shield-logo" />
        </div>
      );

      expect(screen.getByTestId('chevron-right')).toBeInTheDocument();
      expect(screen.getByTestId('menu')).toBeInTheDocument();
      expect(screen.getByTestId('zap')).toBeInTheDocument();
      expect(screen.getByTestId('sliders')).toBeInTheDocument();
      expect(screen.getByTestId('info')).toBeInTheDocument();
      expect(screen.getByTestId('check')).toBeInTheDocument();
      expect(screen.getByTestId('shield-logo')).toBeInTheDocument();
      expect(container.querySelectorAll('svg').length).toBe(7);
    });
  });
});
