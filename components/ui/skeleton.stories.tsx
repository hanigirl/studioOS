import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Skeleton } from './skeleton';
import { Card, CardContent, CardHeader } from './card';

const meta: Meta<typeof Skeleton> = {
  title: 'Primitives/Skeleton',
  component: Skeleton,
  parameters: {
    docs: {
      description: {
        component:
          'Loading placeholder. Always size with explicit width/height utilities. Use the same shape as the content it replaces (`rounded-full` for avatars, `rounded-md` for buttons, `rounded-xl` for cards).',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

export const Block: Story = {
  render: () => <Skeleton className="h-4 w-48" />,
};

export const Circle: Story = {
  render: () => <Skeleton className="size-10 rounded-full" />,
};

export const CardSkeleton: Story = {
  render: () => (
    <Card className="w-80">
      <CardHeader>
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-3 w-48" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-8 w-24" />
      </CardContent>
    </Card>
  ),
};

export const RowList: Story = {
  render: () => (
    <div className="w-80 space-y-3">
      {[0, 1, 2, 3].map((i) => (
        <div key={i} className="flex items-center gap-3">
          <Skeleton className="size-8 rounded-full" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-3 w-2/3" />
            <Skeleton className="h-3 w-1/3" />
          </div>
        </div>
      ))}
    </div>
  ),
};
