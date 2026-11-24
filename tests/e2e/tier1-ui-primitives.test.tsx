// ============================================================
// tests/e2e/tier1-ui-primitives.test.tsx
// Tier 1: Feature Coverage — Feature F02 (UI Component Primitives)
// Strictly follows specifications in SCOPE.md and Explorer 2 Report
// ============================================================

import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button, type ButtonVariant, type ButtonSize } from '@/components/ui/Button';
import { Badge, type BadgeVariant } from '@/components/ui/Badge';
import { Card, CardHeader, CardTitle } from '@/components/ui/Card';
import { Skeleton, EmptyState } from '@/components/ui/Skeleton';
import { ShieldLogo } from '@/components/ui/Icons';

describe('Tier 1 — Feature 02: UI Component Primitives (F2)', () => {
  it('T1-F02-01: Button Variant and Size Rendering', () => {
    const variants: ButtonVariant[] = ['primary', 'secondary', 'outline', 'ghost', 'danger', 'ai'];
    const sizes: ButtonSize[] = ['xs', 'sm', 'md', 'lg'];

    for (const variant of variants) {
      const { unmount } = render(
        <Button variant={variant} size="md">
          {variant} button
        </Button>
      );
      const btn = screen.getByRole('button', { name: `${variant} button` });
      expect(btn).toBeInTheDocument();

      if (variant === 'primary') {
        expect(btn).toHaveClass('bg-[var(--primary,#0891b2)]');
      } else if (variant === 'danger') {
        expect(btn).toHaveClass('bg-rose-600');
      }
      unmount();
    }

    for (const size of sizes) {
      const { unmount } = render(
        <Button size={size}>
          Size {size}
        </Button>
      );
      const btn = screen.getByRole('button', { name: `Size ${size}` });
      if (size === 'xs') {
        expect(btn).toHaveClass('text-xs');
      } else if (size === 'lg') {
        expect(btn).toHaveClass('text-base');
      }
      unmount();
    }
  });

  it('T1-F02-02: Button Loading State & Focus Ring', () => {
    render(
      <Button isLoading={true} leftIcon={<span data-testid="icon">icon</span>}>
        Submitting Telemetry
      </Button>
    );

    const btn = screen.getByRole('button', { name: /Submitting Telemetry/i });
    expect(btn).toBeInTheDocument();
    expect(btn).toBeDisabled();
    expect(btn).toHaveClass('disabled:cursor-not-allowed');
    expect(btn).toHaveClass('focus-visible:ring-2');

    // Loading spinner SVG should be present
    const spinner = btn.querySelector('.animate-spin');
    expect(spinner).toBeInTheDocument();
  });

  it('T1-F02-03: Badge Color Variants & Pulsing Dot', () => {
    const { container, unmount } = render(
      <Badge variant="emerald" hasDot={true} isPulsing={true}>
        Clean Corridor
      </Badge>
    );

    const badge = screen.getByText('Clean Corridor').parentElement;
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('bg-emerald-50');
    expect(badge).toHaveClass('text-emerald-800');

    // Pulsing dot verification
    const pulsingDot = container.querySelector('.animate-pulse');
    expect(pulsingDot).toBeInTheDocument();
    expect(pulsingDot).toHaveClass('bg-emerald-500');
    unmount();

    // Verify other variants render corresponding classes
    const badgeVariants: BadgeVariant[] = ['cyan', 'amber', 'rose', 'violet', 'slate'];
    for (const v of badgeVariants) {
      const { unmount: unmountV } = render(<Badge variant={v}>{v}</Badge>);
      expect(screen.getByText(v)).toBeInTheDocument();
      unmountV();
    }
  });

  it('T1-F02-04: Card Variants & Spatial Hierarchy', () => {
    const { container, unmount } = render(
      <Card variant="elevated">
        <CardHeader>
          <CardTitle>Microclimate Station</CardTitle>
        </CardHeader>
        <p>Sensor telemetry readout</p>
      </Card>
    );

    const card = container.firstElementChild;
    expect(card).toHaveClass('glass-panel-elevated');
    expect(card).toHaveClass('rounded-2xl');

    const title = screen.getByRole('heading', { level: 3 });
    expect(title).toHaveTextContent('Microclimate Station');
    expect(title).toHaveClass('font-bold');
    expect(title).toHaveClass('tracking-tight');
    unmount();

    // Test default and interactive variants
    const { container: defaultCard } = render(<Card variant="default">Default</Card>);
    expect(defaultCard.firstElementChild).toHaveClass('glass-panel');

    const { container: interactiveCard } = render(<Card variant="interactive">Interactive</Card>);
    expect(interactiveCard.firstElementChild).toHaveClass('glass-panel-interactive');
  });

  it('T1-F02-05: Skeleton Shimmer & EmptyState Component', () => {
    // 1. Skeleton Primitive
    const { container: skeletonContainer } = render(<Skeleton className="w-48 h-12" />);
    const skeleton = skeletonContainer.firstElementChild;
    expect(skeleton).toHaveAttribute('aria-hidden', 'true');
    expect(skeleton).toHaveClass('skeleton-shimmer');
    expect(skeleton).toHaveClass('rounded-xl');

    // 2. EmptyState Primitive
    let actionClicked = false;
    render(
      <EmptyState
        icon={<ShieldLogo size={20} />}
        title="No Telemetry Sensors Connected"
        description="Connect an IoT sensor or simulate a municipal emergency alert."
        action={
          <button type="button" onClick={() => { actionClicked = true; }}>
            Connect Sensor
          </button>
        }
      />
    );

    expect(screen.getByRole('heading', { level: 4, name: 'No Telemetry Sensors Connected' })).toBeInTheDocument();
    expect(screen.getByText(/Connect an IoT sensor/i)).toBeInTheDocument();

    const actionBtn = screen.getByRole('button', { name: 'Connect Sensor' });
    fireEvent.click(actionBtn);
    expect(actionClicked).toBe(true);
  });
});
