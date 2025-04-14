'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'

export function RedirectOnLogin() {
  const router = useRouter()

  useEffect(() => {
    const check = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      console.log('RedirectOnLogin session:', session)
      if (session) {
        console.log('Redirection triggered')
        router.push('/dashboard')
      }
    }

    // Vérification initiale
    check()

    // Écouter les changements d'état d'authentification
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('Auth state changed:', event, session)
      if (event === 'SIGNED_IN' && session) {
        console.log('Redirection triggered by auth state change')
        router.push('/dashboard')
      }
    })

    // Nettoyage
    return () => {
      subscription.unsubscribe()
    }
  }, [router])

  return null
} 