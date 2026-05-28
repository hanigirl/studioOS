import { Plus, SlidersHorizontal } from "lucide-react"
import { TooltipProvider } from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"
import { AllProjectsTable } from "@/components/projects/all-projects-table"
import { OverviewStats } from "@/components/projects/overview-stats"
import { danielProjects, overflowExtras } from "@/components/projects/data"

export default function ProjectsPage() {
  const projects = [...danielProjects, ...overflowExtras]

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
            <Button variant="outline" size="sm" className="group">
              <SlidersHorizontal className="transition-transform duration-160 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110" />
              Filter
            </Button>
            <Button size="sm" className="group">
              <Plus className="transition-transform duration-160 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:rotate-90" />
              New Project
            </Button>
          </div>
        </div>

        <OverviewStats />

        <AllProjectsTable projects={projects} />
      </div>
    </TooltipProvider>
  )
}
