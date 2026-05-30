import { teamMembers } from "@/components/team/data"
import { TeamCard } from "@/components/team/team-card"

export default function TeamPage() {
  return (
    <div className="space-y-5">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">Team</h1>
        <p className="text-sm text-muted-foreground">Meet the Studio OS team.</p>
      </div>
      <div className="flex flex-wrap content-start items-start gap-4">
        {teamMembers.map((member) => (
          <TeamCard key={member.initials} member={member} />
        ))}
      </div>
    </div>
  )
}
