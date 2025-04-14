'use client';

import React, { useState, useEffect } from 'react';
import { Button, Input, Card } from '../ui';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Vérifier si l'utilisateur est déjà connecté au chargement du composant
  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      console.log('Session initiale:', session);
      if (session) {
        console.log('Utilisateur déjà connecté, redirection...');
        router.push('/dashboard');
      }
    };

    checkSession();
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      console.log('Tentative de connexion avec:', email);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      
      console.log('Connexion réussie:', data);
      
      // Attendre que la session soit disponible
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError) throw sessionError;
      
      console.log('Session après connexion:', session);
      
      if (session) {
        // Forcer la redirection via window.location pour contourner les problèmes potentiels
        window.location.href = '/dashboard';
      } else {
        throw new Error('Session non disponible après la connexion');
      }
    } catch (error: any) {
      console.error('Erreur de connexion:', error);
      setError(error.message || 'Une erreur est survenue lors de la connexion');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card title="Connexion" className="max-w-md mx-auto">
      <form onSubmit={handleLogin} className="space-y-4">
        {error && (
          <div className="p-3 bg-red-50 text-red-700 rounded-md text-sm">
            {error}
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
          placeholder="Votre mot de passe"
          required
        />

        <div className="pt-2">
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? 'Connexion en cours...' : 'Se connecter'}
          </Button>
        </div>
      </form>
    </Card>
  );
} 