'use client'

import Image from 'next/image'

export default function NotQualifiedPage() {
  return (
    <main className="min-h-screen bg-[#F9F8F6] flex flex-col items-center justify-center px-4">
      <div className="max-w-xl mx-auto text-center">
        <div className="bg-white rounded-2xl p-8 shadow-sm">
          <h1 className="text-2xl font-medium mb-4">
            Thank You for Your Interest
          </h1>
          <p className="text-gray-600">
            Unfortunately, you don't qualify for a consultation call at this time. We recommend exploring our self-service resources and documentation to help you achieve your growth goals.
          </p>
        </div>
      </div>
    </main>
  )
}
