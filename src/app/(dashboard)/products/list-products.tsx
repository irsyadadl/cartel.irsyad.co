"use client"

import {
  ClipboardDocumentIcon,
  ClipboardIcon,
  EllipsisVerticalIcon,
  IdentificationIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/solid"
import products from "@/data/products.json"
import type { Selection } from "react-aria-components"

import { Button, buttonStyles } from "@/components/ui/button"
import { Menu, MenuContent, MenuItem, MenuLabel, MenuSeparator } from "@/components/ui/menu"
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { formatDate } from "@/lib/date"
import { SearchField } from "@/components/ui/search-field"
import { useState } from "react"
import { SectionAction, SectionContent, SectionHeader } from "@/components/section-header"
import { Badge } from "@/components/ui/badge"
import { ArchiveBoxIcon, CheckCircleIcon, RectangleGroupIcon } from "@heroicons/react/24/solid"
import {
  ArrowUpTrayIcon,
  CloudArrowDownIcon,
  EyeIcon,
  EyeSlashIcon,
  PlusIcon,
  StarIcon,
  TagIcon,
} from "@heroicons/react/16/solid"
import { Paginate } from "@/components/paginate"
import { formatNumber } from "@/lib/number"
import { Avatar } from "@/components/ui/avatar"
import { Stats } from "./stats"
import { ExcelIcon } from "@/components/icons/excel-icon"
import { CsvIcon } from "@/components/icons/csv-icon"
import { Link } from "@/components/ui/link"
import { AlertDialog } from "@/components/alert-dialog"
import {
  ArrowDownTrayIcon,
  ChevronDownIcon,
  PauseCircleIcon,
  RectangleStackIcon,
} from "@heroicons/react/20/solid"

const config = {
  publish: {
    title: "Publish product",
    description:
      "Are you sure you want to publish this product? Customers will be able to view and purchase it.",
    submitText: "Publish",
  },
  delete: {
    title: "Delete product",
    description: "Are you sure you want to delete this product? This action cannot be undone.",
    submitText: "Delete",
  },
  unpublish: {
    title: "Unpublish product",
    description:
      "Are you sure you want to unpublish this product? Customers will no longer be able to purchase it.",
    submitText: "Unpublish",
  },
} as const

export function ListProducts() {
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set())
  const [action, setAction] = useState<"publish" | "delete" | "unpublish" | null>(null)

  return (
    <>
      <Stats />

      <SectionHeader>
        <SectionContent className="flex-row gap-x-2">
          {[...selectedKeys].length > 0 && (
            <Menu>
              <Button intent="outline">
                Bulk actions (
                {selectedKeys === "all" ? "All 10 products" : [...selectedKeys].length})
                <ChevronDownIcon />
              </Button>
              <MenuContent className="min-w-48" placement="bottom start">
                <MenuItem>
                  <CheckCircleIcon fill="#51A2FF" />
                  <MenuLabel>Publish</MenuLabel>
                </MenuItem>
                <MenuItem>
                  <PauseCircleIcon fill="#FFD230" />
                  <MenuLabel>Unpublish</MenuLabel>
                </MenuItem>

                <MenuSeparator />

                <MenuItem>
                  <TagIcon />
                  <MenuLabel>Add tags</MenuLabel>
                </MenuItem>
                <MenuItem>
                  <RectangleStackIcon />
                  <MenuLabel>Assign to category</MenuLabel>
                </MenuItem>

                <MenuSeparator />

                <MenuItem>
                  <ArrowDownTrayIcon />
                  <MenuLabel>Export CSV</MenuLabel>
                </MenuItem>
                <MenuItem isDanger>
                  <TrashIcon />
                  <MenuLabel>Delete</MenuLabel>
                </MenuItem>
              </MenuContent>
            </Menu>
          )}

          <Link href="/products/create" className={buttonStyles()}>
            <PlusIcon />
            New
          </Link>
        </SectionContent>
        <SectionAction>
          <SearchField className="Search..." />
          <Menu>
            <Button intent="outline">
              <ArrowUpTrayIcon />
              Export...
              <ChevronDownIcon />
            </Button>
            <MenuContent placement="bottom end">
              <MenuItem>
                <CsvIcon />
                <MenuLabel>Export as CSV</MenuLabel>
              </MenuItem>
              <MenuItem>
                <ExcelIcon />
                <MenuLabel>Export as Excel</MenuLabel>
              </MenuItem>
              <MenuSeparator />
              <MenuItem>
                <CheckCircleIcon fill="#51A2FF" />
                <MenuLabel>Export selected</MenuLabel>
              </MenuItem>
              <MenuItem>
                <CloudArrowDownIcon />
                <MenuLabel>Export all</MenuLabel>
              </MenuItem>
            </MenuContent>
          </Menu>
        </SectionAction>
      </SectionHeader>

      <Table
        selectionMode="multiple"
        selectedKeys={selectedKeys}
        onSelectionChange={setSelectedKeys}
        aria-label="Products"
      >
        <TableHeader>
          <TableColumn className="w-0">#</TableColumn>
          <TableColumn isRowHeader>SKU</TableColumn>
          <TableColumn>Name</TableColumn>
          <TableColumn>Brand</TableColumn>
          <TableColumn>Price</TableColumn>
          <TableColumn>Stock</TableColumn>
          <TableColumn>Status</TableColumn>
          <TableColumn>Rating</TableColumn>
          <TableColumn>Sold count</TableColumn>
          <TableColumn>Created at</TableColumn>
          <TableColumn className="sticky right-0 z-10 bg-linear-to-l from-60% from-white text-end" />
        </TableHeader>
        <TableBody items={products}>
          {(item) => (
            <TableRow id={item.id}>
              <TableCell>{item.id}</TableCell>
              <TableCell>
                <Badge intent="secondary">{item.sku}</Badge>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-x-3">
                  <Avatar className="size-9 *:size-9" isSquare src={item.thumbnail} />
                  <div className="flex flex-col">
                    <span className="font-medium text-fg text-sm/5">{item.name}</span>
                    <span className="text-muted-fg text-xs">{item.material}</span>
                  </div>
                </div>
              </TableCell>
              <TableCell>{item.brand}</TableCell>
              <TableCell>
                {formatNumber(item.price, {
                  currency: "USD",
                  style: "currency",
                })}
              </TableCell>
              <TableCell>{item.stock}</TableCell>
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
              <TableCell>
                <span className="flex items-center gap-1">
                  <StarIcon className="size-3.5 text-primary" />
                  {item.rating}
                </span>
              </TableCell>
              <TableCell>{item.sold_count}</TableCell>
              <TableCell>{formatDate(item.created_at)}</TableCell>
              <TableCell className="sticky right-0 z-10 bg-linear-to-l from-60% from-bg text-end">
                <Menu>
                  <Button
                    size="sq-sm"
                    className="sm:size-6"
                    intent="plain"
                    aria-label="open action"
                  >
                    <EllipsisVerticalIcon />
                  </Button>
                  <MenuContent placement="left top" className="min-w-48">
                    <MenuItem href={`/products/${item.id}`}>
                      <IdentificationIcon />
                      <MenuLabel>View product</MenuLabel>
                    </MenuItem>
                    <MenuItem href={`/products/${item.id}/edit`}>
                      <PencilSquareIcon />
                      <MenuLabel>Edit product</MenuLabel>
                    </MenuItem>
                    <MenuItem href="#">
                      <ArchiveBoxIcon />
                      <MenuLabel>Adjust inventory</MenuLabel>
                    </MenuItem>
                    <MenuItem href="#">
                      <RectangleGroupIcon />
                      <MenuLabel>Add to collection</MenuLabel>
                    </MenuItem>
                    <MenuSeparator />
                    <MenuItem onAction={() => navigator.clipboard.writeText(item.sku)}>
                      <ClipboardIcon />
                      <MenuLabel>Copy SKU</MenuLabel>
                    </MenuItem>
                    <MenuItem onAction={() => navigator.clipboard.writeText(item.id.toString())}>
                      <ClipboardDocumentIcon />
                      <MenuLabel>Copy product ID</MenuLabel>
                    </MenuItem>
                    <MenuSeparator />
                    {item.status === "active" ? (
                      <MenuItem onAction={() => setAction("unpublish")}>
                        <EyeSlashIcon />
                        <MenuLabel>Unpublish</MenuLabel>
                      </MenuItem>
                    ) : (
                      <MenuItem onAction={() => setAction("publish")}>
                        <EyeIcon />
                        <MenuLabel>Publish</MenuLabel>
                      </MenuItem>
                    )}
                    <MenuItem isDanger onAction={() => setAction("delete")}>
                      <TrashIcon />
                      <MenuLabel>Delete product</MenuLabel>
                    </MenuItem>
                  </MenuContent>
                </Menu>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <Paginate from={21} to={30} total={1325} />

      {action && (
        <AlertDialog
          isOpen={!!action}
          onOpenChange={(v) => !v && setAction(null)}
          title={config[action].title}
          description={config[action].description}
          submitText={config[action].submitText}
          intent={action === "delete" ? "danger" : "primary"}
        />
      )}
    </>
  )
}
