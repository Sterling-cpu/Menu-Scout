import { createClient } from '@supabase/supabase-js'

const url = process.env.SUPABASE_URL
const anonKey = process.env.SUPABASE_ANON_KEY

if (!url || !anonKey) {
  console.warn('WARNING: SUPABASE_URL or SUPABASE_ANON_KEY missing — database features disabled')
}

export const supabase = url && anonKey ? createClient(url, anonKey) : null
