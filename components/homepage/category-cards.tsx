import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { categories } from '@/lib/data/products'

export default function CategoryCards() {
  return (
    <section className="py-12 lg:py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
            Shop by Category
          </h2>
          <p className="text-muted-foreground">
            Browse our wide selection of products
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-8">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/products?category=${category.id}`}
              className="w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.33%-1.5rem)]"
            >
              <Card className="h-full p-8 text-center hover:shadow-2xl hover:border-primary transition-all cursor-pointer group bg-secondary border-border">
                <div className="relative h-64 mb-6 overflow-hidden rounded-xl bg-white p-2">
                  <img 
                    src={category.image} 
                    alt={category.name}
                    className="w-full h-full object-cover rounded-lg group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <h3 className="font-bold text-xl text-foreground group-hover:text-primary transition uppercase tracking-widest">
                  {category.name}
                </h3>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
