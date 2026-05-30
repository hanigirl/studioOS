"use client"

import { useMemo, useState } from "react"
import { Plus, Search, SlidersHorizontal } from "lucide-react"
import { TooltipProvider } from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { TasksTable, type SortKey, type SortDir } from "@/components/tasks/tasks-table"
import { NewTaskDialog } from "@/components/tasks/new-task-dialog"
import { TaskDetailSheet } from "@/components/tasks/task-detail-sheet"
import { mockTasks } from "@/components/tasks/data"
import { cn } from "@/lib/utils"
import { FilterPill } from "@/components/ui/filter-pill"
import type { Task, TaskStatus, TaskPriority } from "@/components/tasks/types"

// ── types ────────────────────────────────────────────────────────────────────

interface FilterState {
  priorities: TaskPriority[]
  projects:   string[]
  assignees:  string[]
}

const EMPTY_FILTERS: FilterState = { priorities: [], projects: [], assignees: [] }

type ViewTab = "mine" | "all"
type StatusFilter = "all" | TaskStatus

const VIEW_TABS: { label: string; value: ViewTab }[] = [
  { label: "My Tasks",  value: "mine" },
  { label: "All Tasks", value: "all"  },
]

const STATUS_OPTIONS: { label: string; value: StatusFilter }[] = [
  { label: "All statuses", value: "all"         },
  { label: "To Do",        value: "To Do"        },
  { label: "In Progress",  value: "In Progress"  },
  { label: "In Review",    value: "In Review"    },
  { label: "Completed",    value: "Completed"    },
]

const MY_TASKS_ASSIGNEE = "Daniel"

const PRIORITIES: TaskPriority[] = ["Low", "Medium", "High", "Urgent"]

// ── page ─────────────────────────────────────────────────────────────────────

export default function TasksPage() {
  const [tasks,        setTasks]        = useState<Task[]>(mockTasks)
  const [activeTab,    setActiveTab]    = useState<ViewTab>("mine")
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all")
  const [search,      setSearch]      = useState("")
  const [sortKey,     setSortKey]     = useState<SortKey>("dueDate")
  const [sortDir,     setSortDir]     = useState<SortDir>("asc")
  const [filters,     setFilters]     = useState<FilterState>(EMPTY_FILTERS)
  const [newTaskOpen, setNewTaskOpen] = useState(false)
  const [detailTask,  setDetailTask]  = useState<Task | null>(null)
  const [detailOpen,  setDetailOpen]  = useState(false)

  // ── derived ──────────────────────────────────────────────────────────────

  const uniqueProjects = useMemo(
    () => Array.from(new Set(tasks.map((t) => t.project))).sort(),
    [tasks]
  )

  const uniqueProjectCount = useMemo(
    () => new Set(tasks.map((t) => t.project)).size,
    [tasks]
  )

  const uniqueAssignees = useMemo(
    () =>
      Array.from(
        new Set(tasks.flatMap((t) => (t.assignee ? [t.assignee.name] : [])))
      ).sort(),
    [tasks]
  )

  const showAssignee = activeTab !== "mine"

  const activeFilterCount =
    filters.priorities.length + filters.projects.length + filters.assignees.length

  const hasActiveFilters = activeFilterCount > 0 || search.trim() !== "" || statusFilter !== "all"

  const visibleTasks = useMemo(() => {
    const q = search.toLowerCase().trim()
    return tasks.filter((t) => {
      if (activeTab === "mine" && t.assignee?.name !== MY_TASKS_ASSIGNEE) return false
      if (statusFilter !== "all" && t.status !== statusFilter) return false
      if (q && !t.title.toLowerCase().includes(q)) return false
      if (filters.priorities.length > 0 && !filters.priorities.includes(t.priority)) return false
      if (filters.projects.length > 0  && !filters.projects.includes(t.project))    return false
      if (filters.assignees.length > 0) {
        if (!t.assignee || !filters.assignees.includes(t.assignee.name)) return false
      }
      return true
    })
  }, [tasks, activeTab, statusFilter, search, filters])

  // ── handlers ─────────────────────────────────────────────────────────────

  function handleStatusChange(id: string, status: TaskStatus) {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, status } : t)))
  }

  function handleDelete(id: string) {
    setTasks((prev) => prev.filter((t) => t.id !== id))
    if (detailTask?.id === id) setDetailOpen(false)
  }

  function handleAdd(task: Task) {
    setTasks((prev) => [task, ...prev])
  }

  function handleOpen(task: Task) {
    setDetailTask(task)
    setDetailOpen(true)
  }

  function handleSave(updated: Task) {
    setTasks((prev) => prev.map((t) => (t.id === updated.id ? updated : t)))
    setDetailTask(updated)
  }

  function clearFilters() {
    setFilters(EMPTY_FILTERS)
    setSearch("")
    setStatusFilter("all")
  }

  function toggle<T extends string>(arr: T[], val: T): T[] {
    return arr.includes(val) ? arr.filter((x) => x !== val) : [...arr, val]
  }

  function handleSortSelect(value: string) {
    const dash = value.lastIndexOf("-")
    setSortKey(value.slice(0, dash) as SortKey)
    setSortDir(value.slice(dash + 1) as SortDir)
  }

  const sortSelectValue = `${sortKey}-${sortDir}`

  // ── render ────────────────────────────────────────────────────────────────

  return (
    <TooltipProvider delayDuration={200}>
      <div className="space-y-5">

        {/* Page header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight">Tasks</h1>
            <p className="text-sm text-muted-foreground">
              Your tasks across active projects
            </p>
          </div>

          <div className="flex items-center gap-2">
            {/* Filter popover */}
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(activeFilterCount > 0 && "border-primary/60 bg-primary/5")}
                >
                  <SlidersHorizontal />
                  Filter
                  {activeFilterCount > 0 && (
                    <span className="ml-0.5 flex size-4 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
                      {activeFilterCount}
                    </span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent align="end" className="w-72 p-0">
                <div className="p-4 space-y-4">

                  {/* Priority */}
                  <div className="space-y-2">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                      Priority
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {PRIORITIES.map((p) => (
                        <FilterPill
                          key={p}
                          size="sm"
                          active={filters.priorities.includes(p)}
                          onClick={() =>
                            setFilters((f) => ({ ...f, priorities: toggle(f.priorities, p) }))
                          }
                        >
                          {p}
                        </FilterPill>
                      ))}
                    </div>
                  </div>

                  {/* Project */}
                  <div className="space-y-2">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                      Project
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {uniqueProjects.map((proj) => (
                        <FilterPill
                          key={proj}
                          size="sm"
                          active={filters.projects.includes(proj)}
                          onClick={() =>
                            setFilters((f) => ({ ...f, projects: toggle(f.projects, proj) }))
                          }
                        >
                          {proj}
                        </FilterPill>
                      ))}
                    </div>
                  </div>

                  {/* Assignee */}
                  <div className="space-y-2">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                      Assignee
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {uniqueAssignees.map((name) => (
                        <FilterPill
                          key={name}
                          size="sm"
                          active={filters.assignees.includes(name)}
                          onClick={() =>
                            setFilters((f) => ({ ...f, assignees: toggle(f.assignees, name) }))
                          }
                        >
                          {name}
                        </FilterPill>
                      ))}
                    </div>
                  </div>

                  {activeFilterCount > 0 && (
                    <>
                      <Separator />
                      <button
                        type="button"
                        onClick={() => setFilters(EMPTY_FILTERS)}
                        className="text-xs text-muted-foreground underline underline-offset-2 transition-colors hover:text-foreground"
                      >
                        Clear all filters
                      </button>
                    </>
                  )}
                </div>
              </PopoverContent>
            </Popover>

            {/* New task */}
            <Button onClick={() => setNewTaskOpen(true)}>
              <Plus />
              New Task
            </Button>
          </div>
        </div>

        {/* Card: title + controls + table — mirrors AllProjectsTable structure */}
        <Card>
          <CardHeader>
            <CardTitle>Tasks</CardTitle>
            <CardDescription>
              {tasks.length} task{tasks.length !== 1 ? "s" : ""} across {uniqueProjectCount} project{uniqueProjectCount !== 1 ? "s" : ""}
            </CardDescription>
            <CardAction>
              <div className="relative">
                <Search
                  className="pointer-events-none absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground"
                  aria-hidden
                />
                <Input
                  type="search"
                  placeholder="Search tasks..."
                  className="h-8 w-52 pl-8 text-sm"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </CardAction>
          </CardHeader>

          <CardContent className="space-y-4 px-6 pb-6">
            {/* View tabs + Status + Sort */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex gap-1.5">
                {VIEW_TABS.map((tab) => (
                  <FilterPill
                    key={tab.value}
                    active={activeTab === tab.value}
                    onClick={() => setActiveTab(tab.value)}
                  >
                    {tab.label}
                  </FilterPill>
                ))}
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <Select
                  value={statusFilter}
                  onValueChange={(v) => setStatusFilter(v as StatusFilter)}
                >
                  <SelectTrigger className="h-8 w-auto gap-1.5 text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent align="end">
                    {STATUS_OPTIONS.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={sortSelectValue} onValueChange={handleSortSelect}>
                  <SelectTrigger className="h-8 w-auto gap-1.5 text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent align="end">
                    <SelectItem value="dueDate-asc">Due date (earliest)</SelectItem>
                    <SelectItem value="dueDate-desc">Due date (latest)</SelectItem>
                    <SelectItem value="priority-desc">Priority (high first)</SelectItem>
                    <SelectItem value="priority-asc">Priority (low first)</SelectItem>
                    <SelectItem value="createdAt-desc">Recently created</SelectItem>
                    <SelectItem value="project-asc">Project (A–Z)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <TasksTable
              tasks={visibleTasks}
              sortKey={sortKey}
              sortDir={sortDir}
              hasActiveFilters={hasActiveFilters}
              showAssignee={showAssignee}
              onStatusChange={handleStatusChange}
              onDelete={handleDelete}
              onOpen={handleOpen}
              onClearFilters={clearFilters}
              onNewTask={() => setNewTaskOpen(true)}
            />
          </CardContent>
        </Card>
      </div>

      <NewTaskDialog
        open={newTaskOpen}
        onOpenChange={setNewTaskOpen}
        onAdd={handleAdd}
      />

      <TaskDetailSheet
        task={detailTask}
        open={detailOpen}
        onOpenChange={setDetailOpen}
        onSave={handleSave}
      />
    </TooltipProvider>
  )
}
