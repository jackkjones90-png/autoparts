'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { MapPin, Phone, Clock, Navigation } from 'lucide-react'

const stores = [
  {
    id: 1,
    name: 'London Central Hub',
    address: '123 Victoria St, London SW1E 6DE',
    phone: '020 7123 4567',
    hours: 'Mon-Sat: 8am-8pm, Sun: 10am-4pm',
    distance: '1.2 miles'
  },
  {
    id: 2,
    name: 'Manchester North',
    address: '45 Retail Park, Manchester M8 8EP',
    phone: '0161 987 6543',
    hours: 'Mon-Sat: 9am-7pm, Sun: 10am-4pm',
    distance: '3.5 miles'
  },
  {
    id: 3,
    name: 'Birmingham East',
    address: '88 High St, Birmingham B4 7SL',
    phone: '0121 555 0199',
    hours: 'Mon-Sat: 8am-8pm, Sun: 11am-5pm',
    distance: '5.0 miles'
  }
]

export default function StoreLocatorPage() {
  const [search, setSearch] = useState('')

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Search & List */}
        <div className="lg:col-span-1 space-y-6">
          <div>
            <h1 className="text-3xl font-bold mb-4">Find a Store</h1>
            <p className="text-muted-foreground mb-6">Enter your postcode or city to find the nearest CarPartsShopOnline location.</p>
            <div className="relative">
              <Input 
                placeholder="Postcode or City" 
                className="pl-10 py-6"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Button className="absolute right-1.5 top-1.5 bg-primary hover:bg-orange-700">Search</Button>
            </div>
          </div>

          <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
            {stores.map((store) => (
              <Card key={store.id} className="p-4 border-border hover:border-primary transition cursor-pointer group">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold group-hover:text-primary transition">{store.name}</h3>
                  <span className="text-xs font-semibold text-muted-foreground bg-secondary px-2 py-1 rounded">{store.distance}</span>
                </div>
                <p className="text-sm text-muted-foreground mb-4">{store.address}</p>
                <div className="space-y-2 text-xs">
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-primary" /> {store.phone}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-primary" /> {store.hours}
                  </div>
                </div>
                <Button variant="outline" className="w-full mt-4 text-xs">
                  <Navigation className="w-3.5 h-3.5 mr-2" /> Get Directions
                </Button>
              </Card>
            ))}
          </div>
        </div>

        {/* Mock Map */}
        <div className="lg:col-span-2">
          <Card className="w-full h-full min-h-[500px] bg-secondary/20 border-border relative overflow-hidden flex items-center justify-center">
            {/* Visual background pattern to simulate a map */}
            <div className="absolute inset-0 opacity-10" style={{ 
              backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', 
              backgroundSize: '20px 20px' 
            }} />
            
            <div className="relative text-center p-8 bg-background/80 backdrop-blur rounded-2xl shadow-xl max-w-sm">
              <div className="w-16 h-16 rounded-full bg-primary/20 text-primary flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8" />
              </div>
              <h2 className="text-xl font-bold mb-2">Interactive Map</h2>
              <p className="text-sm text-muted-foreground mb-6">Select a store from the list to view its location on the map and find the best route.</p>
              <Button className="bg-primary hover:bg-orange-700">Open in Google Maps</Button>
            </div>

            {/* Simulated map markers */}
            <div className="absolute top-1/4 left-1/3 text-primary animate-bounce">
              <MapPin className="w-8 h-8 fill-current" />
            </div>
            <div className="absolute bottom-1/3 right-1/4 text-primary opacity-50">
              <MapPin className="w-6 h-6 fill-current" />
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
