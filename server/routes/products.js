import { Router } from 'express'
import { supabase } from '../supabaseClient.js'

const router = Router()

router.get('/', async (_req, res) => {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('id, image, title, description, price')
      .eq('active', true)
      .order('id')
    if (error) throw error
    res.json(data)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to fetch products' })
  }
})

export default router
