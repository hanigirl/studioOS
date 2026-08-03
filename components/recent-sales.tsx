import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const sales = [
  { name: "Monday", email: "billing@monday.com", amount: "+$1,999.00", logo: "/logos/monday.png" },
  { name: "Fiverr", email: "payments@fiverr.com", amount: "+$39.00", logo: "/logos/fiverr.png" },
  { name: "Slack", email: "invoices@slack.com", amount: "+$299.00", logo: "/logos/slack.png" },
  { name: "Wix", email: "finance@wix.com", amount: "+$99.00", logo: "/logos/wix.png" },
  { name: "Meta", email: "ads@meta.com", amount: "+$39.00", logo: "/logos/meta.png" },
  { name: "Zoom", email: "enterprise@zoom.us", amount: "+$149.00", logo: "/logos/zoom.png" },
]

export function RecentSales() {
  return (
    <Card className="transition-[transform,box-shadow] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:shadow-md">
      <CardHeader>
        <CardTitle>Recent Sales</CardTitle>
        <CardDescription>You made 265 sales this month.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {sales.map((sale) => (
            <div key={sale.name} className="flex items-center gap-4">
              <Avatar size="lg">
                <AvatarImage
                  src={sale.logo}
                  alt={sale.name}
                  className="object-contain"
                />
                <AvatarFallback>{sale.name[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold leading-none">{sale.name}</p>
                <p className="text-sm text-muted-foreground mt-1 truncate">
                  {sale.email}
                </p>
              </div>
              <span className="shrink-0 text-sm font-semibold">
                {sale.amount}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
