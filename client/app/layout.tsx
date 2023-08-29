import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Bookalyze - AI-Powered Document Analysis',
  description:
    'Unlock the essence of your documents with Bookalyze. Our advanced AI reads, summarizes, and answers your questions from any PDF or Word file. Dive deep into your literature effortlessly and gain insights in seconds.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`h-screen ${inter.className}`}>{children}</body>
    </html>
  )
}
