"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Wallet, Shield, Award, TrendingUp, AlertTriangle } from "lucide-react"
import WalletConnect from "@/components/wallet-connect"

export default function ReputationScore() {
  const [score, setScore] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [walletConnected, setWalletConnected] = useState(false)
  const [level, setLevel] = useState("")
  const [levelColor, setLevelColor] = useState("")

  // Simulate wallet connection check
  useEffect(() => {
    // Check if wallet is connected (this would normally check the actual wallet state)
    const checkWalletConnection = () => {
      try {
        // For demo purposes, we'll check localStorage
        const connected = localStorage.getItem("walletConnected") === "true"
        setWalletConnected(connected)

        if (connected) {
          calculateReputationScore()
        }
      } catch (error) {
        console.error("Error checking wallet connection:", error)
        setWalletConnected(false)
      }
    }

    checkWalletConnection()

    // Listen for wallet connection events
    const handleWalletConnection = (event: any) => {
      try {
        if (event.detail?.connected !== undefined) {
          setWalletConnected(event.detail.connected)
          localStorage.setItem("walletConnected", String(event.detail.connected))

          if (event.detail.connected) {
            calculateReputationScore()
          } else {
            setScore(null)
          }
        }
      } catch (error) {
        console.error("Error handling wallet connection event:", error)
      }
    }

    window.addEventListener("walletConnectionChanged", handleWalletConnection)

    return () => {
      window.removeEventListener("walletConnectionChanged", handleWalletConnection)
    }
  }, [])

  // Calculate reputation score
  const calculateReputationScore = () => {
    setIsLoading(true)

    // Simulate API call to calculate reputation score
    setTimeout(() => {
      // Generate a random score between 350 and 850 for demo purposes
      const calculatedScore = Math.floor(Math.random() * (850 - 350 + 1)) + 350
      setScore(calculatedScore)

      // Set level based on score
      if (calculatedScore >= 750) {
        setLevel("Excellent")
        setLevelColor("text-green-400")
      } else if (calculatedScore >= 650) {
        setLevel("Good")
        setLevelColor("text-blue-400")
      } else if (calculatedScore >= 550) {
        setLevel("Fair")
        setLevelColor("text-yellow-400")
      } else if (calculatedScore >= 450) {
        setLevel("Needs Improvement")
        setLevelColor("text-orange-400")
      } else {
        setLevel("Poor")
        setLevelColor("text-red-400")
      }

      setIsLoading(false)
    }, 1500)
  }

  // Get progress color based on score
  const getProgressColor = () => {
    if (!score) return "bg-gray-600"

    if (score >= 750) return "bg-gradient-to-r from-green-500 to-green-400"
    if (score >= 650) return "bg-gradient-to-r from-blue-500 to-blue-400"
    if (score >= 550) return "bg-gradient-to-r from-yellow-500 to-yellow-400"
    if (score >= 450) return "bg-gradient-to-r from-orange-500 to-orange-400"
    return "bg-gradient-to-r from-red-500 to-red-400"
  }

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-gray-900 to-black border border-purple-500/20 rounded-2xl p-8 shadow-glow-lg">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Your Wallet Reputation</h2>

            {!walletConnected ? (
              <div className="text-center py-8">
                <div className="mb-6">
                  <Wallet className="h-16 w-16 mx-auto text-purple-400 mb-4" />
                  <p className="text-gray-300 mb-6">Connect your wallet to view your reputation score</p>
                </div>
                <div className="max-w-xs mx-auto">
                  <WalletConnect />
                </div>
              </div>
            ) : (
              <div>
                {isLoading ? (
                  <div className="flex flex-col items-center justify-center py-12">
                    <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                    <p className="text-gray-300">Calculating your reputation score...</p>
                  </div>
                ) : (
                  <div>
                    {score !== null ? (
                      <div className="flex flex-col md:flex-row gap-8 items-center">
                        <div className="relative w-48 h-48 flex-shrink-0">
                          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 border border-purple-500/20 shadow-glow-md flex items-center justify-center">
                            <div className="text-center">
                              <div className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                                {score}
                              </div>
                              <div className={`text-lg font-medium mt-1 ${levelColor}`}>{level}</div>
                            </div>
                          </div>
                        </div>

                        <div className="flex-1">
                          <div className="mb-6">
                            <div className="flex justify-between mb-2 text-sm">
                              <span className="text-red-400">Poor</span>
                              <span className="text-orange-400">Fair</span>
                              <span className="text-yellow-400">Good</span>
                              <span className="text-blue-400">Great</span>
                              <span className="text-green-400">Excellent</span>
                            </div>
                            <div className="h-2 w-full bg-gray-800 rounded-full overflow-hidden">
                              <div
                                className={`h-full ${getProgressColor()}`}
                                style={{ width: `${(score - 350) / 5}%` }}
                              ></div>
                            </div>
                            <div className="flex justify-between mt-1 text-xs text-gray-500">
                              <span>350</span>
                              <span>850</span>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div className="bg-gray-800/50 rounded-lg p-4 border border-purple-500/10">
                              <div className="flex items-center mb-2">
                                <Shield className="h-4 w-4 text-purple-400 mr-2" />
                                <span className="text-sm font-medium">Trust Level</span>
                              </div>
                              <div className={`text-lg font-semibold ${levelColor}`}>{level}</div>
                            </div>

                            <div className="bg-gray-800/50 rounded-lg p-4 border border-purple-500/10">
                              <div className="flex items-center mb-2">
                                <Award className="h-4 w-4 text-purple-400 mr-2" />
                                <span className="text-sm font-medium">Rank</span>
                              </div>
                              <div className="text-lg font-semibold">Top {Math.floor((850 - score) / 5)}%</div>
                            </div>

                            <div className="bg-gray-800/50 rounded-lg p-4 border border-purple-500/10">
                              <div className="flex items-center mb-2">
                                <TrendingUp className="h-4 w-4 text-purple-400 mr-2" />
                                <span className="text-sm font-medium">Trend</span>
                              </div>
                              <div className="text-lg font-semibold text-green-400">+12 pts (30d)</div>
                            </div>

                            <div className="bg-gray-800/50 rounded-lg p-4 border border-purple-500/10">
                              <div className="flex items-center mb-2">
                                <AlertTriangle className="h-4 w-4 text-purple-400 mr-2" />
                                <span className="text-sm font-medium">Risk Level</span>
                              </div>
                              <div className="text-lg font-semibold text-yellow-400">Medium</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-gray-300 mb-4">Unable to calculate reputation score</p>
                        <Button
                          onClick={calculateReputationScore}
                          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                        >
                          Try Again
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
