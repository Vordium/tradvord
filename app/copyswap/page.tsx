import CopyswapHero from "@/components/copyswap-hero"
import CopyswapTraders from "@/components/copyswap-traders"
import CopyswapHowItWorks from "@/components/copyswap-how-it-works"
import CopyswapSettings from "@/components/copyswap-settings"
import CopyswapPerformance from "@/components/copyswap-performance"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export const metadata = {
  title: "CopySwap | Trady",
  description: "Copy the trades of successful crypto traders automatically",
}

export default function CopyswapPage() {
  return (
    <>
      <Navbar />
      <main className="flex flex-col min-h-screen bg-gradient-to-b from-black via-gray-900 to-black pt-20">
        <CopyswapHero />
        <CopyswapTraders />
        <CopyswapPerformance />
        <CopyswapHowItWorks />
        <CopyswapSettings />
      </main>
      <Footer />
    </>
  )
}
