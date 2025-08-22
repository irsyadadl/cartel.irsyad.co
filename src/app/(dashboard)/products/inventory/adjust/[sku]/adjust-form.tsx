import {
  ComboBox,
  ComboBoxContent,
  ComboBoxDescription,
  ComboBoxInput,
  ComboBoxItem,
  ComboBoxLabel,
} from "@/components/ui/combo-box"
import products from "@/data/products.json"
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select"
import { locations, reasons } from "@/app/(dashboard)/products/inventory/adjust/client"
import { Label } from "@/components/ui/field"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { NumberField } from "@/components/ui/number-field"
import { DatePicker } from "@/components/ui/date-picker"
import { Textarea } from "@/components/ui/textarea"

export function AdjustForm() {
  return (
    <div className="grid grid-cols-2 gap-6">
      <ComboBox label="Product" placeholder="Search product by name or SKU">
        <ComboBoxInput />
        <ComboBoxContent items={products}>
          {(item) => (
            <ComboBoxItem key={item.id} textValue={item.name} id={String(item.id)}>
              <ComboBoxLabel>{item.name}</ComboBoxLabel>
              <ComboBoxDescription>{item.sku}</ComboBoxDescription>
            </ComboBoxItem>
          )}
        </ComboBoxContent>
      </ComboBox>

      <Select label="Location" placeholder="Select location">
        <SelectTrigger />
        <SelectContent items={locations}>
          {(loc) => <SelectItem id={loc.id}>{loc.name}</SelectItem>}
        </SelectContent>
      </Select>
      <div className="col-span-full grid grid-cols-[auto_1fr] items-center">
        <div className="flex flex-col gap-y-1.5">
          <Label className="font-medium">Type</Label>
          <div>
            <ToggleGroup defaultSelectedKeys="increase" aria-label="Adjustment type">
              <ToggleGroupItem id="increase">Increase</ToggleGroupItem>
              <ToggleGroupItem id="decrease">Decrease</ToggleGroupItem>
            </ToggleGroup>
          </div>
        </div>
        <NumberField label="Quantity" placeholder="Enter quantity" minValue={1} />
      </div>
      <Select label="Reason" placeholder="Select reason">
        <SelectTrigger />
        <SelectContent items={reasons}>
          {(reason) => <SelectItem id={reason.id}>{reason.name}</SelectItem>}
        </SelectContent>
      </Select>
      <DatePicker label="Date" />
      <Textarea
        label="Note"
        placeholder="Describe why this adjustment is needed"
        className="sm:col-span-2"
      />
    </div>
  )
}
