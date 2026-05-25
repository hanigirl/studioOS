"use client"

import { useState } from "react"
import {
  Archive,
  CalendarDays,
  ChevronDown,
  ChevronUp,
  ChevronsUpDown,
  ExternalLink,
  LayoutGrid,
  List,
  MoreHorizontal,
  Pencil,
  Search,
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  AvatarGroup,
} from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import type { ProjectStatus, PulseProject } from "./types"

// ── constants ────────────────────────────────────────────────────────────────

const statusStyles: Record<ProjectStatus, string> = {
  Discovery: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  Design:    "bg-blue-100   text-blue-700   dark:bg-blue-900/30   dark:text-blue-400",
  Review:    "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
  Handoff:   "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  Done:      "bg-muted text-muted-foreground",
}

const tabs = [
  { label: "All",       value: "all"       as const },
  { label: "Discovery", value: "Discovery" as const },
  { label: "Design",    value: "Design"    as const },
  { label: "Review",    value: "Review"    as const },
  { label: "Handoff",   value: "Handoff"   as const },
]

type TabValue = (typeof tabs)[number]["value"]
type ViewMode = "grid" | "table"
type SortCol  = "name" | "status" | "due"
type SortDir  = "asc" | "desc"

const STATUS_ORDER: Record<ProjectStatus, number> = {
  Discovery: 0, Design: 1, Review: 2, Handoff: 3, Done: 4,
}

// ── shared sub-components ────────────────────────────────────────────────────

function TaskProgress({ done, total }: { done: number; total: number }) {
  const pct = total === 0 ? 0 : Math.round((done / total) * 100)
  const complete = done === total
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs text-muted-foreground tabular-nums">{done} / {total}</span>
        <span className="text-xs font-medium tabular-nums">{pct}%</span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
        <div
          className={cn(
            "h-full rounded-full transition-all duration-300",
            complete ? "bg-emerald-500" : "bg-primary"
          )}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}

function ProjectMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          aria-label="More options"
          className="flex size-8 items-center justify-center rounded-md text-muted-foreground opacity-0 transition-opacity hover:bg-accent hover:text-foreground group-hover:opacity-100 data-[state=open]:opacity-100 data-[state=open]:bg-accent"
        >
          <MoreHorizontal className="size-4" aria-hidden />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem><Pencil className="size-4" />Edit</DropdownMenuItem>
        <DropdownMenuItem><Archive className="size-4" />Archive</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive"><Trash2 className="size-4" />Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

// ── grid card ────────────────────────────────────────────────────────────────

function ProjectCard({ project }: { project: PulseProject }) {
  const isOverdue = project.overdue || project.daysToDeadline < 0
  return (
    <div className="group relative flex flex-col rounded-xl border bg-card text-card-foreground shadow-sm transition-[transform,box-shadow] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:shadow-md">
      {/* Status badge + menu */}
      <div className="flex items-center justify-between px-5 pt-5">
        <span className={cn("inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium", statusStyles[project.status])}>
          {project.status}
        </span>
        <ProjectMenu />
      </div>

      {/* Name + subtitle */}
      <div className="flex flex-col gap-0.5 px-5 pt-3">
        <h3 className="font-semibold leading-tight">{project.name}</h3>
        <p className="text-xs text-muted-foreground">{project.subtitle}</p>
      </div>

      {/* Client */}
      <div className="flex items-center gap-2 px-5 pt-4">
        <Avatar size="sm">
          <AvatarImage src={project.clientLogo} alt={project.client} />
          <AvatarFallback>{project.client[0]}</AvatarFallback>
        </Avatar>
        <span className="text-sm font-medium">{project.client}</span>
      </div>

      <div className="mx-5 mt-4 border-t border-border" />

      {/* Team + due */}
      <div className="flex items-center justify-between px-5 pt-3">
        <AvatarGroup>
          {project.team.map((m) => (
            <Avatar key={m.name} size="sm">
              <AvatarFallback className={cn("text-white", m.color)}>{m.initials}</AvatarFallback>
            </Avatar>
          ))}
        </AvatarGroup>
        <div className="flex items-center gap-1.5">
          <CalendarDays className="size-3.5 text-muted-foreground" aria-hidden />
          <span className={cn("text-xs font-medium tabular-nums", isOverdue ? "text-destructive" : "text-muted-foreground")}>
            {project.due}
          </span>
        </div>
      </div>

      {/* Progress + Figma link */}
      <div className="px-5 pt-3 pb-4">
        <TaskProgress done={project.tasksDone} total={project.tasksTotal} />
      </div>
      {project.figmaUrl && (
        <div className="border-t border-border px-5 py-3">
          <a
            href={project.figmaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ExternalLink className="size-3.5" aria-hidden />
            Open Figma
          </a>
        </div>
      )}
    </div>
  )
}

// ── table row ────────────────────────────────────────────────────────────────

function SortHeader({
  label, col, active, dir, onSort,
}: {
  label: string; col: SortCol; active: SortCol | null; dir: SortDir; onSort: (c: SortCol) => void
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

function ProjectTableRow({ project, isLast }: { project: PulseProject; isLast: boolean }) {
  const isOverdue = project.overdue || project.daysToDeadline < 0
  return (
    <tr className={cn("group hover:bg-muted/40 transition-colors", !isLast && "border-b border-border")}>
      <td className="px-6 py-4 w-[200px]">
        <div className="flex flex-col gap-0.5">
          <span className="font-semibold leading-tight">{project.name}</span>
          <span className="text-xs text-muted-foreground">{project.subtitle}</span>
        </div>
      </td>
      <td className="px-3 py-4">
        <div className="flex items-center gap-2">
          <Avatar size="sm">
            <AvatarImage src={project.clientLogo} alt={project.client} />
            <AvatarFallback>{project.client[0]}</AvatarFallback>
          </Avatar>
          <span className="font-medium">{project.client}</span>
        </div>
      </td>
      <td className="px-3 py-4">
        <span className={cn("inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium", statusStyles[project.status])}>
          {project.status}
        </span>
      </td>
      <td className="px-3 py-4">
        <AvatarGroup>
          {project.team.map((m) => (
            <Avatar key={m.name} size="sm">
              <AvatarFallback className={cn("text-white", m.color)}>{m.initials}</AvatarFallback>
            </Avatar>
          ))}
        </AvatarGroup>
      </td>
      <td className="px-3 py-4">
        <span className={cn("text-sm font-medium tabular-nums", isOverdue && "text-destructive")}>
          {project.due}
        </span>
      </td>
      <td className="px-3 py-4 min-w-[140px]">
        <TaskProgress done={project.tasksDone} total={project.tasksTotal} />
      </td>
      <td className="px-3 py-4">
        {project.figmaUrl ? (
          <a
            href={project.figmaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ExternalLink className="size-3.5" aria-hidden />
            Open Figma
          </a>
        ) : (
          <span className="text-xs text-muted-foreground/40">—</span>
        )}
      </td>
      <td className="px-3 py-4 w-10">
        <ProjectMenu />
      </td>
    </tr>
  )
}

// ── main component ───────────────────────────────────────────────────────────

export function AllProjectsTable({ projects }: { projects: PulseProject[] }) {
  const [active,   setActive]   = useState<TabValue>("all")
  const [search,   setSearch]   = useState("")
  const [view,     setView]     = useState<ViewMode>("grid")
  const [sortCol,  setSortCol]  = useState<SortCol | null>(null)
  const [sortDir,  setSortDir]  = useState<SortDir>("asc")

  function handleSort(col: SortCol) {
    if (sortCol === col) setSortDir((d) => (d === "asc" ? "desc" : "asc"))
    else { setSortCol(col); setSortDir("asc") }
  }

  const filtered = projects.filter((p) => {
    const q = search.toLowerCase()
    const matchesSearch = q === "" || p.name.toLowerCase().includes(q) || p.client.toLowerCase().includes(q)
    const matchesTab = active === "all" || p.status === active
    return matchesSearch && matchesTab
  })

  const sorted = [...filtered].sort((a, b) => {
    if (!sortCol) return 0
    let cmp = 0
    if (sortCol === "name")   cmp = a.name.localeCompare(b.name)
    if (sortCol === "status") cmp = STATUS_ORDER[a.status] - STATUS_ORDER[b.status]
    if (sortCol === "due")    cmp = a.daysToDeadline - b.daysToDeadline
    return sortDir === "asc" ? cmp : -cmp
  })

  const countFor = (v: TabValue) =>
    v === "all" ? projects.length : projects.filter((p) => p.status === v).length

  const emptyState = (
    <div className="flex flex-col items-center gap-2 py-12">
      <Search className="size-7 text-muted-foreground/30" aria-hidden />
      <p className="text-sm font-medium text-muted-foreground">No projects found</p>
      <p className="text-xs text-muted-foreground/60">Try adjusting your search or filters.</p>
      {(search || active !== "all") && (
        <button
          type="button"
          onClick={() => { setSearch(""); setActive("all") }}
          className="mt-0.5 text-xs text-muted-foreground underline underline-offset-2 hover:text-foreground transition-colors"
        >
          Clear filters
        </button>
      )}
    </div>
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle>Active Projects</CardTitle>
        <CardDescription>
          {projects.length} project{projects.length === 1 ? "" : "s"} in progress across{" "}
          {projects.length} client{projects.length === 1 ? "" : "s"}
        </CardDescription>
        <CardAction>
          <div className="relative">
            <Search className="pointer-events-none absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" aria-hidden />
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

      <CardContent className="space-y-5 px-6 pb-6">
        {/* Filter tabs + view toggle */}
        <div className="flex items-center justify-between gap-3">
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
                  <span className={cn("text-[11px]", isActive ? "text-primary-foreground/70" : "text-muted-foreground")}>
                    {countFor(t.value)}
                  </span>
                </button>
              )
            })}
          </div>

          {/* View toggle */}
          <div className="flex shrink-0 items-center rounded-lg border border-border bg-muted/40 p-0.5">
            <button
              type="button"
              aria-label="Grid view"
              onClick={() => setView("grid")}
              className={cn(
                "flex size-7 items-center justify-center rounded-md transition-colors",
                view === "grid"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <LayoutGrid className="size-3.5" aria-hidden />
            </button>
            <button
              type="button"
              aria-label="Table view"
              onClick={() => setView("table")}
              className={cn(
                "flex size-7 items-center justify-center rounded-md transition-colors",
                view === "table"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <List className="size-3.5" aria-hidden />
            </button>
          </div>
        </div>

        {/* Grid view */}
        {view === "grid" && (
          sorted.length === 0 ? emptyState : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {sorted.map((p) => <ProjectCard key={p.id} project={p} />)}
            </div>
          )
        )}

        {/* Table view */}
        {view === "table" && (
          sorted.length === 0 ? emptyState : (
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
                    <th className="px-3 py-2 text-left text-xs font-medium text-muted-foreground min-w-[140px]">Tasks</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-muted-foreground">Figma Link</th>
                    <th className="w-10" />
                  </tr>
                </thead>
                <tbody>
                  {sorted.map((p, i) => (
                    <ProjectTableRow key={p.id} project={p} isLast={i === sorted.length - 1} />
                  ))}
                </tbody>
              </table>
            </div>
          )
        )}
      </CardContent>
    </Card>
  )
}
