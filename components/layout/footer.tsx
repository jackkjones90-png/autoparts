import Link from 'next/link'
import { Facebook, Twitter, Instagram, Linkedin, Truck, ShieldCheck, Phone, Mail } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Column 1 - About */}
          <div>
            <h3 className="font-bold text-lg mb-4">CarPartsShopOnline</h3>
            <p className="text-sm opacity-90 leading-relaxed">
              VEHICLE PARTS HUB UK LTD (13385807). Your one-stop shop for quality automotive parts, dash cams, and vehicle accessories. Fast delivery, great prices, expert service.
            </p>
          </div>

          {/* Column 2 - Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="opacity-90 hover:opacity-100 transition">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/products" className="opacity-90 hover:opacity-100 transition">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/services" className="opacity-90 hover:opacity-100 transition">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/support" className="opacity-90 hover:opacity-100 transition">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3 - Support */}
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/support" className="opacity-90 hover:opacity-100 transition">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="#" className="opacity-90 hover:opacity-100 transition">
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link href="/track-order" className="opacity-90 hover:opacity-100 transition">
                  Track Order
                </Link>
              </li>
              <li>
                <Link href="#" className="opacity-90 hover:opacity-100 transition">
                  FAQs
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4 - Legal */}
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="opacity-90 hover:opacity-100 transition">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="opacity-90 hover:opacity-100 transition">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="#" className="opacity-90 hover:opacity-100 transition">
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="opacity-90 hover:opacity-100 transition">
                  Accessibility
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-primary-foreground/20 pt-8 mb-4">
          {/* Social Links */}
          <div className="flex justify-center gap-6 mb-6">
            <Link href="#" className="opacity-90 hover:opacity-100 transition">
              <Facebook className="w-5 h-5" />
              <span className="sr-only">Facebook</span>
            </Link>
            <Link href="#" className="opacity-90 hover:opacity-100 transition">
              <Twitter className="w-5 h-5" />
              <span className="sr-only">Twitter</span>
            </Link>
            <Link href="#" className="opacity-90 hover:opacity-100 transition">
              <Instagram className="w-5 h-5" />
              <span className="sr-only">Instagram</span>
            </Link>
            <Link href="#" className="opacity-90 hover:opacity-100 transition">
              <Linkedin className="w-5 h-5" />
              <span className="sr-only">LinkedIn</span>
            </Link>
          </div>

          {/* Copyright */}
          <div className="text-center text-sm opacity-90">
            <p>&copy; {new Date().getFullYear()} VEHICLE PARTS HUB UK LTD (13385807). All rights reserved.</p>
            <p className="mt-1 text-xs">Made with care for automotive and cycling enthusiasts.</p>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/20 py-4 bg-primary-foreground/10">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm opacity-90">
          <div className="flex flex-wrap justify-center gap-6">
            <span className="flex items-center gap-2"><Truck className="w-4 h-4" /> Free Shipping on Orders Over £50</span>
            <span className="flex items-center gap-2"><ShieldCheck className="w-4 h-4" /> 30-Day Money-Back Guarantee</span>
          </div>
          <div className="flex flex-wrap justify-center gap-6">
            <span className="flex items-center gap-2"><Phone className="w-4 h-4" /> 07459056911</span>
            <span className="flex items-center gap-2"><Mail className="w-4 h-4" /> support@carpartshoponline.com</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
