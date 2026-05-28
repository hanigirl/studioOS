"use client"

import { useState } from "react"
import { SlidersHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AllProjectsTable } from "./all-projects-table"
import { OverviewStats } from "./overview-stats"
import { NewProjectDialog } from "./new-project-dialog"
import type { PulseProject } from "./types"

export function ProjectsShell({ initialProjects }: { initialProjects: PulseProject[] }) {
  const [projects, setProjects] = useState(initialProjects)

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
          <p className="text-sm text-muted-foreground">
            All active projects across your clients
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-9">
            <SlidersHorizontal />
            Filter
          </Button>
          <NewProjectDialog onAdd={(p) => setProjects(prev => [p, ...prev])} />
        </div>
      </div>
      <OverviewStats projects={projects} />
      <AllProjectsTable projects={projects} />
    </div>
  )
}
