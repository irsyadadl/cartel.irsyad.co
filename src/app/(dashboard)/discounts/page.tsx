import { ListDiscounts } from "./list-discounts"
import {
  SectionContent,
  SectionDescription,
  SectionHeader,
  SectionTitle,
} from "@/components/section-header"
export const metadata = {
  title: "Discounts",
}
export default function Page() {
  return (
    <>
      <SectionHeader>
        <SectionContent>
          <SectionTitle>List of discounts</SectionTitle>
          <SectionDescription>
            ou can create, edit, and delete discounts. Discounts can be applied to products or
            orders.
          </SectionDescription>
        </SectionContent>
      </SectionHeader>
      <ListDiscounts />
    </>
  )
}
