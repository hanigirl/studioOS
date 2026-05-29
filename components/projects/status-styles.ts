import type { ProjectStatus } from "./types"

export const statusStyles: Record<ProjectStatus, string> = {
  Discovery: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  Design:    "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  Review:    "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
  Handoff:   "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  Done:      "bg-muted text-muted-foreground",
}
