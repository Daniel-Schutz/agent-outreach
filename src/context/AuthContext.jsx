// src/contexts/AuthContext.jsx
'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Create the AuthContext
const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  // Check if user is logged in on init
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Check if user is logged in via localStorage
        const token = localStorage.getItem('token');
        const userStr = localStorage.getItem('user');
        
        if (token && userStr) {
          const user = JSON.parse(userStr);
          setUser(user);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
        // In case of error, assume not authenticated
        logout();
      } finally {
        setLoading(false);
      }
    };
    
    checkAuth();
  }, []);

  // Função para verificar e-mail no Anvil
  const checkEmailExists = async (email) => {
    try {
      // Implementação da verificação do e-mail
      // Esta é uma função de simulação - você precisa implementar a chamada real à API Anvil
      const response = await fetch('https://outreach-agent.anvil.app/_/api/check_email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      });
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      
      const data = await response.json();
      return data.exists;
      
    } catch (error) {
      console.error('Error checking email:', error);
      
      // Para desenvolvimento/testes - simular resposta quando API não está disponível
      const validEmails = ['demo@example.com', 'test@example.com', 'user@example.com'];
      return validEmails.includes(email);
    }
  };

  const login = async (email, password) => {
    try {
      // Verificar se o email existe
      const emailExists = await checkEmailExists(email);
      
      if (!emailExists) {
        return { 
          success: false, 
          error: 'Email not found. Please check your email address.'
        };
      }
      
      // Para demo - verificação simplificada da senha
      // Em produção, isso seria substituído por uma API de autenticação
      if (email === 'demo@example.com' && password === 'demo123') {
        // Criar objeto de usuário
        const user = {
          name: 'Demo User',
          email,
          role: 'user'
        };
        
        // Armazenar dados no localStorage
        localStorage.setItem('token', 'demo-token');
        localStorage.setItem('user', JSON.stringify(user));
        
        // Atualizar estado
        setUser(user);
        setIsAuthenticated(true);
        
        return { success: true };
      } else {
        return { 
          success: false, 
          error: 'Incorrect password. Please try again.'
        };
      }
    } catch (error) {
      console.error('Error logging in:', error);
      return { 
        success: false, 
        error: 'An error occurred while trying to log in'
      };
    }
  };

  const signup = async (userData) => {
    try {
      // Verificar se o email já existe
      const emailExists = await checkEmailExists(userData.email);
      
      if (emailExists) {
        return { 
          success: false, 
          error: 'Email already exists. Please use a different email or try to log in.'
        };
      }
      
      // Para demo - simular registro bem-sucedido
      // Em produção, isso seria substituído por uma API de registro
      
      // Criar objeto de usuário
      const user = {
        name: userData.name || userData.fullName,
        email: userData.email,
        role: userData.role || 'user'
      };
      
      // Simular atraso de rede
      await new Promise(resolve => setTimeout(resolve, 800));
      
      return { success: true, user };
    } catch (error) {
      console.error('Error signing up:', error);
      return { 
        success: false, 
        error: 'An error occurred while trying to create the account'
      };
    }
  };

  const logout = () => {
    try {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    } finally {
      setUser(null);
      setIsAuthenticated(false);
      router.push('/login');
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated,
        login,
        signup,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);
