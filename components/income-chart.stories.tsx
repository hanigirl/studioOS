import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { IncomeChart } from './income-chart';

const meta: Meta<typeof IncomeChart> = {
  title: 'Features/IncomeChart',
  component: IncomeChart,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Bar chart comparing this year vs last year monthly income. The period selector (3/6/12 months) lives in the `CardAction` slot. Wraps the chart in a `Card` so it shares the hover-lift rhythm with `StatCard`.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof IncomeChart>;

export const Default: Story = {
  render: () => (
    <div className="w-[720px]">
      <IncomeChart />
    </div>
  ),
};
