"use client"

import {
  BanknotesIcon,
  CheckCircleIcon,
  ClockIcon,
  CreditCardIcon,
  CurrencyDollarIcon,
  ReceiptRefundIcon,
  ShieldExclamationIcon,
} from "@heroicons/react/24/solid"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { GridLines } from "@/components/ui/grid-lines"

type Stat = {
  title: string
  value: string
  hint?: string
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
}

function StatCard({ title, value, hint, Icon }: Stat) {
  return (
    <Card className="bg-white [--gutter:--spacing(4)]">
      <CardHeader className="flex items-center gap-x-2">
        <Icon className="size-4 text-muted-fg" />
        <CardTitle className="text-sm">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="font-semibold text-2xl">{value}</div>
        {hint ? <CardDescription className="mt-1">{hint}</CardDescription> : null}
      </CardContent>
    </Card>
  )
}

export function TransactionStats() {
  const stats: Stat[] = [
    { title: "Total transactions", value: "1,248", hint: "All statuses", Icon: CreditCardIcon },
    { title: "Total volume", value: "$182,940.23", hint: "USD only", Icon: CurrencyDollarIcon },
    { title: "Success rate", value: "96.2%", hint: "Succeeded", Icon: CheckCircleIcon },
    { title: "Refunds", value: "1.8%", hint: "Refunded or partial", Icon: ReceiptRefundIcon },
    { title: "Disputes", value: "0.7%", hint: "Open disputes", Icon: ShieldExclamationIcon },
    { title: "Pending", value: "14", hint: "Failed or voided 21", Icon: ClockIcon },
  ]

  return (
    <div className="relative isolate grid gap-4 rounded-xl border bg-muted p-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <GridLines width={25} mask="none" height={25} />
      {stats.map((s) => (
        <StatCard key={s.title} {...s} />
      ))}
      <Card className="bg-white [--gutter:--spacing(4)] xl:col-span-2">
        <CardHeader className="flex items-center gap-x-2">
          <BanknotesIcon className="size-4 text-muted-fg" />
          <CardTitle className="text-sm">Average ticket</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="font-semibold text-2xl">$146.75</div>
          <CardDescription className="mt-1">USD on succeeded</CardDescription>
        </CardContent>
      </Card>
    </div>
  )
}
