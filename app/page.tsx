'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { LoginButton } from '@/app/components'

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
    <>
      <header className="w-full p-4 flex justify-end bg-white shadow-sm">
        <LoginButton />
      </header>
      <main className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">
            Orbit Patrimoine
          </h1>
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">
              Test Supabase
            </h2>
            <p className="text-gray-600">
              {dbTest}
            </p>
          </div>
        </div>
      </main>
    </>
  )
}
