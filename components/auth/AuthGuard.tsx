'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';

interface AuthGuardProps {
  children: React.ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    let mounted = true;

    const checkAuth = async () => {
      try {
        // Vérifier la session
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          throw sessionError;
        }

        if (!mounted) return;

        if (!session) {
          console.log('Aucune session trouvée, redirection vers login');
          router.push('/auth/login');
          return;
        }

        // Vérifier l'utilisateur
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        
        if (userError) {
          throw userError;
        }

        if (!mounted) return;

        if (!user) {
          console.log('Aucun utilisateur trouvé, redirection vers login');
          router.push('/auth/login');
          return;
        }
        
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Erreur lors de la vérification de l\'authentification:', error);
        if (mounted) {
          router.push('/auth/login');
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    checkAuth();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (!mounted) return;

        if (event === 'SIGNED_OUT') {
          setIsAuthenticated(false);
          router.push('/auth/login');
        } else if (event === 'SIGNED_IN' && session) {
          setIsAuthenticated(true);
        }
      }
    );

    return () => {
      mounted = false;
      authListener.subscription.unsubscribe();
    };
  }, [router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return isAuthenticated ? <>{children}</> : null;
} 