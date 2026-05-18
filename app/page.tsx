import HeroBanner from '@/components/homepage/hero-banner'
import VehicleLookup from '@/components/homepage/vehicle-lookup'
import CategoryCards from '@/components/homepage/category-cards'
import FeaturedDeals from '@/components/homepage/featured-deals'
import ServicesBanner from '@/components/homepage/services-banner'
import BestSellers from '@/components/homepage/best-sellers'
import TrustBadges from '@/components/homepage/trust-badges'
import EmailSignup from '@/components/homepage/email-signup'

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <HeroBanner />
      <VehicleLookup />
      <CategoryCards />
      <FeaturedDeals />
      <ServicesBanner />
      <BestSellers />
      <TrustBadges />
      <EmailSignup />
    </div>
  )
}
