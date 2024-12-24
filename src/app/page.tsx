'use client'

import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F9F9F9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="py-4">
          <div className="flex justify-between items-center">
            <Image
              src="/images/pricepoint-logo.png"
              alt="Pricepoint"
              width={150}
              height={40}
              priority
            />
          </div>
        </header>

        {/* Hero Section */}
        <div className="py-12">
          <div className="text-center">
            <h1 className="text-5xl font-playfair text-gray-900 mb-6 max-w-4xl mx-auto">
              SaaS Monetisation & Growth Consulting That Actually Works
            </h1>
            <p className="text-xl text-gray-600 mb-12 max-w-4xl mx-auto">
              To outgrow your competitors, you need to outspend them on acquisition.<br />
              The key? <span className="text-[#EA592D]">Faster payback periods & greater LTVs</span> through better monetisation.
            </p>
            <div className="space-x-4 mb-16">
              <Link 
                href="/funnel-1" 
                className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[#EA592D] hover:bg-[#d54d24]"
              >
                Get Started
              </Link>
            </div>

            {/* Feature Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 max-w-7xl mx-auto">
              <Image
                src="/images/feature-revenue.png"
                alt="Revenue Expansion"
                width={400}
                height={400}
                className="w-full"
              />

              <Image
                src="/images/feature-pricing.png"
                alt="Price Testing"
                width={400}
                height={400}
                className="w-full"
              />

              <Image
                src="/images/feature-competitor.png"
                alt="Competitor Research"
                width={400}
                height={400}
                className="w-full"
              />

              <Image
                src="/images/feature-localization.png"
                alt="Price Localization"
                width={400}
                height={400}
                className="w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
