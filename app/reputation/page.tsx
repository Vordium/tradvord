import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import ReputationHero from "@/components/reputation-hero"
import ReputationScore from "@/components/reputation-score"
import ReputationFactors from "@/components/reputation-factors"
import ReputationHistory from "@/components/reputation-history"
import ReputationBenefits from "@/components/reputation-benefits"
import ReputationVerification from "@/components/reputation-verification"

export default function ReputationPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="absolute inset-0 bg-black z-0 opacity-20 bg-[linear-gradient(to_right,#333_1px,transparent_1px),linear-gradient(to_bottom,#333_1px,transparent_1px)] bg-[size:20px_20px]"></div>
      <div className="relative z-10">
        <Navbar />
        <div className="pt-20">
          <ReputationHero />
          <ReputationScore />
          <ReputationFactors />
          <ReputationHistory />
          <ReputationBenefits />
          <ReputationVerification />
        </div>
        <Footer />
      </div>
    </main>
  )
}
