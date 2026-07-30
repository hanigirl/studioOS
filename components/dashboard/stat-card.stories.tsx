import type { Meta, StoryObj, Decorator } from '@storybook/nextjs-vite';

import { StatCard } from './stat-card';
import { dashboardStats } from './data';

const meta: Meta<typeof StatCard> = {
  title: 'Dashboard/StatCard',
  component: StatCard,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'KPI card used on the Dashboard. Anatomy (top → bottom): label + trend `Badge` (outline pill with trending icon + change), large value (`text-3xl font-semibold`), a trend line (text + trending icon), and a muted caption. Built from the `Card` and `Badge` primitives — see `components/dashboard/stat-card.tsx`.',
      },
    },
  },
  argTypes: {
    trend: {
      control: 'inline-radio',
      options: ['up', 'down'],
    },
    label: { control: 'text' },
    value: { control: 'text' },
    change: { control: 'text' },
    trendText: { control: 'text' },
    caption: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof StatCard>;

/** Constrain single-card stories to one dashboard column width. */
const single: Decorator[] = [
  (Story) => (
    <div className="w-72">
      <Story />
    </div>
  ),
];

export const Default: Story = {
  decorators: single,
  args: {
    label: 'Tasks Completed',
    value: '34',
    change: '+12%',
    trend: 'up',
    trendText: 'Trending up this month',
    caption: '34 tasks completed this week',
  },
};

export const DownTrend: Story = {
  decorators: single,
  args: {
    label: 'To Do',
    value: '12',
    change: '-3',
    trend: 'down',
    trendText: 'Down from last week',
    caption: '3 fewer than last week',
  },
};

export const DashboardGrid: Story = {
  name: 'Dashboard grid',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story:
          'All four cards as rendered on the Dashboard, driven by `dashboardStats` in `components/dashboard/data.ts`.',
      },
    },
  },
  render: () => (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {dashboardStats.map((stat) => (
        <StatCard key={stat.label} {...stat} />
      ))}
    </div>
  ),
};
