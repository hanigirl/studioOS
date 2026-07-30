"use client"

import { useState } from "react"
import {
  User,
  KeyRound,
  Palette,
  Bell,
  Monitor,
  type LucideIcon,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { ProfileForm } from "./profile-form"

type SectionId = "profile" | "account" | "appearance" | "notifications" | "display"

const nav: { id: SectionId; label: string; icon: LucideIcon }[] = [
  { id: "profile", label: "Profile", icon: User },
  { id: "account", label: "Account", icon: KeyRound },
  { id: "appearance", label: "Appearance", icon: Palette },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "display", label: "Display", icon: Monitor },
]

export function SettingsContent() {
  const [active, setActive] = useState<SectionId>("profile")
  const current = nav.find((n) => n.id === active)!

  return (
    <div className="flex flex-col gap-8 lg:flex-row lg:gap-12">
      <nav
        aria-label="Settings sections"
        className="flex shrink-0 gap-1 overflow-x-auto lg:w-48 lg:flex-col lg:overflow-visible"
      >
        {nav.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            type="button"
            onClick={() => setActive(id)}
            aria-current={active === id ? "page" : undefined}
            className={cn(
              "flex items-center gap-2 whitespace-nowrap rounded-md px-3 py-2 text-left text-sm font-medium transition-colors",
              active === id
                ? "bg-muted text-foreground"
                : "text-foreground hover:bg-muted/60"
            )}
          >
            <Icon className="size-4 shrink-0" aria-hidden />
            {label}
          </button>
        ))}
      </nav>

      <div className="min-w-0 max-w-2xl flex-1">
        {active === "profile" ? (
          <ProfileForm />
        ) : (
          <div className="space-y-1">
            <h2 className="text-lg font-medium">{current.label}</h2>
            <p className="text-sm text-muted-foreground">
              {current.label} settings are coming soon.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
