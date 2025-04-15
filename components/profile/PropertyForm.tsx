'use client';

import React, { useState } from 'react';
import { Button, Input, Card } from '../ui';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';

interface PropertyFormData {
  investment_goal: 'passive_income' | 'capital_growth' | 'portfolio_diversification';
  experience_level: 'beginner' | 'intermediate' | 'advanced';
  risk_tolerance: 'conservative' | 'moderate' | 'aggressive';
  investment_horizon: 'short_term' | 'medium_term' | 'long_term';
  available_capital: number;
  property_type: 'residential' | 'commercial' | 'fix_and_flip' | 'rental';
}

export default function PropertyForm() {
  const [formData, setFormData] = useState<PropertyFormData>({
    investment_goal: 'passive_income',
    experience_level: 'beginner',
    risk_tolerance: 'moderate',
    investment_horizon: 'medium_term',
    available_capital: 0,
    property_type: 'residential'
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'available_capital' ? parseFloat(value) || 0 : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error('Utilisateur non connecté');
      }

      const { error } = await supabase
        .from('properties')
        .insert([
          {
            ...formData,
            owner_id: user.id
          }
        ]);

      if (error) throw error;

      router.push('/profile');
      router.refresh();
    } catch (err: any) {
      setError(err.message || 'Une erreur est survenue lors de l\'ajout de la propriété');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-6">Ajouter une propriété</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="investment_goal" className="block text-sm font-medium text-gray-700">
            Objectif d'investissement
          </label>
          <select
            id="investment_goal"
            name="investment_goal"
            value={formData.investment_goal}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
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
            value={formData.experience_level}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
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
            value={formData.risk_tolerance}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
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
            value={formData.investment_horizon}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          >
            <option value="short_term">Court terme</option>
            <option value="medium_term">Moyen terme</option>
            <option value="long_term">Long terme</option>
          </select>
        </div>

        <div>
          <label htmlFor="available_capital" className="block text-sm font-medium text-gray-700">
            Capital disponible (€)
          </label>
          <Input
            id="available_capital"
            name="available_capital"
            type="number"
            value={formData.available_capital}
            onChange={handleChange}
            required
            min="0"
          />
        </div>

        <div>
          <label htmlFor="property_type" className="block text-sm font-medium text-gray-700">
            Type de propriété
          </label>
          <select
            id="property_type"
            name="property_type"
            value={formData.property_type}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          >
            <option value="residential">Résidentiel</option>
            <option value="commercial">Commercial</option>
            <option value="fix_and_flip">Rénovation et revente</option>
            <option value="rental">Location</option>
          </select>
        </div>

        {error && (
          <div className="text-red-500 text-sm">{error}</div>
        )}

        <Button
          type="submit"
          disabled={loading}
          className="w-full"
        >
          {loading ? 'Ajout en cours...' : 'Ajouter la propriété'}
        </Button>
      </form>
    </Card>
  );
} 