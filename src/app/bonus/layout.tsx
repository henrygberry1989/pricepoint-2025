import { Instrument_Serif } from 'next/font/google'
import '@/app/globals.css'

const instrumentSerif = Instrument_Serif({ 
  weight: ['400'],
  subsets: ['latin'],
})

export const metadata = {
  title: 'Monetization-Driven UI Redesign + 3 FREE Bonus Items',
  description: 'Get your UI redesign with bonus items',
}

export default function BonusLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${instrumentSerif.className} bg-[#F9F9F9] min-h-screen`}>
        {children}
      </body>
    </html>
  )
}
