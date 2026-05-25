import { Camera, BriefcaseBusiness, Play } from "lucide-react"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { TeamMember } from "./types"

export function TeamCard({ member }: { member: TeamMember }) {
  return (
    <Card className="w-[272px] shrink-0 items-center px-6">
      <div className={cn("flex size-40 items-center justify-center rounded-full", member.avatarColor)}>
        <span className="text-[30px] font-bold tracking-[-0.75px] text-white">
          {member.initials}
        </span>
      </div>
      <div className="flex w-full flex-col gap-2">
        <p className="text-lg font-semibold text-card-foreground">{member.name}</p>
        <p className="text-sm text-foreground">{member.role}</p>
      </div>
      <div className="flex w-full items-center gap-3">
        <Camera className="size-4 text-foreground" />
        <BriefcaseBusiness className="size-4 text-foreground" />
        <Play className="size-4 text-foreground" />
      </div>
    </Card>
  )
}
