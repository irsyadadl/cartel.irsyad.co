"use client"

import { Form } from "react-aria-components"
import { TextField } from "@/components/ui/text-field"
import { ColorPicker } from "@/components/ui/color-picker"
import { ComboBox, ComboBoxContent, ComboBoxInput, ComboBoxItem } from "@/components/ui/combo-box"
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { NumberField } from "@/components/ui/number-field"
import categories from "@/data/categories.json"
import { Radio, RadioGroup } from "@/components/ui/radio"
import { Description, Label } from "@/components/ui/field"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { useState } from "react"
import { FileTrigger, Button as PrimitiveButton } from "react-aria-components"
import products from "@/data/products.json"
import { PaperClipIcon } from "@heroicons/react/16/solid"
const statuses = [
  { id: "active", name: "Active", description: "Currently enabled and available for use" },
  { id: "inactive", name: "Inactive", description: "Temporarily disabled but can be reactivated" },
  { id: "pending", name: "Pending", description: "Awaiting approval or further action" },
  { id: "archived", name: "Archived", description: "Stored for reference and no longer active" },
  { id: "deleted", name: "Deleted", description: "Removed from the system and not available" },
]

const materials = [
  {
    id: "cotton",
    name: "Cotton",
    description: "Soft, breathable, and lightweight natural fiber, commonly used in clothing.",
  },
  {
    id: "polyester",
    name: "Polyester",
    description: "Durable synthetic fabric that resists shrinking and wrinkles.",
  },
  {
    id: "leather",
    name: "Leather",
    description:
      "Strong and flexible material made from animal hide, often used in shoes and bags.",
  },
  {
    id: "wool",
    name: "Wool",
    description: "Warm and insulating natural fiber from sheep, popular for sweaters and coats.",
  },
  {
    id: "linen",
    name: "Linen",
    description: "Lightweight and breathable natural fabric made from flax, ideal for summer wear.",
  },
  {
    id: "silk",
    name: "Silk",
    description: "Luxurious, smooth, and shiny natural fiber made by silkworms.",
  },
  {
    id: "denim",
    name: "Denim",
    description: "Durable cotton fabric with a twill weave, commonly used for jeans.",
  },
  {
    id: "nylon",
    name: "Nylon",
    description: "Lightweight, strong, and quick-drying synthetic fiber often used in sportswear.",
  },
  {
    id: "suede",
    name: "Suede",
    description: "Type of leather with a soft, napped finish, used in shoes and jackets.",
  },
  {
    id: "velvet",
    name: "Velvet",
    description: "Soft, plush fabric with a dense pile, giving a luxurious feel and look.",
  },
]

const brands: string[] = ["Barton, Miller and Kuvalis", "Gibson and Sons", "Other Brand"]

const product = products[0]

interface FileInfo {
  name: string
  extension: string
  size: string
  type: string
  lastModified: string
  previewUrl: string
}

export function Client() {
  const [fileInfo, setFileInfo] = useState<FileInfo | null>(null)

  const handleSelect = (e: FileList | null) => {
    if (!e) return
    const file = e[0]
    if (!file) return

    const extension = file.name.split(".").pop() ?? ""
    const size = `${(file.size / 1024).toFixed(2)} KB`

    setFileInfo({
      name: file.name,
      extension,
      size,
      type: file.type,
      lastModified: new Date(file.lastModified).toLocaleString(),
      previewUrl: URL.createObjectURL(file),
    })
  }
  return (
    <Form className="space-y-12">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-[26rem_1fr]">
        <div>
          <CardHeader
            title="Thumbnail"
            description="Upload a product image to represent it visually"
          />
        </div>
        <div className="flex gap-6">
          <div className="group relative size-full shrink-0 overflow-hidden rounded-lg sm:sm:size-64">
            <img
              src={fileInfo ? fileInfo.previewUrl : product.thumbnail}
              alt={fileInfo ? fileInfo.name : product.name}
              className="aspect-square size-full rounded-lg border-gray-400 object-cover object-center duration-300 group-hover:scale-110 sm:sm:size-64"
            />

            <FileTrigger onSelect={handleSelect} acceptedFileTypes={["image/*"]}>
              <PrimitiveButton className="absolute inset-0 z-20 flex items-center justify-center opacity-0 transition duration-200 group-hover:opacity-100">
                <span className="z-30 flex items-center gap-x-1 rounded-full bg-white px-2 py-1.5 font-medium text-gray-900 text-xs">
                  <PaperClipIcon className="size-4 text-gray-500" />
                  Replace image
                </span>
              </PrimitiveButton>
            </FileTrigger>

            <div className="absolute inset-0 hidden bg-gray-950/50 group-hover:block" />
          </div>

          {fileInfo && (
            <Card className="w-full [--gutter:--spacing(4)]">
              <CardHeader
                className="-mb-2"
                title="File details"
                description="Information about the uploaded file"
              />
              <CardContent>
                <dl className="relative hidden w-full grid-cols-[6rem_auto] text-sm/6 *:py-1 lg:grid *:[dd]:font-medium *:[dt]:text-muted-fg">
                  <dt>Name</dt>
                  <dd className="block truncate">: {fileInfo.name}</dd>
                  <dt>Extension</dt>
                  <dd className="uppercase">: {fileInfo.extension}</dd>
                  <dt>Size</dt>
                  <dd>: {fileInfo.size}</dd>
                  <dt>Type</dt>
                  <dd>: {fileInfo.type}</dd>
                  <dt>Last</dt>
                  <dd>: {fileInfo.lastModified}</dd>
                </dl>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-[26rem_1fr]">
        <div>
          <CardHeader title="Basic details" description="Product identity and classification" />
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 ">
          <TextField label="SKU" placeholder="Enter SKU" />
          <TextField label="Name" placeholder="Enter product name" />
          <ComboBox label="Brand" placeholder="Select or enter brand">
            <ComboBoxInput />
            <ComboBoxContent>
              {brands.map((brand) => (
                <ComboBoxItem key={brand} id={brand}>
                  {brand}
                </ComboBoxItem>
              ))}
            </ComboBoxContent>
          </ComboBox>
          <Select label="Category" placeholder="Select category">
            <SelectTrigger />
            <SelectContent items={categories}>
              {(item) => <SelectItem>{item.name}</SelectItem>}
            </SelectContent>
          </Select>

          <Textarea
            defaultValue={product.description}
            label="Description"
            placeholder="Enter product description"
            className="sm:col-span-2"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-[26rem_1fr]">
        <div>
          <CardHeader
            title="Attributes"
            description="Descriptive content and variant options for the product"
          />
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-[auto_1fr] ">
          <div>
            <Label className="font-medium">Color</Label>
            <ColorPicker eyeDropper className="mt-1" aria-label="Pick the color" />
          </div>
          <Select label="Material" placeholder="Select material">
            <SelectTrigger />
            <SelectContent items={materials}>
              {(material) => <SelectItem>{material.name}</SelectItem>}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-[26rem_1fr]">
        <div>
          <CardHeader
            title="Pricing and inventory"
            description="Set commercial values and stock levels"
          />
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 ">
          <NumberField
            formatOptions={{
              currency: "USD",
              style: "currency",
            }}
            defaultValue={product.price}
            minValue={1}
            label="Price"
            placeholder="Enter price"
          />
          <NumberField
            defaultValue={product.stock}
            minValue={1}
            label="Stock"
            placeholder="Enter stock quantity"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-[26rem_1fr]">
        <div>
          <CardHeader
            title="Product status"
            description="Define the current state and availability of the product"
          />
        </div>
        <div className="">
          <RadioGroup
            defaultValue="active"
            label="Status"
            description="Select the current status of the product"
            orientation="horizontal"
            className="w-full"
          >
            {statuses.map((status) => (
              <Radio key={status.id} value={status.id}>
                <Label>{status.name}</Label>
                <Description>{status.description}</Description>
              </Radio>
            ))}
          </RadioGroup>
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <Button type="submit">Save</Button>
      </div>
    </Form>
  )
}
