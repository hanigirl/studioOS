import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const sales = [
  {
    name: "Monday",
    email: "billing@monday.com",
    amount: "+$1,999.00",
    avatar: "/studioOS/logos/monday.png",
  },
  {
    name: "Fiverr",
    email: "payments@fiverr.com",
    amount: "+$39.00",
    avatar: "/studioOS/logos/fiverr.png",
  },
  {
    name: "Slack",
    email: "invoices@slack.com",
    amount: "+$299.00",
    avatar: "/studioOS/logos/slack.png",
  },
  {
    name: "Wix",
    email: "finance@wix.com",
    amount: "+$99.00",
    avatar: "/studioOS/logos/wix.png",
  },
  {
    name: "Meta",
    email: "ads@meta.com",
    amount: "+$39.00",
    avatar: "/studioOS/logos/meta.png",
  },
  {
    name: "Zoom",
    email: "enterprise@zoom.us",
    amount: "+$149.00",
    avatar: "/studioOS/logos/zoom.png",
  },
]

export function RecentSales() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Sales</CardTitle>
        <CardDescription>You made 265 sales this month.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {sales.map((sale) => (
            <div key={sale.email} className="flex items-center gap-4">
              <Avatar>
                <AvatarImage src={sale.avatar} alt={sale.name} />
                <AvatarFallback>
                  {sale.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium leading-none">{sale.name}</p>
                <p className="text-sm text-muted-foreground mt-1 truncate">
                  {sale.email}
                </p>
              </div>
              <div className="text-sm font-medium">{sale.amount}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
