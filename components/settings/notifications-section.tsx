"use client"

import { useState } from "react"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { SettingsSectionShell } from "./settings-section-shell"
import { mockNotificationPrefs } from "./data"
import type { NotificationPrefs } from "./types"

const items: { key: keyof NotificationPrefs; label: string; description: string }[] = [
  {
    key: "emailDigest",
    label: "Email Digest",
    description: "Receive a weekly summary of studio activity.",
  },
  {
    key: "projectUpdates",
    label: "Project Updates",
    description: "Notify me when a project status changes.",
  },
  {
    key: "taskAssignments",
    label: "Task Assignments",
    description: "Notify me when I'm assigned to a task.",
  },
  {
    key: "teamMentions",
    label: "Team Mentions",
    description: "Notify me when someone mentions me.",
  },
  {
    key: "billingAlerts",
    label: "Billing Alerts",
    description: "Notify me about invoices and payment issues.",
  },
]

export function NotificationsSection() {
  const [prefs, setPrefs] = useState<NotificationPrefs>(mockNotificationPrefs)

  function toggle(key: keyof NotificationPrefs) {
    setPrefs(p => ({ ...p, [key]: !p[key] }))
  }

  return (
    <SettingsSectionShell
      title="Notifications"
      description="Choose which notifications you'd like to receive."
    >
      <div className="flex flex-col">
        {items.map(({ key, label, description }, i) => (
          <div key={key}>
            {i > 0 && <Separator />}
            <div className="flex items-center justify-between gap-4 py-4">
              <div className="flex flex-col gap-0.5">
                <p className="text-sm font-medium">{label}</p>
                <p className="text-xs text-muted-foreground">{description}</p>
              </div>
              <Switch
                checked={prefs[key]}
                onCheckedChange={() => toggle(key)}
                aria-label={label}
              />
            </div>
          </div>
        ))}
      </div>
    </SettingsSectionShell>
  )
}
