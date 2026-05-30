import type { UserProfile, NotificationPrefs, DisplayPrefs } from "./types"

export const mockProfile: UserProfile = {
  name: "Alex Johnson",
  email: "alex@studio-os.com",
  role: "Product Designer",
  bio: "Design lead at Studio OS. Passionate about building thoughtful, user-centered products.",
  initials: "AJ",
  avatarColor: "bg-violet-500",
}

export const mockNotificationPrefs: NotificationPrefs = {
  emailDigest: true,
  projectUpdates: true,
  taskAssignments: true,
  teamMentions: true,
  billingAlerts: false,
}

export const mockDisplayPrefs: DisplayPrefs = {
  language: "en-US",
  timezone: "UTC",
  dateFormat: "MM/DD/YYYY",
}

export const timezones = [
  "UTC",
  "America/New_York",
  "America/Chicago",
  "America/Denver",
  "America/Los_Angeles",
  "America/Anchorage",
  "America/Honolulu",
  "America/Sao_Paulo",
  "Europe/London",
  "Europe/Paris",
  "Europe/Berlin",
  "Europe/Moscow",
  "Africa/Cairo",
  "Asia/Dubai",
  "Asia/Kolkata",
  "Asia/Bangkok",
  "Asia/Singapore",
  "Asia/Tokyo",
  "Asia/Seoul",
  "Australia/Sydney",
  "Pacific/Auckland",
]
