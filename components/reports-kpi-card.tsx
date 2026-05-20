import { TrendingDown, TrendingUp } from "lucide-react"
import { Card } from "@/components/ui/card"

interface ReportsKpiCardProps {
  title: string
  value: string
  change: string
  trend: "up" | "down"
  description: string
  footnote: string
}

export function ReportsKpiCard({
  title,
  value,
  change,
  trend,
  description,
  footnote,
}: ReportsKpiCardProps) {
  const TrendIcon = trend === "up" ? TrendingUp : TrendingDown
  return (
    <Card className="flex min-w-[280px] flex-1 flex-col items-start gap-2 rounded-[9px] border p-4 py-4 shadow-none">
      <div className="flex w-full items-start justify-between">
        <p className="text-sm leading-[21px] text-foreground">{title}</p>
        <div className="flex min-h-6 items-center gap-1.5 rounded-full border px-2 py-[3px]">
          <TrendIcon className="size-[13px]" />
          <span className="text-xs font-semibold leading-4 text-foreground">
            {change}
          </span>
        </div>
      </div>
      <p className="text-3xl font-semibold leading-[30px] tracking-tight text-foreground">
        {value}
      </p>
      <div className="flex items-center gap-2">
        <p className="text-sm leading-[21px] text-foreground">{description}</p>
        <TrendIcon className="size-6" />
      </div>
      <p className="w-[177px] text-xs leading-4 text-muted-foreground">
        {footnote}
      </p>
    </Card>
  )
}
