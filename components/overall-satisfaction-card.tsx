import { MoreVertical, Star, TrendingUp } from "lucide-react"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function OverallSatisfactionCard() {
  return (
    <Card className="transition-[transform,box-shadow] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:shadow-md">
      <CardHeader>
        <CardTitle>Customer Satisfaction</CardTitle>
        <CardDescription>
          Response Rate: <span className="text-violet-600 dark:text-violet-400 font-medium">67%</span>
        </CardDescription>
        <CardAction>
          <Button variant="ghost" size="icon-sm">
            <MoreVertical />
            <span className="sr-only">Options</span>
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent className="flex flex-col items-center text-center gap-3">
        <div className="flex size-12 items-center justify-center rounded-xl bg-muted text-violet-500 dark:text-violet-400">
          <Star className="size-6" fill="currentColor" />
        </div>
        <p className="text-2xl font-bold tracking-tight">
          8.1<span className="text-base font-medium text-muted-foreground">/10</span>
        </p>
        <p className="text-sm text-muted-foreground">Overall Satisfaction</p>
        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
          <TrendingUp className="size-3" aria-hidden />
          0.2
        </span>
      </CardContent>
    </Card>
  )
}
