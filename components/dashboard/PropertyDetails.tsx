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

      router.push('/dashboard');
      router.refresh();
    } catch (err: any) {
      setError(err.message || 'Une erreur est survenue lors de la suppression');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card title={property.name} className="max-w-2xl mx-auto">
      {error && (
        <div className="p-3 bg-red-50 text-red-700 rounded-md text-sm mb-4">
          {error}
        </div>
      )}

      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-medium text-gray-500">Description</h3>
          <p className="mt-1 text-gray-900">{property.description}</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="text-sm font-medium text-gray-500">Prix</h3>
            <p className="mt-1 text-gray-900">{property.price.toLocaleString('fr-FR')} €</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Surface</h3>
            <p className="mt-1 text-gray-900">{property.surface} m²</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="text-sm font-medium text-gray-500">Adresse</h3>
            <p className="mt-1 text-gray-900">{property.address}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Code postal</h3>
            <p className="mt-1 text-gray-900">{property.postalCode}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="text-sm font-medium text-gray-500">Ville</h3>
            <p className="mt-1 text-gray-900">{property.city}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Nombre de pièces</h3>
            <p className="mt-1 text-gray-900">{property.rooms}</p>
          </div>
        </div>

        <div className="pt-4 flex justify-between">
          <Button 
            variant="outline" 
            onClick={onClose}
          >
            Fermer
          </Button>
          <Button 
            variant="secondary" 
            onClick={handleDelete}
            disabled={loading}
          >
            {loading ? 'Suppression...' : 'Supprimer'}
          </Button>
        </div>
      </div>
    </Card>
  );
} 