import { Bell, KeyRound, Monitor, Palette, Users } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

const navItems = [
  { label: "Profile",       icon: Users,    active: true  },
  { label: "Account",       icon: KeyRound, active: false },
  { label: "Appearance",    icon: Palette,  active: false },
  { label: "Notifications", icon: Bell,     active: false },
  { label: "Display",       icon: Monitor,  active: false },
]

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Settings</h1>

      <div className="flex gap-8 items-start">
        {/* Left nav */}
        <nav className="w-44 shrink-0 flex flex-col">
          {navItems.map(({ label, icon: Icon, active }) => (
            <div
              key={label}
              className={cn(
                "flex items-center gap-2 h-8 px-2 rounded-md text-sm font-medium cursor-pointer",
                active
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent/60"
              )}
            >
              <Icon className="size-4 shrink-0" aria-hidden />
              {label}
            </div>
          ))}
        </nav>

        {/* Right — Profile form */}
        <div className="flex-1 flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <h2 className="text-xl font-semibold tracking-tight">Profile</h2>
            <p className="text-lg text-muted-foreground">
              This is how others will see you on the site
            </p>
          </div>

          <Separator />

          {/* Content + scroll indicator below the separator */}
          <div className="flex gap-3 items-stretch">
            <div className="flex-1 flex flex-col gap-6">
              <div className="flex flex-col gap-1">
                <label className="text-base font-semibold" htmlFor="username">
                  Username
                </label>
                <Input id="username" defaultValue="shadcn" className="w-[280px]" />
                <p className="text-sm text-muted-foreground max-w-sm">
                  This is your public display name. It can be your real name or a
                  pseudonym. You can only change this once every 30 days.
                </p>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-base font-semibold" htmlFor="email">
                  Email
                </label>
                <Input id="email" type="email" className="w-[280px]" />
                <p className="text-sm text-muted-foreground max-w-sm">
                  You can manage verified email addresses in your email settings
                </p>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-base font-semibold" htmlFor="bio">
                  Bio
                </label>
                <Input id="bio" className="w-[280px]" />
              </div>
            </div>

            {/* Scroll indicator */}
            <div className="w-1.5 shrink-0 rounded-full bg-muted">
              <div className="w-full h-16 rounded-full bg-border" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
