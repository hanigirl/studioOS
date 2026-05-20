import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { TaskRow } from './task-row';
import type { TodayTask } from './types';

const baseTask: TodayTask = {
  id: '1',
  title: 'Final logo round for Wix homepage',
  project: 'App Redesign',
  client: 'Wix',
  status: 'in-progress',
  priority: 'High',
  assignee: { name: 'Hani Buskila', initials: 'HB', color: 'bg-primary' },
  due: new Date(new Date().setHours(14, 30, 0, 0)).toISOString(),
};

const meta: Meta<typeof TaskRow> = {
  title: 'Features/TaskRow',
  component: TaskRow,
  parameters: {
    docs: {
      description: {
        component:
          'A task row inside a Today zone (Now / Later / Blocked). Visually mirrors the kanban TaskCard — same priority pill (High = red-100, Medium = amber-100, Low = muted). The row only carries priority; status comes from the parent zone.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof TaskRow>;

export const HighPriority: Story = {
  args: { task: baseTask },
  render: (args) => (
    <div className="w-80">
      <TaskRow {...args} />
    </div>
  ),
};

export const MediumPriority: Story = {
  args: {
    task: { ...baseTask, priority: 'Medium', title: 'Review Monday brand handoff' },
  },
  render: (args) => (
    <div className="w-80">
      <TaskRow {...args} />
    </div>
  ),
};

export const LowPriority: Story = {
  args: {
    task: { ...baseTask, priority: 'Low', title: 'Update folder of references' },
  },
  render: (args) => (
    <div className="w-80">
      <TaskRow {...args} />
    </div>
  ),
};

export const Overdue: Story = {
  args: {
    task: {
      ...baseTask,
      title: 'Slack dashboard hand-off',
      isOverdue: true,
      due: new Date(new Date().setHours(9, 0, 0, 0)).toISOString(),
    },
  },
  render: (args) => (
    <div className="w-80">
      <TaskRow {...args} />
    </div>
  ),
};

export const ZoneList: Story = {
  render: () => (
    <div className="w-80 space-y-3">
      <TaskRow task={baseTask} />
      <TaskRow task={{ ...baseTask, id: '2', priority: 'Medium', title: 'Review Monday brand handoff' }} />
      <TaskRow task={{ ...baseTask, id: '3', priority: 'Low', title: 'Tidy references folder' }} />
      <TaskRow
        task={{
          ...baseTask,
          id: '4',
          title: 'Slack dashboard hand-off',
          isOverdue: true,
          due: new Date(new Date().setHours(9, 0, 0, 0)).toISOString(),
        }}
      />
    </div>
  ),
};
