import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Separator } from './separator';

const meta: Meta<typeof Separator> = {
  title: 'Primitives/Separator',
  component: Separator,
  parameters: {
    docs: {
      description: {
        component:
          'Decorative or semantic divider. `orientation="horizontal"` (default) renders a 1px row, `vertical` renders a 1px column. Uses `--border`.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Separator>;

export const Horizontal: Story = {
  render: () => (
    <div className="w-80">
      <div className="text-sm font-medium">Section title</div>
      <Separator className="my-3" />
      <div className="text-sm text-muted-foreground">Body content below the divider.</div>
    </div>
  ),
};

export const Vertical: Story = {
  render: () => (
    <div className="flex h-12 items-center gap-3 text-sm">
      <span>Edit</span>
      <Separator orientation="vertical" />
      <span>Duplicate</span>
      <Separator orientation="vertical" />
      <span className="text-destructive">Delete</span>
    </div>
  ),
};
