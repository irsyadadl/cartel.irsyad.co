import { Heading } from "@/components/ui/heading"
import { AnalyticsOverview } from "./analythics-overview"

export const metadata = {
  title: "Analytics",
}

export default function Page() {
  return (
    <>
      <Heading>Analytics</Heading>
      <AnalyticsOverview />
    </>
  )
}
