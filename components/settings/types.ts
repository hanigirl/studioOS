export type SettingsSection =
  | "profile"
  | "account"
  | "appearance"
  | "notifications"
  | "display"

export interface SettingsSectionCopy {
  title: string
  description: string
}
