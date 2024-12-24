'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function LoadingPage() {
  const router = useRouter()

  useEffect(() => {
    // Show loading for 3 seconds then redirect
    const timer = setTimeout(() => {
      router.push('/funnel-1/onboarding/recommendations')
    }, 3000)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <main className="min-h-screen bg-[#F9F8F6] flex flex-col items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-8 relative">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#EA592D] mx-auto mb-8"></div>
        </div>

        <h1 className="text-2xl font-playfair text-gray-900 mb-6">
          What if I told you that your ads and product aren't the problem?
        </h1>

        <p className="text-gray-600">
          Analyzing your growth potential...
        </p>
      </div>
    </main>
  )
}
