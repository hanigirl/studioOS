"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import {
  Archive,
  CalendarDays,
  Trash2,
  ChevronDown,
  ChevronUp,
  Copy,
  ExternalLink,
  LayoutGrid,
  Link,
  List,
  MoreHorizontal,
  Search,
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
import { Skeleton } from "@/components/ui/skeleton"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  AvatarGroup,
} from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { TaskProgressBar } from "@/components/ui/progress-bar"
import { FilterPill } from "@/components/ui/filter-pill"
import { statusStyles } from "./status-styles"
import type { ProjectStatus, PulseProject } from "./types"

const tabs = [
  { label: "All",       value: "all"       as const },
  { label: "Discovery", value: "Discovery" as const },
  { label: "Design",    value: "Design"    as const },
  { label: "Review",    value: "Review"    as const },
  { label: "Handoff",   value: "Handoff"   as const },
]

type TabValue = (typeof tabs)[number]["value"]
type ViewMode = "grid" | "table"
type SortCol  = "name" | "client" | "status" | "due" | "tasks" | "figma"
type SortDir  = "asc" | "desc"

const STATUS_ORDER: Record<ProjectStatus, number> = {
  Discovery: 0, Design: 1, Review: 2, Handoff: 3, Done: 4,
}

// ── shared sub-components ────────────────────────────────────────────────────


function ProjectMenu({ figmaUrl, projectId }: { figmaUrl?: string; projectId: string }) {
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
        <DropdownMenuItem
          disabled={!figmaUrl}
          onClick={() => figmaUrl && window.open(figmaUrl, "_blank", "noopener,noreferrer")}
        >
          <ExternalLink className="size-4" />Open in Figma
        </DropdownMenuItem>
        <DropdownMenuItem><Copy className="size-4" />Duplicate</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem><Archive className="size-4" />Archive</DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => navigator.clipboard.writeText(`${window.location.origin}/projects/${projectId}`)}
        >
          <Link className="size-4" />Copy link
        </DropdownMenuItem>
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
        <span className={cn("inline-flex rounded-full px-2.5 py-1 text-xs font-medium", statusStyles[project.status])}>
          {project.status}
        </span>
        <ProjectMenu figmaUrl={project.figmaUrl} projectId={project.id} />
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
        <TaskProgressBar done={project.tasksDone} total={project.tasksTotal} />
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

function SortIcon({ isActive, dir }: { isActive: boolean; dir: SortDir }) {
  return (
    <span className="relative inline-flex h-3.5 w-2.5 shrink-0 flex-col items-center" aria-hidden>
      <ChevronUp className={cn("absolute top-0 h-2.5 w-2.5 transition-opacity", isActive && dir === "asc" ? "opacity-100" : "opacity-60")} />
      <ChevronDown className={cn("absolute bottom-0 h-2.5 w-2.5 transition-opacity", isActive && dir === "desc" ? "opacity-100" : "opacity-60")} />
    </span>
  )
}

function PlainHeader({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center text-xs font-medium text-foreground">
      {label}
    </span>
  )
}

function SortHeader({
  label, col, active, dir, onSort,
}: {
  label: string; col: SortCol; active: SortCol | null; dir: SortDir; onSort: (c: SortCol) => void
}) {
  const isActive = active === col
  return (
    <button
      type="button"
      onClick={() => onSort(col)}
      className={cn(
        "inline-flex items-center gap-1 text-xs font-medium transition-colors",
        isActive ? "text-foreground" : "text-foreground hover:text-foreground/70"
      )}
    >
      {label}
      <SortIcon isActive={isActive} dir={dir} />
    </button>
  )
}

function ProjectTableRow({ project, isLast }: { project: PulseProject; isLast: boolean }) {
  const router = useRouter()
  const [status, setStatus] = useState<ProjectStatus>(project.status)
  const isOverdue = project.overdue || project.daysToDeadline < 0
  return (
    <tr
      className={cn("group cursor-pointer hover:bg-muted/40 transition-colors", !isLast && "border-b border-border")}
      onClick={() => router.push(`/projects/${project.id}`)}
    >
      <td className="px-6 py-3 w-[200px]">
        <div className="flex flex-col gap-0.5">
          <span className="font-semibold leading-tight">{project.name}</span>
          <span className="text-xs text-muted-foreground">{project.subtitle}</span>
        </div>
      </td>
      <td className="px-3 py-3">
        <div className="flex items-center gap-2">
          <Avatar size="sm">
            <AvatarImage src={project.clientLogo} alt={project.client} />
            <AvatarFallback>{project.client[0]}</AvatarFallback>
          </Avatar>
          <span className="font-medium">{project.client}</span>
        </div>
      </td>
      <td className="px-3 py-3" onClick={(e) => e.stopPropagation()}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <span className={cn("inline-flex cursor-pointer rounded-full px-2.5 py-1 text-xs font-medium outline-none", statusStyles[status])}>
              {status}
            </span>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            {(["Discovery", "Design", "Review", "Handoff"] as ProjectStatus[]).map((s) => (
              <DropdownMenuItem key={s} onSelect={() => setStatus(s)}>
                <span className={cn("inline-flex rounded-full px-2 py-0.5 text-xs font-medium", statusStyles[s])}>{s}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </td>
      <td className="px-3 py-3">
        <AvatarGroup>
          {project.team.map((m) => (
            <Avatar key={m.name} size="sm">
              <AvatarFallback className={cn("text-white", m.color)}>{m.initials}</AvatarFallback>
            </Avatar>
          ))}
        </AvatarGroup>
      </td>
      <td className="px-3 py-3">
        <div className="flex items-center gap-1.5">
          <span className={cn("text-sm font-medium tabular-nums", isOverdue && "text-destructive")}>
            {project.due}
          </span>
          {isOverdue && (
            <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-1 text-xs font-medium text-red-700 dark:bg-red-900/30 dark:text-red-400">
              Overdue
            </span>
          )}
        </div>
      </td>
      <td className="px-3 py-3 min-w-[100px]">
        <TaskProgressBar done={project.tasksDone} total={project.tasksTotal} compact />
      </td>
      <td className="px-3 py-3" onClick={(e) => e.stopPropagation()}>
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
      <td className="px-3 py-3 w-10" onClick={(e) => e.stopPropagation()}>
        <ProjectMenu figmaUrl={project.figmaUrl} projectId={project.id} />
      </td>
    </tr>
  )
}

// ── skeleton placeholders ────────────────────────────────────────────────────

function ProjectCardSkeleton() {
  return (
    <div className="flex flex-col rounded-xl border bg-card shadow-sm p-5 gap-4">
      <div className="flex items-center justify-between">
        <Skeleton className="h-5 w-20 rounded-full" />
        <Skeleton className="size-8 rounded-md" />
      </div>
      <div className="flex flex-col gap-1.5">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
      </div>
      <div className="flex items-center gap-2">
        <Skeleton className="size-6 rounded-full" />
        <Skeleton className="h-4 w-24" />
      </div>
      <Skeleton className="h-px w-full" />
      <div className="flex items-center justify-between">
        <div className="flex -space-x-1">
          {[0, 1, 2].map((i) => (
            <Skeleton key={i} className="size-6 rounded-full ring-2 ring-background" />
          ))}
        </div>
        <Skeleton className="h-3 w-16" />
      </div>
      <div className="flex flex-col gap-1.5">
        <div className="flex justify-between">
          <Skeleton className="h-3 w-10" />
          <Skeleton className="h-3 w-8" />
        </div>
        <Skeleton className="h-1.5 w-full rounded-full" />
      </div>
    </div>
  )
}

function ProjectTableRowSkeleton({ isLast }: { isLast: boolean }) {
  return (
    <tr className={cn(!isLast && "border-b border-border")}>
      <td className="px-6 py-3 w-[200px]">
        <div className="flex flex-col gap-1.5">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3 w-20" />
        </div>
      </td>
      <td className="px-3 py-3">
        <div className="flex items-center gap-2">
          <Skeleton className="size-6 rounded-full" />
          <Skeleton className="h-4 w-24" />
        </div>
      </td>
      <td className="px-3 py-3">
        <Skeleton className="h-5 w-16 rounded-full" />
      </td>
      <td className="px-3 py-3">
        <div className="flex -space-x-1">
          {[0, 1, 2].map((i) => (
            <Skeleton key={i} className="size-6 rounded-full ring-2 ring-background" />
          ))}
        </div>
      </td>
      <td className="px-3 py-3">
        <Skeleton className="h-4 w-20" />
      </td>
      <td className="px-3 py-3 min-w-[140px]">
        <div className="flex flex-col gap-1.5">
          <div className="flex justify-between">
            <Skeleton className="h-3 w-10" />
            <Skeleton className="h-3 w-8" />
          </div>
          <Skeleton className="h-1.5 w-full rounded-full" />
        </div>
      </td>
      <td className="px-3 py-3">
        <Skeleton className="h-4 w-20" />
      </td>
      <td className="px-3 py-3 w-10" />
    </tr>
  )
}

// ── main component ───────────────────────────────────────────────────────────

export function AllProjectsTable({ projects }: { projects: PulseProject[] }) {
  const [isLoading, setIsLoading] = useState(true)
  const [active,   setActive]   = useState<TabValue>("all")
  const [search,   setSearch]   = useState("")
  const [view,     setView]     = useState<ViewMode>(() => {
    if (typeof window === "undefined") return "grid"
    try {
      const saved = localStorage.getItem("projects-view-mode")
      if (saved === "grid" || saved === "table") return saved as ViewMode
    } catch {}
    return "grid"
  })
  const [sortCol,  setSortCol]  = useState<SortCol | null>(null)
  const [sortDir,  setSortDir]  = useState<SortDir>("asc")

  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 1400)
    return () => clearTimeout(t)
  }, [])



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
    if (sortCol === "client") cmp = a.client.localeCompare(b.client)
    if (sortCol === "status") cmp = STATUS_ORDER[a.status] - STATUS_ORDER[b.status]
    if (sortCol === "due")    cmp = a.daysToDeadline - b.daysToDeadline
    if (sortCol === "tasks")  cmp = (a.tasksDone / (a.tasksTotal || 1)) - (b.tasksDone / (b.tasksTotal || 1))
    if (sortCol === "figma")  cmp = (a.figmaUrl ? 1 : 0) - (b.figmaUrl ? 1 : 0)
    return sortDir === "asc" ? cmp : -cmp
  })

  const countFor = (v: TabValue) =>
    v === "all" ? projects.length : projects.filter((p) => p.status === v).length

  const uniqueClientCount = new Set(projects.map((p) => p.client)).size

  const emptyState = (
    <div className="flex flex-col items-center gap-2 py-12">
      <Search className="size-7 text-muted-foreground/30" aria-hidden />
      <p className="text-sm font-medium text-muted-foreground">No projects found</p>
      <p className="text-xs text-muted-foreground/60">There are no projects matching this filter.</p>
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
          {projects.length} project{projects.length === 1 ? "" : "s"} across {uniqueClientCount} client{uniqueClientCount === 1 ? "" : "s"}
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
                <FilterPill
                  key={t.value}
                  active={isActive}
                  onClick={() => setActive(t.value)}
                >
                  <span>{t.label}</span>
                  <span className={cn("text-[11px]", isActive ? "text-primary-foreground/70" : "text-muted-foreground")}>
                    {countFor(t.value)}
                  </span>
                </FilterPill>
              )
            })}
          </div>

          {/* View toggle */}
          <div className="flex shrink-0 items-center rounded-lg border border-border bg-muted/40 p-0.5">
            <button
              type="button"
              aria-label="Grid view"
              onClick={() => { setView("grid"); try { localStorage.setItem("projects-view-mode", "grid") } catch {} }}
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
              onClick={() => { setView("table"); try { localStorage.setItem("projects-view-mode", "table") } catch {} }}
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
          isLoading ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => <ProjectCardSkeleton key={i} />)}
            </div>
          ) : sorted.length === 0 ? emptyState : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {sorted.map((p) => <ProjectCard key={p.id} project={p} />)}
            </div>
          )
        )}

        {/* Table view */}
        {view === "table" && (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="px-6 py-2 text-left w-[200px]">
                    <SortHeader label="Name" col="name" active={sortCol} dir={sortDir} onSort={handleSort} />
                  </th>
                  <th className="px-3 py-2 text-left">
                    <SortHeader label="Client" col="client" active={sortCol} dir={sortDir} onSort={handleSort} />
                  </th>
                  <th className="px-3 py-2 text-left">
                    <SortHeader label="Status" col="status" active={sortCol} dir={sortDir} onSort={handleSort} />
                  </th>
                  <th className="px-3 py-2 text-left">
                    <PlainHeader label="Team" />
                  </th>
                  <th className="px-3 py-2 text-left">
                    <SortHeader label="Due" col="due" active={sortCol} dir={sortDir} onSort={handleSort} />
                  </th>
                  <th className="px-3 py-2 text-left min-w-[140px]">
                    <PlainHeader label="Tasks" />
                  </th>
                  <th className="px-3 py-2 text-left">
                    <PlainHeader label="Figma Link" />
                  </th>
                  <th className="w-10" />
                </tr>
              </thead>
              <tbody>
                {isLoading
                  ? Array.from({ length: 5 }).map((_, i) => (
                      <ProjectTableRowSkeleton key={i} isLast={i === 4} />
                    ))
                  : sorted.length === 0
                    ? <tr><td colSpan={8}>{emptyState}</td></tr>
                    : sorted.map((p, i) => (
                        <ProjectTableRow key={p.id} project={p} isLast={i === sorted.length - 1} />
                      ))
                }
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
