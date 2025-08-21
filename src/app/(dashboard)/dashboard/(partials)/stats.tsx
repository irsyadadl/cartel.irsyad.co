"use client"

import { ArrowTrendingUpIcon, UsersIcon } from "@heroicons/react/24/solid"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { twJoin } from "tailwind-merge"
import { ArrowTrendingDownIcon } from "@heroicons/react/16/solid"
import { AreaChart } from "@/components/ui/area-chart"
import { formatKilo } from "@/lib/number"
import { CurrencyDollarIcon, ShoppingBagIcon } from "@heroicons/react/24/outline"

function dataGenerated(year: number, months: number) {
  const data = []

  for (let i = 1; i <= months; i++) {
    const date = `${year}-${String(i).padStart(2, "0")}`

    const revenue = Math.floor(Math.random() * 40000) + 60000
    const newCustomers = Math.floor(Math.random() * 800) + 300
    const newOrders = Math.floor(Math.random() * 1500) + 500

    data.push({ date, revenue, newCustomers, newOrders })
  }

  return data
}

const metrics = dataGenerated(2025, 12)
const totals = metrics.reduce(
  (acc, curr) => {
    acc.revenue += curr.revenue
    acc.newCustomers += curr.newCustomers
    acc.newOrders += curr.newOrders
    return acc
  },
  { revenue: 0, newCustomers: 0, newOrders: 0 },
)

const newCustomers = dataGenerated(2025, 12).map(({ date, newCustomers }) => ({
  date,
  value: newCustomers,
}))

const revenue = dataGenerated(2025, 12).map(({ date, revenue }) => ({
  date,
  value: revenue,
}))

const newOrders = dataGenerated(2025, 12).map(({ date, newOrders }) => ({
  date,
  value: newOrders,
}))

const stats = [
  {
    data: revenue,
    color: "var(--color-indigo-500)",
    label: "Revenue",
    icon: CurrencyDollarIcon,
    value: `$${totals.revenue.toLocaleString()}`,
    change: "+3.2%",
  },
  {
    data: newOrders,
    color: "var(--color-sky-500)",
    label: "Orders",
    icon: ShoppingBagIcon,
    value: totals.newOrders.toLocaleString(),
    change: "-1.1%",
  },
  {
    data: newCustomers,
    color: "var(--color-emerald-500)",
    label: "Customers",
    icon: UsersIcon,
    value: totals.newCustomers.toLocaleString(),
    change: "+0.8%",
  },
]

export function Stats() {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      {stats.map((item) => (
        <Card className="relative pb-0 [--gutter:--spacing(4)]" key={item.label}>
          <item.icon className="absolute top-6 right-6 size-5 opacity-35" />
          <CardHeader>
            <CardTitle>{item.value}</CardTitle>
            <CardDescription>
              {item.label} <br />
              <span
                className={twJoin(
                  "font-medium text-xs",
                  item.change.startsWith("-") ? "text-orange-500" : "text-muted-fg",
                )}
              >
                {item.change} {item.change.startsWith("-") ? "decrease" : "increase"}
                {item.change.startsWith("-") ? (
                  <ArrowTrendingDownIcon className="ml-2 inline size-4" />
                ) : (
                  <ArrowTrendingUpIcon className="ml-2 inline size-4" />
                )}
              </span>
            </CardDescription>
          </CardHeader>
          <AreaChart
            areaProps={{
              activeDot: false,
              type: "natural",
            }}
            data={item.data}
            dataKey="date"
            hideGridLines
            hideXAxis
            hideYAxis
            tooltip={false}
            className="h-12 min-h-[48px]"
            yAxisProps={{
              tickFormatter: (v: number) => `$${formatKilo(v)}`,
            }}
            legend={false}
            config={{
              value: {
                label: item.label,
                color: item.change.startsWith("-") ? "var(--color-orange-500)" : item.color,
              },
            }}
          />
        </Card>
      ))}
    </div>
  )
}
