'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import { useAuth } from '@/hooks/useAuth';

export default function AddPropertyPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    setError(null);

    try {
      const formData = new FormData(e.currentTarget);
      const propertyData = {
        owner_id: user.id,
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
        created_at: new Date().toISOString(),
      };

      console.log('Données à envoyer à Supabase:', propertyData);

      const { error } = await supabase
        .from('properties')
        .insert([propertyData]);

      if (error) {
        console.error('Erreur Supabase:', error);
        throw error;
      }

      router.push('/profile');
    } catch (err) {
      console.error('Erreur complète:', err);
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Ajouter une propriété</h1>
      
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
          <button
            type="button"
            onClick={() => router.back()}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Annuler
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            {loading ? 'Ajout en cours...' : 'Ajouter la propriété'}
          </button>
        </div>
      </form>
    </div>
  );
} 