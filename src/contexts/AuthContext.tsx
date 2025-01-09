import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  displayName: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, username: string) => Promise<void>;
  logout: () => Promise<void>;
  updateUserProfile: (displayName?: string, photoURL?: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

// Test kullanıcıları
const TEST_USERS = [
  {
    id: '1',
    email: 'test@example.com',
    password: 'test123',
    displayName: 'Test User'
  },
  {
    id: '2',
    email: 'admin@example.com',
    password: 'admin123',
    displayName: 'Admin User'
  }
];

// Local storage anahtarı
const AUTH_STORAGE_KEY = 'pixelpulse_auth';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const savedAuth = localStorage.getItem(AUTH_STORAGE_KEY);
    return savedAuth ? JSON.parse(savedAuth) : null;
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Kullanıcı durumunu local storage'a kaydet
  useEffect(() => {
    if (user) {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    }
  }, [user]);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);

      // Test kullanıcısını bul
      const testUser = TEST_USERS.find(
        (u) => u.email === email && u.password === password
      );

      if (!testUser) {
        throw new Error('Invalid email or password');
      }

      // Kullanıcı bilgilerini ayarla (şifre hariç)
      const { password: _, ...userWithoutPassword } = testUser;
      setUser(userWithoutPassword);

    } catch (error) {
      setError((error as Error).message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (email: string, password: string, username: string) => {
    try {
      setLoading(true);
      setError(null);

      // E-posta kullanımda mı kontrol et
      if (TEST_USERS.some((u) => u.email === email)) {
        throw new Error('Email already in use');
      }

      // Yeni kullanıcı oluştur
      const newUser = {
        id: String(TEST_USERS.length + 1),
        email,
        displayName: username
      };

      setUser(newUser);

    } catch (error) {
      setError((error as Error).message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      setError(null);
      setUser(null);
    } catch (error) {
      setError((error as Error).message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateUserProfile = async (displayName?: string, photoURL?: string) => {
    try {
      setLoading(true);
      setError(null);
      
      if (user && displayName) {
        setUser({ ...user, displayName });
      }
    } catch (error) {
      setError((error as Error).message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout,
    updateUserProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}