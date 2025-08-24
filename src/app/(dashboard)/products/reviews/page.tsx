import { Client } from "./client"
import {
  SectionContent,
  SectionDescription,
  SectionHeader,
  SectionTitle,
} from "@/components/section-header"

export const metadata = {
  title: "Product reviews",
}
export default function Page() {
  return (
    <>
      <SectionHeader>
        <SectionContent>
          <SectionTitle>Product reviews</SectionTitle>
          <SectionDescription>
            Manage and moderate customer reviews for your products.
          </SectionDescription>
        </SectionContent>
      </SectionHeader>
      <Client />
    </>
  )
}
