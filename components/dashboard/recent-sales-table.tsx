import Image, { type StaticImageData } from "next/image"
import fiverrLogo from "@/public/logos/fiverr.png"
import metaLogo from "@/public/logos/meta.png"
import mondayLogo from "@/public/logos/monday.png"
import slackLogo from "@/public/logos/slack.png"
import wixLogo from "@/public/logos/wix.png"
import zoomLogo from "@/public/logos/zoom.png"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"

interface Sale {
  company: string
  email: string
  amount: string
  logo: StaticImageData
}

const sales: Sale[] = [
  { company: "Monday", email: "billing@monday.com", amount: "+$1,999.00", logo: mondayLogo },
  { company: "Fiverr", email: "payments@fiverr.com", amount: "+$39.00", logo: fiverrLogo },
  { company: "Slack", email: "invoices@slack.com", amount: "+$299.00", logo: slackLogo },
  { company: "Wix", email: "finance@wix.com", amount: "+$99.00", logo: wixLogo },
  { company: "Meta", email: "ads@meta.com", amount: "+$39.00", logo: metaLogo },
  { company: "Zoom", email: "enterprise@zoom.us", amount: "+$149.00", logo: zoomLogo },
]

export function RecentSalesTable({ className }: { className?: string }) {
  return (
    <Card
      className={cn(
        "transition-[transform,box-shadow] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:shadow-md",
        className
      )}
    >
      <CardHeader>
        <CardTitle>Recent Sales</CardTitle>
        <CardDescription>You made 265 sales this month.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableCaption className="text-left text-xs">
            The six most recent completed purchases — the buying company, the
            billing contact we invoiced, and the net amount received.
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Company</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sales.map((sale) => (
              <TableRow key={sale.company}>
                <TableCell className="py-3">
                  <div className="flex items-center gap-3">
                    <Image
                      src={sale.logo}
                      alt=""
                      aria-hidden
                      className="size-8 shrink-0 object-contain"
                    />
                    <div className="min-w-0">
                      <p className="font-medium leading-none">{sale.company}</p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {sale.email}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="py-3 text-right font-medium tabular-nums">
                  {sale.amount}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
