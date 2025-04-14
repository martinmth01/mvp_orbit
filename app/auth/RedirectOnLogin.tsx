'use client'

import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'

const waitForSession = async (maxTries = 10, delay = 150): Promise<any | null> => {
  for (let i = 0; i < maxTries; i++) {
    const { data: { session } } = await supabase.auth.getSession()
    if (session) return session
    await new Promise((res) => setTimeout(res, delay))
  }
  return null
}

export default function RedirectOnLogin() {
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const checkAndRedirect = async () => {
      try {
        const session = await waitForSession()
        if (session) {
          const redirectTo = searchParams.get('redirect') || '/dashboard'
          console.log('Session active, redirection vers:', redirectTo)
          router.push(redirectTo)
        }
      } catch (error) {
        console.error('Erreur lors de la vérification de la session:', error)
      }
    }

    checkAndRedirect()
  }, [router, searchParams])

  return null
} 