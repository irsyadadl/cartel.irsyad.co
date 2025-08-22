"use client"

import { type ComponentType, type ReactNode, useMemo } from "react"
import { twMerge } from "tailwind-merge"
import { AreaChart as PrimitiveAreaChart } from "@/components/ui/area-chart"
import { CardHeader } from "@/components/ui/card"
import { ExclamationTriangleIcon, BoltIcon, ShoppingBagIcon } from "@heroicons/react/24/solid"

interface StatsProps {
  icon: ComponentType<React.SVGProps<SVGSVGElement>>
  label: ReactNode
  description?: ReactNode
  children?: ReactNode
  className?: string
  iconClassName?: string
}

function StatsContainer({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={twMerge("inset-ring inset-ring-fg/10 rounded-lg bg-white", className)}
      {...props}
    />
  )
}

function StatsCard({
  icon: Icon,
  label,
  description,
  children,
  className,
  iconClassName,
}: StatsProps) {
  return (
    <div className={`flex items-center justify-between px-4 py-2 ${className ?? ""}`}>
      <div className="flex items-center gap-2">
        <Icon className={`size-5 ${iconClassName ?? ""}`} />
        <span className="font-semibold text-xl">{label}</span>
      </div>
      {children ??
        (description ? <span className="text-muted-fg text-sm">{description}</span> : null)}
    </div>
  )
}

function AreaChart(props: React.ComponentProps<typeof PrimitiveAreaChart>) {
  return (
    <PrimitiveAreaChart
      hideGridLines
      hideXAxis
      hideYAxis
      className="h-12 min-h-[48px]"
      legend={false}
      tooltip={false}
      areaProps={{ activeDot: false, type: "natural" }}
      {...props}
    />
  )
}

type DayPoint = { date: string; sales: number; revenue: number; stockAlerts: number }

export function Stats() {
  const data30d = useMemo<DayPoint[]>(() => {
    const base = Array.from({ length: 30 }, (_, i) => `D${i + 1}`)
    return base.map((label, i) => {
      const sales = Math.max(40, Math.round(80 + Math.sin(i / 2.5) * 35 + Math.random() * 25))
      const revenue = sales * (120 + Math.round(Math.random() * 60))
      const stockAlerts = Math.max(1, Math.round(2 + Math.sin(i / 3.4) * 2 + Math.random() * 2))
      return { date: label, sales, revenue, stockAlerts }
    })
  }, [])

  const totals = useMemo(() => {
    const sales = data30d.reduce((a, d) => a + d.sales, 0)
    const revenue = data30d.reduce((a, d) => a + d.revenue, 0)
    const stockAlerts = data30d.reduce((a, d) => a + d.stockAlerts, 0)
    return { sales, revenue, stockAlerts }
  }, [data30d])

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
      <StatsContainer>
        <CardHeader className="px-4 pt-2.5" title="Revenue" description="Total last 30d" />
        <StatsCard
          icon={BoltIcon}
          label={`$${totals.revenue.toLocaleString()}`}
          description={`$${Math.round(totals.revenue / data30d.length).toLocaleString()}/day`}
          iconClassName="text-blue-500"
        />
        <AreaChart
          valueFormatter={(v) => `$${v.toLocaleString()}`}
          config={{ revenue: { label: "Revenue", color: "var(--color-blue-500)" } }}
          data={data30d}
          dataKey="date"
        />
      </StatsContainer>

      <StatsContainer>
        <CardHeader className="px-4 pt-2.5" title="Units sold" description="Completed orders" />
        <StatsCard
          icon={ShoppingBagIcon}
          label={totals.sales.toLocaleString()}
          description={`${Math.round(totals.sales / data30d.length).toLocaleString()}/day`}
          iconClassName="text-rose-500"
        />
        <AreaChart
          valueFormatter={(v) => v.toString()}
          config={{ sales: { label: "Sales", color: "var(--color-rose-500)" } }}
          data={data30d}
          dataKey="date"
        />
      </StatsContainer>

      <StatsContainer>
        <CardHeader className="px-4 pt-2.5" title="Stock alerts" description="Items to review" />
        <StatsCard
          icon={ExclamationTriangleIcon}
          label={totals.stockAlerts.toLocaleString()}
          description={`${Math.round(totals.stockAlerts / data30d.length).toLocaleString()}/day`}
          iconClassName="text-orange-500"
        />
        <AreaChart
          valueFormatter={(v) => v.toString()}
          config={{ stockAlerts: { label: "Alerts", color: "var(--color-orange-500)" } }}
          data={data30d}
          dataKey="date"
        />
      </StatsContainer>
    </div>
  )
}
