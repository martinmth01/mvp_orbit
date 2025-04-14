'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { Redirect } from '@/app/components/Redirect'

export function RedirectOnLogin() {
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

  // Si l'utilisateur est connecté, on redirige
  if (shouldRedirect) {
    return <Redirect to="/dashboard" />
  }

  return null
} 