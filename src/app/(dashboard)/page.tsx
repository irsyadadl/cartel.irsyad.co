import { LatestOrder } from "./(partials)/latest-order"
import { Stats } from "./(partials)/stats"
import { TotalRevenue } from "./(partials)/total-revenue"
import { Overview } from "@/app/(dashboard)/(partials)/overview";

export default function Page() {
  return (
    <>
      <div className="text-muted-fg text-sm/6">
        Good morning, <strong className="font-medium text-fg">Katy!</strong>
      </div>
      <Stats />
      <TotalRevenue />
      <LatestOrder />
    </>
  )
}
