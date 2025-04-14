import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'
import { User, Session } from '@supabase/supabase-js'

export function useAuth() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)
  const [isRedirecting, setIsRedirecting] = useState(false)

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
        
        if (event === 'SIGNED_IN' && !isRedirecting) {
          console.log('Utilisateur connecté, redirection vers le dashboard')
          setIsRedirecting(true)
          
          // Vérifier si nous sommes déjà sur le dashboard
          if (window.location.pathname !== '/dashboard') {
            // Attendre un court instant avant de rediriger
            setTimeout(() => {
              window.location.href = '/dashboard'
            }, 100)
          }
        } else if (event === 'SIGNED_OUT' && !isRedirecting) {
          console.log('Utilisateur déconnecté, redirection vers la page d\'accueil')
          setIsRedirecting(true)
          
          // Vérifier si nous sommes déjà sur la page d'accueil
          if (window.location.pathname !== '/') {
            // Attendre un court instant avant de rediriger
            setTimeout(() => {
              window.location.href = '/'
            }, 100)
          }
        }
      }
    )

    return () => {
      subscription.unsubscribe()
    }
  }, [isRedirecting])

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
      
      // Vérifier si nous sommes déjà sur la page d'accueil
      if (window.location.pathname !== '/') {
        window.location.href = '/'
      }
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