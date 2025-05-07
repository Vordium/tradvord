"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Wallet, LogOut, ChevronDown } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

declare global {
  interface Window {
    ethereum?: any
    Web3Modal?: any
  }
}

export default function WalletConnect() {
  const [account, setAccount] = useState<string | null>(null)
  const [balance, setBalance] = useState<string | null>(null)
  const [chainId, setChainId] = useState<string | null>(null)
  const [web3Modal, setWeb3Modal] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)

  // Initialize Web3Modal
  useEffect(() => {
    const loadWeb3Modal = async () => {
      try {
        // Check if Web3Modal is already loaded
        if (typeof window !== "undefined") {
          // If Web3Modal is not loaded yet, load it dynamically
          if (!window.Web3Modal) {
            // Load Web3Modal
            const Web3ModalScript = document.createElement("script")
            Web3ModalScript.src = "https://unpkg.com/web3modal@1.9.12/dist/index.js"
            Web3ModalScript.async = true
            document.body.appendChild(Web3ModalScript)

            // Load Web3
            const Web3Script = document.createElement("script")
            Web3Script.src = "https://unpkg.com/web3@1.8.2/dist/web3.min.js"
            Web3Script.async = true
            document.body.appendChild(Web3Script)

            // Wait for scripts to load
            await new Promise((resolve) => {
              const checkScriptsLoaded = () => {
                if (window.Web3Modal) {
                  resolve(true)
                } else {
                  setTimeout(checkScriptsLoaded, 100)
                }
              }
              setTimeout(checkScriptsLoaded, 500)
            })
          }

          // Initialize Web3Modal
          const providerOptions = {}
          const newWeb3Modal = new window.Web3Modal.default({
            cacheProvider: true,
            providerOptions,
            theme: "dark",
          })

          setWeb3Modal(newWeb3Modal)

          // Auto connect if previously connected
          if (newWeb3Modal.cachedProvider) {
            connectWallet()
          }
        }
      } catch (error) {
        console.error("Error loading Web3Modal:", error)
      }
    }

    loadWeb3Modal()
  }, [])

  // Setup event listeners for wallet changes
  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts: string[]) => {
        if (accounts.length > 0) {
          setAccount(accounts[0])
          getAccountDetails(accounts[0])
        } else {
          setAccount(null)
          setBalance(null)
        }
      })

      window.ethereum.on("chainChanged", (chainId: string) => {
        setChainId(chainId)
        if (account) {
          getAccountDetails(account)
        }
      })
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeAllListeners("accountsChanged")
        window.ethereum.removeAllListeners("chainChanged")
      }
    }
  }, [account])

  const getAccountDetails = async (address: string) => {
    if (window.ethereum) {
      try {
        // Get balance
        const balance = await window.ethereum.request({
          method: "eth_getBalance",
          params: [address, "latest"],
        })

        // Convert from wei to ETH
        const etherValue = Number.parseInt(balance, 16) / 10 ** 18
        setBalance(etherValue.toFixed(4))

        // Get chain ID
        const chainId = await window.ethereum.request({ method: "eth_chainId" })
        setChainId(chainId)
      } catch (error) {
        console.error("Error getting account details:", error)
      }
    }
  }

  const connectWallet = async () => {
    if (!web3Modal) return

    try {
      setIsLoading(true)
      const provider = await web3Modal.connect()

      // Get accounts
      const accounts = await provider.request({ method: "eth_requestAccounts" })

      if (accounts.length > 0) {
        setAccount(accounts[0])
        getAccountDetails(accounts[0])
      }
    } catch (error) {
      console.error("Error connecting wallet:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const disconnectWallet = async () => {
    if (web3Modal) {
      web3Modal.clearCachedProvider()
      setAccount(null)
      setBalance(null)
      setChainId(null)
    }
  }

  const formatAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`
  }

  const getNetworkName = (chainId: string | null) => {
    if (!chainId) return "Unknown Network"

    const networks: Record<string, string> = {
      "0x1": "Ethereum",
      "0x89": "Polygon",
      "0xa86a": "Avalanche",
      "0x38": "BSC",
      "0xfa": "Fantom",
    }

    return networks[chainId] || "Unknown Network"
  }

  const handleConnect = async () => {
    await connectWallet()
  }

  return (
    <>
      {!account ? (
        <Button
          onClick={handleConnect}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium py-6 shadow-glow-sm"
        >
          Connect Wallet
        </Button>
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="border-purple-500/30 hover:bg-purple-900/20 rounded-full">
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-green-400 mr-2"></div>
                <span className="mr-2">{formatAddress(account)}</span>
                <ChevronDown className="h-4 w-4" />
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-black/90 border border-purple-500/30 backdrop-blur-xl">
            <DropdownMenuLabel>
              <div className="flex items-center">
                <Wallet className="mr-2 h-4 w-4 text-purple-400" />
                <span>Wallet</span>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-purple-500/20" />
            <DropdownMenuItem className="flex flex-col items-start">
              <span className="text-gray-400 text-xs">Address</span>
              <span className="text-sm">{formatAddress(account)}</span>
            </DropdownMenuItem>
            {balance && (
              <DropdownMenuItem className="flex flex-col items-start">
                <span className="text-gray-400 text-xs">Balance</span>
                <span className="text-sm">{balance} ETH</span>
              </DropdownMenuItem>
            )}
            <DropdownMenuItem className="flex flex-col items-start">
              <span className="text-gray-400 text-xs">Network</span>
              <span className="text-sm">{getNetworkName(chainId)}</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-purple-500/20" />
            <DropdownMenuItem onClick={disconnectWallet} className="text-red-400 focus:text-red-400 cursor-pointer">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Disconnect</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </>
  )
}
