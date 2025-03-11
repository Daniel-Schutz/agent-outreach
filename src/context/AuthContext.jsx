// src/contexts/AuthContext.jsx
'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Create the AuthContext
const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const signup = async (userData, userType) => {
    try {
      setLoading(true);

      console.log({ userData });

      return { success: true };
    } catch (error) {
      console.error('Signup failed', error);
      return {
        success: false,
        error: error.message || 'Failed to sign up. Please try again.',
      };
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      setLoading(true);

      console.log(email, password);

      return {
        success: true,
        error: 'Logging In',
      };
    } catch (error) {
      console.error('Login failed', error);
      return {
        success: false,
        error: error.message || 'Failed to log in. Please try again.',
      };
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    email,
    setEmail,
    loading,

    signup,
    login,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Custom hook to use the AuthContext
export function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
