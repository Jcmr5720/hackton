import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://gnxcibehjpvagydkntwt.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdueGNpYmVoanB2YWd5ZGtudHd0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA4MjM2OTUsImV4cCI6MjA2NjM5OTY5NX0.yOFoSzt16Otr2Zk6ki9fE1Rqc4ResCiXcW7LIYm5_BE'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export interface Logger {
  id: string
  username: string
  user: string
  role: string
  email: string
  password: string
  phone: string
  birth_date: string
  address: string
  accepted_terms: boolean
  registration_ip: string
  last_ip: string | null
  last_login: string | null
  country: string
  city: string
  registration_date: string
}

export async function createLogger(data: Omit<Logger, 'id' | 'registration_date' | 'last_ip' | 'last_login'> & Partial<Pick<Logger, 'id' | 'registration_date' | 'last_ip' | 'last_login' | 'role'>>): Promise<Logger> {
  const record = { ...data, role: data.role ?? 'user' }
  const { data: inserted, error } = await supabase
    .from('logger')
    .insert(record)
    .select()
    .single()
  if (error) throw error
  return inserted as Logger
}

export async function getLogger(id: string): Promise<Logger> {
  const { data, error } = await supabase.from('logger').select('*').eq('id', id).single()
  if (error) throw error
  return data as Logger
}

export async function updateLogger(id: string, updates: Partial<Omit<Logger, 'id'>>): Promise<Logger> {
  const { data, error } = await supabase
    .from('logger')
    .update(updates)
    .eq('id', id)
    .select()
    .single()
  if (error) throw error
  return data as Logger
}

export async function deleteLogger(id: string): Promise<void> {
  const { error } = await supabase.from('logger').delete().eq('id', id)
  if (error) throw error
}
