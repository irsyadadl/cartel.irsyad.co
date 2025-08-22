import { ListInventory } from "./list-inventory"
import {
  SectionContent,
  SectionDescription,
  SectionHeader,
  SectionTitle,
} from "@/components/section-header"

export const metadata = {
  title: "Inventory",
}

export default function Page() {
  return (
    <>
      <SectionHeader>
        <SectionContent>
          <SectionTitle>Inventory</SectionTitle>
          <SectionDescription>
            Manage your inventory, including stock levels, locations, and adjustments.
          </SectionDescription>
        </SectionContent>
      </SectionHeader>
      <ListInventory />
    </>
  )
}
