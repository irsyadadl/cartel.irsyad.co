"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Link } from "@/components/ui/link"
import orders from "@/data/orders.json"
import { formatDate } from "@/lib/date"
import { formatNumber } from "@/lib/number"

export function LatestOrder() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Latest orders</CardTitle>
        <CardDescription>View the most recent orders placed by customers.</CardDescription>
      </CardHeader>
      <CardContent className="[--card-p:var(--gutter)]">
        <Table aria-label="Latest orders" bleed className="[--gutter:var(--card-p)]">
          <TableHeader>
            <TableColumn isRowHeader>Order number</TableColumn>
            <TableColumn>Ordered at</TableColumn>
            <TableColumn>Customer email</TableColumn>
            <TableColumn>Status</TableColumn>
            <TableColumn>Items</TableColumn>
            <TableColumn>Total price</TableColumn>
            <TableColumn />
          </TableHeader>
          <TableBody items={orders}>
            {(item) => (
              <TableRow id={item.id}>
                <TableCell>
                  <Badge intent="secondary">{item.order_number}</Badge>
                </TableCell>
                <TableCell className="text-fg/50">{formatDate(item.ordered_at)}</TableCell>
                <TableCell>{item.customer_email}</TableCell>
                <TableCell>
                  <Badge
                    intent={
                      (
                        {
                          pending: "warning",
                          paid: "success",
                          shipped: "info",
                          cancelled: "danger",
                          refunded: "secondary",
                        } as any
                      )[item.status] ?? "outline"
                    }
                  >
                    {item.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  {item.items.length} item{item.items.length > 1 ? "s" : ""}
                </TableCell>
                <TableCell>
                  {formatNumber(item.total_price, {
                    currency: "USD",
                    style: "currency",
                  })}
                </TableCell>

                <TableCell className="text-end">
                  <Link
                    className="font-semibold text-primary-subtle-fg hover:underline"
                    href={`/(dashboard)/orders/${item.id}`}
                  >
                    View order
                  </Link>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
