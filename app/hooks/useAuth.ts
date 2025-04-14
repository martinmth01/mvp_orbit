import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'
import { User, Session } from '@supabase/supabase-js'

export function useAuth() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Vérifier la session actuelle
    const checkSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        setSession(session)
        setUser(session?.user ?? null)
      } catch (error) {
        console.error('Erreur lors de la vérification de la session:', error)
      } finally {
        setLoading(false)
      }
    }

    checkSession()

    // Écouter les changements d'authentification
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Événement d\'authentification:', event)
        setSession(session)
        setUser(session?.user ?? null)
        
        if (event === 'SIGNED_IN') {
          console.log('Utilisateur connecté, redirection vers le dashboard')
          router.push('/dashboard')
        } else if (event === 'SIGNED_OUT') {
          console.log('Utilisateur déconnecté, redirection vers la page d\'accueil')
          router.push('/')
        }
      }
    )

    return () => {
      subscription.unsubscribe()
    }
  }, [router])

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      
      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.error('Erreur de connexion:', error)
      return { data: null, error }
    }
  }

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      router.push('/')
    } catch (error) {
      console.error('Erreur de déconnexion:', error)
    }
  }

  return {
    user,
    session,
    loading,
    signIn,
    signOut,
  }
} 