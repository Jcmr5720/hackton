import { supabase } from './supabaseClient'

async function sha256(message: string): Promise<string> {
  const data = new TextEncoder().encode(message)
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  return Array.from(new Uint8Array(hashBuffer))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('')
}

export type Logger = {
  id: number
  username: string | null
  user: string | null
  role: string | null
  email: string | null
  password: string | null
  phone: string | null
  birth_date: string | null
  address: string | null
  accepted_terms: boolean | null
  registration_ip: string | null
  last_ip: string | null
  last_login: string | null
  country: string | null
  city: string | null
  registration_date: string | null
}

export interface RegistrationData {
  username: string
  user: string
  email: string
  password: string
  phone: string
  birth_date: string
  address: string
  accepted_terms: boolean
  registration_ip: string
  country: string
  city: string
}

export interface AuthUser extends Omit<Logger, 'password'> {}

export async function registerUser(data: RegistrationData): Promise<AuthUser> {
  const passwordHash = await sha256(data.password)
  const { data: inserted, error } = await supabase
    .from('logger')
    .insert({
      username: data.username,
      user: data.user,
      role: 'user',
      email: data.email,
      password: passwordHash,
      phone: data.phone,
      birth_date: data.birth_date,
      address: data.address,
      accepted_terms: data.accepted_terms,
      registration_ip: data.registration_ip,
      country: data.country,
      city: data.city
    })
    .select()
    .single()
  if (error) throw error
  const { password, ...rest } = inserted as Logger
  return rest
}

export async function loginUser(email: string, password: string, ip: string): Promise<AuthUser> {
  const passwordHash = await sha256(password)
  const { data: user, error } = await supabase.from('logger').select('*').eq('email', email).single()
  if (error) throw error
  if (!user || user.password !== passwordHash) throw new Error('Invalid credentials')
  const { data: updated, error: updateError } = await supabase
    .from('logger')
    .update({ last_ip: ip, last_login: new Date().toISOString() })
    .eq('id', user.id)
    .select()
    .single()
  if (updateError) throw updateError
  const { password: pwd, ...rest } = updated as Logger
  return rest
}
