import type { TeamMember } from "./types"

// Placeholder portraits from the pravatar service; the coloured-initials
// AvatarFallback (matching the Figma circles) shows if an image can't load.
const photo = (n: number) => `https://i.pravatar.cc/300?img=${n}`

export const team: TeamMember[] = [
  { name: "Hani Buskila", role: "Senior UI UX Designer", initials: "HB", color: "bg-emerald-500", photo: photo(5) },
  { name: "Tal Rosen", role: "Co-Founder & CEO", initials: "TR", color: "bg-blue-500", photo: photo(12) },
  { name: "Noa Meir", role: "Co-Founder & COO", initials: "NM", color: "bg-pink-500", photo: photo(45) },
  { name: "Daniel Cohen", role: "Senior UI UX Designer", initials: "DC", color: "bg-emerald-500", photo: photo(33) },
  { name: "Maya Levi", role: "Senior UI UX Designer", initials: "ML", color: "bg-violet-500", photo: photo(47) },
  { name: "Jon Ashkenazi", role: "Front-End Developer", initials: "JA", color: "bg-amber-500", photo: photo(60) },
  { name: "Amit Katz", role: "AI Engineer", initials: "AK", color: "bg-teal-500", photo: photo(15) },
  { name: "Shira Barak", role: "Product Manager", initials: "SB", color: "bg-rose-500", photo: photo(49) },
]
