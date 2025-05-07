import type { Metadata } from "next"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import AboutHero from "@/components/about-hero"
import AboutMission from "@/components/about-mission"
import AboutTeam from "@/components/about-team"
import AboutHistory from "@/components/about-history"
import AboutInvestors from "@/components/about-investors"

export const metadata: Metadata = {
  title: "About | Trady",
  description: "Learn about Trady's mission, team, and history.",
}

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="flex flex-col min-h-screen">
        <AboutHero />
        <AboutMission />
        <AboutTeam />
        <AboutHistory />
        <AboutInvestors />
      </main>
      <Footer />
    </>
  )
}
