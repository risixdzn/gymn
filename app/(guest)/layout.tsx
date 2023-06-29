import '../globals.css'
import { Inter } from 'next/font/google'

import { ThemeProvider } from '@/components/ThemeProvider'
import Navbar from '@/components/Navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Gymn',
  description: 'Um aplicativo, duas perspectivas',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
          <Navbar/>
          {children}
        </ThemeProvider>        
      </body>
    </html>
  )
}
