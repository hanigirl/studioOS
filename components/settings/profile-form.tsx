import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

export function ProfileForm() {
  return (
    <div className="flex flex-1 flex-col gap-6">
      <div>
        <h2 className="text-xl font-semibold tracking-tight text-sidebar-foreground">
          Profile
        </h2>
        <p className="text-lg text-muted-foreground">
          This is how others will see you on the site
        </p>
      </div>

      <Separator />

      <div className="flex flex-col gap-1">
        <Label
          htmlFor="username"
          className="text-base font-semibold text-foreground"
        >
          Username
        </Label>
        <Input id="username" placeholder="shadcn" className="w-72" />
        <p className="text-sm text-muted-foreground">
          This is your public display name. It can be your real name or a
          pseudonym. You can only change this once every 30 days.
        </p>
      </div>

      <div className="flex flex-col gap-1">
        <Label
          htmlFor="email"
          className="text-base font-semibold text-foreground"
        >
          Email
        </Label>
        <Input id="email" type="email" className="w-72" />
        <p className="text-sm text-muted-foreground">
          You can manage verified email addresses in your email settings
        </p>
      </div>

      <div className="flex flex-col gap-1">
        <Label
          htmlFor="bio"
          className="text-base font-semibold text-foreground"
        >
          Bio
        </Label>
        <Input id="bio" className="w-72" />
      </div>
    </div>
  )
}
