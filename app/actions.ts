"use server"

import { revalidatePath } from "next/cache"
import type { NewListing } from "@/types/listing"

export async function submitListing(formData: FormData): Promise<{ success: boolean; message: string }> {
  try {
    const newListing: NewListing = {
      id: `listing-${Date.now()}`,
      name: formData.get("name") as string,
      category: formData.get("category") as string,
      description: formData.get("description") as string,
      address: formData.get("address") as string,
      phone: formData.get("phone") as string,
      email: formData.get("email") as string,
      website: (formData.get("website") as string) || "",
      hours: {
        monday: "9:00 AM - 5:00 PM",
        tuesday: "9:00 AM - 5:00 PM",
        wednesday: "9:00 AM - 5:00 PM",
        thursday: "9:00 AM - 5:00 PM",
        friday: "9:00 AM - 5:00 PM",
        saturday: "Closed",
        sunday: "Closed",
      },
      images: ["/placeholder.svg?height=400&width=600"],
      features: (formData.get("features") as string).split(",").map((f) => f.trim()),
      status: "pending",
    }

    const repoOwner = "veigasjeff"
    const repoName = "input"
    const filePath = "input.json"
    const token = process.env.GITHUB_TOKEN

    if (!token) {
      console.error("GitHub token is missing.")
      return { success: false, message: "Failed to submit listing due to a configuration error." }
    }

    // Fetch existing JSON file from GitHub
    const getFileResponse = await fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/contents/${filePath}`, {
      headers: { Authorization: `token ${token}` },
    })

    if (!getFileResponse.ok) {
      console.error(`Failed to fetch JSON file: ${getFileResponse.status}`)
      return { success: false, message: "Failed to submit listing. Please try again later." }
    }

    const fileData = await getFileResponse.json()
    const sha = fileData.sha
    const existingContent = fileData.content
      ? JSON.parse(Buffer.from(fileData.content, "base64").toString("utf-8"))
      : []

    // Ensure data is always an array
    const updatedData = Array.isArray(existingContent) ? [...existingContent, newListing] : [newListing]

    // Convert updated JSON to Base64
    const updatedContent = Buffer.from(JSON.stringify(updatedData, null, 2)).toString("base64")

    // Update the JSON file on GitHub
    const response = await fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/contents/${filePath}`, {
      method: "PUT",
      headers: {
        Authorization: `token ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: "Adding new listing",
        content: updatedContent,
        sha,
      }),
    })

    if (!response.ok) {
      console.error("GitHub API error:", await response.json())
      return { success: false, message: "Failed to submit listing. Please try again later." }
    }

    revalidatePath("/")
    return {
      success: true,
      message:
        "Thank you for submitting your listing. It is now under review and will be added to our directory once approved.",
    }
  } catch (error) {
    console.error("Error submitting listing:", error)
    return {
      success: false,
      message: "There was an error submitting your listing. Please try again.",
    }
  }
}

