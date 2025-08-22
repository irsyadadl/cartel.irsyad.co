"use client"

import { Form } from "react-aria-components"
import { Button } from "@/components/ui/button"
import { CardHeader } from "@/components/ui/card"
import { NumberField } from "@/components/ui/number-field"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select"
import {
  ComboBox,
  ComboBoxInput,
  ComboBoxContent,
  ComboBoxItem,
  ComboBoxDescription,
  ComboBoxLabel,
} from "@/components/ui/combo-box"
import { DatePicker } from "@/components/ui/date-picker"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

import products from "@/data/products.json"
import { Label } from "@/components/ui/field"

export const locations = [
  { id: "wh-1", name: "Main warehouse" },
  { id: "wh-2", name: "Secondary warehouse" },
]

export const reasons = [
  { id: "damaged", name: "Damaged" },
  { id: "lost", name: "Lost" },
  { id: "found", name: "Found" },
  { id: "correction", name: "Correction" },
]

export function Client() {
  return (
    <Form className="space-y-12">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-[26rem_1fr]">
        <div>
          <CardHeader
            title="Product & location"
            description="Select the product and warehouse location"
          />
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
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
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-[26rem_1fr]">
        <div>
          <CardHeader title="Adjustment" description="Define how stock levels will be changed" />
        </div>
        <div className="grid grid-cols-1 items-end gap-6 sm:grid-cols-[auto_1fr]">
          <div className="flex flex-col gap-y-1">
            <Label>Type</Label>
            <div>
              <ToggleGroup defaultSelectedKeys="increase" aria-label="Adjustment type">
                <ToggleGroupItem id="increase">Increase</ToggleGroupItem>
                <ToggleGroupItem id="decrease">Decrease</ToggleGroupItem>
              </ToggleGroup>
            </div>
          </div>
          <NumberField label="Quantity" placeholder="Enter quantity" minValue={1} />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-[26rem_1fr]">
        <div>
          <CardHeader
            title="Details"
            description="Provide reason and effective date for this adjustment"
          />
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
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
      </div>

      <div className="flex justify-end gap-4">
        <Button type="submit">Save</Button>
      </div>
    </Form>
  )
}
