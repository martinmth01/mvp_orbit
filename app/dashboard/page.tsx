'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [sessionChecked, setSessionChecked] = useState(false)

  useEffect(() => {
    let mounted = true

    const getUser = async () => {
      try {
        // Attendre que la session soit initialisée
        const { data: { session }, error: sessionError } = await supabase.auth.getSession()
        
        if (!mounted) return

        if (sessionError) {
          console.error('Erreur lors de la récupération de la session:', sessionError)
          if (!sessionChecked) {
            router.push('/auth/login')
          }
          return
        }

        if (!session) {
          console.log('Aucune session trouvée, redirection vers login')
          if (!sessionChecked) {
            router.push('/auth/login')
          }
          return
        }

        // Récupérer les informations de l'utilisateur
        const { data: { user }, error: userError } = await supabase.auth.getUser()
        
        if (!mounted) return

        if (userError) {
          console.error('Erreur lors de la récupération de l\'utilisateur:', userError)
          if (!sessionChecked) {
            router.push('/auth/login')
          }
          return
        }

        setUser(user)
        setSessionChecked(true)
      } catch (error) {
        console.error('Erreur inattendue:', error)
        if (!sessionChecked) {
          router.push('/auth/login')
        }
      } finally {
        if (mounted) {
          setLoading(false)
        }
      }
    }

    getUser()

    return () => {
      mounted = false
    }
  }, [router, sessionChecked])

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut()
      router.push('/')
      router.refresh()
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
          >
            Se déconnecter
          </button>
        </div>
        {user && (
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Informations utilisateur</h2>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>ID:</strong> {user.id}</p>
          </div>
        )}
      </div>
    </div>
  )
}
