import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { statToneClasses, type StatTone } from "@/lib/stat-tone"
import { computeHealth } from "./data"
import type { PulseProject } from "./types"

interface ProjectStat {
  title: string
  value: string
  caption: string
  tone: StatTone
}

// Derived straight from the same `PulseProject[]` the table renders, so the
// header numbers can never drift from what's visible below it.
function buildStats(projects: PulseProject[]): ProjectStat[] {
  const active = projects.filter((p) => p.status !== "Done")
  const inReview = projects.filter((p) => p.status === "Review")
  const completed = projects.filter((p) => p.status === "Done")
  const clients = new Set(projects.map((p) => p.client))

  const health = projects.map(computeHealth)
  const critical = health.filter((h) => h === "Critical").length
  const atRisk = health.filter((h) => h === "At Risk").length

  return [
    {
      title: "Active Projects",
      value: String(active.length),
      caption: `Across ${clients.size} client${clients.size === 1 ? "" : "s"}`,
      tone: "neutral",
    },
    {
      title: "In Review",
      value: String(inReview.length),
      caption: "Awaiting client feedback",
      tone: "neutral",
    },
    {
      title: "Completed",
      value: String(completed.length),
      caption: completed.length === 0 ? "None yet" : "All time",
      tone: completed.length > 0 ? "positive" : "neutral",
    },
    {
      title: "Needs Attention",
      value: String(critical + atRisk),
      caption:
        critical + atRisk === 0
          ? "All projects healthy"
          : `${critical} critical · ${atRisk} at risk`,
      tone: critical > 0 ? "critical" : atRisk > 0 ? "warning" : "positive",
    },
  ]
}

export function OverviewStats({ projects }: { projects: PulseProject[] }) {
  const stats = buildStats(projects)
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((s) => {
        const tone = statToneClasses[s.tone]
        return (
          <Card key={s.title} className={cn("transition-colors", tone.card)}>
            <CardHeader>
              <CardTitle className="text-base font-medium leading-6">
                {s.title}
              </CardTitle>
              <p className="text-2xl font-bold leading-8 tracking-tight">
                {s.value}
              </p>
            </CardHeader>
            <CardContent>
              <p className={cn("text-xs", tone.caption)}>{s.caption}</p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
