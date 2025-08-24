import products from "@/data/products.json"
import { notFound } from "next/navigation"
import { DetailProduct } from "@/app/(dashboard)/products/[id]/detail-product"
import {
  SectionContent,
  SectionDescription,
  SectionHeader,
  SectionTitle,
} from "@/components/section-header"
import { findById } from "@/lib/eloquent"

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const product = products.find((p) => p.id === +id)
  if (!product) {
    return notFound()
  }
  return {
    title: product.name,
  }
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const product = findById(products, +id) as Product
  if (!product) {
    return notFound()
  }
  return (
    <>
      <SectionHeader>
        <SectionContent>
          <SectionTitle>{product.name}</SectionTitle>
          <SectionDescription>{product.description}</SectionDescription>
        </SectionContent>
      </SectionHeader>
      <DetailProduct product={product} />
    </>
  )
}
