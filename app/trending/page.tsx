import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import TrendingHero from "@/components/trending-hero"
import TrendingCoins from "@/components/trending-coins"
import TrendingList from "@/components/trending-list"

export default function TrendingPage() {
  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern bg-black z-0 opacity-20"></div>
      <div className="relative z-10">
        <Navbar />
        <TrendingHero />
        <TrendingCoins />
        <div id="trending-list">
          <TrendingList />
        </div>
        <Footer />
      </div>
    </main>
  )
}
