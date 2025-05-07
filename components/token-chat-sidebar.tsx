"use client"

import { useState, useEffect } from "react"
import { Search, TrendingUp, Star, Clock, Settings } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Token data with logos
const tokens = [
  {
    id: "bitcoin",
    name: "Bitcoin",
    symbol: "BTC",
    logo: "https://assets.coingecko.com/coins/images/1/small/bitcoin.png",
    price: 67432.51,
    change: 2.34,
    members: 1243,
    messages: 324,
  },
  {
    id: "ethereum",
    name: "Ethereum",
    symbol: "ETH",
    logo: "https://assets.coingecko.com/coins/images/279/small/ethereum.png",
    price: 3521.87,
    change: -0.78,
    members: 982,
    messages: 256,
  },
  {
    id: "solana",
    name: "Solana",
    symbol: "SOL",
    logo: "https://assets.coingecko.com/coins/images/4128/small/solana.png",
    price: 142.63,
    change: 5.21,
    members: 754,
    messages: 198,
  },
  {
    id: "cardano",
    name: "Cardano",
    symbol: "ADA",
    logo: "https://assets.coingecko.com/coins/images/975/small/cardano.png",
    price: 0.45,
    change: 1.23,
    members: 521,
    messages: 87,
  },
  {
    id: "binancecoin",
    name: "BNB",
    symbol: "BNB",
    logo: "https://assets.coingecko.com/coins/images/825/small/bnb-icon2_2x.png",
    price: 562.34,
    change: 0.45,
    members: 612,
    messages: 143,
  },
  {
    id: "ripple",
    name: "XRP",
    symbol: "XRP",
    logo: "https://assets.coingecko.com/coins/images/44/small/xrp-symbol-white-128.png",
    price: 0.51,
    change: -1.24,
    members: 432,
    messages: 76,
  },
  {
    id: "polkadot",
    name: "Polkadot",
    symbol: "DOT",
    logo: "https://assets.coingecko.com/coins/images/12171/small/polkadot.png",
    price: 6.32,
    change: 3.45,
    members: 387,
    messages: 65,
  },
  {
    id: "dogecoin",
    name: "Dogecoin",
    symbol: "DOGE",
    logo: "https://assets.coingecko.com/coins/images/5/small/dogecoin.png",
    price: 0.12,
    change: 7.89,
    members: 876,
    messages: 234,
  },
  {
    id: "avalanche-2",
    name: "Avalanche",
    symbol: "AVAX",
    logo: "https://assets.coingecko.com/coins/images/12559/small/Avalanche_Circle_RedWhite_Trans.png",
    price: 34.21,
    change: 2.67,
    members: 298,
    messages: 54,
  },
  {
    id: "chainlink",
    name: "Chainlink",
    symbol: "LINK",
    logo: "https://assets.coingecko.com/coins/images/877/small/chainlink-new-logo.png",
    price: 13.76,
    change: 4.32,
    members: 342,
    messages: 87,
  },
]

export default function TokenChatSidebar() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("trending")
  const [filteredTokens, setFilteredTokens] = useState(tokens)

  // Filter tokens based on search term
  useEffect(() => {
    if (searchTerm === "") {
      // If no search term, filter based on active tab
      switch (activeTab) {
        case "trending":
          setFilteredTokens([...tokens].sort((a, b) => b.messages - a.messages))
          break
        case "favorites":
          // In a real app, this would filter to user's favorites
          setFilteredTokens(tokens.filter((_, index) => index % 3 === 0))
          break
        case "recent":
          // In a real app, this would show recently visited
          setFilteredTokens([...tokens].sort((a, b) => b.members - a.members))
          break
        default:
          setFilteredTokens(tokens)
      }
    } else {
      // Filter based on search term
      const filtered = tokens.filter(
        (token) =>
          token.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          token.symbol.toLowerCase().includes(searchTerm.toLowerCase()),
      )
      setFilteredTokens(filtered)
    }
  }, [searchTerm, activeTab])

  return (
    <div className="bg-black/40 backdrop-blur-sm border border-purple-500/20 rounded-xl p-4 h-[calc(100vh-220px)] flex flex-col">
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          placeholder="Search tokens..."
          className="pl-9"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <Tabs defaultValue="trending" className="mb-4" onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 mb-2">
          <TabsTrigger value="trending" className="text-xs">
            <TrendingUp className="h-3 w-3 mr-1" />
            Trending
          </TabsTrigger>
          <TabsTrigger value="favorites" className="text-xs">
            <Star className="h-3 w-3 mr-1" />
            Favorites
          </TabsTrigger>
          <TabsTrigger value="recent" className="text-xs">
            <Clock className="h-3 w-3 mr-1" />
            Recent
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="overflow-y-auto flex-grow">
        {filteredTokens.map((token) => (
          <button
            key={token.id}
            className="w-full flex items-center p-3 hover:bg-purple-900/20 rounded-lg mb-1 transition-colors group"
            onClick={() => {
              // In a real app, this would select the token chat
              window.dispatchEvent(new CustomEvent("selectTokenChat", { detail: token }))
            }}
          >
            <img src={token.logo || "/placeholder.svg"} alt={token.name} className="w-8 h-8 rounded-full mr-3" />
            <div className="flex-1 text-left">
              <div className="flex justify-between items-center">
                <span className="font-medium text-white">{token.symbol}</span>
                <span className={`text-xs ${token.change >= 0 ? "text-green-400" : "text-red-400"}`}>
                  {token.change >= 0 ? "+" : ""}
                  {token.change}%
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-400">{token.name}</span>
                <span className="text-xs text-gray-400">{token.members} online</span>
              </div>
            </div>
          </button>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-gray-800">
        <Button variant="outline" size="sm" className="w-full flex items-center justify-center">
          <Settings className="h-4 w-4 mr-2" />
          Chat Settings
        </Button>
      </div>
    </div>
  )
}
