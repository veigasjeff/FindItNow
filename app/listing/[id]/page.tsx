import Image from "next/image"
import { MapPin, Phone, Mail, Globe, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import SEO from "@/components/seo"
import type { Listing } from "@/types/listing"

async function getData(id: string): Promise<Listing | null> {
  try {
    const data = await import("@/data/output.json")
    return data.default.listings.find((l: Listing) => l.id === id) || null
  } catch (error) {
    console.error("Error loading data:", error)
    return null
  }
}

export default async function ListingPage({ params }: { params: { id: string } }) {
  const listing = await getData(params.id)

  if (!listing) {
    return <div>Listing not found</div>
  }

  return (
    <>
      <SEO
        title={`${listing.name} - CityScope`}
        description={listing.description}
        keywords={`${listing.name}, ${listing.category}, local business, ${listing.features.join(", ")}`}
      />
      <article className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h1 className="text-4xl font-bold mb-4">{listing.name}</h1>
            <p className="text-xl text-muted-foreground mb-6">{listing.category}</p>
            <div className="aspect-video relative mb-6">
              <Image
                src={listing.images[0] || "/placeholder.svg"}
                alt={listing.name}
                fill
                className="object-cover rounded-lg"
              />
            </div>
            <div className="flex items-center gap-2 mb-4">
              <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              <span className="font-bold">{listing.rating}</span>
              <span className="text-muted-foreground">({listing.reviews} reviews)</span>
            </div>
            <p className="text-lg mb-6">{listing.description}</p>
            <h2 className="text-2xl font-semibold mb-4">Features</h2>
            <ul className="grid grid-cols-2 gap-2 mb-6">
              {listing.features.map((feature, index) => (
                <li key={index} className="flex items-center gap-2">
                  <span className="h-2 w-2 bg-primary rounded-full"></span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="bg-muted p-6 rounded-lg mb-6">
              <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
              <ul className="space-y-4">
                <li className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-primary" />
                  <span>{listing.address}</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-primary" />
                  <span>{listing.phone}</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-primary" />
                  <span>{listing.email}</span>
                </li>
                <li className="flex items-center gap-3">
                  <Globe className="h-5 w-5 text-primary" />
                  <a
                    href={listing.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    {listing.website}
                  </a>
                </li>
              </ul>
            </div>
            <div className="bg-muted p-6 rounded-lg mb-6">
              <h2 className="text-2xl font-semibold mb-4">Business Hours</h2>
              <ul className="space-y-2">
                {Object.entries(listing.hours).map(([day, hours]) => (
                  <li key={day} className="flex justify-between">
                    <span className="capitalize">{day}</span>
                    <span>{hours}</span>
                  </li>
                ))}
              </ul>
            </div>
            <Button className="w-full">Contact Business</Button>
          </div>
        </div>
      </article>
    </>
  )
}

