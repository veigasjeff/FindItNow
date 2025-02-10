import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ThemeProvider } from "@/components/theme-provider"
import { ModeToggle } from "@/components/mode-toggle"
import "./globals.css"
import type React from "react" // Import React

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "CityScope - Your Local Business Directory",
  description: "Discover and connect with the best local businesses in your area.",
  keywords: "local business, directory, listings, restaurants, services, shops",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="flex min-h-screen flex-col">
            <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <Link href="/" className="font-bold text-2xl text-primary">
                  CityScope
                </Link>
                <nav className="hidden md:flex items-center gap-6">
                  <Link href="/" className="text-foreground/60 hover:text-foreground">
                    Home
                  </Link>
                  <Link href="/all-listings" className="text-foreground/60 hover:text-foreground">
                    All Listings
                  </Link>
                  <Link href="/categories" className="text-foreground/60 hover:text-foreground">
                    Categories
                  </Link>
                  <Link href="/about" className="text-foreground/60 hover:text-foreground">
                    About
                  </Link>
                  <Link href="/contact" className="text-foreground/60 hover:text-foreground">
                    Contact
                  </Link>
                </nav>
                <div className="flex items-center gap-4">
                  <ModeToggle />
                  <Button asChild variant="default">
                    <Link href="/add-listing">Add Listing</Link>
                  </Button>
                </div>
              </div>
            </header>
            <main className="flex-1">{children}</main>
            <footer className="border-t bg-muted/50">
              <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row justify-between items-center">
                <p className="text-sm text-muted-foreground">© 2024 CityScope. All rights reserved.</p>
                <nav className="flex gap-4 mt-4 md:mt-0">
                  <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
                    Privacy Policy
                  </Link>
                  <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground">
                    Terms of Service
                  </Link>
                </nav>
              </div>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}

