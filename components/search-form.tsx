"use client"

import { useRouter } from "next/navigation"
import { MapPin, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import type React from "react" // Added import for React

export default function SearchForm() {
  const router = useRouter()

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const location = formData.get("location")
    const keyword = formData.get("keyword")
    router.push(`/all-listing?location=${location}&keyword=${keyword}`)
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 max-w-3xl mx-auto">
      <div className="relative flex-1">
        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <Input name="location" placeholder="Where to look?" className="pl-10 bg-white text-black h-12" />
      </div>
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <Input name="keyword" placeholder="What are you looking for?" className="pl-10 bg-white text-black h-12" />
      </div>
      <Button type="submit" size="lg" className="h-12">
        Search
      </Button>
    </form>
  )
}

