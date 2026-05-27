import { Instagram, Linkedin, Youtube, Camera, BriefcaseBusiness, Play } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { TeamMember } from "./types"

export function TeamCard({ member }: { member: TeamMember }) {
  return (
    <Card className="w-[272px] shrink-0 items-center">
      <Avatar className="size-40">
        {member.image && (
          <AvatarImage src={member.image} alt={member.name} className="object-cover" />
        )}
        <AvatarFallback
          className={cn(
            "size-40 rounded-full text-[30px] font-bold tracking-[-0.75px] text-white",
            member.avatarColor
          )}
        >
          {member.initials}
        </AvatarFallback>
      </Avatar>

      <CardContent className="flex w-full flex-col gap-2 pb-0">
        <p className="text-lg font-semibold text-card-foreground">{member.name}</p>
        <p className="text-sm text-foreground">{member.role}</p>
      </CardContent>

      <CardContent className="flex w-full items-center gap-1 pb-0">
        {member.socials ? (
          <>
            {member.socials.youtube && (
              <Button variant="ghost" size="icon-sm" asChild>
                <a href={member.socials.youtube} aria-label="YouTube" target="_blank" rel="noopener noreferrer">
                  <Youtube className="size-4" />
                </a>
              </Button>
            )}
            {member.socials.linkedin && (
              <Button variant="ghost" size="icon-sm" asChild>
                <a href={member.socials.linkedin} aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="size-4" />
                </a>
              </Button>
            )}
            {member.socials.instagram && (
              <Button variant="ghost" size="icon-sm" asChild>
                <a href={member.socials.instagram} aria-label="Instagram" target="_blank" rel="noopener noreferrer">
                  <Instagram className="size-4" />
                </a>
              </Button>
            )}
          </>
        ) : (
          <>
            <Button variant="ghost" size="icon-sm"><Camera className="size-4" /></Button>
            <Button variant="ghost" size="icon-sm"><BriefcaseBusiness className="size-4" /></Button>
            <Button variant="ghost" size="icon-sm"><Play className="size-4" /></Button>
          </>
        )}
      </CardContent>
    </Card>
  )
}
