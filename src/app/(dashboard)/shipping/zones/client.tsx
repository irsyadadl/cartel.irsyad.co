"use client"

import { useMemo, useState } from "react"
import {
  ArrowDownIcon,
  ArrowPathIcon,
  ChevronDownIcon,
  Cog8ToothIcon,
  EllipsisVerticalIcon,
  GlobeAltIcon,
  MapPinIcon,
  PlusIcon,
  QueueListIcon,
  TruckIcon,
  XCircleIcon,
} from "@heroicons/react/20/solid"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { SearchField } from "@/components/ui/search-field"
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select"
import { Tab, TabList, TabPanel, Tabs } from "@/components/ui/tabs"
import { Menu, MenuContent, MenuItem, MenuSeparator } from "@/components/ui/menu"
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
import { NumberField } from "@/components/ui/number-field"
import { TextField } from "@/components/ui/text-field"
import { ComboBox, ComboBoxContent, ComboBoxInput, ComboBoxItem } from "@/components/ui/combo-box"
import { SectionAction, SectionContent, SectionHeader } from "@/components/section-header"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardHeader } from "@/components/ui/card"

type Zone = {
  id: string
  name: string
  scope: "domestic" | "international"
  regions: string
  countriesCount: number
  carriers: string[]
  services: string[]
  avgEtaDays: number
  onTimeRate: number
  rules: string
  lastUpdated: string
  status: "active" | "inactive"
}

const zones: Zone[] = [
  {
    id: "zn_01",
    name: "EU Core",
    scope: "international",
    regions: "EU (Schengen)",
    countriesCount: 24,
    carriers: ["DHL", "UPS", "DPD"],
    services: ["Express", "Economy"],
    avgEtaDays: 3.4,
    onTimeRate: 95.2,
    rules: "Tiered by weight",
    lastUpdated: "2025-08-18 14:12",
    status: "active",
  },
  {
    id: "zn_02",
    name: "US Mainland",
    scope: "domestic",
    regions: "Contiguous US",
    countriesCount: 1,
    carriers: ["UPS", "USPS", "FedEx"],
    services: ["Ground", "2 Day", "Overnight"],
    avgEtaDays: 2.1,
    onTimeRate: 97.8,
    rules: "Dimensional after 1 ft³",
    lastUpdated: "2025-08-17 09:02",
    status: "active",
  },
  {
    id: "zn_03",
    name: "APAC Priority",
    scope: "international",
    regions: "JP, KR, SG, AU",
    countriesCount: 4,
    carriers: ["SF Express", "DHL"],
    services: ["Priority"],
    avgEtaDays: 4.2,
    onTimeRate: 92.6,
    rules: "Battery restricted",
    lastUpdated: "2025-08-19 11:40",
    status: "active",
  },
  {
    id: "zn_04",
    name: "Nordics Home",
    scope: "international",
    regions: "NO, SE, FI, DK",
    countriesCount: 4,
    carriers: ["PostNord", "DHL"],
    services: ["Home", "Pickup point"],
    avgEtaDays: 3.9,
    onTimeRate: 90.4,
    rules: "Remote surcharge",
    lastUpdated: "2025-08-15 16:28",
    status: "inactive",
  },
]

function StatusBadge({ v }: { v: Zone["status"] }) {
  return v === "active" ? (
    <Badge intent="success">Active</Badge>
  ) : (
    <Badge intent="danger">Inactive</Badge>
  )
}

function CarrierChips({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-1">
      {items.map((c) => (
        <Badge key={c} intent="secondary">
          {c}
        </Badge>
      ))}
    </div>
  )
}

function ServiceChips({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-1">
      {items.map((s) => (
        <Badge key={s} intent="secondary">
          {s}
        </Badge>
      ))}
    </div>
  )
}

export function Client() {
  const [openInspector, setOpenInspector] = useState(false)
  const [editing, setEditing] = useState<Zone | null>(null)
  const [query] = useState("")
  const [scope] = useState<"all" | "domestic" | "international">("all")
  const list = useMemo(() => {
    let l = zones
    if (scope !== "all") l = l.filter((z) => z.scope === scope)
    if (query.trim()) {
      const x = query.toLowerCase()
      l = l.filter((z) => z.name.toLowerCase().includes(x) || z.regions.toLowerCase().includes(x))
    }
    return l
  }, [query, scope])

  return (
    <>
      <SectionHeader>
        <SectionContent className="flex-row gap-x-2">
          <Modal>
            <Button>
              <PlusIcon className="size-4" />
              New
            </Button>
            <ModalContent size="lg">
              {({ close }) => (
                <>
                  <ModalHeader>
                    <ModalTitle>Create zone</ModalTitle>
                    <ModalDescription>
                      Define the coverage, carriers, services, and rates for this new shipping zone.
                    </ModalDescription>
                  </ModalHeader>
                  <ModalBody>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <TextField label="Zone name" placeholder="e.g. EU Core" />
                      <Select label="Scope">
                        <SelectTrigger />
                        <SelectContent>
                          <SelectItem id="domestic">Domestic</SelectItem>
                          <SelectItem id="international">International</SelectItem>
                        </SelectContent>
                      </Select>
                      <TextField label="Regions" placeholder="e.g. EU (Schengen)" />
                      <NumberField label="Countries" defaultValue={1} />
                    </div>
                  </ModalBody>
                  <ModalFooter>
                    <ModalClose>Cancel</ModalClose>
                    <Button onPress={() => close()}>Create zone</Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        </SectionContent>
        <SectionAction>
          <SearchField className="min-w-40" aria-label="Search zones" placeholder="Search..." />
          <Menu>
            <Button intent="outline">
              More...
              <ChevronDownIcon className="size-4" />
            </Button>
            <MenuContent placement="bottom end">
              <MenuItem>
                <ArrowPathIcon className="size-4" />
                Refresh rates
              </MenuItem>
              <MenuSeparator />
              <MenuItem>
                <ArrowDownIcon className="size-4" />
                Import zones
              </MenuItem>
            </MenuContent>
          </Menu>
        </SectionAction>
      </SectionHeader>

      <Tabs>
        <TabList>
          <Tab id="all">All</Tab>
          <Tab id="domestic">Domestic</Tab>
          <Tab id="international">International</Tab>
        </TabList>
        <TabPanel id="all">
          <ZoneGrid
            items={list}
            onOpen={(z) => {
              setEditing(z)
              setOpenInspector(true)
            }}
          />
        </TabPanel>
        <TabPanel id="domestic">
          <ZoneGrid
            items={list.filter((z) => z.scope === "domestic")}
            onOpen={(z) => {
              setEditing(z)
              setOpenInspector(true)
            }}
          />
        </TabPanel>
        <TabPanel id="international">
          <ZoneGrid
            items={list.filter((z) => z.scope === "international")}
            onOpen={(z) => {
              setEditing(z)
              setOpenInspector(true)
            }}
          />
        </TabPanel>
      </Tabs>

      <Sheet isOpen={openInspector} onOpenChange={setOpenInspector}>
        <SheetContent side="right" className="sm:max-w-xl">
          <SheetHeader>
            <SheetTitle>{editing?.name}</SheetTitle>
            <SheetDescription>
              Configure scope, coverage, carriers, services, and rates.
            </SheetDescription>
          </SheetHeader>
          <SheetBody>
            <div className="divide-y *:py-8 *:first:pt-0 *:last:pb-0">
              <section>
                <CardHeader
                  className="mb-2 px-0"
                  title="Coverage"
                  description="Define the geographical coverage of this shipping zone."
                />
                <div className="grid gap-4 sm:grid-cols-2">
                  <Select label="Scope" defaultSelectedKey={editing?.scope}>
                    <SelectTrigger />
                    <SelectContent>
                      <SelectItem id="domestic">Domestic</SelectItem>
                      <SelectItem id="international">International</SelectItem>
                    </SelectContent>
                  </Select>
                  <TextField label="Regions" defaultValue={editing?.regions} />
                </div>
                <div className="mt-3 grid gap-4 sm:grid-cols-2">
                  <ComboBox label="Add country">
                    <ComboBoxInput placeholder="Type to search country" />
                    <ComboBoxContent
                      items={[
                        { id: "DE", name: "Germany" },
                        { id: "FR", name: "France" },
                        {
                          id: "IT",
                          name: "Italy",
                        },
                        { id: "ES", name: "Spain" },
                        { id: "NL", name: "Netherlands" },
                      ]}
                    >
                      {(item: any) => <ComboBoxItem id={item.id}>{item.name}</ComboBoxItem>}
                    </ComboBoxContent>
                  </ComboBox>
                  <TextField label="Tags" placeholder="e.g. remote, fragile" />
                </div>
              </section>

              <section>
                <CardHeader
                  className="mb-2 px-0"
                  title="Carriers and services"
                  description="Select which carriers and services are available for this zone."
                />
                <div className="grid gap-4 sm:grid-cols-2">
                  <TextField label="Carriers" defaultValue={(editing?.carriers || []).join(", ")} />
                  <TextField label="Services" defaultValue={(editing?.services || []).join(", ")} />
                </div>
                <div className="mt-3 text-muted-fg text-sm">
                  Enable or disable at the rule level in Rates.
                </div>
              </section>

              <section>
                <CardHeader
                  className="mb-2 px-0"
                  title="Rates"
                  description="Define shipping rates based on weight, price, or other criteria."
                />
                <Select placeholder="Type" label="Rate type" defaultSelectedKey="weight">
                  <SelectTrigger />
                  <SelectContent>
                    <SelectItem id="flat">Flat</SelectItem>
                    <SelectItem id="weight">Weight based</SelectItem>
                    <SelectItem id="price">Price based</SelectItem>
                    <SelectItem id="eta">ETA based</SelectItem>
                  </SelectContent>
                </Select>
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <NumberField
                    label="Min weight"
                    formatOptions={{
                      style: "unit",
                      unit: "kilogram",
                    }}
                    defaultValue={0}
                  />
                  <NumberField
                    label="Max weight"
                    formatOptions={{
                      style: "unit",
                      unit: "kilogram",
                    }}
                    defaultValue={5}
                  />
                  <NumberField label="Base rate" defaultValue={9.9} />
                  <NumberField label="Per kg" defaultValue={1.2} />
                  <NumberField label="Surcharge" defaultValue={0} />
                </div>
                <div className="mt-4 flex gap-2">
                  <Button intent="outline">
                    <PlusIcon /> Add rule
                  </Button>
                  <Button intent="outline">
                    <QueueListIcon className="size-4" />
                    Duplicate last
                  </Button>
                </div>
              </section>

              <Textarea label="Note" placeholder="Internal note" />
            </div>
          </SheetBody>
          <SheetFooter>
            <SheetClose>Close</SheetClose>
            <Button>Save changes</Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  )
}

function ZoneGrid({ items, onOpen }: { items: Zone[]; onOpen: (z: Zone) => void }) {
  if (items.length === 0) {
    return (
      <div className="rounded-lg border border-border bg-white p-12 text-center text-muted-fg">
        No zones match the current filters.
      </div>
    )
  }
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {items.map((z) => {
        return (
          <div key={z.id} className="relative rounded-lg bg-gray-100 p-4 transition">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">{z.name}</span>
                  <StatusBadge v={z.status} />
                </div>
                <div className="text-muted-fg text-xs">{z.lastUpdated}</div>
              </div>
              <Menu>
                <Button
                  size="sq-sm"
                  intent="plain"
                  className="w-4 pressed:bg-white pressed:shadow-xs hover:bg-white hover:shadow-xs"
                  aria-label="open menu"
                >
                  <EllipsisVerticalIcon />
                </Button>
                <MenuContent placement="bottom end">
                  <MenuItem onAction={() => onOpen(z)}>
                    <Cog8ToothIcon />
                    Configure
                  </MenuItem>
                  <MenuItem>
                    <QueueListIcon />
                    Clone
                  </MenuItem>
                  <MenuSeparator />
                  <MenuItem isDanger>
                    <XCircleIcon />
                    Disable
                  </MenuItem>
                </MenuContent>
              </Menu>
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-2">
              <span className="text-muted-fg text-sm/6">{z.scope}</span>
              <div className="flex items-center gap-1 text-muted-fg text-sm">
                <MapPinIcon className="size-4" />
                <span>{z.regions}</span>
              </div>
              <div className="text-muted-fg text-sm">• {z.countriesCount} countries</div>
            </div>

            <Card className="mt-2 flex flex-col gap-y-2 divide-y overflow-hidden bg-white py-0 *:p-3">
              <div>
                <div className="mb-2 flex items-center gap-1 text-muted-fg text-xs">
                  <TruckIcon className="size-3.5" />
                  Carriers
                </div>
                <CarrierChips items={z.carriers} />
              </div>
              <div>
                <div className="mb-2 flex items-center gap-1 text-muted-fg text-xs">
                  <GlobeAltIcon className="size-3.5" />
                  Services
                </div>
                <ServiceChips items={z.services} />
              </div>
            </Card>

            <Card className="mt-2 grid grid-cols-2 items-center divide-x bg-white py-0 text-sm *:p-3">
              <div>
                <div className="text-muted-fg text-xs">Avg ETA</div>
                <div className="font-medium">{z.avgEtaDays} days</div>
              </div>
              <div>
                <div className="text-muted-fg text-xs">On time</div>
                <div className="font-medium">{z.onTimeRate}%</div>
              </div>
            </Card>

            <div className="mt-2 flex items-center justify-between">
              <Button size="sm" intent="secondary" className="bg-white" onPress={() => onOpen(z)}>
                <Cog8ToothIcon />
                Configure
              </Button>
              <div className="truncate text-muted-fg text-xs">{z.rules}</div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
