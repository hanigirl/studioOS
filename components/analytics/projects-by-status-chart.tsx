import { Cell, Pie, PieChart } from "recharts"
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
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import type { ChartConfig } from "@/components/ui/chart"
import type { StatusDataPoint } from "./types"

const chartConfig = {
  count:     { label: "Projects"  },
  discovery: { label: "Discovery", color: "var(--color-chart-4)" },
  design:    { label: "Design",    color: "var(--color-chart-1)" },
  review:    { label: "Review",    color: "var(--color-chart-5)" },
  handoff:   { label: "Handoff",   color: "var(--color-chart-2)" },
  done:      { label: "Done",      color: "var(--color-chart-3)" },
} satisfies ChartConfig

export function ProjectsByStatusChart({ data }: { data: StatusDataPoint[] }) {
  const total = data.reduce((s, d) => s + d.count, 0)

  return (
    <Card className="lg:col-span-2 transition-[transform,box-shadow] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:shadow-md">
      <CardHeader className="px-6 pb-2">
        <CardTitle className="text-base font-semibold">Projects by Status</CardTitle>
        <CardDescription className="text-xs">{total} active project{total !== 1 ? "s" : ""}</CardDescription>
      </CardHeader>
      <CardContent className="px-6 pb-0 pt-0">
        {data.length === 0 ? (
          <div className="flex flex-col items-center gap-2 py-8">
            <BarChart3 className="size-7 text-muted-foreground/30" aria-hidden />
            <p className="text-sm font-medium text-muted-foreground">No data for this period</p>
          </div>
        ) : (
          <ChartContainer config={chartConfig} className="h-[200px] w-full">
            <PieChart>
              <ChartTooltip content={<ChartTooltipContent nameKey="status" />} />
              <Pie
                data={data}
                dataKey="count"
                nameKey="status"
                innerRadius={55}
                outerRadius={75}
                strokeWidth={2}
              >
                {data.map((entry) => (
                  <Cell
                    key={entry.colorKey}
                    fill={`var(--color-${entry.colorKey})`}
                  />
                ))}
              </Pie>
              <ChartLegend
                content={
                  <ChartLegendContent
                    nameKey="colorKey"
                    payload={data.map((d) => ({
                      value: d.colorKey,
                      type: "square" as const,
                      color: `var(--color-${d.colorKey})`,
                    }))}
                  />
                }
              />
            </PieChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  )
}
