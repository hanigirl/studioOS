import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './sheet';
import { Button } from './button';
import { Input } from './input';

const meta: Meta<typeof Sheet> = {
  title: 'Primitives/Sheet',
  component: Sheet,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Side panel. Four sides via `side="right" | "left" | "top" | "bottom"`. Always include `SheetTitle` and ideally `SheetDescription` for a11y.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Sheet>;

export const Right: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open right sheet</Button>
      </SheetTrigger>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>Update your display name and bio.</SheetDescription>
        </SheetHeader>
        <div className="px-4 space-y-3">
          <div className="space-y-1">
            <label className="text-sm font-medium" htmlFor="name">Name</label>
            <Input id="name" defaultValue="Hani Buskila" />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium" htmlFor="role">Role</label>
            <Input id="role" defaultValue="Product Designer" />
          </div>
        </div>
        <SheetFooter>
          <Button>Save changes</Button>
          <SheetClose asChild>
            <Button variant="outline">Cancel</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
};

export const Left: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open left sheet</Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Navigation</SheetTitle>
        </SheetHeader>
        <div className="px-4 text-sm text-muted-foreground">Sheet content.</div>
      </SheetContent>
    </Sheet>
  ),
};

export const Bottom: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open bottom sheet</Button>
      </SheetTrigger>
      <SheetContent side="bottom">
        <SheetHeader>
          <SheetTitle>Quick add</SheetTitle>
          <SheetDescription>Create something fast.</SheetDescription>
        </SheetHeader>
        <div className="px-4 pb-4 text-sm text-muted-foreground">Bottom sheet content.</div>
      </SheetContent>
    </Sheet>
  ),
};
