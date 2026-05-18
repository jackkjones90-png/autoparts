'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Package, Search, Truck, CheckCircle2, Clock } from 'lucide-react'

export default function TrackOrderPage() {
  const [orderId, setOrderId] = useState('')
  const [email, setEmail] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const [showStatus, setShowStatus] = useState(false)

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSearching(true)
    // Simulate lookup
    setTimeout(() => {
      setIsSearching(false)
      setShowStatus(true)
    }, 1500)
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-3xl lg:text-4xl font-bold mb-4">Track Your Order</h1>
        <p className="text-muted-foreground">Enter your order details below to see the current status of your delivery.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 items-start">
        {/* Tracking Form */}
        <Card className="p-6 border-border">
          <form onSubmit={handleTrack} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Order ID</label>
              <Input 
                placeholder="e.g. #ORD-12345" 
                required 
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Email Address</label>
              <Input 
                type="email" 
                placeholder="email@example.com" 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <Button className="w-full bg-primary hover:bg-orange-700 py-6 font-bold" disabled={isSearching}>
              {isSearching ? 'Finding Order...' : 'Track Order'}
            </Button>
          </form>
        </Card>

        {/* Info Card */}
        <div className="space-y-6">
          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold mb-1">Standard Delivery</h3>
              <p className="text-sm text-muted-foreground">Orders typically arrive within 3-5 business days.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold mb-1">Real-time Updates</h3>
              <p className="text-sm text-muted-foreground">Get notified at every step from warehouse to your door.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Simulated Status Result */}
      {showStatus && (
        <Card className="mt-12 p-8 border-border bg-secondary/30 animate-in fade-in slide-in-from-bottom-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8 pb-8 border-b border-border">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Order {orderId}</p>
              <h2 className="text-2xl font-bold">In Transit</h2>
            </div>
            <div className="bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold">
              Estimated Delivery: Oct 24, 2024
            </div>
          </div>

          <div className="relative">
            {/* Progress Line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-border -translate-x-1/2 hidden md:block" />
            
            <div className="space-y-8 relative">
              <div className="flex items-center gap-6 md:flex-row-reverse">
                <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center z-10 shrink-0">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div className="md:w-1/2 md:text-right">
                  <h4 className="font-bold">Order Confirmed</h4>
                  <p className="text-sm text-muted-foreground">Oct 20, 2024 - 10:30 AM</p>
                </div>
                <div className="hidden md:block md:w-1/2" />
              </div>

              <div className="flex items-center gap-6">
                <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center z-10 shrink-0">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div className="md:w-1/2">
                  <h4 className="font-bold">Shipped</h4>
                  <p className="text-sm text-muted-foreground">Oct 21, 2024 - 02:15 PM</p>
                </div>
                <div className="hidden md:block md:w-1/2" />
              </div>

              <div className="flex items-center gap-6 md:flex-row-reverse">
                <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center z-10 animate-pulse shrink-0">
                  <Truck className="w-5 h-5" />
                </div>
                <div className="md:w-1/2 md:text-right">
                  <h4 className="font-bold">In Transit</h4>
                  <p className="text-sm text-muted-foreground">Oct 22, 2024 - 09:00 AM</p>
                </div>
                <div className="hidden md:block md:w-1/2" />
              </div>

              <div className="flex items-center gap-6 opacity-40">
                <div className="w-8 h-8 rounded-full bg-secondary text-muted-foreground flex items-center justify-center z-10 shrink-0">
                  <Package className="w-5 h-5" />
                </div>
                <div className="md:w-1/2">
                  <h4 className="font-bold">Delivered</h4>
                  <p className="text-sm">Pending</p>
                </div>
                <div className="hidden md:block md:w-1/2" />
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  )
}
