"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { LineChart } from "@/components/ui/line-chart"
import { BarChart } from "@/components/ui/bar-chart"
import { AreaChart } from "@/components/ui/area-chart"
import { formatKilo } from "@/lib/number"

const data = {
  sales: {
    revenue: [
      { month: "September", value: 84210 },
      { month: "October", value: 65840 },
      { month: "November", value: 71230 },
      { month: "December", value: 90410 },
      { month: "January", value: 78020 },
      { month: "February", value: 81560 },
      { month: "March", value: 67340 },
      { month: "April", value: 73980 },
      { month: "May", value: 62110 },
      { month: "June", value: 70540 },
      { month: "July", value: 68950 },
      { month: "August", value: 88240 },
    ],
    orders: [
      { month: "September", value: 1532 },
      { month: "October", value: 1284 },
      { month: "November", value: 1049 },
      { month: "December", value: 1363 },
      { month: "January", value: 1831 },
      { month: "February", value: 1805 },
      { month: "March", value: 1167 },
      { month: "April", value: 1473 },
      { month: "May", value: 886 },
      { month: "June", value: 1382 },
      { month: "July", value: 1025 },
      { month: "August", value: 1759 },
    ],
    aov: [
      { month: "September", value: 55.0 },
      { month: "October", value: 51.3 },
      { month: "November", value: 67.9 },
      { month: "December", value: 66.3 },
      { month: "January", value: 42.6 },
      { month: "February", value: 45.2 },
      { month: "March", value: 57.7 },
      { month: "April", value: 50.2 },
      { month: "May", value: 70.1 },
      { month: "June", value: 51.0 },
      { month: "July", value: 67.2 },
      { month: "August", value: 50.2 },
    ],
    cr: [
      { month: "September", value: 2.1 },
      { month: "October", value: 1.9 },
      { month: "November", value: 2.3 },
      { month: "December", value: 2.8 },
      { month: "January", value: 1.6 },
      { month: "February", value: 1.8 },
      { month: "March", value: 2.4 },
      { month: "April", value: 2.0 },
      { month: "May", value: 2.7 },
      { month: "June", value: 1.9 },
      { month: "July", value: 2.2 },
      { month: "August", value: 2.6 },
    ],
  },
  behavior: {
    sources: [
      { source: "Organic", value: 41230 },
      { source: "Paid", value: 30210 },
      { source: "Social", value: 18940 },
      { source: "Referral", value: 12360 },
      { source: "Email", value: 9340 },
    ],
    funnel: [
      { stage: "Sessions", value: 210000 },
      { stage: "Product views", value: 142000 },
      { stage: "Adds to cart", value: 41000 },
      { stage: "Checkout", value: 21000 },
      { stage: "Purchased", value: 5200 },
    ],
    abandon: [
      { week: "W1", value: 71 },
      { week: "W2", value: 69 },
      { week: "W3", value: 66 },
      { week: "W4", value: 64 },
      { week: "W5", value: 68 },
      { week: "W6", value: 63 },
      { week: "W7", value: 62 },
      { week: "W8", value: 61 },
    ],
  },
  product: {
    top: [
      { name: "13‑inch laptop sleeve", value: 18210 },
      { name: "Wireless earbuds", value: 16540 },
      { name: "Travel backpack", value: 14980 },
      { name: "Mechanical keyboard", value: 13260 },
      { name: "Standing desk", value: 11890 },
    ],
    viewBuy: [
      { month: "September", views: 92000, purchases: 1532 },
      { month: "October", views: 88000, purchases: 1284 },
      { month: "November", views: 99000, purchases: 1049 },
      { month: "December", views: 120000, purchases: 1363 },
      { month: "January", views: 76000, purchases: 1831 },
      { month: "February", views: 80000, purchases: 1805 },
      { month: "March", views: 69000, purchases: 1167 },
      { month: "April", views: 74000, purchases: 1473 },
      { month: "May", views: 62000, purchases: 886 },
      { month: "June", views: 70000, purchases: 1382 },
      { month: "July", views: 65000, purchases: 1025 },
      { month: "August", views: 90000, purchases: 1759 },
    ],
    searches: [
      { term: "wireless earbuds", value: 9380 },
      { term: "backpack", value: 8120 },
      { term: "mechanical keyboard", value: 6240 },
      { term: "desk", value: 5110 },
      { term: "usb c hub", value: 4320 },
    ],
  },
  engagement: {
    repeatRate: [
      { month: "September", value: 23 },
      { month: "October", value: 24 },
      { month: "November", value: 22 },
      { month: "December", value: 25 },
      { month: "January", value: 19 },
      { month: "February", value: 21 },
      { month: "March", value: 22 },
      { month: "April", value: 23 },
      { month: "May", value: 24 },
      { month: "June", value: 22 },
      { month: "July", value: 23 },
      { month: "August", value: 26 },
    ],
    retention: [
      { cohort: "Jan", m1: 42, m2: 31, m3: 24 },
      { cohort: "Feb", m1: 45, m2: 33, m3: 26 },
      { cohort: "Mar", m1: 41, m2: 30, m3: 22 },
    ],
    clv: [
      { month: "September", value: 118 },
      { month: "October", value: 121 },
      { month: "November", value: 124 },
      { month: "December", value: 132 },
      { month: "January", value: 105 },
      { month: "February", value: 109 },
      { month: "March", value: 112 },
      { month: "April", value: 115 },
      { month: "May", value: 120 },
      { month: "June", value: 119 },
      { month: "July", value: 123 },
      { month: "August", value: 131 },
    ],
  },
  marketing: {
    attribution: [
      { channel: "Organic", value: 34 },
      { channel: "Paid", value: 28 },
      { channel: "Email", value: 12 },
      { channel: "Social", value: 16 },
      { channel: "Referral", value: 10 },
    ],
    discounts: [
      { month: "September", used: 210, revenue: 12430 },
      { month: "October", used: 184, revenue: 10320 },
      { month: "November", used: 305, revenue: 17210 },
      { month: "December", used: 342, revenue: 19880 },
      { month: "January", used: 129, revenue: 6120 },
      { month: "February", used: 165, revenue: 7920 },
      { month: "March", used: 188, revenue: 9010 },
      { month: "April", used: 205, revenue: 10430 },
      { month: "May", used: 96, revenue: 4720 },
      { month: "June", used: 141, revenue: 7680 },
      { month: "July", used: 152, revenue: 8210 },
      { month: "August", used: 230, revenue: 13490 },
    ],
    roi: [
      { month: "September", value: 145 },
      { month: "October", value: 132 },
      { month: "November", value: 158 },
      { month: "December", value: 171 },
      { month: "January", value: 118 },
      { month: "February", value: 126 },
      { month: "March", value: 139 },
      { month: "April", value: 141 },
      { month: "May", value: 124 },
      { month: "June", value: 129 },
      { month: "July", value: 137 },
      { month: "August", value: 163 },
    ],
  },
}

export function AnalyticsOverview() {
  return (
    <div className="grid gap-12">
      <div className="space-y-6">
        <CardHeader
          title="Sales performance"
          description="Track revenue, orders, average order value, and conversion rate to measure overall growth."
        />
        <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">
          <Card className="col-span-full">
            <CardHeader title="Revenue by month" description="Net revenue in the last 12 months" />
            <CardContent>
              <LineChart
                data={data.sales.revenue}
                dataKey="month"
                className="h-48 min-h-[192px] lg:h-64 lg:min-h-[256px]"
                legend={false}
                yAxisProps={{ tickFormatter: (v: number) => `$${formatKilo(v)}` }}
                config={{ value: { label: "Revenue", color: "var(--color-blue-500)" } }}
              />
            </CardContent>
          </Card>
          <Card>
            <CardHeader title="Orders by month" description="Total orders in the last 12 months" />
            <CardContent>
              <LineChart
                data={data.sales.orders}
                dataKey="month"
                className="h-48 min-h-[192px]"
                legend={false}
                yAxisProps={{ tickFormatter: (v: number) => formatKilo(v) }}
                config={{ value: { label: "Orders", color: "var(--color-sky-500)" } }}
              />
            </CardContent>
          </Card>
          <Card>
            <CardHeader title="Average order value" description="AOV in the last 12 months" />
            <CardContent>
              <AreaChart
                data={data.sales.aov}
                dataKey="month"
                className="h-48 min-h-[192px]"
                legend={false}
                yAxisProps={{ tickFormatter: (v: number) => `$${v.toFixed(0)}` }}
                config={{ value: { label: "AOV", color: "var(--color-emerald-500)" } }}
              />
            </CardContent>
          </Card>
          <Card>
            <CardHeader title="Conversion rate" description="Purchase conversion by month" />
            <CardContent>
              <AreaChart
                data={data.sales.cr}
                dataKey="month"
                className="h-48 min-h-[192px]"
                legend={false}
                yAxisProps={{ tickFormatter: (v: number) => `${v}%` }}
                config={{ value: { label: "CR", color: "var(--color-violet-500)" } }}
              />
            </CardContent>
          </Card>
        </section>
      </div>

      <div className="space-y-6">
        <CardHeader
          title="Customer behavior"
          description="Understand how visitors interact with your store, from traffic sources to funnels and abandoned carts."
        />

        <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">
          <Card>
            <CardHeader title="Traffic sources" description="Sessions by source" />
            <CardContent>
              <BarChart
                data={data.behavior.sources}
                dataKey="source"
                className="h-56 min-h-[224px]"
                legend={false}
                yAxisProps={{ tickFormatter: (v: number) => formatKilo(v) }}
                config={{ value: { label: "Sessions", color: "var(--color-indigo-500)" } }}
              />
            </CardContent>
          </Card>
          <Card>
            <CardHeader title="Conversion funnel" description="From sessions to purchases" />
            <CardContent>
              <BarChart
                data={data.behavior.funnel}
                dataKey="stage"
                className="h-56 min-h-[224px]"
                legend={false}
                yAxisProps={{ tickFormatter: (v: number) => formatKilo(v) }}
                config={{ value: { label: "Count", color: "var(--color-amber-500)" } }}
              />
            </CardContent>
          </Card>
          <Card>
            <CardHeader title="Abandoned carts" description="Weekly abandonment rate" />
            <CardContent>
              <LineChart
                data={data.behavior.abandon}
                dataKey="week"
                className="h-56 min-h-[224px]"
                legend={false}
                yAxisProps={{ tickFormatter: (v: number) => `${v}%` }}
                config={{ value: { label: "Abandonment", color: "var(--color-rose-500)" } }}
              />
            </CardContent>
          </Card>
        </section>
      </div>
      <div className="space-y-6">
        <CardHeader
          title="Product analytics"
          description="Analyze product performance by top-selling items, views vs purchases, and customer search queries."
        />

        <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">
          <Card>
            <CardHeader title="Top selling products" description="Revenue by product" />
            <CardContent>
              <BarChart
                data={data.product.top}
                dataKey="name"
                className="h-56 min-h-[224px]"
                legend={false}
                yAxisProps={{ tickFormatter: (v: number) => `$${formatKilo(v)}` }}
                config={{ value: { label: "Revenue", color: "var(--color-teal-500)" } }}
              />
            </CardContent>
          </Card>
          <Card>
            <CardHeader
              title="Views vs purchases"
              description="Monthly product views and purchases"
            />
            <CardContent>
              <BarChart
                data={data.product.viewBuy}
                dataKey="month"
                className="h-56 min-h-[224px]"
                type="stacked"
                legend
                yAxisProps={{ tickFormatter: (v: number) => formatKilo(v) }}
                config={{
                  views: { label: "Views", color: "var(--color-slate-500)" },
                  purchases: { label: "Purchases", color: "var(--color-emerald-500)" },
                }}
              />
            </CardContent>
          </Card>
          <Card>
            <CardHeader title="Top search queries" description="Site search volume" />
            <CardContent>
              <BarChart
                data={data.product.searches}
                dataKey="term"
                className="h-56 min-h-[224px]"
                legend={false}
                yAxisProps={{ tickFormatter: (v: number) => formatKilo(v) }}
                config={{ value: { label: "Searches", color: "var(--color-cyan-500)" } }}
              />
            </CardContent>
          </Card>
        </section>
      </div>
      <div className="space-y-6">
        <CardHeader
          title="Engagement & retention"
          description="Measure customer lifetime value, repeat purchases, and retention cohorts to strengthen loyalty."
        />
        <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">
          <Card>
            <CardHeader
              title="Repeat purchase rate"
              description="Percent of orders from returning customers"
            />
            <CardContent>
              <LineChart
                data={data.engagement.repeatRate}
                dataKey="month"
                className="h-56 min-h-[224px]"
                legend={false}
                yAxisProps={{ tickFormatter: (v: number) => `${v}%` }}
                config={{ value: { label: "Repeat rate", color: "var(--color-fuchsia-500)" } }}
              />
            </CardContent>
          </Card>
          <Card>
            <CardHeader title="Retention cohorts" description="Retention at month 1 to month 3" />
            <CardContent>
              <BarChart
                data={data.engagement.retention}
                dataKey="cohort"
                className="h-56 min-h-[224px]"
                barProps={{
                  type: "grouped",
                }}
                legend
                yAxisProps={{ tickFormatter: (v: number) => `${v}%` }}
                config={{
                  m1: { label: "M1", color: "var(--color-blue-500)" },
                  m2: { label: "M2", color: "var(--color-amber-500)" },
                  m3: { label: "M3", color: "var(--color-rose-500)" },
                }}
              />
            </CardContent>
          </Card>
          <Card>
            <CardHeader title="Customer lifetime value" description="Average CLV by month" />
            <CardContent>
              <AreaChart
                data={data.engagement.clv}
                dataKey="month"
                className="h-56 min-h-[224px]"
                legend={false}
                yAxisProps={{ tickFormatter: (v: number) => `$${v.toFixed(0)}` }}
                config={{ value: { label: "CLV", color: "var(--color-green-500)" } }}
              />
            </CardContent>
          </Card>
        </section>

        <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">
          <Card>
            <CardHeader title="Campaign attribution" description="Share of revenue by channel" />
            <CardContent>
              <BarChart
                data={data.marketing.attribution}
                dataKey="channel"
                barProps={{
                  barSize: 20,
                }}
                className="h-56 min-h-[224px]"
                legend={false}
                yAxisProps={{ tickFormatter: (v: number) => `${v}%` }}
                config={{ value: { label: "Share", color: "var(--color-indigo-500)" } }}
              />
            </CardContent>
          </Card>
          <Card className="col-span-2">
            <CardHeader title="Discount usage" description="Codes used and attributed revenue" />
            <CardContent>
              <BarChart
                data={data.marketing.discounts}
                dataKey="month"
                className="h-56 min-h-[224px]"
                barProps={{
                  type: "stacked",
                }}
                legend
                yAxisProps={{ tickFormatter: (v: number) => formatKilo(v) }}
                config={{
                  used: { label: "Codes used", color: "var(--color-violet-500)" },
                  revenue: { label: "Revenue", color: "var(--color-emerald-500)" },
                }}
              />
            </CardContent>
          </Card>
        </section>
        <Card>
          <CardHeader title="Marketing ROI" description="Return on ad spend by month" />
          <CardContent>
            <LineChart
              data={data.marketing.roi}
              dataKey="month"
              className="h-56 min-h-[224px]"
              legend={false}
              yAxisProps={{ tickFormatter: (v: number) => `${v}%` }}
              config={{ value: { label: "ROI", color: "var(--color-amber-500)" } }}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
