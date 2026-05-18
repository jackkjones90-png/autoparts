'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { 
  Mail, 
  Phone, 
  MessageSquare, 
  FileQuestion, 
  Truck, 
  RefreshCcw, 
  ShieldCheck,
  ChevronRight,
  Send
} from 'lucide-react'
import { useToast } from '@/components/ui/use-toast'

export default function SupportPage() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      toast({
        title: "Message Sent",
        description: "Thank you for contacting us. We'll get back to you within 24 hours.",
        duration: 5000,
      })
    }, 1500)
  }

  const helpCategories = [
    { icon: Truck, title: 'Shipping & Delivery', desc: 'Track orders, delivery times & rates' },
    { icon: RefreshCcw, title: 'Returns & Refunds', desc: 'How to return items & get a refund' },
    { icon: ShieldCheck, title: 'Product Warranty', desc: 'Coverage & claims for your items' },
    { icon: FileQuestion, title: 'General FAQ', desc: 'Common questions & answers' },
  ]

  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="bg-primary py-16 lg:py-24 text-primary-foreground text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl lg:text-5xl font-extrabold mb-6">How can we help you?</h1>
          <div className="relative max-w-2xl mx-auto">
            <Input 
              placeholder="Search help articles..." 
              className="bg-white text-foreground py-7 pl-12 rounded-2xl shadow-xl border-none focus-visible:ring-2 focus-visible:ring-primary/50"
            />
            <MessageSquare className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Help Categories */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {helpCategories.map((cat, i) => (
            <Card key={i} className="p-6 border-border hover:shadow-lg transition cursor-pointer group">
              <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <cat.icon className="w-6 h-6" />
              </div>
              <h3 className="font-bold mb-2">{cat.title}</h3>
              <p className="text-sm text-muted-foreground">{cat.desc}</p>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <div className="lg:col-span-1 space-y-8">
            <div>
              <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
              <p className="text-muted-foreground mb-8">Our support team is available Monday to Saturday, 9am - 6pm.</p>
            </div>

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold">Call Us</h4>
                  <p className="text-sm text-primary font-bold">07459056911</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold">Email Us</h4>
                  <p className="text-sm text-primary font-bold">support@carpartshoponline.com</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center shrink-0">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold">Live Chat</h4>
                  <p className="text-sm text-muted-foreground">Average response: 5 mins</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <Card className="lg:col-span-2 p-8 border-border">
            <h2 className="text-2xl font-bold mb-6">Send us a message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Your Name</label>
                  <Input required placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email Address</label>
                  <Input type="email" required placeholder="john@example.com" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Subject</label>
                <Input required placeholder="Order Issue, Product Question, etc." />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Message</label>
                <Textarea required placeholder="How can we help you?" className="min-h-[150px]" />
              </div>
              <Button disabled={isSubmitting} className="w-full bg-primary hover:bg-orange-700 py-6 text-lg font-bold">
                {isSubmitting ? 'Sending...' : (
                  <span className="flex items-center gap-2">
                    <Send className="w-4 h-4" /> Send Message
                  </span>
                )}
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </div>
  )
}
