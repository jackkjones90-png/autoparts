'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Search, ShoppingCart, User, Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

import { categories } from '@/lib/data/products'

import { useCart } from '@/lib/context/cart-context'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { cartCount } = useCart()

  const navCategories = categories.map(cat => ({
    name: cat.name,
    href: `/products?category=${cat.id}`
  }))

  return (
    <header className="sticky top-0 z-50 w-full bg-background border-b border-border">
      {/* Top Utility Bar */}
      <div className="bg-muted text-muted-foreground text-sm hidden lg:block">
        <div className="max-w-7xl mx-auto px-4 py-2 flex justify-between items-center">
          <div className="flex gap-6">
            <Link href="/track-order" className="hover:text-foreground transition">
              Track Order
            </Link>
            <Link href="/store-locator" className="hover:text-foreground transition">
              Store Locator
            </Link>
            <Link href="/" className="hover:text-foreground transition font-semibold text-primary">
              carpartshoponline.com
            </Link>
          </div>
          <div className="flex gap-4">
            <Link href="/support" className="hover:text-foreground transition">
              Support
            </Link>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0 font-bold text-xl lg:text-2xl text-foreground hover:text-primary transition uppercase tracking-tighter">
          <span className="text-primary">CarParts</span>
          <span>ShopOnline</span>
        </Link>

        {/* Desktop Navigation - Hidden on Mobile */}
        <nav className="hidden lg:flex gap-6 flex-1 ml-8">
          {navCategories.slice(0, 4).map((cat) => (
            <Link
              key={cat.href}
              href={cat.href}
              className="text-foreground hover:text-primary transition font-medium text-sm whitespace-nowrap"
            >
              {cat.name}
            </Link>
          ))}
          <Link href="/services">
            <Button 
              size="sm" 
              variant="ghost" 
              className="text-sm font-medium h-auto py-0 px-0 hover:text-primary hover:bg-transparent"
            >
              Services
            </Button>
          </Link>
        </nav>

        {/* Search Bar - Desktop */}
        <div className="hidden sm:flex flex-1 max-w-sm">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full px-4 py-2 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <Search className="absolute right-3 top-2.5 w-5 h-5 text-muted-foreground" />
          </div>
        </div>

        {/* Right Icons */}
        <div className="flex items-center gap-2 lg:gap-4">
          <button className="p-2 hover:bg-secondary rounded-lg transition hidden sm:inline-block text-foreground">
            <User className="w-5 h-5" />
          </button>
          <Link
            href="/cart"
            className="relative p-2 hover:bg-secondary rounded-lg transition text-foreground"
          >
            <ShoppingCart className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 hover:bg-secondary rounded-lg transition text-foreground"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <nav className="lg:hidden border-t border-border bg-background px-4 py-4 flex flex-col gap-2">
          {navCategories.map((cat) => (
            <Link
              key={cat.href}
              href={cat.href}
              className="block px-4 py-2 text-foreground hover:bg-secondary rounded-lg transition font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              {cat.name}
            </Link>
          ))}
          <Link
            href="/services"
            className="block px-4 py-2 text-foreground hover:bg-secondary rounded-lg transition font-medium"
            onClick={() => setMobileMenuOpen(false)}
          >
            Services
          </Link>
        </nav>
      )}
    </header>
  )
}
