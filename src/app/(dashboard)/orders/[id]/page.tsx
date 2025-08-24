import orders from "@/data/orders.json"
import { notFound } from "next/navigation"
import { Heading } from "@/components/ui/heading"
import {
  DescriptionDetails,
  DescriptionList,
  DescriptionTerm,
} from "@/components/ui/description-list"
import { formatDate } from "@/lib/date"
import { formatNumber } from "@/lib/number"
import { Badge } from "@/components/ui/badge"
import { ListProducts } from "@/app/(dashboard)/orders/[id]/list-products"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Avatar } from "@/components/ui/avatar"

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const order = orders.find((p) => p.id === +id)
  return {
    title: `Order #${order?.order_number ?? id}`,
  }
}
export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const order = orders.find((p) => p.id === +id)
  if (!order) {
    return notFound()
  }
  return (
    <>
      <Heading>#{order.order_number}</Heading>
      <Card>
        <CardHeader title="Detail order" description="Detailed information about the order." />
        <CardContent>
          <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-3">
            <div className="col-span-2">
              <DescriptionList>
                <DescriptionTerm>ID</DescriptionTerm>
                <DescriptionDetails>{order.id}</DescriptionDetails>

                <DescriptionTerm>Order number</DescriptionTerm>
                <DescriptionDetails>{order.order_number}</DescriptionDetails>

                <DescriptionTerm>Customer ID</DescriptionTerm>
                <DescriptionDetails>{order.customer_id}</DescriptionDetails>

                <DescriptionTerm>Customer name</DescriptionTerm>
                <DescriptionDetails>{order.customer_name}</DescriptionDetails>

                <DescriptionTerm>Customer email</DescriptionTerm>
                <DescriptionDetails>{order.customer_email}</DescriptionDetails>

                <DescriptionTerm>Status</DescriptionTerm>
                <DescriptionDetails>
                  <Badge
                    intent={
                      (
                        {
                          pending: "warning",
                          paid: "success",
                          shipped: "info",
                          cancelled: "danger",
                          refunded: "secondary",
                        } as any
                      )[order.status] ?? "outline"
                    }
                  >
                    {order.status}
                  </Badge>
                </DescriptionDetails>

                <DescriptionTerm>Payment method</DescriptionTerm>
                <DescriptionDetails>{order.payment_method}</DescriptionDetails>

                <DescriptionTerm>Shipping address</DescriptionTerm>
                <DescriptionDetails>{order.shipping_address}</DescriptionDetails>

                <DescriptionTerm>Billing address</DescriptionTerm>
                <DescriptionDetails>{order.billing_address}</DescriptionDetails>

                <DescriptionTerm>Total price</DescriptionTerm>
                <DescriptionDetails>
                  {formatNumber(order.total_price, {
                    style: "currency",
                    currency: "USD",
                  })}
                </DescriptionDetails>

                <DescriptionTerm>Ordered at</DescriptionTerm>
                <DescriptionDetails>{formatDate(order.ordered_at)}</DescriptionDetails>

                <DescriptionTerm>Updated at</DescriptionTerm>
                <DescriptionDetails>{formatDate(order.updated_at)}</DescriptionDetails>
              </DescriptionList>
            </div>
            <div className="flex justify-end pr-16">
              <Avatar
                size="9xl"
                src="https://irsyad.co/images/blocks/avatar/woman.webp"
                alt={order.customer_name}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <ListProducts />
    </>
  )
}
