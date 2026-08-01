"use client"

import { Archive, Figma, MoreHorizontal, Pencil, Trash2 } from "lucide-react"
import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { computeHealth } from "./data"
import { HealthDot } from "./health-badge"
import type { ProjectStatus, PulseProject } from "./types"

// Same status palette as the table so a project reads identically in both views.
const statusStyles: Record<ProjectStatus, string> = {
  Discovery:
    "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  Design: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  Review:
    "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
  Handoff:
    "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  Done: "bg-muted text-muted-foreground",
}

// The studio's Figma file. Individual projects can override via `figmaUrl`.
const FIGMA_FILE =
  "https://www.figma.com/design/NZfLoBzElVM6Objo0CxIh4/Studio-OS--Community-"

interface ProjectRowProps {
  project: PulseProject
  onEditClick?: (project: PulseProject) => void
  onArchiveClick?: (project: PulseProject) => void
  onDeleteClick?: (project: PulseProject) => void
}

export function ProjectRow({
  project: p,
  onEditClick,
  onArchiveClick,
  onDeleteClick,
}: ProjectRowProps) {
  const health = computeHealth(p)
  const isOverdue = p.overdue || p.daysToDeadline < 0
  const pct =
    p.tasksTotal === 0 ? 0 : Math.round((p.tasksDone / p.tasksTotal) * 100)

  return (
    <div className="flex flex-wrap items-center gap-4 rounded-xl border border-border bg-card p-4 shadow-sm transition-colors hover:bg-muted/40">
      {/* Name + subtitle */}
      <div className="min-w-[180px] flex-1">
        <p className="font-semibold leading-tight">{p.name}</p>
        <p className="mt-0.5 text-xs text-muted-foreground">{p.subtitle}</p>
      </div>

      {/* Client */}
      <div className="flex w-36 shrink-0 items-center gap-2">
        <Avatar size="sm">
          <AvatarImage src={p.clientLogo} alt={p.client} />
          <AvatarFallback>{p.client[0]}</AvatarFallback>
        </Avatar>
        <span className="text-sm font-medium">{p.client}</span>
      </div>

      {/* Status */}
      <div className="inline-flex w-28 shrink-0 items-center gap-2">
        <HealthDot health={health} />
        <span
          className={cn(
            "inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium",
            statusStyles[p.status]
          )}
        >
          {p.status}
        </span>
      </div>

      {/* Team */}
      <div className="w-24 shrink-0">
        <AvatarGroup>
          {p.team.map((m) => (
            <Avatar key={m.name} size="sm">
              <AvatarFallback className={cn("text-white", m.color)}>
                {m.initials}
              </AvatarFallback>
            </Avatar>
          ))}
        </AvatarGroup>
      </div>

      {/* Due date */}
      <span
        className={cn(
          "w-16 shrink-0 text-sm font-medium tabular-nums",
          isOverdue && "text-destructive"
        )}
      >
        {p.due}
      </span>

      {/* Tasks — progress bar + count (matches the table view) */}
      <div className="flex w-40 shrink-0 items-center gap-2">
        <div
          className="h-1.5 w-20 overflow-hidden rounded-full bg-muted"
          dir="ltr"
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
        <span className="text-xs tabular-nums text-muted-foreground">
          {p.tasksDone}/{p.tasksTotal}
        </span>
      </div>

      {/* Figma link */}
      <a
        href={p.figmaUrl ?? FIGMA_FILE}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Open ${p.name} in Figma`}
        className="inline-flex shrink-0 items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <Figma className="size-4" aria-hidden />
        <span>Open</span>
      </a>

      {/* Actions */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon-sm"
            className="ml-auto"
            aria-label={`Actions for ${p.name}`}
          >
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => onEditClick?.(p)}>
            <Pencil />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onArchiveClick?.(p)}>
            <Archive />
            Archive
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            variant="destructive"
            onClick={() => onDeleteClick?.(p)}
          >
            <Trash2 />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
