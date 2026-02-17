import type { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface StatCardProps {
  title: string
  value: string
  change: string
  trend: "up" | "down"
  icon: LucideIcon
}

export function StatCard({ title, value, change, trend, icon: Icon }: StatCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <CardAction>
          <Icon className="size-4 text-muted-foreground" />
        </CardAction>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold">{value}</p>
        <p className={cn("text-xs", trend === "up" ? "text-emerald-500" : "text-destructive")}>
          {change}
        </p>
      </CardContent>
    </Card>
  )
}
