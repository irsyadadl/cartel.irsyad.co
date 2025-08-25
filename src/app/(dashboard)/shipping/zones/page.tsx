import { Client } from "./client"
import {
  SectionContent,
  SectionDescription,
  SectionHeader,
  SectionTitle,
} from "@/components/section-header"

export const metadata = {
  title: "Shipping zones",
}
export default function Page() {
  return (
    <>
      <SectionHeader>
        <SectionContent>
          <SectionTitle>Zones</SectionTitle>
          <SectionDescription>
            Define shipping zones to manage rates and destinations effectively.
          </SectionDescription>
        </SectionContent>
      </SectionHeader>
      <Client />
    </>
  )
}
