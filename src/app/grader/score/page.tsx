'use client'

import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function ScorePage() {
  const router = useRouter()
  const [companyUrl, setCompanyUrl] = useState('')

  useEffect(() => {
    // Get URL from query parameters
    const url = new URL(window.location.href)
    const urlParam = url.searchParams.get('url')
    if (urlParam) {
      setCompanyUrl(urlParam)
    }
  }, [])

  const handleContinue = () => {
    router.push('/grader/contact')
  }

  return (
    <main className="min-h-screen bg-[#F9F8F6]">
      <div className="container mx-auto px-4 pt-4">
        {/* Header with Logo */}
        <div className="flex items-center mb-10">
          <div className="w-32">
            <Image
              src="/images/pricepoint-logo.png"
              alt="Pricepoint"
              width={128}
              height={34}
              priority
            />
          </div>
        </div>

        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl font-playfair text-gray-900 mb-2">
            {companyUrl && `${companyUrl}'s `}<span className="font-normal">score</span> is <span className="font-normal">36/100</span>
          </h1>
          <p className="text-gray-600 mb-12">
            This score is considered to be Below Average.
          </p>

          {/* Score Bar */}
          <div className="flex justify-center space-x-1 mb-12">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="w-2 h-8 bg-[#EA592D] rounded"></div>
            ))}
            {[...Array(20)].map((_, i) => (
              <div key={i} className="w-2 h-8 bg-gray-200 rounded"></div>
            ))}
          </div>

          {/* Analysis Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-[2fr_1fr] gap-6 mb-12">
            {/* Left Card */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-200">
              <h2 className="text-lg font-semibold mb-3 text-left">Breakdown</h2>
              <p className="text-xs text-gray-700 mb-5 text-left">
                Whilst your website suggests strong differentiation your monetisation is weak.
              </p>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-[#EA592D]/10 flex items-center justify-center">
                      <span className="text-[#EA592D] font-semibold">A</span>
                    </div>
                    <svg className="absolute top-0 left-0 w-10 h-10 -rotate-90">
                      <circle
                        cx="20"
                        cy="20"
                        r="18"
                        fill="none"
                        stroke="#EA592D"
                        strokeWidth="2"
                        strokeDasharray="113"
                        strokeDashoffset="11"
                      />
                    </svg>
                  </div>
                  <span className="text-sm text-gray-700">Strong Product</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                      <span className="text-gray-400">C</span>
                    </div>
                    <svg className="absolute top-0 left-0 w-10 h-10 -rotate-90">
                      <circle
                        cx="20"
                        cy="20"
                        r="18"
                        fill="none"
                        stroke="#E5E7EB"
                        strokeWidth="2"
                        strokeDasharray="113"
                        strokeDashoffset="68"
                      />
                    </svg>
                  </div>
                  <span className="text-sm text-gray-700">Weak Pricing</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                      <span className="text-gray-400">C</span>
                    </div>
                    <svg className="absolute top-0 left-0 w-10 h-10 -rotate-90">
                      <circle
                        cx="20"
                        cy="20"
                        r="18"
                        fill="none"
                        stroke="#E5E7EB"
                        strokeWidth="2"
                        strokeDasharray="113"
                        strokeDashoffset="68"
                      />
                    </svg>
                  </div>
                  <span className="text-sm text-gray-700">Weak Conversion Rate</span>
                </div>
              </div>
            </div>

            {/* Right Card */}
            <div className="bg-[#FFEDE7] rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <svg className="w-6 h-6 text-[#EA592D]" viewBox="0 0 24 24" fill="none">
                  <path d="M18.4 8l-4.2 4.2-2.3-2.3L8 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="text-2xl font-medium">39%</span>
              </div>
              <p className="text-sm text-gray-700 text-left">
                How much Copyleaks were able to increased LTV in 30 days with Pricepoint's help
              </p>
            </div>
          </div>
        </div>

        {/* Continue Button */}
        <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg p-4 z-50">
          <div className="container mx-auto max-w-4xl">
            <Link 
              href="/grader/contact" 
              className="w-full inline-flex items-center justify-center px-8 py-3 bg-[#EA592D] text-white font-['Instrument_Serif'] rounded-lg hover:bg-[#d54d24] transition-colors"
            >
              Continue
              <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
