"use client"

import { useState } from "react"
import { PlaceholderSection } from "@/components/settings/placeholder-section"
import { ProfileSection } from "@/components/settings/profile-section"
import { SettingsNav } from "@/components/settings/settings-nav"
import { settingsSectionCopy } from "@/components/settings/data"
import type { SettingsSection } from "@/components/settings/types"

export default function SettingsPage() {
  const [section, setSection] = useState<SettingsSection>("profile")

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Settings</h1>

      <div className="flex flex-col gap-8 sm:flex-row sm:items-start">
        <SettingsNav active={section} onSelect={setSection} />

        <div className="min-w-0 flex-1 overflow-y-auto">
          {section === "profile" ? (
            <ProfileSection />
          ) : (
            <PlaceholderSection {...settingsSectionCopy[section]} />
          )}
        </div>
      </div>
    </div>
  )
}
