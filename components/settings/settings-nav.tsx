"use client"

import { cn } from "@/lib/utils"
import { settingsNavItems } from "./data"
import type { SettingsSection } from "./types"

interface SettingsNavProps {
  active: SettingsSection
  onSelect: (section: SettingsSection) => void
  className?: string
}

export function SettingsNav({ active, onSelect, className }: SettingsNavProps) {
  return (
    <nav className={cn("flex shrink-0 flex-col gap-1 sm:w-48", className)}>
      {settingsNavItems.map((item) => (
        <button
          key={item.section}
          type="button"
          onClick={() => onSelect(item.section)}
          aria-current={active === item.section ? "page" : undefined}
          className={cn(
            "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors",
            active === item.section
              ? "bg-accent text-accent-foreground"
              : "text-foreground hover:bg-accent hover:text-accent-foreground"
          )}
        >
          <item.icon className="size-4" aria-hidden />
          {item.label}
        </button>
      ))}
    </nav>
  )
}
