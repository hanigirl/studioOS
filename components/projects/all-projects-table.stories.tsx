import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { TooltipProvider } from '@/components/ui/tooltip';
import { AllProjectsTable } from './all-projects-table';
import { danielProjects, overflowExtras } from './data';

const meta: Meta<typeof AllProjectsTable> = {
  title: 'Projects/AllProjectsTable',
  component: AllProjectsTable,
  parameters: { layout: 'padded' },
  decorators: [
    (Story) => (
      <TooltipProvider delayDuration={200}>
        <Story />
      </TooltipProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof AllProjectsTable>;

export const Default: Story = {
  args: { projects: [...danielProjects, ...overflowExtras] },
};

export const Empty: Story = {
  name: 'Empty — no projects',
  args: { projects: [] },
  parameters: {
    docs: {
      description: {
        story:
          'When there are no projects at all, the table chrome is replaced by a single call-to-action empty state.',
      },
    },
  },
};

export const FilteredEmpty: Story = {
  name: 'Empty — filtered',
  args: { projects: danielProjects.filter((p) => p.status === 'Design') },
  parameters: {
    docs: {
      description: {
        story:
          'Projects exist but the active status tab has none. Click a status tab with no matches (e.g. Handoff) to see the filter-scoped empty state with a "Clear filter" action.',
      },
    },
  },
};
