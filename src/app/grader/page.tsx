'use client'

import Image from 'next/image'
import { useState } from 'react'
import GraderLoadingSequence from '@/components/GraderLoadingSequence'
import GraderEmailCapture from '@/components/GraderEmailCapture'

const formatUrl = (url: string) => {
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    return `https://${url}`
  }
  return url
}

export default function GraderPage() {
  const [loading, setLoading] = useState(false)
  const [showEmailCapture, setShowEmailCapture] = useState(false)
  const [url, setUrl] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const form = e.target as HTMLFormElement
    let inputUrl = form.url.value.trim()
    
    // Remove any trailing slashes
    inputUrl = inputUrl.replace(/\/+$/, '')
    
    // Remove http:// or https:// if present
    inputUrl = inputUrl.replace(/^https?:\/\//, '')
    
    // Remove www. if present
    inputUrl = inputUrl.replace(/^www\./, '')
    
    const formattedUrl = formatUrl(inputUrl)
    setUrl(formattedUrl)
    setLoading(true)
  }

  const handleLoadingComplete = () => {
    setLoading(false)
    setShowEmailCapture(true)
  }

  const handleEmailSubmit = (email: string) => {
    // Here you would typically send the email to your backend
    console.log('Email submitted:', email)
    // Redirect to results page or show results
  }

  return (
    <div className="min-h-screen relative bg-[#F9F9F9]">
      {/* Background Image */}
      <div className="absolute w-[75%] h-[65%] left-1/2 -translate-x-1/2 bottom-0 rounded-t-lg overflow-hidden">
        <Image
          src="/grader/oil-painting-bg-grader.png"
          alt="Oil painting background"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="px-6 py-4 flex items-center">
          <Image
            src="/grader/pricepoint-logo.png"
            alt="Pricepoint Logo"
            width={120}
            height={40}
            priority
          />

          {/* Social Proof */}
          <div className="flex-grow flex items-center justify-center gap-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <svg 
                  key={i}
                  className="w-4 h-4 text-[#EA592D]" 
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <p className="text-sm font-medium text-gray-600">
              Trusted by 40k+ subscribers
            </p>
          </div>

          {/* Empty div for spacing */}
          <div className="w-[120px]"></div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 flex-grow flex flex-col">
          <div className="max-w-4xl mx-auto w-full flex-grow flex flex-col">
            <div className="flex-grow">
              <h1 className="font-['Instrument_Serif'] text-3xl md:text-4xl text-center mb-4 text-[#F15A2B]">
                Free SaaS Website Grader
              </h1>

              <div className="max-w-3xl mx-auto text-center mb-8">
                <p className="font-['Instrument_Serif'] text-xl">
                  Grade your website in seconds. Then steal the growth playbooks of billion dollar brands like Grammarly, Atlassian and Notion for free.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="w-full max-w-xl mx-auto flex gap-0 mb-12">
                <input
                  type="text"
                  name="url"
                  placeholder="Website URL"
                  required
                  pattern="[a-zA-Z0-9-.]+"
                  title="Enter your website domain (e.g., yourwebsite.com)"
                  className="flex-grow p-4 rounded-l-lg border-2 border-r-0 border-[#F15A2B] focus:outline-none focus:border-[#F15A2B] bg-white"
                />
                <button 
                  type="submit"
                  className="font-['Instrument_Serif'] text-xl bg-[#F15A2B] text-white px-8 py-4 rounded-r-lg hover:bg-[#d14a21] transition-colors whitespace-nowrap shadow-lg"
                >
                  Enter
                </button>
              </form>
            </div>

            {/* Results Preview */}
            <div className="w-[85%] mx-auto mt-auto">
              <Image
                src="/grader/results-preview.png"
                alt="Website Grader Results Preview"
                width={1400}
                height={788}
                className="rounded-t-lg shadow-xl"
                priority
              />
            </div>
          </div>
        </main>
      </div>

      {/* Loading Sequence */}
      {loading && (
        <GraderLoadingSequence
          url={url}
          onComplete={handleLoadingComplete}
        />
      )}

      {/* Email Capture */}
      {showEmailCapture && (
        <GraderEmailCapture
          onSubmit={handleEmailSubmit}
        />
      )}
    </div>
  )
}
