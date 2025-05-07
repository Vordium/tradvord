import type { Metadata } from "next"
import TokenChatHero from "@/components/token-chat-hero"
import TokenChatInterface from "@/components/token-chat-interface"
import TokenChatSidebar from "@/components/token-chat-sidebar"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export const metadata: Metadata = {
  title: "Token Chat | copto.io",
  description: "Join token-specific chat rooms to discuss cryptocurrencies with the community",
}

export default function TokenChatPage() {
  return (
    <>
      <Navbar />
      <main className="flex min-h-screen flex-col bg-black">
        <div className="pt-24 pb-16">
          <TokenChatHero />
          <div className="container mx-auto px-4 mt-8">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div className="lg:col-span-1">
                <TokenChatSidebar />
              </div>
              <div className="lg:col-span-3">
                <TokenChatInterface />
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
