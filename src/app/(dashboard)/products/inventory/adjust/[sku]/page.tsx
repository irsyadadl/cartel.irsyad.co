import products from "@/data/products.json"
import { notFound } from "next/navigation"
import { Heading } from "@/components/ui/heading"

export async function generateMetadata({ params }: { params: Promise<{ sku: string }> }) {
  const { sku } = await params
  const product = products.find((p) => p.sku === sku)
  return {
    title: product?.name,
  }
}

export default async function Page({ params }: { params: Promise<{ sku: string }> }) {
  const { sku } = await params
  const product = products.find((p) => p.sku === sku)
  if (!product) {
    notFound()
  }
  return (
    <div>
      <Heading>{product.sku}</Heading>
    </div>
  )
}
