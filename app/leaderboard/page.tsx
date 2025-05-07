import type { Metadata } from "next"
import LeaderboardHero from "@/components/leaderboard-hero"
import LeaderboardTable from "@/components/leaderboard-table"
import LeaderboardStats from "@/components/leaderboard-stats"
import LeaderboardFilters from "@/components/leaderboard-filters"

export const metadata: Metadata = {
  title: "Trader Leaderboard | Trady",
  description: "Discover and follow the top-performing crypto traders on Trady's leaderboard.",
}

export default function LeaderboardPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <LeaderboardHero />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <LeaderboardStats />
        </div>
        <div className="mb-8">
          <LeaderboardFilters />
        </div>
        <LeaderboardTable />
      </div>
    </main>
  )
}
