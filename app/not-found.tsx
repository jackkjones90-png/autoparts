import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 py-16">
      <div className="text-center max-w-md">
        <div className="text-8xl font-bold text-primary mb-4">404</div>
        <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
          Page Not Found
        </h1>
        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
          Sorry, the page you&apos;re looking for doesn&apos;t exist or has been moved. Let&apos;s get you back on track.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/">
            <Button className="w-full sm:w-auto bg-primary hover:bg-orange-700 text-primary-foreground">
              Back to Home
            </Button>
          </Link>
          <Link href="/products">
            <Button 
              variant="outline"
              className="w-full sm:w-auto border-border text-foreground hover:bg-secondary"
            >
              Browse Products
            </Button>
          </Link>
        </div>

        {/* Helpful Links */}
        <div className="mt-12 pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground mb-4">Quick Links</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center text-sm">
            <Link href="/products?category=car-parts" className="text-primary hover:underline">
              Car Parts
            </Link>
            <Link href="/products?category=batteries" className="text-primary hover:underline">
              Batteries
            </Link>
            <Link href="/services" className="text-primary hover:underline">
              Services
            </Link>
            <Link href="/cart" className="text-primary hover:underline">
              Cart
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
