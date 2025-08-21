"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { LineChart } from "@/components/ui/line-chart"
import { formatKilo } from "@/lib/number"

const twelveMonths = {
  orders: [
    {
      month: "September",
      value: 1532,
    },
    {
      month: "October",
      value: 1284,
    },
    {
      month: "November",
      value: 1049,
    },
    {
      month: "December",
      value: 1363,
    },
    {
      month: "January",
      value: 1831,
    },
    {
      month: "February",
      value: 1805,
    },
    {
      month: "March",
      value: 1167,
    },
    {
      month: "April",
      value: 1473,
    },
    {
      month: "May",
      value: 886,
    },
    {
      month: "June",
      value: 1382,
    },
    {
      month: "July",
      value: 1025,
    },
    {
      month: "August",
      value: 1759,
    },
  ],
  customers: [
    {
      month: "September",
      value: 437,
    },
    {
      month: "October",
      value: 649,
    },
    {
      month: "November",
      value: 990,
    },
    {
      month: "December",
      value: 755,
    },
    {
      month: "January",
      value: 349,
    },
    {
      month: "February",
      value: 1019,
    },
    {
      month: "March",
      value: 818,
    },
    {
      month: "April",
      value: 645,
    },
    {
      month: "May",
      value: 998,
    },
    {
      month: "June",
      value: 977,
    },
    {
      month: "July",
      value: 876,
    },
    {
      month: "August",
      value: 1034,
    },
  ],
}

export function TotalRevenue() {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader
          title="Total revenue"
          description="Track the total revenue generated in the last 12 months."
        />
        <CardContent>
          <LineChart
            data={twelveMonths.orders}
            dataKey="month"
            className="h-48 min-h-[192px]"
            yAxisProps={{
              tickFormatter: (v: number) => `$${formatKilo(v)}`,
            }}
            legend={false}
            config={{
              value: {
                label: "Total orders",
                color: "var(--color-blue-500)",
              },
            }}
          />
        </CardContent>
      </Card>
      <Card>
        <CardHeader
          title="Total customer"
          description="Track the total number of customers acquired in the last 12 months."
        />
        <CardContent>
          <LineChart
            data={twelveMonths.customers}
            dataKey="month"
            className="h-48 min-h-[192px]"
            yAxisProps={{
              tickFormatter: (v: number) => `$${formatKilo(v)}`,
            }}
            legend={false}
            config={{
              value: {
                label: "Total",
                color: "var(--color-sky-500)",
              },
            }}
          />
        </CardContent>
      </Card>
    </div>
  )
}
