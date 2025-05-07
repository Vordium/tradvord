import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import BlogHero from "@/components/blog-hero"
import BlogFeatured from "@/components/blog-featured"
import BlogList from "@/components/blog-list"

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern bg-black z-0 opacity-20"></div>
      <div className="relative z-10">
        <Navbar />
        <BlogHero />
        <BlogFeatured />
        <BlogList />
        <Footer />
      </div>
    </main>
  )
}
