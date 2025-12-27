import React, { createContext, useState, useContext, useEffect } from 'react';
import { mockUsers } from '../mockData';

const MockAuthContext = createContext(null);

export const useMockAuth = () => {
  const context = useContext(MockAuthContext);
  if (!context) {
    throw new Error('useMockAuth must be used within MockAuthProvider');
  }
  return context;
};

export const MockAuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simuler la vérification de la session
    const timer = setTimeout(() => {
      const savedUser = localStorage.getItem('mockUser');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
      setLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    // Simuler un appel API
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Trouver l'utilisateur dans les données mockées
    const foundUser = Object.values(mockUsers).find(u => u.email === email);
    
    if (foundUser && password === "password123") {
      setUser(foundUser);
      localStorage.setItem('mockUser', JSON.stringify(foundUser));
      setLoading(false);
      return { success: true };
    } else {
      setLoading(false);
      return { success: false, error: "Email ou mot de passe incorrect" };
    }
  };

  const register = async (userData) => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newUser = {
      ...userData,
      _id: "user-" + Date.now(),
      role: userData.role || "client",
      is_verified: false,
      is_active: true,
      created_at: new Date().toISOString(),
      rating: 0,
      total_reviews: 0,
      completed_orders: 0
    };
    
    setUser(newUser);
    localStorage.setItem('mockUser', JSON.stringify(newUser));
    setLoading(false);
    return { success: true, user: newUser };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('mockUser');
  };

  const updateProfile = (updatedData) => {
    const updatedUser = { ...user, ...updatedData };
    setUser(updatedUser);
    localStorage.setItem('mockUser', JSON.stringify(updatedUser));
    return { success: true, user: updatedUser };
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    updateProfile,
    isAuthenticated: !!user,
    isFreelancer: user?.role === "freelancer",
    isClient: user?.role === "client"
  };

  return (
    <MockAuthContext.Provider value={value}>
      {children}
    </MockAuthContext.Provider>
  );
};