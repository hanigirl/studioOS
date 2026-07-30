import { TrendingDown, TrendingUp } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { DashboardStat } from "./data"

export function StatCard({
  label,
  value,
  change,
  trend,
  trendText,
  caption,
}: DashboardStat) {
  const TrendIcon = trend === "up" ? TrendingUp : TrendingDown

  return (
    <Card className="gap-0 py-0 transition-[transform,box-shadow] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:shadow-md">
      <CardContent className="flex flex-col gap-2 p-4">
        <div className="flex items-center justify-between gap-2">
          <span className="text-sm">{label}</span>
          <Badge variant="outline" className="rounded-full font-semibold">
            <TrendIcon aria-hidden />
            {change}
          </Badge>
        </div>

        <p className="text-3xl font-semibold tracking-tight">{value}</p>

        <div className="flex items-center gap-1.5 text-sm font-medium">
          <span>{trendText}</span>
          <TrendIcon className="size-4" aria-hidden />
        </div>

        <p className="text-xs text-muted-foreground">{caption}</p>
      </CardContent>
    </Card>
  )
}
