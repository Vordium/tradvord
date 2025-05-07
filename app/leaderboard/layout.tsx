import type React from "react"
import type { Metadata } from "next"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export const metadata: Metadata = {
  title: "Trader Leaderboard | Trady",
  description: "Discover and follow the top-performing crypto traders on Trady's leaderboard.",
}

export default function LeaderboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  )
}
