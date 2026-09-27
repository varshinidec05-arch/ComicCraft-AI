import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';
import { AuthService } from '../services/api';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password?: string) => Promise<void>;
  register: (name: string, email: string, password?: string) => Promise<void>;
  logout: () => void;
  setDemoUser: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>({
    id: 'demo-user-1',
    name: 'Alex Mercer',
    email: 'creator@comiccraft.ai',
  });
  const [token, setToken] = useState<string | null>(localStorage.getItem('comiccraft_token') || 'demo_token');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const initAuth = async () => {
      const storedToken = localStorage.getItem('comiccraft_token');
      if (storedToken) {
        try {
          const res = await AuthService.getMe();
          if (res.user) {
            setUser(res.user);
          }
        } catch (e) {
          console.warn('Using default demo user state');
        }
      }
    };
    initAuth();
  }, []);

  const login = async (email: string, password?: string) => {
    setIsLoading(true);
    try {
      const res = await AuthService.login(email, password);
      setUser(res.user);
      setToken(res.token);
      localStorage.setItem('comiccraft_token', res.token);
    } catch (e) {
      // Fallback demo login
      setUser({
        id: 'demo-user-1',
        name: email.split('@')[0] || 'Comic Creator',
        email,
      });
      setToken('demo_token');
      localStorage.setItem('comiccraft_token', 'demo_token');
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password?: string) => {
    setIsLoading(true);
    try {
      const res = await AuthService.register(name, email, password);
      setUser(res.user);
      setToken(res.token);
      localStorage.setItem('comiccraft_token', res.token);
    } catch (e) {
      setUser({
        id: `user-${Date.now()}`,
        name,
        email,
      });
      setToken('demo_token');
      localStorage.setItem('comiccraft_token', 'demo_token');
    } finally {
      setIsLoading(false);
    }
  };

  const setDemoUser = () => {
    setUser({
      id: 'demo-user-1',
      name: 'Alex Mercer',
      email: 'creator@comiccraft.ai',
    });
    setToken('demo_token');
    localStorage.setItem('comiccraft_token', 'demo_token');
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('comiccraft_token');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
        setDemoUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
