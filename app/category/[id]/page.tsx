import { Suspense } from "react"
import ListingGrid from "@/components/listing-grid"
import SearchForm from "@/components/search-form"
import SEO from "@/components/seo"
import type { Category, Listing } from "@/types/listing"

async function getData(id: string): Promise<{ category: Category; listings: Listing[] }> {
  try {
    const data = await import("@/data/output.json")
    const category = data.default.categories.find((c: Category) => c.id === id) || { id, name: id, icon: "Building2" }
    const listings = data.default.listings.filter(
      (l: Listing) => l.category.toLowerCase() === category.name.toLowerCase(),
    )
    return { category, listings }
  } catch (error) {
    console.error("Error loading data:", error)
    return { category: { id, name: id, icon: "Building2" }, listings: [] }
  }
}

export default async function CategoryPage({ params }: { params: { id: string } }) {
  const { category, listings } = await getData(params.id)

  return (
    <>
      <SEO
        title={`${category.name} - CityScope`}
        description={`Explore ${category.name} businesses and services in your area. Find the best local ${category.name.toLowerCase()} options on CityScope.`}
        keywords={`${category.name}, local businesses, ${category.name.toLowerCase()} services, directory`}
      />
      <section className="bg-muted py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-8 text-center">{category.name}</h1>
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

