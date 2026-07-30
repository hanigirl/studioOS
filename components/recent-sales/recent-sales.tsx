import Image from "next/image"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table"
import { sales } from "./data"

export function RecentSales() {
  return (
    <Card className="transition-[transform,box-shadow] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:shadow-md">
      <CardHeader>
        <CardTitle>Recent Sales</CardTitle>
        <CardDescription>You made 265 sales this month.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableBody>
            {sales.map((sale) => (
              <TableRow
                key={sale.name}
                className="border-0 hover:bg-transparent"
              >
                <TableCell className="p-2">
                  <div className="flex items-center gap-3">
                    <Image
                      src={sale.logo}
                      alt={sale.name}
                      className="size-9 shrink-0 object-contain"
                    />
                    <div className="grid gap-0.5">
                      <span className="text-sm leading-none font-medium">
                        {sale.name}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {sale.email}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="p-2 text-right font-medium">
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
