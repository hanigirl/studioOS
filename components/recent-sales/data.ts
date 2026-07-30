import type { StaticImageData } from "next/image"
import monday from "@/public/logos/monday.png"
import fiverr from "@/public/logos/fiverr.png"
import slack from "@/public/logos/slack.png"
import wix from "@/public/logos/wix.png"
import meta from "@/public/logos/meta.png"
import zoom from "@/public/logos/zoom.png"

export interface Sale {
  name: string
  email: string
  amount: string
  logo: StaticImageData
}

export const sales: Sale[] = [
  {
    name: "Monday",
    email: "billing@monday.com",
    amount: "+$1,999.00",
    logo: monday,
  },
  {
    name: "Fiverr",
    email: "payments@fiverr.com",
    amount: "+$39.00",
    logo: fiverr,
  },
  {
    name: "Slack",
    email: "invoices@slack.com",
    amount: "+$299.00",
    logo: slack,
  },
  {
    name: "Wix",
    email: "finance@wix.com",
    amount: "+$99.00",
    logo: wix,
  },
  {
    name: "Meta",
    email: "ads@meta.com",
    amount: "+$39.00",
    logo: meta,
  },
  {
    name: "Zoom",
    email: "enterprise@zoom.us",
    amount: "+$149.00",
    logo: zoom,
  },
]
