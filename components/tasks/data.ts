import type { KanbanColumnDef, Task, TaskPriority, TeamMember } from "./types"

const HANI: TeamMember = { name: "Hani", initials: "HB", color: "bg-blue-500" }
const MAYA: TeamMember = { name: "Maya", initials: "M", color: "bg-pink-500" }
const JON: TeamMember = { name: "Jon", initials: "J", color: "bg-emerald-500" }
const ADA: TeamMember = { name: "Ada", initials: "A", color: "bg-violet-500" }

/**
 * Priority pill palette. Kept identical to the one in
 * `components/projects/project-pulse-card.tsx` so a task reads the same
 * everywhere in the product.
 */
export const priorityStyles: Record<TaskPriority, string> = {
  High: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  Medium: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  Low: "bg-muted text-muted-foreground",
}

/** Column order + status-dot colour. Mirrors the 7-column Figma board. */
export const columns: KanbanColumnDef[] = [
  { status: "Backlog", dotClass: "bg-slate-400" },
  { status: "To Do", dotClass: "bg-slate-600" },
  { status: "In Progress", dotClass: "bg-blue-500" },
  { status: "In Review", dotClass: "bg-orange-500" },
  { status: "Approved", dotClass: "bg-emerald-500" },
  { status: "In Dev", dotClass: "bg-violet-500" },
  { status: "Done", dotClass: "bg-green-600" },
]

export const tasks: Task[] = [
  // Backlog
  { id: "t1", title: "Explore onboarding flow variants", project: "App Redesign", client: "Wix", status: "Backlog", priority: "Medium", due: "Apr 20", assignee: HANI },
  { id: "t2", title: "Collect references for pricing page", project: "Landing Page", client: "Zoom", status: "Backlog", priority: "Low", due: "Apr 25", assignee: MAYA },
  // To Do
  { id: "t3", title: "Wireframe dashboard widgets", project: "Dashboard UI", client: "Slack", status: "To Do", priority: "High", due: "Apr 8", assignee: HANI },
  { id: "t4", title: "Define empty states for feed", project: "Social Templates", client: "Meta", status: "To Do", priority: "Medium", due: "Apr 12", assignee: JON },
  { id: "t5", title: "Draft logo direction A", project: "Brand Identity", client: "Monday", status: "To Do", priority: "High", due: "Apr 6", assignee: ADA },
  // In Progress
  { id: "t6", title: "Redesign profile settings screen", project: "App Redesign", client: "Wix", status: "In Progress", priority: "High", due: "Apr 10", assignee: HANI },
  { id: "t7", title: "Build email header templates", project: "Marketing Kit", client: "Fiverr", status: "In Progress", priority: "Medium", due: "Apr 15", assignee: MAYA },
  // In Review
  { id: "t8", title: "Final logo presentation", project: "Brand Identity", client: "Monday", status: "In Review", priority: "High", due: "Apr 5", assignee: HANI },
  { id: "t9", title: "Analytics chart components", project: "Dashboard UI", client: "Slack", status: "In Review", priority: "Medium", due: "Apr 7", assignee: HANI },
  // Approved
  { id: "t10", title: "Checkout flow hand-off pack", project: "App Redesign", client: "Wix", status: "Approved", priority: "High", due: "Apr 9", assignee: HANI },
  // In Dev
  { id: "t11", title: "Navigation shell components", project: "Dashboard UI", client: "Slack", status: "In Dev", priority: "Medium", due: "Apr 4", assignee: JON },
  // Done
  { id: "t12", title: "Color tokens audit", project: "Brand Identity", client: "Monday", status: "Done", priority: "Low", due: "Mar 28", assignee: ADA },
  { id: "t13", title: "Icon set v2", project: "Marketing Kit", client: "Fiverr", status: "Done", priority: "Low", due: "Mar 30", assignee: MAYA },
]
