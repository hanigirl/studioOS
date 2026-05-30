export type SettingsSection = "profile" | "account" | "appearance" | "notifications" | "display"

export interface UserProfile {
  name: string
  email: string
  role: string
  bio: string
  avatarUrl?: string
  initials: string
  avatarColor: string
}

export interface NotificationPrefs {
  emailDigest: boolean
  projectUpdates: boolean
  taskAssignments: boolean
  teamMentions: boolean
  billingAlerts: boolean
}

export type DateFormat = "MM/DD/YYYY" | "DD/MM/YYYY" | "YYYY-MM-DD"

export interface DisplayPrefs {
  language: string
  timezone: string
  dateFormat: DateFormat
}
