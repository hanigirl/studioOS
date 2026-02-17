"use client"

import { useMemo, useState } from "react"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const chartData = [
  { month: "Jan", thisYear: 4800, lastYear: 2400 },
  { month: "Feb", thisYear: 7200, lastYear: 5800 },
  { month: "Mar", thisYear: 6400, lastYear: 3600 },
  { month: "Apr", thisYear: 2800, lastYear: 5200 },
  { month: "May", thisYear: 5600, lastYear: 4200 },
  { month: "Jun", thisYear: 5800, lastYear: 4600 },
  { month: "Jul", thisYear: 4200, lastYear: 3800 },
  { month: "Aug", thisYear: 6100, lastYear: 4900 },
  { month: "Sep", thisYear: 5400, lastYear: 3200 },
  { month: "Oct", thisYear: 4700, lastYear: 5100 },
  { month: "Nov", thisYear: 6800, lastYear: 4400 },
  { month: "Dec", thisYear: 7500, lastYear: 5600 },
]

const chartConfig = {
  thisYear: {
    label: "This Year",
    color: "hsl(217, 91%, 60%)",
  },
  lastYear: {
    label: "Last Year",
    color: "hsl(213, 97%, 75%)",
  },
} satisfies ChartConfig

export function IncomeChart() {
  const [period, setPeriod] = useState("6")

  const filteredData = useMemo(
    () => chartData.slice(0, Number(period)),
    [period]
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle>Income</CardTitle>
        <CardDescription>
          Monthly income comparison — this year vs last year
        </CardDescription>
        <CardAction>
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="3">3 months</SelectItem>
              <SelectItem value="6">6 months</SelectItem>
              <SelectItem value="12">12 months</SelectItem>
            </SelectContent>
          </Select>
        </CardAction>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[350px] w-full">
          <BarChart data={filteredData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={10}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
            />
            <ChartTooltip
              content={<ChartTooltipContent />}
              cursor={false}
            />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar
              dataKey="thisYear"
              fill="var(--color-thisYear)"
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="lastYear"
              fill="var(--color-lastYear)"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
