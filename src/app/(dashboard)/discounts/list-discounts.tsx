"use client"

import {
  ClipboardDocumentIcon,
  ClipboardIcon,
  EllipsisVerticalIcon,
  IdentificationIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/solid"
import discounts from "@/data/discounts.json"
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
import {
  ArrowUpTrayIcon,
  CheckCircleIcon,
  CloudArrowDownIcon,
  PlusIcon,
  TagIcon,
} from "@heroicons/react/16/solid"
import { Paginate } from "@/components/paginate"
import { ExcelIcon } from "@/components/icons/excel-icon"
import { CsvIcon } from "@/components/icons/csv-icon"
import { AlertDialog } from "@/components/alert-dialog"
import { Link } from "@/components/ui/link"
import {
  PauseCircleIcon,
  CalendarDaysIcon,
  AdjustmentsHorizontalIcon,
  ArrowDownTrayIcon,
  ChevronDownIcon,
} from "@heroicons/react/20/solid"

const config = {
  activate: {
    title: "Activate discount",
    description: "Are you sure you want to activate this discount?",
    submitText: "Activate",
  },
  delete: {
    title: "Delete discount",
    description: "Are you sure you want to delete this discount? This action cannot be undone.",
    submitText: "Delete",
  },
  deactivate: {
    title: "Deactivate discount",
    description: "Are you sure you want to deactivate this discount?",
    submitText: "Deactivate",
  },
} as const

export function ListDiscounts() {
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set())
  const [action, setAction] = useState<"activate" | "delete" | "deactivate" | null>(null)
  return (
    <>
      <SectionHeader>
        <SectionContent className="flex-row gap-x-2">
          {[...selectedKeys].length > 0 && (
            <Menu>
              <Button intent="outline">
                Bulk actions ({selectedKeys === "all" ? "All 10 items" : [...selectedKeys].length})
                <ChevronDownIcon />
              </Button>
              <MenuContent placement="bottom start" className="min-w-48">
                <MenuItem>
                  <CheckCircleIcon />
                  <MenuLabel>Activate</MenuLabel>
                </MenuItem>
                <MenuItem>
                  <PauseCircleIcon />
                  <MenuLabel>Pause</MenuLabel>
                </MenuItem>

                <MenuSeparator />

                <MenuItem>
                  <CalendarDaysIcon />
                  <MenuLabel>Set end date</MenuLabel>
                </MenuItem>
                <MenuItem>
                  <AdjustmentsHorizontalIcon />
                  <MenuLabel>Set usage limit</MenuLabel>
                </MenuItem>
                <MenuItem>
                  <TagIcon />
                  <MenuLabel>Add tags</MenuLabel>
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
          <Link href="/discounts/create" className={buttonStyles()}>
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
        aria-label="Discounts"
      >
        <TableHeader>
          <TableColumn className="w-0">#</TableColumn>
          <TableColumn isRowHeader>Code</TableColumn>
          <TableColumn>Name</TableColumn>
          <TableColumn>Type</TableColumn>
          <TableColumn>Value</TableColumn>
          <TableColumn>Usage</TableColumn>
          <TableColumn>Start date</TableColumn>
          <TableColumn>End date</TableColumn>
          <TableColumn>Status</TableColumn>
          <TableColumn className="sticky right-0 z-10 bg-linear-to-l from-60% from-white text-end" />
        </TableHeader>
        <TableBody items={discounts}>
          {(item) => (
            <TableRow id={item.id}>
              <TableCell>{item.id}</TableCell>
              <TableCell>
                <Badge intent="secondary">{item.code}</Badge>
              </TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>
                <Badge intent="secondary">{item.type.replace("_", " ")}</Badge>
              </TableCell>
              <TableCell>
                {item.type === "percentage" ? `${item.value}%` : `$${item.value}`}
              </TableCell>
              <TableCell>
                {item.usage_count} {item.usage_count > 150 && "🔥"}
              </TableCell>
              <TableCell>{formatDate(item.start_date)}</TableCell>
              <TableCell>
                {item.end_date ? (
                  formatDate(item.end_date)
                ) : (
                  <span className="text-gray-500">Unlimited</span>
                )}
              </TableCell>
              <TableCell>
                <Badge
                  intent={
                    item.status === "active"
                      ? "primary"
                      : item.status === "scheduled"
                        ? "secondary"
                        : "danger"
                  }
                >
                  {item.status}
                </Badge>
              </TableCell>
              <TableCell className="sticky right-0 z-10 bg-linear-to-l from-60% from-bg text-end">
                <Menu>
                  <Button size="sq-sm" className="sm:size-6" intent="plain">
                    <EllipsisVerticalIcon />
                  </Button>
                  <MenuContent placement="left top" className="min-w-48">
                    <MenuItem href={`/discounts/${item.id}`}>
                      <IdentificationIcon />
                      <MenuLabel>View discount</MenuLabel>
                    </MenuItem>
                    <MenuItem href={`/discounts/${item.id}/edit`}>
                      <PencilSquareIcon />
                      <MenuLabel>Edit discount</MenuLabel>
                    </MenuItem>
                    <MenuSeparator />
                    <MenuItem onAction={() => navigator.clipboard.writeText(item.code)}>
                      <ClipboardIcon />
                      <MenuLabel>Copy code</MenuLabel>
                    </MenuItem>
                    <MenuItem onAction={() => navigator.clipboard.writeText(item.id.toString())}>
                      <ClipboardDocumentIcon />
                      <MenuLabel>Copy discount ID</MenuLabel>
                    </MenuItem>
                    <MenuSeparator />
                    {item.status === "active" ? (
                      <MenuItem onAction={() => setAction("deactivate")}>
                        <TagIcon />
                        <MenuLabel>Deactivate</MenuLabel>
                      </MenuItem>
                    ) : (
                      <MenuItem onAction={() => setAction("activate")}>
                        <TagIcon />
                        <MenuLabel>Activate</MenuLabel>
                      </MenuItem>
                    )}
                    <MenuItem isDanger onAction={() => setAction("delete")}>
                      <TrashIcon />
                      <MenuLabel>Delete discount</MenuLabel>
                    </MenuItem>
                  </MenuContent>
                </Menu>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <Paginate from={21} to={30} total={325} />

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
