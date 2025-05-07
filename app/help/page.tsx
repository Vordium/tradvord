import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import HelpHero from "@/components/help-hero"
import HelpCategories from "@/components/help-categories"
import HelpFaq from "@/components/help-faq"
import HelpContact from "@/components/help-contact"

export default function HelpPage() {
  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern bg-black z-0 opacity-20"></div>
      <div className="relative z-10">
        <Navbar />
        <HelpHero />
        <HelpCategories />
        <HelpFaq />
        <HelpContact />
        <Footer />
      </div>
    </main>
  )
}
