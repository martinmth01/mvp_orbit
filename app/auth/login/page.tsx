// app/auth/login/page.tsx
'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'
import { AuthForm } from '@/app/components'
import RedirectOnLogin from '../RedirectOnLogin'

export default function LoginPage() {
  const handleLogin = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) throw error
      return { error: null }
    } catch (err) {
      console.error('Login failed:', err)
      return { error: err }
    }
  }

  return (
    <>
      <RedirectOnLogin />
      <AuthForm type="login" onSubmit={handleLogin} />
    </>
  )
}