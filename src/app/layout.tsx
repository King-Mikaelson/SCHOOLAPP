import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import ReduxProvider from '../_Providers/ReduxProvider'
import Image from 'next/image'

const inter = Inter({ subsets: ['latin'] })


export const metadata: Metadata = {
  title: 'GT Western',
  description: 'Education and Migration',
}

export default function RootLayout({
  children,
  params: {
    lang
  }
}: {
  children: React.ReactNode,
  params: {
    lang: string
  }
}) {
  return (
    <html lang={lang}>
      <ReduxProvider>
        <body className={`${inter.className}`}>{children}</body>
      </ReduxProvider>
    </html>
  )
}
