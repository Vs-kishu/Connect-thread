import { ClerkProvider } from '@clerk/nextjs/app-beta'
import '../globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Header from '@/components/shared/Header'
import LeftSideBar from '@/components/shared/LeftSideBar'
import RightSideBar from '@/components/shared/RightSideBar'
import Footer from '@/components/shared/Footer'

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
  return (
    <ClerkProvider>
    <html lang="en">
      <body className={inter.className}>
        <Header/>
        <main>
          <LeftSideBar/>
          <section className='main-container'>
<div className='w-full max-w-4xl'>
{children}
</div>
          </section>
          <RightSideBar/>
          
        </main>
        <Footer />
      </body>
    </html>
    </ClerkProvider>
  )
}
