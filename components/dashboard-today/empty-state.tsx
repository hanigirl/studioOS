import { CalendarCheck } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function EmptyState() {
  return (
    <Card className="min-h-[14rem] py-6">
      <CardContent className="flex h-full flex-col items-center justify-center gap-3 text-center">
        <div
          className="flex size-12 items-center justify-center rounded-full bg-muted text-muted-foreground"
          aria-hidden="true"
        >
          <CalendarCheck className="size-6" />
        </div>
        <h2 className="text-base font-semibold text-foreground">
          Nothing on your plate today
        </h2>
        <p className="max-w-md text-sm text-muted-foreground">
          No meetings, no deadlines. Use this gap to plan tomorrow or knock out a
          backlog item.
        </p>
        <Button variant="outline" className="mt-2">
          Plan tomorrow
        </Button>
      </CardContent>
    </Card>
  )
}
