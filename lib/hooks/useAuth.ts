import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { useRouter } from 'next/navigation';

export function useAuth() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);
  const router = useRouter();

  // Initialisation et écoute des changements d'état
  useEffect(() => {
    let mounted = true;

    // Vérifier la session actuelle
    const checkSession = async () => {
      try {
        setLoading(true);
        
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) throw error;
        
        if (mounted) {
          setUser(session?.user || null);
          setLoading(false);
        }
      } catch (err) {
        console.error('Erreur lors de la vérification de la session:', err);
        if (mounted) {
          setError(err);
          setLoading(false);
        }
      }
    };

    // Vérification initiale
    checkSession();

    // Écouter les changements d'authentification
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log('Événement d\'authentification:', event, session?.user?.id);
        
        if (!mounted) return;
        
        setUser(session?.user || null);
        setLoading(false);
        
        // Actions spécifiques selon l'événement
        if (event === 'SIGNED_IN') {
          console.log('Utilisateur connecté');
        } else if (event === 'SIGNED_OUT') {
          console.log('Utilisateur déconnecté');
        }
      }
    );

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  // Fonctions d'authentification
  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;
      
      return { data, error: null };
    } catch (err) {
      console.error('Erreur de connexion:', err);
      return { data: null, error: err };
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });
      
      if (error) throw error;
      
      return { data, error: null };
    } catch (err) {
      console.error('Erreur d\'inscription:', err);
      return { data: null, error: err };
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) throw error;
      
      router.push('/auth/login');
      return { error: null };
    } catch (err) {
      console.error('Erreur de déconnexion:', err);
      return { error: err };
    }
  };

  return {
    user,
    loading,
    error,
    signIn,
    signUp,
    signOut,
    isAuthenticated: !!user,
  };
} 