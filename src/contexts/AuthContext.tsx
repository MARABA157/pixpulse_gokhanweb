import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '../config/supabase';
import { toast } from 'react-hot-toast';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, username: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mevcut oturumu kontrol et
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Oturum değişikliklerini dinle
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (data?.user) {
        if (!data.user.email_confirmed_at) {
          throw new Error('Email adresinizi onaylamanız gerekiyor');
        }
        toast.success('Başarıyla giriş yaptınız!');
      }
    } catch (error: any) {
      console.error('Login error:', error);
      if (error.message.includes('Invalid login credentials')) {
        toast.error('Geçersiz email veya şifre');
      } else {
        toast.error(error.message || 'Giriş yaparken bir hata oluştu');
      }
      throw error;
    }
  };

  const signup = async (email: string, password: string, username: string) => {
    try {
      // Önce kullanıcı adının kullanılabilir olduğunu kontrol et
      const { data: existingUser, error: checkError } = await supabase
        .from('profiles')
        .select('username')
        .eq('username', username)
        .single();

      if (checkError && checkError.code !== 'PGRST116') {
        throw checkError;
      }

      if (existingUser) {
        throw new Error('Bu kullanıcı adı zaten kullanılıyor');
      }

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username,
          },
        },
      });

      if (error) throw error;

      if (data?.user) {
        const { error: profileError } = await supabase
          .from('profiles')
          .insert([
            {
              id: data.user.id,
              username,
              created_at: new Date().toISOString(),
            },
          ]);

        if (profileError) throw profileError;

        toast.success('Hesabınız oluşturuldu! Email adresinizi onaylayın.');
      }
    } catch (error: any) {
      console.error('Signup error:', error);
      if (error.message.includes('already registered')) {
        toast.error('Bu email adresi zaten kayıtlı');
      } else {
        toast.error(error.message || 'Kayıt olurken bir hata oluştu');
      }
      throw error;
    }
  };

  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      toast.success('Başarıyla çıkış yaptınız');
    } catch (error: any) {
      console.error('Logout error:', error);
      toast.error(error.message || 'Çıkış yaparken bir hata oluştu');
      throw error;
    }
  };

  const value = {
    user,
    loading,
    login,
    signup,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}