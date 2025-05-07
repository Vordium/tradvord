"use client"

import { useState } from "react"
import { Search, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

export default function LeaderboardFilters() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTimeFrame, setSelectedTimeFrame] = useState("30d")
  const [selectedRiskLevel, setSelectedRiskLevel] = useState<string[]>([])
  const [selectedTradingStyles, setSelectedTradingStyles] = useState<string[]>([])
  const [sortBy, setSortBy] = useState("roi")

  const timeFrames = [
    { value: "7d", label: "7 Days" },
    { value: "30d", label: "30 Days" },
    { value: "90d", label: "90 Days" },
    { value: "1y", label: "1 Year" },
    { value: "all", label: "All Time" },
  ]

  const riskLevels = [
    { value: "low", label: "Low Risk", color: "bg-green-500" },
    { value: "medium", label: "Medium Risk", color: "bg-yellow-500" },
    { value: "high", label: "High Risk", color: "bg-red-500" },
  ]

  const tradingStyles = [
    { value: "spot", label: "Spot Trading" },
    { value: "futures", label: "Futures" },
    { value: "options", label: "Options" },
    { value: "defi", label: "DeFi" },
    { value: "arbitrage", label: "Arbitrage" },
    { value: "swing", label: "Swing Trading" },
    { value: "scalping", label: "Scalping" },
  ]

  const sortOptions = [
    { value: "roi", label: "ROI" },
    { value: "win_rate", label: "Win Rate" },
    { value: "followers", label: "Followers" },
    { value: "profit", label: "Total Profit" },
    { value: "trades", label: "Trade Volume" },
  ]

  const toggleRiskLevel = (value: string) => {
    setSelectedRiskLevel((prev) => (prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]))
  }

  const toggleTradingStyle = (value: string) => {
    setSelectedTradingStyles((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value],
    )
  }

  const clearAllFilters = () => {
    setSearchQuery("")
    setSelectedTimeFrame("30d")
    setSelectedRiskLevel([])
    setSelectedTradingStyles([])
    setSortBy("roi")
  }

  return (
    <div className="mb-6 space-y-4 rounded-xl bg-gray-800/30 p-6 backdrop-blur-sm">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <h2 className="text-xl font-bold text-white">Trader Rankings</h2>
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Search traders by name or wallet..."
            className="border-gray-700 bg-gray-800 pl-10 text-white placeholder:text-gray-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        {/* Time Frame Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="border-gray-700 bg-gray-800 text-white hover:bg-gray-700">
              {timeFrames.find((t) => t.value === selectedTimeFrame)?.label || "Time Frame"}
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="border-gray-700 bg-gray-800 text-white">
            <DropdownMenuLabel>Time Frame</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-gray-700" />
            <DropdownMenuGroup>
              {timeFrames.map((timeFrame) => (
                <DropdownMenuItem
                  key={timeFrame.value}
                  className={`cursor-pointer ${
                    selectedTimeFrame === timeFrame.value ? "bg-purple-900/50" : ""
                  } hover:bg-gray-700`}
                  onClick={() => setSelectedTimeFrame(timeFrame.value)}
                >
                  {timeFrame.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Risk Level Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="border-gray-700 bg-gray-800 text-white hover:bg-gray-700">
              Risk Level
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="border-gray-700 bg-gray-800 text-white">
            <DropdownMenuLabel>Risk Level</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-gray-700" />
            <DropdownMenuGroup>
              {riskLevels.map((risk) => (
                <DropdownMenuItem
                  key={risk.value}
                  className={`cursor-pointer ${
                    selectedRiskLevel.includes(risk.value) ? "bg-purple-900/50" : ""
                  } hover:bg-gray-700`}
                  onClick={() => toggleRiskLevel(risk.value)}
                >
                  <div className="flex items-center">
                    <div className={`mr-2 h-3 w-3 rounded-full ${risk.color}`}></div>
                    {risk.label}
                  </div>
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Trading Style Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="border-gray-700 bg-gray-800 text-white hover:bg-gray-700">
              Trading Style
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="border-gray-700 bg-gray-800 text-white">
            <DropdownMenuLabel>Trading Style</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-gray-700" />
            <DropdownMenuGroup>
              {tradingStyles.map((style) => (
                <DropdownMenuItem
                  key={style.value}
                  className={`cursor-pointer ${
                    selectedTradingStyles.includes(style.value) ? "bg-purple-900/50" : ""
                  } hover:bg-gray-700`}
                  onClick={() => toggleTradingStyle(style.value)}
                >
                  {style.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Sort By Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="border-gray-700 bg-gray-800 text-white hover:bg-gray-700">
              Sort By: {sortOptions.find((s) => s.value === sortBy)?.label}
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="border-gray-700 bg-gray-800 text-white">
            <DropdownMenuLabel>Sort By</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-gray-700" />
            <DropdownMenuGroup>
              {sortOptions.map((option) => (
                <DropdownMenuItem
                  key={option.value}
                  className={`cursor-pointer ${sortBy === option.value ? "bg-purple-900/50" : ""} hover:bg-gray-700`}
                  onClick={() => setSortBy(option.value)}
                >
                  {option.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Clear Filters Button */}
        <Button variant="ghost" className="text-gray-400 hover:bg-gray-800 hover:text-white" onClick={clearAllFilters}>
          Clear Filters
        </Button>
      </div>

      {/* Active Filters */}
      {(selectedRiskLevel.length > 0 || selectedTradingStyles.length > 0) && (
        <div className="flex flex-wrap gap-2">
          {selectedRiskLevel.map((risk) => (
            <Badge
              key={risk}
              variant="outline"
              className="flex items-center gap-1 border-purple-500 bg-purple-900/20 text-purple-300"
            >
              {riskLevels.find((r) => r.value === risk)?.label}
              <button className="ml-1 rounded-full p-0.5 hover:bg-purple-800" onClick={() => toggleRiskLevel(risk)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>
            </Badge>
          ))}

          {selectedTradingStyles.map((style) => (
            <Badge
              key={style}
              variant="outline"
              className="flex items-center gap-1 border-pink-500 bg-pink-900/20 text-pink-300"
            >
              {tradingStyles.find((s) => s.value === style)?.label}
              <button className="ml-1 rounded-full p-0.5 hover:bg-pink-800" onClick={() => toggleTradingStyle(style)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  )
}
