import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import type { DashboardStat } from "./data"

export function StatCard({ label, value, caption }: DashboardStat) {
  return (
    <Card className="transition-[transform,box-shadow] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:shadow-md">
      <CardHeader>
        <CardDescription className="text-base font-medium leading-6">
          {label}
        </CardDescription>
        <CardTitle className="text-2xl font-bold leading-8 tracking-tight">
          {value}
        </CardTitle>
      </CardHeader>
      <CardFooter>
        <p className="text-xs text-muted-foreground">{caption}</p>
      </CardFooter>
    </Card>
  )
}
