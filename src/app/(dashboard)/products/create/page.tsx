import { Client } from "./client"
import {
  SectionContent,
  SectionDescription,
  SectionHeader,
  SectionTitle,
} from "@/components/section-header"

export const metadata = {
  title: "Create product",
}

export default function Page() {
  return (
    <>
      <SectionHeader>
        <SectionContent>
          <SectionTitle>New product</SectionTitle>
          <SectionDescription>
            Create a new product to add to your store. You can add product details, images, and
            pricing information.
          </SectionDescription>
        </SectionContent>
      </SectionHeader>

      <Client />
    </>
  )
}
