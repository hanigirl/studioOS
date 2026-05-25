"use client"

import { useState } from "react"
import { MoreHorizontal } from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  AvatarGroup,
} from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { computeHealth } from "./data"
import type { ProjectStatus, PulseProject } from "./types"

const statusStyles: Record<ProjectStatus, string> = {
  Discovery:
    "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  Design:
    "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  Review:
    "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
  Handoff:
    "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  Done: "bg-muted text-muted-foreground",
}

const tabs = [
  { label: "All", value: "all" as const },
  { label: "Discovery", value: "Discovery" as const },
  { label: "Design", value: "Design" as const },
  { label: "Review", value: "Review" as const },
  { label: "Handoff", value: "Handoff" as const },
]

type TabValue = (typeof tabs)[number]["value"]

/**
 * The management view of the Project entity inside `/projects`. Reads the
 * canonical `PulseProject[]` so this table and `<PulseSection>` above it can
 * never drift apart — same source of truth, two angles.
 *
 * Tabs filter by `status` (Discovery / Design / Review / Handoff). That axis
 * is independent of `health` (the Pulse axis) so a project can move through
 * status tabs while staying At Risk or Healthy without contradiction.
 *
 * Rationale lives in `.claude/agents/shared/lessons.md` —
 * "IA: ישות אחת = surface אחד" (2026-05-05).
 */
export function AllProjectsTable({ projects }: { projects: PulseProject[] }) {
  const [active, setActive] = useState<TabValue>("all")

  const filtered =
    active === "all"
      ? projects
      : projects.filter((p) => p.status === active)

  const countFor = (v: TabValue) =>
    v === "all"
      ? projects.length
      : projects.filter((p) => p.status === v).length

  return (
    <Card>
      <CardHeader>
        <CardTitle>Active Projects</CardTitle>
        <CardDescription>
          {projects.length} project{projects.length === 1 ? "" : "s"} in
          progress across {projects.length} client{projects.length === 1 ? "" : "s"}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 px-0">
        {/* Tabs filter by status — same status axis the kanban uses. */}
        <div className="flex flex-wrap gap-2 px-6">
          {tabs.map((t) => {
            const isActive = active === t.value
            return (
              <button
                key={t.value}
                type="button"
                onClick={() => setActive(t.value)}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "border border-border text-foreground hover:bg-accent"
                )}
              >
                <span>{t.label}</span>
                <span
                  className={cn(
                    "text-[11px]",
                    isActive
                      ? "text-primary-foreground/70"
                      : "text-muted-foreground"
                  )}
                >
                  {countFor(t.value)}
                </span>
              </button>
            )
          })}
        </div>

        {/* Rows */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <tbody>
              {filtered.map((p, i) => {
                const isOverdue = p.overdue || p.daysToDeadline < 0
                return (
                  <tr
                    key={p.id}
                    className={cn(
                      "group hover:bg-muted/40 transition-colors",
                      i < filtered.length - 1 && "border-b border-border"
                    )}
                  >
                    <td className="px-6 py-4 w-[200px]">
                      <div className="flex flex-col gap-0.5">
                        <span className="font-semibold leading-tight">
                          {p.name}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {p.subtitle}
                        </span>
                      </div>
                    </td>
                    <td className="px-3 py-4">
                      <div className="flex items-center gap-2">
                        <Avatar size="sm">
                          <AvatarImage src={p.clientLogo} alt={p.client} />
                          <AvatarFallback>{p.client[0]}</AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{p.client}</span>
                      </div>
                    </td>
                    <td className="px-3 py-4">
                      <span
                        className={cn(
                          "inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium",
                          statusStyles[p.status]
                        )}
                      >
                        {p.status}
                      </span>
                    </td>
                    <td className="px-3 py-4">
                      <AvatarGroup>
                        {p.team.map((m) => (
                          <Avatar key={m.name} size="sm">
                            <AvatarFallback
                              className={cn("text-white", m.color)}
                            >
                              {m.initials}
                            </AvatarFallback>
                          </Avatar>
                        ))}
                      </AvatarGroup>
                    </td>
                    <td className="px-3 py-4">
                      <span
                        className={cn(
                          "text-sm font-medium tabular-nums",
                          isOverdue && "text-destructive"
                        )}
                      >
                        {p.due}
                      </span>
                    </td>
                    <td className="px-3 py-4 text-sm text-muted-foreground tabular-nums">
                      {p.tasksDone}/{p.tasksTotal}
                    </td>
                    <td className="px-3 py-4 w-10">
                      <button
                        type="button"
                        className="flex size-8 items-center justify-center rounded-md opacity-0 transition-opacity hover:bg-accent group-hover:opacity-100"
                      >
                        <MoreHorizontal className="size-4 text-muted-foreground" />
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
