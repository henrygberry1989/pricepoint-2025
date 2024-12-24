'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { AuthModal } from '@/components/auth-modal'
import { Toaster } from 'react-hot-toast'
import toast from 'react-hot-toast'
import Image from 'next/image'

interface Lead {
  id: string
  email: string
  objective: string
  metric_goal: string
  budget: string
  phone_region: string
  phone_number: string
  company_url: string
  created_at: string
  completed: boolean
  is_read: boolean
}

export default function AdminDashboard() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [selectedLeads, setSelectedLeads] = useState<string[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [showActions, setShowActions] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession()
    if (session) {
      setIsAuthenticated(true)
      fetchLeads()
    } else {
      setShowAuthModal(true)
    }
    setLoading(false)
  }

  const fetchLeads = async () => {
    try {
      const { data: submissions, error } = await supabase
        .from('new_submissions')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error

      setLeads(submissions || [])
      toast.success('Data loaded successfully')
    } catch (error) {
      console.error('Error fetching leads:', error)
      toast.error('Failed to load data. Please try refreshing the page.')
    }
  }

  const getObjectivePillColor = (objective: string) => {
    const colors: { [key: string]: { bg: string; text: string } } = {
      'Improving Pricing & Customer LTV': { bg: 'bg-blue-100', text: 'text-blue-800' },
      'Improve Onboarding / Aha! Moments': { bg: 'bg-purple-100', text: 'text-purple-800' },
      'Paid Growth Channels aren\'t Profitable': { bg: 'bg-amber-100', text: 'text-amber-800' },
      'Decrease Churn': { bg: 'bg-red-100', text: 'text-red-800' },
      'Looking for New Growth Channels': { bg: 'bg-green-100', text: 'text-green-800' },
    }
    return colors[objective] || { bg: 'bg-gray-100', text: 'text-gray-800' }
  }

  const getBudgetPillColor = (budget: string) => {
    const colors: { [key: string]: { bg: string; text: string } } = {
      '$5k-$10k': { bg: 'bg-emerald-100', text: 'text-emerald-800' },
      '$10k-$25k': { bg: 'bg-blue-100', text: 'text-blue-800' },
      '$25k-$50k': { bg: 'bg-purple-100', text: 'text-purple-800' },
      '$50k+': { bg: 'bg-indigo-100', text: 'text-indigo-800' },
    }
    return colors[budget] || { bg: 'bg-gray-100', text: 'text-gray-800' }
  }

  const handleSearch = (term: string) => {
    setSearchTerm(term)
  }

  const filteredLeads = leads.filter(lead => {
    const searchLower = searchTerm.toLowerCase()
    return (
      lead.email.toLowerCase().includes(searchLower) ||
      lead.company_url.toLowerCase().includes(searchLower) ||
      lead.objective.toLowerCase().includes(searchLower) ||
      lead.metric_goal.toLowerCase().includes(searchLower) ||
      lead.budget.toLowerCase().includes(searchLower)
    )
  })

  const handleSelectLead = (id: string) => {
    setSelectedLeads(prev => {
      const newSelection = prev.includes(id) 
        ? prev.filter(leadId => leadId !== id)
        : [...prev, id]
      setShowActions(newSelection.length > 0)
      return newSelection
    })
  }

  const handleSelectAll = () => {
    if (selectedLeads.length === filteredLeads.length) {
      setSelectedLeads([])
      setShowActions(false)
    } else {
      setSelectedLeads(filteredLeads.map(lead => lead.id))
      setShowActions(true)
    }
  }

  const markAsRead = async () => {
    const { error } = await supabase
      .from('new_submissions')
      .update({ is_read: true })
      .in('id', selectedLeads)

    if (error) {
      toast.error('Failed to update leads')
      return
    }

    await fetchLeads()
    setSelectedLeads([])
    setShowActions(false)
    toast.success('Leads marked as read')
  }

  const deleteLeads = async () => {
    const { error } = await supabase
      .from('new_submissions')
      .delete()
      .in('id', selectedLeads)

    if (error) {
      toast.error('Failed to delete leads')
      return
    }

    await fetchLeads()
    setSelectedLeads([])
    setShowActions(false)
    toast.success('Leads deleted successfully')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F9F8F6] flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#EA592D]"></div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <Toaster position="top-right" />
      
      {showAuthModal && (
        <AuthModal
          onClose={() => router.push('/')}
          onAuthenticated={() => {
            setIsAuthenticated(true)
            setShowAuthModal(false)
            fetchLeads()
          }}
        />
      )}

      {isAuthenticated && (
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-3">
              <h1 className="text-xl font-semibold text-gray-900">Growth Funnel Leads</h1>
              <span className="text-xl font-normal text-gray-400">{filteredLeads.length}</span>
            </div>
            <div className="flex items-center gap-4">
              {showActions && (
                <div className="flex gap-2">
                  <button
                    onClick={markAsRead}
                    className="px-3 py-1.5 text-sm text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50"
                  >
                    Mark as Read
                  </button>
                  <button
                    onClick={deleteLeads}
                    className="px-3 py-1.5 text-sm text-red-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50"
                  >
                    Delete
                  </button>
                </div>
              )}
              <button className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50">
                <svg className="w-5 h-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
                </svg>
              </button>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search contacts"
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <svg className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow">
            <div className="grid grid-cols-[auto_1.5fr_1fr_1fr_1fr_1fr_1fr] gap-4 px-6 py-3 border-b border-gray-200 text-sm text-gray-500 divide-x divide-gray-200">
              <div className="flex items-center gap-4">
                <input
                  type="checkbox"
                  checked={selectedLeads.length === filteredLeads.length}
                  onChange={handleSelectAll}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span>Contact</span>
              </div>
              <div>Email</div>
              <div>Phone</div>
              <div className="text-center pl-4">Company</div>
              <div className="text-center pl-4">Improvement Goal</div>
              <div className="text-center pl-4">Budget</div>
              <div className="text-center pl-4">Key Objective</div>
            </div>

            {filteredLeads.map((lead) => {
              const { bg, text } = getObjectivePillColor(lead.objective)
              const { bg: budgetBg, text: budgetText } = getBudgetPillColor(lead.budget)
              return (
                <div
                  key={lead.id}
                  className="grid grid-cols-[auto_1.5fr_1fr_1fr_1fr_1fr_1fr] gap-4 px-6 py-4 border-b border-gray-100 text-sm items-center hover:bg-gray-50 divide-x divide-gray-200"
                >
                  <div className="flex items-center gap-4">
                    <input
                      type="checkbox"
                      checked={selectedLeads.includes(lead.id)}
                      onChange={() => handleSelectLead(lead.id)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <button className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-gray-600">
                      {lead.email.charAt(0).toUpperCase()}
                    </button>
                  </div>
                  <div className={`text-center text-gray-900 ${!lead.is_read ? 'font-semibold' : ''}`}>
                    {lead.email}
                  </div>
                  <div className={`text-center text-gray-600 ${!lead.is_read ? 'font-semibold' : ''}`}>
                    {lead.phone_region} {lead.phone_number}
                  </div>
                  <div className="text-center text-gray-600">
                    {lead.company_url}
                  </div>
                  <div className="text-center">
                    <span className="inline-flex items-center px-3 py-1 rounded-md text-xs font-medium bg-blue-100 text-blue-800">
                      {lead.metric_goal}
                    </span>
                  </div>
                  <div className="text-center">
                    <span className={`inline-flex items-center px-3 py-1 rounded-md text-xs font-medium ${budgetBg} ${budgetText}`}>
                      {lead.budget}
                    </span>
                  </div>
                  <div className="text-center">
                    <span className={`inline-flex items-center px-3 py-1 rounded-md text-xs font-medium whitespace-nowrap ${bg} ${text}`}>
                      {lead.objective}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </main>
  )
}
