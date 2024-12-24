'use client'

import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { supabase } from '@/lib/supabase'
import { pinnedCountries, otherCountries } from './countryPhoneCodes'
import * as flags from 'country-flag-icons/react/3x2'

const budgetOptions = [
  { value: '$0', label: '$0' },
  { value: '$500-1k', label: '$500 - 1k / Month' },
  { value: '$1k-3k', label: '$1k - $3k / Month' },
  { value: '$3k-10k', label: '$3k - $10k / Month' },
  { value: '$10k+', label: '$10k+ / Month' },
]

export default function ContactPage() {
  const router = useRouter()
  const [budget, setBudget] = useState('')
  const [phoneRegion, setPhoneRegion] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [isValid, setIsValid] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const valid = budget !== '' && phoneRegion !== '' && phoneNumber.length >= 7
    console.log('Form validation:', { budget, phoneRegion, phoneNumber, valid })
    setIsValid(valid)
  }, [budget, phoneRegion, phoneNumber])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    if (!isOpen) return

    const handleKeyPress = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase()
      if (key.length === 1 && /[a-z]/.test(key)) {
        const allCountries = [...pinnedCountries, ...otherCountries]
        const index = allCountries.findIndex(country => 
          country.name.toLowerCase().startsWith(key)
        )
        if (index !== -1 && listRef.current) {
          const buttons = listRef.current.querySelectorAll('button')
          buttons[index]?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
        }
      }
    }

    document.addEventListener('keydown', handleKeyPress)
    return () => document.removeEventListener('keydown', handleKeyPress)
  }, [isOpen])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', { budget, phoneRegion, phoneNumber, isValid, isSubmitting })
    
    if (!isValid || isSubmitting) {
      console.log('Form validation failed or already submitting')
      return
    }

    setIsSubmitting(true)
    console.log('Setting submitting state to true')
    
    try {
      // Get the most recent submission
      const { data: submissions, error: fetchError } = await supabase
        .from('new_submissions')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(1)

      if (fetchError) {
        console.error('Error fetching submission:', fetchError)
        setIsSubmitting(false)
        return
      }

      if (!submissions || submissions.length === 0) {
        console.error('No submission found')
        setIsSubmitting(false)
        return
      }

      const submission = submissions[0]

      // Update the submission with the contact info and mark as completed
      const { error: updateError } = await supabase
        .from('new_submissions')
        .update({
          budget,
          phone_region: phoneRegion,
          phone_number: phoneNumber,
          completed: true
        })
        .eq('id', submission.id)

      if (updateError) {
        console.error('Error updating submission:', updateError)
        setIsSubmitting(false)
        return
      }

      console.log('Supabase update successful')

      // Redirect based on budget
      const qualifyingBudgets = ['$1k-3k', '$3k-10k', '$10k+']
      const nextPage = qualifyingBudgets.includes(budget) 
        ? '/funnel-1/onboarding/success' 
        : '/funnel-1/onboarding/not-qualified'
      console.log('Redirecting to:', nextPage)
      router.push(nextPage)
    } catch (error) {
      console.error('Error in form submission:', error)
      setIsSubmitting(false)
    }
  }

  const renderFlag = (iso: string) => {
    const Flag = (flags as any)[iso]
    return Flag ? <Flag className="w-5 h-4 inline-block" /> : null
  }

  const selectedCountry = [...pinnedCountries, ...otherCountries].find(country => country.code === phoneRegion)

  const CountryOption = ({ country }: { country: typeof pinnedCountries[0] }) => (
    <button
      type="button"
      className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center whitespace-nowrap"
      onClick={() => {
        setPhoneRegion(country.code)
        setIsOpen(false)
      }}
    >
      <div className="flex items-center gap-2 min-w-0">
        {renderFlag(country.iso)}
        <span className="truncate">{country.name}</span>
      </div>
      <span className="text-gray-500 ml-auto pl-2">{country.code}</span>
    </button>
  )

  return (
    <main className="min-h-screen bg-[#F9F8F6] relative pb-24">
      <div className="container mx-auto px-4 pt-4">
        {/* Header with Logo and Progress Bar */}
        <div className="flex items-center mb-16">
          <div className="w-32 -ml-4">
            <Image
              src="/images/pricepoint-logo.png"
              alt="Pricepoint"
              width={128}
              height={34}
              priority
            />
          </div>
          <div className="flex-1 flex justify-center">
            <div className="flex gap-2 w-96">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className={`h-1 rounded-full flex-1 ${i === 5 ? 'bg-[#EA592D]' : 'bg-gray-200'}`}
                />
              ))}
            </div>
          </div>
          <div className="w-32"></div>
        </div>

        {/* Main Content */}
        <div className="max-w-xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Budget Selection */}
            <div>
              <label className="block text-lg font-medium mb-4">
                What's your budget to get help with this?
              </label>
              <select
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#EA592D] focus:border-transparent"
              >
                <option value="">Select a budget range</option>
                {budgetOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-lg font-medium mb-4">
                Your phone number
              </label>
              <div className="flex gap-4">
                <div className="relative w-1/3" ref={dropdownRef}>
                  <button
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#EA592D] focus:border-transparent flex items-center justify-between bg-white"
                  >
                    {selectedCountry ? (
                      <span className="flex items-center gap-2">
                        {renderFlag(selectedCountry.iso)}
                        <span className="ml-2">{selectedCountry.code}</span>
                      </span>
                    ) : (
                      <span className="text-gray-500">Region</span>
                    )}
                    <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  {isOpen && (
                    <div 
                      ref={listRef}
                      className="absolute z-10 w-[300px] mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto"
                    >
                      {/* Pinned Countries */}
                      {pinnedCountries.map((country) => (
                        <CountryOption key={country.iso} country={country} />
                      ))}

                      {/* Separator */}
                      <div className="border-t border-gray-200 my-1" />

                      {/* Other Countries */}
                      {otherCountries.map((country) => (
                        <CountryOption key={country.iso} country={country} />
                      ))}
                    </div>
                  )}
                </div>
                <input
                  type="tel"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                  placeholder="Phone number"
                  className="w-2/3 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#EA592D] focus:border-transparent"
                />
              </div>
            </div>

            {/* Continue Button */}
            <div className="absolute bottom-8 right-8">
              <button
                type="submit"
                disabled={!isValid || isSubmitting}
                className={`inline-flex items-center px-8 py-3 rounded-lg ${
                  isValid && !isSubmitting
                    ? 'bg-[#EA592D] text-white hover:bg-[#d54d24]'
                    : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                } transition-colors relative`}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </>
                ) : (
                  <>
                    Continue
                    <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  )
}
