import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import PartnersHero from "@/components/partners-hero"
import PartnersProgram from "@/components/partners-program"
import PartnersShowcase from "@/components/partners-showcase"
import PartnersTestimonials from "@/components/partners-testimonials"
import PartnersCta from "@/components/partners-cta"

export default function PartnersPage() {
  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern bg-black z-0 opacity-20"></div>
      <div className="relative z-10">
        <Navbar />
        <PartnersHero />
        <PartnersProgram />
        <PartnersShowcase />
        <PartnersTestimonials />
        <PartnersCta />
        <Footer />
      </div>
    </main>
  )
}
