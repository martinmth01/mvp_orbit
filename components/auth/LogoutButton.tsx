'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import Button from '../ui/Button';

export default function LogoutButton() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const supabase = createClientComponentClient();

  const handleSignOut = async () => {
    if (!window.confirm('Êtes-vous sûr de vouloir vous déconnecter ?')) {
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      // Nettoyer le stockage local
      localStorage.removeItem('sb-fjzlelgmesryqifksbhe-auth-token');
      
      // Rediriger vers la page de connexion
      router.push('/auth/login');
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Une erreur est survenue lors de la déconnexion');
      console.error('Erreur de déconnexion:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative">
      <Button
        onClick={handleSignOut}
        variant="outline"
        size="sm"
        className="text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white"
        disabled={isLoading}
      >
        {isLoading ? 'Déconnexion...' : 'Déconnexion'}
      </Button>
      {error && (
        <div className="absolute top-full left-0 mt-1 text-red-500 text-sm">
          {error}
        </div>
      )}
    </div>
  );
} 