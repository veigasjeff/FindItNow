export interface Listing {
  id: string
  name: string
  category: string
  description: string
  address: string
  phone: string
  email: string
  website: string
  image: string
  hours: {
    [key: string]: string
  }
  images: string[]
  features: string[]
  rating: number
  reviews: number
}

export interface Category {
  id: string
  name: string
  icon: string
}

export interface NewListing extends Omit<Listing, "id" | "rating" | "reviews"> {
  status: "pending" | "approved" | "rejected"
}

