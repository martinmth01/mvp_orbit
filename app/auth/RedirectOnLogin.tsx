'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'

export function RedirectOnLogin() {
  const router = useRouter()
  const [shouldRedirect, setShouldRedirect] = useState(false)

  useEffect(() => {
    const check = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      console.log('RedirectOnLogin session:', session)
      if (session) {
        console.log('Redirection triggered')
        setShouldRedirect(true)
      }
    }

    // Vérification initiale
    check()

    // Écouter les changements d'état d'authentification
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('Auth state changed:', event, session)
      if (event === 'SIGNED_IN' && session) {
        console.log('Redirection triggered by auth state change')
        setShouldRedirect(true)
      }
    })

    // Nettoyage
    return () => {
      subscription.unsubscribe()
    }
  }, [])

  // Effet séparé pour la redirection
  useEffect(() => {
    if (shouldRedirect) {
      console.log('Executing redirect to dashboard')
      router.push('/dashboard')
      router.refresh()
    }
  }, [shouldRedirect, router])

  return null
} 