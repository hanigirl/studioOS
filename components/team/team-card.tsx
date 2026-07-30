import { Instagram, Linkedin, Youtube } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { TeamMember } from "./types"

export function TeamCard({ member }: { member: TeamMember }) {
  return (
    <Card
      className={cn(
        "w-72 items-center gap-6 p-6 text-center",
        "transition-[transform,box-shadow] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]",
        "hover:-translate-y-0.5 hover:shadow-md"
      )}
    >
      <Avatar className="size-40">
        {member.photo && (
          <AvatarImage
            src={member.photo}
            alt={member.name}
            className="object-cover"
          />
        )}
        <AvatarFallback
          className={cn("text-3xl font-bold text-white", member.color)}
        >
          {member.initials}
        </AvatarFallback>
      </Avatar>

      <div className="flex w-full flex-col items-start gap-2">
        <p className="text-lg leading-7 font-semibold text-card-foreground">
          {member.name}
        </p>
        <p className="text-sm text-foreground">{member.title}</p>
      </div>

      <div className="flex w-full items-center gap-3">
        {member.socials.youtube && (
          <a
            href={member.socials.youtube}
            aria-label={`${member.name} on YouTube`}
            className="text-foreground transition-colors hover:text-primary"
          >
            <Youtube className="size-4" />
          </a>
        )}
        {member.socials.linkedin && (
          <a
            href={member.socials.linkedin}
            aria-label={`${member.name} on LinkedIn`}
            className="text-foreground transition-colors hover:text-primary"
          >
            <Linkedin className="size-4" />
          </a>
        )}
        {member.socials.instagram && (
          <a
            href={member.socials.instagram}
            aria-label={`${member.name} on Instagram`}
            className="text-foreground transition-colors hover:text-primary"
          >
            <Instagram className="size-4" />
          </a>
        )}
      </div>
    </Card>
  )
}
