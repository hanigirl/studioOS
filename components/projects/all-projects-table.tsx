"use client"

import { useState } from "react"
import {
  Archive,
  ArrowDown,
  ArrowUp,
  ChevronsUpDown,
  Figma,
  FilterX,
  FolderOpen,
  LayoutGrid,
  MoreHorizontal,
  Pencil,
  Plus,
  Search,
  Table2,
  Trash2,
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
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { computeHealth } from "./data"
import { EmptyState } from "./empty-state"
import { ProjectPulseCard } from "./project-pulse-card"
import { HealthDot } from "./health-badge"
import { DeleteProjectModal } from "./delete-project-modal"
import { ArchiveProjectModal } from "./archive-project-modal"
import { EditProjectModal } from "./edit-project-modal"
import type { ProjectStatus, PulseProject } from "./types"

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

const tabs = [
  { label: "All", value: "all" as const },
  { label: "Discovery", value: "Discovery" as const },
  { label: "Design", value: "Design" as const },
  { label: "Review", value: "Review" as const },
  { label: "Handoff", value: "Handoff" as const },
]

type TabValue = (typeof tabs)[number]["value"]
type ViewMode = "table" | "cards"
type SortKey = "name" | "status" | "date"
type SortDir = "asc" | "desc"

// The studio's Figma file. Individual projects can override via `figmaUrl`.
const FIGMA_FILE =
  "https://www.figma.com/design/NZfLoBzElVM6Objo0CxIh4/Studio-OS--Community-"

// Status pipeline order for sorting (independent of the coloured pills above).
const statusOrder: Record<ProjectStatus, number> = {
  Discovery: 0,
  Design: 1,
  Review: 2,
  Handoff: 3,
  Done: 4,
}

// Turn a "MMM D" due string (e.g. "Apr 12") into a comparable number so the
// Due Date column sorts by the actual displayed date.
const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
]
function dueValue(due: string): number {
  const [mon, day] = due.split(" ")
  return MONTHS.indexOf(mon) * 100 + (parseInt(day, 10) || 0)
}

function SortHeader({
  label,
  active,
  dir = "asc",
  onClick,
  className,
}: {
  label: string
  active: boolean
  dir?: SortDir
  onClick: () => void
  className?: string
}) {
  const Icon = !active ? ChevronsUpDown : dir === "asc" ? ArrowUp : ArrowDown
  return (
    <th className={cn("py-3 font-medium", className)}>
      <button
        type="button"
        onClick={onClick}
        aria-label={`Sort by ${label}`}
        className={cn(
          "inline-flex items-center gap-1 uppercase tracking-wider transition-colors hover:text-foreground",
          active && "text-foreground"
        )}
      >
        {label}
        <Icon className={cn("size-3", !active && "opacity-40")} aria-hidden />
      </button>
    </th>
  )
}

/**
 * The management view of the Project entity inside `/projects`. Reads the
 * canonical `PulseProject[]` so this table and `<PulseSection>` above it can
 * never drift apart — same source of truth, two angles.
 *
 * Supports: status tabs, name/client search, column sorting, a table/card
 * view toggle, and per-row actions. Empty states cover both "no projects at
 * all" and "no results for the current filter/search".
 */
export function AllProjectsTable({
  projects: initialProjects,
}: {
  projects: PulseProject[]
}) {
  const [projects, setProjects] = useState(initialProjects)
  const [active, setActive] = useState<TabValue>("all")
  const [view, setView] = useState<ViewMode>("table")
  const [query, setQuery] = useState("")
  const [sort, setSort] = useState<{ key: SortKey; dir: SortDir } | null>(null)

  const [deleteModal, setDeleteModal] = useState<{
    open: boolean
    project: PulseProject | null
  }>({ open: false, project: null })

  const [archiveModal, setArchiveModal] = useState<{
    open: boolean
    project: PulseProject | null
  }>({ open: false, project: null })

  const [editModal, setEditModal] = useState<{
    open: boolean
    project: PulseProject | null
  }>({ open: false, project: null })

  function handleEdit(project: PulseProject) {
    setEditModal({ open: true, project })
  }

  function handleArchive(project: PulseProject) {
    setArchiveModal({ open: true, project })
  }

  function handleDelete(project: PulseProject) {
    setDeleteModal({ open: true, project })
  }

  function handleDeleteConfirm(projectId: string) {
    setProjects((prev) => prev.filter((p) => p.id !== projectId))
  }

  function handleArchiveConfirm(projectId: string) {
    setProjects((prev) =>
      prev.map((p) => (p.id === projectId ? { ...p, isArchived: true } : p))
    )
  }

  function handleEditConfirm(
    projectId: string,
    updates: Partial<PulseProject>
  ) {
    setProjects((prev) =>
      prev.map((p) => (p.id === projectId ? { ...p, ...updates } : p))
    )
  }

  const q = query.trim().toLowerCase()
  const matchesQuery = (p: PulseProject) =>
    q === "" ||
    p.name.toLowerCase().includes(q) ||
    p.client.toLowerCase().includes(q)

  const filtered = projects.filter(
    (p) =>
      !p.isArchived &&
      (active === "all" || p.status === active) &&
      matchesQuery(p)
  )

  const comparators: Record<
    SortKey,
    (a: PulseProject, b: PulseProject) => number
  > = {
    name: (a, b) => a.name.localeCompare(b.name),
    status: (a, b) => statusOrder[a.status] - statusOrder[b.status],
    date: (a, b) => dueValue(a.due) - dueValue(b.due),
  }

  const sorted = sort
    ? [...filtered].sort(
        (a, b) => comparators[sort.key](a, b) * (sort.dir === "asc" ? 1 : -1)
      )
    : filtered

  function toggleSort(key: SortKey) {
    setSort((prev) =>
      prev && prev.key === key
        ? { key, dir: prev.dir === "asc" ? "desc" : "asc" }
        : { key, dir: "asc" }
    )
  }

  // Tab counts reflect the current search so they match what the table shows.
  const countFor = (v: TabValue) =>
    projects.filter(
      (p) => (v === "all" || p.status === v) && matchesQuery(p)
    ).length

  // No projects at all — replace the whole body with a call-to-action.
  if (projects.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>All projects</CardTitle>
          <CardDescription>No projects yet</CardDescription>
        </CardHeader>
        <CardContent className="px-0">
          <EmptyState
            icon={FolderOpen}
            title="No projects yet"
            description="Create your first project to start tracking work across your clients."
            action={
              <Button size="sm">
                <Plus />
                New Project
              </Button>
            }
          />
        </CardContent>
      </Card>
    )
  }

  const viewOptions = [
    { value: "table", label: "Table view", icon: Table2 },
    { value: "cards", label: "Card view", icon: LayoutGrid },
  ] as const

  return (
    <Card>
      <CardHeader>
        <CardTitle>All projects</CardTitle>
        <CardDescription>
          {projects.length} project{projects.length === 1 ? "" : "s"} across
          your clients
        </CardDescription>
        <CardAction>
          <div
            role="group"
            aria-label="View mode"
            className="inline-flex rounded-lg border border-border p-0.5"
          >
            {viewOptions.map(({ value, label, icon: Icon }) => (
              <button
                key={value}
                type="button"
                onClick={() => setView(value)}
                aria-pressed={view === value}
                aria-label={label}
                className={cn(
                  "inline-flex size-7 items-center justify-center rounded-md transition-colors",
                  view === value
                    ? "bg-muted text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <Icon className="size-4" aria-hidden />
              </button>
            ))}
          </div>
        </CardAction>
      </CardHeader>
      <CardContent className="space-y-4 px-0">
        {/* Filter row: status tabs on the left, search on the right. */}
        <div className="flex flex-col gap-3 px-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2">
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

          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search project or client..."
              aria-label="Search projects by name or client"
              className="pl-9"
            />
          </div>
        </div>

        {sorted.length === 0 ? (
          <EmptyState
            icon={FilterX}
            title="No projects found"
            description="No projects match your current search or filter."
            action={
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setActive("all")
                  setQuery("")
                }}
              >
                Clear filters
              </Button>
            }
          />
        ) : view === "cards" ? (
          <div className="grid grid-cols-1 gap-4 px-6 sm:grid-cols-2 xl:grid-cols-3">
            {sorted.map((p) => (
              <ProjectPulseCard key={p.id} project={p} />
            ))}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-y border-border text-[11px] uppercase tracking-wider text-muted-foreground">
                  <SortHeader
                    label="Project"
                    active={sort?.key === "name"}
                    dir={sort?.dir}
                    onClick={() => toggleSort("name")}
                    className="px-6 text-left"
                  />
                  <th className="px-3 py-3 text-left font-medium">Client</th>
                  <SortHeader
                    label="Status"
                    active={sort?.key === "status"}
                    dir={sort?.dir}
                    onClick={() => toggleSort("status")}
                    className="px-3 text-left"
                  />
                  <th className="px-3 py-3 text-left font-medium">Team</th>
                  <SortHeader
                    label="Due Date"
                    active={sort?.key === "date"}
                    dir={sort?.dir}
                    onClick={() => toggleSort("date")}
                    className="px-3 text-left"
                  />
                  <th className="px-3 py-3 text-left font-medium">Tasks</th>
                  <th className="px-3 py-3 text-left font-medium">Figma</th>
                  <th className="px-3 py-3 text-right font-medium">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {sorted.map((p, i) => {
                  const health = computeHealth(p)
                  const isOverdue = p.overdue || p.daysToDeadline < 0
                  const pct =
                    p.tasksTotal === 0
                      ? 0
                      : Math.round((p.tasksDone / p.tasksTotal) * 100)
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
                      <td className="px-3 py-4">
                        <div className="flex items-center gap-2">
                          <div
                            className="h-1.5 w-24 overflow-hidden rounded-full bg-muted"
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
                      </td>
                      <td className="px-3 py-4">
                        <a
                          href={p.figmaUrl ?? FIGMA_FILE}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Open ${p.name} in Figma`}
                          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
                        >
                          <Figma className="size-4" aria-hidden />
                          <span>Open</span>
                        </a>
                      </td>
                      <td className="px-3 py-4 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon-sm"
                              aria-label={`Actions for ${p.name}`}
                            >
                              <MoreHorizontal />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleEdit(p)}>
                              <Pencil />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleArchive(p)}
                            >
                              <Archive />
                              Archive
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              variant="destructive"
                              onClick={() => handleDelete(p)}
                            >
                              <Trash2 />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>

      {/* Modals */}
      <DeleteProjectModal
        open={deleteModal.open}
        onOpenChange={(open) =>
          setDeleteModal((prev) => ({ ...prev, open }))
        }
        project={deleteModal.project}
        onConfirm={handleDeleteConfirm}
      />

      <ArchiveProjectModal
        open={archiveModal.open}
        onOpenChange={(open) =>
          setArchiveModal((prev) => ({ ...prev, open }))
        }
        project={archiveModal.project}
        onConfirm={handleArchiveConfirm}
      />

      <EditProjectModal
        open={editModal.open}
        onOpenChange={(open) =>
          setEditModal((prev) => ({ ...prev, open }))
        }
        project={editModal.project}
        onConfirm={handleEditConfirm}
      />
    </Card>
  )
}
