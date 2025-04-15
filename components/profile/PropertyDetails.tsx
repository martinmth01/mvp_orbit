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

  return (
    <Card className="p-6">
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-2xl font-bold">{property.name}</h2>
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
          <h3 className="text-lg font-semibold mb-2">Description</h3>
          <p className="text-gray-600">{property.description}</p>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Prix</h3>
          <p className="text-blue-600 font-medium">
            {property.price.toLocaleString('fr-FR')} €
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Adresse</h3>
          <p className="text-gray-600">
            {property.address}<br />
            {property.postalCode} {property.city}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">Surface</h3>
            <p className="text-gray-600">{property.surface} m²</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Pièces</h3>
            <p className="text-gray-600">{property.rooms}</p>
          </div>
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