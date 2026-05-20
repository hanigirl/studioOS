import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
} from 'recharts';

import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from './chart';

const meta: Meta = {
  title: 'Primitives/Chart',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Thin wrapper around recharts that injects CSS variables for series colors via `ChartConfig`. Always provide `config` keyed by series name; use `var(--color-<name>)` in `fill`/`stroke`. See `components/income-chart.tsx` for the canonical pattern.',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

const barData = [
  { month: 'Jan', thisYear: 8200, lastYear: 6100 },
  { month: 'Feb', thisYear: 9400, lastYear: 7300 },
  { month: 'Mar', thisYear: 7800, lastYear: 6800 },
  { month: 'Apr', thisYear: 10200, lastYear: 7500 },
  { month: 'May', thisYear: 11500, lastYear: 8200 },
  { month: 'Jun', thisYear: 9800, lastYear: 7900 },
];

const barConfig = {
  thisYear: { label: 'This Year', color: 'var(--chart-1)' },
  lastYear: { label: 'Last Year', color: 'var(--chart-2)' },
} satisfies ChartConfig;

export const Bars: Story = {
  render: () => (
    <ChartContainer config={barConfig} className="min-h-[300px] w-[640px]">
      <BarChart data={barData}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={10} />
        <YAxis
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
        />
        <ChartTooltip content={<ChartTooltipContent />} cursor={false} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="thisYear" fill="var(--color-thisYear)" radius={[4, 4, 0, 0]} />
        <Bar dataKey="lastYear" fill="var(--color-lastYear)" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ChartContainer>
  ),
};

const lineData = [
  { day: 'Mon', visits: 120 },
  { day: 'Tue', visits: 180 },
  { day: 'Wed', visits: 140 },
  { day: 'Thu', visits: 220 },
  { day: 'Fri', visits: 260 },
  { day: 'Sat', visits: 200 },
  { day: 'Sun', visits: 280 },
];

const lineConfig = {
  visits: { label: 'Visits', color: 'var(--chart-1)' },
} satisfies ChartConfig;

export const Line_: Story = {
  name: 'Line',
  render: () => (
    <ChartContainer config={lineConfig} className="min-h-[260px] w-[640px]">
      <LineChart data={lineData}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="day" tickLine={false} axisLine={false} tickMargin={10} />
        <YAxis tickLine={false} axisLine={false} tickMargin={8} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Line
          type="monotone"
          dataKey="visits"
          stroke="var(--color-visits)"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ChartContainer>
  ),
};
