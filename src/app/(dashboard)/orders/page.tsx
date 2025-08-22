import { ListOrders } from "./list-orders"
import { Suspense } from "react"

export const metadata = {
  title: "Orders",
}

export default function Page() {
  return (
    <Suspense>
      <ListOrders />
    </Suspense>
  )
}
