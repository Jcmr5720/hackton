import { Router } from 'express'
import { supabase } from '../supabaseClient.js'

const router = Router()

router.post('/', async (req, res) => {
  try {
    const {
      customer_name,
      customer_phone,
      customer_mobile,
      customer_email,
      reservation_date,
      number_of_people,
      special_requests,
    } = req.body

    const { data, error } = await supabase
      .from('reservations')
      .insert([
        {
          customer_name,
          customer_phone,
          customer_mobile,
          customer_email,
          reservation_date,
          number_of_people,
          special_requests,
          status: 'pending',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ])
      .select('id')
      .single()

    if (error) throw error

    res.json({ reservation_id: data.id })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Error procesando la reserva' })
  }
})

export default router
