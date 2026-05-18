'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Mail, Check } from 'lucide-react'

export default function EmailSignup() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubmitted(true)
      setTimeout(() => {
        setEmail('')
        setSubmitted(false)
      }, 3000)
    }
  }

  return (
    <section className="py-12 lg:py-16 bg-secondary">
      <div className="max-w-2xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
            Subscribe to Our Newsletter
          </h2>
          <p className="text-muted-foreground">
            Get exclusive deals, product updates, and maintenance tips delivered to your inbox
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <Mail className="absolute left-4 top-3 w-5 h-5 text-muted-foreground" />
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full pl-12 pr-4 py-3 rounded-lg bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <Button
            type="submit"
            className={`px-8 ${
              submitted
                ? 'bg-green-600 hover:bg-green-700'
                : 'bg-primary hover:bg-orange-700'
            } text-primary-foreground transition`}
          >
            {submitted ? (
              <span className="flex items-center gap-2">
                <Check className="w-4 h-4" /> Subscribed!
              </span>
            ) : (
              'Subscribe'
            )}
          </Button>
        </form>

        <p className="text-center text-xs text-muted-foreground mt-4">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </div>
    </section>
  )
}
