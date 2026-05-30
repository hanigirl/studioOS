import { TrendingDown, TrendingUp } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { KpiData } from "./types"

const badgeStyles = {
  positive: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  negative: "bg-red-100     text-red-700     dark:bg-red-900/30     dark:text-red-400",
}

export function AnalyticsKpiCard({ kpi }: { kpi: KpiData }) {
  const Icon = kpi.icon
  const TrendIcon = kpi.deltaPositive ? TrendingUp : TrendingDown

  return (
    <Card className="py-0 transition-[transform,box-shadow] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:shadow-md">
      <CardContent className="px-4 py-5">
        <div className="flex items-center gap-2.5 mb-3">
          <div className="rounded-lg p-1.5 shrink-0 bg-muted text-muted-foreground">
            <Icon className="size-4" aria-hidden />
          </div>
          <p className="text-sm font-medium text-muted-foreground">{kpi.label}</p>
        </div>

        <p className="text-2xl font-bold tracking-tight tabular-nums mb-2.5">{kpi.value}</p>

        <span
          className={cn(
            "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium",
            kpi.deltaPositive ? badgeStyles.positive : badgeStyles.negative
          )}
        >
          <TrendIcon className="size-3" aria-hidden />
          {kpi.delta}
        </span>
      </CardContent>
    </Card>
  )
}
