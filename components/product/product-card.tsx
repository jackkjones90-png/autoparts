'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Heart, ShoppingCart, Star, Battery, Camera, Wrench, Hammer, Bike, Package, Layers, Droplets, Box, Car } from 'lucide-react'
import { useToast } from '@/components/ui/use-toast'
import { Product } from '@/lib/data/products'

interface ProductCardProps {
  product: Product
  onAddToCart?: (product: Product) => void
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const [wishlist, setWishlist] = useState(false)
  const [isAdded, setIsAdded] = useState(false)
  const [imgError, setImgError] = useState(false)
  const { toast } = useToast()

  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart(product)
    }
    setIsAdded(true)
    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your shopping cart.`,
      duration: 3000,
    })
    setTimeout(() => setIsAdded(false), 2000)
  }

  const savingsAmount = product.originalPrice 
    ? Math.round(product.originalPrice - product.price)
    : 0

  return (
    <Card className="group overflow-hidden border-border hover:shadow-lg transition-all h-full flex flex-col bg-background">
      {/* Image Container */}
      <div className="relative overflow-hidden bg-secondary h-48 sm:h-56 flex items-center justify-center">
        {product.discount && (
          <div className="absolute top-3 left-3 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-semibold z-10">
            {product.discount}% OFF
          </div>
        )}
        
        {/* Product Image */}
        {product.image && !imgError ? (
          <div className="relative w-full h-full p-4 flex items-center justify-center bg-white">
            <img 
              src={product.image} 
              alt={product.name}
              onError={() => setImgError(true)}
              className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-500"
              loading="lazy"
            />
          </div>
        ) : (
          /* Placeholder Product Image Icon */
          <div className="w-full h-full flex items-center justify-center text-primary/20 group-hover:scale-110 transition-transform group-hover:text-primary/40 duration-500">
            {product.category === 'batteries' && <Battery size={80} strokeWidth={1} />}
            {product.category === 'dash-cams' && <Camera size={80} strokeWidth={1} />}
            {product.category === 'car-parts' && <Wrench size={80} strokeWidth={1} />}
            {product.category === 'tools' && <Hammer size={80} strokeWidth={1} />}
            {product.category === 'bikes' && <Bike size={80} strokeWidth={1} />}
            {product.category === 'accessories' && <Package size={80} strokeWidth={1} />}
            {product.category === 'abrasives' && <Layers size={80} strokeWidth={1} />}
            {product.category === 'adhesives-sealants' && <Droplets size={80} strokeWidth={1} />}
            {product.category === 'storage-solutions' && <Box size={80} strokeWidth={1} />}
            {product.category === 'automotive-parts' && <Car size={80} strokeWidth={1} />}
            {!product.category && <Package size={80} strokeWidth={1} />}
          </div>
        )}

        {/* Wishlist Button */}
        <button
          onClick={() => setWishlist(!wishlist)}
          className="absolute top-3 right-3 p-2 rounded-full bg-background hover:bg-primary hover:text-primary-foreground transition z-10"
        >
          <Heart className={`w-5 h-5 ${wishlist ? 'fill-current' : ''}`} />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 flex flex-col gap-3">
        {/* Category */}
        <p className="text-xs text-muted-foreground uppercase font-semibold">
          {product.subcategory}
        </p>

        {/* Product Name */}
        <h3 className="font-semibold text-foreground line-clamp-2 group-hover:text-primary transition">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1">
          <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(product.rating)
                    ? 'fill-primary text-primary'
                    : 'text-muted-foreground'
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-muted-foreground ml-2">
            ({product.reviewCount})
          </span>
        </div>

        {/* Price */}
        <div className="space-y-1">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-primary">
              £{product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                £{product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
          {savingsAmount > 0 && (
            <p className="text-xs text-primary font-semibold">
              Save £{savingsAmount.toFixed(2)}
            </p>
          )}
        </div>

        {/* Stock Status */}
        <p className={`text-xs font-semibold ${
          product.inStock ? 'text-green-600' : 'text-destructive'
        }`}>
          {product.inStock ? '✓ In Stock' : 'Out of Stock'}
        </p>

        {/* Add to Cart Button */}
        <Button
          onClick={handleAddToCart}
          disabled={!product.inStock}
          className={`w-full mt-auto transition ${
            isAdded
              ? 'bg-green-600 hover:bg-green-700'
              : 'bg-primary hover:bg-orange-700'
          } text-primary-foreground`}
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          {isAdded ? 'Added!' : 'Add to Cart'}
        </Button>
      </div>
    </Card>
  )
}
