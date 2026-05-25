import type { LucideIcon } from "lucide-react"
import { TrendingDown, TrendingUp } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

const iconColors = {
  emerald: "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400",
  blue:    "bg-blue-100    text-blue-600    dark:bg-blue-900/30    dark:text-blue-400",
  amber:   "bg-amber-100   text-amber-600   dark:bg-amber-900/30   dark:text-amber-400",
  violet:  "bg-violet-100  text-violet-600  dark:bg-violet-900/30  dark:text-violet-400",
} as const

interface StatCardProps {
  title: string
  value: string
  change: string
  icon: LucideIcon
  color?: keyof typeof iconColors
}

export function StatCard({ title, value, change, icon: Icon, color = "blue" }: StatCardProps) {
  const isPositive = change.startsWith("+")
  const isNegative = change.startsWith("-")

  return (
    <Card className="transition-[transform,box-shadow] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:shadow-md">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <div className={cn("rounded-lg p-2 shrink-0", iconColors[color])}>
            <Icon className="size-4" aria-hidden />
          </div>
        </div>

        <p className="text-2xl font-bold tracking-tight mb-3">{value}</p>

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
