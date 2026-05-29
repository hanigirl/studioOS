import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { BarChart3 } from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import type { ChartConfig } from "@/components/ui/chart"
import type { ClientDataPoint } from "./types"

const chartConfig = {
  revenue: { label: "Revenue", color: "var(--color-chart-2)" },
} satisfies ChartConfig

export function ClientBreakdownChart({ data }: { data: ClientDataPoint[] }) {
  return (
    <Card>
      <CardHeader className="px-4 py-3 pb-1">
        <CardTitle className="text-sm font-medium">Client Breakdown</CardTitle>
        <CardDescription className="text-xs">Revenue attributed per client</CardDescription>
      </CardHeader>
      <CardContent className="px-4 pb-3 pt-0">
        {data.length === 0 ? (
          <div className="flex flex-col items-center gap-2 py-8">
            <BarChart3 className="size-7 text-muted-foreground/30" aria-hidden />
            <p className="text-sm font-medium text-muted-foreground">No data for this period</p>
            <p className="text-xs text-muted-foreground/60">Try selecting a wider time range.</p>
          </div>
        ) : (
          <ChartContainer config={chartConfig} className="h-[120px] w-full">
            <BarChart data={data}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="client"
                tickLine={false}
                axisLine={false}
                tickMargin={10}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(v: number) =>
                  v >= 1000 ? `$${(v / 1000).toFixed(0)}k` : `$${v}`
                }
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="revenue" fill="var(--color-revenue)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  )
}
