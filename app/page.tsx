import { Suspense } from "react"
import Link from "next/link"
import { UtensilsCrossed, Car, Scissors, Home, Building2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import ListingGrid from "@/components/listing-grid"
import SearchForm from "@/components/search-form"
import SEO from "@/components/seo"
import type { Category, Listing } from "@/types/listing"

const iconMap = {
  UtensilsCrossed,
  Car,
  Scissors,
  Home,
  Building2,
}

async function getData(): Promise<{ categories: Category[]; listings: Listing[] }> {
  try {
    const data = await import("@/data/output.json")
    return {
      categories: data.default.categories || [],
      listings: data.default.listings || [],
    }
  } catch (error) {
    console.error("Error loading data:", error)
    return { categories: [], listings: [] }
  }
}

export default async function HomePage() {
  const { categories, listings } = await getData()

  return (
    <>
      <SEO
        title="CityScope - Discover Local Businesses"
        description="Find and connect with the best local businesses in your area. From restaurants to services, CityScope has you covered."
        keywords="local business, directory, listings, restaurants, services, shops"
      />
      <section className="relative h-[600px] flex items-center justify-center bg-[url('https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Discover Your City's Best</h1>
          <p className="text-xl mb-8">Find local businesses, services, and more</p>
          <SearchForm />
        </div>
      </section>
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Explore Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {categories.map((category) => {
            const Icon = iconMap[category.icon as keyof typeof iconMap]
            return (
              <Link key={category.id} href={`/category/${category.id}`}>
                <Button
                  variant="outline"
                  className="w-full h-32 flex flex-col items-center justify-center gap-4 hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  {Icon && <Icon className="h-8 w-8" />}
                  <span className="text-sm font-medium">{category.name}</span>
                </Button>
              </Link>
            )
          })}
        </div>
      </section>
      <section className="bg-muted py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Featured Listings</h2>
          <Suspense fallback={<div>Loading...</div>}>
            <ListingGrid listings={listings.slice(0, 6)} />
          </Suspense>
          <div className="text-center mt-12">
            <Button asChild>
              <Link href="/all-listings">View All Listings</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}

