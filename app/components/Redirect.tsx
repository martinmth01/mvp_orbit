'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

type RedirectProps = {
  to: string
  replace?: boolean
}

export function Redirect({ to, replace = false }: RedirectProps) {
  const router = useRouter()

  useEffect(() => {
    // Utiliser les deux méthodes pour maximiser les chances de redirection
    console.log(`Redirection vers ${to} initiée...`)

    try {
      // Méthode 1: Router Next.js
      if (replace) {
        router.replace(to)
      } else {
        router.push(to)
      }
      
      // Méthode 2: Navigation directe du navigateur (fallback)
      setTimeout(() => {
        console.log(`Redirection de secours vers ${to}`)
        if (replace) {
          window.location.replace(to)
        } else {
          window.location.href = to
        }
      }, 300)
    } catch (error) {
      console.error('Erreur lors de la redirection:', error)
      // En cas d'erreur, utiliser la navigation native
      window.location.href = to
    }
  }, [to, replace, router])

  return null
} 