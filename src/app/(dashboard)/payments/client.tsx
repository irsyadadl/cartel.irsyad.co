"use client"

import {
  ArrowPathIcon,
  CreditCardIcon,
  ReceiptRefundIcon,
  ShieldExclamationIcon,
} from "@heroicons/react/24/solid"
import { twMerge } from "tailwind-merge"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { AreaChart } from "@/components/ui/area-chart"
import { BarChart } from "@/components/ui/bar-chart"
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { SearchField } from "@/components/ui/search-field"
import { Badge } from "@/components/ui/badge"
import { Avatar } from "@/components/ui/avatar"
import { formatKilo, formatNumber } from "@/lib/number"
import { SectionContent, SectionHeader } from "@/components/section-header"
import { Paginate } from "@/components/paginate"

function StatsShell(props: React.ComponentProps<"div">) {
  return <div className={twMerge("rounded-lg border bg-white", props.className)} {...props} />
}

function Stat({
  icon: Icon,
  label,
  value,
  children,
  color,
}: {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  label: string
  value: string
  children?: React.ReactNode
  color?: string
}) {
  return (
    <div className="flex flex-col gap-2">
      <div className="relative p-4">
        <div className="font-semibold text-2xl tabular-nums">{value}</div>
        <div className="mt-1 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon className={twMerge("size-5", color)} />
            <span className="text-muted-fg text-sm">{label}</span>
          </div>
        </div>
      </div>
      {children}
    </div>
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

const series = {
  processed: months.map((m, i) => ({
    month: m,
    value: [81230, 67820, 73410, 90210, 76840, 79510, 65220, 71100, 59840, 68230, 67110, 86190][i],
  })),
  pending: months.map((m, i) => ({
    month: m,
    value: [3210, 2980, 3120, 3410, 2890, 3010, 2760, 2910, 2540, 2690, 2610, 3180][i],
  })),
  failed: months.map((m, i) => ({
    month: m,
    value: [1720, 1610, 1490, 1850, 1320, 1410, 1280, 1360, 1190, 1310, 1250, 1680][i],
  })),
  refunded: months.map((m, i) => ({
    month: m,
    value: [2100, 1840, 1650, 2210, 1430, 1510, 1320, 1410, 1220, 1370, 1280, 1900][i],
  })),
}

const byMethod = [
  { method: "Card •••• 4242", count: 4820, amount: 382140 },
  { method: "PayPal", count: 1930, amount: 149220 },
  { method: "Bank transfer", count: 720, amount: 112430 },
  { method: "Apple Pay", count: 860, amount: 73980 },
  { method: "COD", count: 310, amount: 18760 },
]

const payments = [
  {
    id: "pay_8A3F24",
    order: "#100245",
    customer: "James Smith",
    avatar: "https://i.pravatar.cc/40?img=12",
    method: "Card •••• 4242",
    amount: 182.4,
    status: "Succeeded",
    date: "Aug 18, 14:21",
  },
  {
    id: "pay_8A3E99",
    order: "#100244",
    customer: "Olivia Johnson",
    avatar: "https://i.pravatar.cc/40?img=35",
    method: "PayPal",
    amount: 96.2,
    status: "Succeeded",
    date: "Aug 18, 13:50",
  },
  {
    id: "pay_8A3D52",
    order: "#100243",
    customer: "Daniel Williams",
    avatar: "https://i.pravatar.cc/40?img=11",
    method: "Card •••• 1337",
    amount: 54.0,
    status: "Refunded",
    date: "Aug 17, 19:02",
  },
  {
    id: "pay_8A3C10",
    order: "#100242",
    customer: "Sophie Brown",
    avatar: "https://i.pravatar.cc/40?img=22",
    method: "Bank transfer",
    amount: 242.1,
    status: "Pending",
    date: "Aug 17, 17:45",
  },
  {
    id: "pay_8A3B77",
    order: "#100241",
    customer: "William Jones",
    avatar: "https://i.pravatar.cc/40?img=9",
    method: "Card •••• 4242",
    amount: 129.9,
    status: "Succeeded",
    date: "Aug 16, 11:03",
  },
  {
    id: "pay_8A3A44",
    order: "#100240",
    customer: "Emily Taylor",
    avatar: "https://i.pravatar.cc/40?img=25",
    method: "Apple Pay",
    amount: 68.5,
    status: "Failed",
    date: "Aug 16, 10:15",
  },
  {
    id: "pay_8A3920",
    order: "#100239",
    customer: "Benjamin Wilson",
    avatar: "https://i.pravatar.cc/40?img=5",
    method: "Card •••• 4242",
    amount: 310.0,
    status: "Succeeded",
    date: "Aug 16, 09:41",
  },
  {
    id: "pay_8A3882",
    order: "#100238",
    customer: "Charlotte Evans",
    avatar: "https://i.pravatar.cc/40?img=17",
    method: "COD",
    amount: 74.9,
    status: "Cancelled",
    date: "Aug 15, 20:24",
  },
  {
    id: "pay_8A3766",
    order: "#100237",
    customer: "George Thomas",
    avatar: "https://i.pravatar.cc/40?img=1",
    method: "PayPal",
    amount: 88.0,
    status: "Succeeded",
    date: "Aug 15, 18:02",
  },
  {
    id: "pay_8A3651",
    order: "#100236",
    customer: "Amelia White",
    avatar: "https://i.pravatar.cc/40?img=48",
    method: "Card •••• 4242",
    amount: 122.3,
    status: "Succeeded",
    date: "Aug 14, 16:55",
  },
]

export function Client() {
  return (
    <>
      <SectionHeader>
        <SectionContent>
          <CardTitle>Payments</CardTitle>
          <CardDescription>
            Monitor processed, pending, failed, and refunded payments
          </CardDescription>
        </SectionContent>
      </SectionHeader>

      {/* Charts */}
      <section className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <Card className="[--gutter:--spacing(4)]">
          <CardHeader title="Payments by status" description="Monthly totals" />
          <CardContent>
            <BarChart
              data={months.map((m, i) => ({
                month: m,
                processed: series.processed[i].value,
                pending: series.pending[i].value,
                failed: series.failed[i].value,
                refunded: series.refunded[i].value,
              }))}
              dataKey="month"
              legend
              yAxisProps={{ tickFormatter: (v: number) => formatKilo(v) }}
              config={{
                processed: { label: "Processed", color: "var(--color-emerald-500)" },
                pending: { label: "Pending", color: "var(--color-amber-500)" },
                failed: { label: "Failed", color: "var(--color-rose-500)" },
                refunded: { label: "Refunded", color: "var(--color-blue-500)" },
              }}
              type="stacked"
              className="h-72"
            />
          </CardContent>
        </Card>
        <Card className="[--gutter:--spacing(4)]">
          <CardHeader title="Payments by method" description="Distribution of methods used" />
          <CardContent className="[--card:var(--gutter)]">
            <Table bleed className="[--gutter:var(--card)]">
              <TableHeader>
                <TableColumn isRowHeader>Method</TableColumn>
                <TableColumn>Count</TableColumn>
                <TableColumn className="text-end">Amount</TableColumn>
              </TableHeader>
              <TableBody>
                {byMethod.map((item) => (
                  <TableRow key={item.method}>
                    <TableCell>{item.method}</TableCell>
                    <TableCell>{item.count.toLocaleString()}</TableCell>
                    <TableCell className="text-end">
                      {formatNumber(item.amount, {
                        style: "currency",
                        currency: "USD",
                      })}
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow className="bg-muted font-semibold">
                  <TableCell>Total</TableCell>
                  <TableCell>
                    {byMethod.reduce((a, b) => a + b.count, 0).toLocaleString()}
                  </TableCell>
                  <TableCell className="text-end">
                    {formatNumber(
                      byMethod.reduce((a, b) => a + b.amount, 0),
                      {
                        style: "currency",
                        currency: "USD",
                      },
                    )}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </section>

      {/* Stats row */}
      <section className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <StatsShell>
          <Stat icon={CreditCardIcon} label="Processed" value="$86.1k" color="text-emerald-500">
            <AreaChart
              data={series.processed}
              dataKey="month"
              config={{ value: { label: "Processed", color: "var(--color-emerald-500)" } }}
              hideGridLines
              hideXAxis
              hideYAxis
              legend={false}
              tooltip={false}
              className="h-12"
              valueFormatter={(v) => `$${formatKilo(v)}`}
            />
          </Stat>
        </StatsShell>
        <StatsShell>
          <Stat icon={ArrowPathIcon} label="Pending" value="3.1k" color="text-amber-500">
            <AreaChart
              data={series.pending}
              dataKey="month"
              config={{ value: { label: "Pending", color: "var(--color-amber-500)" } }}
              hideGridLines
              hideXAxis
              hideYAxis
              legend={false}
              tooltip={false}
              className="h-12"
              valueFormatter={(v) => formatKilo(v)}
            />
          </Stat>
        </StatsShell>
        <StatsShell>
          <Stat icon={ShieldExclamationIcon} label="Failed" value="1.6k" color="text-rose-500">
            <AreaChart
              data={series.failed}
              dataKey="month"
              config={{ value: { label: "Failed", color: "var(--color-rose-500)" } }}
              hideGridLines
              hideXAxis
              hideYAxis
              legend={false}
              tooltip={false}
              className="h-12"
              valueFormatter={(v) => formatKilo(v)}
            />
          </Stat>
        </StatsShell>
        <StatsShell>
          <Stat icon={ReceiptRefundIcon} label="Refunded" value="$19.0k" color="text-blue-500">
            <AreaChart
              data={series.refunded}
              dataKey="month"
              config={{ value: { label: "Refunded", color: "var(--color-blue-500)" } }}
              hideGridLines
              hideXAxis
              hideYAxis
              legend={false}
              tooltip={false}
              className="h-12"
              valueFormatter={(v) => `$${formatKilo(v)}`}
            />
          </Stat>
        </StatsShell>
      </section>

      {/* Table */}
      <div>
        <CardHeader>
          <CardTitle>Recent payments</CardTitle>
          <CardDescription>Last 10 payments</CardDescription>
          <CardAction>
            <SearchField placeholder="Search payments..." />
          </CardAction>
        </CardHeader>
        <Table aria-label="Recent payments">
          <TableHeader>
            <TableColumn>Order</TableColumn>
            <TableColumn isRowHeader>Customer</TableColumn>
            <TableColumn>Method</TableColumn>
            <TableColumn>Amount</TableColumn>
            <TableColumn>Status</TableColumn>
            <TableColumn>Date</TableColumn>
          </TableHeader>
          <TableBody items={payments}>
            {(item) => (
              <TableRow id={item.id}>
                <TableCell>{item.order}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar src={item.avatar} className="size-8" />
                    {item.customer}
                  </div>
                </TableCell>
                <TableCell>{item.method}</TableCell>
                <TableCell>${item.amount}</TableCell>
                <TableCell>
                  <Badge
                    intent={
                      item.status === "Succeeded"
                        ? "success"
                        : item.status === "Pending"
                          ? "warning"
                          : item.status === "Refunded"
                            ? "primary"
                            : "danger"
                    }
                  >
                    {item.status}
                  </Badge>
                </TableCell>
                <TableCell>{item.date}</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <Paginate from={21} to={30} total={311} />
    </>
  )
}
