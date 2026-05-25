"use client"

import { useState } from "react"
import { Users, KeyRound, Palette, Bell, Monitor } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

const navItems = [
  { id: "profile",       label: "Profile",       icon: Users   },
  { id: "account",       label: "Account",       icon: KeyRound },
  { id: "appearance",    label: "Appearance",    icon: Palette  },
  { id: "notifications", label: "Notifications", icon: Bell     },
  { id: "display",       label: "Display",       icon: Monitor  },
] as const

type NavId = (typeof navItems)[number]["id"]

export default function SettingsPage() {
  const [active, setActive] = useState<NavId>("profile")

  return (
    <div className="flex flex-col gap-[72px]">
      <h1 className="text-[30px] font-bold leading-9 tracking-[-0.75px] text-foreground">
        Settings
      </h1>

      <div className="flex gap-12 items-start">
        {/* Sidebar nav */}
        <nav className="flex flex-col w-[152px] shrink-0">
          {navItems.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActive(id)}
              className={cn(
                "flex items-center gap-2 h-8 px-2 rounded-md text-sm font-medium text-left w-full transition-colors",
                active === id
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
              )}
            >
              <Icon className="size-4 shrink-0" />
              <span className="flex-1 min-w-0">{label}</span>
            </button>
          ))}
        </nav>

        {/* Content panel */}
        {active === "profile" && (
          <div className="flex flex-col gap-6 flex-1 min-w-0">
            <div className="flex flex-col gap-0.5">
              <h2 className="text-xl font-semibold tracking-[-0.2px] text-foreground">
                Profile
              </h2>
              <p className="text-lg text-muted-foreground">
                This is how others will see you on the site
              </p>
            </div>

            <Separator />

            <div className="flex flex-col gap-1">
              <label className="text-base font-semibold text-foreground">
                Username
              </label>
              <Input
                className="w-[280px]"
                placeholder="shadcn"
              />
              <p className="text-sm text-muted-foreground max-w-sm">
                This is your public display name. It can be your real name or a
                pseudonym. You can only change this once every 30 days.
              </p>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-base font-semibold text-foreground">
                Email
              </label>
              <Input className="w-[280px]" type="email" />
              <p className="text-sm text-muted-foreground">
                You can manage verified email addresses in your email settings
              </p>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-base font-semibold text-foreground">
                Bio
              </label>
              <Input className="w-[280px]" />
            </div>
          </div>
        )}

        {active !== "profile" && (
          <div className="flex flex-col gap-0.5 flex-1">
            <h2 className="text-xl font-semibold tracking-[-0.2px] text-foreground capitalize">
              {navItems.find((n) => n.id === active)?.label}
            </h2>
            <p className="text-sm text-muted-foreground">Coming soon.</p>
          </div>
        )}
      </div>
    </div>
  )
}
