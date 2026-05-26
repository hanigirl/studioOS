"use client"

import { useState, useMemo } from "react"
import { ChevronUp, ChevronDown, ChevronsUpDown, Search } from "lucide-react"
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
import { useTableSort, type SortDir } from "@/hooks/use-table-sort"
import { Input } from "@/components/ui/input"
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { computeHealth } from "./data"
import { HealthDot } from "./health-badge"
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

const STATUS_ORDER: Record<ProjectStatus, number> = {
  Discovery: 0,
  Design: 1,
  Review: 2,
  Handoff: 3,
  Done: 4,
}

const tabs = [
  { label: "All", value: "all" as const },
  { label: "Discovery", value: "Discovery" as const },
  { label: "Design", value: "Design" as const },
  { label: "Review", value: "Review" as const },
  { label: "Handoff", value: "Handoff" as const },
]

type TabValue = (typeof tabs)[number]["value"]
type SortKey = "name" | "client" | "status" | "team" | "due" | "tasks"

const comparators: Record<SortKey, (a: PulseProject, b: PulseProject) => number> = {
  name:   (a, b) => a.name.localeCompare(b.name),
  client: (a, b) => a.client.localeCompare(b.client),
  status: (a, b) => STATUS_ORDER[a.status] - STATUS_ORDER[b.status],
  team:   (a, b) => a.team.length - b.team.length,
  due:    (a, b) => a.daysToDeadline - b.daysToDeadline,
  tasks:  (a, b) => (a.tasksDone / (a.tasksTotal || 1)) - (b.tasksDone / (b.tasksTotal || 1)),
}

function SortIcon({ column, sortKey, sortDir }: {
  column: SortKey
  sortKey: SortKey | null
  sortDir: SortDir
}) {
  const isActive = sortKey === column
  if (isActive && sortDir === "asc")  return <ChevronUp  className="size-3 shrink-0" />
  if (isActive && sortDir === "desc") return <ChevronDown className="size-3 shrink-0" />
  return (
    <ChevronsUpDown className="size-3 shrink-0 opacity-0 group-hover:opacity-50 transition-opacity" />
  )
}

function SortTh({
  label,
  column,
  sortKey,
  sortDir,
  onSort,
  className,
}: {
  label: string
  column: SortKey
  sortKey: SortKey | null
  sortDir: SortDir
  onSort: (k: SortKey) => void
  className?: string
}) {
  const isActive = sortKey === column
  return (
    <th className={cn("py-3 text-left font-medium", className)}>
      <button
        type="button"
        onClick={() => onSort(column)}
        className={cn(
          "group inline-flex items-center gap-1 transition-colors hover:text-foreground",
          isActive ? "text-foreground" : "text-muted-foreground"
        )}
      >
        {label}
        <SortIcon column={column} sortKey={sortKey} sortDir={sortDir} />
      </button>
    </th>
  )
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
  const [query, setQuery] = useState("")

  const filtered = useMemo(
    () =>
      active === "all"
        ? projects
        : projects.filter((p) => p.status === active),
    [projects, active]
  )

  const searchFiltered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return filtered
    return filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.client.toLowerCase().includes(q)
    )
  }, [filtered, query])

  const { sorted, sortKey, sortDir, toggle, set } = useTableSort<PulseProject, SortKey>(
    searchFiltered,
    comparators
  )

  const sortValue = sortKey ? `${sortKey}-${sortDir}` : ""

  function handleSortChange(value: string) {
    if (!value) { set(null, "asc"); return }
    const dashIdx = value.lastIndexOf("-")
    const key = value.slice(0, dashIdx) as SortKey
    const dir = value.slice(dashIdx + 1) as SortDir
    set(key, dir)
  }

  const countFor = (v: TabValue) =>
    v === "all"
      ? projects.length
      : projects.filter((p) => p.status === v).length

  return (
    <Card>
      <CardHeader>
        <CardTitle>All projects</CardTitle>
        <CardDescription>
          {projects.length} project{projects.length === 1 ? "" : "s"} across
          your clients
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 px-0">
        {/* Row 1: tabs (left) + search (right), bottom-aligned */}
        <div className="flex items-end gap-4 px-6">
          <div className="flex flex-wrap gap-2 flex-1">
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

          <div className="relative shrink-0">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground pointer-events-none" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search project or client…"
              className="h-8 w-[220px] pl-8 text-sm"
            />
          </div>
        </div>

        {/* Row 2: sort (right only) */}
        <div className="flex justify-end px-6">
          <Select value={sortValue} onValueChange={handleSortChange}>
            <SelectTrigger size="sm" className="w-[220px]">
              <SelectValue placeholder="Sort by…" />
            </SelectTrigger>
            <SelectContent align="end">
              <SelectItem value="name-asc">Project (A → Z)</SelectItem>
              <SelectItem value="name-desc">Project (Z → A)</SelectItem>
              <SelectSeparator />
              <SelectItem value="client-asc">Client (A → Z)</SelectItem>
              <SelectItem value="client-desc">Client (Z → A)</SelectItem>
              <SelectSeparator />
              <SelectItem value="status-asc">Status (workflow)</SelectItem>
              <SelectItem value="status-desc">Status (reversed)</SelectItem>
              <SelectSeparator />
              <SelectItem value="team-asc">Team (smallest)</SelectItem>
              <SelectItem value="team-desc">Team (largest)</SelectItem>
              <SelectSeparator />
              <SelectItem value="due-asc">Due date (earliest)</SelectItem>
              <SelectItem value="due-desc">Due date (latest)</SelectItem>
              <SelectSeparator />
              <SelectItem value="tasks-asc">Tasks (least done)</SelectItem>
              <SelectItem value="tasks-desc">Tasks (most done)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-y border-border text-[11px] uppercase tracking-wider text-muted-foreground">
                {(
                  [
                    { label: "Project",  column: "name",   className: "px-6" },
                    { label: "Client",   column: "client", className: "px-3" },
                    { label: "Status",   column: "status", className: "px-3" },
                    { label: "Team",     column: "team",   className: "px-3" },
                    { label: "Due Date", column: "due",    className: "px-3" },
                    { label: "Tasks",    column: "tasks",  className: "px-3" },
                  ] as const
                ).map(({ label, column, className }) => (
                  <SortTh
                    key={column}
                    label={label}
                    column={column}
                    sortKey={sortKey}
                    sortDir={sortDir}
                    onSort={toggle}
                    className={className}
                  />
                ))}
              </tr>
            </thead>
            <tbody>
              {sorted.map((p, i) => {
                const health = computeHealth(p)
                const isOverdue = p.overdue || p.daysToDeadline < 0
                return (
                  <tr
                    key={p.id}
                    className={cn(
                      "group hover:bg-muted/40 transition-colors",
                      i < sorted.length - 1 && "border-b border-border"
                    )}
                  >
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-semibold leading-tight">
                          {p.name}
                        </span>
                        <span className="text-xs text-muted-foreground mt-0.5">
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
                      <div className="inline-flex items-center gap-2">
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
                    </td>
                    <td className="px-3 py-4">
                      <AvatarGroup>
                        {p.team.map((m) => (
                          <Tooltip key={m.name}>
                            <TooltipTrigger asChild>
                              <Avatar size="sm" className="cursor-pointer">
                                <AvatarFallback
                                  className={cn("text-white", m.color)}
                                >
                                  {m.initials}
                                </AvatarFallback>
                              </Avatar>
                            </TooltipTrigger>
                            <TooltipContent
                              side="top"
                              sideOffset={6}
                              className="bg-card text-card-foreground border border-border shadow-md p-2.5 rounded-lg flex items-center gap-2.5"
                            >
                              <div
                                className={cn(
                                  "size-7 rounded-full flex items-center justify-center text-white text-[11px] font-semibold shrink-0",
                                  m.color
                                )}
                              >
                                {m.initials}
                              </div>
                              <span className="text-sm font-medium text-foreground whitespace-nowrap">
                                {m.name}
                              </span>
                            </TooltipContent>
                          </Tooltip>
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
