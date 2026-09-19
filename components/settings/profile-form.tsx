import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

export function ProfileForm() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold tracking-tight">Profile</h2>
        <p className="text-lg text-muted-foreground">
          This is how others will see you on the site
        </p>
      </div>

      <Separator />

      <div className="space-y-6">
        <div className="flex flex-col gap-1">
          <label htmlFor="username" className="text-base font-semibold">
            Username
          </label>
          <Input id="username" placeholder="shadcn" />
          <p className="text-sm text-muted-foreground">
            This is your public display name. It can be your real name or a
            pseudonym. You can only change this once every 30 days.
          </p>
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="text-base font-semibold">
            Email
          </label>
          <Select>
            <SelectTrigger id="email" className="w-full max-w-[280px]">
              <SelectValue placeholder="Select a verified email to display" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="m@example.com">m@example.com</SelectItem>
              <SelectItem value="m@google.com">m@google.com</SelectItem>
              <SelectItem value="m@support.com">m@support.com</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-sm text-muted-foreground">
            You can manage verified email addresses in your email settings.
          </p>
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="bio" className="text-base font-semibold">
            Bio
          </label>
          <Textarea id="bio" defaultValue="I own a computer." className="resize-none" />
          <p className="text-sm text-muted-foreground">
            You can @mention other users and organizations to link to them.
          </p>
        </div>
      </div>
    </div>
  )
}
