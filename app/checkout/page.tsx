'use client'

import { useState } from 'react'
import { useCart } from '@/lib/context/cart-context'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useToast } from '@/components/ui/use-toast'
import { ChevronLeft, Lock } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function CheckoutPage() {
  const { cart, cartTotal } = useCart()
  const { toast } = useToast()
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isFailed, setIsFailed] = useState(false)

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API delay
    setTimeout(() => {
      setIsSubmitting(false)
      setIsFailed(true)
      toast({
        title: "Order Failed",
        description: "We are at full capacity right now and cannot accept new orders. Please try again later.",
        variant: "destructive",
        duration: 5000,
      })
    }, 1500)
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-4 text-center">
        <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
        <Link href="/products">
          <Button className="bg-primary hover:bg-orange-700">Go to Shop</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex items-center gap-2 mb-8 text-sm">
        <Link href="/cart" className="text-muted-foreground hover:text-primary flex items-center gap-1">
          <ChevronLeft className="w-4 h-4" /> Back to Cart
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <form onSubmit={handlePlaceOrder} className="grid lg:grid-cols-3 gap-8">
        {/* Shipping Form */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6 border-border">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm">1</span>
              Shipping Information
            </h2>
            
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">First Name</label>
                <input required className="w-full px-4 py-2 rounded-lg bg-secondary border border-border focus:outline-none focus:ring-2 focus:ring-primary" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Last Name</label>
                <input required className="w-full px-4 py-2 rounded-lg bg-secondary border border-border focus:outline-none focus:ring-2 focus:ring-primary" />
              </div>
              <div className="sm:col-span-2 space-y-2">
                <label className="text-sm font-medium">Address</label>
                <input required className="w-full px-4 py-2 rounded-lg bg-secondary border border-border focus:outline-none focus:ring-2 focus:ring-primary" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">City</label>
                <input required className="w-full px-4 py-2 rounded-lg bg-secondary border border-border focus:outline-none focus:ring-2 focus:ring-primary" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Postcode</label>
                <input required className="w-full px-4 py-2 rounded-lg bg-secondary border border-border focus:outline-none focus:ring-2 focus:ring-primary" />
              </div>
            </div>
          </Card>

          <Card className="p-6 border-border">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm">2</span>
              Payment Method
            </h2>
            <div className="p-4 border-2 border-primary/20 bg-primary/5 rounded-xl">
              <p className="text-sm font-semibold text-primary">Cash on Delivery</p>
              <p className="text-xs text-muted-foreground mt-1">Pay when your order is delivered to your doorstep.</p>
            </div>
          </Card>
        </div>

        {/* Order Review */}
        <div className="lg:col-span-1">
          <Card className="p-6 border-border bg-secondary/50">
            <h2 className="text-xl font-bold mb-6">Order Review</h2>
            
            <div className="max-h-[300px] overflow-y-auto pr-2 space-y-4 mb-6 custom-scrollbar">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between items-start gap-4">
                  <div className="flex-1">
                    <p className="text-sm font-medium line-clamp-1">{item.name}</p>
                    <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                  </div>
                  <p className="text-sm font-bold">£{(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>

            <div className="border-t border-border pt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span>£{cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Shipping</span>
                <span className="text-green-600 font-medium">FREE</span>
              </div>
              <div className="flex justify-between text-lg font-bold pt-2">
                <span>Total</span>
                <span className="text-primary">£{cartTotal.toFixed(2)}</span>
              </div>
            </div>

            <Button 
              type="submit" 
              disabled={isSubmitting || isFailed}
              className={`w-full mt-8 py-6 font-bold h-auto min-h-[60px] ${
                isFailed ? 'bg-destructive hover:bg-destructive text-destructive-foreground text-sm' : 'bg-primary hover:bg-orange-700 text-primary-foreground text-lg'
              }`}
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                   Processing...
                </span>
              ) : isFailed ? (
                <span className="flex items-center justify-center gap-2 px-2 text-center leading-tight">
                   We are at full capacity. Not taking new orders.
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Lock className="w-4 h-4" /> Place Order
                </span>
              )}
            </Button>
          </Card>
        </div>
      </form>
    </div>
  )
}
