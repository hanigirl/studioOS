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
    <Card className="transition-[transform,box-shadow] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:shadow-md">
      <CardHeader className="px-6 pb-2">
        <CardTitle className="text-base font-semibold">Team Workload</CardTitle>
        <CardDescription className="text-xs">Active tasks per team member</CardDescription>
      </CardHeader>
      <CardContent className="px-6 pb-0 pt-0">
        {data.length === 0 ? (
          <div className="flex flex-col items-center gap-2 py-8">
            <BarChart3 className="size-7 text-muted-foreground/30" aria-hidden />
            <p className="text-sm font-medium text-muted-foreground">No data for this period</p>
          </div>
        ) : (
          <ChartContainer config={chartConfig} className="h-[180px] w-full">
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
