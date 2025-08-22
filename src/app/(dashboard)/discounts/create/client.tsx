"use client"

import { useState } from "react"
import type { Key } from "react-aria-components"
import { Form } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { CardHeader } from "@/components/ui/card"
import { TextField } from "@/components/ui/text-field"
import { NumberField } from "@/components/ui/number-field"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectTrigger,
} from "@/components/ui/select"
import { DateRangePicker } from "@/components/ui/date-range-picker"
import {
  CheckCircleIcon,
  CalendarDateRangeIcon,
  CalendarIcon,
  MinusCircleIcon,
} from "@heroicons/react/24/solid"

export function Client() {
  const [type, setType] = useState<Key | null>("currency")
  const [status, setStatus] = useState<Key | null>("active")

  return (
    <Form className="space-y-12">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-[26rem_1fr]">
        <div>
          <CardHeader title="Basic details" description="Discount identity and classification" />
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <TextField isRequired label="Code" placeholder="Enter discount code" />
          <TextField isRequired label="Name" placeholder="Enter discount name" />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-[26rem_1fr]">
        <div>
          <CardHeader title="Type and value" description="Specify the discount type and value" />
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
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
            isRequired
            label="Value"
            placeholder="Enter discount value"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-[26rem_1fr]">
        <div>
          <CardHeader title="Usage" description="Set limits for how the discount can be applied" />
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <NumberField isRequired label="Usage limit" placeholder="Enter max usage" />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-[26rem_1fr]">
        <div>
          <CardHeader
            title="Status and schedule"
            description="Control the availability and timing of the discount"
          />
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <Select selectedKey={status} onSelectionChange={setStatus} isRequired label="Status">
            <SelectTrigger />
            <SelectContent>
              <SelectItem id="active" textValue="Active">
                <CheckCircleIcon className="size-4" />
                <SelectLabel>Active</SelectLabel>
              </SelectItem>
              <SelectItem id="scheduled" textValue="Scheduled">
                <CalendarDateRangeIcon className="size-4" />
                <SelectLabel>Scheduled</SelectLabel>
              </SelectItem>
              <SelectItem id="expired" textValue="Expired">
                <CalendarIcon className="size-4" />
                <SelectLabel>Expired</SelectLabel>
              </SelectItem>
              <SelectItem id="unlimited" textValue="Unlimited">
                <MinusCircleIcon className="size-4" />
                <SelectLabel>Unlimited</SelectLabel>
              </SelectItem>
            </SelectContent>
          </Select>
          {status === "scheduled" && <DateRangePicker label="Schedule" />}
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <Button type="submit">Save</Button>
      </div>
    </Form>
  )
}
