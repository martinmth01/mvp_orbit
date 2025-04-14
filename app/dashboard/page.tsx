'use client';

import { AuthGuard } from '@/components/auth';
import { MainLayout } from '@/components/layout';
import { Card, Button } from '@/components/ui';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { PropertyData } from '@/types';
import Link from 'next/link';

export default function DashboardPage() {
  const [properties, setProperties] = useState<PropertyData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProperties() {
      try {
        const { data, error } = await supabase
          .from('properties')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        
        setProperties(data || []);
      } catch (err: any) {
        setError(err.message || 'Erreur lors du chargement des propriétés');
      } finally {
        setLoading(false);
      }
    }

    fetchProperties();
  }, []);

  return (
    <AuthGuard>
      <MainLayout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Tableau de bord</h1>
            <Link href="/dashboard/add">
              <Button>
                Ajouter une propriété
              </Button>
            </Link>
          </div>
          
          {loading ? (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : error ? (
            <Card className="bg-red-50 text-red-700 p-4">
              {error}
            </Card>
          ) : properties.length === 0 ? (
            <Card>
              <div className="text-center py-8">
                <p className="text-gray-500 mb-4">
                  Vous n'avez pas encore de propriétés. Commencez par en ajouter une !
                </p>
                <Link href="/dashboard/add">
                  <Button>
                    Ajouter une propriété
                  </Button>
                </Link>
              </div>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties.map((property) => (
                <Link href={`/dashboard/property/${property.id}`} key={property.id}>
                  <Card title={property.name} className="h-full hover:shadow-lg transition-shadow">
                    <div className="space-y-2">
                      <p className="text-gray-600 line-clamp-2">{property.description}</p>
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">{property.price.toLocaleString('fr-FR')} €</span>
                        <span>{property.surface} m²</span>
                      </div>
                      <p className="text-sm text-gray-500">
                        {property.address}, {property.postalCode} {property.city}
                      </p>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </MainLayout>
    </AuthGuard>
  );
}
