import { Suspense } from "react"
import ListingGrid from "@/components/listing-grid"
import SearchForm from "@/components/search-form"
import SEO from "@/components/seo"
import type { Listing } from "@/types/listing"

async function getData(): Promise<{ listings: Listing[] }> {
  try {
    const data = await import("@/data/output.json")
    return { listings: data.default.listings || [] }
  } catch (error) {
    console.error("Error loading data:", error)
    return { listings: [] }
  }
}

export default async function AllListingsPage() {
  const { listings } = await getData()

  return (
    <>
      <SEO
        title="All Listings - CityScope"
        description="Browse all local businesses and services in your area. Find restaurants, shops, and more on CityScope."
        keywords="all listings, local businesses, directory, services, shops"
      />
      <section className="bg-muted py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-8 text-center">All Listings</h1>
          <div className="max-w-2xl mx-auto mb-12">
            <SearchForm />
          </div>
          <Suspense fallback={<div>Loading...</div>}>
            <ListingGrid listings={listings} />
          </Suspense>
        </div>
      </section>
    </>
  )
}

