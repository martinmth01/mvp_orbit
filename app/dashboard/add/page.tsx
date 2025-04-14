'use client';

import { AuthGuard } from '@/components/auth';
import { MainLayout } from '@/components/layout';
import { PropertyForm } from '@/components/dashboard';

export default function AddPropertyPage() {
  return (
    <AuthGuard>
      <MainLayout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl font-bold mb-8">Ajouter une propriété</h1>
          <PropertyForm />
        </div>
      </MainLayout>
    </AuthGuard>
  );
} 