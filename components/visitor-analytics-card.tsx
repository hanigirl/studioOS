"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { Clock, MoreVertical, RefreshCw, SlidersHorizontal, Ticket, User } from "lucide-react"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RadialGauge } from "@/components/radial-gauge"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const ticketSalesData = [
  { time: "8am", tickets: 1150 },
  { time: "10am", tickets: 1450 },
  { time: "12pm", tickets: 1700 },
  { time: "2pm", tickets: 2100 },
  { time: "4pm", tickets: 1850 },
  { time: "6pm", tickets: 0 },
  { time: "8pm", tickets: 0 },
]

const chartConfig = {
  tickets: {
    label: "Tickets",
    color: "var(--color-violet-500)",
  },
} satisfies ChartConfig

export function VisitorAnalyticsCard() {
  return (
    <Card className="transition-[transform,box-shadow] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:shadow-md">
      <CardHeader>
        <CardTitle>Visitor Analytics</CardTitle>
        <CardDescription className="flex items-center gap-1.5">
          <RefreshCw className="size-3.5" aria-hidden />
          Last updated: 9:46am
        </CardDescription>
        <CardAction className="flex items-center gap-1">
          <Button variant="ghost" size="icon-sm">
            <SlidersHorizontal />
            <span className="sr-only">Filters</span>
          </Button>
          <Button variant="ghost" size="icon-sm">
            <MoreVertical />
            <span className="sr-only">Options</span>
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent className="grid gap-6 divide-y lg:grid-cols-3 lg:divide-x lg:divide-y-0">
        <div className="flex flex-col items-center gap-3 text-center lg:pr-6">
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <User className="size-4" aria-hidden />
            Live Park Occupancy
          </div>
          <div className="relative flex items-center justify-center">
            <RadialGauge size={140} />
            <span className="absolute text-2xl font-bold tracking-tight">46%</span>
          </div>
          <p className="text-xs text-emerald-600 dark:text-emerald-400">
            6% Higher than average
          </p>
        </div>

        <div className="flex flex-col items-center gap-3 pt-6 text-center lg:px-6 lg:pt-0">
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Clock className="size-4" aria-hidden />
            Expected Peak times
          </div>
          <div className="flex items-center gap-6">
            <div className="flex flex-col items-center gap-2">
              <div className="relative flex items-center justify-center">
                <RadialGauge size={110} />
                <span className="absolute text-lg font-bold tracking-tight">72%</span>
              </div>
              <p className="text-xs text-muted-foreground">11am-1pm</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="relative flex items-center justify-center">
                <RadialGauge size={110} />
                <span className="absolute text-lg font-bold tracking-tight">90%</span>
              </div>
              <p className="text-xs text-muted-foreground">5pm-7pm</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 pt-6 lg:pl-6 lg:pt-0">
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Ticket className="size-4" aria-hidden />
            Ticket Sales By Time
          </div>
          <ChartContainer config={chartConfig} className="h-[220px] w-full">
            <BarChart data={ticketSalesData}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="time" tickLine={false} axisLine={false} tickMargin={8} />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => (value >= 1000 ? `${value / 1000}K` : `${value}`)}
              />
              <ChartTooltip content={<ChartTooltipContent />} cursor={false} />
              <Bar dataKey="tickets" fill="var(--color-tickets)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  )
}
