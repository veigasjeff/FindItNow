import Link from "next/link"
import Image from "next/image"
import { Star } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import type { Listing } from "@/types/listing"

interface ListingGridProps {
  listings: Listing[]
}

export default function ListingGrid({ listings = [] }: ListingGridProps) {
  if (listings.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No listings found.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {listings.map((listing) => (
        <Card key={listing.id}>
          <Link href={`/listing/${listing.id}`}>
            <div className="aspect-video relative">
              <Image
                src={listing.images[0] || "/placeholder.svg?height=400&width=600"}
                alt={listing.name}
                fill
                className="object-cover"
              />
            </div>
            <CardContent className="p-4">
              <h3 className="text-xl font-semibold mb-2">{listing.name}</h3>
              <p className="text-muted-foreground line-clamp-2">{listing.description}</p>
            </CardContent>
            <CardFooter className="p-4 pt-0 flex items-center justify-between">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span>{listing.rating}</span>
                <span className="text-muted-foreground">({listing.reviews})</span>
              </div>
              <span className="text-muted-foreground">{listing.category}</span>
            </CardFooter>
          </Link>
        </Card>
      ))}
    </div>
  )
}

