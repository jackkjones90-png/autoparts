import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { services } from '@/lib/data/services'
import { CheckCircle, Wrench, Settings, BatteryFull } from 'lucide-react'

const icons = {
  CheckCircle,
  Wrench,
  Settings,
  BatteryFull
}

export default function ServicesBanner() {
  return (
    <section className="py-12 lg:py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
            Professional Services
          </h2>
          <p className="text-muted-foreground">
            Expert maintenance and support for your vehicle
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => {
            const Icon = icons[service.icon as keyof typeof icons] || Settings
            return (
              <Card
                key={service.id}
                className="p-6 text-center border-border hover:shadow-lg hover:border-primary transition-all group bg-secondary"
              >
                <div className="flex justify-center mb-4">
                  <div className="p-4 rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                    <Icon className="w-8 h-8" />
                  </div>
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition">
                  {service.title}
                </h3>
              <p className="text-sm text-muted-foreground mb-4 min-h-[3rem]">
                {service.description}
              </p>
              {service.price && (
                <p className="text-primary font-semibold mb-4">{service.price}</p>
              )}
              <Link href="/services">
                <Button className="w-full bg-primary hover:bg-orange-700 text-primary-foreground">
                  {service.cta}
                </Button>
              </Link>
            </Card>
              )
          })}
        </div>
      </div>
    </section>
  )
}
