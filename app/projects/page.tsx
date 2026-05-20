import { Plus, SlidersHorizontal } from "lucide-react"
import { TooltipProvider } from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"
import { AllProjectsTable } from "@/components/projects/all-projects-table"
import { PulseSection } from "@/components/projects/pulse-section"
import { danielProjects, overflowExtras } from "@/components/projects/data"

// One surface owns the Project entity. Pulse section (triage) sits above the
// table (management). Same `PulseProject[]` source of truth feeds both so the
// two angles can never drift apart.
//
// Filter / New Project are placeholder buttons today — Dana will wire the
// actions in Phase 2. They stay in the layout because the slot is permanent
// and removing them would create a layout shift on Phase 2.
//
// See `.claude/agents/shared/lessons.md` —
// "IA: ישות אחת = surface אחד" (2026-05-05).

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
            <Button variant="outline" size="sm">
              <SlidersHorizontal />
              Filter
            </Button>
            <Button size="sm">
              <Plus />
              New Project
            </Button>
          </div>
        </div>

        <PulseSection projects={projects} />

        <AllProjectsTable projects={projects} />
      </div>
    </TooltipProvider>
  )
}
