"use client"

import Link from "next/link"
import { User } from "lucide-react"
import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { computeHealth, isUnassignedTask } from "./data"
import { HealthBadge } from "./health-badge"
import type { NextTask, PulseProject, TaskPriority } from "./types"

// Same priority palette as components/kanban-board.tsx so a task looks
// identical wherever it appears in the product.
const priorityStyles: Record<TaskPriority, string> = {
  High: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  Medium:
    "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  Low: "bg-muted text-muted-foreground",
}

export function ProjectPulseCard({ project }: { project: PulseProject }) {
  const health = computeHealth(project)
  const pct =
    project.tasksTotal === 0
      ? 0
      : Math.round((project.tasksDone / project.tasksTotal) * 100)
  const isOverdue = project.overdue || project.daysToDeadline < 0
  const headingId = `project-${project.id}-title`

  const ariaLabel = `Project ${project.name} for ${project.client}, status ${health.toLowerCase()}, ${project.tasksDone} of ${project.tasksTotal} tasks done, due ${project.due}`

  return (
    <article
      aria-labelledby={headingId}
      className={cn(
        "group relative flex flex-col gap-3.5 rounded-xl border border-border bg-card p-4 text-card-foreground shadow-sm",
        "transition-[transform,box-shadow] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]",
        "hover:-translate-y-0.5 hover:shadow-md",
        "focus-within:ring-[3px] focus-within:ring-ring/50"
      )}
    >
      {/* Card-as-link overlay: full-bleed link covers the card so the whole
          surface is clickable. Interactive children below sit on top via
          `relative` and remain independently clickable. */}
      <Link
        href={`/projects/${project.id}`}
        aria-label={ariaLabel}
        className="absolute inset-0 z-0 rounded-xl focus:outline-none"
      >
        <span className="sr-only">{ariaLabel}</span>
      </Link>

      {/* Header — avatar + name/client + health badge. No menu without
          a real menu, no duplicate signals. */}
      <div className="relative flex items-start gap-3">
        <Avatar size="default">
          <AvatarImage src={project.clientLogo} alt={project.client} />
          <AvatarFallback>{project.client[0]}</AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex-1">
          <h2
            id={headingId}
            className="text-base font-semibold leading-snug truncate"
          >
            {project.name}
          </h2>
          <p className="text-xs text-muted-foreground truncate">
            {project.client} · {project.subtitle}
          </p>
        </div>
        <HealthBadge health={health} reason={project.healthReason} />
      </div>

      {/* Progress — total tasks on one side, raw deadline date on the other.
          The bar is the progress signal. We don't repeat "X days overdue"
          because the HealthBadge already says Critical, and the date itself
          ("Apr 2") in destructive colour carries the urgency. */}
      <div className="relative space-y-1.5">
        <div className="flex items-baseline justify-between gap-3">
          <span className="text-sm font-medium tabular-nums">
            {project.tasksTotal}{" "}
            <span className="text-muted-foreground font-normal">
              task{project.tasksTotal === 1 ? "" : "s"}
            </span>
          </span>
          <span
            className={cn(
              "text-xs tabular-nums",
              isOverdue
                ? "text-destructive font-medium"
                : "text-muted-foreground"
            )}
          >
            {project.due}
          </span>
        </div>
        <div
          className="h-1.5 bg-muted rounded-full overflow-hidden"
          dir="ltr"
          role="progressbar"
          aria-valuenow={pct}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`${project.tasksDone} of ${project.tasksTotal} tasks done (${pct}%)`}
        >
          <div
            className="h-full bg-primary rounded-full transition-[width] duration-500"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      {/* Next tasks — each row matches the kanban TaskCard visual language */}
      <div className="relative space-y-2">
        <h3 className="text-xs font-medium text-muted-foreground">
          Next {project.nextTasks.length} task
          {project.nextTasks.length === 1 ? "" : "s"}
        </h3>
        <ul className="flex flex-col gap-1.5">
          {project.nextTasks.map((task) => (
            <li key={task.id}>
              <PulseTaskRow task={task} />
            </li>
          ))}
        </ul>
      </div>

      {/* Footer — AvatarGroup is rendered conditionally: only when the
          project is At Risk or Critical. Rationale: in Healthy state there
          is no JTBD for "who's on the team" — Daniel knows his 3 projects
          and ~5 teammates by heart, and any team-level action lives inside
          the project itself. Showing the avatars only in stress states turns
          their *appearance* into a signal ("these are the people you're not
          alone with on this") rather than always-on chrome. The footer keeps
          its height because "Open project" anchors `justify-end`.

          See `.claude/agents/shared/lessons.md` —
          "Conditional UI elements לפי signal level" (2026-05-05). */}
      <div
        className={cn(
          "relative mt-auto flex items-center gap-3",
          health === "Healthy" ? "justify-end" : "justify-between"
        )}
      >
        {health !== "Healthy" && (
          <AvatarGroup aria-label={`Team on ${project.name}`}>
            {project.team.map((m) => (
              <Tooltip key={m.name}>
                <TooltipTrigger asChild>
                  <Avatar size="sm" aria-label={m.name}>
                    <AvatarFallback className={cn("text-white", m.color)}>
                      {m.initials}
                    </AvatarFallback>
                  </Avatar>
                </TooltipTrigger>
                <TooltipContent side="top">{m.name}</TooltipContent>
              </Tooltip>
            ))}
          </AvatarGroup>
        )}
        <Button
          variant="outline"
          size="sm"
          asChild
          onClick={(e) => e.stopPropagation()}
        >
          <Link href={`/projects/${project.id}`}>Open project</Link>
        </Button>
      </div>
    </article>
  )
}

/**
 * A compact task card that mirrors the kanban TaskCard
 * (components/kanban-board.tsx) so users recognise it as the same object —
 * but adapts the *information density* to the Pulse context.
 *
 * Visual API stays identical (same priority pill, same Avatar component, same
 * type scale). The avatar has three mutually exclusive *visible* states —
 * every row always renders something in the avatar slot, because a missing
 * avatar between rows that have one reads as a broken layout, not as a "this
 * is mine" signal:
 *
 * - **Daniel's own task** — Avatar with his initials in a *neutral* tone
 *   (`bg-foreground text-background`) so it's distinguishable from coloured
 *   teammates without being louder. Same size, same type scale — the
 *   differentiation is tone, not weight.
 * - **Unassigned task** (`assignee == null`) — placeholder avatar with a
 *   muted `<User>` icon.
 * - **Other teammate** — full Avatar with initials and the member's colour.
 *
 * Tooltip (content-only — empty hover = noise):
 * - Daniel + due: "Due X".
 * - Daniel without due: no tooltip.
 * - Unassigned: "Due X · Unassigned" (or just "Unassigned" if no due).
 * - Other: "Due X · Assigned to Y".
 *
 * Rationale lives in `.claude/agents/shared/lessons.md` —
 * "Visual hole != signal" (2026-05-05) and
 * "Info Hierarchy בשורות task — context-aware".
 */
function PulseTaskRow({ task }: { task: NextTask }) {
  const isUnassigned = isUnassignedTask(task)
  const isOwn = !isUnassigned && task.assignee?.name === "Daniel"

  const tooltipParts: string[] = []
  if (task.due) tooltipParts.push(`Due ${task.due}`)
  if (isUnassigned) {
    tooltipParts.push("Unassigned")
  } else if (!isOwn && task.assignee) {
    tooltipParts.push(`Assigned to ${task.assignee.name}`)
  }
  const showTooltip = tooltipParts.length > 0

  const row = (
    <div
      className={cn(
        "flex items-center gap-2 rounded-lg border border-border bg-card px-2.5 py-2 shadow-sm",
        "transition-colors duration-150",
        showTooltip && "hover:bg-accent/40"
      )}
    >
      <p className="min-w-0 flex-1 truncate text-sm font-medium leading-snug">
        {task.title}
      </p>
      <span
        className={cn(
          "shrink-0 inline-flex rounded-full px-2 py-0.5 text-[11px] font-medium",
          priorityStyles[task.priority]
        )}
      >
        {task.priority}
      </span>
      {isUnassigned ? (
        <Avatar size="sm" aria-label="Unassigned">
          <AvatarFallback>
            <User className="size-3.5" aria-hidden="true" />
          </AvatarFallback>
        </Avatar>
      ) : isOwn && task.assignee ? (
        <Avatar size="sm" aria-label={task.assignee.name}>
          <AvatarFallback className="bg-foreground text-background">
            {task.assignee.initials}
          </AvatarFallback>
        </Avatar>
      ) : (
        task.assignee && (
          <Avatar size="sm" aria-label={task.assignee.name}>
            <AvatarFallback className={cn("text-white", task.assignee.color)}>
              {task.assignee.initials}
            </AvatarFallback>
          </Avatar>
        )
      )}
    </div>
  )

  if (!showTooltip) return row

  return (
    <Tooltip>
      <TooltipTrigger asChild>{row}</TooltipTrigger>
      <TooltipContent side="top" align="end">
        {tooltipParts.join(" · ")}
      </TooltipContent>
    </Tooltip>
  )
}
