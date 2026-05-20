import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ArrowUpRight, MoreHorizontal } from 'lucide-react';

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
  render: () => (
    <Card className="w-72 transition-[transform,box-shadow] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:shadow-md">
      <CardHeader>
        <CardTitle className="text-sm font-medium">Revenue</CardTitle>
        <CardAction>
          <MoreHorizontal className="size-4 text-muted-foreground" />
        </CardAction>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold">$12,540</p>
        <p className="text-xs text-primary">+12.5% from last month</p>
      </CardContent>
    </Card>
  ),
};

export const Grid: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-4">
      {[1, 2, 3].map((i) => (
        <Card key={i}>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Stat {i}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">$1,2{i}0</p>
            <p className="text-xs text-primary">+{i}.5%</p>
          </CardContent>
        </Card>
      ))}
    </div>
  ),
};
