import { ListProducts } from "./list-products"
import {
  SectionContent,
  SectionDescription,
  SectionHeader,
  SectionTitle,
} from "@/components/section-header"
export const metadata = {
  title: "Products",
}
export default function Page() {
  return (
    <>
      <SectionHeader>
        <SectionContent>
          <SectionTitle>Products</SectionTitle>
          <SectionDescription>
            Manage your products, including adding new items, updating existing ones, and organizing
            them into collections.
          </SectionDescription>
        </SectionContent>
      </SectionHeader>
      <ListProducts />
    </>
  )
}
