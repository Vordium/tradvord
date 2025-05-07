import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import SwapHero from "@/components/swap-hero"
import SwapInterface from "@/components/swap-interface"
import SwapChart from "@/components/swap-chart"
import SwapHistory from "@/components/swap-history"

export default function SwapPage() {
  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern bg-black z-0 opacity-20"></div>
      <div className="relative z-10">
        <Navbar />
        <SwapHero />
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 order-2 lg:order-1">
              <SwapInterface />
              <div className="mt-8">
                <SwapHistory />
              </div>
            </div>
            <div className="lg:col-span-2 order-1 lg:order-2">
              <SwapChart />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </main>
  )
}
