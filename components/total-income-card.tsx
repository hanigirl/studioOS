import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function TotalIncomeCard() {
  return (
    <Card className="transition-[transform,box-shadow] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:shadow-md">
      <CardHeader>
        <CardTitle>Total Income</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-3">
        <div className="flex size-32 flex-col items-center justify-center gap-0.5 rounded-full border-2 border-violet-500 text-center">
          <p className="text-xl font-bold tracking-tight">170k</p>
          <p className="text-xs text-muted-foreground">Today</p>
          <p className="text-xs font-medium text-violet-600 dark:text-violet-400">Total Income</p>
        </div>
        <p className="text-xs text-muted-foreground">July 26, 2024</p>
      </CardContent>
    </Card>
  )
}
