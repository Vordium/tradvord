import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import LegalHero from "@/components/legal-hero"
import LegalDocuments from "@/components/legal-documents"

export default function LegalPage() {
  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern bg-black z-0 opacity-20"></div>
      <div className="relative z-10">
        <Navbar />
        <LegalHero />
        <LegalDocuments />
        <Footer />
      </div>
    </main>
  )
}
