"use client"

import { useEffect, useMemo, useState, type KeyboardEvent } from "react"
import { useRouter } from "next/navigation"
import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  Figma,
  LayoutGrid,
  List,
  Search,
  SlidersHorizontal,
} from "lucide-react"
import {
  Card,
  CardAction,
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
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { cn } from "@/lib/utils"
import { computeHealth } from "./data"
import { EmptyState } from "./empty-state"
import { HealthDot, OverdueBadge } from "./health-badge"
import { LoadingState } from "./loading-state"
import { ProjectActionsMenu } from "./project-actions-menu"
import { ProjectGridCard } from "./project-grid-card"
import { StatusPicker } from "./status-picker"
import type { ProjectStatus, PulseProject } from "./types"

type ViewMode = "grid" | "table"
type SortField = "name" | "client" | "due" | "tasks"
type SortDirection = "asc" | "desc"

const sortOptions: { label: string; value: SortField }[] = [
  { label: "Project name", value: "name" },
  { label: "Client", value: "client" },
  { label: "Due date", value: "due" },
  { label: "Tasks", value: "tasks" },
]

function taskPct(p: PulseProject) {
  return p.tasksTotal === 0 ? 0 : (p.tasksDone / p.tasksTotal) * 100
}

// Sorts by the displayed "due" string (e.g. "Apr 12") rather than
// daysToDeadline — that field tracks urgency/health narrative, not the
// actual calendar date, so it doesn't match what the Due Date column shows.
function dueSortKey(due: string) {
  const parsed = new Date(`${due} 2000`)
  return Number.isNaN(parsed.getTime())
    ? 0
    : parsed.getMonth() * 31 + parsed.getDate()
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
// Only "App Redesign" links to a real single-project page for now — the
// other rows will get the same treatment once their pages exist.
const LINKED_PROJECT_ID = "wix-app-redesign"

export function AllProjectsTable({
  projects,
  onStatusChange,
}: {
  projects: PulseProject[]
  onStatusChange: (id: string, status: ProjectStatus) => void
}) {
  const router = useRouter()
  const [active, setActive] = useState<TabValue>("all")
  const [query, setQuery] = useState("")
  const [view, setView] = useState<ViewMode>("grid")
  const [sortField, setSortField] = useState<SortField | null>(null)
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc")
  const [isLoading, setIsLoading] = useState(true)
  const [filterClients, setFilterClients] = useState<Set<string>>(new Set())
  const [filterTeam, setFilterTeam] = useState<Set<string>>(new Set())
  const [overdueOnly, setOverdueOnly] = useState(false)

  const allClients = useMemo(
    () => Array.from(new Set(projects.map((p) => p.client))).sort(),
    [projects]
  )
  const allTeamMembers = useMemo(
    () =>
      Array.from(new Set(projects.flatMap((p) => p.team.map((m) => m.name)))).sort(),
    [projects]
  )
  const activeFilterCount =
    filterClients.size + filterTeam.size + (overdueOnly ? 1 : 0)

  function toggleInSet(
    set: Set<string>,
    value: string,
    setter: (next: Set<string>) => void
  ) {
    const next = new Set(set)
    if (next.has(value)) {
      next.delete(value)
    } else {
      next.add(value)
    }
    setter(next)
  }

  function clearFilters() {
    setFilterClients(new Set())
    setFilterTeam(new Set())
    setOverdueOnly(false)
  }

  // This app has no real backend fetch to key off of — the delay just
  // gives the skeleton a moment to be visible before the mock data reveals.
  useEffect(() => {
    const timeout = setTimeout(() => setIsLoading(false), 700)
    return () => clearTimeout(timeout)
  }, [])

  const byStatus =
    active === "all"
      ? projects
      : projects.filter((p) => p.status === active)

  const normalizedQuery = query.trim().toLowerCase()
  const searched = normalizedQuery
    ? byStatus.filter(
        (p) =>
          p.name.toLowerCase().includes(normalizedQuery) ||
          p.client.toLowerCase().includes(normalizedQuery)
      )
    : byStatus

  const filtered = searched.filter((p) => {
    if (filterClients.size && !filterClients.has(p.client)) return false
    if (filterTeam.size && !p.team.some((m) => filterTeam.has(m.name)))
      return false
    if (overdueOnly && !(p.overdue || p.daysToDeadline < 0)) return false
    return true
  })

  const countFor = (v: TabValue) =>
    v === "all"
      ? projects.length
      : projects.filter((p) => p.status === v).length

  const sorted = sortField
    ? [...filtered].sort((a, b) => {
        const dir = sortDirection === "asc" ? 1 : -1
        switch (sortField) {
          case "name":
            return a.name.localeCompare(b.name) * dir
          case "client":
            return a.client.localeCompare(b.client) * dir
          case "due":
            return (dueSortKey(a.due) - dueSortKey(b.due)) * dir
          case "tasks":
            return (taskPct(a) - taskPct(b)) * dir
        }
      })
    : filtered

  const handleSortSelect = (field: SortField) => {
    if (sortField === field) {
      setSortDirection((d) => (d === "asc" ? "desc" : "asc"))
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>All projects</CardTitle>
        <CardDescription>
          {projects.length} project{projects.length === 1 ? "" : "s"} across
          your clients
        </CardDescription>
        <CardAction>
          <div className="flex items-center gap-2">
            <ToggleGroup
              type="single"
              variant="outline"
              value={view}
              onValueChange={(v) => v && setView(v as ViewMode)}
              aria-label="Toggle project view"
            >
              <ToggleGroupItem value="grid" aria-label="Grid view">
                <LayoutGrid />
              </ToggleGroupItem>
              <ToggleGroupItem value="table" aria-label="Table view">
                <List />
              </ToggleGroupItem>
            </ToggleGroup>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant={activeFilterCount ? "secondary" : "outline"}
                  size="sm"
                  aria-label="Filter projects"
                >
                  <SlidersHorizontal />
                  Filter
                  {activeFilterCount > 0 && (
                    <span className="ml-0.5 inline-flex size-4 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
                      {activeFilterCount}
                    </span>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Client</DropdownMenuLabel>
                {allClients.map((client) => (
                  <DropdownMenuCheckboxItem
                    key={client}
                    checked={filterClients.has(client)}
                    onSelect={(e) => e.preventDefault()}
                    onCheckedChange={() =>
                      toggleInSet(filterClients, client, setFilterClients)
                    }
                  >
                    {client}
                  </DropdownMenuCheckboxItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuLabel>Team</DropdownMenuLabel>
                {allTeamMembers.map((name) => (
                  <DropdownMenuCheckboxItem
                    key={name}
                    checked={filterTeam.has(name)}
                    onSelect={(e) => e.preventDefault()}
                    onCheckedChange={() =>
                      toggleInSet(filterTeam, name, setFilterTeam)
                    }
                  >
                    {name}
                  </DropdownMenuCheckboxItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem
                  checked={overdueOnly}
                  onSelect={(e) => e.preventDefault()}
                  onCheckedChange={(checked) => setOverdueOnly(checked === true)}
                >
                  Overdue only
                </DropdownMenuCheckboxItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  disabled={activeFilterCount === 0}
                  onSelect={(e) => {
                    e.preventDefault()
                    clearFilters()
                  }}
                >
                  Clear filters
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant={sortField ? "secondary" : "outline"}
                  size="icon"
                  aria-label="Sort projects"
                >
                  <ArrowUpDown />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Sort by</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {sortOptions.map((opt) => {
                  const isActive = sortField === opt.value
                  const DirectionIcon = sortDirection === "asc" ? ArrowUp : ArrowDown
                  return (
                    <DropdownMenuItem
                      key={opt.value}
                      onSelect={(e) => {
                        e.preventDefault()
                        handleSortSelect(opt.value)
                      }}
                    >
                      {opt.label}
                      {isActive && <DirectionIcon className="ml-auto" />}
                    </DropdownMenuItem>
                  )
                })}
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  disabled={!sortField}
                  onSelect={(e) => {
                    e.preventDefault()
                    setSortField(null)
                  }}
                >
                  Default order
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <div className="relative w-56">
              <Search className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search project or client..."
                className="h-9 pl-9"
                aria-label="Search projects by name or client"
              />
            </div>
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

        {/* Grid or table, depending on view */}
        {isLoading ? (
          <LoadingState />
        ) : filtered.length === 0 ? (
          <EmptyState
            status={active === "all" ? "matching" : active}
            query={normalizedQuery ? query : undefined}
            onClear={
              normalizedQuery || active !== "all" || activeFilterCount > 0
                ? () => {
                    setQuery("")
                    setActive("all")
                    clearFilters()
                  }
                : undefined
            }
          />
        ) : view === "grid" ? (
          <div className="grid gap-4 px-6 sm:grid-cols-2 lg:grid-cols-3">
            {sorted.map((p) => (
              <ProjectGridCard
                key={p.id}
                project={p}
                isLinked={p.id === LINKED_PROJECT_ID}
                onOpen={() => router.push(`/projects/${p.id}`)}
                onStatusChange={(status) => onStatusChange(p.id, status)}
              />
            ))}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-y border-border text-[11px] uppercase tracking-wider text-muted-foreground">
                  <th className="px-6 py-3 text-left font-medium">Project</th>
                  <th className="px-3 py-3 text-left font-medium">Client</th>
                  <th className="px-3 py-3 text-left font-medium">Status</th>
                  <th className="px-3 py-3 text-left font-medium">Team</th>
                  <th className="px-3 py-3 text-left font-medium">Due Date</th>
                  <th className="px-3 py-3 text-left font-medium">Tasks</th>
                  <th className="px-3 py-3 text-left font-medium">
                    Figma Link
                  </th>
                  <th className="px-3 py-3 text-left font-medium">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {sorted.map((p, i) => {
                  const health = computeHealth(p)
                  const isOverdue = p.overdue || p.daysToDeadline < 0
                  const isLinked = p.id === LINKED_PROJECT_ID
                  const pct =
                    p.tasksTotal === 0
                      ? 0
                      : Math.round((p.tasksDone / p.tasksTotal) * 100)
                  return (
                    <tr
                      key={p.id}
                      className={cn(
                        "group hover:bg-muted/40 transition-colors",
                        i < sorted.length - 1 && "border-b border-border",
                        isLinked && "cursor-pointer"
                      )}
                      {...(isLinked
                        ? {
                            role: "link",
                            tabIndex: 0,
                            "aria-label": `Open ${p.name}`,
                            onClick: () => router.push(`/projects/${p.id}`),
                            onKeyDown: (e: KeyboardEvent) => {
                              if (e.key === "Enter" || e.key === " ") {
                                e.preventDefault()
                                router.push(`/projects/${p.id}`)
                              }
                            },
                          }
                        : {})}
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
                          <StatusPicker
                            status={p.status}
                            onChange={(status) => onStatusChange(p.id, status)}
                          />
                        </div>
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
                        <div className="flex items-center gap-2">
                          <span
                            className={cn(
                              "text-sm font-medium tabular-nums",
                              isOverdue && "text-destructive"
                            )}
                          >
                            {p.due}
                          </span>
                          {isOverdue && (
                            <OverdueBadge daysToDeadline={p.daysToDeadline} />
                          )}
                        </div>
                      </td>
                      <td className="px-3 py-4">
                        <div
                          className="h-1.5 w-24 overflow-hidden rounded-full bg-muted"
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
                      </td>
                      <td className="px-3 py-4">
                        <a
                          href={p.figmaLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Open ${p.name} in Figma`}
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
                        >
                          <Figma className="size-4" />
                        </a>
                      </td>
                      <td className="px-3 py-4">
                        <ProjectActionsMenu project={p} />
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
