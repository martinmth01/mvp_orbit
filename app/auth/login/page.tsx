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
      router.push('/dashboard')
      router.refresh()
    } else {
      console.error('Erreur de connexion:', error)
    }

    return { error }
  }

  return <AuthForm type="login" onSubmit={handleLogin} />
}