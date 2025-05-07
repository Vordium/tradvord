import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'copto',
  description: 'copto is a cutting-edge web3 trading platform for crypto enthusiasts',
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
      <body>{children}</body>
    </html>
  )
}
