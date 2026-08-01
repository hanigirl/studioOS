import { Separator } from "@/components/ui/separator"
import type { SettingsSectionCopy } from "./types"

export function PlaceholderSection({ title, description }: SettingsSectionCopy) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-medium">{title}</h2>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>

      <Separator />

      <p className="text-sm text-muted-foreground">
        This section isn&apos;t configured yet.
      </p>
    </div>
  )
}
