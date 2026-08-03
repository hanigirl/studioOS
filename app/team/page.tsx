import { TeamCard } from "@/components/team/team-card"
import { team } from "@/components/team/data"

export default function TeamPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">Team</h1>
        <p className="text-sm text-muted-foreground">
          {team.length} people in the studio, shipping design with AI every day
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {team.map((member) => (
          <TeamCard key={member.name} member={member} />
        ))}
      </div>
    </div>
  )
}
