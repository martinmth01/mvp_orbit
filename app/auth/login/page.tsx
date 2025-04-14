// app/auth/login/page.tsx
'use client'

import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'
import { AuthForm } from '@/app/components'

export default function LoginPage() {
  const router = useRouter()

  const handleLogin = async (email: string, password: string) => {
    console.log('Attempting login...')
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    console.log('Login result:', { data, error })

    if (!error) {
      console.log('Login successful. Redirecting to dashboard...')
      // Attendre que la session soit établie
      const { data: { session } } = await supabase.auth.getSession()
      if (session) {
        // Utiliser window.location pour une redirection complète
        window.location.href = '/dashboard'
      } else {
        console.error('No session after successful login')
      }
    } else {
      console.error('Login error:', error)
    }

    return { error }
  }

  return <AuthForm type="login" onSubmit={handleLogin} />
}