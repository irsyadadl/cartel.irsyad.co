"use client"

import {
  BanknotesIcon,
  InformationCircleIcon,
  ReceiptRefundIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/solid"
import { useMemo, useState } from "react"
import { type DateValue, getLocalTimeZone, today } from "@internationalized/date"
import { twMerge } from "tailwind-merge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { AreaChart } from "@/components/ui/area-chart"
import { BarChart } from "@/components/ui/bar-chart"
import { LineChart } from "@/components/ui/line-chart"
import { Button } from "@/components/ui/button"
import { Menu, MenuContent, MenuItem, MenuLabel } from "@/components/ui/menu"
import { CsvIcon } from "@/components/icons/csv-icon"
import { ExcelIcon } from "@/components/icons/excel-icon"
import { DateRangePicker } from "@/components/ui/date-range-picker"
import { formatKilo } from "@/lib/number"
import { ArrowUpTrayIcon } from "@heroicons/react/16/solid"
import { ChevronDownIcon } from "@heroicons/react/20/solid"
import { DetailLine, DetailLineItem } from "@/components/ui/details-line"
import { Tooltip, TooltipContent } from "@/components/ui/tooltip"
import { Pressable } from "react-aria-components"
import {
  SectionAction,
  SectionContent,
  SectionDescription,
  SectionHeader,
} from "@/components/section-header"
import { Heading } from "@/components/ui/heading"

function StatsShell(props: React.ComponentProps<"div">) {
  return <div className={twMerge("rounded-lg border bg-white", props.className)} {...props} />
}

function Stat({
  icon: Icon,
  label,
  value,
  helper,
  children,
  color,
}: {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  label: string
  value: string
  helper?: string
  children?: React.ReactNode
  color?: string
}) {
  return (
    <>
      <div className="flex flex-col gap-2">
        <div className="relative p-4">
          <div className="font-semibold text-2xl tabular-nums">{value}</div>
          <div className="mt-1 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon className={twMerge("size-5", color)} />
              <span className="text-muted-fg text-sm">{label}</span>
            </div>
            <Tooltip>
              <Pressable>
                <span role="button" className="absolute top-4 right-4">
                  <InformationCircleIcon className="size-4 text-muted-fg" />
                </span>
              </Pressable>
              <TooltipContent>
                {helper ? <span className="text-muted-fg text-xs">{helper}</span> : null}
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
        {children}
      </div>
    </>
  )
}

const months = [
  "September",
  "October",
  "November",
  "December",
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
]

const data = {
  sales: {
    gross: months.map((m, i) => ({
      month: m,
      value: [91210, 71240, 77230, 98210, 82420, 84560, 70340, 76980, 65110, 73540, 71950, 93240][
        i
      ],
    })),
    net: months.map((m, i) => ({
      month: m,
      value: [84210, 65840, 71230, 90410, 78020, 81560, 67340, 73980, 62110, 70540, 68950, 88240][
        i
      ],
    })),
    orders: months.map((m, i) => ({
      month: m,
      value: [1532, 1284, 1049, 1363, 1831, 1805, 1167, 1473, 886, 1382, 1025, 1759][i],
    })),
    refunds: months.map((m, i) => ({
      month: m,
      value: [2100, 1840, 1650, 2210, 1430, 1510, 1320, 1410, 1220, 1370, 1280, 1900][i],
    })),
  },
  inventory: {
    snapshot: [
      { bucket: "On hand", value: 128430 },
      { bucket: "Available", value: 107320 },
      { bucket: "Incoming", value: 8240 },
      { bucket: "Low stock", value: 1430 },
    ],
    adjustments: months.map((m, i) => ({
      month: m,
      added: [520, 410, 380, 610, 340, 360, 300, 330, 250, 290, 270, 480][i],
      removed: [420, 390, 360, 510, 300, 340, 270, 300, 240, 260, 250, 410][i],
    })),
  },
  fulfillment: {
    status: [
      { status: "Delivered", value: 6420 },
      { status: "In transit", value: 820 },
      { status: "Processing", value: 410 },
      { status: "Cancelled", value: 120 },
      { status: "Returned", value: 95 },
    ],
    sla: months.map((m, i) => ({
      month: m,
      value: [2.6, 2.9, 2.8, 2.5, 2.7, 2.6, 2.9, 2.8, 2.7, 2.6, 2.5, 2.4][i],
    })),
  },
  customers: {
    newVsReturning: months.map((m, i) => ({
      month: m,
      new: [820, 760, 790, 910, 680, 720, 650, 690, 600, 640, 610, 870][i],
      returning: [430, 390, 410, 470, 360, 380, 340, 370, 320, 360, 330, 470][i],
    })),
    clv: months.map((m, i) => ({
      month: m,
      value: [118, 121, 124, 132, 105, 109, 112, 115, 120, 119, 123, 131][i],
    })),
  },
}

const tz = getLocalTimeZone()
const toTS = (d: DateValue) => d.toDate(tz).getTime()
const buildLast12MonthAnchors = (end: DateValue) => {
  const arr: DateValue[] = []
  for (let i = 11; i >= 0; i--) arr.push(end.subtract({ months: i }).set({ day: 1 }))
  return arr
}

export function ReportsOverview() {
  const endDefault = today(tz)
  const startDefault = endDefault.subtract({ months: 5 })
  const [range, setRange] = useState<{ start: DateValue; end: DateValue }>({
    start: startDefault,
    end: endDefault,
  })

  const monthAnchors = useMemo(() => buildLast12MonthAnchors(range.end), [range.end])
  const visibleIdx = useMemo(
    () =>
      monthAnchors
        .map((d, i) => ({ d, i }))
        .filter(({ d }) => toTS(d) >= toTS(range.start) && toTS(d) <= toTS(range.end))
        .map(({ i }) => i),
    [monthAnchors, range],
  )
  const pick = <T,>(arr: T[]) => visibleIdx.map((i) => arr[i])

  const filtered = useMemo(
    () => ({
      months: pick(months),
      sales: {
        gross: pick(data.sales.gross),
        net: pick(data.sales.net),
        orders: pick(data.sales.orders),
        refunds: pick(data.sales.refunds),
      },
      inventory: {
        adjustments: pick(data.inventory.adjustments),
        snapshot: data.inventory.snapshot,
      },
      fulfillment: { sla: pick(data.fulfillment.sla), status: data.fulfillment.status },
      customers: {
        newVsReturning: pick(data.customers.newVsReturning),
        clv: pick(data.customers.clv),
      },
    }),
    [visibleIdx],
  )

  const totals = useMemo(() => {
    const sum = (xs: { value: number }[]) => xs.reduce((a, d) => a + d.value, 0)
    return {
      gross: sum(filtered.sales.gross),
      net: sum(filtered.sales.net),
      orders: sum(filtered.sales.orders),
      refunds: sum(filtered.sales.refunds),
    }
  }, [filtered])

  return (
    <>
      <SectionHeader>
        <SectionContent>
          <Heading>Reports</Heading>
          <SectionDescription>
            Track sales, inventory, fulfillment, and customer reports over time.
          </SectionDescription>
        </SectionContent>
        <SectionAction className="flex-col items-end gap-3 sm:flex-row">
          <DateRangePicker
            aria-label="Date range"
            value={range}
            onChange={(v) => v && setRange(v)}
            visibleDuration={{ months: 2 }}
          />
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

      <>
        <section className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-4">
          <StatsShell>
            <Stat
              icon={BanknotesIcon}
              label="Gross sales"
              value={`$${formatKilo(totals.gross)}`}
              helper="Total for range"
              color="text-emerald-500"
            >
              <AreaChart
                data={filtered.sales.gross}
                dataKey="month"
                legend={false}
                tooltip={false}
                hideGridLines
                hideXAxis
                hideYAxis
                className="h-12"
                config={{ value: { label: "Gross", color: "var(--color-emerald-500)" } }}
                valueFormatter={(v) => `$${formatKilo(v)}`}
              />
            </Stat>
          </StatsShell>

          <StatsShell>
            <Stat
              icon={BanknotesIcon}
              label="Net revenue"
              value={`$${formatKilo(totals.net)}`}
              helper="After refunds and fees"
              color="text-blue-500"
            >
              <AreaChart
                data={filtered.sales.net}
                dataKey="month"
                legend={false}
                tooltip={false}
                hideGridLines
                hideXAxis
                hideYAxis
                className="h-12"
                config={{ value: { label: "Net", color: "var(--color-blue-500)" } }}
                valueFormatter={(v) => `$${formatKilo(v)}`}
              />
            </Stat>
          </StatsShell>

          <StatsShell>
            <Stat
              icon={ShoppingBagIcon}
              label="Orders"
              value={formatKilo(totals.orders)}
              helper="Count for range"
              color="text-sky-500"
            >
              <AreaChart
                data={filtered.sales.orders}
                dataKey="month"
                legend={false}
                tooltip={false}
                hideGridLines
                hideXAxis
                hideYAxis
                className="h-12"
                config={{ value: { label: "Orders", color: "var(--color-sky-500)" } }}
                valueFormatter={(v) => formatKilo(v)}
              />
            </Stat>
          </StatsShell>

          <StatsShell>
            <Stat
              icon={ReceiptRefundIcon}
              label="Refunds"
              value={`$${formatKilo(totals.refunds)}`}
              helper="Processed amount"
              color="text-rose-500"
            >
              <AreaChart
                data={filtered.sales.refunds}
                dataKey="month"
                legend={false}
                tooltip={false}
                hideGridLines
                hideXAxis
                hideYAxis
                className="h-12"
                config={{ value: { label: "Refunds", color: "var(--color-rose-500)" } }}
                valueFormatter={(v) => `$${formatKilo(v)}`}
              />
            </Stat>
          </StatsShell>
        </section>

        <div className="space-y-4">
          <CardHeader
            title="Sales summary"
            description="Revenue, orders, refunds, and average order value summarized by period"
          />
          <section className="grid grid-cols-1 gap-4 xl:grid-cols-2">
            <Card className="col-span-full">
              <CardHeader title="Revenue by month" description="Gross vs net revenue" />
              <CardContent>
                <BarChart
                  data={filtered.months.map((m, i) => ({
                    month: m,
                    gross: filtered.sales.gross[i].value,
                    net: filtered.sales.net[i].value,
                  }))}
                  dataKey="month"
                  legend
                  className="h-52 min-h-[208px] lg:h-80 lg:min-h-[320px]"
                  yAxisProps={{ tickFormatter: (v: number) => `$${formatKilo(v)}` }}
                  config={{
                    gross: { label: "Gross", color: "var(--color-emerald-500)" },
                    net: { label: "Net", color: "var(--color-blue-500)" },
                  }}
                />
              </CardContent>
            </Card>
            <Card>
              <CardHeader title="Orders and refunds" description="Monthly counts" />
              <CardContent>
                <BarChart
                  data={filtered.months.map((m, i) => ({
                    month: m,
                    orders: filtered.sales.orders[i].value,
                    refunds: Math.round(filtered.sales.refunds[i].value / 25),
                  }))}
                  dataKey="month"
                  legend
                  className="h-52 min-h-[208px]"
                  yAxisProps={{ tickFormatter: (v: number) => formatKilo(v) }}
                  config={{
                    orders: { label: "Orders", color: "var(--color-sky-500)" },
                    refunds: { label: "Refunds", color: "var(--color-rose-500)" },
                  }}
                />
              </CardContent>
            </Card>
            <Card>
              <CardHeader title="Average order value" description="AOV by month" />
              <CardContent>
                <LineChart
                  data={filtered.months.map((m, i) => ({
                    month: m,
                    value: Math.round(
                      filtered.sales.net[i].value / Math.max(1, filtered.sales.orders[i].value),
                    ),
                  }))}
                  dataKey="month"
                  legend={false}
                  className="h-52 min-h-[208px]"
                  yAxisProps={{ tickFormatter: (v: number) => `$${v}` }}
                  config={{ value: { label: "AOV", color: "var(--color-amber-500)" } }}
                />
              </CardContent>
            </Card>
          </section>
        </div>

        <div className="space-y-4">
          <CardHeader
            title="Inventory reports"
            description="Stock levels, adjustments, and valuation across locations"
          />
          <section>
            <Card className="xl:col-span-2">
              <CardHeader title="Adjustments" description="Added vs removed by month" />
              <CardContent>
                <BarChart
                  data={filtered.inventory.adjustments}
                  dataKey="month"
                  legend
                  className="h-52 min-h-[208px] lg:h-80 lg:min-h-[320px]"
                  yAxisProps={{ tickFormatter: (v: number) => formatKilo(v) }}
                  config={{
                    added: { label: "Added", color: "var(--color-emerald-500)" },
                    removed: { label: "Removed", color: "var(--color-rose-500)" },
                  }}
                />
              </CardContent>
            </Card>
          </section>
        </div>

        <div className="space-y-4">
          <CardHeader
            title="Order and fulfillment"
            description="Order statuses, delivery times, and cancellations"
          />
          <section className="grid grid-cols-1 gap-4 xl:grid-cols-2">
            <Card>
              <CardHeader title="Status distribution" description="Counts by status" />
              <CardContent>
                <DetailLine>
                  {data.fulfillment.status.map((item) => (
                    <DetailLineItem
                      label={item.status}
                      description={formatKilo(item.value)}
                      key={item.status}
                    />
                  ))}
                </DetailLine>
              </CardContent>
            </Card>
            <Card>
              <CardHeader title="Inventory snapshot" description="Current stock distribution" />
              <CardContent>
                <DetailLine>
                  {data.inventory.snapshot.map((item) => (
                    <DetailLineItem
                      label={item.bucket}
                      description={formatKilo(item.value)}
                      key={item.bucket}
                    />
                  ))}
                </DetailLine>
              </CardContent>
            </Card>
            <Card className="col-span-full">
              <CardHeader title="Delivery time" description="Average days to deliver" />
              <CardContent>
                <LineChart
                  data={filtered.fulfillment.sla}
                  dataKey="month"
                  legend={false}
                  className="h-52 min-h-[208px] lg:h-80 lg:min-h-[320px]"
                  yAxisProps={{ tickFormatter: (v: number) => `${v}d` }}
                  config={{ value: { label: "Days", color: "var(--color-violet-500)" } }}
                />
              </CardContent>
            </Card>
          </section>
        </div>

        <div className="space-y-4">
          <CardHeader
            title="Customer reports"
            description="New vs returning customers and lifetime value"
          />
          <section className="grid grid-cols-1 gap-4 xl:grid-cols-2">
            <Card>
              <CardHeader title="New vs returning" description="Customers by month" />
              <CardContent>
                <BarChart
                  data={filtered.customers.newVsReturning}
                  dataKey="month"
                  legend
                  className="h-52 min-h-[208px]"
                  yAxisProps={{ tickFormatter: (v: number) => formatKilo(v) }}
                  config={{
                    new: { label: "New", color: "var(--color-blue-500)" },
                    returning: { label: "Returning", color: "var(--color-amber-500)" },
                  }}
                />
              </CardContent>
            </Card>
            <Card>
              <CardHeader title="Customer lifetime value" description="Average CLV by month" />
              <CardContent>
                <AreaChart
                  data={filtered.customers.clv}
                  dataKey="month"
                  legend={false}
                  className="h-52 min-h-[208px]"
                  yAxisProps={{ tickFormatter: (v: number) => `$${v}` }}
                  config={{ value: { label: "CLV", color: "var(--color-green-500)" } }}
                />
              </CardContent>
            </Card>
          </section>
        </div>
      </>
    </>
  )
}
