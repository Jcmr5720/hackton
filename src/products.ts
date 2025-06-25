import { supabase } from './supabaseClient'

export interface Product {
  id: number
  image: string
  title: string
  description: string
  price: number
}

export async function getProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('id, image, title, description, price')

  if (error) throw error
  return (data as Product[]) || []
}
