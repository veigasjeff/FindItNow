"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { submitListing } from "@/app/actions"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

const formSchema = z.object({
  name: z.string().min(2, "Business name must be at least 2 characters"),
  category: z.string().min(1, "Please select a category"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  address: z.string().min(5, "Please enter a valid address"),
  phone: z.string().min(5, "Please enter a valid phone number"),
  email: z.string().email("Please enter a valid email address"),
  website: z.string().url().optional(),
  features: z.string().min(3, "Please enter at least one feature"),
  images: z.array(z.string().url()).optional(), // Added images field
})

export default function AddListingPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState("")
  const [isSuccess, setIsSuccess] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      category: "",
      description: "",
      address: "",
      phone: "",
      email: "",
      website: "",
      features: "",
      images: "", 
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    setMessage("")
    setIsSuccess(false)

    const formData = new FormData()
    Object.entries(values).forEach(([key, value]) => {
      formData.append(key, value || "")
    })

    try {
      const result = await submitListing(formData)
      setMessage(result.message)
      setIsSuccess(result.success)

      if (result.success) {
        form.reset()
        setTimeout(() => {
          router.push("/")
        }, 5000)
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      setMessage("An unexpected error occurred. Please try again.")
      setIsSuccess(false)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Add Your Listing</h1>
        {message && (
          <Alert className={`mb-6 ${isSuccess ? "bg-green-50 text-green-900" : "bg-red-50 text-red-900"}`}>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>{isSuccess ? "Success" : "Error"}</AlertTitle>
            <AlertDescription>{message}</AlertDescription>
          </Alert>
        )}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Business Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter your business name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="restaurants">Restaurants</SelectItem>
                      <SelectItem value="automotive">Automotive</SelectItem>
                      <SelectItem value="personal-care">Personal Care</SelectItem>
                      <SelectItem value="real-estate">Real Estate</SelectItem>
                      <SelectItem value="preowned-cars">Preowned Cars</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} placeholder="Describe your business" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter your business address" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input {...field} type="tel" placeholder="Enter phone number" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} type="email" placeholder="Enter email address" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="website"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Website</FormLabel>
                  <FormControl>
                    <Input {...field} type="url" placeholder="Enter website URL (optional)" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="features"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Features</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter features separated by commas" />
                  </FormControl>
                  <FormDescription>Example: Dine-in, Takeaway, Outdoor seating</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="images"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Images</FormLabel>
                  <FormControl>
                    <Input {...field} type="url" placeholder="Image size height=400&width=600" />
                  </FormControl>
                  <FormDescription>Check Image size height=400&width=600</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit Listing"}
            </Button>
          </form>
        </Form>
      </div>
    </main>
  )
}







// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import * as z from "zod";
// import { submitListing } from "@/app/actions";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Textarea } from "@/components/ui/textarea";
// import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
// import { AlertCircle } from "lucide-react";

// const formSchema = z.object({
//   name: z.string().min(2, "Business name must be at least 2 characters"),
//   category: z.string().min(1, "Please select a category"),
//   description: z.string().min(10, "Description must be at least 10 characters"),
//   address: z.string().min(5, "Please enter a valid address"),
//   phone: z.string().min(5, "Please enter a valid phone number"),
//   email: z.string().email("Please enter a valid email address"),
//   website: z.string().url().optional(),
//   features: z.string().min(3, "Please enter at least one feature"),
//   images: z.array(z.string().url()).optional(), // Added images field
// });

// export default function AddListingPage() {
//   const router = useRouter();
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [message, setMessage] = useState("");
//   const [isSuccess, setIsSuccess] = useState(false);

//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       name: "",
//       category: "",
//       description: "",
//       address: "",
//       phone: "",
//       email: "",
//       website: "",
//       features: "",
//       images: ["/placeholder.svg?height=400&width=600"], // Default placeholder image
//     },
//   });

//   async function onSubmit(values: z.infer<typeof formSchema>) {
//     setIsSubmitting(true);
//     setMessage("");
//     setIsSuccess(false);

//     const formData = new FormData();
//     Object.entries(values).forEach(([key, value]) => {
//       if (Array.isArray(value)) {
//         value.forEach((v) => formData.append(key, v));
//       } else {
//         formData.append(key, value || "");
//       }
//     });

//     try {
//       const result = await submitListing(formData);
//       setMessage(result.message);
//       setIsSuccess(result.success);

//       if (result.success) {
//         form.reset();
//         setTimeout(() => {
//           router.push("/");
//         }, 5000);
//       }
//     } catch (error) {
//       console.error("Error submitting form:", error);
//       setMessage("An unexpected error occurred. Please try again.");
//       setIsSuccess(false);
//     } finally {
//       setIsSubmitting(false);
//     }
//   }

//   return (
//     <main className="container mx-auto px-4 py-12">
//       <div className="max-w-2xl mx-auto">
//         <h1 className="text-3xl font-bold mb-8">Add Your Listing</h1>
//         {message && (
//           <Alert className={`mb-6 ${isSuccess ? "bg-green-50 text-green-900" : "bg-red-50 text-red-900"}`}>
//             <AlertCircle className="h-4 w-4" />
//             <AlertTitle>{isSuccess ? "Success" : "Error"}</AlertTitle>
//             <AlertDescription>{message}</AlertDescription>
//           </Alert>
//         )}
//         <Form {...form}>
//           <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
//             <FormField
//               control={form.control}
//               name="name"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Business Name</FormLabel>
//                   <FormControl>
//                     <Input {...field} placeholder="Enter your business name" />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <FormField
//               control={form.control}
//               name="category"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Category</FormLabel>
//                   <Select onValueChange={field.onChange} defaultValue={field.value}>
//                     <FormControl>
//                       <SelectTrigger>
//                         <SelectValue placeholder="Select a category" />
//                       </SelectTrigger>
//                     </FormControl>
//                     <SelectContent>
//                       <SelectItem value="restaurants">Restaurants</SelectItem>
//                       <SelectItem value="automotive">Automotive</SelectItem>
//                       <SelectItem value="personal-care">Personal Care</SelectItem>
//                       <SelectItem value="real-estate">Real Estate</SelectItem>
//                       <SelectItem value="preowned-cars">Preowned Cars</SelectItem>
//                     </SelectContent>
//                   </Select>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <FormField
//               control={form.control}
//               name="images"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Images</FormLabel>
//                   <FormControl>
//                     <Input {...field} type="url" placeholder="Image size height=400&width=600" />
//                   </FormControl>
//                   <FormDescription>Enter image URLs separated by commas</FormDescription>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <Button type="submit" disabled={isSubmitting}>
//               {isSubmitting ? "Submitting..." : "Submit Listing"}
//             </Button>
//           </form>
//         </Form>
//       </div>
//     </main>
//   );
// }

