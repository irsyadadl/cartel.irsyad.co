"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import products from "@/data/products.json"
import { Badge } from "@/components/ui/badge"
import { formatNumber } from "@/lib/number"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
export function ListProducts() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Products</CardTitle>
        <CardDescription>A list of products associated with this order.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table aria-label="Products" className="[--gutter:--spacing(6)]" bleed>
          <TableHeader>
            <TableColumn className="w-0">#</TableColumn>
            <TableColumn isRowHeader>SKU</TableColumn>
            <TableColumn>Name</TableColumn>
            <TableColumn>Color</TableColumn>
            <TableColumn>Material</TableColumn>
            <TableColumn>Price</TableColumn>
            <TableColumn>Status</TableColumn>
          </TableHeader>
          <TableBody items={products.slice(0, 4)}>
            {(item) => (
              <TableRow id={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell>
                  <Badge intent="secondary">{item.sku}</Badge>
                </TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.color}</TableCell>
                <TableCell>{item.material}</TableCell>
                <TableCell>
                  {formatNumber(item.price, { currency: "USD", style: "currency" })}
                </TableCell>
                <TableCell>
                  <Badge
                    intent={
                      item.status === "active"
                        ? "primary"
                        : ["archived", "draft"].includes(item.status)
                          ? "secondary"
                          : "danger"
                    }
                  >
                    {item.status}
                  </Badge>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
