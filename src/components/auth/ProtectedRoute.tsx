import React from 'react';
import { useAuthContext } from '../../contexts/AuthContext';
import LoginPrompt from './LoginPrompt';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, loading } = useAuthContext();

  if (loading) {
    return null;
  }

  if (!user) {
    return <LoginPrompt />;
  }

  return <>{children}</>;
}