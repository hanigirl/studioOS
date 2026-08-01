import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { settingsSectionCopy } from "./data"

export function ProfileSection() {
  const copy = settingsSectionCopy.profile

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-medium">{copy.title}</h2>
        <p className="text-sm text-muted-foreground">{copy.description}</p>
      </div>

      <Separator />

      <div className="space-y-2">
        <Label htmlFor="username">Username</Label>
        <Input id="username" defaultValue="shadcn" className="max-w-sm" />
        <p className="text-sm text-muted-foreground">
          This is your public display name. It can be your real name or a
          pseudonym. You can only change this once every 30 days.
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" className="max-w-sm" />
        <p className="text-sm text-muted-foreground">
          You can manage verified emails addresses in your email settings
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="bio">Bio</Label>
        <Input id="bio" className="max-w-sm" />
      </div>
    </div>
  )
}
