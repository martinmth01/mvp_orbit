'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/lib/hooks';
import { useRouter } from 'next/navigation';

interface AuthGuardProps {
  children: React.ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const { isAuthenticated, loading, user } = useAuth();
  const [content, setContent] = useState<React.ReactNode | null>(null);

  useEffect(() => {
    // Afficher le contenu seulement si l'utilisateur est authentifié
    if (!loading) {
      if (isAuthenticated) {
        console.log('AuthGuard - Utilisateur authentifié:', user?.id);
        setContent(children);
      } else {
        console.log('AuthGuard - Utilisateur non authentifié');
        setContent(null);
      }
    }
  }, [loading, isAuthenticated, children, user]);

  // Afficher un indicateur de chargement pendant la vérification
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Rendre le contenu (qui sera null si non authentifié)
  return <>{content}</>;
} 