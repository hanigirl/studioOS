import { MoreVertical } from "lucide-react"
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function RevenueCard() {
  return (
    <Card className="transition-[transform,box-shadow] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:shadow-md">
      <CardHeader>
        <CardTitle>Revenue Overview</CardTitle>
        <CardAction>
          <Button variant="ghost" size="icon-sm">
            <MoreVertical />
            <span className="sr-only">Options</span>
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex items-center divide-x">
          <div className="flex-1 text-center">
            <p className="text-2xl font-bold tracking-tight">320k</p>
            <p className="text-sm text-muted-foreground">Today</p>
            <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400">Revenue</p>
          </div>
          <div className="flex-1 text-center">
            <p className="text-2xl font-bold tracking-tight">150k</p>
            <p className="text-sm text-muted-foreground">Today</p>
            <p className="text-sm font-medium text-red-600 dark:text-red-400">Expense</p>
          </div>
        </div>
        <Tabs defaultValue="today">
          <TabsList className="w-full">
            <TabsTrigger value="today">Today</TabsTrigger>
            <TabsTrigger value="week">Week</TabsTrigger>
            <TabsTrigger value="month">Month</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardContent>
    </Card>
  )
}
