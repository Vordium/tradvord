import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import GuidesHero from "@/components/guides-hero"
import GuidesList from "@/components/guides-list"

export default function GuidesPage() {
  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern bg-black z-0 opacity-20"></div>
      <div className="relative z-10">
        <Navbar />
        <GuidesHero />
        <GuidesList />
        <Footer />
      </div>
    </main>
  )
}
