import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Search } from 'lucide-react';

import { Input } from './input';

const meta: Meta<typeof Input> = {
  title: 'Primitives/Input',
  component: Input,
  parameters: {
    docs: {
      description: {
        component:
          'Single line input. Supports invalid state via `aria-invalid`. Combine with an absolute-positioned icon for search/leading-icon patterns.',
      },
    },
  },
  args: {
    placeholder: 'Type something…',
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  render: (args) => (
    <div className="w-72">
      <Input {...args} />
    </div>
  ),
};

export const WithLeadingIcon: Story = {
  render: () => (
    <div className="relative w-72">
      <Search className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
      <Input type="search" placeholder="Search…" className="pl-9" />
    </div>
  ),
};

export const Types: Story = {
  render: () => (
    <div className="w-72 space-y-3">
      <Input type="text" placeholder="Text" />
      <Input type="email" placeholder="you@example.com" />
      <Input type="password" placeholder="••••••••" />
      <Input type="number" placeholder="0" />
      <Input type="date" />
      <Input type="file" />
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="w-72">
      <Input disabled placeholder="Disabled input" />
    </div>
  ),
};

export const Invalid: Story = {
  render: () => (
    <div className="w-72 space-y-2">
      <Input aria-invalid="true" defaultValue="not-an-email" />
      <p className="text-xs text-destructive">Please enter a valid email.</p>
    </div>
  ),
};

export const Filled: Story = {
  render: () => (
    <div className="w-72">
      <Input defaultValue="hani@studio-os.dev" />
    </div>
  ),
};
