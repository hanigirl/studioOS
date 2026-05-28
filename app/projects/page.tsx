"use client"

import { useMemo, useState } from "react"
import { SlidersHorizontal } from "lucide-react"
import { TooltipProvider } from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { AllProjectsTable } from "@/components/projects/all-projects-table"
import { OverviewStats } from "@/components/projects/overview-stats"
import { NewProjectDialog } from "@/components/projects/new-project-dialog"
import { danielProjects, overflowExtras } from "@/components/projects/data"
import { cn } from "@/lib/utils"
import type { PulseProject } from "@/components/projects/types"

interface FilterState {
  clients: string[]
  members: string[]
  overdueOnly: boolean
}

const EMPTY_FILTERS: FilterState = { clients: [], members: [], overdueOnly: false }

export default function ProjectsPage() {
  const [projects, setProjects] = useState<PulseProject[]>([
    ...danielProjects,
    ...overflowExtras,
  ])
  const [filters, setFilters] = useState<FilterState>(EMPTY_FILTERS)

  const uniqueClients = useMemo(
    () => Array.from(new Set(projects.map((p) => p.client))).sort(),
    [projects]
  )

  const uniqueMembers = useMemo(
    () =>
      Array.from(new Set(projects.flatMap((p) => p.team.map((m) => m.name)))).sort(),
    [projects]
  )

  const activeFilterCount =
    filters.clients.length + filters.members.length + (filters.overdueOnly ? 1 : 0)
  const hasActiveFilters = activeFilterCount > 0

  const filteredProjects = useMemo(
    () =>
      projects.filter((p) => {
        if (filters.clients.length > 0 && !filters.clients.includes(p.client))
          return false
        if (
          filters.members.length > 0 &&
          !p.team.some((m) => filters.members.includes(m.name))
        )
          return false
        if (filters.overdueOnly && !p.overdue && p.daysToDeadline >= 0) return false
        return true
      }),
    [projects, filters]
  )

  function toggleClient(client: string) {
    setFilters((f) => ({
      ...f,
      clients: f.clients.includes(client)
        ? f.clients.filter((c) => c !== client)
        : [...f.clients, client],
    }))
  }

  function toggleMember(member: string) {
    setFilters((f) => ({
      ...f,
      members: f.members.includes(member)
        ? f.members.filter((m) => m !== member)
        : [...f.members, member],
    }))
  }

  function clearFilters() {
    setFilters(EMPTY_FILTERS)
  }

  return (
    <TooltipProvider delayDuration={200}>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
            <p className="text-sm text-muted-foreground">
              All active projects across your clients
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className={cn("h-9", hasActiveFilters && "border-primary/60 bg-primary/5")}
                >
                  <SlidersHorizontal />
                  Filter
                  {hasActiveFilters && (
                    <span className="ml-0.5 flex size-4 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
                      {activeFilterCount}
                    </span>
                  )}
                </Button>
              </PopoverTrigger>

              <PopoverContent align="end" className="w-72 p-0">
                <div className="p-4 space-y-4">

                  {/* Client filter */}
                  <div className="space-y-2">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                      Client
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {uniqueClients.map((client) => (
                        <button
                          key={client}
                          type="button"
                          onClick={() => toggleClient(client)}
                          className={cn(
                            "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium transition-colors",
                            filters.clients.includes(client)
                              ? "bg-primary text-primary-foreground"
                              : "border border-border text-foreground hover:bg-accent"
                          )}
                        >
                          {client}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Team member filter */}
                  <div className="space-y-2">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                      Team member
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {uniqueMembers.map((member) => (
                        <button
                          key={member}
                          type="button"
                          onClick={() => toggleMember(member)}
                          className={cn(
                            "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium transition-colors",
                            filters.members.includes(member)
                              ? "bg-primary text-primary-foreground"
                              : "border border-border text-foreground hover:bg-accent"
                          )}
                        >
                          {member}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Overdue toggle */}
                  <div className="flex items-center gap-2.5">
                    <button
                      type="button"
                      role="switch"
                      aria-checked={filters.overdueOnly}
                      onClick={() =>
                        setFilters((f) => ({ ...f, overdueOnly: !f.overdueOnly }))
                      }
                      className={cn(
                        "relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                        filters.overdueOnly ? "bg-primary" : "bg-input"
                      )}
                    >
                      <span
                        className={cn(
                          "pointer-events-none inline-block size-4 rounded-full bg-background shadow-sm ring-0 transition-transform",
                          filters.overdueOnly ? "translate-x-4" : "translate-x-0"
                        )}
                      />
                    </button>
                    <span
                      className="cursor-pointer select-none text-sm font-medium"
                      onClick={() =>
                        setFilters((f) => ({ ...f, overdueOnly: !f.overdueOnly }))
                      }
                    >
                      Overdue only
                    </span>
                  </div>

                  {/* Clear filters */}
                  {hasActiveFilters && (
                    <>
                      <Separator />
                      <button
                        type="button"
                        onClick={clearFilters}
                        className="text-xs text-muted-foreground underline underline-offset-2 transition-colors hover:text-foreground"
                      >
                        Clear all filters
                      </button>
                    </>
                  )}
                </div>
              </PopoverContent>
            </Popover>

            <NewProjectDialog onAdd={(p) => setProjects((prev) => [p, ...prev])} />
          </div>
        </div>

        <OverviewStats projects={filteredProjects} />

        <AllProjectsTable projects={filteredProjects} />
      </div>
    </TooltipProvider>
  )
}
