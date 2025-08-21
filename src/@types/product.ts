interface Product {
  id: number
  sku: string
  name: string
  slug: string
  thumbnail: string
  category_id: number
  brand: string
  description: string
  color: string
  material: string
  price: number
  stock: number
  status: "active" | "draft" | "archived"
  rating: number
  sold_count: number
  created_at: string
  updated_at: string
  [key: string]: Record<string, any> | string | number | boolean | null
}
