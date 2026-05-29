export interface TeamMember {
  initials: string
  name: string
  role: string
  avatarColor: string
  image?: string
  imageClassName?: string
  socials?: {
    youtube?: string
    linkedin?: string
    instagram?: string
  }
}
