import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { TrendingDown, TrendingUp, Check } from 'lucide-react';

import { Badge } from './badge';

const meta: Meta<typeof Badge> = {
  title: 'Primitives/Badge',
  component: Badge,
  parameters: {
    docs: {
      description: {
        component:
          'Compact status/label pill. Variants modeled with `cva` in `components/ui/badge.tsx`. Icons auto-size to `size-3`. Use `variant="outline"` + `className="rounded-full"` for the trend badge on the dashboard StatCard.',
      },
    },
  },
  args: {
    children: 'Badge',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'secondary', 'destructive', 'outline'],
    },
    asChild: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Badge variant="default">Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="destructive">Destructive</Badge>
    </div>
  ),
};

export const WithIcon: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Badge variant="secondary">
        <Check /> Verified
      </Badge>
      <Badge variant="outline">
        <TrendingUp /> +12%
      </Badge>
    </div>
  ),
};

export const TrendPills: Story = {
  name: 'Trend pills (StatCard)',
  parameters: {
    docs: {
      description: {
        story:
          'The exact badge used in the dashboard StatCard: `outline` variant, `rounded-full`, semibold, with a trending-up/down icon.',
      },
    },
  },
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Badge variant="outline" className="rounded-full font-semibold">
        <TrendingUp /> +12%
      </Badge>
      <Badge variant="outline" className="rounded-full font-semibold">
        <TrendingDown /> -3
      </Badge>
    </div>
  ),
};
