import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

export function ProfileForm() {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h2 className="text-lg font-medium">Profile</h2>
        <p className="text-sm text-muted-foreground">
          This is how others will see you on the site.
        </p>
      </div>

      <Separator />

      <div className="space-y-6">
        <div className="flex flex-col gap-2">
          <label htmlFor="username" className="text-sm font-medium">
            Username
          </label>
          <Input id="username" placeholder="shadcn" className="max-w-sm" />
          <p className="text-sm text-muted-foreground">
            This is your public display name. It can be your real name or a
            pseudonym. You can only change this once every 30 days.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-sm font-medium">
            Email
          </label>
          <Input id="email" type="email" className="max-w-sm" />
          <p className="text-sm text-muted-foreground">
            You can manage verified email addresses in your email settings.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="bio" className="text-sm font-medium">
            Bio
          </label>
          <Input id="bio" className="max-w-sm" />
        </div>
      </div>
    </div>
  )
}
