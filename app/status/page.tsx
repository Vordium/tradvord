import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import StatusHero from "@/components/status-hero"
import StatusDashboard from "@/components/status-dashboard"
import StatusIncidents from "@/components/status-incidents"

export default function StatusPage() {
  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern bg-black z-0 opacity-20"></div>
      <div className="relative z-10">
        <Navbar />
        <StatusHero />
        <StatusDashboard />
        <StatusIncidents />
        <Footer />
      </div>
    </main>
  )
}
