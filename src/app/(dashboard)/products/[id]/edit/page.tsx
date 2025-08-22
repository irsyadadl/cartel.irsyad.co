import { Client } from "./client"
import products from "@/data/products.json"
import { notFound } from "next/navigation"

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const product = products.find((p) => p.id === +id)
  if (!product) {
    return notFound()
  }
  return <Client />
}
