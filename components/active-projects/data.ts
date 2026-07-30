import type { StaticImageData } from "next/image"
import monday from "@/public/logos/monday.png"
import fiverr from "@/public/logos/fiverr.png"
import slack from "@/public/logos/slack.png"
import wix from "@/public/logos/wix.png"
import meta from "@/public/logos/meta.png"
import zoom from "@/public/logos/zoom.png"

export type ProjectStage = "In Progress" | "In Review"

export interface ActiveProject {
  name: string
  client: string
  logo: StaticImageData
  status: ProjectStage
  deadline: string
}

export const activeProjects: ActiveProject[] = [
  {
    name: "App Redesign",
    client: "Wix",
    logo: wix,
    status: "In Progress",
    deadline: "Apr 12",
  },
  {
    name: "Brand Identity",
    client: "Monday",
    logo: monday,
    status: "In Review",
    deadline: "Apr 5",
  },
  {
    name: "Marketing Kit",
    client: "Fiverr",
    logo: fiverr,
    status: "In Progress",
    deadline: "Apr 18",
  },
  {
    name: "Dashboard UI",
    client: "Slack",
    logo: slack,
    status: "In Review",
    deadline: "Apr 2",
  },
  {
    name: "Social Templates",
    client: "Meta",
    logo: meta,
    status: "In Progress",
    deadline: "Apr 24",
  },
  {
    name: "Landing Page",
    client: "Zoom",
    logo: zoom,
    status: "In Progress",
    deadline: "Apr 30",
  },
]
