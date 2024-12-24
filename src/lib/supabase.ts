import { createClient } from '@supabase/supabase-js'

// Using the values directly since they're public anyway
const supabaseUrl = 'https://ievbvaaferqimwvbjhjj.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlldmJ2YWFmZXJxaW13dmJqaGpqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ3ODgyMzEsImV4cCI6MjA1MDM2NDIzMX0.fgwgdIKhMKElDiAF5bL4isM2LEJnX4F6ntyS4NKZT_g'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
