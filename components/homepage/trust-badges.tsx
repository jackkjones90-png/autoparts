import { Truck, RotateCcw, LifeBuoy, Award } from 'lucide-react'

const badges = [
  {
    icon: Truck,
    title: 'Free Shipping',
    description: 'On orders over $50',
  },
  {
    icon: RotateCcw,
    title: '30-Day Returns',
    description: 'No questions asked guarantee',
  },
  {
    icon: LifeBuoy,
    title: 'Expert Support',
    description: '24/7 customer assistance',
  },
  {
    icon: Award,
    title: 'Quality Guaranteed',
    description: 'All products certified',
  },
]

export default function TrustBadges() {
  return (
    <section className="py-12 lg:py-16 bg-background border-y border-border">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {badges.map((badge, idx) => {
            const Icon = badge.icon
            return (
              <div key={idx} className="text-center flex flex-col items-center gap-3">
                <div className="p-3 bg-secondary rounded-full">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">{badge.title}</h4>
                  <p className="text-sm text-muted-foreground">{badge.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
