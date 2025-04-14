// app/auth/login/page.tsx
'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'
import { AuthForm } from '@/app/components'
import { useEffect } from 'react'

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Vérifier si l'utilisateur est déjà connecté
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (session) {
        console.log('Session existante détectée, redirection vers le dashboard')
        const redirectTo = searchParams.get('redirect') || '/dashboard'
        router.push(redirectTo)
      }
    }
    checkSession()
  }, [router, searchParams])

  const handleLogin = async (email: string, password: string) => {
    console.log('Attempting login...')
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      console.log('Login result:', { data, error })

      if (!error) {
        console.log('Login successful. Checking session...')
        const { data: { session } } = await supabase.auth.getSession()
        console.log('Session after login:', session)
        
        if (session) {
          console.log('Session confirmed, redirecting...')
          const redirectTo = searchParams.get('redirect') || '/dashboard'
          router.push(redirectTo)
          router.refresh()
        } else {
          console.error('No session after successful login')
          throw new Error('Erreur lors de la création de la session')
        }
      } else {
        console.error('Login error:', error)
        throw error
      }

      return { error: null }
    } catch (err) {
      console.error('Unexpected error during login:', err)
      return { error: err }
    }
  }

  return <AuthForm type="login" onSubmit={handleLogin} />
}