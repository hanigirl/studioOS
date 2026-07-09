import type { ReactNode } from "react"
import { SettingsNav } from "@/components/settings/settings-nav"

export default function SettingsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
      <div className="flex gap-12">
        <SettingsNav />
        <div className="min-w-0 flex-1">{children}</div>
      </div>
    </div>
  )
}
