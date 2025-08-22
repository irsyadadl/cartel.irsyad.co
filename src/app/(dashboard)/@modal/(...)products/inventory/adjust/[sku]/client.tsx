"use client"

import { Form } from "@/components/ui/form"
import { ModalBody, ModalFooter } from "@/components/ui/modal"
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select"
import { locations, reasons } from "@/app/(dashboard)/products/inventory/adjust/client"
import { Label } from "@/components/ui/field"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { NumberField } from "@/components/ui/number-field"
import { DatePicker } from "@/components/ui/date-picker"
import { Textarea } from "@/components/ui/textarea"
import { RouteModalClose } from "@/components/route-modal"
import { Button } from "@/components/ui/button"
import { TextField } from "@/components/ui/text-field"
export function Client({ product }: { product: Product }) {
  return (
    <Form>
      <ModalBody>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <TextField isReadOnly label={`SKU - ${product.sku}`} defaultValue={product.name} />

          <Select
            defaultSelectedKey={locations[0].id}
            label="Location"
            placeholder="Select location"
          >
            <SelectTrigger />
            <SelectContent items={locations}>
              {(loc) => <SelectItem id={loc.id}>{loc.name}</SelectItem>}
            </SelectContent>
          </Select>
          <div className="col-span-full grid grid-cols-1 items-center gap-6 lg:grid-cols-[auto_1fr]">
            <div className="flex flex-col gap-y-1">
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
      </ModalBody>
      <ModalFooter>
        <RouteModalClose />
        <Button type="submit">Adjust</Button>
      </ModalFooter>
    </Form>
  )
}
