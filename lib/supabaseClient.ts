// lib/supabaseClient.ts
import { createClient } from '@supabase/supabase-js'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

// Client optimisé pour Next.js qui utilise les cookies au lieu de localStorage
export const createSupabaseBrowserClient = () => {
  return createClientComponentClient()
}

// Client avec localStorage pour le côté client uniquement
const isBrowser = typeof window !== 'undefined'

// Créer le client avec localStorage (pour maintenir la compatibilité avec le code existant)
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    flowType: 'pkce',
    debug: process.env.NODE_ENV === 'development',
    storage: isBrowser ? {
      getItem: (key) => {
        try {
          const itemStr = localStorage.getItem(key)
          if (!itemStr) return null
          const item = JSON.parse(itemStr)
          const now = new Date()
          if (now.getTime() > item.expiry) {
            localStorage.removeItem(key)
            return null
          }
          return item.value
        } catch (error) {
          if (process.env.NODE_ENV === 'development') {
            console.error('Error reading from localStorage:', error)
          }
          return null
        }
      },
      setItem: (key, value) => {
        try {
          const item = {
            value,
            expiry: new Date().getTime() + 24 * 60 * 60 * 1000 // 24 heures
          }
          localStorage.setItem(key, JSON.stringify(item))
        } catch (error) {
          if (process.env.NODE_ENV === 'development') {
            console.error('Error writing to localStorage:', error)
          }
        }
      },
      removeItem: (key) => {
        try {
          localStorage.removeItem(key)
        } catch (error) {
          if (process.env.NODE_ENV === 'development') {
            console.error('Error removing from localStorage:', error)
          }
        }
      }
    } : undefined  // Pas de stockage pour le SSR
  }
})