"use client"

import { useState } from "react"
import { Camera, CheckCircle2, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { SettingsSectionShell } from "./settings-section-shell"
import type { UserProfile } from "./types"

interface ProfileSectionProps {
  initialProfile: UserProfile
}

type SaveStatus = "idle" | "saving" | "success" | "error"

export function ProfileSection({ initialProfile }: ProfileSectionProps) {
  const [saved, setSaved] = useState<UserProfile>(initialProfile)
  const [draft, setDraft] = useState<UserProfile>(initialProfile)
  const [status, setStatus] = useState<SaveStatus>("idle")

  const bioLength = draft.bio.length
  const isDirty =
    draft.name !== saved.name ||
    draft.email !== saved.email ||
    draft.role !== saved.role ||
    draft.bio !== saved.bio

  function handleSave() {
    setStatus("saving")
    setTimeout(() => {
      setSaved(draft)
      setStatus("success")
      setTimeout(() => setStatus("idle"), 3000)
    }, 600)
  }

  function handleCancel() {
    setDraft(saved)
    setStatus("idle")
  }

  return (
    <SettingsSectionShell
      title="Profile"
      description="This is how others will see you on the site."
    >
      <div className="flex gap-6 items-start">
        {/* Avatar */}
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="relative shrink-0 cursor-default">
              <Avatar className="size-20">
                {saved.avatarUrl && (
                  <AvatarImage src={saved.avatarUrl} alt={saved.name} className="object-cover" />
                )}
                <AvatarFallback
                  className={cn("text-white text-xl font-bold", saved.avatarColor)}
                >
                  {saved.initials}
                </AvatarFallback>
              </Avatar>
              <div className="absolute bottom-0 right-0 flex size-6 items-center justify-center rounded-full bg-primary border-2 border-background">
                <Camera className="size-3 text-primary-foreground" aria-hidden />
              </div>
            </div>
          </TooltipTrigger>
          <TooltipContent side="right">Avatar upload coming in a future update.</TooltipContent>
        </Tooltip>

        {/* Form fields */}
        <div className="flex flex-col gap-5 flex-1">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium" htmlFor="profile-name">
                Name
              </label>
              <Input
                id="profile-name"
                value={draft.name}
                maxLength={60}
                onChange={e => setDraft(d => ({ ...d, name: e.target.value }))}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium" htmlFor="profile-role">
                Role / Title
              </label>
              <Input
                id="profile-role"
                value={draft.role}
                maxLength={80}
                onChange={e => setDraft(d => ({ ...d, role: e.target.value }))}
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium" htmlFor="profile-email">
              Email
            </label>
            <Input
              id="profile-email"
              type="email"
              value={draft.email}
              onChange={e => setDraft(d => ({ ...d, email: e.target.value }))}
              className="w-[280px]"
            />
            <p className="text-xs text-muted-foreground">
              You can manage verified email addresses in your email settings.
            </p>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium" htmlFor="profile-bio">
              Bio
            </label>
            <textarea
              id="profile-bio"
              value={draft.bio}
              maxLength={200}
              rows={3}
              onChange={e => setDraft(d => ({ ...d, bio: e.target.value }))}
              className={cn(
                "placeholder:text-muted-foreground dark:bg-input/30 border-input w-full min-w-0 rounded-md border bg-transparent px-3 py-2 text-sm shadow-xs transition-[color,box-shadow] outline-none resize-none",
                "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
              )}
            />
            <p
              className={cn(
                "text-xs text-right",
                bioLength > 180 ? "text-amber-500" : "text-muted-foreground"
              )}
            >
              {bioLength}/200
            </p>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Button
              size="sm"
              disabled={!isDirty || status === "saving"}
              onClick={handleSave}
            >
              {status === "saving" ? "Saving…" : "Save Changes"}
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={!isDirty || status === "saving"}
              onClick={handleCancel}
            >
              Cancel
            </Button>

            {status === "success" && (
              <span className="flex items-center gap-1.5 text-sm text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="size-4" aria-hidden />
                Profile updated.
              </span>
            )}
            {status === "error" && (
              <span className="flex items-center gap-1.5 text-sm text-destructive">
                <AlertCircle className="size-4" aria-hidden />
                Failed to save. Please try again.
              </span>
            )}
          </div>
        </div>
      </div>
    </SettingsSectionShell>
  )
}
