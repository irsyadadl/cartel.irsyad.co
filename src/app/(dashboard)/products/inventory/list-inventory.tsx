"use client"

import { useMemo, useState } from "react"
import type { Selection } from "react-aria-components"
import {
  ArrowsRightLeftIcon,
  ChevronDownIcon,
  WrenchScrewdriverIcon,
} from "@heroicons/react/20/solid"
import {
  EllipsisVerticalIcon,
  IdentificationIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/solid"
import { ArrowUpTrayIcon, PlusIcon } from "@heroicons/react/16/solid"

import products from "@/data/products.json"

import { Badge } from "@/components/ui/badge"
import { Button, buttonStyles } from "@/components/ui/button"
import { Avatar } from "@/components/ui/avatar"
import { Link } from "@/components/ui/link"
import { Menu, MenuContent, MenuItem, MenuLabel, MenuSeparator } from "@/components/ui/menu"
import { SearchField } from "@/components/ui/search-field"
import { SectionAction, SectionContent, SectionHeader } from "@/components/section-header"
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Paginate } from "@/components/paginate"
import { AlertDialog } from "@/components/alert-dialog"
import { CsvIcon } from "@/components/icons/csv-icon"
import { ExcelIcon } from "@/components/icons/excel-icon"
import { formatDate } from "@/lib/date"
import { formatNumber } from "@/lib/number"
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select"
import {
  Modal,
  ModalBody,
  ModalClose,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@/components/ui/modal"
import { NumberField } from "@/components/ui/number-field"
import { DatePicker } from "@/components/ui/date-picker"
import { Textarea } from "@/components/ui/textarea"
import { AnimatePresence } from "motion/react"
import {
  Toolbar,
  ToolbarButton,
  ToolbarSection,
  ToolbarSeparator,
  ToolbarText,
} from "@/components/ui/toolbar"
import { RollingNumber } from "@/components/ui/rolling-number"

export function ListInventory() {
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set())
  const [transferOpen, setTransferOpen] = useState(false)
  const [action, setAction] = useState<"deleteSingle" | null>(null)
  const rows = useMemo(() => {
    return products.map((p) => {
      const on_hand = Math.max(0, p.stock)
      const committed = Math.min(p.sold_count, on_hand)
      const available = Math.max(on_hand - committed, 0)
      const incoming = Math.round(on_hand * 0.05)
      const status = available <= 0 ? "out_of_stock" : available < 10 ? "low" : "ok"

      return {
        id: String(p.id),
        product_id: p.id,
        sku: p.sku,
        name: p.name,
        brand: p.brand,
        thumbnail: p.thumbnail,
        location_id: "all",
        location_name: "All locations",
        on_hand,
        committed,
        available,
        incoming,
        status,
        updated_at: p.updated_at || p.created_at,
      }
    })
  }, [])

  const selectedIds = useMemo(
    () =>
      selectedKeys === "all" ? rows.map((r) => r.id) : Array.from(selectedKeys as Set<string>),
    [selectedKeys, rows],
  )

  return (
    <>
      <SectionHeader>
        <SectionContent className="flex-row gap-x-2">
          <AnimatePresence initial={false}>
            {[...selectedKeys].length > 0 && (
              <Toolbar className="hidden sm:block" key="bulk-toolbar">
                <ToolbarSection>
                  <ToolbarText className="flex items-center">
                    Bulk actions{" "}
                    {selectedKeys === "all" ? (
                      "All 10 items"
                    ) : (
                      <>
                        (<RollingNumber value={[...selectedKeys].length} height={24} />
                        <span className="ml-1">items</span>)
                      </>
                    )}
                  </ToolbarText>
                </ToolbarSection>
                <ToolbarSection className="mt-2">
                  <ToolbarButton>
                    <WrenchScrewdriverIcon />
                    Adjust stock
                  </ToolbarButton>
                  <ToolbarButton>
                    <ArrowsRightLeftIcon />
                    Transfer stock
                  </ToolbarButton>

                  <ToolbarSeparator />
                  <Menu>
                    <ToolbarButton>
                      <ArrowUpTrayIcon />
                      Export...
                      <ChevronDownIcon />
                    </ToolbarButton>
                    <MenuContent placement="top">
                      <MenuItem>
                        <CsvIcon />
                        <MenuLabel>Export as CSV</MenuLabel>
                      </MenuItem>
                      <MenuItem>
                        <ExcelIcon />
                        <MenuLabel>Export as Excel</MenuLabel>
                      </MenuItem>
                    </MenuContent>
                  </Menu>
                  <ToolbarSeparator />
                  <ToolbarButton intent="danger">
                    <TrashIcon />
                    Delete
                  </ToolbarButton>
                </ToolbarSection>
              </Toolbar>
            )}
          </AnimatePresence>
          {[...selectedKeys].length > 0 && (
            <Menu>
              <Button intent="outline" className="sm:hidden">
                Bulk actions ({selectedKeys === "all" ? "10" : [...selectedKeys].length})
                <ChevronDownIcon />
              </Button>
              <MenuContent placement="bottom start">
                <MenuItem>
                  <WrenchScrewdriverIcon />
                  <MenuLabel>Adjust stock</MenuLabel>
                </MenuItem>
                <MenuItem>
                  <ArrowsRightLeftIcon />
                  <MenuLabel>Transfer stock</MenuLabel>
                </MenuItem>
                <MenuSeparator />
                <MenuItem isDanger>
                  <TrashIcon />
                  <MenuLabel>Delete</MenuLabel>
                </MenuItem>
              </MenuContent>
            </Menu>
          )}
          <Link href="/products/inventory/adjust" className={buttonStyles()}>
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
            </MenuContent>
          </Menu>
        </SectionAction>
      </SectionHeader>

      <Table
        selectionMode="multiple"
        selectedKeys={selectedKeys}
        onSelectionChange={setSelectedKeys}
        aria-label="Inventory"
      >
        <TableHeader>
          <TableColumn className="w-0">#</TableColumn>
          <TableColumn isRowHeader>SKU</TableColumn>
          <TableColumn>Product</TableColumn>
          <TableColumn>Location</TableColumn>
          <TableColumn>On hand</TableColumn>
          <TableColumn>Committed</TableColumn>
          <TableColumn>Available</TableColumn>
          <TableColumn>Incoming</TableColumn>
          <TableColumn>Status</TableColumn>
          <TableColumn>Updated at</TableColumn>
          <TableColumn className="sticky right-0 z-10 bg-linear-to-l from-60% from-white text-end" />
        </TableHeader>

        <TableBody items={rows}>
          {(item) => (
            <TableRow id={item.id}>
              <TableCell>{item.product_id}</TableCell>
              <TableCell>
                <Badge intent="secondary">{item.sku}</Badge>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-x-3">
                  <Avatar className="size-9 *:size-9" isSquare src={item.thumbnail} />
                  <div className="flex flex-col">
                    <span className="font-medium text-fg text-sm/5">{item.name}</span>
                    <span className="text-muted-fg text-xs">{item.brand}</span>
                  </div>
                </div>
              </TableCell>
              <TableCell>{item.location_name}</TableCell>
              <TableCell>{formatNumber(item.on_hand)}</TableCell>
              <TableCell>{formatNumber(item.committed)}</TableCell>
              <TableCell>{formatNumber(item.available)}</TableCell>
              <TableCell>{formatNumber(item.incoming)}</TableCell>
              <TableCell>
                <Badge
                  intent={
                    item.status === "ok" ? "primary" : item.status === "low" ? "warning" : "danger"
                  }
                >
                  {item.status === "ok"
                    ? "in stock"
                    : item.status === "low"
                      ? "low"
                      : "out of stock"}
                </Badge>
              </TableCell>
              <TableCell>{formatDate(item.updated_at)}</TableCell>

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
                    <MenuItem href={`/products/inventory/adjust/${item.sku}`}>
                      <WrenchScrewdriverIcon />
                      <MenuLabel>Adjust inventory</MenuLabel>
                    </MenuItem>
                    <MenuItem onAction={() => setTransferOpen(true)}>
                      <ArrowsRightLeftIcon />
                      <MenuLabel>Transfer stock</MenuLabel>
                    </MenuItem>
                    <MenuSeparator />
                    <MenuItem href={`/products/${item.product_id}`}>
                      <IdentificationIcon />
                      <MenuLabel>View product</MenuLabel>
                    </MenuItem>
                    <MenuItem href={`/products/${item.product_id}/edit`}>
                      <PencilSquareIcon />
                      <MenuLabel>Edit product</MenuLabel>
                    </MenuItem>
                    <MenuSeparator />
                    <MenuItem isDanger onAction={() => setAction("deleteSingle")}>
                      <TrashIcon />
                      <MenuLabel>Delete item</MenuLabel>
                    </MenuItem>
                  </MenuContent>
                </Menu>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <Paginate from={21} to={30} total={rows.length} />

      {action && (
        <AlertDialog
          isOpen={!!action}
          onOpenChange={(v) => !v && setAction(null)}
          title="Delete inventory item"
          description="Are you sure you want to delete this inventory item? This action cannot be undone."
          intent={action.startsWith("delete") ? "danger" : "primary"}
        />
      )}

      {transferOpen && (
        <Modal
          defaultOpen
          onOpenChange={(o) => {
            if (!o) setTransferOpen(false)
          }}
        >
          <ModalContent>
            <ModalHeader
              title="Transfer stock"
              description="Move selected stock between locations."
            />
            <ModalBody className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <Select label="From location" defaultSelectedKey="warehouse-1">
                  <SelectTrigger />
                  <SelectContent>
                    <SelectItem id="warehouse-1">Warehouse 1</SelectItem>
                    <SelectItem id="store-1">Store 1</SelectItem>
                  </SelectContent>
                </Select>
                <Select label="To location" defaultSelectedKey="store-1">
                  <SelectTrigger />
                  <SelectContent>
                    <SelectItem id="store-1">Store 1</SelectItem>
                    <SelectItem id="warehouse-1">Warehouse 1</SelectItem>
                  </SelectContent>
                </Select>
                <NumberField label="Quantity per item" minValue={1} defaultValue={1} />
                <DatePicker label="Transfer date" />
              </div>
              <Textarea label="Reference" placeholder="Reference or note" />
              <p className="text-muted-fg text-sm">
                {selectedIds.length > 0
                  ? `${selectedIds.length} items selected`
                  : "No items selected"}
              </p>
            </ModalBody>
            <ModalFooter className="gap-2">
              <Button onPress={() => setTransferOpen(false)} intent="outline">
                Cancel
              </Button>
              <Button onPress={() => setTransferOpen(false)}>Transfer</Button>
            </ModalFooter>
            <ModalClose />
          </ModalContent>
        </Modal>
      )}
    </>
  )
}
