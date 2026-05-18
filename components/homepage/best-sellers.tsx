'use client'

import { useState } from 'react'
import ProductCard from '@/components/product/product-card'
import { products, Product } from '@/lib/data/products'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

import { useCart } from '@/lib/context/cart-context'

export default function BestSellers() {
  const { addToCart } = useCart()

  const bestSellers = [...products]
    .sort((a, b) => b.reviewCount - a.reviewCount)
    .slice(0, 8)

  const handleAddToCart = (product: Product) => {
    addToCart(product)
  }

  return (
    <section className="py-12 lg:py-16 bg-secondary">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
            Best Sellers
          </h2>
          <p className="text-muted-foreground">
            Customer favorites with excellent reviews
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellers.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-10">
          <Link href="/products">
            <Button size="lg" className="bg-primary hover:bg-orange-700 text-primary-foreground px-8">
              Browse All Products
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
