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
          'KPI card used on the Dashboard. Composed from `Card`\'s sub-parts: `CardHeader` holds a `CardDescription` (label) and `CardTitle` (large value, `text-3xl font-bold`), and `CardFooter` holds the muted caption. See `components/dashboard/stat-card.tsx`.',
      },
    },
  },
  argTypes: {
    label: { control: 'text' },
    value: { control: 'text' },
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
    caption: '+12% from last week',
  },
};

export const NegativeChange: Story = {
  decorators: single,
  args: {
    label: 'To Do',
    value: '12',
    caption: '-3 from last week',
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
