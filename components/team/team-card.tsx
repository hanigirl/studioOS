import { BriefcaseBusiness, Camera, Play } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { TeamMember } from "./types"

const socials = [
  { icon: Camera, label: "portfolio" },
  { icon: BriefcaseBusiness, label: "work profile" },
  { icon: Play, label: "showreel" },
]

export function TeamCard({ member }: { member: TeamMember }) {
  return (
    <Card className="gap-0 py-0 transition-[transform,box-shadow] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:shadow-md">
      <CardContent className="flex flex-col gap-4 p-6">
        <Avatar className="size-40 self-center">
          <AvatarImage
            src={member.photo}
            alt={member.name}
            className="object-cover"
          />
          <AvatarFallback
            className={cn("text-2xl font-semibold text-white", member.color)}
          >
            {member.initials}
          </AvatarFallback>
        </Avatar>

        <div className="space-y-1">
          <h2 className="text-lg font-semibold leading-tight">{member.name}</h2>
          <p className="text-sm text-muted-foreground">{member.role}</p>
        </div>

        <div className="flex items-center gap-3">
          {socials.map(({ icon: Icon, label }) => (
            <button
              key={label}
              type="button"
              aria-label={`${member.name} — ${label}`}
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              <Icon className="size-4" aria-hidden />
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
