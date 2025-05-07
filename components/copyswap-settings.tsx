"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Shield, AlertTriangle, Clock, DollarSign, Percent, Info, HelpCircle } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"

export default function CopyswapSettings() {
  // State for form values
  const [allocationAmount, setAllocationAmount] = useState("5000")
  const [maxPerTrade, setMaxPerTrade] = useState("500")
  const [portfolioPercentage, setPortfolioPercentage] = useState("25")
  const [maxTraders, setMaxTraders] = useState("5")
  const [stopLoss, setStopLoss] = useState("15")
  const [takeProfit, setTakeProfit] = useState("50")
  const [riskLevel, setRiskLevel] = useState("3")
  const [dailyLossLimit, setDailyLossLimit] = useState("200")
  const [copyDelay, setCopyDelay] = useState("5")
  const [tradingHours, setTradingHours] = useState("all")

  // Toggle states
  const [autoCopy, setAutoCopy] = useState(true)
  const [copyExisting, setCopyExisting] = useState(false)
  const [notifications, setNotifications] = useState(true)
  const [expertMode, setExpertMode] = useState(false)

  // Dialog states
  const [showHelpDialog, setShowHelpDialog] = useState(false)
  const [helpTopic, setHelpTopic] = useState("")

  const handleSaveSettings = () => {
    toast({
      title: "Settings Saved",
      description: "Your CopySwap settings have been updated successfully.",
    })
  }

  const showHelp = (topic: string) => {
    setHelpTopic(topic)
    setShowHelpDialog(true)
  }

  const getHelpContent = () => {
    switch (helpTopic) {
      case "allocation":
        return {
          title: "Allocation Settings",
          content:
            "Allocation settings determine how much of your portfolio is dedicated to copy trading. The total allocation amount is the maximum amount you want to use for copying trades. Maximum per trade limits how much can be allocated to a single position. Portfolio percentage sets what portion of your total portfolio will be used for copy trading.",
        }
      case "risk":
        return {
          title: "Risk Management",
          content:
            "Risk management settings help protect your capital. Stop loss percentage automatically stops copying if losses reach this threshold. Take profit percentage automatically secures profits when gains reach this level. Maximum risk level filters which traders you can copy based on their risk profile. Daily loss limit stops all copying for the day if losses exceed this amount.",
        }
      case "timing":
        return {
          title: "Timing Settings",
          content:
            "Timing settings control when trades are copied. Copy delay adds a small delay before executing a copied trade, which can help avoid front-running. Trading hours let you specify when you want to copy trades - either 24/7, only during active market hours, or during custom hours you define.",
        }
      case "advanced":
        return {
          title: "Advanced Options",
          content:
            "Advanced options provide more control over your copy trading. Auto-copy new trades automatically copies new positions opened by traders you follow. Copy existing positions lets you copy positions that traders already have open. Notifications sends alerts when new trades are copied. Expert mode enables advanced parameters for more experienced users.",
        }
      default:
        return {
          title: "Help",
          content: "Select a specific topic to get more detailed help.",
        }
    }
  }

  return (
    <section className="py-16 px-4 bg-black/30">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">Customize Your CopySwap</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Fine-tune your copy trading settings to match your investment goals and risk tolerance
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="lg:col-span-2">
            <div className="bg-black/40 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6 mb-8 hover:border-purple-500/40 transition-all">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-white flex items-center">
                  <DollarSign className="h-5 w-5 mr-2 text-purple-400" />
                  Allocation Settings
                </h3>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => showHelp("allocation")}>
                  <HelpCircle className="h-4 w-4" />
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Total Allocation Amount</label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                    <Input
                      type="number"
                      placeholder="5,000"
                      className="pl-10"
                      value={allocationAmount}
                      onChange={(e) => setAllocationAmount(e.target.value)}
                    />
                  </div>
                  <p className="text-gray-500 text-xs mt-1">The total amount you want to allocate to copy trading</p>
                </div>

                <div>
                  <label className="block text-gray-400 text-sm mb-2">Maximum Per Trade</label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                    <Input
                      type="number"
                      placeholder="500"
                      className="pl-10"
                      value={maxPerTrade}
                      onChange={(e) => setMaxPerTrade(e.target.value)}
                    />
                  </div>
                  <p className="text-gray-500 text-xs mt-1">Maximum amount to allocate to a single trade</p>
                </div>

                <div>
                  <label className="block text-gray-400 text-sm mb-2">Portfolio Percentage</label>
                  <div className="relative">
                    <Percent className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                    <Input
                      type="number"
                      placeholder="25"
                      className="pl-10"
                      value={portfolioPercentage}
                      onChange={(e) => setPortfolioPercentage(e.target.value)}
                    />
                  </div>
                  <p className="text-gray-500 text-xs mt-1">Percentage of your total portfolio to allocate</p>
                </div>

                <div>
                  <label className="block text-gray-400 text-sm mb-2">Maximum Traders</label>
                  <Input
                    type="number"
                    placeholder="5"
                    value={maxTraders}
                    onChange={(e) => setMaxTraders(e.target.value)}
                  />
                  <p className="text-gray-500 text-xs mt-1">Maximum number of traders to copy simultaneously</p>
                </div>
              </div>
            </div>

            <div className="bg-black/40 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6 hover:border-purple-500/40 transition-all">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-white flex items-center">
                  <Shield className="h-5 w-5 mr-2 text-purple-400" />
                  Risk Management
                </h3>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => showHelp("risk")}>
                  <HelpCircle className="h-4 w-4" />
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Stop Loss Percentage</label>
                  <div className="relative">
                    <Percent className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                    <Input
                      type="number"
                      placeholder="15"
                      className="pl-10"
                      value={stopLoss}
                      onChange={(e) => setStopLoss(e.target.value)}
                    />
                  </div>
                  <p className="text-gray-500 text-xs mt-1">
                    Automatically stop copying if losses reach this percentage
                  </p>
                </div>

                <div>
                  <label className="block text-gray-400 text-sm mb-2">Take Profit Percentage</label>
                  <div className="relative">
                    <Percent className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                    <Input
                      type="number"
                      placeholder="50"
                      className="pl-10"
                      value={takeProfit}
                      onChange={(e) => setTakeProfit(e.target.value)}
                    />
                  </div>
                  <p className="text-gray-500 text-xs mt-1">
                    Automatically take profits when gains reach this percentage
                  </p>
                </div>

                <div>
                  <label className="block text-gray-400 text-sm mb-2">Maximum Risk Level</label>
                  <div className="relative">
                    <select
                      className="w-full h-10 rounded-md border border-purple-500/30 bg-black/40 px-3 py-2 text-sm text-white appearance-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/50 focus-visible:ring-offset-0"
                      value={riskLevel}
                      onChange={(e) => setRiskLevel(e.target.value)}
                    >
                      <option value="1">Very Low</option>
                      <option value="2">Low</option>
                      <option value="3">Medium</option>
                      <option value="4">High</option>
                      <option value="5">Very High</option>
                    </select>
                  </div>
                  <p className="text-gray-500 text-xs mt-1">Only copy traders with this risk level or lower</p>
                </div>

                <div>
                  <label className="block text-gray-400 text-sm mb-2">Daily Loss Limit</label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                    <Input
                      type="number"
                      placeholder="200"
                      className="pl-10"
                      value={dailyLossLimit}
                      onChange={(e) => setDailyLossLimit(e.target.value)}
                    />
                  </div>
                  <p className="text-gray-500 text-xs mt-1">Stop copying for the day if losses exceed this amount</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-black/40 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6 hover:border-purple-500/40 transition-all">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-white flex items-center">
                  <Clock className="h-5 w-5 mr-2 text-purple-400" />
                  Timing Settings
                </h3>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => showHelp("timing")}>
                  <HelpCircle className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Copy Delay (seconds)</label>
                  <Input
                    type="number"
                    placeholder="5"
                    value={copyDelay}
                    onChange={(e) => setCopyDelay(e.target.value)}
                  />
                  <p className="text-gray-500 text-xs mt-1">Delay before copying a trade (0-30 seconds)</p>
                </div>

                <div>
                  <label className="block text-gray-400 text-sm mb-2">Trading Hours</label>
                  <select
                    className="w-full h-10 rounded-md border border-purple-500/30 bg-black/40 px-3 py-2 text-sm text-white appearance-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/50 focus-visible:ring-offset-0"
                    value={tradingHours}
                    onChange={(e) => setTradingHours(e.target.value)}
                  >
                    <option value="all">24/7 (All Hours)</option>
                    <option value="active">Active Market Hours Only</option>
                    <option value="custom">Custom Hours</option>
                  </select>
                  <p className="text-gray-500 text-xs mt-1">When to copy trades during the day</p>
                </div>
              </div>
            </div>

            <div className="bg-black/40 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6 hover:border-purple-500/40 transition-all">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-white flex items-center">
                  <AlertTriangle className="h-5 w-5 mr-2 text-purple-400" />
                  Advanced Options
                </h3>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => showHelp("advanced")}>
                  <HelpCircle className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white">Auto-Copy New Trades</p>
                    <p className="text-gray-500 text-xs">Automatically copy new trades from selected traders</p>
                  </div>
                  <div
                    className={`h-6 w-12 rounded-full p-1 flex items-center cursor-pointer ${autoCopy ? "bg-purple-900/70" : "bg-purple-900/30"}`}
                    onClick={() => setAutoCopy(!autoCopy)}
                  >
                    <div
                      className={`h-4 w-4 bg-purple-500 rounded-full transform transition-transform ${autoCopy ? "translate-x-6" : "translate-x-0"}`}
                    ></div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white">Copy Existing Positions</p>
                    <p className="text-gray-500 text-xs">Copy traders' existing open positions</p>
                  </div>
                  <div
                    className={`h-6 w-12 rounded-full p-1 flex items-center cursor-pointer ${copyExisting ? "bg-purple-900/70" : "bg-purple-900/30"}`}
                    onClick={() => setCopyExisting(!copyExisting)}
                  >
                    <div
                      className={`h-4 w-4 bg-purple-500 rounded-full transform transition-transform ${copyExisting ? "translate-x-6" : "translate-x-0"}`}
                    ></div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white">Notifications</p>
                    <p className="text-gray-500 text-xs">Receive alerts for new copied trades</p>
                  </div>
                  <div
                    className={`h-6 w-12 rounded-full p-1 flex items-center cursor-pointer ${notifications ? "bg-purple-900/70" : "bg-purple-900/30"}`}
                    onClick={() => setNotifications(!notifications)}
                  >
                    <div
                      className={`h-4 w-4 bg-purple-500 rounded-full transform transition-transform ${notifications ? "translate-x-6" : "translate-x-0"}`}
                    ></div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white">Expert Mode</p>
                    <p className="text-gray-500 text-xs">Enable advanced trading parameters</p>
                  </div>
                  <div
                    className={`h-6 w-12 rounded-full p-1 flex items-center cursor-pointer ${expertMode ? "bg-purple-900/70" : "bg-purple-900/30"}`}
                    onClick={() => setExpertMode(!expertMode)}
                  >
                    <div
                      className={`h-4 w-4 bg-purple-500 rounded-full transform transition-transform ${expertMode ? "translate-x-6" : "translate-x-0"}`}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-6">
              <div className="flex items-start mb-4">
                <Info className="h-5 w-5 text-white mr-2 mt-0.5 flex-shrink-0" />
                <p className="text-white text-sm">
                  Your settings will apply to all new copy trades. Existing copied positions will not be affected by
                  these changes.
                </p>
              </div>
              <Button className="w-full bg-white text-purple-600 hover:bg-gray-100" onClick={handleSaveSettings}>
                Save Settings
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-12 bg-black/40 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6 max-w-6xl mx-auto hover:border-purple-500/40 transition-all">
          <div className="flex items-start">
            <HelpCircle className="h-5 w-5 text-purple-400 mr-3 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="text-lg font-bold text-white mb-2">Need Help?</h3>
              <p className="text-gray-400 mb-4">
                Our support team is available 24/7 to help you set up your CopySwap settings for optimal performance.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button
                  variant="outline"
                  onClick={() => {
                    toast({
                      title: "FAQ Opened",
                      description: "Opening the frequently asked questions page.",
                    })
                  }}
                >
                  View FAQ
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    toast({
                      title: "Support Request Sent",
                      description: "A support agent will contact you shortly.",
                    })
                  }}
                >
                  Contact Support
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    toast({
                      title: "Tutorial Started",
                      description: "Opening the CopySwap tutorial video.",
                    })
                  }}
                >
                  Watch Tutorial
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Help Dialog */}
      <Dialog open={showHelpDialog} onOpenChange={setShowHelpDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{getHelpContent().title}</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-gray-300">{getHelpContent().content}</p>
          </div>
          <DialogFooter>
            <Button onClick={() => setShowHelpDialog(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  )
}
