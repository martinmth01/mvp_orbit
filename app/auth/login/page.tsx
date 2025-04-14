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

    if (!error && data?.session?.access_token) {
      console.log('Login successful. Redirecting to dashboard...')
      await new Promise(resolve => setTimeout(resolve, 100))
      router.push('/dashboard')
    } else {
      console.error('Login error:', error)
    }

    return { error }
  }

  return <AuthForm type="login" onSubmit={handleLogin} />
}