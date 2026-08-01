import { Bell, Key, Monitor, Palette, Users, type LucideIcon } from "lucide-react"
import type { SettingsSection, SettingsSectionCopy } from "./types"

export const settingsNavItems: { section: SettingsSection; label: string; icon: LucideIcon }[] = [
  { section: "profile", label: "Profile", icon: Users },
  { section: "account", label: "Account", icon: Key },
  { section: "appearance", label: "Appearance", icon: Palette },
  { section: "notifications", label: "Notifications", icon: Bell },
  { section: "display", label: "Display", icon: Monitor },
]

export const settingsSectionCopy: Record<SettingsSection, SettingsSectionCopy> = {
  profile: {
    title: "Profile",
    description: "This is how others will see you on the site",
  },
  account: {
    title: "Account",
    description: "Manage your account settings and set e-mail preferences",
  },
  appearance: {
    title: "Appearance",
    description: "Customize the appearance of the app",
  },
  notifications: {
    title: "Notifications",
    description: "Configure how you receive notifications",
  },
  display: {
    title: "Display",
    description: "Manage the items shown on your dashboard",
  },
}
