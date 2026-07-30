import { Figma } from "lucide-react"
import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarImage,
} from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { computeHealth } from "./data"
import { HealthDot, OverdueBadge } from "./health-badge"
import { ProjectActionsMenu } from "./project-actions-menu"
import { StatusPicker } from "./status-picker"
import type { ProjectStatus, PulseProject } from "./types"

export function ProjectGridCard({
  project: p,
  isLinked,
  onOpen,
  onStatusChange,
}: {
  project: PulseProject
  isLinked?: boolean
  onOpen?: () => void
  onStatusChange: (status: ProjectStatus) => void
}) {
  const health = computeHealth(p)
  const isOverdue = p.overdue || p.daysToDeadline < 0
  const pct =
    p.tasksTotal === 0 ? 0 : Math.round((p.tasksDone / p.tasksTotal) * 100)

  return (
    <div
      className={cn(
        "flex flex-col gap-4 rounded-xl border border-border bg-card p-4 text-card-foreground shadow-sm",
        "transition-[transform,box-shadow] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]",
        "hover:-translate-y-0.5 hover:shadow-md",
        isLinked && "cursor-pointer"
      )}
      role={isLinked ? "link" : undefined}
      tabIndex={isLinked ? 0 : undefined}
      aria-label={isLinked ? `Open ${p.name}` : undefined}
      onClick={isLinked ? onOpen : undefined}
      onKeyDown={
        isLinked
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault()
                onOpen?.()
              }
            }
          : undefined
      }
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="truncate font-semibold leading-tight">{p.name}</p>
          <p className="text-xs text-muted-foreground">{p.subtitle}</p>
        </div>
        <ProjectActionsMenu project={p} />
      </div>

      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Avatar size="sm">
            <AvatarImage src={p.clientLogo} alt={p.client} />
            <AvatarFallback>{p.client[0]}</AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium">{p.client}</span>
        </div>
        <div className="inline-flex items-center gap-2">
          <HealthDot health={health} />
          <StatusPicker status={p.status} onChange={onStatusChange} />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <AvatarGroup>
          {p.team.map((m) => (
            <Avatar key={m.name} size="sm">
              <AvatarFallback className={cn("text-white", m.color)}>
                {m.initials}
              </AvatarFallback>
            </Avatar>
          ))}
        </AvatarGroup>
        <div className="flex items-center gap-2">
          <span
            className={cn(
              "text-sm font-medium tabular-nums",
              isOverdue && "text-destructive"
            )}
          >
            {p.due}
          </span>
          {isOverdue && <OverdueBadge daysToDeadline={p.daysToDeadline} />}
        </div>
      </div>

      <div
        className="h-1.5 w-full overflow-hidden rounded-full bg-muted"
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${p.tasksDone} of ${p.tasksTotal} tasks done (${pct}%)`}
      >
        <div
          className="h-full rounded-full bg-primary transition-[width] duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>

      <a
        href={p.figmaLink}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Open ${p.name} in Figma`}
        onClick={(e) => e.stopPropagation()}
        className="inline-flex w-fit items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <Figma className="size-4" />
        Figma
      </a>
    </div>
  )
}
