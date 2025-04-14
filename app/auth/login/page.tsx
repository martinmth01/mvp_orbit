// app/auth/login/page.tsx
'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'
import { AuthForm } from '@/app/components'
import { useEffect } from 'react'

const waitForSession = async (maxTries = 10, delay = 150): Promise<any | null> => {
  for (let i = 0; i < maxTries; i++) {
    const { data: { session } } = await supabase.auth.getSession()
    if (session) return session
    await new Promise((res) => setTimeout(res, delay))
  }
  return null
}

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const checkSession = async () => {
      const session = await waitForSession()
      if (session) {
        const redirectTo = searchParams.get('redirect') || '/dashboard'
        router.push(redirectTo)
      }
    }
    checkSession()
  }, [router, searchParams])

  const handleLogin = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) throw error

      const session = await waitForSession()
      if (!session) throw new Error('Session was not ready after login')

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