// app/auth/login/page.tsx
'use client'

import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'
import { AuthForm } from '@/app/components'

export default function LoginPage() {
  const router = useRouter()

  const handleLogin = async (email: string, password: string) => {
    console.log('Attempting login...')
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      console.log('Login result:', { data, error })

      if (!error) {
        console.log('Login successful. Redirecting to dashboard...')
        // Forcer un rechargement complet de la page
        document.location.href = '/dashboard'
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