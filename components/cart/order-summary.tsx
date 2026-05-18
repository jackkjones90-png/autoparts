import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface OrderSummaryProps {
  subtotal: number
  cartCount: number
}

export default function OrderSummary({ subtotal, cartCount }: OrderSummaryProps) {
  const tax = subtotal * 0.1 // 10% tax
  const shipping = subtotal > 50 ? 0 : 9.99
  const total = subtotal + tax + shipping

  return (
    <Card className="p-6 border-border bg-secondary h-fit sticky top-24">
      <h2 className="text-xl font-bold text-foreground mb-6">Order Summary</h2>

      <div className="space-y-4 mb-6 pb-6 border-b border-border">
        <div className="flex justify-between text-foreground">
          <span>Subtotal ({cartCount} items)</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>

        <div className="flex justify-between text-foreground">
          <span>Tax (10%)</span>
          <span>${tax.toFixed(2)}</span>
        </div>

        <div className="flex justify-between text-foreground">
          <span className="flex items-center gap-2">
            Shipping
            {shipping === 0 && (
              <span className="text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded-full">
                FREE
              </span>
            )}
          </span>
          <span>${shipping.toFixed(2)}</span>
        </div>

        {shipping === 0 && (
          <p className="text-xs text-primary font-semibold">
            Free shipping on orders over $50
          </p>
        )}
      </div>

      <div className="flex justify-between text-lg font-bold text-foreground mb-6">
        <span>Total</span>
        <span className="text-primary">${total.toFixed(2)}</span>
      </div>

      <Link href="/checkout" className="w-full block">
        <Button className="w-full bg-primary hover:bg-orange-700 text-primary-foreground mb-3">
          Proceed to Checkout
        </Button>
      </Link>

      <Link href="/products" className="w-full block">
        <Button variant="outline" className="w-full border-border text-foreground hover:bg-background">
          Continue Shopping
        </Button>
      </Link>

      {/* Trust Badges */}
      <div className="mt-6 pt-6 border-t border-border space-y-3 text-sm text-muted-foreground">
        <p className="flex items-center gap-2">
          ✓ <span>30-day money-back guarantee</span>
        </p>
        <p className="flex items-center gap-2">
          ✓ <span>Secure checkout (SSL encrypted)</span>
        </p>
        <p className="flex items-center gap-2">
          ✓ <span>24/7 customer support</span>
        </p>
      </div>
    </Card>
  )
}
