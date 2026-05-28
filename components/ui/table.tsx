import * as React from "react"
import { cn } from "@/lib/utils"

function Table({ className, ...props }: React.HTMLAttributes<HTMLTableElement>) {
  return (
    <table
      data-slot="table"
      className={cn("w-full text-sm", className)}
      {...props}
    />
  )
}

function TableHeader({ className, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) {
  return <thead data-slot="table-header" className={cn(className)} {...props} />
}

function TableBody({ className, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) {
  return <tbody data-slot="table-body" className={cn(className)} {...props} />
}

function TableRow({ className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) {
  return (
    <tr
      data-slot="table-row"
      className={cn("group", className)}
      {...props}
    />
  )
}

function TableHead({ className, ...props }: React.ThHTMLAttributes<HTMLTableCellElement>) {
  return (
    <th
      data-slot="table-head"
      className={cn("px-3 py-2 text-left text-xs font-medium text-foreground", className)}
      {...props}
    />
  )
}

function TableCell({ className, ...props }: React.TdHTMLAttributes<HTMLTableCellElement>) {
  return (
    <td
      data-slot="table-cell"
      className={cn("px-3 py-4 transition-colors group-hover:bg-muted/40", className)}
      {...props}
    />
  )
}

export { Table, TableHeader, TableBody, TableRow, TableHead, TableCell }
