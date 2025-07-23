'use client';

import { createContext, useEffect, useState, ReactNode } from 'react';
// Removed Firebase authentication
interface AuthContextType {
  user: null;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: false,
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const user = null;
  const loading = false;
  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
