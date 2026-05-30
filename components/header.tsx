"use client"

import { useState, useEffect } from "react"
import { Moon, Sun, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { SidebarTrigger } from "@/components/ui/sidebar"

function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof window === "undefined") return "light"
    const stored = localStorage.getItem("theme")
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    return stored === "dark" || (!stored && prefersDark) ? "dark" : "light"
  })

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark")
  }, [theme])

  function toggle() {
    const next = theme === "light" ? "dark" : "light"
    setTheme(next)
    localStorage.setItem("theme", next)
    document.documentElement.classList.toggle("dark", next === "dark")
  }

  return (
    <Button variant="ghost" size="icon" onClick={toggle} className="group">
      {theme === "light"
        ? <Moon className="size-5 transition-transform duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-rotate-12" />
        : <Sun  className="size-5 transition-transform duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:rotate-45" />
      }
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}

export function Header() {
  return (
    <header className="flex h-14 shrink-0 items-center gap-2 px-4">
      <SidebarTrigger className="-ml-1" />

      {/* Search bar */}
      <div className="relative flex-1 max-w-sm">
        <Search className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search..."
          className="pl-9 h-9"
        />
      </div>

      <div className="flex-1" />

      {/* Theme toggle */}
      <ThemeToggle />

      {/* User */}
      <div className="flex items-center gap-2">
        <div className="hidden sm:flex flex-col items-end leading-tight">
          <span className="text-sm font-medium">Hani Buskila</span>
          <span className="text-xs text-muted-foreground">Product Designer</span>
        </div>
        <Avatar size="sm">
          <AvatarImage src="" alt="Hani Buskila" />
          <AvatarFallback className="font-bold">HB</AvatarFallback>
        </Avatar>
      </div>
    </header>
  )
}
