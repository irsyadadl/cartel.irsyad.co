"use client"

import {
  DescriptionDetails,
  DescriptionList,
  DescriptionTerm,
} from "@/components/ui/description-list"
import { formatDatetime } from "@/lib/date"
import categories from "@/data/categories.json"
import { findById } from "@/lib/eloquent"
import { Link } from "@/components/ui/link"
import { Badge } from "@/components/ui/badge"
import { buttonStyles } from "@/components/ui/button"
import { PencilSquareIcon } from "@heroicons/react/24/solid"
export function DetailProduct({ product }: { product: Product }) {
  return (
    <div className="grid grid-cols-5 gap-16">
      <div className="col-span-3 space-y-6">
        <DescriptionList>
          <DescriptionTerm>ID</DescriptionTerm>
          <DescriptionDetails>{product.id}</DescriptionDetails>
          <DescriptionTerm>SKU</DescriptionTerm>
          <DescriptionDetails>{product.sku}</DescriptionDetails>
          <DescriptionTerm>Name</DescriptionTerm>
          <DescriptionDetails>{product.name}</DescriptionDetails>
          <DescriptionTerm>Category id</DescriptionTerm>
          <DescriptionDetails>
            <Link href="#" className="text-primary hover:underline">
              {findById(categories, product.category_id)?.name}
            </Link>
          </DescriptionDetails>
          <DescriptionTerm>Brand</DescriptionTerm>
          <DescriptionDetails>{product.brand}</DescriptionDetails>
          <DescriptionTerm>Color</DescriptionTerm>
          <DescriptionDetails>{product.color}</DescriptionDetails>
          <DescriptionTerm>Material</DescriptionTerm>
          <DescriptionDetails>{product.material}</DescriptionDetails>
          <DescriptionTerm>Price</DescriptionTerm>
          <DescriptionDetails>{product.price}</DescriptionDetails>
          <DescriptionTerm>Stock</DescriptionTerm>
          <DescriptionDetails>{product.stock}</DescriptionDetails>
          <DescriptionTerm>Status</DescriptionTerm>
          <DescriptionDetails>
            <Badge
              intent={
                product.status === "active"
                  ? "primary"
                  : product.status === "archived"
                    ? "warning"
                    : "secondary"
              }
            >
              {product.status}
            </Badge>
          </DescriptionDetails>
          <DescriptionTerm>Rating</DescriptionTerm>
          <DescriptionDetails>{product.rating}</DescriptionDetails>
          <DescriptionTerm>Sold count</DescriptionTerm>
          <DescriptionDetails>{product.sold_count}</DescriptionDetails>
          <DescriptionTerm>Created at</DescriptionTerm>
          <DescriptionDetails>{formatDatetime(product.created_at)}</DescriptionDetails>
          <DescriptionTerm>Updated at</DescriptionTerm>
          <DescriptionDetails>{formatDatetime(product.updated_at)}</DescriptionDetails>
        </DescriptionList>

        <Link
          href={`/(dashboard)/products/${product.id}/edit`}
          className={buttonStyles({ intent: "secondary" })}
        >
          <PencilSquareIcon />
          Edit product
        </Link>
      </div>
      <div className="col-span-2">
        <img alt={product.name} className="w-full rotate-6 rounded-xl" src={product.thumbnail} />
      </div>
    </div>
  )
}
