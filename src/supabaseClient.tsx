import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://gnxcibehjpvagydkntwt.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdueGNpYmVoanB2YWd5ZGtudHd0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA4MjM2OTUsImV4cCI6MjA2NjM5OTY5NX0.yOFoSzt16Otr2Zk6ki9fE1Rqc4ResCiXcW7LIYm5_BE'

export const API_URL = 'http://localhost:5173'

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
export default supabase

export { supabase }
