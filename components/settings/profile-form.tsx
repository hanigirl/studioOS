import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"

export function ProfileForm() {
  return (
    <div className="flex max-w-2xl flex-col gap-6">
      <div className="space-y-1">
        <h2 className="text-xl font-semibold tracking-tight text-sidebar-foreground">
          Profile
        </h2>
        <p className="text-base text-muted-foreground">
          This is how others will see you on the site
        </p>
      </div>
      <Separator />
      <div className="space-y-1.5">
        <Label htmlFor="username">Username</Label>
        <Input id="username" placeholder="shadcn" className="w-72" />
        <p className="text-sm text-muted-foreground">
          This is your public display name. It can be your real name or a
          pseudonym. You can only change this once every 30 days.
        </p>
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" className="w-72" />
        <p className="text-sm text-muted-foreground">
          You can manage verified email addresses in your email settings
        </p>
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="bio">Bio</Label>
        <Textarea id="bio" className="w-72" />
      </div>
    </div>
  )
}
