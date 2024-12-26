'use client'

import Link from 'next/link'
import Image from 'next/image'

export default function Home() {
  return (
    <div className="min-h-screen relative">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/oil-painting-bg.png"
          alt="Oil painting background"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <header className="px-6 py-4">
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
        <main className="container mx-auto px-4 pt-16 text-center">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif tracking-tight">
              <span className="text-[#EA592D]">SaaS Monetization & Growth Consultants</span>
              {' '}helping improve payback & LTV enabling you to{' '}
              <span className="text-[#EA592D]">outspend competition</span>
            </h1>

            {/* CTA Button */}
            <div>
              <Link 
                href="/funnel-1"
                className="inline-block px-8 py-4 text-xl text-white bg-[#EA592D] rounded-lg hover:bg-[#d54d24] transition-colors"
              >
                Grade Your Site for $0
              </Link>
            </div>

            {/* Dashboard Image */}
            <div className="mt-12 relative bg-white rounded-2xl shadow-xl p-4 mx-auto max-w-3xl">
              <Image
                src="/images/dashboard-preview.png"
                alt="SaaS Analytics Dashboard"
                width={1000}
                height={600}
                className="w-full h-auto rounded-lg"
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
