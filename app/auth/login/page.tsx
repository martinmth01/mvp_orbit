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
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (session) {
        const redirectTo = searchParams.get('redirect') || '/dashboard'
        router.push(redirectTo)
      }
    }
    checkSession()
  }, [router, searchParams])

  const handleLogin = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password })

      if (error) throw error

      const { data: { session } } = await supabase.auth.getSession()
      if (!session) throw new Error('Session not established')

      const redirectTo = searchParams.get('redirect') || '/dashboard'
      router.push(redirectTo)

      return { error: null }
    } catch (err) {
      console.error('Login failed:', err)
      return { error: err }
    }
  }

  return <AuthForm type="login" onSubmit={handleLogin} />
}