"use client"

import { ModalBody, ModalFooter } from "@/components/ui/modal"
import { RouteModal, RouteModalClose } from "@/components/route-modal"
import { TextField } from "@/components/ui/text-field"
import { Form } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { NumberField } from "@/components/ui/number-field"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectTrigger,
} from "@/components/ui/select"
import {
  CalendarDateRangeIcon,
  CalendarIcon,
  CheckCircleIcon,
  MinusCircleIcon,
} from "@heroicons/react/24/solid"
import { DateRangePicker } from "@/components/ui/date-range-picker"
import { useState } from "react"
import type { Key } from "react-aria-components"

export default function Page() {
  const [type, setType] = useState<Key | null>("currency")
  const [status, setStatus] = useState<Key | null>("")
  return (
    <RouteModal
      size="2xl"
      title="Create new discount"
      description="You can create a percentage discount or a fixed amount discount."
    >
      <Form>
        <ModalBody>
          <div className="flex flex-col gap-y-6">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <TextField isRequired label="Code" />
              <TextField isRequired label="Name" />
            </div>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <Select selectedKey={type} onSelectionChange={setType} isRequired label="Type">
                <SelectTrigger />
                <SelectContent>
                  <SelectItem id="currency">Fixed amount</SelectItem>
                  <SelectItem id="percent">Percentage</SelectItem>
                </SelectContent>
              </Select>

              <NumberField
                formatOptions={{
                  style: type === "percent" ? "percent" : "currency",
                  currency: type === "percent" ? undefined : "USD",
                }}
                placeholder="Enter discount value"
                maxValue={type === "percent" ? 99 : undefined}
                minValue={1}
                isRequired
                label="Value"
              />
            </div>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <NumberField isRequired label="Usage limit" />
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <Select
                selectedKey={status}
                onSelectionChange={setStatus}
                isRequired
                label="Status"
                placeholder="Select a status"
              >
                <SelectTrigger />
                <SelectContent>
                  <SelectItem id="active" textValue="Active">
                    <CheckCircleIcon />
                    <SelectLabel>Active</SelectLabel>
                  </SelectItem>
                  <SelectItem id="scheduled" textValue="Scheduled">
                    <CalendarDateRangeIcon />
                    <SelectLabel>Scheduled</SelectLabel>
                  </SelectItem>
                  <SelectItem id="expired" textValue="Expired">
                    <CalendarIcon />
                    <SelectLabel>Expired</SelectLabel>
                  </SelectItem>
                  <SelectItem id="unlimited" textValue="Unlimited">
                    <MinusCircleIcon />
                    <SelectLabel>Unlimited</SelectLabel>
                  </SelectItem>
                </SelectContent>
              </Select>
              {status === "scheduled" && <DateRangePicker label="Schedule" />}
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <RouteModalClose />
          <Button type="submit">Create</Button>
        </ModalFooter>
      </Form>
    </RouteModal>
  )
}
