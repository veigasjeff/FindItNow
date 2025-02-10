import Link from "next/link"
import { UtensilsCrossed, Car, Scissors, Home, Building2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import SEO from "@/components/seo"
import type { Category } from "@/types/listing"

const iconMap = {
  UtensilsCrossed,
  Car,
  Scissors,
  Home,
  Building2,
}

async function getData(): Promise<{ categories: Category[] }> {
  try {
    const data = await import("@/data/output.json")
    return { categories: data.default.categories || [] }
  } catch (error) {
    console.error("Error loading data:", error)
    return { categories: [] }
  }
}

export default async function CategoriesPage() {
  const { categories } = await getData()

  return (
    <>
      <SEO
        title="Categories - CityScope"
        description="Explore various categories of local businesses and services. Find exactly what you're looking for on CityScope."
        keywords="business categories, local services, directory categories"
      />
      <section className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-12 text-center">Explore Categories</h1>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {categories.map((category) => {
            const Icon = iconMap[category.icon as keyof typeof iconMap]
            return (
              <Link key={category.id} href={`/category/${category.id}`}>
                <Button
                  variant="outline"
                  className="w-full h-40 flex flex-col items-center justify-center gap-4 hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  {Icon && <Icon className="h-12 w-12" />}
                  <span className="text-lg font-medium">{category.name}</span>
                </Button>
              </Link>
            )
          })}
        </div>
      </section>
    </>
  )
}

