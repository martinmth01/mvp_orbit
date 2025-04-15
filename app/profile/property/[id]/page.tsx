'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { AuthGuard } from '@/components/auth';
import { MainLayout } from '@/components/layout';
import { Card, Button } from '@/components/ui';
import { supabase } from '@/lib/supabaseClient';
import { PropertyData } from '@/types';

export default function PropertyDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const [property, setProperty] = useState<PropertyData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProperty() {
      try {
        const { data: { user }, error: authError } = await supabase.auth.getUser();
        if (authError) throw authError;
        if (!user) throw new Error('Utilisateur non connecté');

        const { data, error } = await supabase
          .from('properties')
          .select('*')
          .eq('id', params.id)
          .eq('owner_id', user.id)
          .single();

        if (error) throw error;
        if (!data) throw new Error('Propriété non trouvée');

        setProperty(data as unknown as PropertyData);
      } catch (err) {
        console.error('Erreur:', err);
        setError(err instanceof Error ? err.message : 'Une erreur est survenue');
      } finally {
        setLoading(false);
      }
    }

    fetchProperty();
  }, [params.id]);

  const handleDelete = async () => {
    if (!property) return;
    
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette propriété ?')) {
      return;
    }

    try {
      const { error } = await supabase
        .from('properties')
        .delete()
        .eq('id', property.id);

      if (error) throw error;
      router.push('/profile');
    } catch (err) {
      console.error('Erreur lors de la suppression:', err);
      setError(err instanceof Error ? err.message : 'Une erreur est survenue lors de la suppression');
    }
  };

  if (loading) {
    return (
      <AuthGuard>
        <MainLayout>
          <div className="flex items-center justify-center min-h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        </MainLayout>
      </AuthGuard>
    );
  }

  if (error) {
    return (
      <AuthGuard>
        <MainLayout>
          <div className="container mx-auto px-4 py-8">
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
          </div>
        </MainLayout>
      </AuthGuard>
    );
  }

  if (!property) {
    return (
      <AuthGuard>
        <MainLayout>
          <div className="container mx-auto px-4 py-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900">Propriété non trouvée</h2>
              <p className="mt-2 text-gray-600">La propriété que vous recherchez n'existe pas ou vous n'avez pas les droits pour y accéder.</p>
              <Button
                onClick={() => router.push('/profile')}
                className="mt-4"
              >
                Retour au profil
              </Button>
            </div>
          </div>
        </MainLayout>
      </AuthGuard>
    );
  }

  return (
    <AuthGuard>
      <MainLayout>
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-3xl mx-auto">
            <div className="flex justify-between items-start mb-6">
              <h1 className="text-2xl font-bold">{property.name}</h1>
              <div className="flex space-x-4">
                <Button
                  variant="outline"
                  onClick={() => router.push(`/profile/property/${property.id}/edit`)}
                >
                  Modifier
                </Button>
                <Button
                  variant="outline"
                  onClick={handleDelete}
                  className="text-red-600 hover:text-red-700"
                >
                  Supprimer
                </Button>
              </div>
            </div>

            <Card className="p-6 space-y-6">
              <div>
                <h2 className="text-lg font-semibold mb-2">Adresse</h2>
                <p className="text-gray-600">{property.address}</p>
              </div>

              <div>
                <h2 className="text-lg font-semibold mb-2">Prix</h2>
                <p className="text-blue-600 font-medium">
                  {property.price.toLocaleString('fr-FR')} €
                </p>
              </div>

              <div>
                <h2 className="text-lg font-semibold mb-2">Description</h2>
                <p className="text-gray-600">{property.description}</p>
              </div>

              <div>
                <h2 className="text-lg font-semibold mb-2">Objectif d'investissement</h2>
                <p className="text-gray-600">
                  {property.investment_goal === 'passive_income' && 'Revenu passif'}
                  {property.investment_goal === 'capital_growth' && 'Croissance du capital'}
                  {property.investment_goal === 'portfolio_diversification' && 'Diversification du portefeuille'}
                </p>
              </div>

              <div>
                <h2 className="text-lg font-semibold mb-2">Niveau d'expérience</h2>
                <p className="text-gray-600">
                  {property.experience_level === 'beginner' && 'Débutant'}
                  {property.experience_level === 'intermediate' && 'Intermédiaire'}
                  {property.experience_level === 'advanced' && 'Avancé'}
                </p>
              </div>

              <div>
                <h2 className="text-lg font-semibold mb-2">Tolérance au risque</h2>
                <p className="text-gray-600">
                  {property.risk_tolerance === 'conservative' && 'Conservateur'}
                  {property.risk_tolerance === 'moderate' && 'Modéré'}
                  {property.risk_tolerance === 'aggressive' && 'Agressif'}
                </p>
              </div>

              <div>
                <h2 className="text-lg font-semibold mb-2">Horizon d'investissement</h2>
                <p className="text-gray-600">
                  {property.investment_horizon === 'short_term' && 'Court terme (1-3 ans)'}
                  {property.investment_horizon === 'medium_term' && 'Moyen terme (3-7 ans)'}
                  {property.investment_horizon === 'long_term' && 'Long terme (7+ ans)'}
                </p>
              </div>

              <div>
                <h2 className="text-lg font-semibold mb-2">Capital disponible</h2>
                <p className="text-blue-600 font-medium">
                  {property.available_capital.toLocaleString('fr-FR')} €
                </p>
              </div>

              <div>
                <h2 className="text-lg font-semibold mb-2">Type de propriété</h2>
                <p className="text-gray-600">
                  {property.property_type === 'residential' && 'Résidentiel'}
                  {property.property_type === 'commercial' && 'Commercial'}
                  {property.property_type === 'fix_and_flip' && 'Rénovation et revente'}
                  {property.property_type === 'rental' && 'Location'}
                </p>
              </div>
            </Card>
          </div>
        </div>
      </MainLayout>
    </AuthGuard>
  );
} 