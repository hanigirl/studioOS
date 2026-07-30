import { TrendingDown, TrendingUp } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { statToneClasses } from "@/lib/stat-tone"

interface StatCardProps {
  title: string
  value: string
  change: string
  trend: string
  caption: string
  /**
   * Which direction of `change` is good news for this metric — "up" for
   * something you want to grow (revenue, completed tasks), "down" for
   * something you want to shrink (an open backlog). Defaults to "up", the
   * common case. Drives the card's color: a change that matches is positive
   * (green), one that doesn't is a warning (amber) — a raw negative sign
   * alone isn't enough, since e.g. a shrinking To Do count is good news.
   */
  goodDirection?: "up" | "down"
  className?: string
}

function parseChange(change: string): number {
  const n = Number.parseFloat(change.replace(/[^0-9.+-]/g, ""))
  return Number.isNaN(n) ? 0 : n
}

export function StatCard({
  title,
  value,
  change,
  trend,
  caption,
  goodDirection = "up",
  className,
}: StatCardProps) {
  const delta = parseChange(change)
  const TrendIcon = delta < 0 ? TrendingDown : TrendingUp

  const tone =
    delta === 0
      ? "neutral"
      : (delta > 0 && goodDirection === "up") ||
          (delta < 0 && goodDirection === "down")
        ? "positive"
        : "warning"
  const toneClass = statToneClasses[tone]

  return (
    <Card
      className={cn(
        "min-w-[240px] flex-1 gap-2 rounded-lg border p-4 shadow-none transition-[transform,box-shadow,background-color,color] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:shadow-md",
        toneClass.card,
        className
      )}
    >
      <div className="flex w-full items-start justify-between">
        <p className="text-sm">{title}</p>
        <Badge variant="outline">
          <TrendIcon aria-hidden />
          {change}
        </Badge>
      </div>

      <p className="text-2xl font-semibold tracking-tight">{value}</p>

      <div className="flex items-center gap-2">
        <p className="text-sm">{trend}</p>
        <TrendIcon className="size-4 shrink-0" aria-hidden />
      </div>

      <p className={cn("text-xs", toneClass.caption)}>{caption}</p>
    </Card>
  )
}
