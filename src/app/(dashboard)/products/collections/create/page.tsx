import { Client } from "./client"
import {
  SectionContent,
  SectionDescription,
  SectionHeader,
  SectionTitle,
} from "@/components/section-header"

export const metadata = {
  title: "Create collection",
}
export default function Page() {
  return (
    <>
      <SectionHeader>
        <SectionContent>
          <SectionTitle>Create collection</SectionTitle>
          <SectionDescription>
            Create a new collection to organize your products. You can group products by category,
            theme, or any other criteria that fits your store.
          </SectionDescription>
        </SectionContent>
      </SectionHeader>
      <Client />
    </>
  )
}
