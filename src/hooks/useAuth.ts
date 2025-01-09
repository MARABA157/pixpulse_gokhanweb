import { useState } from 'react';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';

export function useAuth() {
  const [loading, setLoading] = useState(false);

  const register = async (email: string, password: string, username: string) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username,
          },
        },
      });

      if (error) throw error;
      toast.success('Kayıt başarılı! Giriş yapabilirsiniz.');
      return true;
    } catch (error) {
      toast.error('Kayıt olurken bir hata oluştu.');
      console.error('Error during registration:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      toast.success('Giriş başarılı!');
      return true;
    } catch (error) {
      toast.error('Giriş yaparken bir hata oluştu.');
      console.error('Error during login:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    register,
    login,
    loading,
  };
}