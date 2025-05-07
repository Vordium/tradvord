"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Clock, CheckCircle, XCircle, ExternalLink, Loader2 } from "lucide-react"

// Sample transaction history
const sampleTransactions = [
  {
    id: "0x1a2b3c4d5e6f",
    type: "swap",
    status: "completed",
    timestamp: Date.now() - 1000 * 60 * 5, // 5 minutes ago
    fromToken: {
      symbol: "ETH",
      amount: 0.5,
      image: "https://assets.coingecko.com/coins/images/279/small/ethereum.png",
    },
    toToken: {
      symbol: "USDC",
      amount: 1750,
      image: "https://assets.coingecko.com/coins/images/6319/small/USD_Coin_icon.png",
    },
    txHash: "0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f",
  },
  {
    id: "0x2b3c4d5e6f7a",
    type: "swap",
    status: "pending",
    timestamp: Date.now() - 1000 * 60 * 2, // 2 minutes ago
    fromToken: {
      symbol: "USDC",
      amount: 500,
      image: "https://assets.coingecko.com/coins/images/6319/small/USD_Coin_icon.png",
    },
    toToken: {
      symbol: "SOL",
      amount: 4.15,
      image: "https://assets.coingecko.com/coins/images/4128/small/solana.png",
    },
    txHash: "0x2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f",
  },
  {
    id: "0x3c4d5e6f7a8b",
    type: "swap",
    status: "failed",
    timestamp: Date.now() - 1000 * 60 * 60, // 1 hour ago
    fromToken: {
      symbol: "BNB",
      amount: 2,
      image: "https://assets.coingecko.com/coins/images/825/small/bnb-icon2_2x.png",
    },
    toToken: {
      symbol: "BTC",
      amount: 0.0067,
      image: "https://assets.coingecko.com/coins/images/1/small/bitcoin.png",
    },
    txHash: "0x3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f",
    error: "Slippage tolerance exceeded",
  },
]

export default function SwapHistory() {
  const [transactions, setTransactions] = useState(sampleTransactions)

  // Format timestamp
  const formatTime = (timestamp: number) => {
    const now = Date.now()
    const diff = now - timestamp

    if (diff < 1000 * 60) {
      return "Just now"
    } else if (diff < 1000 * 60 * 60) {
      const minutes = Math.floor(diff / (1000 * 60))
      return `${minutes} minute${minutes > 1 ? "s" : ""} ago`
    } else if (diff < 1000 * 60 * 60 * 24) {
      const hours = Math.floor(diff / (1000 * 60 * 60))
      return `${hours} hour${hours > 1 ? "s" : ""} ago`
    } else {
      const date = new Date(timestamp)
      return date.toLocaleDateString()
    }
  }

  // Get status icon
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-400" />
      case "pending":
        return <Loader2 className="h-4 w-4 text-amber-400 animate-spin" />
      case "failed":
        return <XCircle className="h-4 w-4 text-red-400" />
      default:
        return <Clock className="h-4 w-4 text-gray-400" />
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="relative"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl blur-xl"></div>
      <div className="relative bg-black/60 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6">
        <h2 className="text-xl font-bold mb-4">Recent Transactions</h2>

        {transactions.length === 0 ? (
          <div className="text-center py-8">
            <Clock className="h-8 w-8 mx-auto mb-2 text-gray-400" />
            <p className="text-gray-400">No transactions yet</p>
          </div>
        ) : (
          <div className="space-y-4">
            {transactions.map((tx) => (
              <div
                key={tx.id}
                className="p-3 bg-black/40 rounded-lg border border-purple-500/20 hover:border-purple-500/40 transition-colors"
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center">
                    {getStatusIcon(tx.status)}
                    <span className="ml-2 font-medium capitalize">{tx.status}</span>
                  </div>
                  <span className="text-sm text-gray-400">{formatTime(tx.timestamp)}</span>
                </div>

                <div className="flex items-center mb-3">
                  <div className="flex items-center">
                    <div className="w-6 h-6 rounded-full overflow-hidden mr-1">
                      <img
                        src={tx.fromToken.image || "/placeholder.svg"}
                        alt={tx.fromToken.symbol}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="font-medium">
                      {tx.fromToken.amount} {tx.fromToken.symbol}
                    </span>
                  </div>
                  <div className="mx-2 text-gray-400">→</div>
                  <div className="flex items-center">
                    <div className="w-6 h-6 rounded-full overflow-hidden mr-1">
                      <img
                        src={tx.toToken.image || "/placeholder.svg"}
                        alt={tx.toToken.symbol}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="font-medium">
                      {tx.toToken.amount} {tx.toToken.symbol}
                    </span>
                  </div>
                </div>

                <div className="flex justify-between items-center text-xs">
                  <a
                    href={`https://etherscan.io/tx/${tx.txHash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-400 hover:text-purple-300 flex items-center"
                  >
                    View on Explorer
                    <ExternalLink className="h-3 w-3 ml-1" />
                  </a>

                  {tx.error && <span className="text-red-400">{tx.error}</span>}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  )
}
