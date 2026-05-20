import { AlertTriangle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function ErrorState() {
  return (
    <Card className="min-h-[14rem] py-6">
      <CardContent className="flex h-full flex-col items-center justify-center gap-3 text-center">
        <div
          className="flex size-12 items-center justify-center rounded-full bg-destructive/10 text-destructive"
          aria-hidden="true"
        >
          <AlertTriangle className="size-6" />
        </div>
        <h2 className="text-base font-semibold text-destructive">
          Couldn&apos;t load today&apos;s plan
        </h2>
        <p className="max-w-md text-sm text-muted-foreground">
          Something went wrong while pulling your meetings and tasks. Try again,
          or fall back to yesterday&apos;s view.
        </p>
        <div className="mt-2 flex flex-wrap items-center justify-center gap-2">
          <Button variant="outline">Retry</Button>
          <Button variant="ghost">Open yesterday&apos;s view</Button>
        </div>
      </CardContent>
    </Card>
  )
}
