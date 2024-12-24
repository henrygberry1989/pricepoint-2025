'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { StickyFooter } from '@/components/sticky-footer'
import toast from 'react-hot-toast'

export default function CompanyUrlPage() {
  const router = useRouter()
  const [url, setUrl] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const [isValid, setIsValid] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    setIsValid(url.trim() !== '')
  }, [url])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isValid || isSubmitting) return

    setIsSubmitting(true)
    
    try {
      const { data: submissions, error: fetchError } = await supabase
        .from('new_submissions')
        .select('id')
        .eq('completed', false)
        .order('created_at', { ascending: false })
        .limit(1)

      if (fetchError) {
        console.error('Error fetching submission:', fetchError)
        toast.error('Something went wrong. Please try again.')
        setIsSubmitting(false)
        return
      }

      if (!submissions || submissions.length === 0) {
        console.error('No incomplete submission found')
        toast.error('Please enter your email first.')
        setIsSubmitting(false)
        router.push('/funnel-1')
        return
      }

      const { error: updateError } = await supabase
        .from('new_submissions')
        .update({
          company_url: url
        })
        .eq('id', submissions[0].id)

      if (updateError) {
        console.error('Error updating submission:', updateError)
        toast.error('Something went wrong. Please try again.')
        setIsSubmitting(false)
        return
      }

      router.push('/funnel-1/onboarding/loading')
    } catch (error) {
      console.error('Error:', error)
      toast.error('Something went wrong. Please try again.')
      setIsSubmitting(false)
    }
  }

  const ContinueButton = () => (
    <button
      type="submit"
      disabled={!isValid || isSubmitting}
      className={`w-full inline-flex items-center justify-center px-8 py-3 rounded-lg ${
        isValid
          ? 'bg-[#EA592D] text-white hover:bg-[#d54d24]'
          : 'bg-gray-200 text-gray-400 cursor-not-allowed'
      } transition-colors`}
    >
      Continue
      <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </button>
  )

  return (
    <main className="min-h-screen bg-[#F9F8F6] pb-24 md:pb-0">
      <div className="container mx-auto px-4 pt-4">
        {/* Header with Logo and Progress Bar */}
        <div className="flex items-center mb-8 md:mb-16">
          <div className="w-24 md:w-32 -ml-2 md:-ml-4">
            <Image
              src="/images/pricepoint-logo.png"
              alt="Pricepoint"
              width={128}
              height={34}
              priority
            />
          </div>
          <div className="flex-1 flex justify-center">
            <div className="flex gap-1 md:gap-2 w-48 md:w-96">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className={`h-1 rounded-full flex-1 ${i === 2 ? 'bg-[#EA592D]' : 'bg-gray-200'}`}
                />
              ))}
            </div>
          </div>
          <div className="w-24 md:w-32"></div>
        </div>

        <div className="max-w-2xl mx-auto mt-8 md:mt-32">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="text-center space-y-2">
              <h1 className="text-xl md:text-2xl font-playfair text-gray-900">
                Enter your <span className="text-[#EA592D]">site URL</span> so we can tailor
              </h1>
              <h1 className="text-xl md:text-2xl font-playfair text-gray-900">
                your recommendations
              </h1>
            </div>

            {/* URL Input */}
            <div className="relative w-full max-w-xl mx-auto">
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder="www.example.com"
                className={`w-full px-6 py-4 bg-white border rounded-lg outline-none transition-all ${
                  isFocused ? 'border-[#EA592D] shadow-sm' : 'border-gray-200'
                }`}
              />
            </div>

            {/* Desktop Continue Button */}
            <div className="hidden md:block">
              <ContinueButton />
            </div>
          </form>
        </div>
      </div>

      {/* Mobile Sticky Footer */}
      <StickyFooter>
        <ContinueButton />
      </StickyFooter>
    </main>
  )
}
