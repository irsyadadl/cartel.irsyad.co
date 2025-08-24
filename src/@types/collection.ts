interface Collection {
  id: number
  name: string
  slug: string
  description: string
  product_count: string
  type: string
  is_featured: string
  sort_order: string
  visibility: 'private' | 'public'
  tags: string[]
  created_at: string
  updated_at: string
}
