import Image from 'next/image'
import Link from 'next/link'

export default function OnboardingPage() {
  return (
    <main className="min-h-screen bg-[#F9F8F6]">
      {/* Logo Grid - with minimal padding */}
      <div className="px-2 pt-2 mb-8">
        <div className="grid grid-rows-3 gap-1">
          {/* Row 1 */}
          <div className="grid grid-cols-33 gap-1">
            {[...Array(33)].map((_, i) => (
              <div key={`row1-${i}`} className="aspect-square bg-gray-200 rounded-md w-10 h-10" />
            ))}
          </div>
          {/* Row 2 */}
          <div className="grid grid-cols-33 gap-1">
            {[...Array(33)].map((_, i) => (
              <div key={`row2-${i}`} className="aspect-square bg-gray-200 rounded-md w-10 h-10" />
            ))}
          </div>
          {/* Row 3 */}
          <div className="grid grid-cols-33 gap-1">
            {[...Array(33)].map((_, i) => (
              <div key={`row3-${i}`} className="aspect-square bg-gray-200 rounded-md w-10 h-10" />
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Main Text */}
          <div className="text-center space-y-0.5">
            <p className="text-lg font-playfair text-gray-600">Trusted by</p>
            <h1 className="text-2xl md:text-4xl font-playfair">
              <span className="text-[#FC7A00]">9,700+ SaaS Companies</span>
              {' '}to Unlock{' '}
              <span className="inline-flex items-center bg-[#E6F4EA] text-emerald-500 px-2 py-0.5 rounded-lg">
                +41.8%
              </span>
            </h1>
            <h2 className="text-xl md:text-2xl font-playfair text-gray-800">
              Revenue with Monetization-Driven Design
            </h2>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl aspect-[7/8] flex flex-col border border-gray-200">
              <div className="bg-gray-100 rounded-t-xl flex-1"></div>
              <div className="p-6 text-center">
                <h3 className="text-base font-playfair text-gray-800">UX Analysis of<br />best-in-class brands</h3>
              </div>
            </div>
            <div className="bg-white rounded-xl aspect-[7/8] flex flex-col border border-gray-200">
              <div className="bg-gray-100 rounded-t-xl flex-1"></div>
              <div className="p-6 text-center">
                <h3 className="text-base font-playfair text-gray-800">Track competitor's<br />A/B tests</h3>
              </div>
            </div>
            <div className="bg-white rounded-xl aspect-[7/8] flex flex-col border border-gray-200">
              <div className="bg-gray-100 rounded-t-xl flex-1"></div>
              <div className="p-6 text-center">
                <h3 className="text-base font-playfair text-gray-800">Custom UX breakdowns<br />of your company</h3>
              </div>
            </div>
          </div>

          {/* Continue Button */}
          <div className="text-center">
            <Link 
              href="/onboarding/objective" 
              className="inline-flex items-center px-8 py-3 bg-[#FC7A00] text-white font-playfair rounded-lg hover:bg-[#e66e00] transition-colors"
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
