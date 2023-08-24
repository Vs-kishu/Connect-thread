import { ClerkProvider } from '@clerk/nextjs'
import '../globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'threads app',
  description: 'learning th thread next js by building thread app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (<ClerkProvider>
    <html lang="en">
      <body className={`${inter.className} bg-dark-1`}>{children}</body>
    </html>
    </ClerkProvider>
  )
}
