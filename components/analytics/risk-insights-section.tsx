import { AlertTriangle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { HealthBadge } from "@/components/projects/health-badge"
import { computeHealth } from "@/components/projects/data"
import type { PulseProject } from "@/components/projects/types"

export function RiskInsightsSection({ projects }: { projects: PulseProject[] }) {
  const atRisk = projects.filter((p) => {
    const h = computeHealth(p)
    return h === "Critical" || h === "At Risk"
  })

  if (atRisk.length === 0) return null

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-sm font-medium">
          <AlertTriangle className="size-4 text-amber-500" aria-hidden />
          {atRisk.length} project{atRisk.length !== 1 ? "s" : ""} need attention
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex flex-col divide-y divide-border">
          {atRisk.map((p) => {
            const health = computeHealth(p)
            return (
              <div key={p.id} className="flex items-center justify-between gap-4 py-2 first:pt-0 last:pb-0">
                <div className="flex flex-col gap-0.5 min-w-0">
                  <span className="text-sm font-medium leading-tight truncate">{p.name}</span>
                  <span className="text-xs text-muted-foreground truncate">{p.healthReason}</span>
                </div>
                <HealthBadge health={health} reason={p.healthReason} className="shrink-0" />
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
