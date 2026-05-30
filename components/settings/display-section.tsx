"use client"

import { useState } from "react"
import { CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { SettingsSectionShell } from "./settings-section-shell"
import { mockDisplayPrefs, timezones } from "./data"
import type { DisplayPrefs, DateFormat } from "./types"

const dateFormats: DateFormat[] = ["MM/DD/YYYY", "DD/MM/YYYY", "YYYY-MM-DD"]

export function DisplaySection() {
  const [saved, setSaved] = useState<DisplayPrefs>(mockDisplayPrefs)
  const [draft, setDraft] = useState<DisplayPrefs>(mockDisplayPrefs)
  const [showSuccess, setShowSuccess] = useState(false)

  const isDirty =
    draft.language !== saved.language ||
    draft.timezone !== saved.timezone ||
    draft.dateFormat !== saved.dateFormat

  function handleSave() {
    setSaved(draft)
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 3000)
  }

  return (
    <SettingsSectionShell
      title="Display"
      description="Manage your language, timezone, and date format preferences."
    >
      <div className="flex flex-col gap-5 max-w-sm">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium">Language</label>
          <Select
            value={draft.language}
            onValueChange={v => setDraft(d => ({ ...d, language: v }))}
          >
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en-US">English (US)</SelectItem>
              <SelectItem value="en-GB" disabled>English (UK)</SelectItem>
              <SelectItem value="fr" disabled>Français</SelectItem>
              <SelectItem value="de" disabled>Deutsch</SelectItem>
              <SelectItem value="he" disabled>עברית</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-xs text-muted-foreground">Additional languages coming soon.</p>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium">Timezone</label>
          <Select
            value={draft.timezone}
            onValueChange={v => setDraft(d => ({ ...d, timezone: v }))}
          >
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {timezones.map(tz => (
                <SelectItem key={tz} value={tz}>
                  {tz}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium">Date Format</label>
          <Select
            value={draft.dateFormat}
            onValueChange={v => setDraft(d => ({ ...d, dateFormat: v as DateFormat }))}
          >
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {dateFormats.map(fmt => (
                <SelectItem key={fmt} value={fmt}>
                  {fmt}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-3">
          <Button size="sm" disabled={!isDirty} onClick={handleSave}>
            Save Preferences
          </Button>
          {showSuccess && (
            <span className="flex items-center gap-1.5 text-sm text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="size-4" aria-hidden />
              Preferences saved.
            </span>
          )}
        </div>
      </div>
    </SettingsSectionShell>
  )
}
