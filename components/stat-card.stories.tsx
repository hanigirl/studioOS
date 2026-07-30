import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { StatCard } from './stat-card';

const meta: Meta<typeof StatCard> = {
  title: 'Features/StatCard',
  component: StatCard,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'KPI card: title + outline badge (auto up/down icon from the `change` sign), big value, trend sentence with icon, muted caption.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof StatCard>;

export const Positive: Story = {
  args: {
    title: 'Total Revenue',
    value: '$1,250.00',
    change: '+12.5%',
    trend: 'Trending up this month',
    caption: 'Visitors for the last 6 months',
  },
};

export const Negative: Story = {
  args: {
    title: 'New Customers',
    value: '1,234',
    change: '-20%',
    trend: 'Down 20% this period',
    caption: 'Acquisition needs attention',
  },
};

export const Row: Story = {
  render: () => (
    <div className="flex flex-wrap gap-6">
      <StatCard
        title="Total Revenue"
        value="$1,250.00"
        change="+12.5%"
        trend="Trending up this month"
        caption="Visitors for the last 6 months"
      />
      <StatCard
        title="New Customers"
        value="1,234"
        change="-20%"
        trend="Down 20% this period"
        caption="Acquisition needs attention"
      />
      <StatCard
        title="Active Accounts"
        value="45,678"
        change="+12.5%"
        trend="Strong user retention"
        caption="Acquisition needs attention"
      />
      <StatCard
        title="Growth Rate"
        value="1,234"
        change="+4.5%"
        trend="Steady performance increase"
        caption="Acquisition needs attention"
      />
    </div>
  ),
};
