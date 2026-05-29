export type ProjectStatus =
  | "Discovery"
  | "Design"
  | "Review"
  | "Handoff"
  | "Done"

export type ProjectHealth = "Healthy" | "At Risk" | "Critical"

export type TaskStatus =
  | "Backlog"
  | "To Do"
  | "In Progress"
  | "In Review"
  | "Approved"
  | "In Dev"
  | "Done"

export type TaskPriority = "High" | "Medium" | "Low"

export interface TeamMember {
  name: string
  initials: string
  color: string
  avatar?: string
}

export interface NextTask {
  id: string
  title: string
  status: TaskStatus
  due: string
  priority: TaskPriority
  /**
   * If undefined, the task is unassigned. UI should render an empty
   * placeholder avatar to differentiate from Daniel's tasks (where the
   * avatar is hidden because viewer === assignee).
   */
  assignee?: TeamMember
}

export interface PulseProject {
  id: string
  name: string
  subtitle: string
  client: string
  clientLogo: string
  status: ProjectStatus
  team: TeamMember[]
  due: string
  daysToDeadline: number
  overdue: boolean
  tasksDone: number
  tasksTotal: number
  nextTasks: NextTask[]
  healthReason: string
}
