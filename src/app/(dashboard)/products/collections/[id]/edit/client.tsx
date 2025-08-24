"use client"

import { Form, type Selection } from "react-aria-components"
import { Button } from "@/components/ui/button"
import { CardHeader } from "@/components/ui/card"
import { TextField } from "@/components/ui/text-field"
import { Textarea } from "@/components/ui/textarea"
import { MultipleSelect, MultipleSelectItem } from "@/components/ui/multiple-select"
import { Radio, RadioGroup } from "@/components/ui/radio"
import products from "@/data/products.json"
import { useState } from "react"
import {
  Modal,
  ModalBody,
  ModalClose,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@/components/ui/modal"
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ListBulletIcon } from "@heroicons/react/16/solid"

const tags = [
  { id: "1", name: "Summer" },
  { id: "2", name: "Winter" },
  { id: "3", name: "Spring" },
  { id: "4", name: "Autumn" },
  { id: "5", name: "Casual" },
  { id: "6", name: "Formal" },
  { id: "7", name: "Sporty" },
  { id: "8", name: "Vintage" },
]

export function Client({collection}: {collection: Collection}) {
  const [open, setOpen] = useState(false)
  const [items, setItems] = useState([])
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set())
  return (
    <Form className="divide-y *:py-12 *:first:pt-0">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <CardHeader
            title="Name"
            description="The name of collection is how it appears on your site."
          />
        </div>
        <div>
          <TextField defaultValue={collection?.name} label="Name" />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <CardHeader
            title="Description"
            description="Short description of the collection for administrative purposes."
          />
        </div>
        <div>
          <Textarea defaultValue={collection?.description} label="Description" />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <CardHeader
            title="Tags"
            description="Collection tags are for administrative purposes and won't be visible to customers."
          />
        </div>
        <div>
          <MultipleSelect
            label="Tags"
            defaultSelectedKeys={collection?.tags}
            placeholder="Select tags"
            items={tags}>
            {tags.map((item) => (
              <MultipleSelectItem textValue={item.name} id={item.id}>{item.name}</MultipleSelectItem>
            ))}
          </MultipleSelect>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <CardHeader
            title="Visibility"
            description="Control whether the collection is visible to customers."
          />
        </div>
        <div>
          <RadioGroup defaultValue={collection?.visibility} name="visibility">
            <Radio
              value="public"
              label="Public"
              description="Products in this collection will be visible to all customers"
            />
            <Radio
              value="private"
              label="Private"
              description="Products in this collection will not be visible to customers"
            />
          </RadioGroup>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <CardHeader
            title="Products"
            description="Manually select products to be included in this collection."
          />
        </div>
        <div>
          <Button onPress={() => setOpen(true)} intent="outline">
            <ListBulletIcon />
            {items.length ?? collection?.product_count} Products selected
          </Button>
          <Modal isOpen={open} onOpenChange={setOpen}>
            <ModalContent size="5xl" className="**:[[role=dialog]]:[--g:var(--gutter)]">
              <ModalHeader
                title="Products"
                description="Select products to include in this collection"
              />
              <ModalBody>
                <Table
                  bleed
                  className="[--gutter:var(--g)]"
                  aria-label="Products"
                  selectionMode="multiple"
                  selectedKeys={selectedKeys}
                  onSelectionChange={setSelectedKeys}
                >
                  <TableHeader>
                    <TableColumn>Name</TableColumn>
                    <TableColumn>Price</TableColumn>
                    <TableColumn>Stock</TableColumn>
                    <TableColumn>Brand</TableColumn>
                    <TableColumn>Color</TableColumn>
                    <TableColumn>Material</TableColumn>
                  </TableHeader>
                  <TableBody items={products}>
                    {(item) => (
                      <TableRow id={item.id}>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.price}</TableCell>
                        <TableCell>{item.stock}</TableCell>
                        <TableCell>{item.brand}</TableCell>
                        <TableCell>{item.color}</TableCell>
                        <TableCell>{item.material}</TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </ModalBody>
              <ModalFooter className="flex-col sm:flex-row">
                {[...selectedKeys].length > 0 && (
                  <div className="mr-auto text-muted-fg text-sm/6">
                    {[...selectedKeys].length} Products selected
                  </div>
                )}
                <div className="flex flex-col-reverse sm:flex-row">
                  <ModalClose>Cancel</ModalClose>
                  <Button
                    isDisabled={[...selectedKeys].length === 0}
                    onPress={() => {
                      setItems([...selectedKeys] as [])
                      setOpen(false)
                    }}
                  >
                    Confirm
                  </Button>
                </div>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <Button type="submit">Save</Button>
      </div>
    </Form>
  )
}
