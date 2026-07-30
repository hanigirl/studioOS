export interface TeamSocials {
  youtube?: string
  linkedin?: string
  instagram?: string
}

export interface TeamMember {
  id: string
  name: string
  title: string
  initials: string
  color: string
  photo?: string
  socials: TeamSocials
}
