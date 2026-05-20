import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Check } from 'lucide-react';

import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from './avatar';

const meta: Meta<typeof Avatar> = {
  title: 'Primitives/Avatar',
  component: Avatar,
  parameters: {
    docs: {
      description: {
        component:
          'Three sizes via `data-size`: `sm` (24), `default` (32), `lg` (40). Children (`AvatarBadge`, `AvatarFallback`) react to the parent size via `group/avatar`. Compose into `AvatarGroup` for stacks.',
      },
    },
  },
  argTypes: {
    size: { control: 'select', options: ['sm', 'default', 'lg'] },
  },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Sizes: Story = {
  render: () => (
    <div className="flex items-end gap-4">
      <Avatar size="sm"><AvatarFallback>HB</AvatarFallback></Avatar>
      <Avatar><AvatarFallback>HB</AvatarFallback></Avatar>
      <Avatar size="lg"><AvatarFallback>HB</AvatarFallback></Avatar>
    </div>
  ),
};

export const WithImage: Story = {
  render: () => (
    <Avatar size="lg">
      <AvatarImage src="https://i.pravatar.cc/80?img=12" alt="Hani Buskila" />
      <AvatarFallback>HB</AvatarFallback>
    </Avatar>
  ),
};

export const Fallback: Story = {
  render: () => (
    <div className="flex items-end gap-4">
      <Avatar size="sm"><AvatarFallback className="font-bold">HB</AvatarFallback></Avatar>
      <Avatar><AvatarFallback className="font-bold">HB</AvatarFallback></Avatar>
      <Avatar size="lg"><AvatarFallback className="font-bold">HB</AvatarFallback></Avatar>
    </div>
  ),
};

export const WithBadge: Story = {
  render: () => (
    <div className="flex items-end gap-6">
      <Avatar size="sm">
        <AvatarFallback>HB</AvatarFallback>
        <AvatarBadge />
      </Avatar>
      <Avatar>
        <AvatarFallback>HB</AvatarFallback>
        <AvatarBadge>
          <Check />
        </AvatarBadge>
      </Avatar>
      <Avatar size="lg">
        <AvatarFallback>HB</AvatarFallback>
        <AvatarBadge>
          <Check />
        </AvatarBadge>
      </Avatar>
    </div>
  ),
};

export const Group: Story = {
  render: () => (
    <AvatarGroup>
      <Avatar><AvatarFallback>HB</AvatarFallback></Avatar>
      <Avatar><AvatarFallback>JD</AvatarFallback></Avatar>
      <Avatar><AvatarFallback>AM</AvatarFallback></Avatar>
      <AvatarGroupCount>+3</AvatarGroupCount>
    </AvatarGroup>
  ),
};
