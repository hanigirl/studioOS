"use client"

import Link from "next/link"
import { CheckCircle2 } from "lucide-react"
import { Card } from "@/components/ui/card"
import { computeHealth, sortByHealth } from "./data"
import { HealthDot } from "./health-badge"
import { ProjectPulseCard } from "./project-pulse-card"
import type { PulseProject } from "./types"

/**
 * Pulse section embedded inside `/projects`. The same surface owns both the
 * triage angle (this section) and the management angle (the table below) so
 * Daniel learns one mental model for the Project entity instead of three.
 *
 * Two visual states, both driven by the existing `health` signal — no new
 * state is introduced:
 *
 * - **Stress** (`atRiskCount > 0`) — three full Pulse cards sorted Critical →
 *   At Risk → Healthy, plus a compact "Other projects" strip for the rest.
 *   This is what shipped at `/dashboard-projects` before the IA collapse.
 *
 * - **Healthy** (`atRiskCount === 0`) — a one-line banner with the current
 *   project count and the most recent upcoming due date. Rare-by-design: when
 *   nothing needs attention, the section gets out of the way and the table
 *   below becomes the focus. Layout stays stable so the heading hierarchy
 *   ("Projects" → table) doesn't jump between renders.
 *
 * Rationale lives in `.claude/agents/shared/lessons.md` —
 * "IA: ישות אחת = surface אחד" (2026-05-05) and
 * "Conditional UI elements לפי signal level" (2026-05-05).
 */
export function PulseSection({ projects }: { projects: PulseProject[] }) {
  const atRisk = projects.filter((p) => computeHealth(p) !== "Healthy")

  if (atRisk.length === 0) {
    return <HealthyBanner projects={projects} />
  }

  const sorted = sortByHealth(projects)
  const top = sorted.slice(0, 3)
  const rest = sorted.slice(3)

  return (
    <section aria-labelledby="pulse-section-heading" className="space-y-4">
      <div className="flex items-baseline justify-between gap-3">
        <h2
          id="pulse-section-heading"
          className="text-lg font-semibold tracking-tight"
        >
          Project Pulse{" "}
          <span className="text-muted-foreground font-normal">
            · {atRisk.length} need{atRisk.length === 1 ? "s" : ""} attention
          </span>
        </h2>
      </div>

      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        {top.map((p) => (
          <ProjectPulseCard key={p.id} project={p} />
        ))}
      </div>

      {rest.length > 0 ? (
        <section aria-label="Other projects" className="space-y-3">
          <div className="flex items-baseline justify-between gap-2">
            <h3 className="text-sm font-semibold text-foreground">
              Other projects
            </h3>
            <span className="text-xs text-muted-foreground tabular-nums">
              {rest.length} more
            </span>
          </div>
          <ul className="rounded-xl border border-border bg-card overflow-hidden">
            {rest.map((project) => {
              const health = computeHealth(project)
              const pct =
                project.tasksTotal === 0
                  ? 0
                  : Math.round(
                      (project.tasksDone / project.tasksTotal) * 100
                    )
              return (
                <li
                  key={project.id}
                  className="border-b border-border last:border-b-0"
                >
                  <Link
                    href={`/projects/${project.id}`}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-accent/50 transition-colors focus-visible:outline-none focus-visible:bg-accent/50"
                  >
                    <HealthDot health={health} />
                    <span className="font-medium text-sm flex-1 truncate">
                      {project.name}
                      <span className="text-muted-foreground font-normal">
                        {" "}
                        · {project.client}
                      </span>
                    </span>
                    <div
                      className="hidden sm:block h-2 w-32 bg-muted rounded-full overflow-hidden"
                      dir="ltr"
                      aria-hidden
                    >
                      <div
                        className="h-full bg-primary rounded-full"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground tabular-nums w-14 text-end">
                      {project.tasksDone}/{project.tasksTotal}
                    </span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </section>
      ) : null}
    </section>
  )
}

/**
 * One-line banner shown when every project is Healthy. The copy uses live
 * counts and the project with the smallest non-negative `daysToDeadline`
 * (the most imminent upcoming deadline) — never invented data.
 *
 * If every project is overdue but somehow still classed Healthy (impossible
 * with the current `computeHealth`, but defensive), we fall back to the date
 * with the largest `daysToDeadline` so the line still reads naturally rather
 * than going blank.
 */
function HealthyBanner({ projects }: { projects: PulseProject[] }) {
  const upcoming = projects
    .filter((p) => p.daysToDeadline >= 0)
    .sort((a, b) => a.daysToDeadline - b.daysToDeadline)
  const candidate = upcoming[0] ?? projects[0]
  const latestDue = candidate?.due

  return (
    <Card
      className="flex flex-row items-center gap-2.5 px-4 py-3"
      aria-label={`${projects.length} active projects, all on track`}
    >
      <CheckCircle2
        className="size-4 text-emerald-600 dark:text-emerald-400 shrink-0"
        aria-hidden="true"
      />
      <p className="text-sm text-muted-foreground">
        <span className="font-medium text-foreground tabular-nums">
          {projects.length} project{projects.length === 1 ? "" : "s"}
        </span>{" "}
        · all on track
        {latestDue ? (
          <>
            {" "}
            · most recent due{" "}
            <span className="tabular-nums">{latestDue}</span>
          </>
        ) : null}
      </p>
    </Card>
  )
}

