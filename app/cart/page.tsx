'use client'

import Link from 'next/link'
import { useCart } from '@/lib/context/cart-context'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, ChevronLeft } from 'lucide-react'

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, cartTotal, cartCount } = useCart()

  if (cart.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-4 text-center">
        <div className="bg-secondary p-6 rounded-full mb-6">
          <ShoppingBag className="w-12 h-12 text-muted-foreground" />
        </div>
        <h1 className="text-2xl font-bold mb-2">Your cart is empty</h1>
        <p className="text-muted-foreground mb-8">Looks like you haven't added anything to your cart yet.</p>
        <Link href="/products">
          <Button className="bg-primary hover:bg-orange-700 text-primary-foreground px-8">
            Start Shopping
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex items-center gap-2 mb-8 text-sm">
        <Link href="/products" className="text-muted-foreground hover:text-primary flex items-center gap-1">
          <ChevronLeft className="w-4 h-4" /> Continue Shopping
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-8">Shopping Cart ({cartCount})</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item) => (
            <Card key={item.id} className="p-4 sm:p-6 border-border bg-background flex flex-col sm:flex-row gap-4 sm:items-center">
              {/* Product Image */}
              <div className="w-24 h-24 bg-white rounded-lg p-2 flex-shrink-0">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Product Details */}
              <div className="flex-1 min-w-0">
                <Link href={`/products/${item.id}`} className="font-semibold text-foreground hover:text-primary transition truncate block">
                  {item.name}
                </Link>
                <p className="text-sm text-muted-foreground mt-1">
                  {item.subcategory}
                </p>
                <div className="mt-2 text-primary font-bold">
                  £{item.price.toFixed(2)}
                </div>
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center gap-3 bg-secondary rounded-lg p-1">
                <button 
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="p-1 hover:bg-background rounded transition"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-8 text-center font-medium">
                  {item.quantity}
                </span>
                <button 
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="p-1 hover:bg-background rounded transition"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Remove Button */}
              <button 
                onClick={() => removeFromCart(item.id)}
                className="p-2 text-muted-foreground hover:text-destructive transition"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </Card>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card className="p-6 border-border bg-secondary/50 sticky top-24">
            <h2 className="text-xl font-bold mb-6">Order Summary</h2>
            
            <div className="space-y-4 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium font-bold">£{cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span className="text-green-600 font-medium">FREE</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Estimated Tax</span>
                <span className="font-medium font-bold">£{(cartTotal * 0.2).toFixed(2)}</span>
              </div>
              
              <div className="border-t border-border pt-4 mt-4">
                <div className="flex justify-between items-baseline">
                  <span className="text-lg font-bold">Total</span>
                  <span className="text-2xl font-bold text-primary">£{cartTotal.toFixed(2)}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1 text-right">VAT included</p>
              </div>
            </div>

            <Link href="/checkout">
              <Button className="w-full mt-8 bg-primary hover:bg-orange-700 text-primary-foreground py-6 text-lg font-bold">
                Proceed to Checkout <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>

            <div className="mt-6 flex flex-col gap-3">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500" /> Secure Checkout
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500" /> Free Shipping included
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
