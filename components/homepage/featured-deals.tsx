'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import ProductCard from '@/components/product/product-card'
import { products, Product } from '@/lib/data/products'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useCart } from '@/lib/context/cart-context'

export default function FeaturedDeals() {
  const { addToCart } = useCart()
  const [scrollPos, setScrollPos] = useState(0)

  const featuredProducts = products.slice(0, 6)

  const handleAddToCart = (product: Product) => {
    addToCart(product)
  }

  const scroll = (direction: 'left' | 'right') => {
    const container = document.getElementById('featured-scroll')
    if (container) {
      const scrollAmount = 300
      const newPos = scrollPos + (direction === 'left' ? -scrollAmount : scrollAmount)
      container.scrollLeft = newPos
      setScrollPos(newPos)
    }
  }

  return (
    <section className="py-12 lg:py-16 bg-secondary border-y border-border">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
              Limited Time Deals
            </h2>
            <p className="text-muted-foreground">
              Unbeatable prices on top sellers. Grab them before they&apos;re gone!
            </p>
          </div>
          <div className="hidden sm:flex gap-2">
            <button
              onClick={() => scroll('left')}
              className="p-2 hover:bg-background rounded-lg transition"
            >
              <ChevronLeft className="w-5 h-5 text-foreground" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-2 hover:bg-background rounded-lg transition"
            >
              <ChevronRight className="w-5 h-5 text-foreground" />
            </button>
          </div>
        </div>

        {/* Scrollable Product Grid */}
        <div
          id="featured-scroll"
          className="overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide"
        >
          <div className="flex gap-4 min-w-max">
            {featuredProducts.map((product) => (
              <div key={product.id} className="w-72 flex-shrink-0">
                <ProductCard
                  product={product}
                  onAddToCart={handleAddToCart}
                />
              </div>
            ))}
          </div>
        </div>

        {/* View All Button */}
        <div className="text-center mt-8">
          <Button className="bg-primary hover:bg-orange-700 text-primary-foreground px-8">
            View All Deals
          </Button>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  )
}
