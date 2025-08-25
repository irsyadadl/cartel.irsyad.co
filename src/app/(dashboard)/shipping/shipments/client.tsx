"use client"

import { useState } from "react"
import type { Selection } from "react-aria-components"
import {
  ArrowDownTrayIcon,
  ArrowPathIcon,
  CalendarDaysIcon,
  CheckCircleIcon,
  ClipboardDocumentListIcon,
  ClockIcon,
  EllipsisVerticalIcon,
  EnvelopeIcon,
  ExclamationTriangleIcon,
  PhoneIcon,
  PrinterIcon,
  TruckIcon,
} from "@heroicons/react/24/solid"
import { BanknotesIcon } from "@heroicons/react/24/outline"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DateRangePicker } from "@/components/ui/date-range-picker"
import { SearchField } from "@/components/ui/search-field"
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select"
import { Tab, TabList, TabPanel, Tabs } from "@/components/ui/tabs"
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Modal,
  ModalBody,
  ModalClose,
  ModalContent,
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from "@/components/ui/modal"
import { Textarea } from "@/components/ui/textarea"
import { Paginate } from "@/components/paginate"
import { Menu, MenuContent, MenuItem, MenuLabel, MenuSeparator } from "@/components/ui/menu"
import { getLocalTimeZone, today } from "@internationalized/date"
import { ChevronDownIcon } from "@heroicons/react/20/solid"
import {
  Sheet,
  SheetBody,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { ArrowUpTrayIcon, CloudArrowDownIcon } from "@heroicons/react/16/solid"
import { CsvIcon } from "@/components/icons/csv-icon"
import { ExcelIcon } from "@/components/icons/excel-icon"
import { SectionAction, SectionContent, SectionHeader } from "@/components/section-header"
import { Toolbar, ToolbarButton, ToolbarSection, ToolbarText } from "@/components/ui/toolbar"
import { RollingNumber } from "@/components/ui/rolling-number"
import { AnimatePresence } from "motion/react"

type Shipment = {
  id: string
  createdAt: string
  order: string
  tracking: string
  carrier: string
  service: string
  origin: string
  destination: string
  items: number
  weightKg: number
  estDelivery: string
  cost: number
  status: "in_transit" | "delivered" | "delayed" | "exception"
  recipient: string
}

const shipments: Shipment[] = [
  {
    id: "shp_01",
    createdAt: "2025-08-19 09:14",
    order: "100231",
    tracking: "1Z8V23X0193845027",
    carrier: "UPS",
    service: "Worldwide Expedited",
    origin: "Leipzig, DE",
    destination: "Seattle, US",
    items: 3,
    weightKg: 5.4,
    estDelivery: "2025-08-25",
    cost: 42.8,
    status: "in_transit",
    recipient: "Lena Fischer",
  },
  {
    id: "shp_02",
    createdAt: "2025-08-18 16:02",
    order: "100230",
    tracking: "SF1234500199JP",
    carrier: "SF Express",
    service: "International Economy",
    origin: "Tokyo, JP",
    destination: "Sydney, AU",
    items: 1,
    weightKg: 1.1,
    estDelivery: "2025-08-24",
    cost: 18.2,
    status: "delayed",
    recipient: "Kenji Sato",
  },
  {
    id: "shp_03",
    createdAt: "2025-08-18 10:21",
    order: "100229",
    tracking: "CH9876500123",
    carrier: "DHL",
    service: "Express Worldwide",
    origin: "Paris, FR",
    destination: "Lyon, FR",
    items: 2,
    weightKg: 0.9,
    estDelivery: "2025-08-19",
    cost: 9.5,
    status: "delivered",
    recipient: "Louis Martin",
  },
  {
    id: "shp_04",
    createdAt: "2025-08-17 13:45",
    order: "100228",
    tracking: "PO-EXC-442199",
    carrier: "PostNord",
    service: "MyPack Home",
    origin: "Oslo, NO",
    destination: "Bergen, NO",
    items: 5,
    weightKg: 7.2,
    estDelivery: "2025-08-20",
    cost: 16.7,
    status: "exception",
    recipient: "Eva Nilsen",
  },
  {
    id: "shp_05",
    createdAt: "2025-08-20 11:09",
    order: "100232",
    tracking: "ROYAL-GB-7722101",
    carrier: "Royal Mail",
    service: "Tracked 24",
    origin: "London, GB",
    destination: "Leeds, GB",
    items: 1,
    weightKg: 0.5,
    estDelivery: "2025-08-21",
    cost: 5.6,
    status: "in_transit",
    recipient: "Ava Wilson",
  },
]

function StatusBadge({ v }: { v: Shipment["status"] }) {
  if (v === "delivered") return <Badge intent="success">Delivered</Badge>
  if (v === "in_transit") return <Badge>In transit</Badge>
  if (v === "delayed") return <Badge intent="warning">Delayed</Badge>
  return <Badge intent="danger">Exception</Badge>
}

function KPI({
  icon,
  label,
  value,
  sub,
}: {
  icon: React.ReactNode
  label: string
  value: string
  sub?: string
}) {
  return (
    <div className="rounded-xl border border-border bg-white p-4 sm:p-5">
      <div className="flex items-center gap-3">
        <span className="grid size-10 place-content-center rounded-lg bg-muted text-fg">
          {icon}
        </span>
        <div className="flex-1">
          <div className="text-muted-fg text-sm">{label}</div>
          <div className="font-semibold text-xl">{value}</div>
          {sub ? <div className="text-muted-fg text-xs">{sub}</div> : null}
        </div>
      </div>
    </div>
  )
}

export function Client() {
  const [open, setOpen] = useState(false)
  const [active, _] = useState<Shipment | null>(null)
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set())
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
        <KPI icon={<TruckIcon className="size-5" />} label="In transit" value="12" />
        <KPI icon={<CheckCircleIcon className="size-5" />} label="Delivered (7d)" value="86" />
        <KPI icon={<ClockIcon className="size-5" />} label="Delayed" value="3" />
        <KPI icon={<ExclamationTriangleIcon className="size-5" />} label="Exceptions" value="2" />
        <KPI
          icon={<CalendarDaysIcon className="size-5" />}
          label="Avg transit time"
          value="3.2 days"
        />
        <KPI icon={<ArrowPathIcon className="size-5" />} label="On-time rate" value="94.1%" />
      </div>

      <SectionHeader>
        <SectionContent>
          <DateRangePicker
            aria-label="Select date range"
            contentPlacement="bottom end"
            defaultValue={{
              start: today(getLocalTimeZone()).subtract({
                days: 30,
              }),
              end: today(getLocalTimeZone()),
            }}
            className="ml-auto"
          />
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
          <Sheet>
            <Button intent="outline">
              Filter
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={16}
                height={16}
                fill="none"
                viewBox="0 0 24 25"
                className="intentui-icons size-4"
                data-slot="icon"
                aria-hidden="true"
              >
                <path
                  fill="currentColor"
                  fillRule="evenodd"
                  d="M22 5.5a.75.75 0 0 0-.75-.75H2.75A.75.75 0 0 0 2 5.5V20c0 .414.336.75.75.75h18.5A.75.75 0 0 0 22 20zm-7 .75v13H3.5v-13z"
                  clipRule="evenodd"
                />
              </svg>
            </Button>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Filter</SheetTitle>
                <SheetDescription>
                  Use the filters below to narrow down the shipments list.
                </SheetDescription>
              </SheetHeader>
              <SheetBody>
                <div className="flex flex-col gap-y-4">
                  <Select placeholder="Select status" aria-label="Status" defaultSelectedKey="any">
                    <SelectTrigger />
                    <SelectContent>
                      <SelectItem id="any">Any</SelectItem>
                      <SelectItem id="in_transit">In transit</SelectItem>
                      <SelectItem id="delivered">Delivered</SelectItem>
                      <SelectItem id="delayed">Delayed</SelectItem>
                      <SelectItem id="exception">Exception</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select
                    placeholder="Select carrier"
                    aria-label="Carrier"
                    defaultSelectedKey="any"
                  >
                    <SelectTrigger />
                    <SelectContent>
                      <SelectItem id="any">Any</SelectItem>
                      <SelectItem id="UPS">UPS</SelectItem>
                      <SelectItem id="DHL">DHL</SelectItem>
                      <SelectItem id="Royal Mail">Royal Mail</SelectItem>
                      <SelectItem id="PostNord">PostNord</SelectItem>
                      <SelectItem id="SF Express">SF Express</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select
                    placeholder="Select service"
                    aria-label="Service"
                    defaultSelectedKey="any"
                  >
                    <SelectTrigger />
                    <SelectContent>
                      <SelectItem id="any">Any</SelectItem>
                      <SelectItem id="Worldwide Expedited">Worldwide Expedited</SelectItem>
                      <SelectItem id="Express Worldwide">Express Worldwide</SelectItem>
                      <SelectItem id="Tracked 24">Tracked 24</SelectItem>
                      <SelectItem id="MyPack Home">MyPack Home</SelectItem>
                      <SelectItem id="International Economy">International Economy</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select placeholder="Select zone" aria-label="Zone" defaultSelectedKey="EU">
                    <SelectTrigger />
                    <SelectContent>
                      <SelectItem id="any">Any</SelectItem>
                      <SelectItem id="EU">EU</SelectItem>
                      <SelectItem id="US">US</SelectItem>
                      <SelectItem id="APAC">APAC</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select
                    placeholder="Select warehouse"
                    aria-label="Warehouse"
                    defaultSelectedKey="any"
                  >
                    <SelectTrigger />
                    <SelectContent>
                      <SelectItem id="any">Any</SelectItem>
                      <SelectItem id="Leipzig DC">Leipzig DC</SelectItem>
                      <SelectItem id="Tokyo DC">Tokyo DC</SelectItem>
                      <SelectItem id="London DC">London DC</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select placeholder="Select tags" aria-label="Tags" defaultSelectedKey="any">
                    <SelectTrigger />
                    <SelectContent>
                      <SelectItem id="any">Any</SelectItem>
                      <SelectItem id="gift">gift</SelectItem>
                      <SelectItem id="fragile">fragile</SelectItem>
                      <SelectItem id="priority">priority</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </SheetBody>
              <SheetFooter>
                <SheetClose>Clear all</SheetClose>
                <Button>Apply filters</Button>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </SectionAction>
      </SectionHeader>

      <Tabs defaultSelectedKey="all" className="w-full">
        <TabList>
          <Tab id="all">All</Tab>
          <Tab id="delayed">Delayed</Tab>
          <Tab id="exceptions">Exceptions</Tab>
        </TabList>
        <TabPanel id="all">
          <div>
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
                      <PrinterIcon className="size-4" />
                      Print labels
                    </ToolbarButton>
                    <ToolbarButton>
                      <TruckIcon className="size-4" />
                      Schedule pickup
                    </ToolbarButton>
                    <ToolbarButton>
                      <EnvelopeIcon className="size-4" />
                      Notify customers
                    </ToolbarButton>
                  </ToolbarSection>
                </Toolbar>
              )}
            </AnimatePresence>

            <Table
              className="mb-6"
              aria-label="Shipments"
              selectionMode="multiple"
              selectedKeys={selectedKeys}
              onSelectionChange={setSelectedKeys}
            >
              <TableHeader
                columns={[
                  { id: "created", name: "Created" },
                  { id: "order", name: "Order" },
                  { id: "tracking", name: "Tracking" },
                  { id: "carrier", name: "Carrier & service" },
                  { id: "route", name: "Origin → destination" },
                  { id: "items", name: "Items" },
                  { id: "weight", name: "Weight" },
                  { id: "eta", name: "Est. delivery" },
                  { id: "cost", name: "Cost" },
                  { id: "status", name: "Status" },
                  { id: "actions", name: "" },
                ]}
              >
                {(column) => <TableColumn id={column.id}>{column.name}</TableColumn>}
              </TableHeader>

              <TableBody items={shipments}>
                {(item) => (
                  <TableRow>
                    <TableCell>
                      <div className="flex min-w-36 flex-col">
                        <span className="text-fg">{item.createdAt}</span>
                        <span className="text-muted-fg text-xs">ID {item.id}</span>
                      </div>
                    </TableCell>

                    <TableCell>
                      <div className="leading-tight">
                        <div className="font-medium">Order #{item.order}</div>
                        <div className="text-muted-fg text-xs">{item.recipient}</div>
                      </div>
                    </TableCell>

                    <TableCell>{item.tracking}</TableCell>

                    <TableCell>
                      <div className="min-w-40">
                        <div className="font-medium">{item.carrier}</div>
                        <div className="text-muted-fg text-xs">{item.service}</div>
                      </div>
                    </TableCell>

                    <TableCell>
                      <div className="min-w-48">
                        <div className="font-medium">{item.origin}</div>
                        <div className="text-muted-fg text-xs">{item.destination}</div>
                      </div>
                    </TableCell>

                    <TableCell className="tabular-nums">{item.items}</TableCell>
                    <TableCell className="tabular-nums">{item.weightKg.toFixed(1)} kg</TableCell>
                    <TableCell className="min-w-28">{item.estDelivery}</TableCell>
                    <TableCell className="min-w-24 tabular-nums">${item.cost.toFixed(2)}</TableCell>
                    <TableCell className="min-w-28">
                      <StatusBadge v={item.status} />
                    </TableCell>

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
                          <MenuItem>View details</MenuItem>
                          <MenuItem>Reprint label</MenuItem>
                          <MenuItem>Update tracking</MenuItem>
                          <MenuItem>Mark delivered</MenuItem>
                          <MenuItem>Create return</MenuItem>
                          <MenuItem>Contact carrier</MenuItem>
                        </MenuContent>
                      </Menu>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>

            <Paginate from={11} to={20} total={300} />
          </div>
        </TabPanel>

        <TabPanel id="delayed">
          <div className="rounded-xl border border-border bg-white p-8 text-center text-muted-fg">
            No delayed shipments in the current view.
          </div>
        </TabPanel>

        <TabPanel id="exceptions">
          <div className="rounded-xl border border-border bg-white p-8 text-center text-muted-fg">
            No exceptions in the current view.
          </div>
        </TabPanel>
      </Tabs>
      <Modal isOpen={open} onOpenChange={setOpen}>
        <ModalContent size="4xl">
          <ModalHeader>
            <ModalTitle>Shipment details</ModalTitle>
            <ModalDescription>{active?.tracking}</ModalDescription>
          </ModalHeader>
          <ModalBody>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              <div className="space-y-6 lg:col-span-2">
                <section className="rounded-xl border p-4">
                  <div className="mb-3 font-medium">Timeline</div>
                  <ol className="space-y-3 text-sm">
                    <li className="flex items-start gap-3">
                      <CheckCircleIcon className="mt-0.5 size-4 text-emerald-600" />
                      <div>
                        <div>Label created</div>
                        <div className="text-muted-fg text-xs">2025-08-18 09:12</div>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <TruckIcon className="mt-0.5 size-4" />
                      <div>
                        <div>Picked up by carrier</div>
                        <div className="text-muted-fg text-xs">2025-08-18 12:33</div>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <ClockIcon className="mt-0.5 size-4" />
                      <div>
                        <div>In transit</div>
                        <div className="text-muted-fg text-xs">2025-08-19 07:02</div>
                      </div>
                    </li>
                  </ol>
                </section>

                <section className="rounded-xl border p-4">
                  <div className="mb-3 font-medium">Package contents</div>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center justify-between">
                      <span>Wireless earbuds</span>
                      <span className="text-muted-fg">x1</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span>Travel pouch</span>
                      <span className="text-muted-fg">x2</span>
                    </li>
                  </ul>
                </section>

                <section className="rounded-xl border p-4">
                  <div className="mb-3 font-medium">Fees and surcharges</div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span>Postage</span>
                      <span>$11.80</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Fuel surcharge</span>
                      <span>$1.42</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Insurance</span>
                      <span>$0.90</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Handling</span>
                      <span>$0.60</span>
                    </div>
                  </div>
                </section>
              </div>

              <div className="space-y-6">
                <section className="rounded-xl border p-4">
                  <div className="mb-3 font-medium">Label file</div>
                  <div className="flex items-center justify-between gap-2">
                    <div className="text-muted-fg text-sm">PDF 4x6 thermal</div>
                    <Button intent="outline" className="gap-2">
                      <ArrowDownTrayIcon className="size-4" />
                      Download
                    </Button>
                  </div>
                </section>

                <section className="rounded-xl border p-4">
                  <div className="mb-3 font-medium">Customs data</div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span>Declared value</span>
                      <span>$129.00</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>HS code</span>
                      <span>8518.30</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Origin</span>
                      <span>DE</span>
                    </div>
                  </div>
                </section>

                <section className="rounded-xl border p-4">
                  <div className="mb-3 font-medium">Notes</div>
                  <Textarea placeholder="Add an internal note" />
                </section>

                <section className="rounded-xl border p-4">
                  <div className="mb-3 font-medium">Activity log</div>
                  <ul className="space-y-2 text-sm">
                    <li>2025-08-18 09:10 Created by system</li>
                    <li>2025-08-18 09:12 Label purchased</li>
                    <li>2025-08-18 12:33 Pickup scheduled</li>
                  </ul>
                </section>
              </div>
            </div>
          </ModalBody>
          <ModalFooter className="flex items-center justify-between">
            <div className="text-muted-fg text-sm">
              Order #{active?.order} • {active?.recipient}
            </div>
            <div className="flex items-center gap-2">
              <Button intent="outline" className="gap-2">
                <PrinterIcon className="size-4" />
                Reprint label
              </Button>
              <Button intent="outline" className="gap-2">
                <ClipboardDocumentListIcon className="size-4" />
                Update tracking
              </Button>
              <Button intent="outline" className="gap-2">
                <CheckCircleIcon className="size-4" />
                Mark delivered
              </Button>
              <Button intent="outline" className="gap-2">
                <BanknotesIcon className="size-4" />
                Create return
              </Button>
              <Button intent="outline" className="gap-2">
                <PhoneIcon className="size-4" />
                Contact carrier
              </Button>
              <ModalClose>Close</ModalClose>
            </div>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}
