'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ChevronDown, Star } from 'lucide-react'
import { useState, useEffect } from 'react'

interface ProductFiltersProps {
  onFilterChange: (filters: FilterState) => void
  categories: string[]
  activeFilters: FilterState
}

export interface FilterState {
  category: string
  priceRange: [number, number]
  rating: number
  inStock: boolean
}

const brands = [
  'Toyota',
  'Honda',
  'Ford',
  'BMW',
  'Mercedes',
  'Audi',
]

const priceRanges = [
  { label: 'Under £50', min: 0, max: 50 },
  { label: '£50 - £100', min: 50, max: 100 },
  { label: '£100 - £250', min: 100, max: 250 },
  { label: '£250 - £500', min: 250, max: 500 },
  { label: 'Over £500', min: 500, max: 10000 },
]

const ratings = [
  { label: '4 & Up', value: 4 },
  { label: '3 & Up', value: 3 },
  { label: '2 & Up', value: 2 },
  { label: '1 & Up', value: 1 },
]

export default function ProductFilters({
  onFilterChange,
  categories,
  activeFilters,
}: ProductFiltersProps) {
  const [filters, setFilters] = useState<FilterState>(activeFilters)
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    category: true,
    price: true,
    rating: true,
    stock: true,
  })

  // Sync internal state with external activeFilters prop
  useEffect(() => {
    setFilters(activeFilters)
  }, [activeFilters])

  const toggleSection = (section: string) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section],
    })
  }

  const handleCategoryChange = (category: string) => {
    const newFilters: FilterState = { ...filters, category }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  const handlePriceChange = (min: number, max: number) => {
    const newFilters: FilterState = { ...filters, priceRange: [min, max] }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  const handleRatingChange = (rating: number) => {
    const newFilters: FilterState = { ...filters, rating }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  const handleStockChange = () => {
    const newFilters: FilterState = { ...filters, inStock: !filters.inStock }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  const handleReset = () => {
    const newFilters: FilterState = {
      category: '',
      priceRange: [0, 10000],
      rating: 0,
      inStock: false,
    }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  return (
    <div className="space-y-4">
      <Card className="p-4 border-border bg-secondary">
        <h2 className="font-semibold text-foreground mb-4">Filters</h2>

        {/* Category Filter */}
        <div className="border-b border-border pb-4 mb-4">
          <button
            onClick={() => toggleSection('category')}
            className="flex items-center justify-between w-full mb-3 font-medium text-foreground hover:text-primary transition"
          >
            Category
            <ChevronDown className={`w-4 h-4 transition ${expandedSections.category ? 'rotate-180' : ''}`} />
          </button>
          {expandedSections.category && (
            <div className="space-y-2">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="radio"
                  name="category"
                  value=""
                  checked={filters.category === ''}
                  onChange={() => handleCategoryChange('')}
                  className="w-4 h-4"
                />
                <span className="text-sm text-muted-foreground group-hover:text-foreground transition">
                  All Categories
                </span>
              </label>
              {categories.map((cat) => (
                <label key={cat} className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="radio"
                    name="category"
                    value={cat}
                    checked={filters.category === cat}
                    onChange={() => handleCategoryChange(cat)}
                    className="w-4 h-4"
                  />
                  <span className="text-sm text-muted-foreground group-hover:text-foreground transition capitalize">
                    {cat.replace('-', ' ')}
                  </span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Price Filter */}
        <div className="border-b border-border pb-4 mb-4">
          <button
            onClick={() => toggleSection('price')}
            className="flex items-center justify-between w-full mb-3 font-medium text-foreground hover:text-primary transition"
          >
            Price Range
            <ChevronDown className={`w-4 h-4 transition ${expandedSections.price ? 'rotate-180' : ''}`} />
          </button>
          {expandedSections.price && (
            <div className="space-y-2">
              {priceRanges.map((range) => (
                <label key={range.label} className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="radio"
                    name="price"
                    value={range.label}
                    checked={filters.priceRange[0] === range.min && filters.priceRange[1] === range.max}
                    onChange={() => handlePriceChange(range.min, range.max)}
                    className="w-4 h-4"
                  />
                  <span className="text-sm text-muted-foreground group-hover:text-foreground transition">
                    {range.label}
                  </span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Rating Filter */}
        <div className="border-b border-border pb-4 mb-4">
          <button
            onClick={() => toggleSection('rating')}
            className="flex items-center justify-between w-full mb-3 font-medium text-foreground hover:text-primary transition"
          >
            Rating
            <ChevronDown className={`w-4 h-4 transition ${expandedSections.rating ? 'rotate-180' : ''}`} />
          </button>
          {expandedSections.rating && (
            <div className="space-y-2">
              {ratings.map((rating) => (
                <label key={rating.value} className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="radio"
                    name="rating"
                    value={rating.value}
                    checked={filters.rating === rating.value}
                    onChange={() => handleRatingChange(rating.value)}
                    className="w-4 h-4"
                  />
                  <span className="text-sm text-muted-foreground group-hover:text-foreground transition flex items-center gap-1">
                    {rating.label} <Star className="w-3 h-3 fill-primary text-primary" />
                  </span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Stock Filter */}
        <div className="mb-4">
          <button
            onClick={() => toggleSection('stock')}
            className="flex items-center justify-between w-full mb-3 font-medium text-foreground hover:text-primary transition"
          >
            Stock Status
            <ChevronDown className={`w-4 h-4 transition ${expandedSections.stock ? 'rotate-180' : ''}`} />
          </button>
          {expandedSections.stock && (
            <label className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                checked={filters.inStock}
                onChange={handleStockChange}
                className="w-4 h-4"
              />
              <span className="text-sm text-muted-foreground group-hover:text-foreground transition">
                In Stock Only
              </span>
            </label>
          )}
        </div>

        {/* Reset Button */}
        <Button
          onClick={handleReset}
          variant="outline"
          className="w-full text-foreground border-border hover:bg-background"
        >
          Clear All Filters
        </Button>
      </Card>
    </div>
  )
}
