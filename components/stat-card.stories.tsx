import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { DollarSign, FolderOpen, ListTodo, Users } from 'lucide-react';

import { StatCard } from './stat-card';

const meta: Meta<typeof StatCard> = {
  title: 'Features/StatCard',
  component: StatCard,
  parameters: {
    docs: {
      description: {
        component:
          'Compact KPI card used on the dashboard. Composes `Card` + `CardHeader` + `CardTitle` + `CardAction` + `CardContent`. Includes the standard hover lift motion.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof StatCard>;

export const Revenue: Story = {
  args: {
    title: 'Revenue',
    value: '$12,540',
    change: '+12.5% from last month',
    icon: DollarSign,
  },
};

export const Projects: Story = {
  args: {
    title: 'Active Projects',
    value: '12',
    change: '+2 this week',
    icon: FolderOpen,
  },
};

export const Tasks: Story = {
  args: {
    title: 'Open Tasks',
    value: '38',
    change: '-5 since Monday',
    icon: ListTodo,
  },
};

export const Grid: Story = {
  render: () => (
    <div className="grid grid-cols-4 gap-4 w-[900px]">
      <StatCard title="Revenue" value="$12,540" change="+12.5%" icon={DollarSign} />
      <StatCard title="Active Projects" value="12" change="+2 this week" icon={FolderOpen} />
      <StatCard title="Open Tasks" value="38" change="-5 since Monday" icon={ListTodo} />
      <StatCard title="Team Members" value="6" change="No change" icon={Users} />
    </div>
  ),
};
