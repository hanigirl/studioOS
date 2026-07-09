"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Bell, Key, Monitor, Palette, User } from "lucide-react"

import { cn } from "@/lib/utils"
import type { SettingsNavItem } from "./types"

const navItems: SettingsNavItem[] = [
  { title: "Profile", href: "/settings", icon: User },
  { title: "Account", href: "/settings/account", icon: Key },
  { title: "Appearance", href: "/settings/appearance", icon: Palette },
  { title: "Notifications", href: "/settings/notifications", icon: Bell },
  { title: "Display", href: "/settings/display", icon: Monitor },
]

export function SettingsNav() {
  const pathname = usePathname()

  return (
    <nav className="flex w-48 shrink-0 flex-col gap-1">
      {navItems.map((item) => {
        const isActive = pathname === item.href
        return (
          <Link
            key={item.href}
            href={item.href}
            data-slot="settings-nav-item"
            className={cn(
              "flex h-8 items-center gap-2 rounded-md p-2 text-sm font-medium text-sidebar-foreground transition-colors hover:bg-sidebar-accent/50",
              isActive && "bg-sidebar-accent text-sidebar-accent-foreground hover:bg-sidebar-accent"
            )}
          >
            <item.icon className="size-4" aria-hidden />
            {item.title}
          </Link>
        )
      })}
    </nav>
  )
}
