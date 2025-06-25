import { supabase } from './supabaseClient'

export interface Reservation {
  id: number
  created_at: string
  code: string
  logger_id: number | null
  customer_username: string | null
  customer_name: string | null
  customer_phone: string | null
  customer_mobile: string | null
  customer_email: string | null
  reservation_date: string
  number_of_people: number
  table_number: string | null
  special_requests: string | null
  status: string
  user_id: number | null
}

export interface CreateReservationInput {
  logger_id: number | null
  customer_username: string | null
  customer_name: string | null
  customer_phone: string | null
  customer_mobile: string | null
  customer_email: string | null
  reservation_date: Date | string
  number_of_people: number
  table_number: string | null
  special_requests: string | null
  status?: string
  user_id: number | null
  created_at?: string
}

export interface ReservationResponse {
  success: boolean
  data?: Reservation
  error?: string
}

function generateCode(): string {
  const digits = Math.floor(10000 + Math.random() * 90000)
  const letter = String.fromCharCode(65 + Math.floor(Math.random() * 26))
  return `${digits}${letter}`
}

export async function createReservation(
  input: CreateReservationInput
): Promise<ReservationResponse> {
  const code = generateCode()
  const record = {
    ...input,
    code,
    status: input.status ?? 'pending',
    reservation_date:
      typeof input.reservation_date === 'string'
        ? input.reservation_date
        : input.reservation_date.toISOString(),
    created_at: input.created_at ?? new Date().toISOString()
  }

  const { data, error } = await supabase
    .from('reservations')
    .insert(record)
    .select()
    .single()

  if (error) {
    return { success: false, error: error.message }
  }

  return { success: true, data: data as Reservation }
}

export async function findReservationByCode(code: string): Promise<ReservationResponse> {
  const { data, error } = await supabase
    .from('reservations')
    .select('*')
    .eq('code', code)
    .single()

  if (error || !data) {
    return { success: false, error: error ? error.message : 'Reserva no encontrada' }
  }

  return { success: true, data: data as Reservation }
}
