'use client';

import React, { useState } from 'react';
import { Button, Input, Card } from '../ui';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';

interface PropertyFormData {
  name: string;
  description: string;
  price: number;
  address: string;
  city: string;
  postalCode: string;
  surface: number;
  rooms: number;
}

export default function PropertyForm() {
  const [formData, setFormData] = useState<PropertyFormData>({
    name: '',
    description: '',
    price: 0,
    address: '',
    city: '',
    postalCode: '',
    surface: 0,
    rooms: 0
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' || name === 'surface' || name === 'rooms' 
        ? parseFloat(value) || 0 
        : value
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
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Nom de la propriété
          </label>
          <Input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <Input
            id="description"
            name="description"
            type="text"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">
            Prix (€)
          </label>
          <Input
            id="price"
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700">
            Adresse
          </label>
          <Input
            id="address"
            name="address"
            type="text"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="city" className="block text-sm font-medium text-gray-700">
            Ville
          </label>
          <Input
            id="city"
            name="city"
            type="text"
            value={formData.city}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700">
            Code postal
          </label>
          <Input
            id="postalCode"
            name="postalCode"
            type="text"
            value={formData.postalCode}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="surface" className="block text-sm font-medium text-gray-700">
            Surface (m²)
          </label>
          <Input
            id="surface"
            name="surface"
            type="number"
            value={formData.surface}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="rooms" className="block text-sm font-medium text-gray-700">
            Nombre de pièces
          </label>
          <Input
            id="rooms"
            name="rooms"
            type="number"
            value={formData.rooms}
            onChange={handleChange}
            required
          />
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