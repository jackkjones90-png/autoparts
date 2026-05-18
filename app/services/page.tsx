import ServiceCard from '@/components/services/service-card'
import { services } from '@/lib/data/services'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Wrench, Clock, CheckCircle, CreditCard, MapPin, Phone } from 'lucide-react'

export default function ServicesPage() {
  const features = [
    {
      icon: Clock,
      title: 'Quick Turnaround',
      description: 'Most services completed same-day. Convenient scheduling available.',
    },
    {
      icon: CheckCircle,
      title: 'Quality Assured',
      description: 'All work backed by our satisfaction guarantee and warranty.',
    },
    {
      icon: Wrench,
      title: 'Expert Technicians',
      description: 'Certified professionals with years of automotive experience.',
    },
    {
      icon: CreditCard,
      title: 'Competitive Pricing',
      description: 'Best prices in the market without compromising on quality.',
    },
    {
      icon: MapPin,
      title: 'Multiple Locations',
      description: 'Convenient service centers across the region.',
    },
    {
      icon: Phone,
      title: 'Customer Support',
      description: '24/7 support to answer all your questions and concerns.',
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-orange-500 text-primary-foreground py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-2xl">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4 text-pretty">
              Professional Vehicle Services
            </h1>
            <p className="text-lg lg:text-xl opacity-90 mb-6">
              Expert maintenance and care for your vehicle. Book your appointment today and enjoy peace of mind.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-primary-foreground text-primary hover:bg-gray-100">
                Book Service Now
              </Button>
              <Button
                variant="outline"
                className="border-primary-foreground text-primary-foreground hover:bg-white/20"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Our Services
            </h2>
            <p className="text-muted-foreground text-lg">
              Comprehensive vehicle maintenance and care services
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-secondary py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-12 text-center">
            Why Choose Our Services?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, idx) => {
              const Icon = feature.icon
              return (
                <div key={idx} className="bg-background p-6 rounded-lg border border-border group hover:border-primary transition-all duration-300 hover:shadow-lg">
                  <div className="p-3 bg-primary/10 rounded-full w-fit mb-4 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <Icon size={32} />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Service Process */}
      <section className="py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-foreground mb-12 text-center">
            How It Works
          </h2>

          <div className="space-y-6">
            {[
              {
                step: '1',
                title: 'Book Your Service',
                description: 'Choose your service and select a convenient time slot.',
              },
              {
                step: '2',
                title: 'Bring Your Vehicle',
                description: 'Drive into one of our service centers for your appointment.',
              },
              {
                step: '3',
                title: 'Expert Service',
                description: 'Our certified technicians will perform the service with care.',
              },
              {
                step: '4',
                title: 'Quality Check',
                description: 'We inspect the work and provide you with a detailed report.',
              },
            ].map((item, idx) => (
              <div key={idx} className="flex gap-6 items-start">
                <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg flex-shrink-0">
                  {item.step}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-primary-foreground py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Wrench className="w-16 h-16 mx-auto mb-6" />
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Ready to Service Your Vehicle?
          </h2>
          <p className="text-lg opacity-90 mb-8">
            Schedule an appointment today and get professional care for your vehicle
          </p>
          <Button className="bg-primary-foreground text-primary hover:bg-gray-100">
            Book Now
          </Button>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 lg:py-20 bg-background">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-foreground mb-12 text-center">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4">
            {[
              {
                q: 'How long does a typical service take?',
                a: 'Most services are completed within 1-3 hours, depending on the type of service.',
              },
              {
                q: 'Do you use genuine parts?',
                a: 'Yes, we only use genuine or high-quality certified replacement parts.',
              },
              {
                q: 'Can I schedule online?',
                a: 'Yes, you can book your service easily through our website or app.',
              },
              {
                q: 'What payment methods do you accept?',
                a: 'We accept all major credit cards, debit cards, and digital payment methods.',
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-secondary border border-border rounded-lg p-6 hover:border-primary transition"
              >
                <h3 className="font-semibold text-foreground mb-2">{item.q}</h3>
                <p className="text-muted-foreground">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
