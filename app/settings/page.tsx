import { SettingsContent } from "@/components/settings/settings-content"

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-[72px]">
      <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
      <SettingsContent />
    </div>
  )
}
