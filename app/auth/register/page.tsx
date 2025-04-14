// app/auth/register/page.tsx
'use client'

import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'
import { AuthForm } from '@/app/components'

export default function RegisterPage() {
  const router = useRouter()

  const handleRegister = async (email: string, password: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    })

    if (!error) {
      router.push('/dashboard')
      router.refresh()
    }

    return { error }
  }

  return <AuthForm type="register" onSubmit={handleRegister} />
}