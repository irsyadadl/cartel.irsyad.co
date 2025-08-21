"use client"

import {
  ClipboardDocumentIcon,
  ClipboardIcon,
  EllipsisVerticalIcon,
  IdentificationIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/20/solid"
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
  ChevronUpDownIcon,
  CloudArrowDownIcon,
  EyeIcon,
  EyeSlashIcon,
  PlusIcon,
  StarIcon,
} from "@heroicons/react/16/solid"
import { Paginate } from "@/components/paginate"
import { formatNumber } from "@/lib/number"
import { Avatar } from "@/components/ui/avatar"
import { Stats } from "./stats"
import { ExcelIcon } from "@/components/icons/excel-icon"
import { CsvIcon } from "@/components/icons/csv-icon"
import { Link } from "@/components/ui/link"

export function ListProducts() {
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set())

  return (
    <>
      <Stats />

      <SectionHeader>
        <SectionContent>
          <Link href="/dashboard/products/create" className={buttonStyles()}>
            <PlusIcon />
            New product
          </Link>
        </SectionContent>
        <SectionAction>
          <SearchField className="Search..." />
          <Menu>
            <Button intent="outline">
              Export
              <ChevronUpDownIcon />
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
                  <Button size="sq-sm" className="sm:size-6" intent="plain">
                    <EllipsisVerticalIcon />
                  </Button>
                  <MenuContent placement="left top" className="min-w-48">
                    <MenuItem href={`/dashboard/products/${item.id}`}>
                      <IdentificationIcon />
                      <MenuLabel>View product</MenuLabel>
                    </MenuItem>
                    <MenuItem href={`/dashboard/products/${item.id}/edit`}>
                      <PencilSquareIcon />
                      <MenuLabel>Edit product</MenuLabel>
                    </MenuItem>
                    <MenuItem href={`/dashboard/inventory/${item.id}`}>
                      <ArchiveBoxIcon />
                      <MenuLabel>Adjust inventory</MenuLabel>
                    </MenuItem>
                    <MenuItem href={`/dashboard/collections/add?product=${item.id}`}>
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
                      <MenuItem href="#">
                        <EyeSlashIcon />
                        <MenuLabel>Unpublish</MenuLabel>
                      </MenuItem>
                    ) : (
                      <MenuItem href="#">
                        <EyeIcon />
                        <MenuLabel>Publish</MenuLabel>
                      </MenuItem>
                    )}
                    <MenuItem isDanger href="#">
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
    </>
  )
}
