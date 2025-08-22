import {
  SectionContent,
  SectionDescription,
  SectionHeader,
  SectionTitle,
} from "@/components/section-header"
import { Client } from "./client"

export const metadata = {
  title: "Create discount",
}

export default function Page() {
  return (
    <>
      <SectionHeader>
        <SectionContent>
          <SectionTitle>Create new discount</SectionTitle>
          <SectionDescription>
            You can create a percentage discount or a fixed amount discount.
          </SectionDescription>
        </SectionContent>
      </SectionHeader>

      <Client />
    </>
  )
}
