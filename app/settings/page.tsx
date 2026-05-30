"use client"

import { useState } from "react"
import { Bell, KeyRound, Monitor, Palette, Users } from "lucide-react"
import { cn } from "@/lib/utils"
import { ProfileSection } from "@/components/settings/profile-section"
import { AccountSection } from "@/components/settings/account-section"
import { AppearanceSection } from "@/components/settings/appearance-section"
import { NotificationsSection } from "@/components/settings/notifications-section"
import { DisplaySection } from "@/components/settings/display-section"
import { mockProfile } from "@/components/settings/data"
import type { SettingsSection } from "@/components/settings/types"

const navItems: { label: string; icon: React.ElementType; section: SettingsSection }[] = [
  { label: "Profile",       icon: Users,    section: "profile" },
  { label: "Account",       icon: KeyRound, section: "account" },
  { label: "Appearance",    icon: Palette,  section: "appearance" },
  { label: "Notifications", icon: Bell,     section: "notifications" },
  { label: "Display",       icon: Monitor,  section: "display" },
]

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState<SettingsSection>("profile")

  return (
    <div className="space-y-5">
      <h1 className="text-3xl font-bold tracking-tight">Settings</h1>

      <div className="flex gap-8 items-start">
        {/* Left nav */}
        <nav className="w-44 shrink-0 flex flex-col">
          {navItems.map(({ label, icon: Icon, section }) => (
            <button
              key={section}
              onClick={() => setActiveSection(section)}
              className={cn(
                "flex items-center gap-2 h-8 px-2 rounded-md text-sm font-medium transition-colors duration-200 text-left w-full",
                activeSection === section
                  ? "bg-accent text-accent-foreground"
                  : "text-foreground hover:bg-accent/60"
              )}
            >
              <Icon className="size-4 shrink-0" aria-hidden />
              {label}
            </button>
          ))}
        </nav>

        {/* Right content panel */}
        <div className="flex-1 min-w-0">
          {activeSection === "profile"       && <ProfileSection initialProfile={mockProfile} />}
          {activeSection === "account"       && <AccountSection />}
          {activeSection === "appearance"    && <AppearanceSection />}
          {activeSection === "notifications" && <NotificationsSection />}
          {activeSection === "display"       && <DisplaySection />}
        </div>
      </div>
    </div>
  )
}
