'use client'

import Link from 'next/link'
import Image from 'next/image'
import { StickyFooter } from '@/components/sticky-footer'

export default function TrustedPage() {
  const ContinueButton = () => (
    <Link 
      href="/grader/score" 
      className="w-full inline-flex items-center justify-center px-8 py-3 bg-[#EA592D] text-white font-playfair rounded-lg hover:bg-[#d54d24] transition-colors"
    >
      Continue
      <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </Link>
  )

  return (
    <main className="min-h-screen bg-[#F9F8F6]">
      {/* Logo Grid - with minimal padding */}
      <div className="px-2 pt-2 mb-4 md:mb-8">
        {/* Mobile Logo Grid (2 rows) */}
        <div className="md:hidden grid grid-rows-2 gap-1">
          {/* Row 1 */}
          <div className="grid grid-cols-8 gap-0.5">
            {[...Array(8)].map((_, i) => (
              <div key={`mobile-row1-${i}`} className="aspect-square relative w-[42px] h-[42px]">
                <Image
                  src={`/logos/logo-${i + 1}.png`}
                  alt={`Company logo ${i + 1}`}
                  fill
                  className="object-contain"
                  sizes="42px"
                />
              </div>
            ))}
          </div>
          {/* Row 2 */}
          <div className="grid grid-cols-8 gap-0.5">
            {[...Array(8)].map((_, i) => (
              <div key={`mobile-row2-${i}`} className="aspect-square relative w-[42px] h-[42px]">
                <Image
                  src={`/logos/logo-${i + 9}.png`}
                  alt={`Company logo ${i + 9}`}
                  fill
                  className="object-contain"
                  sizes="42px"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Desktop Logo Grid (3 rows) */}
        <div className="hidden md:block">
          {/* Row 1 */}
          <div className="grid grid-cols-[repeat(33,minmax(0,1fr))] gap-1 mb-1">
            {[...Array(33)].map((_, i) => (
              <div key={`desktop-row1-${i}`} className="aspect-square relative">
                <Image
                  src={`/logos/logo-${i + 1}.png`}
                  alt={`Company logo ${i + 1}`}
                  fill
                  className="object-contain"
                  sizes="(min-width: 768px) 3vw"
                />
              </div>
            ))}
          </div>
          {/* Row 2 */}
          <div className="grid grid-cols-[repeat(33,minmax(0,1fr))] gap-1 mb-1">
            {[...Array(33)].map((_, i) => (
              <div key={`desktop-row2-${i}`} className="aspect-square relative">
                <Image
                  src={`/logos/logo-${i + 34}.png`}
                  alt={`Company logo ${i + 34}`}
                  fill
                  className="object-contain"
                  sizes="(min-width: 768px) 3vw"
                />
              </div>
            ))}
          </div>
          {/* Row 3 */}
          <div className="grid grid-cols-[repeat(33,minmax(0,1fr))] gap-1">
            {[...Array(33)].map((_, i) => (
              <div key={`desktop-row3-${i}`} className="aspect-square relative">
                <Image
                  src={`/logos/logo-${i + 67}.png`}
                  alt={`Company logo ${i + 67}`}
                  fill
                  className="object-contain"
                  sizes="(min-width: 768px) 3vw"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Main Text */}
          <div className="text-center space-y-0.5">
            <p className="text-base md:text-lg font-playfair text-gray-600">Trusted by</p>
            <h1 className="text-xl md:text-2xl lg:text-4xl font-playfair">
              <span className="text-[#FC7A00]">9,700+ SaaS Companies</span>
              {' '}to Unlock{' '}
              <span className="inline-flex items-center bg-[#E6F4EA] text-emerald-500 px-2 py-0.5 rounded-lg">
                +41.8%
              </span>
            </h1>
            <h2 className="text-lg md:text-xl lg:text-2xl font-playfair text-gray-800">
              Revenue with Monetization-Driven Design
            </h2>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-4 md:gap-6">
            <div className="bg-white rounded-xl aspect-[7/8] flex flex-col border border-gray-200">
              <div className="bg-gray-100 rounded-t-xl flex-1 relative overflow-hidden">
                <Image
                  src="/examples/grammarly-pricing.png"
                  alt="Grammarly pricing analysis example"
                  fill
                  className="object-contain p-4"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="p-4 md:p-6 text-center">
                <h3 className="text-sm md:text-base font-playfair text-gray-800">UX Analysis of<br />best-in-class brands</h3>
              </div>
            </div>
            <div className="bg-white rounded-xl aspect-[7/8] flex flex-col border border-gray-200">
              <div className="bg-gray-100 rounded-t-xl flex-1 relative overflow-hidden">
                <Image
                  src="/examples/ab-test-alert.png"
                  alt="A/B test alert example"
                  fill
                  className="object-contain p-4"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="p-4 md:p-6 text-center">
                <h3 className="text-sm md:text-base font-playfair text-gray-800">Track competitor's<br />A/B tests</h3>
              </div>
            </div>
            <div className="bg-white rounded-xl aspect-[7/8] flex flex-col border border-gray-200">
              <div className="bg-gray-100 rounded-t-xl flex-1 relative overflow-hidden">
                <Image
                  src="/examples/persona-editor.png"
                  alt="Persona editor example"
                  fill
                  className="object-contain p-4"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="p-4 md:p-6 text-center">
                <h3 className="text-sm md:text-base font-playfair text-gray-800">Custom UX breakdowns<br />of your company</h3>
              </div>
            </div>
          </div>

          {/* Desktop Continue Button */}
          <div className="hidden md:block text-center">
            <ContinueButton />
          </div>
        </div>
      </div>

      {/* Mobile Sticky Footer */}
      <StickyFooter>
        <ContinueButton />
      </StickyFooter>
    </main>
  )
}
