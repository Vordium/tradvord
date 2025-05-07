"use client"

import { useState, useEffect, useRef } from "react"
import { Send, ThumbsUp, Flag, Share2, TrendingUp, TrendingDown, BarChart2, AlertTriangle } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge" // Fixed import - was incorrectly importing from button
import { motion, AnimatePresence } from "framer-motion"

// Default token
const defaultToken = {
  id: "bitcoin",
  name: "Bitcoin",
  symbol: "BTC",
  logo: "https://assets.coingecko.com/coins/images/1/small/bitcoin.png",
  price: 67432.51,
  change: 2.34,
  members: 1243,
  messages: 324,
}

// Sample users
const users = [
  { id: 1, name: "CryptoWhale", avatar: "/crypto-trader-avatar.png", reputation: 92, verified: true },
  { id: 2, name: "SatoshiFan", avatar: "/crypto-trader-avatar-2.png", reputation: 87, verified: false },
  { id: 3, name: "BlockchainDev", avatar: "/crypto-trader-avatar-3.png", reputation: 95, verified: true },
  { id: 4, name: "TokenTrader", avatar: "/crypto-trader-avatar-4.png", reputation: 78, verified: false },
  { id: 5, name: "HODLer", avatar: "/crypto-trader-avatar-5.png", reputation: 82, verified: true },
  { id: 6, name: "MoonBoy", avatar: "/diverse-avatars.png", reputation: 65, verified: false },
  { id: 7, name: "ChartMaster", avatar: "/crypto-avatar.png", reputation: 89, verified: true },
  { id: 8, name: "DeFiGuru", avatar: "/crypto-avatar.png", reputation: 91, verified: true },
]

// Sample messages
const generateMessages = (tokenSymbol) => {
  const baseMessages = [
    {
      id: 1,
      userId: 1,
      text: `${tokenSymbol} looking bullish on the 4h chart. Clear breakout pattern forming.`,
      timestamp: new Date(Date.now() - 1000 * 60 * 2),
      likes: 24,
      sentiment: "bullish",
      liked: false,
    },
    {
      id: 2,
      userId: 3,
      text: `Just saw some whale movement. 500 ${tokenSymbol} moved from Binance to cold storage.`,
      timestamp: new Date(Date.now() - 1000 * 60 * 5),
      likes: 18,
      sentiment: "neutral",
      liked: false,
    },
    {
      id: 3,
      userId: 5,
      text: `HODL strong! ${tokenSymbol} fundamentals haven't changed.`,
      timestamp: new Date(Date.now() - 1000 * 60 * 8),
      likes: 32,
      sentiment: "bullish",
      liked: true,
    },
    {
      id: 4,
      userId: 2,
      text: `Anyone else concerned about the resistance at $${Math.floor(Math.random() * 1000)}? Seems like we keep getting rejected.`,
      timestamp: new Date(Date.now() - 1000 * 60 * 15),
      likes: 7,
      sentiment: "bearish",
      liked: false,
    },
    {
      id: 5,
      userId: 4,
      text: `New partnership announcement coming soon for ${tokenSymbol}? Seeing rumors on Twitter.`,
      timestamp: new Date(Date.now() - 1000 * 60 * 22),
      likes: 41,
      sentiment: "bullish",
      liked: false,
    },
    {
      id: 6,
      userId: 7,
      text: `RSI showing overbought conditions on ${tokenSymbol}. Might take some profits here.`,
      timestamp: new Date(Date.now() - 1000 * 60 * 35),
      likes: 15,
      sentiment: "bearish",
      liked: false,
    },
    {
      id: 7,
      userId: 8,
      text: `The ${tokenSymbol} integration with DeFi protocols is undervalued. This will be huge for adoption.`,
      timestamp: new Date(Date.now() - 1000 * 60 * 48),
      likes: 29,
      sentiment: "bullish",
      liked: false,
    },
    {
      id: 8,
      userId: 6,
      text: `${tokenSymbol} to the moon! 🚀🚀🚀`,
      timestamp: new Date(Date.now() - 1000 * 60 * 55),
      likes: 11,
      sentiment: "bullish",
      liked: false,
    },
  ]

  // Add some token-specific messages
  if (tokenSymbol === "BTC") {
    baseMessages.push({
      id: 9,
      userId: 3,
      text: "Bitcoin halving approaching. Historically bullish for price action.",
      timestamp: new Date(Date.now() - 1000 * 60 * 12),
      likes: 37,
      sentiment: "bullish",
      liked: false,
    })
  } else if (tokenSymbol === "ETH") {
    baseMessages.push({
      id: 9,
      userId: 8,
      text: "ETH 2.0 progress looking good. Staking rewards are solid passive income.",
      timestamp: new Date(Date.now() - 1000 * 60 * 18),
      likes: 26,
      sentiment: "bullish",
      liked: false,
    })
  } else if (tokenSymbol === "SOL") {
    baseMessages.push({
      id: 9,
      userId: 7,
      text: "Solana TPS still impressive despite recent network issues. Bullish long term.",
      timestamp: new Date(Date.now() - 1000 * 60 * 25),
      likes: 19,
      sentiment: "bullish",
      liked: false,
    })
  }

  return baseMessages.sort((a, b) => b.timestamp - a.timestamp)
}

// Format timestamp
const formatTimestamp = (timestamp) => {
  const now = new Date()
  const diff = now - timestamp

  if (diff < 1000 * 60) {
    return "Just now"
  } else if (diff < 1000 * 60 * 60) {
    const minutes = Math.floor(diff / (1000 * 60))
    return `${minutes}m ago`
  } else if (diff < 1000 * 60 * 60 * 24) {
    const hours = Math.floor(diff / (1000 * 60 * 60))
    return `${hours}h ago`
  } else {
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    return `${days}d ago`
  }
}

export default function TokenChatInterface() {
  const [selectedToken, setSelectedToken] = useState(defaultToken)
  const [messages, setMessages] = useState(generateMessages(defaultToken.symbol))
  const [messageText, setMessageText] = useState("")
  const [sentimentCounts, setSentimentCounts] = useState({ bullish: 0, bearish: 0, neutral: 0 })
  const messagesEndRef = useRef(null)

  // Listen for token selection from sidebar
  useEffect(() => {
    const handleTokenSelect = (event) => {
      if (event.detail) {
        setSelectedToken(event.detail)
        setMessages(generateMessages(event.detail.symbol))
      }
    }

    window.addEventListener("selectTokenChat", handleTokenSelect)
    return () => window.removeEventListener("selectTokenChat", handleTokenSelect)
  }, [])

  // Calculate sentiment counts
  useEffect(() => {
    const counts = messages.reduce(
      (acc, message) => {
        acc[message.sentiment] = (acc[message.sentiment] || 0) + 1
        return acc
      },
      { bullish: 0, bearish: 0, neutral: 0 },
    )

    setSentimentCounts(counts)
  }, [messages])

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Send a new message
  const sendMessage = () => {
    if (messageText.trim() === "") return

    const newMessage = {
      id: messages.length + 1,
      userId: 1, // Current user (CryptoWhale)
      text: messageText,
      timestamp: new Date(),
      likes: 0,
      sentiment: "neutral",
      liked: false,
    }

    setMessages([newMessage, ...messages])
    setMessageText("")
  }

  // Like a message
  const likeMessage = (messageId) => {
    setMessages(
      messages.map((message) => {
        if (message.id === messageId) {
          return {
            ...message,
            likes: message.liked ? message.likes - 1 : message.likes + 1,
            liked: !message.liked,
          }
        }
        return message
      }),
    )
  }

  // Get user by ID
  const getUserById = (userId) => {
    return users.find((user) => user.id === userId) || users[0]
  }

  // Calculate sentiment percentage
  const calculateSentimentPercentage = () => {
    const total = sentimentCounts.bullish + sentimentCounts.bearish + sentimentCounts.neutral
    if (total === 0) return 50

    return Math.round((sentimentCounts.bullish / total) * 100)
  }

  const sentimentPercentage = calculateSentimentPercentage()

  return (
    <div className="flex flex-col h-[calc(100vh-220px)]">
      {/* Token header */}
      <div className="bg-black/40 backdrop-blur-sm border border-purple-500/20 rounded-xl p-4 mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <img
              src={selectedToken.logo || "/placeholder.svg?height=40&width=40&query=crypto%20logo"}
              alt={selectedToken.name}
              className="w-10 h-10 rounded-full mr-3"
            />
            <div>
              <h2 className="text-xl font-bold text-white flex items-center">
                {selectedToken.name}
                <span className="text-gray-400 ml-2">{selectedToken.symbol}</span>
              </h2>
              <div className="flex items-center">
                <span className="text-lg font-medium">${selectedToken.price.toLocaleString()}</span>
                <span className={`ml-2 text-sm ${selectedToken.change >= 0 ? "text-green-400" : "text-red-400"}`}>
                  {selectedToken.change >= 0 ? "+" : ""}
                  {selectedToken.change}%
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-end">
            <div className="flex items-center mb-1">
              <span className="text-sm text-gray-400 mr-2">Community Sentiment:</span>
              <div className="w-32 h-2 bg-gray-700 rounded-full overflow-hidden">
                <div
                  className={`h-full ${
                    sentimentPercentage > 60
                      ? "bg-green-500"
                      : sentimentPercentage < 40
                        ? "bg-red-500"
                        : "bg-yellow-500"
                  }`}
                  style={{ width: `${sentimentPercentage}%` }}
                />
              </div>
            </div>
            <div className="flex items-center text-xs">
              <span className="flex items-center text-green-400 mr-3">
                <TrendingUp className="h-3 w-3 mr-1" />
                {sentimentCounts.bullish}
              </span>
              <span className="flex items-center text-red-400 mr-3">
                <TrendingDown className="h-3 w-3 mr-1" />
                {sentimentCounts.bearish}
              </span>
              <span className="flex items-center text-yellow-400">
                <BarChart2 className="h-3 w-3 mr-1" />
                {sentimentCounts.neutral}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Chat area */}
      <div className="flex-grow bg-black/40 backdrop-blur-sm border border-purple-500/20 rounded-xl p-4 mb-4 overflow-hidden flex flex-col">
        <Tabs defaultValue="chat" className="h-full flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <TabsList>
              <TabsTrigger value="chat">Chat</TabsTrigger>
              <TabsTrigger value="analysis">Analysis</TabsTrigger>
              <TabsTrigger value="news">News</TabsTrigger>
            </TabsList>

            <div className="text-sm text-gray-400">{selectedToken.members} members online</div>
          </div>

          <TabsContent value="chat" className="flex-grow overflow-hidden flex flex-col">
            <div className="flex-grow overflow-y-auto flex flex-col-reverse">
              <div ref={messagesEndRef} />
              <AnimatePresence>
                {messages.map((message) => {
                  const user = getUserById(message.userId)
                  return (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mb-4 last:mb-0"
                    >
                      <div className="flex">
                        <img
                          src={user.avatar || "/placeholder.svg?height=40&width=40&query=crypto%20avatar"}
                          alt={user.name}
                          className="w-10 h-10 rounded-full mr-3 flex-shrink-0"
                        />
                        <div className="flex-grow">
                          <div className="flex items-center mb-1">
                            <span className="font-medium text-white mr-2">{user.name}</span>
                            {user.verified && (
                              <Badge className="h-5 bg-blue-500/20 text-blue-400 text-xs">Verified</Badge>
                            )}
                            <span className="ml-2 text-xs text-gray-500">{formatTimestamp(message.timestamp)}</span>
                          </div>
                          <p className="text-gray-300 mb-2">{message.text}</p>
                          <div className="flex items-center text-xs text-gray-500">
                            <button
                              className={`flex items-center mr-4 ${message.liked ? "text-purple-400" : ""}`}
                              onClick={() => likeMessage(message.id)}
                            >
                              <ThumbsUp className="h-3 w-3 mr-1" />
                              {message.likes}
                            </button>
                            <button className="flex items-center mr-4">
                              <Share2 className="h-3 w-3 mr-1" />
                              Share
                            </button>
                            <button className="flex items-center">
                              <Flag className="h-3 w-3 mr-1" />
                              Report
                            </button>
                            <div className="ml-auto">
                              {message.sentiment === "bullish" && (
                                <span className="text-green-400 flex items-center">
                                  <TrendingUp className="h-3 w-3 mr-1" />
                                  Bullish
                                </span>
                              )}
                              {message.sentiment === "bearish" && (
                                <span className="text-red-400 flex items-center">
                                  <TrendingDown className="h-3 w-3 mr-1" />
                                  Bearish
                                </span>
                              )}
                              {message.sentiment === "neutral" && (
                                <span className="text-yellow-400 flex items-center">
                                  <BarChart2 className="h-3 w-3 mr-1" />
                                  Neutral
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </AnimatePresence>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-800">
              <div className="flex">
                <Input
                  placeholder={`Chat about ${selectedToken.symbol}...`}
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                  className="mr-2"
                />
                <Button onClick={sendMessage}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              <div className="text-xs text-gray-500 mt-2 flex items-center">
                <AlertTriangle className="h-3 w-3 mr-1" />
                Messages are public and moderated. Be respectful and follow community guidelines.
              </div>
            </div>
          </TabsContent>

          <TabsContent value="analysis" className="h-full overflow-y-auto">
            <div className="bg-black/60 rounded-lg p-4 mb-4">
              <h3 className="text-lg font-medium mb-3">Technical Analysis</h3>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <h4 className="text-sm text-gray-400 mb-1">Support Levels</h4>
                  <div className="flex flex-col space-y-1">
                    <div className="flex justify-between">
                      <span className="text-sm">Strong</span>
                      <span className="text-sm font-medium">${(selectedToken.price * 0.85).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Medium</span>
                      <span className="text-sm font-medium">${(selectedToken.price * 0.92).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Weak</span>
                      <span className="text-sm font-medium">${(selectedToken.price * 0.97).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm text-gray-400 mb-1">Resistance Levels</h4>
                  <div className="flex flex-col space-y-1">
                    <div className="flex justify-between">
                      <span className="text-sm">Weak</span>
                      <span className="text-sm font-medium">${(selectedToken.price * 1.03).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Medium</span>
                      <span className="text-sm font-medium">${(selectedToken.price * 1.08).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Strong</span>
                      <span className="text-sm font-medium">${(selectedToken.price * 1.15).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>

              <h4 className="text-sm text-gray-400 mb-2">Indicators</h4>
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-black/40 rounded p-2">
                  <div className="text-xs text-gray-400">RSI (14)</div>
                  <div className={`text-sm font-medium ${Math.random() > 0.5 ? "text-green-400" : "text-red-400"}`}>
                    {Math.floor(Math.random() * 30) + 40}
                  </div>
                </div>
                <div className="bg-black/40 rounded p-2">
                  <div className="text-xs text-gray-400">MACD</div>
                  <div className={`text-sm font-medium ${Math.random() > 0.5 ? "text-green-400" : "text-red-400"}`}>
                    {(Math.random() * 2 - 1).toFixed(2)}
                  </div>
                </div>
                <div className="bg-black/40 rounded p-2">
                  <div className="text-xs text-gray-400">MA (200)</div>
                  <div
                    className={`text-sm font-medium ${
                      selectedToken.price > selectedToken.price * 0.9 ? "text-green-400" : "text-red-400"
                    }`}
                  >
                    ${(selectedToken.price * 0.9).toFixed(2)}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-black/60 rounded-lg p-4">
              <h3 className="text-lg font-medium mb-3">On-Chain Analysis</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm text-gray-400 mb-2">Whale Activity (24h)</h4>
                  <div className="flex items-center">
                    <div className="w-full bg-gray-700 rounded-full h-2.5">
                      <div
                        className="bg-purple-600 h-2.5 rounded-full"
                        style={{ width: `${Math.floor(Math.random() * 60) + 20}%` }}
                      ></div>
                    </div>
                    <span className="ml-2 text-sm">{Math.floor(Math.random() * 20) + 5} transactions</span>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm text-gray-400 mb-2">Exchange Inflow/Outflow</h4>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm">Inflow</span>
                    <span className="text-sm">
                      {Math.floor(Math.random() * 1000) + 200} {selectedToken.symbol}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Outflow</span>
                    <span className="text-sm">
                      {Math.floor(Math.random() * 1000) + 200} {selectedToken.symbol}
                    </span>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm text-gray-400 mb-2">Active Addresses (24h)</h4>
                  <div className="text-lg font-medium">
                    {(Math.floor(Math.random() * 100) + 10).toLocaleString("en-US")}
                  </div>
                  <div className="text-xs text-green-400">+{Math.floor(Math.random() * 10) + 1}% from yesterday</div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="news" className="h-full overflow-y-auto">
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((item) => (
                <div key={item} className="bg-black/60 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-base font-medium">
                      {selectedToken.name}{" "}
                      {
                        [
                          "Price Surges After",
                          "Announces Partnership With",
                          "Development Update:",
                          "Community Votes on",
                          "Integrates With",
                        ][Math.floor(Math.random() * 5)]
                      }{" "}
                      {
                        ["Major Exchange", "DeFi Protocol", "Layer 2 Solution", "New Feature", "Governance Proposal"][
                          Math.floor(Math.random() * 5)
                        ]
                      }
                    </h3>
                    <span className="text-xs text-gray-500">{Math.floor(Math.random() * 12) + 1}h ago</span>
                  </div>
                  <p className="text-sm text-gray-300 mb-3">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit
                    arcu sed erat molestie vehicula.
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-purple-400">CryptoNews.com</span>
                    <Button variant="outline" size="sm" className="h-7 text-xs">
                      Read More
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
