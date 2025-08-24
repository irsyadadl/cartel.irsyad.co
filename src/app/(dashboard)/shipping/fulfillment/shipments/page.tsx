import { Client } from "./client"
import {
  SectionContent,
  SectionDescription,
  SectionHeader,
  SectionTitle,
} from "@/components/section-header"

export default function Page() {
  return (
    <>
      <SectionHeader>
        <SectionContent>
          <SectionTitle>Shipments</SectionTitle>
          <SectionDescription>
            Manage and track your order shipments efficiently.
          </SectionDescription>
        </SectionContent>
      </SectionHeader>
      <Client />
    </>
  )
}
