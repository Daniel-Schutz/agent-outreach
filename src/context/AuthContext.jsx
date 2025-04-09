// src/contexts/AuthContext.jsx
'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { userService } from '@/services/api';

// Create the AuthContext
const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accountId, setAccountId] = useState(null);
  const [userData, setUserData] = useState(null);
  const router = useRouter();

  // Fetch user data from API
  const fetchUserData = async (retryCount = 0) => {
    if (accountId) {
      try {
        console.log('Fetching user data for accountId:', accountId);
        const response = await userService.getUserData();
        
        if (response.success && response.userData) {
          console.log('User data fetched successfully:', response.userData);
          setUserData(response.userData);
          
          // Update user object with real data
          if (user) {
            const updatedUser = {
              ...user,
              name: response.userData.account_name || user.name,
              email: response.userData.account_email || user.email
            };
            setUser(updatedUser);
            localStorage.setItem('user', JSON.stringify(updatedUser));
          }
        } else {
          console.error('Failed to fetch user data:', response.error);
          
          // Retry up to 2 times with a delay if the request fails
          if (retryCount < 2) {
            console.log(`Retrying getUserData in 1 second... (attempt ${retryCount + 1})`);
            setTimeout(() => {
              fetchUserData(retryCount + 1);
            }, 1000);
          }
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        
        // Retry up to 2 times with a delay if the request fails
        if (retryCount < 2) {
          console.log(`Retrying getUserData in 1 second... (attempt ${retryCount + 1})`);
          setTimeout(() => {
            fetchUserData(retryCount + 1);
          }, 1000);
        }
      }
    }
  };

  // Check if user is logged in on init
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Check if user is logged in via localStorage
        const token = localStorage.getItem('token');
        const userStr = localStorage.getItem('user');
        const storedAccountId = localStorage.getItem('accountId');
        const storedUserData = localStorage.getItem('userData');
        
        if (token && userStr) {
          console.log('checkAuth: User is already logged in');
          const user = JSON.parse(userStr);
          setUser(user);
          setIsAuthenticated(true);
          
          // Set accountId if it exists in localStorage
          if (storedAccountId) {
            console.log('checkAuth: Setting accountId from localStorage:', storedAccountId);
            setAccountId(storedAccountId);
          }
          
          // Set userData if it exists in localStorage
          if (storedUserData) {
            console.log('checkAuth: Setting userData from localStorage');
            setUserData(JSON.parse(storedUserData));
          } else if (storedAccountId) {
            // If we have an accountId but no userData, fetch it
            console.log('checkAuth: No userData in localStorage, but accountId exists. Will fetch user data later.');
          }
        } else {
          console.log('checkAuth: No user logged in');
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
  
  // Fetch user data when accountId changes - disabled to avoid duplicate calls
  // We now fetch user data explicitly after login
  useEffect(() => {
    if (isAuthenticated && accountId && !userData && false) { // Added false to disable this effect
      fetchUserData();
    }
  }, [isAuthenticated, accountId]);

  // Função para verificar e-mail no Anvil
  const checkEmailExists = async (email) => {
    try {
      console.log('Checking if email exists:', email);
      // Implementação da verificação do e-mail
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
      console.log('check_email response:', data);
      
      // Store accountId if it exists in the response
      if (data.exists && data.accountId) {
        console.log('Account ID from API check_email:', data.accountId);
        localStorage.setItem('accountId', data.accountId);
        setAccountId(data.accountId);
      }
      
      return data.exists;
      
    } catch (error) {
      console.error('Error checking email:', error);
      
      // Para desenvolvimento/testes - simular resposta quando API não está disponível
      const validEmails = ['demo@example.com', 'test@example.com', 'user@example.com'];
      const isValid = validEmails.includes(email);
      
      // For development - create mock accountId if email is valid
      if (isValid) {
        const mockAccountId = 'acc_' + Math.random().toString(36).substring(2, 10);
        console.log('Mock Account ID:', mockAccountId);
        localStorage.setItem('accountId', mockAccountId);
        setAccountId(mockAccountId);
      }
      
      return isValid;
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
      
      // Se o email existe, autorizar o login independentemente da senha
      // Criar objeto de usuário
      const user = {
        name: 'Demo User',
        email,
        role: 'user'
      };
      
      // Usar o accountId recebido da API check_email
      const accountId = localStorage.getItem('accountId');
      
      if (!accountId) {
        console.error('No accountId found after checking email');
        return {
          success: false,
          error: 'Account ID not found. Please try again.'
        };
      }
      
      console.log('Logging in with account ID:', accountId);
      
      // Armazenar dados no localStorage
      localStorage.setItem('token', 'demo-token');
      localStorage.setItem('user', JSON.stringify(user));
      
      // Atualizar estado
      setUser(user);
      setIsAuthenticated(true);
      setAccountId(accountId);
      
      // Fetch user data from API immediately after login
      console.log('Fetching user data after login...');
      const userData = await userService.getUserData();
      
      if (userData.success && userData.userData) {
        console.log('User data fetched successfully during login:', userData.userData);
        setUserData(userData.userData);
        
        // Update user object with real data
        const updatedUser = {
          ...user,
          name: userData.userData.account_name || user.name,
          email: userData.userData.account_email || user.email
        };
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
      } else {
        console.error('Failed to fetch user data during login:', userData.error);
      }
      
      return { success: true };
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
      localStorage.removeItem('accountId');
      localStorage.removeItem('userData');
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    } finally {
      setUser(null);
      setIsAuthenticated(false);
      setAccountId(null);
      setUserData(null);
      router.push('/login');
    }
  };

  // Function to set account ID
  const setUserAccountId = (id) => {
    if (id) {
      localStorage.setItem('accountId', id);
      setAccountId(id);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated,
        accountId,
        userData,
        setAccountId: setUserAccountId,
        fetchUserData,
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
