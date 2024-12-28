'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Inter, Instrument_Serif } from 'next/font/google'
import { RedesignFormData, RedesignStep } from './types'
import URLEmailStep from './components/URLEmailStep'
import BottleneckStep from './components/BottleneckStep'
import BudgetStep from './components/BudgetStep'
import CalendarStep from './components/CalendarStep'
import { supabase } from '@/lib/supabase'
import toast from 'react-hot-toast'

const instrumentSerif = Instrument_Serif({ 
  weight: ['400'],
  subsets: ['latin'],
})

const inter = Inter({ subsets: ['latin'] })

export default function RedesignFlow() {
  const [currentStep, setCurrentStep] = useState<RedesignStep>(RedesignStep.INTRO)
  const [formData, setFormData] = useState<RedesignFormData>({
    company_url: '',
    email: '',
    growth_bottleneck: '',
    budget: ''
  })

  const updateFormData = (data: Partial<RedesignFormData>) => {
    setFormData(prev => ({ ...prev, ...data }))
  }

  const handleStart = () => {
    setCurrentStep(RedesignStep.URL_EMAIL)
  }

  const handleNext = async () => {
    try {
      if (currentStep === RedesignStep.URL_EMAIL) {
        // Create initial submission record
        const { error } = await supabase.from('new_submissions').insert([
          { 
            email: formData.email,
            company_url: formData.company_url
            // No need to set created_at, completed, or is_read as they have defaults
          }
        ])
        if (error) {
          console.error('Insert error:', error)
          throw error
        }
        setCurrentStep(RedesignStep.BOTTLENECK)
      } else if (currentStep === RedesignStep.BOTTLENECK) {
        // Update bottleneck
        const { error } = await supabase
          .from('new_submissions')
          .update({ 
            objective: formData.growth_bottleneck // Using objective field from schema
          })
          .eq('email', formData.email)
        if (error) throw error
        setCurrentStep(RedesignStep.BUDGET)
      } else if (currentStep === RedesignStep.BUDGET) {
        // Update budget and mark as completed
        const { error } = await supabase
          .from('new_submissions')
          .update({ 
            budget: formData.budget,
            completed: true
          })
          .eq('email', formData.email)
        if (error) throw error
        setCurrentStep(RedesignStep.CALENDAR)
      }
    } catch (error) {
      console.error('Error saving submission:', error)
      toast.error('There was an error saving your information. Please try again.')
    }
  }

  if (currentStep === RedesignStep.CALENDAR) {
    return <CalendarStep />
  }

  if (currentStep !== RedesignStep.INTRO) {
    const StepComponent = {
      [RedesignStep.URL_EMAIL]: URLEmailStep,
      [RedesignStep.BOTTLENECK]: BottleneckStep,
      [RedesignStep.BUDGET]: BudgetStep,
    }[currentStep]

    return (
      <main className="min-h-screen bg-[#F9F9F9] flex flex-col items-center py-8">
        <StepComponent 
          formData={formData}
          onUpdate={updateFormData}
          onNext={handleNext}
        />
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#F9F9F9] flex flex-col items-center px-4 py-8 relative">
      {/* Top Stats Section */}
      <div className="w-full max-w-2xl flex justify-between items-start mb-8 relative overflow-visible">
        {/* LTV Stats Box - Left */}
        <div className="absolute left-[calc(-20%)] md:left-[calc(-20vw)] top-0 w-[300px] transform -rotate-[5deg] overflow-visible">
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 w-full">
            <div className="bg-[#FFF5F2] rounded-lg p-4">
              <p className={`${instrumentSerif.className} text-[#FF4405] text-3xl text-center`}>
                +39% LTV
              </p>
              <p className={`${inter.className} text-sm text-center text-gray-600 mt-1`}>
                IN ONE MONTH
              </p>
            </div>
            <p className={`${inter.className} text-sm text-center text-gray-500 mt-2`}>
              Recent client result
            </p>
          </div>
        </div>
        
        {/* Stats Box - Right */}
        <div className="absolute right-[calc(-20%)] md:right-[calc(-20vw)] top-0 w-[300px] transform rotate-[5deg] overflow-visible">
          <Image
            src="/images/redesign/stats-box.png"
            alt="Customer statistics"
            width={300}
            height={150}
            className="w-full"
          />
        </div>
      </div>

      {/* Social Proof */}
      <div className="flex items-center justify-center gap-2 mb-6">
        <div className="flex gap-1">
          {[...Array(5)].map((_, i) => (
            <svg key={i} className="w-6 h-6 text-[#FF4405]" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
        <p className={`${inter.className} text-sm text-gray-600`}>Trusted by 9,700+ companies</p>
      </div>

      {/* Main Content */}
      <div className="max-w-2xl w-full">
        <h1 className={`${instrumentSerif.className} text-4xl md:text-5xl text-center mb-4`}>
          Free 1-Page Redesign to Improve Monetization
        </h1>
        <p className={`${instrumentSerif.className} text-center text-lg md:text-xl mb-8 text-gray-700`}>
          Recover ad spend faster and outspend your competition
        </p>

        {/* Hero Image (Before/After) */}
        <div className="mb-4 max-w-[90%] mx-auto">
          <Image
            src="/images/redesign/before-after.png"
            alt="Conversion rate improvement from 31% to 59%"
            width={800}
            height={400}
            className="w-full rounded-lg"
            priority
          />
        </div>

        {/* CTA Button */}
        <button 
          onClick={handleStart}
          className={`${instrumentSerif.className} w-full bg-[#FF4405] text-white rounded-lg py-4 px-6 text-lg font-medium hover:bg-[#E63D04] transition-colors fixed bottom-4 left-0 right-0 mx-4 md:static md:mx-0`}
        >
          Claim Your Free 1-Page Redesign
        </button>
      </div>
    </main>
  )
}
