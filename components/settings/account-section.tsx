"use client"

import { useState } from "react"
import { Eye, EyeOff, CheckCircle2, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { SettingsSectionShell } from "./settings-section-shell"

type SaveStatus = "idle" | "saving" | "success" | "error"

function PasswordField({
  id,
  label,
  value,
  onChange,
  error,
}: {
  id: string
  label: string
  value: string
  onChange: (v: string) => void
  error?: string | null
}) {
  const [show, setShow] = useState(false)
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium" htmlFor={id}>
        {label}
      </label>
      <div className="relative">
        <Input
          id={id}
          type={show ? "text" : "password"}
          value={value}
          onChange={e => onChange(e.target.value)}
          aria-invalid={!!error}
          className="pr-10"
        />
        <button
          type="button"
          onClick={() => setShow(v => !v)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          aria-label={show ? "Hide password" : "Show password"}
        >
          {show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
        </button>
      </div>
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  )
}

export function AccountSection() {
  const [current, setCurrent] = useState("")
  const [next, setNext] = useState("")
  const [confirm, setConfirm] = useState("")
  const [status, setStatus] = useState<SaveStatus>("idle")

  const nextError =
    next.length > 0 && next.length < 8 ? "Password must be at least 8 characters." : null
  const confirmError =
    confirm.length > 0 && confirm !== next ? "Passwords do not match." : null

  const canSubmit =
    current.length > 0 &&
    next.length >= 8 &&
    confirm === next &&
    status !== "saving"

  function handleUpdate() {
    setStatus("saving")
    setTimeout(() => {
      setCurrent("")
      setNext("")
      setConfirm("")
      setStatus("success")
      setTimeout(() => setStatus("idle"), 3000)
    }, 700)
  }

  return (
    <SettingsSectionShell
      title="Account"
      description="Manage your account security and password."
    >
      <div className="flex flex-col gap-5 max-w-sm">
        <PasswordField
          id="current-password"
          label="Current Password"
          value={current}
          onChange={setCurrent}
        />
        <PasswordField
          id="new-password"
          label="New Password"
          value={next}
          onChange={setNext}
          error={nextError}
        />
        <PasswordField
          id="confirm-password"
          label="Confirm New Password"
          value={confirm}
          onChange={setConfirm}
          error={confirmError}
        />

        <div className="flex items-center gap-3">
          <Button size="sm" disabled={!canSubmit} onClick={handleUpdate}>
            {status === "saving" ? "Updating…" : "Update Password"}
          </Button>

          {status === "success" && (
            <span className="flex items-center gap-1.5 text-sm text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="size-4" aria-hidden />
              Password updated.
            </span>
          )}
          {status === "error" && (
            <span className="flex items-center gap-1.5 text-sm text-destructive">
              <AlertCircle className="size-4" aria-hidden />
              Current password is incorrect.
            </span>
          )}
        </div>
      </div>
    </SettingsSectionShell>
  )
}
