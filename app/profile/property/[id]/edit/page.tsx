'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { AuthGuard } from '@/components/auth';
import { MainLayout } from '@/components/layout';
import { Card, Button } from '@/components/ui';
import { supabase } from '@/lib/supabaseClient';
import { PropertyData } from '@/types';

const EditPropertyPage = () => {
  const params = useParams();
  const router = useRouter();
  const [property, setProperty] = useState<PropertyData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!property) return;

    setSaving(true);
    setError(null);

    try {
      const formData = new FormData(e.currentTarget);
      const updates = {
        name: formData.get('name'),
        address: formData.get('address'),
        price: parseFloat(formData.get('price') as string),
        description: formData.get('description'),
        investment_goal: formData.get('investment_goal'),
        experience_level: formData.get('experience_level'),
        risk_tolerance: formData.get('risk_tolerance'),
        investment_horizon: formData.get('investment_horizon'),
        available_capital: parseFloat(formData.get('available_capital') as string),
        property_type: formData.get('property_type'),
        updated_at: new Date().toISOString(),
      };

      const { error } = await supabase
        .from('properties')
        .update(updates)
        .eq('id', property.id);

      if (error) throw error;

      router.push(`/profile/property/${property.id}`);
    } catch (err) {
      console.error('Erreur lors de la mise à jour:', err);
      setError(err instanceof Error ? err.message : 'Une erreur est survenue lors de la mise à jour');
    } finally {
      setSaving(false);
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
          <div className="max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Modifier la propriété</h1>
            
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Nom de la propriété
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  defaultValue={property.name}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                  Adresse
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  defaultValue={property.address}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                  Prix
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  defaultValue={property.price}
                  required
                  min="0"
                  step="0.01"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  defaultValue={property.description}
                  rows={3}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label htmlFor="investment_goal" className="block text-sm font-medium text-gray-700">
                  Objectif d'investissement
                </label>
                <select
                  id="investment_goal"
                  name="investment_goal"
                  defaultValue={property.investment_goal}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                >
                  <option value="passive_income">Revenu passif</option>
                  <option value="capital_growth">Croissance du capital</option>
                  <option value="portfolio_diversification">Diversification du portefeuille</option>
                </select>
              </div>

              <div>
                <label htmlFor="experience_level" className="block text-sm font-medium text-gray-700">
                  Niveau d'expérience
                </label>
                <select
                  id="experience_level"
                  name="experience_level"
                  defaultValue={property.experience_level}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                >
                  <option value="beginner">Débutant</option>
                  <option value="intermediate">Intermédiaire</option>
                  <option value="advanced">Avancé</option>
                </select>
              </div>

              <div>
                <label htmlFor="risk_tolerance" className="block text-sm font-medium text-gray-700">
                  Tolérance au risque
                </label>
                <select
                  id="risk_tolerance"
                  name="risk_tolerance"
                  defaultValue={property.risk_tolerance}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                >
                  <option value="conservative">Conservateur</option>
                  <option value="moderate">Modéré</option>
                  <option value="aggressive">Agressif</option>
                </select>
              </div>

              <div>
                <label htmlFor="investment_horizon" className="block text-sm font-medium text-gray-700">
                  Horizon d'investissement
                </label>
                <select
                  id="investment_horizon"
                  name="investment_horizon"
                  defaultValue={property.investment_horizon}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                >
                  <option value="short_term">Court terme (1-3 ans)</option>
                  <option value="medium_term">Moyen terme (3-7 ans)</option>
                  <option value="long_term">Long terme (7+ ans)</option>
                </select>
              </div>

              <div>
                <label htmlFor="available_capital" className="block text-sm font-medium text-gray-700">
                  Capital disponible
                </label>
                <input
                  type="number"
                  id="available_capital"
                  name="available_capital"
                  defaultValue={property.available_capital}
                  required
                  min="0"
                  step="0.01"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label htmlFor="property_type" className="block text-sm font-medium text-gray-700">
                  Type de propriété
                </label>
                <select
                  id="property_type"
                  name="property_type"
                  defaultValue={property.property_type}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                >
                  <option value="residential">Résidentiel</option>
                  <option value="commercial">Commercial</option>
                  <option value="fix_and_flip">Rénovation et revente</option>
                  <option value="rental">Location</option>
                </select>
              </div>

              <div className="flex justify-end space-x-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.back()}
                >
                  Annuler
                </Button>
                <Button
                  type="submit"
                  disabled={saving}
                >
                  {saving ? 'Enregistrement...' : 'Enregistrer les modifications'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </MainLayout>
    </AuthGuard>
  );
};

export default EditPropertyPage; 