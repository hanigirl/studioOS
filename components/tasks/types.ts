export type TaskPriority = "High" | "Medium" | "Low"

export type ColumnId =
  | "backlog"
  | "todo"
  | "in-progress"
  | "in-review"
  | "approved"
  | "in-dev"
  | "done"

export interface TaskCard {
  id: string
  title: string
  project: string
  client: string
  priority: TaskPriority
  dueDate: string
  assignee: {
    initials: string
    color: string
  }
}

export interface KanbanColumn {
  id: ColumnId
  label: string
  color: string
  tasks: TaskCard[]
}
