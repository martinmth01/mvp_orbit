'use client';

import React, { useEffect } from 'react';
import { useAuth } from '@/lib/hooks';
import { useRouter } from 'next/navigation';

interface AuthGuardProps {
  children: React.ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const { isAuthenticated, loading, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      console.log('AuthGuard - Utilisateur non authentifié, redirection vers login');
      router.push('/auth/login');
    } else if (user) {
      console.log('AuthGuard - Utilisateur authentifié:', user.id);
    }
  }, [loading, isAuthenticated, router, user]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return isAuthenticated ? <>{children}</> : null;
} 