import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';

export function useAdmin(): { isAdmin: boolean; loading: boolean } {
  const { user, loading: authLoading } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authLoading) {
      setLoading(true);
      return;
    }

    if (!user) {
      setIsAdmin(false);
      setLoading(false);
      return;
    }

    async function checkAdmin() {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', user!.id)
          .single();

        if (error) throw error;
        setIsAdmin(data?.role === 'admin');
      } catch {
        setIsAdmin(false);
      } finally {
        setLoading(false);
      }
    }

    setLoading(true);
    checkAdmin();
  }, [authLoading, user]);

  return { isAdmin, loading };
}
