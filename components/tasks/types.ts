import type {
  TaskStatus,
  TaskPriority,
  TeamMember,
} from "@/components/projects/types"

// Re-export so the tasks feature is self-describing without reaching across
// folders at every call site.
export type { TaskStatus, TaskPriority, TeamMember }

export interface Task {
  id: string
  title: string
  project: string
  client: string
  status: TaskStatus
  priority: TaskPriority
  due: string
  /** Undefined = unassigned (renders a placeholder avatar). */
  assignee?: TeamMember
}

export interface KanbanColumnDef {
  status: TaskStatus
  /** Tailwind bg-* class for the status dot in the column header. */
  dotClass: string
}
