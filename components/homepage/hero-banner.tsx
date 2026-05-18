import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Car, CheckCircle } from 'lucide-react'

export default function HeroBanner() {
  return (
    <section className="relative w-full bg-gradient-to-r from-primary to-orange-500 text-primary-foreground overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Left Content */}
          <div className="space-y-6 z-10">
            <h1 className="text-4xl lg:text-5xl font-bold text-pretty leading-tight">
              Drive Smart, Save Big
            </h1>
            <p className="text-lg lg:text-xl opacity-90">
              Discover premium automotive parts, cycling gear, and professional services. Up to 40% off everything this month.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/products">
                <Button size="lg" className="w-full sm:w-auto bg-primary-foreground text-primary hover:bg-gray-100">
                  Shop Now
                </Button>
              </Link>
              <Link href="/services">
                <Button 
                  size="lg" 
                  className="w-full sm:w-auto border-2 border-white text-white bg-transparent hover:bg-white hover:text-primary font-bold transition-colors"
                >
                  View Services
                </Button>
              </Link>
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm opacity-90 font-medium">
              <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4" /> Free Shipping</span>
              <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4" /> 30-Day Returns</span>
              <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4" /> Expert Support</span>
            </div>
          </div>

          {/* Right Visual - Real Car Image */}
          <div className="hidden lg:flex items-center justify-center relative">
            <div className="relative w-full h-[400px] group">
              <div className="absolute inset-0 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-all duration-700" />
              <img
                src="/hero_car_image_1778938126645.png"
                alt="Premium Car"
                className="w-full h-full object-contain relative z-10 drop-shadow-2xl hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-10 right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
    </section>
  )
}
