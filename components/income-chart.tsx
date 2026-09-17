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
  { month: "Jul", thisYear: 5100, lastYear: 3900 },
  { month: "Aug", thisYear: 6900, lastYear: 5400 },
  { month: "Sep", thisYear: 7400, lastYear: 6100 },
  { month: "Oct", thisYear: 6600, lastYear: 5300 },
  { month: "Nov", thisYear: 7800, lastYear: 6400 },
  { month: "Dec", thisYear: 8100, lastYear: 6800 },
]

function dailyThisYear(dayOffset: number) {
  return 200 + ((dayOffset * 53) % 650)
}

function dailyLastYear(dayOffset: number) {
  return 150 + ((dayOffset * 31) % 500)
}

function getLastMonthWeeklyData() {
  const weeks = 4
  const today = new Date()

  return Array.from({ length: weeks }, (_, index) => {
    const weeksAgo = weeks - 1 - index
    const weekEndOffset = weeksAgo * 7
    const weekStart = new Date(today)
    weekStart.setDate(weekStart.getDate() - weekEndOffset - 6)
    const weekEnd = new Date(today)
    weekEnd.setDate(weekEnd.getDate() - weekEndOffset)

    let thisYear = 0
    let lastYear = 0
    for (let day = 0; day < 7; day++) {
      const dayOffset = weekEndOffset + day
      thisYear += dailyThisYear(dayOffset)
      lastYear += dailyLastYear(dayOffset)
    }

    return {
      week: `${weekStart.toLocaleDateString("en-US", { month: "short", day: "numeric" })} - ${weekEnd.toLocaleDateString("en-US", { month: "short", day: "numeric" })}`,
      thisYear,
      lastYear,
    }
  })
}

const chartConfig = {
  thisYear: {
    label: "This Year",
    color: "oklch(0.623 0.214 259.815)", // Tailwind blue-500
  },
  lastYear: {
    label: "Last Year",
    color: "oklch(0.809 0.105 251.813)", // Tailwind blue-300
  },
} satisfies ChartConfig

export function IncomeChart() {
  const [period, setPeriod] = useState("6")
  const isWeekly = period === "1"

  const filteredData = useMemo(
    () => (isWeekly ? getLastMonthWeeklyData() : chartData.slice(0, Number(period))),
    [period, isWeekly]
  )

  return (
    <Card className="h-full transition-[transform,box-shadow] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:shadow-md">
      <CardHeader>
        <CardTitle>Income</CardTitle>
        <CardDescription>
          Weekly income comparison — this year vs last year
        </CardDescription>
        <CardAction>
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1 month</SelectItem>
              <SelectItem value="3">3 months</SelectItem>
              <SelectItem value="6">6 months</SelectItem>
              <SelectItem value="12">12 months</SelectItem>
            </SelectContent>
          </Select>
        </CardAction>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col">
        <ChartContainer
          config={chartConfig}
          className="h-full min-h-[350px] w-full"
        >
          <BarChart data={filteredData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey={isWeekly ? "week" : "month"}
              tickLine={false}
              axisLine={false}
              tickMargin={10}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) =>
                value >= 1000 ? `$${(value / 1000).toFixed(0)}k` : `$${value}`
              }
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
