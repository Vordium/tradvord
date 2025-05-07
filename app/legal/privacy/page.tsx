import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import PrivacyPolicy from "@/components/privacy-policy"

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern bg-black z-0 opacity-20"></div>
      <div className="relative z-10">
        <Navbar />
        <PrivacyPolicy />
        <Footer />
      </div>
    </main>
  )
}
