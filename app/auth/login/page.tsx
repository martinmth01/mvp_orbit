// app/auth/login/page.tsx
'use client'

import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'
import { AuthForm } from '@/app/components'

export default function LoginPage() {
  const router = useRouter()

  const handleLogin = async (email: string, password: string) => {
    console.log('Tentative de connexion...')
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    console.log('Résultat de la connexion:', { data, error })

    if (!error) {
      console.log('Connexion réussie, redirection vers le dashboard...')
      // Attendre un court instant pour s'assurer que la session est bien établie
      await new Promise(resolve => setTimeout(resolve, 100))
      window.location.href = '/dashboard'
    } else {
      console.error('Erreur de connexion:', error)
    }

    return { error }
  }

  return <AuthForm type="login" onSubmit={handleLogin} />
}