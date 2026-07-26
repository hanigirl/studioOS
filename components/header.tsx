"use client"

import { useState, useEffect } from "react"
import { Moon, Sun, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { SidebarTrigger } from "@/components/ui/sidebar"

const userName = "Hani Buskila"

function getInitials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase()
}

function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const [theme, setTheme] = useState<"light" | "dark">("light")

  useEffect(() => {
    const stored = localStorage.getItem("theme")
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    const initial = stored === "dark" || (!stored && prefersDark) ? "dark" : "light"
    // localStorage/matchMedia are unavailable during SSR, so the real theme can
    // only be read after mount; the mounted-guard avoids a hydration mismatch.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTheme(initial)
    document.documentElement.classList.toggle("dark", initial === "dark")
    setMounted(true)
  }, [])

  function toggle() {
    const next = theme === "light" ? "dark" : "light"
    setTheme(next)
    localStorage.setItem("theme", next)
    document.documentElement.classList.toggle("dark", next === "dark")
  }

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" disabled>
        <Moon className="size-5" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    )
  }

  return (
    <Button variant="ghost" size="icon" onClick={toggle}>
      {theme === "light" ? <Moon className="size-5" /> : <Sun className="size-5" />}
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}

export function Header() {
  return (
    <header className="flex h-14 shrink-0 items-center gap-2 border-b px-4">
      <SidebarTrigger className="-ml-1" />

      <div className="relative flex-1 max-w-sm">
        <Search className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input type="search" placeholder="Search..." className="pl-9 h-9" />
      </div>

      <div className="flex-1" />

      <ThemeToggle />

      <div className="flex items-center gap-2">
        <div className="hidden sm:flex flex-col items-end leading-tight">
          <span className="text-sm font-medium">{userName}</span>
          <span className="text-xs text-muted-foreground">Product Designer</span>
        </div>
        <Avatar size="sm">
          <AvatarFallback className="bg-[#3b82f5] text-white font-bold">
            {getInitials(userName)}
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  )
}
