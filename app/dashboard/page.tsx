'use client'

import { AuthGuard } from '@/components/auth'
import { MainLayout } from '@/components/layout'
import { Card, Button } from '@/components/ui'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { PropertyData } from '@/types'
import Link from 'next/link'

export default function DashboardPage() {
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
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Une erreur est survenue')
      } finally {
        setLoading(false)
      }
    }

    fetchProperties()
  }, [])

  return (
    <AuthGuard>
      <MainLayout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Tableau de bord</h1>
            <Link href="/dashboard/add">
              <Button>Ajouter une propriété</Button>
            </Link>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Chargement des propriétés...</p>
            </div>
          ) : error ? (
            <Card>
              <div className="text-red-600">{error}</div>
            </Card>
          ) : properties.length === 0 ? (
            <Card>
              <div className="text-center py-12">
                <p className="text-gray-600">Aucune propriété trouvée</p>
                <Link href="/dashboard/add" className="mt-4 inline-block">
                  <Button>Ajouter votre première propriété</Button>
                </Link>
              </div>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties.map((property) => (
                <Link key={property.id} href={`/dashboard/property/${property.id}`}>
                  <Card className="h-full hover:shadow-lg transition-shadow">
                    <div className="p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {property.name}
                      </h3>
                      <p className="text-gray-600 mb-4">{property.address}</p>
                      <div className="flex justify-between text-sm text-gray-500">
                        <span>Type: {property.type}</span>
                        <span>Surface: {property.surface}m²</span>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </MainLayout>
    </AuthGuard>
  )
}
