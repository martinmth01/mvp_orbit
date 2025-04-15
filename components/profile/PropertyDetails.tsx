'use client';

import React, { useState } from 'react';
import { Card, Button } from '../ui';
import { PropertyData } from '@/types';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';

interface PropertyDetailsProps {
  property: PropertyData;
  onClose?: () => void;
}

export default function PropertyDetails({ property, onClose }: PropertyDetailsProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette propriété ?')) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase
        .from('properties')
        .delete()
        .eq('id', property.id);

      if (error) throw error;

      router.push('/profile');
      router.refresh();
    } catch (err: any) {
      setError(err.message || 'Une erreur est survenue lors de la suppression');
    } finally {
      setLoading(false);
    }
  };

  const getInvestmentGoalLabel = (goal: string) => {
    switch (goal) {
      case 'passive_income': return 'Revenu passif';
      case 'capital_growth': return 'Croissance du capital';
      case 'portfolio_diversification': return 'Diversification du portefeuille';
      default: return goal;
    }
  };

  const getExperienceLevelLabel = (level: string) => {
    switch (level) {
      case 'beginner': return 'Débutant';
      case 'intermediate': return 'Intermédiaire';
      case 'advanced': return 'Avancé';
      default: return level;
    }
  };

  const getRiskToleranceLabel = (risk: string) => {
    switch (risk) {
      case 'conservative': return 'Conservateur';
      case 'moderate': return 'Modéré';
      case 'aggressive': return 'Agressif';
      default: return risk;
    }
  };

  const getInvestmentHorizonLabel = (horizon: string) => {
    switch (horizon) {
      case 'short_term': return 'Court terme';
      case 'medium_term': return 'Moyen terme';
      case 'long_term': return 'Long terme';
      default: return horizon;
    }
  };

  const getPropertyTypeLabel = (type: string) => {
    switch (type) {
      case 'residential': return 'Résidentiel';
      case 'commercial': return 'Commercial';
      case 'fix_and_flip': return 'Rénovation et revente';
      case 'rental': return 'Location';
      default: return type;
    }
  };

  return (
    <Card className="p-6">
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-2xl font-bold">Détails de l'investissement</h2>
        {onClose && (
          <Button
            variant="outline"
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            Fermer
          </Button>
        )}
      </div>

      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold mb-2">Objectif d'investissement</h3>
          <p className="text-gray-600">{getInvestmentGoalLabel(property.investment_goal)}</p>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Niveau d'expérience</h3>
          <p className="text-gray-600">{getExperienceLevelLabel(property.experience_level)}</p>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Tolérance au risque</h3>
          <p className="text-gray-600">{getRiskToleranceLabel(property.risk_tolerance)}</p>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Horizon d'investissement</h3>
          <p className="text-gray-600">{getInvestmentHorizonLabel(property.investment_horizon)}</p>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Capital disponible</h3>
          <p className="text-blue-600 font-medium">
            {property.available_capital.toLocaleString('fr-FR')} €
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Type de propriété</h3>
          <p className="text-gray-600">{getPropertyTypeLabel(property.property_type)}</p>
        </div>

        {error && (
          <div className="text-red-500 text-sm">{error}</div>
        )}

        <div className="flex justify-end space-x-4">
          <Button
            variant="outline"
            onClick={() => router.push(`/profile/property/${property.id}/edit`)}
          >
            Modifier
          </Button>
          <Button
            variant="outline"
            onClick={handleDelete}
            disabled={loading}
            className="text-red-600 hover:text-red-700"
          >
            {loading ? 'Suppression...' : 'Supprimer'}
          </Button>
        </div>
      </div>
    </Card>
  );
} 