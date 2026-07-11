import { TrendingUp } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RadialGauge } from "@/components/radial-gauge"

export function NpsCard() {
  return (
    <Card className="transition-[transform,box-shadow] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:shadow-md">
      <CardHeader>
        <CardTitle>NPS</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center text-center gap-3">
        <div className="relative flex items-center justify-center">
          <RadialGauge size={128} value={70} />
          <span className="absolute text-xl font-bold tracking-tight">70+</span>
        </div>
        <p className="text-sm text-muted-foreground">NPS</p>
        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
          <TrendingUp className="size-3" aria-hidden />
          10
        </span>
      </CardContent>
    </Card>
  )
}
