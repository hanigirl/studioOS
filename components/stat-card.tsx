import type { LucideIcon } from "lucide-react"
import { TrendingDown, TrendingUp } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface StatCardProps {
  title: string
  value: string
  change: string
  icon: LucideIcon
}

export function StatCard({ title, value, change, icon: Icon }: StatCardProps) {
  const isPositive = change.startsWith("+")
  const isNegative = change.startsWith("-")

  return (
    <Card className="transition-[transform,box-shadow] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:shadow-md py-0">
      <CardContent className="p-5">
        <div className="flex items-center gap-3 mb-3">
          <div className="rounded-lg p-2 shrink-0 bg-muted text-muted-foreground">
            <Icon className="size-4" aria-hidden />
          </div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
        </div>

        <p className="text-2xl font-bold tracking-tight mb-2">{value}</p>

        <span
          className={cn(
            "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium",
            isPositive && "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
            isNegative && "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
            !isPositive && !isNegative && "bg-muted text-muted-foreground",
          )}
        >
          {isPositive && <TrendingUp className="size-3" aria-hidden />}
          {isNegative && <TrendingDown className="size-3" aria-hidden />}
          {change}
        </span>
      </CardContent>
    </Card>
  )
}
