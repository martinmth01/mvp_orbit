'use client';

import { useEffect, useState } from 'react';
import { AuthGuard } from '@/components/auth';
import { MainLayout } from '@/components/layout';
import { PropertyDetails } from '@/components/dashboard';
import { PropertyData } from '@/types';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';

interface PropertyPageProps {
  params: {
    id: string;
  };
}

export default function PropertyPage({ params }: PropertyPageProps) {
  const [property, setProperty] = useState<PropertyData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchProperty() {
      try {
        const { data, error } = await supabase
          .from('properties')
          .select('*')
          .eq('id', params.id)
          .single();

        if (error) throw error;
        
        setProperty(data);
      } catch (err: any) {
        setError(err.message || 'Erreur lors du chargement de la propriété');
      } finally {
        setLoading(false);
      }
    }

    fetchProperty();
  }, [params.id]);

  const handleClose = () => {
    router.push('/dashboard');
  };

  return (
    <AuthGuard>
      <MainLayout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl font-bold mb-8">Détails de la propriété</h1>
          
          {loading ? (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : error ? (
            <div className="bg-red-50 text-red-700 p-4 rounded-md">
              {error}
            </div>
          ) : property ? (
            <PropertyDetails property={property} onClose={handleClose} />
          ) : (
            <div className="text-center py-8 text-gray-500">
              Propriété non trouvée
            </div>
          )}
        </div>
      </MainLayout>
    </AuthGuard>
  );
} 