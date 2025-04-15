'use client'

import { AuthGuard } from '@/components/auth'
import { MainLayout } from '@/components/layout'
import { Card, Button } from '@/components/ui'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { PropertyData } from '@/types'
import Link from 'next/link'

export default function ProfilePage() {
  const [properties, setProperties] = useState<PropertyData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchProperties() {
      try {
        const { data, error } = await supabase
          .from('properties')
          .select('*')
          .order('created_at', { ascending: false })

        if (error) throw error

        setProperties(data || [])
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Une erreur est survenue')
      } finally {
        setLoading(false)
      }
    }

    fetchProperties()
  }, [])

  return (
    <AuthGuard>
      <MainLayout>
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold mb-6">Mon Profil</h1>
          
          {loading ? (
            <div>Chargement...</div>
          ) : error ? (
            <div className="text-red-500">{error}</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties.map((property) => (
                <Card key={property.id}>
                  <div className="p-4">
                    <h2 className="text-xl font-semibold mb-2">{property.name}</h2>
                    <p className="text-gray-600 mb-4">{property.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-blue-600 font-medium">
                        {property.price.toLocaleString('fr-FR')} €
                      </span>
                      <Link href={`/properties/${property.id}`}>
                        <Button variant="outline">Voir les détails</Button>
                      </Link>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </MainLayout>
    </AuthGuard>
  )
} 