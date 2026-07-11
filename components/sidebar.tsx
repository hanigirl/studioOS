"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Home,
  FolderOpen,
  ListTodo,
  ChartPie,
  Settings,
  ChevronsUpDown,
  Users,
} from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const mainNav = [
  { label: "Dashboard", href: "/", icon: Home },
  { label: "Projects", href: "/projects", icon: FolderOpen },
  { label: "Tasks", href: "/tasks", icon: ListTodo },
]

const secondaryNav = [
  { label: "Analytics", href: "/analytics", icon: ChartPie },
  { label: "Team", href: "/team", icon: Users },
  { label: "Settings", href: "/settings", icon: Settings },
]

const userName = "Meyrav Gutshtein"

function getInitials(name: string) {
  const parts = name.trim().split(/\s+/)
  return parts.slice(0, 2).map((part) => part[0]).join("").toUpperCase()
}

export function TeamSwitcher() {
  return (
    <SidebarMenuButton size="lg" className="data-[state=open]:bg-sidebar-accent">
      <Avatar size="sm">
        <AvatarFallback className="font-bold">{getInitials(userName)}</AvatarFallback>
      </Avatar>
      <div className="grid flex-1 text-left text-sm leading-tight min-w-0">
        <span className="truncate font-semibold">{userName}</span>
        <span className="truncate text-xs text-sidebar-foreground/70">Manager</span>
      </div>
      <ChevronsUpDown className="size-4 ml-auto" />
    </SidebarMenuButton>
  )
}

function NavGroup({
  items,
  label,
}: {
  items: typeof mainNav
  label: string
}) {
  const pathname = usePathname()

  return (
    <SidebarGroup>
      <SidebarGroupLabel>{label}</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton asChild isActive={pathname === item.href} tooltip={item.label}>
                <Link href={item.href}>
                  <item.icon />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}

export function AppSidebar() {
  return (
    <Sidebar variant="inset">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <TeamSwitcher />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavGroup items={mainNav} label="Platform" />
        <NavGroup items={secondaryNav} label="Workspace" />
      </SidebarContent>
    </Sidebar>
  )
}
