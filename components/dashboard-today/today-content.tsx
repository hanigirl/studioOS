"use client"

import { useMemo } from "react"
import { useSearchParams } from "next/navigation"
import { NextUpCard } from "@/components/dashboard-today/next-up-card"
import { ZoneSection } from "@/components/dashboard-today/zone-section"
import { EmptyState } from "@/components/dashboard-today/empty-state"
import { ErrorState } from "@/components/dashboard-today/error-state"
import { LoadingState } from "@/components/dashboard-today/loading-state"
import type {
  NextUpItem,
  TodayAssignee,
  TodayPriority,
  TodayStatus,
  TodayTask,
} from "@/components/dashboard-today/types"

// Same roster + colors as components/kanban-board.tsx so a person looks
// identical wherever they appear in the product.
const HANI: TodayAssignee = { name: "Hani Buskila", initials: "HB", color: "bg-blue-500" }
const MAYA: TodayAssignee = { name: "Maya", initials: "M", color: "bg-pink-500" }
const JON: TodayAssignee = { name: "Jon", initials: "J", color: "bg-emerald-500" }
const ADA: TodayAssignee = { name: "Ada", initials: "A", color: "bg-violet-500" }

type ViewState = "default" | "empty" | "loading" | "error" | "overflow"

// Daniel's Next Up: stuck on the Wix profile-settings flow from yesterday.
const NEXT_UP: NextUpItem = {
  id: "next-up-1",
  client: "Wix",
  clientInitials: "WX",
  project: "App Redesign",
  title: "Finalize profile settings — empty + error states",
  contextLine: "Last edit: 17:42 yesterday — Profile settings — frame 4",
  due: "Due 10:00",
}

interface MockTask {
  id: string
  title: string
  project: string
  client: string
  status: TodayStatus
  priority: TodayPriority
  assignee: TodayAssignee
  /** Hours from "now" (8:47). Negative = earlier today, positive = later today. */
  dueOffsetHours: number
  /** For Blocked/In Review aging — hours since last touched. */
  ageHours?: number
  isOverdue?: boolean
}

const MOCK_TASKS: MockTask[] = [
  // NOW (within 2 hours of 8:47 → before ~10:47)
  {
    id: "n1",
    title: "Wix client review prep — open Figma + agenda",
    project: "App Redesign",
    client: "Wix",
    status: "in-progress",
    priority: "High",
    assignee: HANI,
    dueOffsetHours: 1.2, // ~10:00
  },
  {
    id: "n2",
    title: "Send Monday brand direction A for sign-off",
    project: "Brand Identity",
    client: "Monday",
    status: "todo",
    priority: "High",
    assignee: ADA,
    dueOffsetHours: 1.7, // ~10:30
  },
  // LATER TODAY
  {
    id: "l1",
    title: "Slack — analytics chart components polish",
    project: "Dashboard UI",
    client: "Slack",
    status: "in-progress",
    priority: "Medium",
    assignee: HANI,
    dueOffsetHours: 4, // ~13:00
  },
  {
    id: "l2",
    title: "Marketing Kit — review email header drafts",
    project: "Marketing Kit",
    client: "Fiverr",
    status: "in-review",
    priority: "Medium",
    assignee: MAYA,
    dueOffsetHours: 5.5, // ~14:30
  },
  {
    id: "l3",
    title: "Wix checkout — annotate hand-off pack",
    project: "App Redesign",
    client: "Wix",
    status: "in-progress",
    priority: "High",
    assignee: HANI,
    dueOffsetHours: 7, // ~16:00
  },
  {
    id: "l4",
    title: "Meta — empty states for the social feed",
    project: "Social Templates",
    client: "Meta",
    status: "todo",
    priority: "Low",
    assignee: JON,
    dueOffsetHours: 8.5, // ~17:30
  },
  // BLOCKED / WAITING
  {
    id: "b1",
    title: "Slack — Dashboard UI wireframes",
    project: "Dashboard UI",
    client: "Slack",
    status: "blocked",
    priority: "High",
    assignee: HANI,
    dueOffsetHours: -15, // overdue (yesterday)
    ageHours: 26,
    isOverdue: true,
  },
  {
    id: "b2",
    title: "Monday — final logo presentation",
    project: "Brand Identity",
    client: "Monday",
    status: "in-review",
    priority: "Medium",
    assignee: ADA,
    dueOffsetHours: 9,
    ageHours: 30, // > 24h waiting on review
  },
]

// Overflow state: 12 tasks in Later Today
const OVERFLOW_ASSIGNEES: TodayAssignee[] = [HANI, MAYA, JON, ADA]
const OVERFLOW_PRIORITIES: TodayPriority[] = ["High", "Medium", "Low", "Medium"]

const OVERFLOW_LATER: MockTask[] = Array.from({ length: 12 }).map((_, i) => ({
  id: `ovf-${i}`,
  title: [
    "Wix profile — variant B exploration",
    "Slack chart spacing audit",
    "Monday — type ramp tweaks",
    "Fiverr footer alignments",
    "Meta empty states copy review",
    "Zoom pricing page hero crop",
    "Wix avatar fallback tokens",
    "Slack dropdown polish",
    "Monday — sub-brand exploration",
    "Fiverr — icon set v3 sweep",
    "Meta — onboarding micro-copy",
    "Zoom — testimonial section pass",
  ][i],
  project: [
    "App Redesign",
    "Dashboard UI",
    "Brand Identity",
    "Marketing Kit",
    "Social Templates",
    "Landing Page",
    "App Redesign",
    "Dashboard UI",
    "Brand Identity",
    "Marketing Kit",
    "Social Templates",
    "Landing Page",
  ][i],
  client: [
    "Wix",
    "Slack",
    "Monday",
    "Fiverr",
    "Meta",
    "Zoom",
    "Wix",
    "Slack",
    "Monday",
    "Fiverr",
    "Meta",
    "Zoom",
  ][i],
  status: (["in-progress", "in-review", "todo", "approved"] as TodayStatus[])[
    i % 4
  ],
  priority: OVERFLOW_PRIORITIES[i % OVERFLOW_PRIORITIES.length],
  assignee: OVERFLOW_ASSIGNEES[i % OVERFLOW_ASSIGNEES.length],
  dueOffsetHours: 3 + i * 0.4,
}))

function buildTask(m: MockTask, now: Date): TodayTask {
  const due = new Date(now.getTime() + m.dueOffsetHours * 60 * 60 * 1000)
  return {
    id: m.id,
    title: m.title,
    project: m.project,
    client: m.client,
    status: m.status,
    priority: m.priority,
    assignee: m.assignee,
    due: due.toISOString(),
    isOverdue: m.isOverdue,
  }
}

function bucketTasks(tasks: TodayTask[], rawTasks: MockTask[]) {
  const now = new Date()
  const nowItems: TodayTask[] = []
  const laterItems: TodayTask[] = []
  const blockedItems: TodayTask[] = []

  tasks.forEach((task, idx) => {
    const m = rawTasks[idx]
    const dueDate = new Date(task.due)
    const hoursUntilDue = (dueDate.getTime() - now.getTime()) / (60 * 60 * 1000)
    const isBlocked = m.status === "blocked"
    const ageingReview = m.status === "in-review" && (m.ageHours ?? 0) > 24

    if (isBlocked || ageingReview) {
      blockedItems.push(task)
    } else if (hoursUntilDue >= 0 && hoursUntilDue <= 2) {
      nowItems.push(task)
    } else if (hoursUntilDue > 2) {
      laterItems.push(task)
    } else {
      // overdue but not blocked → surface in Now to grab attention
      nowItems.push({ ...task, isOverdue: true })
    }
  })

  return { nowItems, laterItems, blockedItems }
}

export interface TodayContentProps {
  /**
   * When true, renders the "Today" header with date + deadline count.
   * When false, the host (e.g. a Tab on the home dashboard) is expected to
   * provide its own surrounding header. Default: true.
   */
  showHeader?: boolean
}

/**
 * Canonical "Today" view body. Mounted both at `/dashboard-today` (deep-link
 * route) and inside the `Today` tab on `/`. Single source of truth so the two
 * never visually drift.
 */
export function TodayContent({ showHeader = true }: TodayContentProps) {
  const params = useSearchParams()
  const stateParam = (params.get("state") ?? "default") as ViewState

  const { nowItems, laterItems, blockedItems, isOverflow } = useMemo(() => {
    const now = new Date()
    const source =
      stateParam === "overflow"
        ? [...MOCK_TASKS, ...OVERFLOW_LATER]
        : MOCK_TASKS
    const built = source.map((m) => buildTask(m, now))
    const bucketed = bucketTasks(built, source)
    return { ...bucketed, isOverflow: stateParam === "overflow" }
  }, [stateParam])

  const today = useMemo(() => {
    const d = new Date()
    return d.toLocaleDateString(undefined, {
      weekday: "long",
      month: "long",
      day: "numeric",
    })
  }, [])

  const totalDeadlines = nowItems.length + laterItems.length

  return (
    <div className="space-y-6">
      {showHeader ? (
        <header className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">Today</h1>
          <p className="text-sm text-muted-foreground">
            {today}
            <span className="mx-1.5" aria-hidden="true">
              ·
            </span>
            {stateParam === "empty"
              ? "0 deadlines today"
              : stateParam === "loading" || stateParam === "error"
                ? "Catching up…"
                : `${totalDeadlines} deadlines today`}
          </p>
        </header>
      ) : null}

      {stateParam === "loading" ? (
        <LoadingState />
      ) : stateParam === "error" ? (
        <ErrorState />
      ) : stateParam === "empty" ? (
        <EmptyState />
      ) : (
        <>
          <NextUpCard item={NEXT_UP} />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <ZoneSection
              title="Now"
              tasks={nowItems}
              emptyLabel="Nothing in the next 2 hours"
            />
            <ZoneSection
              title="Later Today"
              tasks={laterItems}
              emptyLabel="No more deadlines today"
              initialVisible={isOverflow ? 5 : 8}
            />
            <ZoneSection
              title="Blocked / Waiting"
              tasks={blockedItems}
              emptyLabel="Nothing blocked"
            />
          </div>
        </>
      )}
    </div>
  )
}
