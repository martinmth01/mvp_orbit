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
    check()
  }, [router])

  return null
} 