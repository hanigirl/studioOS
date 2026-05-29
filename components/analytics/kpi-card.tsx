import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { KpiData } from "./types"

export function AnalyticsKpiCard({ kpi }: { kpi: KpiData }) {
  return (
    <Card>
      <CardContent className="px-4 py-2.5 space-y-0.5">
        <p className="text-xs text-muted-foreground">{kpi.label}</p>
        <p className="text-lg font-bold tabular-nums">{kpi.value}</p>
        <p
          className={cn(
            "text-xs",
            kpi.deltaPositive
              ? "text-emerald-600 dark:text-emerald-400"
              : "text-red-600 dark:text-red-400"
          )}
        >
          {kpi.delta}
        </p>
      </CardContent>
    </Card>
  )
}
