import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Ryff PWB Assessment System',
  description: 'Comprehensive platform for administering and analyzing psychological well-being assessments',
  generator: 'Next.js',
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
