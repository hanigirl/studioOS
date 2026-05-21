import { Figma } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import type { NextUpItem } from "./types"

export function NextUpCard({ item }: { item: NextUpItem }) {
  return (
    <Card className="min-h-[14rem] gap-4 py-6">
      <CardContent className="flex h-full flex-col gap-5">
        <div className="flex items-center justify-between gap-4">
          <div className="flex min-w-0 items-center gap-3">
            <Avatar size="lg">
              <AvatarFallback className="bg-accent text-accent-foreground font-semibold">
                {item.clientInitials}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-foreground">
                {item.client}
              </p>
              <p className="truncate text-xs text-muted-foreground">
                {item.project}
              </p>
            </div>
          </div>
          <span className="text-xs uppercase tracking-wider text-muted-foreground font-medium">
            Next Up
          </span>
        </div>

        <Separator />

        <div className="flex flex-1 flex-col gap-2">
          <h3 className="text-base font-semibold leading-snug text-foreground">
            {item.title}
          </h3>
          <p className="text-xs text-muted-foreground">{item.contextLine}</p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button>
            <Figma aria-hidden="true" />
            Resume in Figma
          </Button>
          <Button variant="outline">Mark as Done</Button>
          <Button variant="ghost">Snooze 30m</Button>
          <div className="ms-auto text-xs text-muted-foreground tabular-nums">
            {item.due}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
