'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import toast from 'react-hot-toast'

interface LeadFormProps {
  email: string
}

export function LeadForm({ email }: LeadFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const formData = new FormData(e.currentTarget)
      const data = {
        email,
        objective: formData.get('objective'),
        metric_goal: formData.get('metric_goal'),
        budget: formData.get('budget'),
        phone_region: formData.get('phone_region'),
        phone_number: formData.get('phone_number'),
        company_url: formData.get('company_url'),
        completed: true
      }

      const { error } = await supabase
        .from('new_submissions')
        .update(data)
        .eq('email', email)
        .eq('completed', false)

      if (error) throw error

      router.push('/onboarding/success')
    } catch (error) {
      console.error('Error submitting form:', error)
      toast.error('Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
      <div className="bg-white shadow-lg rounded-lg p-8 border border-gray-200">
        <div className="space-y-6">
          <div>
            <label htmlFor="objective" className="block text-sm font-medium text-gray-700">
              What is your key objective?
            </label>
            <select
              id="objective"
              name="objective"
              required
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-[#EA592D] focus:border-[#EA592D] sm:text-sm rounded-md"
            >
              <option value="">Select an objective</option>
              <option value="Improving Pricing & Customer LTV">Improving Pricing & Customer LTV</option>
              <option value="Improve Onboarding / Aha! Moments">Improve Onboarding / Aha! Moments</option>
              <option value="Paid Growth Channels aren't Profitable">Paid Growth Channels aren't Profitable</option>
              <option value="Decrease Churn">Decrease Churn</option>
              <option value="Looking for New Growth Channels">Looking for New Growth Channels</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label htmlFor="metric_goal" className="block text-sm font-medium text-gray-700">
              By how much do you want to improve this metric?
            </label>
            <select
              id="metric_goal"
              name="metric_goal"
              required
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-[#EA592D] focus:border-[#EA592D] sm:text-sm rounded-md"
            >
              <option value="">Select a goal</option>
              <option value="20%">20%</option>
              <option value="40%">40%</option>
              <option value="60%">60%</option>
              <option value="80%">80%</option>
              <option value="100%+">100%+</option>
            </select>
          </div>

          <div>
            <label htmlFor="budget" className="block text-sm font-medium text-gray-700">
              What is your monthly budget for growth initiatives?
            </label>
            <select
              id="budget"
              name="budget"
              required
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-[#EA592D] focus:border-[#EA592D] sm:text-sm rounded-md"
            >
              <option value="">Select a budget</option>
              <option value="$1k-$5k">$1k-$5k</option>
              <option value="$5k-$10k">$5k-$10k</option>
              <option value="$10k+">$10k+</option>
            </select>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="phone_region" className="block text-sm font-medium text-gray-700">
                Country Code
              </label>
              <select
                id="phone_region"
                name="phone_region"
                required
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-[#EA592D] focus:border-[#EA592D] sm:text-sm rounded-md"
              >
                <option value="">Select a region</option>
                <option value="+1">United States (+1)</option>
                <option value="+44">United Kingdom (+44)</option>
                <option value="+61">Australia (+61)</option>
                <option value="+64">New Zealand (+64)</option>
                <option value="+353">Ireland (+353)</option>
                <option value="+91">India (+91)</option>
                <option value="+65">Singapore (+65)</option>
              </select>
            </div>

            <div>
              <label htmlFor="phone_number" className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone_number"
                id="phone_number"
                required
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#EA592D] focus:border-[#EA592D] sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label htmlFor="company_url" className="block text-sm font-medium text-gray-700">
              Company Website
            </label>
            <div className="mt-1">
              <input
                type="url"
                name="company_url"
                id="company_url"
                required
                className="shadow-sm focus:ring-[#EA592D] focus:border-[#EA592D] block w-full sm:text-sm border-gray-300 rounded-md"
                placeholder="https://example.com"
              />
            </div>
          </div>
        </div>

        <div className="mt-6">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#EA592D] hover:bg-[#EA592D]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#EA592D] ${
              isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
            }`}
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </div>
    </form>
  )
}
