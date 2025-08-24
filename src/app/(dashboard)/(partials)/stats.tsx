"use client"

import { ArrowTrendingUpIcon, UsersIcon } from "@heroicons/react/24/solid"
import { Card, CardAction, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
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

const newCustomers = [
  {
    date: "2025-01",
    value: 1088,
  },
  {
    date: "2025-02",
    value: 410,
  },
  {
    date: "2025-03",
    value: 937,
  },
  {
    date: "2025-04",
    value: 342,
  },
  {
    date: "2025-05",
    value: 383,
  },
  {
    date: "2025-06",
    value: 561,
  },
  {
    date: "2025-07",
    value: 408,
  },
  {
    date: "2025-08",
    value: 379,
  },
  {
    date: "2025-09",
    value: 802,
  },
  {
    date: "2025-10",
    value: 629,
  },
  {
    date: "2025-11",
    value: 514,
  },
  {
    date: "2025-12",
    value: 484,
  },
]
const newOrders = [
  {
    date: "2025-01",
    value: 1697,
  },
  {
    date: "2025-02",
    value: 1855,
  },
  {
    date: "2025-03",
    value: 1920,
  },
  {
    date: "2025-04",
    value: 1827,
  },
  {
    date: "2025-05",
    value: 1464,
  },
  {
    date: "2025-06",
    value: 1008,
  },
  {
    date: "2025-07",
    value: 1736,
  },
  {
    date: "2025-08",
    value: 971,
  },
  {
    date: "2025-09",
    value: 1889,
  },
  {
    date: "2025-10",
    value: 1535,
  },
  {
    date: "2025-11",
    value: 623,
  },
  {
    date: "2025-12",
    value: 1478,
  },
]
const revenue = [
  {
    date: "2025-01",
    value: 83362,
  },
  {
    date: "2025-02",
    value: 81656,
  },
  {
    date: "2025-03",
    value: 77174,
  },
  {
    date: "2025-04",
    value: 61386,
  },
  {
    date: "2025-05",
    value: 87073,
  },
  {
    date: "2025-06",
    value: 70014,
  },
  {
    date: "2025-07",
    value: 78878,
  },
  {
    date: "2025-08",
    value: 98709,
  },
  {
    date: "2025-09",
    value: 65801,
  },
  {
    date: "2025-10",
    value: 92206,
  },
  {
    date: "2025-11",
    value: 93230,
  },
  {
    date: "2025-12",
    value: 79749,
  },
]

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

const revenueStats = stats[0]

export function Stats() {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      <Card className="[--gutter:0] lg:col-span-2">
        <CardHeader className="p-4 lg:gap-4 lg:p-6">
          <CardTitle className="font-medium sm:text-5xl">{revenueStats.value}</CardTitle>
          <CardDescription className="sm:text-base">
            {revenueStats.label} <br />
            <span
              className={twJoin(
                "text-xs sm:text-base",
                revenueStats.change.startsWith("-") ? "text-orange-500" : "text-muted-fg",
              )}
            >
              {revenueStats.change} {revenueStats.change.startsWith("-") ? "decrease" : "increase"}
              {revenueStats.change.startsWith("-") ? (
                <ArrowTrendingDownIcon className="ml-2 inline size-4" />
              ) : (
                <ArrowTrendingUpIcon className="ml-2 inline size-4" />
              )}
            </span>
          </CardDescription>
          <CardAction>
            <revenueStats.icon className="size-5 text-muted-fg lg:size-8" />
          </CardAction>
        </CardHeader>
        <AreaChart
          areaProps={{
            activeDot: false,
            type: "natural",
          }}
          data={revenueStats.data}
          dataKey="date"
          hideGridLines
          hideXAxis
          hideYAxis
          tooltip={false}
          className="h-16 min-h-[64px] lg:h-52 lg:min-h-[208px]"
          yAxisProps={{
            tickFormatter: (v: number) => `$${formatKilo(v)}`,
          }}
          legend={false}
          config={{
            value: {
              label: revenueStats.label,
              color: revenueStats.change.startsWith("-")
                ? "var(--color-orange-500)"
                : revenueStats.color,
            },
          }}
        />
      </Card>
      <div className="flex flex-col gap-6">
        {stats.slice(1, 3).map((item, index) => (
          <Card className="relative [--gutter:0]" key={index}>
            <CardHeader className="p-4">
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
              <CardAction>
                <item.icon className=" size-5 text-muted-fg" />
              </CardAction>
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
              className="h-16 min-h-[64px]"
              yAxisProps={{
                tickFormatter: (v: number) => formatKilo(v),
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
    </div>
  )
}
