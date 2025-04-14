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

      router.push('/dashboard');
      router.refresh();
    } catch (err: any) {
      setError(err.message || 'Une erreur est survenue lors de l\'ajout de la propriété');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card title="Ajouter une propriété" className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-3 bg-red-50 text-red-700 rounded-md text-sm">
            {error}
          </div>
        )}

        <Input
          label="Nom de la propriété"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Ex: Appartement T3 Centre-ville"
          required
        />

        <Input
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description détaillée de la propriété"
          required
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Prix (€)"
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            placeholder="Ex: 250000"
            required
          />

          <Input
            label="Surface (m²)"
            name="surface"
            type="number"
            value={formData.surface}
            onChange={handleChange}
            placeholder="Ex: 75"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Adresse"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Ex: 123 rue de la Paix"
            required
          />

          <Input
            label="Code postal"
            name="postalCode"
            value={formData.postalCode}
            onChange={handleChange}
            placeholder="Ex: 75001"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Ville"
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="Ex: Paris"
            required
          />

          <Input
            label="Nombre de pièces"
            name="rooms"
            type="number"
            value={formData.rooms}
            onChange={handleChange}
            placeholder="Ex: 3"
            required
          />
        </div>

        <div className="pt-2">
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? 'Ajout en cours...' : 'Ajouter la propriété'}
          </Button>
        </div>
      </form>
    </Card>
  );
} 