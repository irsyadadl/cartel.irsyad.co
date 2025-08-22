import { RouteModal } from "@/components/route-modal"
import products from "@/data/products.json"
import { notFound } from "next/navigation"
import { Client } from "./client"

export default async function Page({ params }: { params: Promise<{ sku: string }> }) {
  const { sku } = await params
  const product = products.find((p) => p.sku === sku) as Product
  if (!product) {
    notFound()
  }
  return (
    <RouteModal
      size="2xl"
      title="Adjust inventory levels"
      description="Update the on-hand quantity for this product. Adjustments are useful for correcting discrepancies from stock counts, returns, or damaged goods."
    >
      <Client product={product} />
    </RouteModal>
  )
}
