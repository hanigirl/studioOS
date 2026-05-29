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
import type { WorkloadDataPoint } from "./types"

const chartConfig = {
  tasks: { label: "Active Tasks", color: "var(--color-chart-1)" },
} satisfies ChartConfig

export function TeamWorkloadChart({ data }: { data: WorkloadDataPoint[] }) {
  return (
    <Card>
      <CardHeader className="px-4 py-3 pb-1">
        <CardTitle className="text-sm font-medium">Team Workload</CardTitle>
        <CardDescription className="text-xs">Active tasks per team member</CardDescription>
      </CardHeader>
      <CardContent className="px-4 pb-3 pt-0">
        {data.length === 0 ? (
          <div className="flex flex-col items-center gap-2 py-8">
            <BarChart3 className="size-7 text-muted-foreground/30" aria-hidden />
            <p className="text-sm font-medium text-muted-foreground">No data for this period</p>
          </div>
        ) : (
          <ChartContainer config={chartConfig} className="h-[120px] w-full">
            <BarChart layout="vertical" data={data}>
              <CartesianGrid horizontal={false} />
              <XAxis type="number" tickLine={false} axisLine={false} tickMargin={8} />
              <YAxis
                type="category"
                dataKey="member"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                width={52}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="tasks" fill="var(--color-tasks)" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  )
}
