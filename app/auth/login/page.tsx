// app/auth/login/page.tsx
'use client'

import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'
import { AuthForm } from '@/app/components'
import { useEffect } from 'react'

export default function LoginPage() {
  const router = useRouter()

  useEffect(() => {
    // Vérifier si l'utilisateur est déjà connecté
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (session) {
        console.log('Session existante détectée, redirection vers le dashboard')
        router.push('/dashboard')
      }
    }
    checkSession()
  }, [router])

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
          console.log('Session confirmed, redirecting to dashboard...')
          router.push('/dashboard')
        } else {
          console.error('No session after successful login')
        }
      } else {
        console.error('Login error:', error)
      }

      return { error }
    } catch (err) {
      console.error('Unexpected error during login:', err)
      return { error: err }
    }
  }

  return <AuthForm type="login" onSubmit={handleLogin} />
}