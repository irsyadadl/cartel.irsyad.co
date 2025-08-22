import { Heading } from "@/components/ui/heading"
import { ReportsOverview } from "./reports-overview"

export const metadata = {
  title: "Reports",
}

export default function Page() {
  return (
    <>
      <Heading>Reports</Heading>
      <ReportsOverview />
    </>
  )
}
