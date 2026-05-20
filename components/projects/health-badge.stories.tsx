import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { TooltipProvider } from '@/components/ui/tooltip';
import { HealthBadge, HealthDot } from './health-badge';

const meta: Meta<typeof HealthBadge> = {
  title: 'Features/HealthBadge',
  component: HealthBadge,
  decorators: [
    (Story) => (
      <TooltipProvider>
        <Story />
      </TooltipProvider>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component:
          'Project health status with the canonical emerald / amber / red triad. Always include a `reason` for the tooltip — health without context is useless. `HealthDot` is the compact variant for dense rows.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof HealthBadge>;

export const Healthy: Story = {
  args: { health: 'Healthy', reason: 'On track. No blockers.' },
};

export const AtRisk: Story = {
  args: { health: 'At Risk', reason: 'Waiting on client feedback for 4 days.' },
};

export const Critical: Story = {
  args: { health: 'Critical', reason: 'Past deadline. Escalated to PM.' },
};

export const AllThree: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <HealthBadge health="Healthy" reason="On track." />
      <HealthBadge health="At Risk" reason="Waiting on feedback." />
      <HealthBadge health="Critical" reason="Past deadline." />
    </div>
  ),
};

export const Dots: Story = {
  render: () => (
    <div className="flex items-center gap-4 text-sm">
      <span className="inline-flex items-center gap-2"><HealthDot health="Healthy" /> Healthy</span>
      <span className="inline-flex items-center gap-2"><HealthDot health="At Risk" /> At Risk</span>
      <span className="inline-flex items-center gap-2"><HealthDot health="Critical" /> Critical</span>
    </div>
  ),
};
