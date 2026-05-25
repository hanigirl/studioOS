"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, ChevronsUpDown, MoreHorizontal, Search } from "lucide-react"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
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

type SortCol = "name" | "status" | "due"
type SortDir = "asc" | "desc"

const STATUS_ORDER: Record<ProjectStatus, number> = {
  Discovery: 0,
  Design: 1,
  Review: 2,
  Handoff: 3,
  Done: 4,
}

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
  const [search, setSearch] = useState("")
  const [sortCol, setSortCol] = useState<SortCol | null>(null)
  const [sortDir, setSortDir] = useState<SortDir>("asc")

  function handleSort(col: SortCol) {
    if (sortCol === col) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"))
    } else {
      setSortCol(col)
      setSortDir("asc")
    }
  }

  const filtered = projects.filter((p) => {
    const q = search.toLowerCase()
    const matchesSearch =
      q === "" ||
      p.name.toLowerCase().includes(q) ||
      p.client.toLowerCase().includes(q)
    const matchesTab = active === "all" || p.status === active
    return matchesSearch && matchesTab
  })

  const countFor = (v: TabValue) =>
    v === "all"
      ? projects.length
      : projects.filter((p) => p.status === v).length

  const sorted = [...filtered].sort((a, b) => {
    if (!sortCol) return 0
    let cmp = 0
    if (sortCol === "name") cmp = a.name.localeCompare(b.name)
    else if (sortCol === "status") cmp = STATUS_ORDER[a.status] - STATUS_ORDER[b.status]
    else if (sortCol === "due") cmp = a.daysToDeadline - b.daysToDeadline
    return sortDir === "asc" ? cmp : -cmp
  })

  function SortHeader({
    label,
    col,
    active,
    dir,
    onSort,
  }: {
    label: string
    col: SortCol
    active: SortCol | null
    dir: SortDir
    onSort: (col: SortCol) => void
  }) {
    const isActive = active === col
    const Icon = isActive ? (dir === "asc" ? ChevronUp : ChevronDown) : ChevronsUpDown
    return (
      <button
        type="button"
        onClick={() => onSort(col)}
        className={cn(
          "inline-flex items-center gap-1 text-xs font-medium transition-colors",
          isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
        )}
      >
        {label}
        <Icon className="size-3.5" aria-hidden />
      </button>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Active Projects</CardTitle>
        <CardDescription>
          {projects.length} project{projects.length === 1 ? "" : "s"} in
          progress across {projects.length} client{projects.length === 1 ? "" : "s"}
        </CardDescription>
        <CardAction>
          <div className="relative">
            <Search className="pointer-events-none absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search projects or clients..."
              className="h-8 w-52 pl-8 text-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </CardAction>
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
            <thead>
              <tr className="border-b border-border">
                <th className="px-6 py-2 text-left w-[200px]">
                  <SortHeader label="Name" col="name" active={sortCol} dir={sortDir} onSort={handleSort} />
                </th>
                <th className="px-3 py-2 text-left text-xs font-medium text-muted-foreground">Client</th>
                <th className="px-3 py-2 text-left">
                  <SortHeader label="Status" col="status" active={sortCol} dir={sortDir} onSort={handleSort} />
                </th>
                <th className="px-3 py-2 text-left text-xs font-medium text-muted-foreground">Team</th>
                <th className="px-3 py-2 text-left">
                  <SortHeader label="Due" col="due" active={sortCol} dir={sortDir} onSort={handleSort} />
                </th>
                <th className="px-3 py-2 text-left text-xs font-medium text-muted-foreground">Tasks</th>
                <th className="w-10" />
              </tr>
            </thead>
            <tbody>
              {sorted.map((p, i) => {
                const isOverdue = p.overdue || p.daysToDeadline < 0
                return (
                  <tr
                    key={p.id}
                    className={cn(
                      "group hover:bg-muted/40 transition-colors",
                      i < sorted.length - 1 && "border-b border-border"
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
