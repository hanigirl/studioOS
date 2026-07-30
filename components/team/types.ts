export interface TeamMember {
  name: string
  role: string
  initials: string
  /** Tailwind bg-*-500 for the initials fallback circle (matches Figma). */
  color: string
  /** Placeholder portrait; falls back to the coloured initials circle. */
  photo: string
}
