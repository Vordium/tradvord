"use client"

import type React from "react"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowUpRight, Clock, DollarSign, ShieldCheck, Users, Zap, Info } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function ReputationFactors() {
  const [activeTab, setActiveTab] = useState("on-chain")

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Reputation Factors</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Your reputation score is calculated based on multiple factors across three key categories. Understand what
              impacts your score and how to improve it.
            </p>
          </div>

          <Tabs defaultValue="on-chain" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3 mb-8 bg-gray-900/50 border border-purple-500/20 rounded-lg overflow-hidden">
              <TabsTrigger
                value="on-chain"
                className={`py-3 ${activeTab === "on-chain" ? "bg-gradient-to-r from-purple-600/20 to-pink-600/20 text-white" : "text-gray-400"}`}
              >
                On-Chain Activity
              </TabsTrigger>
              <TabsTrigger
                value="trading"
                className={`py-3 ${activeTab === "trading" ? "bg-gradient-to-r from-purple-600/20 to-pink-600/20 text-white" : "text-gray-400"}`}
              >
                Trading Behavior
              </TabsTrigger>
              <TabsTrigger
                value="social"
                className={`py-3 ${activeTab === "social" ? "bg-gradient-to-r from-purple-600/20 to-pink-600/20 text-white" : "text-gray-400"}`}
              >
                Social & Engagement
              </TabsTrigger>
            </TabsList>

            <TabsContent value="on-chain" className="mt-0">
              <div className="bg-gradient-to-br from-gray-900 to-black border border-purple-500/20 rounded-2xl p-8 shadow-glow-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FactorCard
                    icon={<Clock className="h-5 w-5 text-purple-400" />}
                    title="Wallet Age"
                    score={85}
                    description="Older wallets with consistent activity receive higher scores."
                    details="Your wallet has been active for 2.5 years, showing consistent activity."
                    impact="High"
                  />

                  <FactorCard
                    icon={<DollarSign className="h-5 w-5 text-purple-400" />}
                    title="Transaction History"
                    score={72}
                    description="Regular, legitimate transactions improve your score."
                    details="You have 342 transactions across multiple chains with no suspicious patterns."
                    impact="High"
                  />

                  <FactorCard
                    icon={<ShieldCheck className="h-5 w-5 text-purple-400" />}
                    title="Security Practices"
                    score={68}
                    description="Using hardware wallets and security features boosts your score."
                    details="We've detected hardware wallet usage and no security incidents."
                    impact="Medium"
                  />

                  <FactorCard
                    icon={<Zap className="h-5 w-5 text-purple-400" />}
                    title="Contract Interactions"
                    score={78}
                    description="Interacting with verified, secure contracts improves your score."
                    details="You've interacted with 56 verified contracts and 3 unverified ones."
                    impact="Medium"
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="trading" className="mt-0">
              <div className="bg-gradient-to-br from-gray-900 to-black border border-purple-500/20 rounded-2xl p-8 shadow-glow-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FactorCard
                    icon={<ArrowUpRight className="h-5 w-5 text-purple-400" />}
                    title="Trading Volume"
                    score={81}
                    description="Consistent trading volume shows platform engagement."
                    details="Your 30-day trading volume is $12,450, placing you in the top 15% of users."
                    impact="Medium"
                  />

                  <FactorCard
                    icon={<Clock className="h-5 w-5 text-purple-400" />}
                    title="Trading Frequency"
                    score={75}
                    description="Regular trading activity improves your reputation."
                    details="You trade approximately 3.5 times per week, showing consistent engagement."
                    impact="Low"
                  />

                  <FactorCard
                    icon={<ShieldCheck className="h-5 w-5 text-purple-400" />}
                    title="Risk Management"
                    score={62}
                    description="Using stop losses and taking reasonable risks improves score."
                    details="You use stop losses on 65% of trades, which is above average."
                    impact="High"
                  />

                  <FactorCard
                    icon={<DollarSign className="h-5 w-5 text-purple-400" />}
                    title="Profit/Loss Ratio"
                    score={70}
                    description="Consistent profitability indicates trading skill."
                    details="Your win rate is 58% with an average profit/loss ratio of 1.3."
                    impact="Medium"
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="social" className="mt-0">
              <div className="bg-gradient-to-br from-gray-900 to-black border border-purple-500/20 rounded-2xl p-8 shadow-glow-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FactorCard
                    icon={<Users className="h-5 w-5 text-purple-400" />}
                    title="Followers"
                    score={65}
                    description="Having followers indicates community trust."
                    details="You have 28 followers on the platform, placing you in the top 30%."
                    impact="Low"
                  />

                  <FactorCard
                    icon={<Users className="h-5 w-5 text-purple-400" />}
                    title="Copy Trading"
                    score={58}
                    description="Being copied by others shows trading credibility."
                    details="7 users are currently copying your trades with a total allocation of $4,200."
                    impact="Medium"
                  />

                  <FactorCard
                    icon={<ShieldCheck className="h-5 w-5 text-purple-400" />}
                    title="Verification Level"
                    score={90}
                    description="Completing identity verification improves trust."
                    details="You've completed advanced verification with KYC and 2FA enabled."
                    impact="High"
                  />

                  <FactorCard
                    icon={<Clock className="h-5 w-5 text-purple-400" />}
                    title="Platform Engagement"
                    score={72}
                    description="Regular platform usage shows commitment."
                    details="You log in approximately 5 times per week and engage with multiple features."
                    impact="Low"
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  )
}

interface FactorCardProps {
  icon: React.ReactNode
  title: string
  score: number
  description: string
  details: string
  impact: "Low" | "Medium" | "High"
}

function FactorCard({ icon, title, score, description, details, impact }: FactorCardProps) {
  // Get color based on score
  const getScoreColor = () => {
    if (score >= 80) return "text-green-400"
    if (score >= 70) return "text-blue-400"
    if (score >= 60) return "text-yellow-400"
    if (score >= 50) return "text-orange-400"
    return "text-red-400"
  }

  // Get impact color
  const getImpactColor = () => {
    if (impact === "High") return "bg-red-500/20 text-red-400"
    if (impact === "Medium") return "bg-yellow-500/20 text-yellow-400"
    return "bg-blue-500/20 text-blue-400"
  }

  return (
    <div className="bg-gray-800/50 rounded-lg p-6 border border-purple-500/10 hover:border-purple-500/30 transition-all">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center">
          <div className="mr-3 p-2 bg-purple-500/10 rounded-lg">{icon}</div>
          <h3 className="text-lg font-medium">{title}</h3>
        </div>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button className="text-gray-400 hover:text-white">
                <Info className="h-4 w-4" />
              </button>
            </TooltipTrigger>
            <TooltipContent className="max-w-xs">
              <p>{description}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className="flex items-center mb-4">
        <div className="w-12 h-12 rounded-full border-2 border-gray-700 flex items-center justify-center mr-4">
          <span className={`text-lg font-bold ${getScoreColor()}`}>{score}</span>
        </div>
        <div className="flex-1">
          <div className="h-2 w-full bg-gray-700 rounded-full overflow-hidden">
            <div
              className={`h-full ${score >= 80 ? "bg-green-400" : score >= 70 ? "bg-blue-400" : score >= 60 ? "bg-yellow-400" : score >= 50 ? "bg-orange-400" : "bg-red-400"}`}
              style={{ width: `${score}%` }}
            ></div>
          </div>
        </div>
      </div>

      <p className="text-gray-300 text-sm mb-4">{details}</p>

      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <span className="text-sm text-gray-400 mr-2">Impact:</span>
          <span className={`text-xs px-2 py-1 rounded-full ${getImpactColor()}`}>{impact}</span>
        </div>
        <button className="text-sm text-purple-400 hover:text-purple-300">Improve</button>
      </div>
    </div>
  )
}
