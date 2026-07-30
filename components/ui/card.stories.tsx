import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ArrowUpRight, TrendingUp } from 'lucide-react';

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './card';
import { Button } from './button';
import { Badge } from './badge';

const meta: Meta<typeof Card> = {
  title: 'Primitives/Card',
  component: Card,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Container surface. Always compose with `CardHeader`, `CardTitle`, `CardDescription`, `CardAction`, `CardContent`, `CardFooter` — do not collapse to a single div. Internal padding is already set (px-6, py-6).',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  render: () => (
    <Card className="w-80">
      <CardHeader>
        <CardTitle>Card title</CardTitle>
        <CardDescription>Short supporting copy.</CardDescription>
      </CardHeader>
      <CardContent>Body content goes here.</CardContent>
    </Card>
  ),
};

export const WithAction: Story = {
  render: () => (
    <Card className="w-80">
      <CardHeader>
        <CardTitle>Active Projects</CardTitle>
        <CardDescription>6 projects in progress.</CardDescription>
        <CardAction>
          <Button variant="outline" size="sm">
            View all <ArrowUpRight />
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>List of projects renders here.</CardContent>
    </Card>
  ),
};

export const WithFooter: Story = {
  render: () => (
    <Card className="w-80">
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
        <CardDescription>You have 3 unread messages.</CardDescription>
      </CardHeader>
      <CardContent>Notification list…</CardContent>
      <CardFooter className="border-t">
        <Button size="sm" className="w-full">Mark all as read</Button>
      </CardFooter>
    </Card>
  ),
};

export const StatCardPattern: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'How `Card` + `Badge` compose into a KPI stat. The shipped component lives at `components/dashboard/stat-card.tsx` — see the **Dashboard/StatCard** stories.',
      },
    },
  },
  render: () => (
    <Card className="w-72 gap-0 py-0 transition-[transform,box-shadow] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:shadow-md">
      <CardContent className="flex flex-col gap-2 p-4">
        <div className="flex items-center justify-between gap-2">
          <span className="text-sm">Tasks Completed</span>
          <Badge variant="outline" className="rounded-full font-semibold">
            <TrendingUp /> +12%
          </Badge>
        </div>
        <p className="text-3xl font-semibold tracking-tight">34</p>
        <div className="flex items-center gap-1.5 text-sm font-medium">
          <span>Trending up this month</span>
          <TrendingUp className="size-4" />
        </div>
        <p className="text-xs text-muted-foreground">
          34 tasks completed this week
        </p>
      </CardContent>
    </Card>
  ),
};
