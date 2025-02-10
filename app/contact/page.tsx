import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import SEO from "@/components/seo"

export default function ContactPage() {
  return (
    <>
      <SEO
        title="Contact Us - CityScope"
        description="Get in touch with the CityScope team. We're here to help with any questions or feedback about our local business directory."
        keywords="contact CityScope, customer support, feedback, local business directory help"
      />
      <section className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8 text-center">Contact Us</h1>
        <div className="max-w-2xl mx-auto">
          <p className="text-center mb-8 text-lg text-muted-foreground">
            Have questions or feedback? We're here to help! Fill out the form below and we'll get back to you as soon as
            possible.
          </p>
          <form className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                Name
              </label>
              <Input id="name" name="name" required />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email
              </label>
              <Input id="email" name="email" type="email" required />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-2">
                Message
              </label>
              <Textarea id="message" name="message" rows={6} required />
            </div>
            <Button type="submit" className="w-full">
              Send Message
            </Button>
          </form>
        </div>
      </section>
    </>
  )
}

