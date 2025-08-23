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
export function ListProducts() {
  return (
    <Table aria-label="Products">
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
  )
}
