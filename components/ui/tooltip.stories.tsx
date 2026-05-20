import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Info } from 'lucide-react';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './tooltip';
import { Button } from './button';

const meta: Meta<typeof Tooltip> = {
  title: 'Primitives/Tooltip',
  component: Tooltip,
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
          'Always wrap with `TooltipProvider` (usually once at app root). Trigger via `TooltipTrigger asChild`. Used for the focus ring + extra context — never for primary content.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline">Hover me</Button>
      </TooltipTrigger>
      <TooltipContent>Concise hint goes here.</TooltipContent>
    </Tooltip>
  ),
};

export const Sides: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-6">
      {(['top', 'right', 'bottom', 'left'] as const).map((side) => (
        <Tooltip key={side}>
          <TooltipTrigger asChild>
            <Button variant="outline" size="sm">{side}</Button>
          </TooltipTrigger>
          <TooltipContent side={side}>Anchored {side}</TooltipContent>
        </Tooltip>
      ))}
    </div>
  ),
};

export const OnIcon: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <button type="button" className="text-muted-foreground" aria-label="What is MRR?">
          <Info className="size-4" />
        </button>
      </TooltipTrigger>
      <TooltipContent>Monthly recurring revenue.</TooltipContent>
    </Tooltip>
  ),
};
