"use client"

import { Tab, TabList, TabPanel, Tabs } from "@/components/ui/tabs"
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Menu, MenuContent, MenuItem, MenuLabel, MenuSeparator } from "@/components/ui/menu"
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Pressable } from "react-aria-components"
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from "@/components/ui/modal"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  ClipboardIcon,
  EllipsisVerticalIcon,
  IdentificationIcon,
  PencilSquareIcon,
  ReceiptRefundIcon,
  ShieldCheckIcon,
  TrashIcon,
} from "@heroicons/react/24/solid"
import { MegaphoneIcon } from "@heroicons/react/16/solid"
import { formatDate } from "@/lib/date"
import { formatNumber } from "@/lib/number"
import { Link } from "@/components/ui/link"
import {
  SectionAction,
  SectionContent,
  SectionDescription,
  SectionHeader,
  SectionTitle,
} from "@/components/section-header"
import { Avatar } from "@/components/ui/avatar"
import { ChevronDownIcon } from "@heroicons/react/20/solid"

export function Client({ customer }: { customer: Customer }) {
  return (
    <>
      <SectionHeader>
        <SectionContent>
          <div className="flex gap-3">
            <Avatar isSquare size="4xl" src="https://irsyad.co/images/blocks/avatar/woman.webp" />
            <div>
              <SectionTitle>{customer.name}</SectionTitle>
              <SectionDescription>
                {customer.email} <br />
                ID: #{customer.id}
              </SectionDescription>
            </div>
          </div>
        </SectionContent>
        <SectionAction className="justify-end">
          <Menu>
            <Button>
              Actions... <ChevronDownIcon />
            </Button>
            <MenuContent placement="bottom end" className="min-w-40">
              <MenuItem href="#">
                <PencilSquareIcon />
                <MenuLabel>Edit user</MenuLabel>
              </MenuItem>
              <MenuSeparator />
              <MenuItem href="#">
                <ShieldCheckIcon />
                <MenuLabel>Suspend user</MenuLabel>
              </MenuItem>
              <MenuItem>
                <ClipboardIcon />
                <MenuLabel>Copy email</MenuLabel>
              </MenuItem>
              <MenuSeparator />
              <MenuItem isDanger href="#">
                <TrashIcon />
                <MenuLabel>Delete user</MenuLabel>
              </MenuItem>
            </MenuContent>
          </Menu>
        </SectionAction>
      </SectionHeader>
      <Tabs>
        <TabList>
          <Tab id="p">Purchase history</Tab>
          <Tab id="r">Reviews</Tab>
          <Tab id="w">Wishlist</Tab>
          <Tab id="a">Activity</Tab>
        </TabList>
        <TabPanel id="p">
          <CardHeader>
            <CardTitle>Purchase history</CardTitle>
            <CardDescription>
              {customerDetail.purchase_history.length} orders placed
            </CardDescription>
          </CardHeader>
          <Table className="mt-4" striped aria-label="Customer purchase history">
            <TableHeader>
              <TableColumn>Order</TableColumn>
              <TableColumn isRowHeader>Date</TableColumn>
              <TableColumn>Total</TableColumn>
              <TableColumn>Status</TableColumn>
              <TableColumn>Items</TableColumn>
              <TableColumn>Payment</TableColumn>
              <TableColumn>Shipping</TableColumn>
              <TableColumn></TableColumn>
            </TableHeader>
            <TableBody items={customerDetail.purchase_history}>
              {(order) => (
                <TableRow>
                  <TableCell>{order.order_number}</TableCell>
                  <TableCell>{formatDate(order.ordered_at)}</TableCell>
                  <TableCell>
                    {formatNumber(order.pricing.total, {
                      style: "currency",
                      currency: order.currency,
                    })}
                  </TableCell>
                  <TableCell>
                    <Badge
                      intent={
                        order.status === "delivered"
                          ? "success"
                          : order.status === "shipped"
                            ? "info"
                            : "secondary"
                      }
                    >
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Modal>
                      <Pressable>
                        <Badge role="button" intent="secondary">
                          {order.items.length} items
                        </Badge>
                      </Pressable>
                      <ModalContent className="**:[[role=dialog]]:[--d:var(--gutter)] **:[[role=dialog]]:[--gutter:--spacing(6)]">
                        <ModalHeader>
                          <ModalTitle>Order {order.order_number} items</ModalTitle>
                          <ModalDescription>{order.items.length} items purchased</ModalDescription>
                        </ModalHeader>
                        <ModalBody>
                          {/*{ product_id: 44, name_snapshot: "Mechanical keyboard 75%", category_snapshot: "electronics", quantity: 2, unit_price: 139, subtotal: 278 },*/}

                          <Table bleed className="[--gutter:var(--d)]">
                            <TableHeader>
                              <TableRow>
                                <TableColumn isRowHeader>Product ID</TableColumn>
                                <TableColumn isRowHeader>Name</TableColumn>
                                <TableColumn>Category</TableColumn>
                                <TableColumn>Quantity</TableColumn>
                                <TableColumn>Unit Price</TableColumn>
                                <TableColumn>Subtotal</TableColumn>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {order.items.map((item, index) => (
                                <TableRow key={index}>
                                  <TableCell>{item.product_id}</TableCell>
                                  <TableCell>{item.name_snapshot}</TableCell>
                                  <TableCell>{item.category_snapshot}</TableCell>
                                  <TableCell>{item.quantity}</TableCell>
                                  <TableCell>
                                    {item.unit_price} {order.currency}
                                  </TableCell>
                                  <TableCell>
                                    {item.subtotal} {order.currency}
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </ModalBody>
                        <ModalFooter />
                      </ModalContent>
                    </Modal>
                  </TableCell>
                  <TableCell>
                    {order.payment.method} ({order.payment.brand} ****{order.payment.last4})
                  </TableCell>
                  <TableCell>
                    {order.shipping.provider} ({order.shipping.service})
                  </TableCell>
                  <TableCell>
                    <Menu>
                      <Button
                        size="sq-sm"
                        className="sm:size-6"
                        intent="plain"
                        aria-label="open action"
                      >
                        <EllipsisVerticalIcon />
                      </Button>
                      <MenuContent placement="left top" className="min-w-40">
                        <MenuItem>
                          <IdentificationIcon />
                          <MenuLabel>View details</MenuLabel>
                        </MenuItem>
                        <MenuItem>
                          <ReceiptRefundIcon />
                          <MenuLabel>Refund order</MenuLabel>
                        </MenuItem>
                        <MenuSeparator />
                        <MenuItem>
                          <MegaphoneIcon />
                          <MenuLabel>Contact support</MenuLabel>
                        </MenuItem>
                      </MenuContent>
                    </Menu>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TabPanel>
        <TabPanel id="r">
          <CardHeader>
            <CardTitle>Reviews</CardTitle>
            <CardDescription>{customerDetail.reviews.length} reviews submitted</CardDescription>
          </CardHeader>
          <Table className="mt-4" striped aria-label="Customer reviews">
            <TableHeader>
              <TableColumn>Product ID</TableColumn>
              <TableColumn isRowHeader>Rating</TableColumn>
              <TableColumn>Title</TableColumn>
              <TableColumn>Body</TableColumn>
              <TableColumn>Helpful</TableColumn>
              <TableColumn>Status</TableColumn>
              <TableColumn>Submitted</TableColumn>
            </TableHeader>
            <TableBody items={[]} />
          </Table>
        </TabPanel>
        <TabPanel id="w">
          <CardHeader>
            <CardTitle>Wishlist</CardTitle>
            <CardDescription>{customerDetail.wishlist.length} products added</CardDescription>
          </CardHeader>
          <Table className="mt-4" striped aria-label="Customer wishlist">
            <TableHeader>
              <TableColumn isRowHeader>Name</TableColumn>
              <TableColumn>Price</TableColumn>
              <TableColumn>Availability</TableColumn>
              <TableColumn>Added</TableColumn>
            </TableHeader>
            <TableBody items={customerDetail.wishlist}>
              {(item) => (
                <TableRow id={`product-${item.product_id}`}>
                  <TableCell>
                    <Link href={item.href} className="text-blue-600 hover:underline">
                      {item.name}
                    </Link>
                  </TableCell>
                  <TableCell>
                    {formatNumber(item.price, {
                      style: "currency",
                      currency: item.currency,
                    })}
                  </TableCell>
                  <TableCell>
                    <Badge
                      intent={
                        item.availability === "in_stock"
                          ? "success"
                          : item.availability === "preorder"
                            ? "warning"
                            : "secondary"
                      }
                    >
                      {item.availability.replace("_", " ")}
                    </Badge>
                  </TableCell>
                  <TableCell>{formatDate(item.added_at)}</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TabPanel>
        <TabPanel id="a">
          <CardHeader>
            <CardTitle>Activity</CardTitle>
            <CardDescription>{customerDetail.activity.length} activities logged</CardDescription>
          </CardHeader>
          <Table className="mt-4" striped aria-label="Customer activity">
            <TableHeader>
              <TableColumn>Type</TableColumn>
              <TableColumn isRowHeader>Message</TableColumn>
              <TableColumn>When</TableColumn>
            </TableHeader>
            <TableBody items={customerDetail.activity}>
              {(activity) => (
                <TableRow id={`activity-${activity.id}`}>
                  <TableCell>{activity.type.replaceAll("_", " ")}</TableCell>
                  <TableCell>{activity.message}</TableCell>
                  <TableCell>{formatDate(activity.created_at)}</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TabPanel>
      </Tabs>
    </>
  )
}

const customerDetail = {
  purchase_history: [
    {
      id: 100130,
      order_number: "100180",
      ordered_at: "2024-07-11 08:23:56",
      currency: "USD",
      pricing: { subtotal: 417, shipping_fee: 12.5, discount: 142.65, tax: 23.32, total: 310.17 },
      status: "delivered",
      payment: { provider: "stripe", method: "card", brand: "visa", last4: "4242" },
      shipping: { provider: "UPS", service: "standard", tracking_number: "UP2531" },
      items: [
        {
          product_id: 44,
          name_snapshot: "Mechanical keyboard 75%",
          category_snapshot: "electronics",
          quantity: 2,
          unit_price: 139,
          subtotal: 278,
        },
        {
          product_id: 42,
          name_snapshot: "Wireless earbuds Pro",
          category_snapshot: "electronics",
          quantity: 1,
          unit_price: 149,
          subtotal: 149,
        },
        {
          product_id: 43,
          name_snapshot: "13-inch laptop sleeve",
          category_snapshot: "accessories",
          quantity: 1,
          unit_price: 29,
          subtotal: 29,
        },
      ],
    },
    {
      id: 100131,
      order_number: "100181",
      ordered_at: "2024-09-05 10:08:51",
      currency: "USD",
      pricing: { subtotal: 119, shipping_fee: 9.99, discount: 18.06, tax: 7.23, total: 118.16 },
      status: "delivered",
      payment: { provider: "paypal", method: "paypal", brand: "paypal", last4: "" },
      shipping: { provider: "FedEx", service: "standard", tracking_number: "FE3408" },
      items: [
        {
          product_id: 32,
          name_snapshot: "Retro leather trainers",
          category_snapshot: "footwear",
          quantity: 1,
          unit_price: 119,
          subtotal: 119,
        },
      ],
    },
    {
      id: 100132,
      order_number: "100182",
      ordered_at: "2024-10-19 11:06:13",
      currency: "USD",
      pricing: { subtotal: 417, shipping_fee: 9.99, discount: 110.33, tax: 3.96, total: 319.62 },
      status: "delivered",
      payment: { provider: "stripe", method: "card", brand: "visa", last4: "4242" },
      shipping: { provider: "FedEx", service: "standard", tracking_number: "FE9384" },
      items: [
        {
          product_id: 49,
          name_snapshot: "Smartwatch Sport",
          category_snapshot: "electronics",
          quantity: 2,
          unit_price: 199,
          subtotal: 398,
        },
        {
          product_id: 43,
          name_snapshot: "13-inch laptop sleeve",
          category_snapshot: "accessories",
          quantity: 1,
          unit_price: 29,
          subtotal: 29,
        },
      ],
    },
    {
      id: 100133,
      order_number: "100183",
      ordered_at: "2024-11-27 20:48:25",
      currency: "USD",
      pricing: { subtotal: 179, shipping_fee: 4.99, discount: 23.47, tax: 19.99, total: 179.51 },
      status: "delivered",
      payment: { provider: "stripe", method: "card", brand: "mastercard", last4: "4444" },
      shipping: { provider: "DHL", service: "standard", tracking_number: "DH7802" },
      items: [
        {
          product_id: 31,
          name_snapshot: "Classic sneakers low",
          category_snapshot: "footwear",
          quantity: 1,
          unit_price: 129,
          subtotal: 129,
        },
        {
          product_id: 41,
          name_snapshot: "Minimalist backpack 20L",
          category_snapshot: "bags",
          quantity: 1,
          unit_price: 89,
          subtotal: 89,
        },
      ],
    },
    {
      id: 100134,
      order_number: "100184",
      ordered_at: "2025-01-06 06:11:17",
      currency: "USD",
      pricing: { subtotal: 357, shipping_fee: 14, discount: 71.78, tax: 15.21, total: 314.43 },
      status: "delivered",
      payment: { provider: "stripe", method: "card", brand: "mastercard", last4: "4444" },
      shipping: { provider: "FedEx", service: "standard", tracking_number: "FE9575" },
      items: [
        {
          product_id: 44,
          name_snapshot: "Mechanical keyboard 75%",
          category_snapshot: "electronics",
          quantity: 1,
          unit_price: 139,
          subtotal: 139,
        },
        {
          product_id: 42,
          name_snapshot: "Wireless earbuds Pro",
          category_snapshot: "electronics",
          quantity: 1,
          unit_price: 149,
          subtotal: 149,
        },
        {
          product_id: 45,
          name_snapshot: "Standing desk mat",
          category_snapshot: "home office",
          quantity: 1,
          unit_price: 59,
          subtotal: 59,
        },
        {
          product_id: 43,
          name_snapshot: "13-inch laptop sleeve",
          category_snapshot: "accessories",
          quantity: 1,
          unit_price: 29,
          subtotal: 29,
        },
      ],
    },
    {
      id: 100135,
      order_number: "100185",
      ordered_at: "2025-02-16 08:27:49",
      currency: "USD",
      pricing: { subtotal: 329, shipping_fee: 7.99, discount: 95.27, tax: 16.48, total: 257.2 },
      status: "delivered",
      payment: { provider: "stripe", method: "card", brand: "visa", last4: "4242" },
      shipping: { provider: "UPS", service: "standard", tracking_number: "UP3254" },
      items: [
        {
          product_id: 49,
          name_snapshot: "Smartwatch Sport",
          category_snapshot: "electronics",
          quantity: 1,
          unit_price: 199,
          subtotal: 199,
        },
        {
          product_id: 44,
          name_snapshot: "Mechanical keyboard 75%",
          category_snapshot: "electronics",
          quantity: 1,
          unit_price: 139,
          subtotal: 139,
        },
        {
          product_id: 50,
          name_snapshot: "Wool running socks 3-pack",
          category_snapshot: "apparel",
          quantity: 1,
          unit_price: 24,
          subtotal: 24,
        },
      ],
    },
    {
      id: 100136,
      order_number: "100186",
      ordered_at: "2025-03-18 12:35:08",
      currency: "USD",
      pricing: { subtotal: 129, shipping_fee: 7.99, discount: 22.04, tax: 7.4, total: 122.35 },
      status: "delivered",
      payment: { provider: "paypal", method: "paypal", brand: "paypal", last4: "" },
      shipping: { provider: "USPS", service: "standard", tracking_number: "US3991" },
      items: [
        {
          product_id: 31,
          name_snapshot: "Classic sneakers low",
          category_snapshot: "footwear",
          quantity: 1,
          unit_price: 129,
          subtotal: 129,
        },
      ],
    },
    {
      id: 100137,
      order_number: "100187",
      ordered_at: "2025-04-08 16:18:42",
      currency: "USD",
      pricing: { subtotal: 194, shipping_fee: 9.99, discount: 65.76, tax: 9.99, total: 148.12 },
      status: "delivered",
      payment: { provider: "stripe", method: "card", brand: "visa", last4: "4242" },
      shipping: { provider: "USPS", service: "standard", tracking_number: "US6753" },
      items: [
        {
          product_id: 46,
          name_snapshot: "Merino crew neck tee",
          category_snapshot: "apparel",
          quantity: 2,
          unit_price: 45,
          subtotal: 90,
        },
        {
          product_id: 47,
          name_snapshot: "Travel adapter USB-C",
          category_snapshot: "travel",
          quantity: 1,
          unit_price: 35,
          subtotal: 35,
        },
        {
          product_id: 48,
          name_snapshot: "Insulated water bottle 1L",
          category_snapshot: "outdoors",
          quantity: 1,
          unit_price: 28,
          subtotal: 28,
        },
        {
          product_id: 45,
          name_snapshot: "Standing desk mat",
          category_snapshot: "home office",
          quantity: 1,
          unit_price: 59,
          subtotal: 59,
        },
      ],
    },
    {
      id: 100138,
      order_number: "100188",
      ordered_at: "2025-05-07 07:22:31",
      currency: "USD",
      pricing: { subtotal: 179, shipping_fee: 7.99, discount: 46.9, tax: 13, total: 115.09 },
      status: "delivered",
      payment: { provider: "paypal", method: "paypal", brand: "paypal", last4: "" },
      shipping: { provider: "USPS", service: "standard", tracking_number: "US7032" },
      items: [
        {
          product_id: 41,
          name_snapshot: "Minimalist backpack 20L",
          category_snapshot: "bags",
          quantity: 2,
          unit_price: 89,
          subtotal: 178,
        },
      ],
    },
    {
      id: 100139,
      order_number: "100189",
      ordered_at: "2025-05-28 05:10:18",
      currency: "USD",
      pricing: { subtotal: 149, shipping_fee: 7.99, discount: 29.04, tax: 5.01, total: 132.96 },
      status: "delivered",
      payment: { provider: "paypal", method: "paypal", brand: "paypal", last4: "" },
      shipping: { provider: "DHL", service: "standard", tracking_number: "DH3015" },
      items: [
        {
          product_id: 42,
          name_snapshot: "Wireless earbuds Pro",
          category_snapshot: "electronics",
          quantity: 1,
          unit_price: 149,
          subtotal: 149,
        },
      ],
    },
    {
      id: 100140,
      order_number: "100190",
      ordered_at: "2025-06-15 08:20:43",
      currency: "USD",
      pricing: { subtotal: 129, shipping_fee: 4.99, discount: 50.35, tax: 13.94, total: 96.28 },
      status: "delivered",
      payment: { provider: "stripe", method: "card", brand: "visa", last4: "4242" },
      shipping: { provider: "UPS", service: "standard", tracking_number: "UP8307" },
      items: [
        {
          product_id: 31,
          name_snapshot: "Classic sneakers low",
          category_snapshot: "footwear",
          quantity: 1,
          unit_price: 129,
          subtotal: 129,
        },
      ],
    },
    {
      id: 100141,
      order_number: "100191",
      ordered_at: "2025-07-07 10:09:35",
      currency: "USD",
      pricing: { subtotal: 149, shipping_fee: 9.99, discount: 71.93, tax: 5.73, total: 92.79 },
      status: "shipped",
      payment: { provider: "stripe", method: "card", brand: "mastercard", last4: "4444" },
      shipping: { provider: "FedEx", service: "standard", tracking_number: "FE1547" },
      items: [
        {
          product_id: 42,
          name_snapshot: "Wireless earbuds Pro",
          category_snapshot: "electronics",
          quantity: 1,
          unit_price: 149,
          subtotal: 149,
        },
      ],
    },
    {
      id: 100142,
      order_number: "100192",
      ordered_at: "2025-07-29 13:40:59",
      currency: "USD",
      pricing: { subtotal: 109, shipping_fee: 7.99, discount: 13.03, tax: 3.13, total: 107.09 },
      status: "delivered",
      payment: { provider: "paypal", method: "paypal", brand: "paypal", last4: "" },
      shipping: { provider: "UPS", service: "standard", tracking_number: "UP4420" },
      items: [
        {
          product_id: 48,
          name_snapshot: "Insulated water bottle 1L",
          category_snapshot: "outdoors",
          quantity: 1,
          unit_price: 28,
          subtotal: 28,
        },
        {
          product_id: 47,
          name_snapshot: "Travel adapter USB-C",
          category_snapshot: "travel",
          quantity: 1,
          unit_price: 35,
          subtotal: 35,
        },
        {
          product_id: 46,
          name_snapshot: "Merino crew neck tee",
          category_snapshot: "apparel",
          quantity: 1,
          unit_price: 45,
          subtotal: 45,
        },
        {
          product_id: 43,
          name_snapshot: "13-inch laptop sleeve",
          category_snapshot: "accessories",
          quantity: 1,
          unit_price: 29,
          subtotal: 29,
        },
      ],
    },
  ],
  reviews: [],
  wishlist: [
    {
      product_id: 49,
      name: "Smartwatch Sport",
      image: "/images/products/49.jpg",
      currency: "USD",
      price: 199,
      availability: "in_stock",
      href: "#",
      added_at: "2025-05-03 10:22:10",
    },
    {
      product_id: 50,
      name: "Wool running socks 3-pack",
      image: "/images/products/50.jpg",
      currency: "USD",
      price: 24,
      availability: "in_stock",
      href: "#",
      added_at: "2025-02-16 09:11:05",
    },
    {
      product_id: 41,
      name: "Minimalist backpack 20L",
      image: "/images/products/41.jpg",
      currency: "USD",
      price: 89,
      availability: "in_stock",
      href: "#",
      added_at: "2024-11-09 14:35:44",
    },
    {
      product_id: 42,
      name: "Wireless earbuds Pro",
      image: "/images/products/42.jpg",
      currency: "USD",
      price: 149,
      availability: "in_stock",
      href: "#",
      added_at: "2024-08-22 11:03:22",
    },
    {
      product_id: 32,
      name: "Retro leather trainers",
      image: "/images/products/32.jpg",
      currency: "USD",
      price: 119,
      availability: "preorder",
      href: "#",
      added_at: "2024-06-19 16:50:33",
    },
  ],
  activity: [
    {
      id: 300,
      type: "account_created",
      message: "Account created",
      created_at: "2024-06-07 18:34:27",
      metadata: {},
    },
    {
      id: 301,
      type: "order_placed",
      message: "Placed order #100180",
      created_at: "2024-07-11 08:23:56",
      metadata: { order_id: 100130, total: 310.17, currency: "USD" },
    },
    {
      id: 302,
      type: "order_shipped",
      message: "Order #100180 shipped",
      created_at: "2024-07-12 11:23:56",
      metadata: { order_id: 100130, tracking_number: "UP2531", carrier: "UPS" },
    },
    {
      id: 303,
      type: "order_delivered",
      message: "Order #100180 delivered",
      created_at: "2024-07-16 18:23:56",
      metadata: { order_id: 100130 },
    },
    {
      id: 307,
      type: "order_placed",
      message: "Placed order #100186",
      created_at: "2025-03-18 12:35:08",
      metadata: { order_id: 100136, total: 122.35, currency: "USD" },
    },
    {
      id: 308,
      type: "order_shipped",
      message: "Order #100186 shipped",
      created_at: "2025-03-19 15:35:08",
      metadata: { order_id: 100136, tracking_number: "US3991", carrier: "USPS" },
    },
    {
      id: 309,
      type: "order_delivered",
      message: "Order #100186 delivered",
      created_at: "2025-03-23 22:35:08",
      metadata: { order_id: 100136 },
    },
    {
      id: 310,
      type: "order_placed",
      message: "Placed order #100187",
      created_at: "2025-04-08 16:18:42",
      metadata: { order_id: 100137, total: 148.12, currency: "USD" },
    },
    {
      id: 311,
      type: "order_shipped",
      message: "Order #100187 shipped",
      created_at: "2025-04-09 19:18:42",
      metadata: { order_id: 100137, tracking_number: "US6753", carrier: "USPS" },
    },
    {
      id: 312,
      type: "order_delivered",
      message: "Order #100187 delivered",
      created_at: "2025-04-13 02:18:42",
      metadata: { order_id: 100137 },
    },
    {
      id: 313,
      type: "order_placed",
      message: "Placed order #100188",
      created_at: "2025-05-07 07:22:31",
      metadata: { order_id: 100138, total: 115.09, currency: "USD" },
    },
    {
      id: 314,
      type: "order_shipped",
      message: "Order #100188 shipped",
      created_at: "2025-05-08 10:22:31",
      metadata: { order_id: 100138, tracking_number: "US7032", carrier: "USPS" },
    },
    {
      id: 315,
      type: "order_delivered",
      message: "Order #100188 delivered",
      created_at: "2025-05-12 17:22:31",
      metadata: { order_id: 100138 },
    },
    {
      id: 316,
      type: "wishlist_added",
      message: "Added to wishlist: Wool running socks 3-pack",
      created_at: "2025-02-16 09:11:05",
      metadata: { product_id: 50 },
    },
    {
      id: 317,
      type: "wishlist_added",
      message: "Added to wishlist: Smartwatch Sport",
      created_at: "2025-05-03 10:22:10",
      metadata: { product_id: 49 },
    },
    {
      id: 318,
      type: "email_open",
      message: "Opened campaign email: Summer Essentials",
      created_at: "2025-06-15 08:10:52",
      metadata: { campaign_id: "cmp_20250615" },
    },
    {
      id: 319,
      type: "email_click",
      message: "Clicked link in campaign email: Summer Essentials",
      created_at: "2025-06-15 08:11:22",
      metadata: { campaign_id: "cmp_20250615", url: "/collections/summer-essentials" },
    },
    {
      id: 320,
      type: "order_placed",
      message: "Placed order #100189",
      created_at: "2025-05-28 05:10:18",
      metadata: { order_id: 100139, total: 132.96, currency: "USD" },
    },
    {
      id: 321,
      type: "order_shipped",
      message: "Order #100189 shipped",
      created_at: "2025-05-29 08:10:18",
      metadata: { order_id: 100139, tracking_number: "DH3015", carrier: "DHL" },
    },
    {
      id: 322,
      type: "order_delivered",
      message: "Order #100189 delivered",
      created_at: "2025-06-02 15:10:18",
      metadata: { order_id: 100139 },
    },
    {
      id: 323,
      type: "review_submitted",
      message: "Submitted a 3-star review",
      created_at: "2025-06-04 12:10:18",
      metadata: { product_id: 42, order_id: 100139, review_id: 203 },
    },
    {
      id: 324,
      type: "order_placed",
      message: "Placed order #100190",
      created_at: "2025-06-15 08:20:43",
      metadata: { order_id: 100140, total: 96.28, currency: "USD" },
    },
    {
      id: 325,
      type: "order_shipped",
      message: "Order #100190 shipped",
      created_at: "2025-06-16 11:20:43",
      metadata: { order_id: 100140, tracking_number: "UP8307", carrier: "UPS" },
    },
    {
      id: 326,
      type: "order_delivered",
      message: "Order #100190 delivered",
      created_at: "2025-06-20 18:20:43",
      metadata: { order_id: 100140 },
    },
    {
      id: 327,
      type: "order_placed",
      message: "Placed order #100191",
      created_at: "2025-07-07 10:09:35",
      metadata: { order_id: 100141, total: 92.79, currency: "USD" },
    },
    {
      id: 328,
      type: "order_shipped",
      message: "Order #100191 shipped",
      created_at: "2025-07-08 13:09:35",
      metadata: { order_id: 100141, tracking_number: "FE1547", carrier: "FedEx" },
    },
    {
      id: 330,
      type: "order_placed",
      message: "Placed order #100192",
      created_at: "2025-07-29 13:40:59",
      metadata: { order_id: 100142, total: 107.09, currency: "USD" },
    },
    {
      id: 331,
      type: "order_shipped",
      message: "Order #100192 shipped",
      created_at: "2025-07-30 16:40:59",
      metadata: { order_id: 100142, tracking_number: "UP4420", carrier: "UPS" },
    },
    {
      id: 338,
      type: "order_delivered",
      message: "Order #100192 delivered",
      created_at: "2025-08-03 23:40:59",
      metadata: { order_id: 100142 },
    },
    {
      id: 333,
      type: "review_submitted",
      message: "Submitted a 4-star review",
      created_at: "2024-07-18 20:23:56",
      metadata: { product_id: 44, order_id: 100130, review_id: 200 },
    },
    {
      id: 334,
      type: "review_submitted",
      message: "Submitted a 5-star review",
      created_at: "2024-12-04 08:48:25",
      metadata: { product_id: 31, order_id: 100133, review_id: 201 },
    },
    {
      id: 335,
      type: "review_submitted",
      message: "Submitted a 5-star review",
      created_at: "2024-12-04 08:48:25",
      metadata: { product_id: 41, order_id: 100133, review_id: 202 },
    },
    {
      id: 336,
      type: "wishlist_added",
      message: "Added to wishlist: Wireless earbuds Pro",
      created_at: "2024-08-22 11:03:22",
      metadata: { product_id: 42 },
    },
    {
      id: 337,
      type: "wishlist_added",
      message: "Added to wishlist: Minimalist backpack 20L",
      created_at: "2024-11-09 14:35:44",
      metadata: { product_id: 41 },
    },
  ],
  insight: {
    currency: "USD",
    total_orders: 13,
    total_spent: 2286.77,
    aov: 175.91,
    recency_days: 25,
    avg_order_interval_days: 31.9,
    last_90_days: { orders: 3, spent: 269.16 },
    top_categories: [
      { category: "electronics", revenue: 1669, share: 0.4 },
      { category: "footwear", revenue: 1488, share: 0.36 },
      { category: "home office", revenue: 413, share: 0.1 },
      { category: "bags", revenue: 178, share: 0.04 },
    ],
    preferred_payment: { method: "paypal", brand: "paypal" },
    preferred_shopping_time: { day_of_week: "Friday", hour_24h: 8 },
    rfm: { recency: 4, frequency: 4, monetary: 4, score: "444" },
    churn_risk: "low",
    next_best_action: "Invite to join loyalty and cross-sell electronics bundle",
  },
} as const
