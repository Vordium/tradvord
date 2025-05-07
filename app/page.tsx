import Hero from "@/components/hero"
import Navbar from "@/components/navbar"
import Features from "@/components/features"
import Trading from "@/components/trading"
import Testimonials from "@/components/testimonials"
import Cta from "@/components/cta"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern bg-black z-0 opacity-20"></div>
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <Features />
        <Trading />
        <Testimonials />
        <Cta />
        <Footer />
      </div>
    </main>
  )
}
