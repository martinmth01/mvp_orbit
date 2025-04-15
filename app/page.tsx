'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { MainLayout } from '@/components/layout'
import { Card } from '@/components/ui'
import Link from 'next/link'

export default function Home() {
  const [dbTest, setDbTest] = useState<string>('Test de connexion en cours...')

  useEffect(() => {
    async function testConnection() {
      try {
        const { data, error } = await supabase
          .from('test')
          .select('*')
          .limit(1)

        if (error) {
          setDbTest('Erreur de connexion : ' + error.message)
          return
        }

        setDbTest('Connexion réussie !')
      } catch (err) {
        setDbTest('Erreur : ' + (err as Error).message)
      }
    }

    testConnection()
  }, [])

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Orbit Patrimoine
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Votre assistant conversationnel pour investisseurs immobiliers. Gérez vos propriétés, 
            obtenez des conseils personnalisés et optimisez votre portefeuille immobilier.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <Card title="Gestion de propriétés" className="text-center">
            <p className="text-gray-600 mb-4">
              Ajoutez, modifiez et suivez vos propriétés en un seul endroit.
            </p>
            <Link href="/profile" className="text-blue-600 hover:text-blue-800 font-medium">
              Accéder au profil →
            </Link>
          </Card>

          <Card title="Conseils personnalisés" className="text-center">
            <p className="text-gray-600 mb-4">
              Recevez des recommandations adaptées à votre situation et vos objectifs.
            </p>
            <Link href="/chat" className="text-blue-600 hover:text-blue-800 font-medium">
              Démarrer une conversation →
            </Link>
          </Card>

          <Card title="Ressources" className="text-center">
            <p className="text-gray-600 mb-4">
              Accédez à des articles et guides pour approfondir vos connaissances.
            </p>
            <Link href="/blog" className="text-blue-600 hover:text-blue-800 font-medium">
              Explorer les ressources →
            </Link>
          </Card>
        </div>

        <Card className="bg-blue-50 border-blue-100">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-blue-800 mb-2">
              Test de connexion à la base de données
            </h2>
            <p className="text-blue-600">
              {dbTest}
            </p>
          </div>
        </Card>
      </div>
    </MainLayout>
  )
}
