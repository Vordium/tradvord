import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import DocumentationHero from "@/components/documentation-hero"
import DocumentationContent from "@/components/documentation-content"

export default function DocumentationPage() {
  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern bg-black z-0 opacity-20"></div>
      <div className="relative z-10">
        <Navbar />
        <DocumentationHero />
        <DocumentationContent />
        <Footer />
      </div>
    </main>
  )
}
