'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'

export default function VehicleLookup() {
  const [make, setMake] = useState('')
  const [model, setModel] = useState('')
  const [year, setYear] = useState('')

  const makes = ['Toyota', 'Honda', 'Ford', 'BMW', 'Mercedes', 'Audi', 'Volkswagen', 'Tesla']
  const models = ['Camry', 'Civic', 'F-150', 'X5', 'C-Class', 'A4', 'Golf', 'Model 3']
  const years = Array.from({ length: 20 }, (_, i) => new Date().getFullYear() - i)

  const handleSearch = () => {
    if (make && model && year) {
      window.location.href = `/products?make=${make}&model=${model}&year=${year}`
    }
  }

  return (
    <section className="py-12 lg:py-16 bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
            Find Parts for Your Vehicle
          </h2>
          <p className="text-muted-foreground">
            Select your vehicle to see compatible parts and accessories
          </p>
        </div>

        <div className="bg-secondary rounded-lg p-6 lg:p-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
            {/* Make Dropdown */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Make
              </label>
              <select
                value={make}
                onChange={(e) => setMake(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">Select Make</option>
                {makes.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </div>

            {/* Model Dropdown */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Model
              </label>
              <select
                value={model}
                onChange={(e) => setModel(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">Select Model</option>
                {models.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </div>

            {/* Year Dropdown */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Year
              </label>
              <select
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">Select Year</option>
                {years.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </div>

            {/* Search Button */}
            <div className="flex items-end">
              <Button
                onClick={handleSearch}
                disabled={!make || !model || !year}
                className="w-full bg-primary hover:bg-orange-700 text-primary-foreground"
              >
                Search Parts
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
