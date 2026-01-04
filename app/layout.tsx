import type { Metadata } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

const spaceGrotesk = Space_Grotesk({ 
  subsets: ['latin'],
  variable: '--font-space',
})

export const metadata: Metadata = {
  title: 'Equinox Flow | Agentic Financial Digital Twin',
  description: 'The world\'s first Agentic Financial Digital Twin for borderless life-cycle orchestration. Simulate your global future with AI-powered insights.',
  keywords: ['financial planning', 'relocation', 'AI', 'digital twin', 'tax optimization', 'global mobility'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body 
        className={`${inter.className} antialiased`}
        style={{
          background: 'linear-gradient(135deg, #0f172a 0%, #581c87 30%, #0f172a 100%)',
          color: 'white',
          minHeight: '100vh'
        }}
      >
        {children}
      </body>
    </html>
  )
}
