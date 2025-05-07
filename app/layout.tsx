import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'vobit',
  description: 'vobit is a cutting-edge web3 trading platform for crypto enthusiasts',
  icons: {
    icon: '/logo.jpg',
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <header>
          <nav>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/trending">Trending</a></li>
              <li><a href="/token-chat">Token Chat</a></li>
            </ul>
          </nav>
        </header>
        {children}
      </body>
    </html>
  )
}
