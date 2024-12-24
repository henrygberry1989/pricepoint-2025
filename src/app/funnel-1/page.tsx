'use client'

import Image from 'next/image'
import { EmailCaptureForm } from '@/components/email-capture-form'

export default function FunnelPage() {
  return (
    <main className="min-h-screen bg-gradient-to-t from-[#FC7A00] via-[#FC7A00]/5 via-[#F9F8F6] via-[#F9F8F6] via-[#F9F8F6] via-[#F9F8F6] via-[#F9F8F6] via-[#F9F8F6] to-[#F9F8F6]">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="relative mb-8">
            <Image
              src="/images/pricepoint-logo.png"
              alt="Pricepoint"
              width={150}
              height={40}
              className="mx-auto"
            />
          </div>
          <div className="text-center mb-12">
            <h1 className="text-4xl font-playfair text-gray-900 mb-4">
              Steal the Growth Secrets of
            </h1>
            <h1 className="text-4xl font-playfair text-[#EA592D] mb-8">
              Billion Dollar SaaS Companies
            </h1>
            <p className="text-sm text-gray-500">
              Trusted by 9,700+ companies
            </p>
          </div>
          <EmailCaptureForm />
        </div>
      </div>
    </main>
  )
}
