import { TrendingDown, TrendingUp } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface StatCardProps {
  title: string
  value: string
  change: string
  trend: string
  caption: string
  className?: string
}

export function StatCard({
  title,
  value,
  change,
  trend,
  caption,
  className,
}: StatCardProps) {
  const isNegative = change.trim().startsWith("-")
  const TrendIcon = isNegative ? TrendingDown : TrendingUp

  return (
    <Card
      className={cn(
        "min-w-[240px] flex-1 gap-2 rounded-lg border p-4 shadow-none transition-[transform,box-shadow] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:shadow-md",
        className
      )}
    >
      <div className="flex w-full items-start justify-between">
        <p className="text-sm text-foreground">{title}</p>
        <Badge variant="outline">
          <TrendIcon aria-hidden />
          {change}
        </Badge>
      </div>

      <p className="text-2xl font-semibold tracking-tight text-foreground">
        {value}
      </p>

      <div className="flex items-center gap-2">
        <p className="text-sm text-foreground">{trend}</p>
        <TrendIcon className="size-4 shrink-0" aria-hidden />
      </div>

      <p className="text-xs text-muted-foreground">{caption}</p>
    </Card>
  )
}
