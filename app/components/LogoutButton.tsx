'use client'

import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'

export default function LogoutButton() {
  const router = useRouter()

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      
      // Redirection vers la page d'accueil après déconnexion
      router.push('/')
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error)
    }
  }

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors duration-200"
    >
      Se déconnecter
    </button>
  )
} 