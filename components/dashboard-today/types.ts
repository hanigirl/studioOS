export type TodayStatus =
  | "in-progress"
  | "in-review"
  | "blocked"
  | "todo"
  | "approved"

/**
 * Priority taxonomy — kept identical to components/kanban-board.tsx and
 * components/projects/types so a task looks like the same object
 * everywhere it appears in the product.
 */
export type TodayPriority = "High" | "Medium" | "Low"

export interface TodayAssignee {
  name: string
  initials: string
  /** Tailwind bg-* class. Same convention as kanban-board.tsx. */
  color: string
}

export interface TodayTask {
  id: string
  title: string
  project: string
  client: string
  status: TodayStatus
  priority: TodayPriority
  assignee: TodayAssignee
  /** ISO datetime string for the task's due time today. */
  due: string
  /** When this task was last touched (for blocked/in-review aging). */
  lastUpdated?: string
  isOverdue?: boolean
}

export interface NextUpItem {
  id: string
  client: string
  clientInitials: string
  project: string
  title: string
  contextLine: string
  due: string
}
