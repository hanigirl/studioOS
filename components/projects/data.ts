import type { NextTask, PulseProject, ProjectHealth, TeamMember } from "./types"

const DANIEL = { name: "Daniel", initials: "D", color: "bg-blue-500" }
const MAYA = { name: "Maya", initials: "M", color: "bg-pink-500" }
const JON = { name: "Jon", initials: "J", color: "bg-emerald-500" }
const ADA = { name: "Ada", initials: "A", color: "bg-violet-500" }
const SARA = { name: "Sara", initials: "S", color: "bg-amber-500" }

// Daniel works on three live client projects in parallel.
// Health is computed: overdue or daysToDeadline < 0 → Critical;
// daysToDeadline ≤ 3 → At Risk; else Healthy.
export const danielProjects: PulseProject[] = [
  {
    id: "wix-app-redesign",
    name: "App Redesign",
    subtitle: "Mobile + Web",
    client: "Wix",
    clientLogo: "/logos/wix.png",
    status: "Design",
    team: [DANIEL, MAYA, JON],
    due: "Apr 12",
    daysToDeadline: 7,
    overdue: false,
    tasksDone: 8,
    tasksTotal: 14,
    healthReason: "On track · last client message 1 day ago",
    nextTasks: [
      { id: "t6", title: "Redesign profile settings screen", status: "In Progress", due: "Apr 10", priority: "High", assignee: DANIEL },
      { id: "t10", title: "Checkout flow hand-off pack", status: "Approved", due: "Apr 9", priority: "High", assignee: DANIEL },
      { id: "t1", title: "Explore onboarding flow variants", status: "Backlog", due: "Apr 20", priority: "Medium" },
    ],
  },
  {
    id: "slack-dashboard-ui",
    name: "Dashboard UI",
    subtitle: "Analytics module",
    client: "Slack",
    clientLogo: "/logos/slack.png",
    status: "Handoff",
    team: [DANIEL, JON],
    due: "Apr 2",
    daysToDeadline: -3,
    overdue: true,
    tasksDone: 18,
    tasksTotal: 18,
    healthReason: "3 tasks overdue · last client message 4 days ago",
    nextTasks: [
      { id: "t11", title: "Navigation shell components", status: "In Dev", due: "Apr 4", priority: "Medium", assignee: JON },
      { id: "t9", title: "Analytics chart components", status: "In Review", due: "Apr 7", priority: "Medium", assignee: DANIEL },
      { id: "t3", title: "Wireframe dashboard widgets", status: "To Do", due: "Apr 8", priority: "High", assignee: DANIEL },
    ],
  },
  {
    id: "zoom-landing-page",
    name: "Landing Page",
    subtitle: "Pricing + Hero",
    client: "Zoom",
    clientLogo: "/logos/zoom.png",
    status: "Design",
    team: [DANIEL, MAYA],
    due: "Apr 30",
    daysToDeadline: 2,
    overdue: false,
    tasksDone: 6,
    tasksTotal: 15,
    healthReason: "Deadline in 2 days · 9 tasks remaining",
    nextTasks: [
      { id: "t2", title: "Collect references for pricing page", status: "Backlog", due: "Apr 25", priority: "Low", assignee: MAYA },
      { id: "z1", title: "Hero variant explorations", status: "In Progress", due: "Apr 28", priority: "High", assignee: DANIEL },
      { id: "z2", title: "Pricing comparison table", status: "To Do", due: "Apr 29", priority: "Medium" },
    ],
  },
]

// Extra projects used only for the `?state=overflow` mode.
export const overflowExtras: PulseProject[] = [
  {
    id: "monday-brand-identity",
    name: "Brand Identity",
    subtitle: "Logo system",
    client: "Monday",
    clientLogo: "/logos/monday.png",
    status: "Review",
    team: [DANIEL, SARA],
    due: "Apr 5",
    daysToDeadline: 1,
    overdue: false,
    tasksDone: 12,
    tasksTotal: 12,
    healthReason: "Final review pending · client demo tomorrow",
    nextTasks: [
      { id: "t8", title: "Final logo presentation", status: "In Review", due: "Apr 5", priority: "High", assignee: ADA },
      { id: "t13", title: "Color tokens audit", status: "Done", due: "Mar 28", priority: "Low", assignee: ADA },
      { id: "t5", title: "Draft logo direction A", status: "To Do", due: "Apr 6", priority: "High", assignee: ADA },
    ],
  },
  {
    id: "fiverr-marketing-kit",
    name: "Marketing Kit",
    subtitle: "Social + Email",
    client: "Fiverr",
    clientLogo: "/logos/fiverr.png",
    status: "Design",
    team: [DANIEL, MAYA, JON, ADA],
    due: "Apr 18",
    daysToDeadline: 13,
    overdue: false,
    tasksDone: 4,
    tasksTotal: 10,
    healthReason: "On track · plenty of runway",
    nextTasks: [
      { id: "t7", title: "Build email header templates", status: "In Progress", due: "Apr 15", priority: "Medium", assignee: MAYA },
      { id: "f1", title: "Story templates v2", status: "To Do", due: "Apr 16", priority: "Medium", assignee: ADA },
      { id: "t12", title: "Icon set v2", status: "Done", due: "Mar 30", priority: "Low", assignee: MAYA },
    ],
  },
  {
    id: "meta-social-templates",
    name: "Social Templates",
    subtitle: "Story + Feed",
    client: "Meta",
    clientLogo: "/logos/meta.png",
    status: "Discovery",
    team: [DANIEL, JON, ADA],
    due: "Apr 24",
    daysToDeadline: 19,
    overdue: false,
    tasksDone: 2,
    tasksTotal: 8,
    healthReason: "Just kicked off · first review in 2 weeks",
    nextTasks: [
      { id: "t4", title: "Define empty states for feed", status: "To Do", due: "Apr 12", priority: "Medium", assignee: JON },
      { id: "m1", title: "Story templates moodboard", status: "Backlog", due: "Apr 14", priority: "Low", assignee: ADA },
      { id: "m2", title: "Feed grid system", status: "Backlog", due: "Apr 16", priority: "Medium", assignee: JON },
    ],
  },
]

export function computeHealth(project: PulseProject): ProjectHealth {
  if (project.overdue || project.daysToDeadline < 0) return "Critical"
  if (project.daysToDeadline <= 3) return "At Risk"
  return "Healthy"
}

/**
 * A task with no assignee yet. Renders a placeholder avatar with a muted
 * `<User>` icon — distinct from Daniel's own tasks (neutral-tone avatar) and
 * from teammates (coloured avatar).
 */
export function isUnassignedTask(task: NextTask): boolean {
  return task.assignee == null
}

export function isDanielsMember(member: TeamMember): boolean {
  return member.name === "Daniel"
}

export function sortByHealth(projects: PulseProject[]): PulseProject[] {
  const order: Record<ProjectHealth, number> = {
    Critical: 0,
    "At Risk": 1,
    Healthy: 2,
  }
  return [...projects].sort(
    (a, b) => order[computeHealth(a)] - order[computeHealth(b)]
  )
}
