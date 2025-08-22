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
          <SectionTitle>New inventory adjustment</SectionTitle>
          <SectionDescription>
            Record a stock correction by selecting a product, location, and adjustment details.
          </SectionDescription>
        </SectionContent>
      </SectionHeader>

      <Client />
    </>
  )
}
