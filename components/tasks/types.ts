export type TaskStatus   = "To Do" | "In Progress" | "In Review" | "Completed"
export type TaskPriority = "Low" | "Medium" | "High" | "Urgent"

export interface TaskAssignee {
  name: string
  initials: string
  color: string
  avatar?: string
}

export interface Task {
  id: string
  title: string
  description?: string
  status: TaskStatus
  priority: TaskPriority
  project: string
  assignee?: TaskAssignee
  dueDate: string
  createdAt: string
  tags?: string[]
}
