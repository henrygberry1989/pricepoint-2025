'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import toast from 'react-hot-toast'

interface AuthModalProps {
  onClose: () => void
  onAuthenticated: () => void
}

export function AuthModal({ onClose, onAuthenticated }: AuthModalProps) {
  const [isSignUp, setIsSignUp] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [adminToken, setAdminToken] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const ADMIN_TOKEN = 'xK9#mP2$vL5nQ8@jR3hT6*wY4cF7bN9d'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      if (isSignUp) {
        if (adminToken !== ADMIN_TOKEN) {
          toast.error('Invalid admin token. Please check and try again.')
          return
        }

        if (password.length < 6) {
          toast.error('Password must be at least 6 characters long')
          return
        }

        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              is_admin: true
            }
          }
        })

        if (error) {
          if (error.message.includes('email')) {
            toast.error('Invalid email format or email already in use')
          } else if (error.message.includes('password')) {
            toast.error('Password is too weak. Please use a stronger password')
          } else {
            toast.error(error.message)
          }
          return
        }

        toast.success('Account created successfully! You can now sign in.')
        setIsSignUp(false)
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password
        })

        if (error) {
          if (error.message.includes('Invalid login credentials')) {
            toast.error('Invalid email or password')
          } else {
            toast.error(error.message)
          }
          return
        }

        toast.success('Signed in successfully!')
        onAuthenticated()
      }
    } catch (error) {
      toast.error('An unexpected error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-md w-full p-6">
        <h2 className="text-2xl font-playfair mb-6">
          {isSignUp ? 'Create Admin Account' : 'Sign In'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EA592D]"
              required
              disabled={isLoading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EA592D]"
              required
              disabled={isLoading}
              minLength={6}
            />
          </div>

          {isSignUp && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Admin Token
              </label>
              <input
                type="password"
                value={adminToken}
                onChange={(e) => setAdminToken(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EA592D]"
                required
                disabled={isLoading}
              />
            </div>
          )}

          <div className="flex justify-between items-center pt-2">
            <button
              type="button"
              onClick={() => {
                setIsSignUp(!isSignUp)
                setEmail('')
                setPassword('')
                setAdminToken('')
              }}
              className="text-sm text-gray-600 hover:text-gray-900"
              disabled={isLoading}
            >
              {isSignUp ? 'Already have an account?' : 'Need an account?'}
            </button>

            <div className="space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900"
                disabled={isLoading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm bg-[#EA592D] text-white rounded-lg hover:bg-[#d54d24] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {isSignUp ? 'Creating Account...' : 'Signing In...'}
                  </span>
                ) : (
                  isSignUp ? 'Create Account' : 'Sign In'
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
