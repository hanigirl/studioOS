"use client"

import { useState } from "react"
import { Monitor, Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { SettingsSectionShell } from "./settings-section-shell"

type Theme = "light" | "dark" | "system"

const options: { value: Theme; label: string; icon: React.ElementType }[] = [
  { value: "light",  label: "Light",  icon: Sun },
  { value: "dark",   label: "Dark",   icon: Moon },
  { value: "system", label: "System", icon: Monitor },
]

function applyTheme(theme: Theme) {
  const root = document.documentElement
  if (theme === "dark") {
    root.classList.add("dark")
  } else if (theme === "light") {
    root.classList.remove("dark")
  } else {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    root.classList.toggle("dark", prefersDark)
  }
  localStorage.setItem("theme", theme)
}

export function AppearanceSection() {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === "undefined") return "system"
    const stored = localStorage.getItem("theme")
    if (stored === "light" || stored === "dark" || stored === "system") return stored
    return "system"
  })

  function handleSelect(value: Theme) {
    setTheme(value)
    applyTheme(value)
  }

  return (
    <SettingsSectionShell
      title="Appearance"
      description="Customize how Studio OS looks on your device."
    >
      <div className="flex flex-col gap-3">
        <p className="text-sm font-medium">Theme</p>
        <div className="inline-flex rounded-lg border border-border bg-muted p-1 gap-1">
          {options.map(({ value, label, icon: Icon }) => (
            <Button
              key={value}
              variant={theme === value ? "secondary" : "ghost"}
              size="sm"
              onClick={() => handleSelect(value)}
              className={cn(
                "gap-1.5",
                theme !== value && "text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon className="size-3.5" aria-hidden />
              {label}
            </Button>
          ))}
        </div>
        <p className="text-xs text-muted-foreground">
          &ldquo;System&rdquo; follows your device&apos;s light/dark mode setting.
        </p>
      </div>
    </SettingsSectionShell>
  )
}
