'use client'

import { products } from '@/lib/data/products'
import { notFound } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { useCart } from '@/lib/context/cart-context'
import { useToast } from '@/components/ui/use-toast'
import { ShoppingCart, ArrowLeft, Star, ShieldCheck, Truck, Clock } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = products.find(p => p.id === params.id)
  const { addToCart } = useCart()
  const { toast } = useToast()
  const [isAdded, setIsAdded] = useState(false)
  const [imgError, setImgError] = useState(false)

  if (!product) {
    notFound()
  }

  const handleAddToCart = () => {
    addToCart(product)
    setIsAdded(true)
    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your shopping cart.`,
    })
    setTimeout(() => setIsAdded(false), 2000)
  }

  const savingsAmount = product.originalPrice 
    ? Math.round(product.originalPrice - product.price)
    : 0

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <Link href="/products" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Products
      </Link>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Images */}
        <div className="bg-white rounded-2xl p-8 flex items-center justify-center border border-border min-h-[400px]">
          {!imgError ? (
            <img 
              src={product.image || '/placeholder.svg'} 
              alt={product.name}
              className="max-w-full max-h-[500px] object-contain"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="w-full h-full min-h-[300px] flex items-center justify-center bg-secondary/50 rounded-xl">
              <span className="text-3xl font-black text-primary/40 text-center px-4 tracking-widest uppercase">
                CAR PART SHOP
              </span>
            </div>
          )}
        </div>

        {/* Details */}
        <div className="flex flex-col">
          <p className="text-sm text-primary uppercase font-bold tracking-wider mb-2">
            {product.category.replace('-', ' ')}
          </p>
          <h1 className="text-3xl lg:text-4xl font-bold mb-4">{product.name}</h1>
          
          <div className="flex items-center gap-4 mb-6">
            <div className="flex text-primary">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-muted-foreground'}`} />
              ))}
            </div>
            <span className="text-muted-foreground">({product.reviewCount} reviews)</span>
          </div>

          <div className="mb-8">
            <div className="flex items-baseline gap-4 mb-2">
              <span className="text-4xl font-extrabold text-primary">£{product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <span className="text-xl text-muted-foreground line-through">£{product.originalPrice.toFixed(2)}</span>
              )}
            </div>
            {savingsAmount > 0 && (
              <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-semibold">
                Save £{savingsAmount.toFixed(2)} ({product.discount}%)
              </span>
            )}
          </div>

          <p className="text-muted-foreground leading-relaxed mb-8">
            {product.description || `Premium quality ${product.name} designed for maximum performance and durability. Tested to meet the highest industry standards for your vehicle.`}
          </p>

          <div className="space-y-4 mb-8">
            <div className="flex items-center gap-3 text-sm">
              <Truck className="w-5 h-5 text-primary" />
              <span>Free Next-Day Delivery on orders over £50</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <ShieldCheck className="w-5 h-5 text-primary" />
              <span>1 Year Standard Warranty Included</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Clock className="w-5 h-5 text-primary" />
              <span>Order within 2 hrs 45 mins for dispatch today</span>
            </div>
          </div>

          <div className="mt-auto pt-8 border-t border-border">
            <div className="flex items-center gap-4 mb-4">
              <div className={`w-3 h-3 rounded-full ${product.inStock ? 'bg-green-500' : 'bg-red-500'}`} />
              <span className="font-semibold">{product.inStock ? 'In Stock - Ready to Ship' : 'Out of Stock'}</span>
            </div>
            <Button 
              size="lg" 
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className={`w-full py-6 text-lg font-bold ${isAdded ? 'bg-green-600 hover:bg-green-700' : 'bg-primary hover:bg-orange-700'} text-primary-foreground transition-all`}
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              {isAdded ? 'Added to Cart' : 'Add to Cart'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
