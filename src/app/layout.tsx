import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import GlobalLayout from '../components/layout'
import { Providers } from './providers'
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Ai Friend Chat',
  description: 'Chat with me~~~~~~',
}

export default function RootLayout(props: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <GlobalLayout>{props.modal}{props.children}</GlobalLayout>
        </Providers>
      </body>
    </html>
  )
}
