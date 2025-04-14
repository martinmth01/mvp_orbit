'use client';

import React, { useState } from 'react';
import { Button, Input, Card } from '../ui';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';

export default function RegisterForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    // Vérification des mots de passe
    if (password !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }

    // Vérification de la complexité du mot de passe
    if (password.length < 8) {
      setError('Le mot de passe doit contenir au moins 8 caractères');
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) throw error;

      // Redirection vers la page de connexion avec un message
      router.push('/auth/login?registered=true');
    } catch (error: any) {
      setError(error.message || 'Une erreur est survenue lors de l\'inscription');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card title="Inscription" className="max-w-md mx-auto">
      <form onSubmit={handleRegister} className="space-y-4">
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
          placeholder="Créez un mot de passe"
          required
        />

        <Input
          label="Confirmer le mot de passe"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirmez votre mot de passe"
          required
        />

        <div className="pt-2">
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? 'Inscription en cours...' : 'S\'inscrire'}
          </Button>
        </div>
      </form>
    </Card>
  );
} 