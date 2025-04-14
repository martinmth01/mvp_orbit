import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'
import { User, Session } from '@supabase/supabase-js'

export function useAuth() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)
  const isRedirectingRef = useRef(false)
  const lastEventRef = useRef<string | null>(null)
  const initialCheckDoneRef = useRef(false)

  useEffect(() => {
    // Vérifier la session actuelle
    const checkSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        setSession(session)
        setUser(session?.user ?? null)
        
        // Ne rediriger que si c'est la première vérification et que l'utilisateur est connecté
        if (!initialCheckDoneRef.current && session && window.location.pathname !== '/dashboard') {
          console.log('Session existante détectée, redirection vers le dashboard')
          window.location.href = '/dashboard'
        }
        
        initialCheckDoneRef.current = true
      } catch (error) {
        console.error('Erreur lors de la vérification de la session:', error)
        initialCheckDoneRef.current = true
      } finally {
        setLoading(false)
      }
    }

    checkSession()

    // Écouter les changements d'authentification
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Événement d\'authentification:', event)
        
        // Éviter les événements en double
        if (event === lastEventRef.current) {
          console.log('Événement en double ignoré:', event)
          return
        }
        
        lastEventRef.current = event
        setSession(session)
        setUser(session?.user ?? null)
        
        if (event === 'SIGNED_IN' && !isRedirectingRef.current) {
          console.log('Utilisateur connecté, redirection vers le dashboard')
          isRedirectingRef.current = true
          
          // Vérifier si nous sommes déjà sur le dashboard
          if (window.location.pathname !== '/dashboard') {
            // Redirection directe
            window.location.href = '/dashboard'
          }
        } else if (event === 'SIGNED_OUT' && !isRedirectingRef.current) {
          console.log('Utilisateur déconnecté, redirection vers la page d\'accueil')
          isRedirectingRef.current = true
          
          // Vérifier si nous sommes déjà sur la page d'accueil
          if (window.location.pathname !== '/') {
            // Redirection directe
            window.location.href = '/'
          }
        }
      }
    )

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const signIn = async (email: string, password: string) => {
    try {
      // Réinitialiser l'état de redirection
      isRedirectingRef.current = false
      lastEventRef.current = null
      
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
      // Réinitialiser l'état de redirection
      isRedirectingRef.current = false
      lastEventRef.current = null
      
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