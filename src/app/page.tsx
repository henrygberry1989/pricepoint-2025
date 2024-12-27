'use client'

import Link from 'next/link'
import Image from 'next/image'

export default function Home() {
  return (
    <div className="min-h-screen relative bg-[#F9F9F9]">
      {/* Background Image */}
      <div className="absolute w-[75%] h-[65%] left-1/2 -translate-x-1/2 bottom-0 rounded-t-lg overflow-hidden">
        <Image
          src="/images/oil-painting-bg.png"
          alt="Oil painting background"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen">
        {/* Header */}
        <header className="px-6 py-4 bg-[#F9F9F9]">
          <div className="flex items-center">
            <Image
              src="/images/pricepoint-logo.png"
              alt="PricePoint"
              width={120}
              height={30}
              className="h-8 w-auto"
            />
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Headline */}
            <div className="text-2xl md:text-3xl font-['Instrument_Serif'] tracking-tight leading-tight text-center -mt-2 mb-4 flex flex-col gap-1">
              <div>
                <span className="text-[#EA592D]">SaaS Monetization & Growth Consultants</span>
              </div>
              <div>
                helping improve payback & LTV enabling you to
              </div>
              <div>
                <span className="text-[#EA592D]">outspend competition</span>
              </div>
            </div>

            {/* CTA Button - Positioned to intersect with oil painting */}
            <div className="relative z-20 text-center pt-5" style={{ marginBottom: '-1.75rem' }}>
              <Link 
                href="/grader"
                className="inline-block px-8 py-4 text-xl text-white bg-[#EA592D] rounded-lg hover:bg-[#d54d24] transition-colors font-['Instrument_Serif']"
              >
                Grade Your Site for $0
              </Link>
            </div>

            {/* Dashboard Image */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[65%] h-[55%]">
              <Image
                src="/images/dashboard-preview.png"
                alt="SaaS Analytics Dashboard"
                fill
                className="object-contain rounded-t-lg"
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
