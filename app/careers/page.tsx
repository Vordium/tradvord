import type { Metadata } from "next"
import CareersHero from "@/components/careers-hero"
import CareersValues from "@/components/careers-values"
import CareersBenefits from "@/components/careers-benefits"
import CareersOpenings from "@/components/careers-openings"
import CareersCta from "@/components/careers-cta"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export const metadata: Metadata = {
  title: "Careers | Copto",
  description: "Join our team and help build the future of decentralized finance.",
}

export default function CareersPage() {
  return (
    <>
      <Navbar />
      <main className="flex flex-col min-h-screen">
        <CareersHero />
        <CareersValues />
        <CareersBenefits />
        <CareersOpenings />
        <CareersCta />
      </main>
      <Footer />
    </>
  )
}
