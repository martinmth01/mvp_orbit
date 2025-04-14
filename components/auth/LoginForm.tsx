'use client';

import React, { useState } from 'react';
import { Button, Input, Card } from '../ui';
import { useAuth } from '@/lib/hooks/useAuth';
import { useSearchParams } from 'next/navigation';
import { createUserProfile, getUserProfile } from '@/lib/userProfile';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState<string | null>(null);
  const { signIn, loading, error: authError } = useAuth();
  const searchParams = useSearchParams();
  const returnTo = searchParams.get('returnTo') || '/dashboard';

  // Fonction pour vérifier et créer le profil utilisateur si nécessaire
  const ensureUserProfile = async (userId: string, userEmail: string) => {
    try {
      const { data: profile, error: profileError } = await getUserProfile(userId);
      
      if (profileError || !profile) {
        await createUserProfile(userId, { email: userEmail });
      }
    } catch (error) {
      // Ne pas bloquer l'authentification si la création du profil échoue
      console.error('Erreur lors de la vérification/création du profil:', error);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    try {
      const { user } = await signIn(email, password);
      
      if (user) {
        await ensureUserProfile(user.id, user.email || email);
        window.location.href = returnTo;
      }
    } catch (error: any) {
      setFormError(error.message || 'Une erreur est survenue lors de la connexion');
    }
  };

  return (
    <Card title="Connexion" className="max-w-md mx-auto">
      <form onSubmit={handleLogin} className="space-y-4">
        {(formError || authError) && (
          <div className="p-3 bg-red-50 text-red-700 rounded-md text-sm">
            {formError || authError?.message}
          </div>
        )}

        <Input
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="votre@email.com"
          required
        />

        <Input
          label="Mot de passe"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          required
        />

        <Button
          type="submit"
          disabled={loading}
          className="w-full"
        >
          {loading ? 'Connexion en cours...' : 'Se connecter'}
        </Button>
      </form>
    </Card>
  );
} 