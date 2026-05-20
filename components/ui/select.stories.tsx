import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from './select';

const meta: Meta<typeof Select> = {
  title: 'Primitives/Select',
  component: Select,
  parameters: {
    docs: {
      description: {
        component:
          'Native-feeling dropdown built on `radix-ui`. Trigger has two sizes (`sm` / `default`) via `data-size`. Always provide a `SelectValue` inside the trigger.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Select>;

export const Default: Story = {
  render: () => (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="apple">Apple</SelectItem>
        <SelectItem value="banana">Banana</SelectItem>
        <SelectItem value="orange">Orange</SelectItem>
      </SelectContent>
    </Select>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Select>
        <SelectTrigger size="sm" className="w-[160px]">
          <SelectValue placeholder="Small" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="a">Option A</SelectItem>
          <SelectItem value="b">Option B</SelectItem>
        </SelectContent>
      </Select>
      <Select>
        <SelectTrigger className="w-[160px]">
          <SelectValue placeholder="Default" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="a">Option A</SelectItem>
          <SelectItem value="b">Option B</SelectItem>
        </SelectContent>
      </Select>
    </div>
  ),
};

export const WithGroups: Story = {
  render: () => (
    <Select>
      <SelectTrigger className="w-[220px]">
        <SelectValue placeholder="Pick a metric" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Revenue</SelectLabel>
          <SelectItem value="mrr">MRR</SelectItem>
          <SelectItem value="arr">ARR</SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectLabel>Pipeline</SelectLabel>
          <SelectItem value="qualified">Qualified</SelectItem>
          <SelectItem value="closed-won">Closed won</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  ),
};

export const Preselected: Story = {
  render: () => (
    <Select defaultValue="6">
      <SelectTrigger className="w-[140px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="3">3 months</SelectItem>
        <SelectItem value="6">6 months</SelectItem>
        <SelectItem value="12">12 months</SelectItem>
      </SelectContent>
    </Select>
  ),
};

export const Disabled: Story = {
  render: () => (
    <Select disabled>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Disabled" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="a">A</SelectItem>
      </SelectContent>
    </Select>
  ),
};
