import { TeamCard } from "@/components/team/team-card";
import { teamMembers } from "@/components/team/data";

export default function TeamPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">Team</h1>
        <p className="text-sm text-muted-foreground">
          {teamMembers.length} people in the studio, shipping design with AI
          every day
        </p>
      </div>
      <div className="flex flex-wrap gap-4">
        {teamMembers.map((member) => (
          <TeamCard key={member.id} member={member} />
        ))}
      </div>
    </div>
  );
}
