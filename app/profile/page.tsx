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
        console.log('Début de la récupération des propriétés');
        
        // Vérifier d'abord l'authentification
        const { data: { user }, error: authError } = await supabase.auth.getUser();
        if (authError) {
          console.error('Erreur d\'authentification:', authError);
          throw new Error('Erreur d\'authentification: ' + authError.message);
        }
        
        if (!user) {
          console.error('Aucun utilisateur connecté');
          throw new Error('Vous devez être connecté pour accéder à cette page');
        }

        console.log('Utilisateur authentifié:', user.id);

        const { data, error } = await supabase
          .from('properties')
          .select('*')
          .eq('owner_id', user.id)
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Erreur lors de la récupération des propriétés:', error);
          throw error;
        }

        console.log('Propriétés récupérées avec succès:', data?.length || 0);
        setProperties((data || []).map(property => ({
          id: property.id as string,
          owner_id: property.owner_id as string,
          name: property.name as string,
          address: property.address as string,
          price: property.price as number,
          description: property.description as string,
          investment_goal: property.investment_goal as 'passive_income' | 'capital_growth' | 'portfolio_diversification',
          experience_level: property.experience_level as 'beginner' | 'intermediate' | 'advanced',
          risk_tolerance: property.risk_tolerance as 'conservative' | 'moderate' | 'aggressive',
          investment_horizon: property.investment_horizon as 'short_term' | 'medium_term' | 'long_term',
          available_capital: property.available_capital as number,
          property_type: property.property_type as 'residential' | 'commercial' | 'fix_and_flip' | 'rental',
          created_at: property.created_at as string,
          updated_at: property.updated_at as string
        })));
      } catch (error) {
        console.error('Erreur complète:', error);
        setError(error instanceof Error ? error.message : 'Une erreur est survenue lors de la récupération des propriétés');
      } finally {
        setLoading(false);
      }
    }

    fetchProperties();
  }, []);

  return (
    <AuthGuard>
      <MainLayout>
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold mb-6">Mon Profil</h1>
          
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : error ? (
            <div className="bg-red-50 border border-red-200 rounded-md p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">Erreur</h3>
                  <div className="mt-2 text-sm text-red-700">
                    <p>{error}</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties.length === 0 ? (
                <div className="col-span-full text-center py-8 text-gray-500">
                  Vous n'avez pas encore de propriétés. 
                  <Link href="/profile/add" className="text-blue-600 hover:text-blue-800 ml-2">
                    Ajouter une propriété
                  </Link>
                </div>
              ) : (
                properties.map((property) => (
                  <Card key={property.id}>
                    <div className="p-4">
                      <h2 className="text-xl font-semibold mb-2">{property.name}</h2>
                      <p className="text-gray-600 mb-4">{property.description}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-blue-600 font-medium">
                          {property.price.toLocaleString('fr-FR')} €
                        </span>
                        <Link href={`/profile/property/${property.id}`}>
                          <Button variant="outline">Voir les détails</Button>
                        </Link>
                      </div>
                    </div>
                  </Card>
                ))
              )}
            </div>
          )}
        </div>
      </MainLayout>
    </AuthGuard>
  )
} 