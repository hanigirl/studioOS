import { Bell, Key, Monitor, Palette, Users } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { label: "Profile", icon: Users },
  { label: "Account", icon: Key },
  { label: "Appearance", icon: Palette },
  { label: "Notifications", icon: Bell },
  { label: "Display", icon: Monitor },
]

export function SettingsNav({ active = "Profile" }: { active?: string }) {
  return (
    <nav className="flex w-40 shrink-0 flex-col">
      {navItems.map(({ label, icon: Icon }) => {
        const isActive = label === active
        return (
          <div
            key={label}
            className={cn(
              "flex h-8 items-center gap-2 rounded-md p-2 text-sm font-medium",
              isActive
                ? "bg-sidebar-accent text-sidebar-accent-foreground"
                : "text-sidebar-foreground"
            )}
          >
            <Icon className="size-4" />
            {label}
          </div>
        )
      })}
    </nav>
  )
}
