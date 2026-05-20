import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { TeamCard } from './team-card';

const meta: Meta<typeof TeamCard> = {
  title: 'Features/TeamCard',
  component: TeamCard,
  parameters: {
    docs: {
      description: {
        component:
          'Public-facing team member card. Falls back to colored initials when no photo is provided. Social icons render only for the platforms that have a URL.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof TeamCard>;

export const FullProfile: Story = {
  args: {
    member: {
      name: 'Hani Buskila',
      role: 'Product Designer\nStudio OS',
      photo: 'https://i.pravatar.cc/200?img=47',
      socials: {
        instagram: 'https://instagram.com/',
        linkedin: 'https://linkedin.com/',
        youtube: 'https://youtube.com/',
      },
    },
  },
};

export const InitialsFallback: Story = {
  args: {
    member: {
      name: 'Jordan Doe',
      role: 'Brand Lead',
      fallbackColor: 'bg-primary',
      socials: { linkedin: 'https://linkedin.com/' },
    },
  },
};

export const NoSocials: Story = {
  args: {
    member: {
      name: 'Alex Morgan',
      role: 'Engineering',
      photo: 'https://i.pravatar.cc/200?img=15',
    },
  },
};

export const Grid: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-4 w-[900px]">
      <TeamCard
        member={{
          name: 'Hani Buskila',
          role: 'Product Designer',
          photo: 'https://i.pravatar.cc/200?img=47',
          socials: { instagram: '#', linkedin: '#' },
        }}
      />
      <TeamCard
        member={{
          name: 'Jordan Doe',
          role: 'Brand Lead',
          fallbackColor: 'bg-primary',
          socials: { linkedin: '#' },
        }}
      />
      <TeamCard
        member={{
          name: 'Alex Morgan',
          role: 'Engineering',
          photo: 'https://i.pravatar.cc/200?img=15',
        }}
      />
    </div>
  ),
};
