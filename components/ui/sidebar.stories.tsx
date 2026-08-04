import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Home, FolderOpen, ListTodo, Users, Settings, BarChart3 } from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from './sidebar';

const meta: Meta<typeof Sidebar> = {
  title: 'Primitives/Sidebar',
  component: Sidebar,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'App shell sidebar. Renders inside a `SidebarProvider`. The real product uses `variant="inset"` and groups items into Platform / Workspace. See `components/sidebar.tsx` for the production composition.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Sidebar>;

const mainNav = [
  { label: 'Dashboard', icon: Home, isActive: true },
  { label: 'Projects', icon: FolderOpen },
  { label: 'Tasks', icon: ListTodo },
];

const secondaryNav = [
  { label: 'Analytics', icon: BarChart3 },
  { label: 'Team', icon: Users },
  { label: 'Settings', icon: Settings },
];

export const InsetVariant: Story = {
  render: () => (
    <SidebarProvider>
      <Sidebar variant="inset">
        <SidebarHeader>
          <div className="px-2 py-1 text-sm font-semibold">Studio OS</div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Platform</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {mainNav.map((item) => (
                  <SidebarMenuItem key={item.label}>
                    <SidebarMenuButton isActive={item.isActive} tooltip={item.label}>
                      <item.icon />
                      <span>{item.label}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          <SidebarGroup>
            <SidebarGroupLabel>Workspace</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {secondaryNav.map((item) => (
                  <SidebarMenuItem key={item.label}>
                    <SidebarMenuButton tooltip={item.label}>
                      <item.icon />
                      <span>{item.label}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-14 items-center gap-2 px-4">
          <SidebarTrigger />
          <span className="text-sm font-medium">Main content area</span>
        </header>
        <div className="p-6 text-sm text-muted-foreground">
          The sidebar above is the real app shell. Toggle collapse with the trigger.
        </div>
      </SidebarInset>
    </SidebarProvider>
  ),
};
