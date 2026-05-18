import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Service } from '@/lib/data/services'
import { CheckCircle, Wrench, Settings, BatteryFull } from 'lucide-react'

const icons = {
  CheckCircle,
  Wrench,
  Settings,
  BatteryFull
}

interface ServiceCardProps {
  service: Service
}

export default function ServiceCard({ service }: ServiceCardProps) {
  const Icon = icons[service.icon as keyof typeof icons] || Settings
  return (
    <Card className="p-8 border-border bg-secondary hover:shadow-lg hover:border-primary transition-all group">
      {/* Icon */}
      <div className="mb-6 group-hover:scale-110 transition-transform inline-block">
        <div className="p-4 rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
          <Icon className="w-12 h-12" />
        </div>
      </div>

      {/* Content */}
      <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition">
        {service.title}
      </h3>

      <p className="text-muted-foreground text-base leading-relaxed mb-6 min-h-20">
        {service.description}
      </p>

      {/* Price */}
      {service.price && (
        <p className="text-lg font-semibold text-primary mb-6">
          {service.price}
        </p>
      )}

      {/* CTA Button */}
      <Button className="w-full bg-primary hover:bg-orange-700 text-primary-foreground">
        {service.cta}
      </Button>
    </Card>
  )
}
