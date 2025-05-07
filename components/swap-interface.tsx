"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowUpDown, Settings, Info, ChevronDown, Clock, AlertCircle, Check, X, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Switch } from "@/components/ui/switch"
import { formatCurrency } from "@/lib/api"

// Token data
const tokens = [
  {
    id: "ethereum",
    symbol: "ETH",
    name: "Ethereum",
    image: "https://assets.coingecko.com/coins/images/279/small/ethereum.png",
    price: 3500,
    balance: 1.245,
  },
  {
    id: "bitcoin",
    symbol: "BTC",
    name: "Bitcoin",
    image: "https://assets.coingecko.com/coins/images/1/small/bitcoin.png",
    price: 60000,
    balance: 0.0345,
  },
  {
    id: "usd-coin",
    symbol: "USDC",
    name: "USD Coin",
    image: "https://assets.coingecko.com/coins/images/6319/small/USD_Coin_icon.png",
    price: 1,
    balance: 2500,
  },
  {
    id: "tether",
    symbol: "USDT",
    name: "Tether",
    image: "https://assets.coingecko.com/coins/images/325/small/Tether.png",
    price: 1,
    balance: 1750,
  },
  {
    id: "solana",
    symbol: "SOL",
    name: "Solana",
    image: "https://assets.coingecko.com/coins/images/4128/small/solana.png",
    price: 120,
    balance: 15.75,
  },
  {
    id: "cardano",
    symbol: "ADA",
    name: "Cardano",
    image: "https://assets.coingecko.com/coins/images/975/small/cardano.png",
    price: 0.5,
    balance: 3500,
  },
  {
    id: "binancecoin",
    symbol: "BNB",
    name: "Binance Coin",
    image: "https://assets.coingecko.com/coins/images/825/small/bnb-icon2_2x.png",
    price: 450,
    balance: 5.5,
  },
  {
    id: "ripple",
    symbol: "XRP",
    name: "XRP",
    image: "https://assets.coingecko.com/coins/images/44/small/xrp-symbol-white-128.png",
    price: 0.6,
    balance: 2000,
  },
  {
    id: "polkadot",
    symbol: "DOT",
    name: "Polkadot",
    image: "https://assets.coingecko.com/coins/images/12171/small/polkadot.png",
    price: 7.5,
    balance: 200,
  },
  {
    id: "dogecoin",
    symbol: "DOGE",
    name: "Dogecoin",
    image: "https://assets.coingecko.com/coins/images/5/small/dogecoin.png",
    price: 0.08,
    balance: 10000,
  },
  {
    id: "shiba-inu",
    symbol: "SHIB",
    name: "Shiba Inu",
    image: "https://assets.coingecko.com/coins/images/11939/small/shiba.png",
    price: 0.00001,
    balance: 50000000,
  },
]

export default function SwapInterface() {
  const [fromToken, setFromToken] = useState(tokens[0])
  const [toToken, setToToken] = useState(tokens[2])
  const [fromAmount, setFromAmount] = useState("")
  const [toAmount, setToAmount] = useState("")
  const [slippage, setSlippage] = useState(0.5)
  const [deadline, setDeadline] = useState(20)
  const [expertMode, setExpertMode] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredTokens, setFilteredTokens] = useState(tokens)
  const [selectingToken, setSelectingToken] = useState<"from" | "to" | null>(null)
  const [swapState, setSwapState] = useState<"ready" | "approving" | "swapping" | "success" | "error">("ready")
  const [errorMessage, setErrorMessage] = useState("")
  const [priceImpact, setPriceImpact] = useState(0.12)
  const [gasFee, setGasFee] = useState(0.0012)
  const [minimumReceived, setMinimumReceived] = useState(0)

  // Calculate exchange rate
  const exchangeRate = fromToken.price / toToken.price

  // Calculate to amount based on from amount
  useEffect(() => {
    if (fromAmount && !isNaN(Number.parseFloat(fromAmount))) {
      const calculatedAmount = Number.parseFloat(fromAmount) * exchangeRate
      setToAmount(calculatedAmount.toFixed(6))

      // Calculate minimum received based on slippage
      const min = calculatedAmount * (1 - slippage / 100)
      setMinimumReceived(min)
    } else {
      setToAmount("")
      setMinimumReceived(0)
    }
  }, [fromAmount, exchangeRate, slippage])

  // Filter tokens based on search query
  useEffect(() => {
    if (searchQuery) {
      const filtered = tokens.filter(
        (token) =>
          token.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          token.symbol.toLowerCase().includes(searchQuery.toLowerCase()),
      )
      setFilteredTokens(filtered)
    } else {
      setFilteredTokens(tokens)
    }
  }, [searchQuery])

  // Swap tokens
  const handleSwapTokens = () => {
    const temp = fromToken
    setFromToken(toToken)
    setToToken(temp)
    setFromAmount(toAmount)
    setToAmount(fromAmount)
  }

  // Handle token selection
  const handleSelectToken = (token: (typeof tokens)[0]) => {
    if (selectingToken === "from") {
      if (token.id === toToken.id) {
        setToToken(fromToken)
      }
      setFromToken(token)
    } else if (selectingToken === "to") {
      if (token.id === fromToken.id) {
        setFromToken(toToken)
      }
      setToToken(token)
    }
    setSelectingToken(null)
  }

  // Handle swap
  const handleSwap = async () => {
    if (!fromAmount || Number.parseFloat(fromAmount) <= 0) {
      setErrorMessage("Please enter an amount")
      return
    }

    if (Number.parseFloat(fromAmount) > fromToken.balance) {
      setErrorMessage("Insufficient balance")
      return
    }

    setErrorMessage("")

    try {
      // Approve token (simulated)
      setSwapState("approving")
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Execute swap (simulated)
      setSwapState("swapping")
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Success
      setSwapState("success")
      setTimeout(() => {
        setSwapState("ready")
        setFromAmount("")
        setToAmount("")
      }, 3000)
    } catch (error) {
      setSwapState("error")
      setErrorMessage("Transaction failed. Please try again.")
      setTimeout(() => {
        setSwapState("ready")
      }, 3000)
    }
  }

  // Get button text based on state
  const getButtonText = () => {
    if (!fromAmount || Number.parseFloat(fromAmount) <= 0) return "Enter an amount"
    if (Number.parseFloat(fromAmount) > fromToken.balance) return "Insufficient balance"

    switch (swapState) {
      case "approving":
        return "Approving..."
      case "swapping":
        return "Swapping..."
      case "success":
        return "Swap Successful!"
      case "error":
        return "Swap Failed"
      default:
        return "Swap"
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl blur-xl"></div>
      <div className="relative bg-black/60 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Swap</h2>
          <Button variant="ghost" size="icon" onClick={() => setShowSettings(!showSettings)}>
            <Settings className="h-5 w-5" />
          </Button>
        </div>

        {/* Settings panel */}
        {showSettings && (
          <div className="mb-6 p-4 bg-black/40 rounded-lg border border-purple-500/20">
            <h3 className="text-sm font-medium mb-3">Transaction Settings</h3>

            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                  <span className="text-sm">Slippage Tolerance</span>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-4 w-4 ml-1 text-gray-400" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="w-[200px] text-xs">
                          Your transaction will revert if the price changes unfavorably by more than this percentage.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <span className="text-sm font-medium text-purple-400">{slippage}%</span>
              </div>
              <div className="flex gap-2 mb-2">
                <Button
                  variant="outline"
                  size="sm"
                  className={`text-xs px-3 py-1 h-auto ${slippage === 0.1 ? "bg-purple-900/30" : ""}`}
                  onClick={() => setSlippage(0.1)}
                >
                  0.1%
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className={`text-xs px-3 py-1 h-auto ${slippage === 0.5 ? "bg-purple-900/30" : ""}`}
                  onClick={() => setSlippage(0.5)}
                >
                  0.5%
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className={`text-xs px-3 py-1 h-auto ${slippage === 1.0 ? "bg-purple-900/30" : ""}`}
                  onClick={() => setSlippage(1.0)}
                >
                  1.0%
                </Button>
              </div>
              <div className="flex items-center">
                <Input
                  type="number"
                  value={slippage}
                  onChange={(e) => setSlippage(Number.parseFloat(e.target.value) || 0)}
                  className="w-20 h-8 text-sm"
                  min="0.1"
                  max="50"
                  step="0.1"
                />
                <span className="ml-2 text-sm">%</span>
              </div>
            </div>

            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                  <span className="text-sm">Transaction Deadline</span>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-4 w-4 ml-1 text-gray-400" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="w-[200px] text-xs">
                          Your transaction will revert if it is pending for more than this period of time.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
              <div className="flex items-center">
                <Input
                  type="number"
                  value={deadline}
                  onChange={(e) => setDeadline(Number.parseInt(e.target.value) || 20)}
                  className="w-20 h-8 text-sm"
                  min="1"
                  max="180"
                />
                <span className="ml-2 text-sm">minutes</span>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="text-sm">Expert Mode</span>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-4 w-4 ml-1 text-gray-400" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="w-[200px] text-xs">
                          Allow high slippage trades and skip the confirm screen. Use at your own risk.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <Switch checked={expertMode} onCheckedChange={setExpertMode} />
              </div>
            </div>
          </div>
        )}

        {/* From token */}
        <div className="mb-2">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-400">From</span>
            <span className="text-sm text-gray-400">
              Balance: {fromToken.balance.toFixed(4)} {fromToken.symbol}
            </span>
          </div>
          <div className="flex items-center p-4 bg-black/40 rounded-lg border border-purple-500/20">
            <Input
              type="number"
              placeholder="0.0"
              value={fromAmount}
              onChange={(e) => setFromAmount(e.target.value)}
              className="border-0 bg-transparent text-xl font-medium focus-visible:ring-0 focus-visible:ring-offset-0 p-0"
            />
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="ml-2 gap-2 border-purple-500/30 bg-black/40 hover:bg-purple-900/20"
                  onClick={() => setSelectingToken("from")}
                >
                  <div className="w-6 h-6 rounded-full overflow-hidden">
                    <img
                      src={fromToken.image || "/placeholder.svg"}
                      alt={fromToken.symbol}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span>{fromToken.symbol}</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-black/90 border border-purple-500/30 backdrop-blur-xl">
                <DialogHeader>
                  <DialogTitle>Select a token</DialogTitle>
                  <DialogDescription>Search for a token or select from the list below</DialogDescription>
                </DialogHeader>
                <div className="mt-4">
                  <Input
                    placeholder="Search by name or symbol"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="mb-4"
                  />
                  <div className="max-h-[300px] overflow-y-auto pr-2">
                    {filteredTokens.map((token) => (
                      <div
                        key={token.id}
                        className="flex items-center justify-between p-3 hover:bg-purple-900/20 rounded-lg cursor-pointer mb-1"
                        onClick={() => handleSelectToken(token)}
                      >
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full overflow-hidden mr-3">
                            <img
                              src={token.image || "/placeholder.svg"}
                              alt={token.symbol}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <div className="font-medium">{token.name}</div>
                            <div className="text-sm text-gray-400">{token.symbol}</div>
                          </div>
                        </div>
                        <div className="text-sm text-right">
                          <div>{token.balance.toFixed(4)}</div>
                          <div className="text-gray-400">{formatCurrency(token.price * token.balance)}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </DialogContent>
            </Dialog>
            <Button
              variant="ghost"
              size="sm"
              className="ml-2 text-xs text-purple-400 hover:text-purple-300 hover:bg-purple-900/20"
              onClick={() => setFromAmount(fromToken.balance.toString())}
            >
              MAX
            </Button>
          </div>
        </div>

        {/* Swap button */}
        <div className="flex justify-center -my-3 z-10 relative">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full bg-black border-purple-500/30 w-10 h-10"
            onClick={handleSwapTokens}
          >
            <ArrowUpDown className="h-4 w-4" />
          </Button>
        </div>

        {/* To token */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-400">To</span>
            <span className="text-sm text-gray-400">
              Balance: {toToken.balance.toFixed(4)} {toToken.symbol}
            </span>
          </div>
          <div className="flex items-center p-4 bg-black/40 rounded-lg border border-purple-500/20">
            <Input
              type="number"
              placeholder="0.0"
              value={toAmount}
              readOnly
              className="border-0 bg-transparent text-xl font-medium focus-visible:ring-0 focus-visible:ring-offset-0 p-0"
            />
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="ml-2 gap-2" onClick={() => setSelectingToken("to")}>
                  <div className="w-6 h-6 rounded-full overflow-hidden">
                    <img
                      src={toToken.image || "/placeholder.svg"}
                      alt={toToken.symbol}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span>{toToken.symbol}</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-black/90 border border-purple-500/30 backdrop-blur-xl">
                <DialogHeader>
                  <DialogTitle>Select a token</DialogTitle>
                  <DialogDescription>Search for a token or select from the list below</DialogDescription>
                </DialogHeader>
                <div className="mt-4">
                  <Input
                    placeholder="Search by name or symbol"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="mb-4"
                  />
                  <div className="max-h-[300px] overflow-y-auto pr-2">
                    {filteredTokens.map((token) => (
                      <div
                        key={token.id}
                        className="flex items-center justify-between p-3 hover:bg-purple-900/20 rounded-lg cursor-pointer mb-1"
                        onClick={() => handleSelectToken(token)}
                      >
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full overflow-hidden mr-3">
                            <img
                              src={token.image || "/placeholder.svg"}
                              alt={token.symbol}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <div className="font-medium">{token.name}</div>
                            <div className="text-sm text-gray-400">{token.symbol}</div>
                          </div>
                        </div>
                        <div className="text-sm text-right">
                          <div>{token.balance.toFixed(4)}</div>
                          <div className="text-gray-400">{formatCurrency(token.price * token.balance)}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Price and details */}
        {fromAmount && Number.parseFloat(fromAmount) > 0 && (
          <div className="mb-6 p-4 bg-black/40 rounded-lg border border-purple-500/20 text-sm">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-400">Rate</span>
              <span>
                1 {fromToken.symbol} = {exchangeRate.toFixed(6)} {toToken.symbol}
              </span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                <span className="text-gray-400">Price Impact</span>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="h-4 w-4 ml-1 text-gray-400" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="w-[200px] text-xs">
                        The difference between the market price and estimated price due to trade size.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <span className={priceImpact > 1 ? "text-amber-400" : "text-green-400"}>{priceImpact.toFixed(2)}%</span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                <span className="text-gray-400">Minimum Received</span>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="h-4 w-4 ml-1 text-gray-400" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="w-[200px] text-xs">
                        Your transaction will revert if there is a large, unfavorable price movement before it is
                        confirmed.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <span>
                {minimumReceived.toFixed(6)} {toToken.symbol}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <span className="text-gray-400">Network Fee</span>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="h-4 w-4 ml-1 text-gray-400" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="w-[200px] text-xs">
                        The fee paid to miners to process your transaction. This is not a fee earned by the platform.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <span>~{gasFee} ETH</span>
            </div>
          </div>
        )}

        {/* Error message */}
        {errorMessage && (
          <div className="mb-4 p-3 bg-red-900/20 border border-red-500/30 rounded-lg text-sm text-red-400 flex items-center">
            <AlertCircle className="h-4 w-4 mr-2" />
            {errorMessage}
          </div>
        )}

        {/* Swap button */}
        <Button
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium py-6 shadow-glow-sm"
          disabled={
            swapState !== "ready" ||
            !fromAmount ||
            Number.parseFloat(fromAmount) <= 0 ||
            Number.parseFloat(fromAmount) > fromToken.balance
          }
          onClick={handleSwap}
        >
          {swapState === "approving" && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
          {swapState === "swapping" && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
          {swapState === "success" && <Check className="h-4 w-4 mr-2" />}
          {swapState === "error" && <X className="h-4 w-4 mr-2" />}
          {getButtonText()}
        </Button>

        {/* Transaction time estimate */}
        {fromAmount && Number.parseFloat(fromAmount) > 0 && swapState === "ready" && (
          <div className="mt-3 text-center text-xs text-gray-400 flex items-center justify-center">
            <Clock className="h-3 w-3 mr-1" />
            Estimated confirmation time: ~30 seconds
          </div>
        )}
      </div>
    </motion.div>
  )
}
