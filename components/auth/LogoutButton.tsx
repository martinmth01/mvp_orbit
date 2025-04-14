'use client';

import React, { useState } from 'react';
import { Button } from '../ui';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';

export default function LogoutButton() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    setLoading(true);
    
    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) throw error;
      
      router.push('/');
      router.refresh();
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button 
      variant="outline" 
      onClick={handleLogout}
      disabled={loading}
    >
      {loading ? 'Déconnexion...' : 'Se déconnecter'}
    </Button>
  );
} 