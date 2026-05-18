export interface Service {
  id: string
  title: string
  description: string
  icon: string // This will be the name of the icon or a component
  cta: string
  price?: string
}

export const services: Service[] = [
  {
    id: '1',
    title: 'MOT Booking',
    description: 'Book your annual MOT test at our certified testing centers. Fast, reliable, and affordable.',
    icon: 'CheckCircle',
    cta: 'Book MOT',
    price: 'From £25',
  },
  {
    id: '2',
    title: 'Car Service',
    description: 'Professional car servicing with genuine parts. Oil changes, filters, inspections, and more.',
    icon: 'Wrench',
    cta: 'Schedule Service',
    price: 'From £80',
  },
  {
    id: '3',
    title: 'Tyre Fitting',
    description: 'Expert tyre fitting and balancing service. We carry a wide range of premium brands.',
    icon: 'Settings',
    cta: 'Book Fitting',
    price: 'From £20',
  },
  {
    id: '4',
    title: 'Battery Check',
    description: 'Free battery health check and testing. Replacement available if needed.',
    icon: 'BatteryFull',
    cta: 'Check Battery',
    price: 'Free',
  },
]
