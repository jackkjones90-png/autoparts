'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Trash2, Plus, Minus } from 'lucide-react'
import { Product } from '@/lib/data/products'

interface CartItemProps {
  product: Product
  quantity: number
  onQuantityChange: (quantity: number) => void
  onRemove: () => void
}

export default function CartItem({
  product,
  quantity,
  onQuantityChange,
  onRemove,
}: CartItemProps) {
  const subtotal = product.price * quantity

  return (
    <Card className="p-4 border-border bg-secondary hover:shadow-md transition flex gap-4">
      {/* Product Image Placeholder */}
      <div className="w-20 h-20 bg-muted rounded-lg flex items-center justify-center text-2xl flex-shrink-0">
        {product.category === 'batteries' && '🔋'}
        {product.category === 'dash-cams' && '📷'}
        {product.category === 'car-parts' && '🔧'}
        {product.category === 'tools' && '🛠️'}
        {product.category === 'bikes' && '🚴'}
        {product.category === 'accessories' && '🎁'}
      </div>

      {/* Product Details */}
      <div className="flex-1">
        <h3 className="font-semibold text-foreground text-sm lg:text-base line-clamp-2">
          {product.name}
        </h3>
        <p className="text-sm text-muted-foreground mt-1 capitalize">
          {product.subcategory}
        </p>
        <p className="text-primary font-semibold mt-2">
          ${product.price.toFixed(2)} each
        </p>
      </div>

      {/* Quantity Controls */}
      <div className="flex flex-col items-end gap-2">
        <div className="flex items-center gap-2 bg-background rounded-lg p-1">
          <button
            onClick={() => onQuantityChange(Math.max(1, quantity - 1))}
            className="p-1 hover:bg-muted rounded transition text-foreground"
            aria-label="Decrease quantity"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="w-8 text-center font-semibold text-foreground">
            {quantity}
          </span>
          <button
            onClick={() => onQuantityChange(quantity + 1)}
            className="p-1 hover:bg-muted rounded transition text-foreground"
            aria-label="Increase quantity"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        {/* Remove Button */}
        <button
          onClick={onRemove}
          className="p-2 text-destructive hover:bg-destructive/10 rounded-lg transition"
          aria-label="Remove from cart"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      {/* Subtotal */}
      <div className="text-right">
        <p className="text-lg font-bold text-foreground">
          ${subtotal.toFixed(2)}
        </p>
      </div>
    </Card>
  )
}
