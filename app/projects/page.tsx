"use client";

import { useState } from "react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AllProjectsTable } from "@/components/projects/all-projects-table";
import { NewProjectDialog } from "@/components/projects/new-project-dialog";
import { OverviewStats } from "@/components/projects/overview-stats";
import { danielProjects, overflowExtras } from "@/components/projects/data";
import type { PulseProject } from "@/components/projects/types";

const initialProjects: PulseProject[] = [...danielProjects, ...overflowExtras];

export default function ProjectsPage() {
  const [projects, setProjects] = useState<PulseProject[]>(initialProjects);

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
            <NewProjectDialog
              onCreate={(project) =>
                setProjects((prev) => [project, ...prev])
              }
            />
          </div>
        </div>

        <OverviewStats projects={projects} />

        <AllProjectsTable
          projects={projects}
          onStatusChange={(id, status) =>
            setProjects((prev) =>
              prev.map((p) => (p.id === id ? { ...p, status } : p))
            )
          }
        />
      </div>
    </TooltipProvider>
  );
}
