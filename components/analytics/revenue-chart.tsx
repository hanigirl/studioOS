import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"
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
import type { RevenueDataPoint } from "./types"

const chartConfig = {
  revenue: { label: "Revenue", color: "var(--color-chart-1)" },
} satisfies ChartConfig

export function RevenueChart({ data }: { data: RevenueDataPoint[] }) {
  return (
    <Card className="lg:col-span-4">
      <CardHeader className="px-4 py-3 pb-1">
        <CardTitle className="text-sm font-medium">Revenue Over Time</CardTitle>
        <CardDescription className="text-xs">Total studio revenue by period</CardDescription>
      </CardHeader>
      <CardContent className="px-4 pb-3 pt-0">
        {data.length === 0 ? (
          <EmptyChart />
        ) : (
          <ChartContainer config={chartConfig} className="h-[120px] w-full">
            <LineChart data={data}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="period"
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
              <Line
                dataKey="revenue"
                type="monotone"
                stroke="var(--color-revenue)"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  )
}

function EmptyChart() {
  return (
    <div className="flex flex-col items-center gap-2 py-12">
      <BarChart3 className="size-7 text-muted-foreground/30" aria-hidden />
      <p className="text-sm font-medium text-muted-foreground">No data for this period</p>
      <p className="text-xs text-muted-foreground/60">Try selecting a wider time range.</p>
    </div>
  )
}
