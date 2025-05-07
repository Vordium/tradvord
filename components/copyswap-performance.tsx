"use client"

import { useState } from "react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Calendar, TrendingUp, BarChart3, PieChartIcon, ChevronDown } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { toast } from "@/hooks/use-toast"

// Sample performance data
const performanceData = {
  "1M": [
    { date: "Week 1", yourPortfolio: 10000, topTraders: 10000, marketAvg: 10000 },
    { date: "Week 2", yourPortfolio: 10350, topTraders: 10420, marketAvg: 10120 },
    { date: "Week 3", yourPortfolio: 10680, topTraders: 10780, marketAvg: 10180 },
    { date: "Week 4", yourPortfolio: 11050, topTraders: 11200, marketAvg: 10250 },
  ],
  "3M": [
    { date: "Jan", yourPortfolio: 10000, topTraders: 10000, marketAvg: 10000 },
    { date: "Feb", yourPortfolio: 11200, topTraders: 11500, marketAvg: 10500 },
    { date: "Mar", yourPortfolio: 12500, topTraders: 13200, marketAvg: 10800 },
  ],
  "1Y": [
    { date: "Jan", yourPortfolio: 1000, topTraders: 1000, marketAvg: 1000 },
    { date: "Feb", yourPortfolio: 1120, topTraders: 1150, marketAvg: 1050 },
    { date: "Mar", yourPortfolio: 1250, topTraders: 1320, marketAvg: 1080 },
    { date: "Apr", yourPortfolio: 1380, topTraders: 1450, marketAvg: 1110 },
    { date: "May", yourPortfolio: 1290, topTraders: 1380, marketAvg: 1060 },
    { date: "Jun", yourPortfolio: 1400, topTraders: 1520, marketAvg: 1090 },
    { date: "Jul", yourPortfolio: 1650, topTraders: 1720, marketAvg: 1150 },
    { date: "Aug", yourPortfolio: 1820, topTraders: 1950, marketAvg: 1200 },
    { date: "Sep", yourPortfolio: 2050, topTraders: 2180, marketAvg: 1250 },
    { date: "Oct", yourPortfolio: 2280, topTraders: 2350, marketAvg: 1300 },
    { date: "Nov", yourPortfolio: 2450, topTraders: 2580, marketAvg: 1350 },
    { date: "Dec", yourPortfolio: 2720, topTraders: 2850, marketAvg: 1400 },
  ],
  All: [
    { date: "2020", yourPortfolio: 1000, topTraders: 1000, marketAvg: 1000 },
    { date: "2021", yourPortfolio: 3250, topTraders: 3450, marketAvg: 1850 },
    { date: "2022", yourPortfolio: 5780, topTraders: 6120, marketAvg: 2340 },
    { date: "2023", yourPortfolio: 12450, topTraders: 13200, marketAvg: 3650 },
    { date: "2024", yourPortfolio: 27200, topTraders: 28500, marketAvg: 4800 },
  ],
}

// Sample allocation data
const allocationData = [
  { name: "CryptoWhale", value: 35, color: "#8884d8" },
  { name: "AlphaSeeker", value: 25, color: "#82ca9d" },
  { name: "TokenSage", value: 20, color: "#ffc658" },
  { name: "NFTHunter", value: 15, color: "#ff8042" },
  { name: "StableFarmer", value: 5, color: "#0088fe" },
]

// Custom tooltip for the chart
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-black/90 border border-purple-500/30 rounded-lg p-4 shadow-lg backdrop-blur-sm">
        <p className="text-gray-300 font-medium mb-2">{label}</p>
        {payload.map((entry: any, index: number) => (
          <div key={`item-${index}`} className="flex items-center mb-1">
            <div className="h-3 w-3 rounded-full mr-2" style={{ backgroundColor: entry.color }} />
            <p className="text-sm">
              <span className="text-gray-400 mr-2">{entry.name}:</span>
              <span className="font-medium text-white">${entry.value.toFixed(2)}</span>
            </p>
          </div>
        ))}
      </div>
    )
  }
  return null
}

export default function CopyswapPerformance() {
  const [timeRange, setTimeRange] = useState<"1M" | "3M" | "1Y" | "All">("1Y")
  const [activeTab, setActiveTab] = useState<"performance" | "allocation">("performance")
  const [showTimeDialog, setShowTimeDialog] = useState(false)
  const [showAllocationDialog, setShowAllocationDialog] = useState(false)
  const [allocations, setAllocations] = useState(allocationData)
  const [editingAllocation, setEditingAllocation] = useState<{ name: string; value: number; color: string } | null>(
    null,
  )
  const [newAllocationValue, setNewAllocationValue] = useState("")

  const handleTimeRangeChange = (range: "1M" | "3M" | "1Y" | "All") => {
    setTimeRange(range)
    toast({
      title: "Time Range Updated",
      description: `Showing data for ${range === "1M" ? "1 Month" : range === "3M" ? "3 Months" : range === "1Y" ? "1 Year" : "All Time"}`,
    })
  }

  const handleTabChange = (value: string) => {
    setActiveTab(value as "performance" | "allocation")
  }

  const handleEditAllocation = (trader: { name: string; value: number; color: string }) => {
    setEditingAllocation(trader)
    setNewAllocationValue(trader.value.toString())
    setShowAllocationDialog(true)
  }

  const saveAllocation = () => {
    if (!editingAllocation) return

    const newValue = Number.parseInt(newAllocationValue)
    if (isNaN(newValue) || newValue < 0 || newValue > 100) {
      toast({
        title: "Invalid Allocation",
        description: "Please enter a value between 0 and 100",
        variant: "destructive",
      })
      return
    }

    // Calculate total of other allocations
    const otherTotal = allocations.filter((a) => a.name !== editingAllocation.name).reduce((sum, a) => sum + a.value, 0)

    if (otherTotal + newValue > 100) {
      toast({
        title: "Allocation Exceeds 100%",
        description: "Total allocation cannot exceed 100%",
        variant: "destructive",
      })
      return
    }

    // Update allocation
    const updatedAllocations = allocations.map((a) =>
      a.name === editingAllocation.name ? { ...a, value: newValue } : a,
    )

    setAllocations(updatedAllocations)
    setShowAllocationDialog(false)

    toast({
      title: "Allocation Updated",
      description: `${editingAllocation.name}'s allocation set to ${newValue}%`,
    })
  }

  const getPerformanceData = () => {
    return performanceData[timeRange]
  }

  return (
    <section className="py-16 px-4 bg-black/30">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">Performance Analytics</h2>
            <p className="text-gray-400">Track how your copied traders are performing</p>
          </div>

          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  {timeRange === "1M"
                    ? "Last Month"
                    : timeRange === "3M"
                      ? "Last 3 Months"
                      : timeRange === "1Y"
                        ? "Last 12 Months"
                        : "All Time"}
                  <ChevronDown className="h-4 w-4 ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => handleTimeRangeChange("1M")}>Last Month</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleTimeRangeChange("3M")}>Last 3 Months</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleTimeRangeChange("1Y")}>Last 12 Months</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleTimeRangeChange("All")}>All Time</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-black/40 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6 hover:border-purple-500/40 transition-all">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-white">Your Portfolio</h3>
              <div className="flex items-center text-green-400">
                <TrendingUp className="h-4 w-4 mr-1" />
                <span>+172%</span>
              </div>
            </div>
            <div className="text-3xl font-bold text-white mb-2">$27,200</div>
            <p className="text-gray-400 text-sm">From initial $10,000</p>
            <div className="mt-4 pt-4 border-t border-gray-800">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-400 text-sm">Monthly Profit</span>
                <span className="text-white font-medium">$2,450</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400 text-sm">Avg. Monthly ROI</span>
                <span className="text-white font-medium">+9.8%</span>
              </div>
            </div>
          </div>

          <div className="bg-black/40 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6 hover:border-purple-500/40 transition-all">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-white">Top Traders Avg</h3>
              <div className="flex items-center text-green-400">
                <TrendingUp className="h-4 w-4 mr-1" />
                <span>+185%</span>
              </div>
            </div>
            <div className="text-3xl font-bold text-white mb-2">$28,500</div>
            <p className="text-gray-400 text-sm">From initial $10,000</p>
            <div className="mt-4 pt-4 border-t border-gray-800">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-400 text-sm">Best Performer</span>
                <span className="text-white font-medium">CryptoWhale (+215%)</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400 text-sm">Worst Performer</span>
                <span className="text-white font-medium">StableFarmer (+86%)</span>
              </div>
            </div>
          </div>

          <div className="bg-black/40 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6 hover:border-purple-500/40 transition-all">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-white">Market Average</h3>
              <div className="flex items-center text-green-400">
                <TrendingUp className="h-4 w-4 mr-1" />
                <span>+40%</span>
              </div>
            </div>
            <div className="text-3xl font-bold text-white mb-2">$14,000</div>
            <p className="text-gray-400 text-sm">From initial $10,000</p>
            <div className="mt-4 pt-4 border-t border-gray-800">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-400 text-sm">Your Outperformance</span>
                <span className="text-white font-medium">+132%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400 text-sm">Benchmark</span>
                <span className="text-white font-medium">Top 100 Crypto Index</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-black/40 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6 mb-8 hover:border-purple-500/40 transition-all">
          <Tabs defaultValue="performance" onValueChange={handleTabChange}>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
              <TabsList className="mb-4 md:mb-0">
                <TabsTrigger value="performance" className="data-[state=active]:bg-purple-900/30">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Performance
                </TabsTrigger>
                <TabsTrigger value="allocation" className="data-[state=active]:bg-purple-900/30">
                  <PieChartIcon className="h-4 w-4 mr-2" />
                  Allocation
                </TabsTrigger>
              </TabsList>

              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  className={timeRange === "1M" ? "bg-purple-900/30" : ""}
                  onClick={() => handleTimeRangeChange("1M")}
                >
                  1M
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className={timeRange === "3M" ? "bg-purple-900/30" : ""}
                  onClick={() => handleTimeRangeChange("3M")}
                >
                  3M
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className={timeRange === "1Y" ? "bg-purple-900/30" : ""}
                  onClick={() => handleTimeRangeChange("1Y")}
                >
                  1Y
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className={timeRange === "All" ? "bg-purple-900/30" : ""}
                  onClick={() => handleTimeRangeChange("All")}
                >
                  All
                </Button>
              </div>
            </div>

            <TabsContent value="performance" className="mt-0">
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={getPerformanceData()} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                    <XAxis dataKey="date" stroke="#666" />
                    <YAxis stroke="#666" />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="yourPortfolio"
                      name="Your Portfolio"
                      stroke="#8884d8"
                      strokeWidth={3}
                      dot={{ r: 4 }}
                      activeDot={{ r: 8 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="topTraders"
                      name="Top Traders"
                      stroke="#82ca9d"
                      strokeWidth={3}
                      dot={{ r: 4 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="marketAvg"
                      name="Market Average"
                      stroke="#ffc658"
                      strokeWidth={3}
                      dot={{ r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>

            <TabsContent value="allocation" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="h-[400px] flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={allocations}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={150}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {allocations.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip content={<CustomTooltip />} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className="flex flex-col justify-center">
                  <h3 className="text-xl font-bold text-white mb-4">Your Allocation</h3>
                  <div className="space-y-4">
                    {allocations.map((item, index) => (
                      <div key={index} className="flex items-center">
                        <div className="h-4 w-4 rounded-full mr-3" style={{ backgroundColor: item.color }} />
                        <div className="flex-grow">
                          <div className="flex justify-between mb-1">
                            <span className="text-white">{item.name}</span>
                            <span className="text-white font-medium">{item.value}%</span>
                          </div>
                          <div className="w-full bg-gray-700 rounded-full h-2">
                            <div
                              className="h-2 rounded-full"
                              style={{
                                width: `${item.value}%`,
                                backgroundColor: item.color,
                              }}
                            />
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="ml-2 h-8 w-8 p-0"
                          onClick={() => handleEditAllocation(item)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M12 20h9"></path>
                            <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                          </svg>
                        </Button>
                      </div>
                    ))}
                  </div>
                  <Button
                    className="mt-6"
                    onClick={() =>
                      toast({
                        title: "Allocation Saved",
                        description: "Your allocation settings have been updated.",
                      })
                    }
                  >
                    Save Allocation
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Edit Allocation Dialog */}
      <Dialog open={showAllocationDialog} onOpenChange={setShowAllocationDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Allocation</DialogTitle>
          </DialogHeader>

          <div className="py-4">
            <div className="flex items-center mb-4">
              <div className="h-4 w-4 rounded-full mr-2" style={{ backgroundColor: editingAllocation?.color }} />
              <span className="font-medium">{editingAllocation?.name}</span>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Allocation Percentage (%)</label>
              <Input
                type="number"
                value={newAllocationValue}
                onChange={(e) => setNewAllocationValue(e.target.value)}
                min="0"
                max
                onChange={(e) => setNewAllocationValue(e.target.value)}
                min="0"
                max="100"
              />
              <p className="text-xs text-gray-500 mt-1">Enter a value between 0 and 100</p>
            </div>

            <div className="mt-4">
              <p className="text-sm text-gray-400">
                Total allocation must not exceed 100%. Remaining available:
                {100 - allocations.reduce((sum, a) => sum + (a.name === editingAllocation?.name ? 0 : a.value), 0)}%
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAllocationDialog(false)}>
              Cancel
            </Button>
            <Button onClick={saveAllocation}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  )
}
