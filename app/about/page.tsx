import SEO from "@/components/seo"

export default function AboutPage() {
  return (
    <>
      <SEO
        title="About CityScope - Your Local Business Directory"
        description="Learn about CityScope, your go-to platform for discovering and connecting with local businesses in your area."
        keywords="about CityScope, local business directory, company mission"
      />
      <section className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8 text-center">About CityScope</h1>
        <div className="max-w-3xl mx-auto prose prose-lg">
          <p>
            CityScope is your ultimate local business directory, designed to connect you with the best services, shops,
            and experiences in your area. Our mission is to support local economies by making it easier for people to
            discover and engage with businesses in their community.
          </p>
          <p>
            Founded in 2024, CityScope has quickly become the go-to platform for both business owners looking to
            increase their visibility and for consumers seeking quality local services. We believe in the power of
            community and the importance of supporting local enterprises.
          </p>
          <h2>Our Vision</h2>
          <p>
            We envision a world where every local business has the opportunity to thrive, and where community members
            can easily find and support the services they need. CityScope is more than just a directory; it's a bridge
            connecting people with the heart of their local economy.
          </p>
          <h2>How It Works</h2>
          <p>CityScope offers an intuitive, user-friendly platform where:</p>
          <ul>
            <li>Businesses can create detailed listings showcasing their services, hours, and special offers.</li>
            <li>Users can search for specific services or browse categories to discover new local gems.</li>
            <li>Community members can leave reviews and ratings, helping others make informed decisions.</li>
            <li>Local events and promotions are highlighted, fostering community engagement.</li>
          </ul>
          <p>
            Join us in our mission to strengthen local communities, one business at a time. Whether you're a business
            owner or a conscious consumer, CityScope is here to help you connect, discover, and thrive.
          </p>
        </div>
      </section>
    </>
  )
}

