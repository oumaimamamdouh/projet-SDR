// // // import React, { createContext, useState, useContext, useEffect } from 'react';
// // // import { authService } from '../services/authService';

// // // const AuthContext = createContext();

// // // export const useAuth = () => useContext(AuthContext);

// // // export const AuthProvider = ({ children }) => {
// // //   const [user, setUser] = useState(() => authService.getCurrentUser());
// // //   const [loading, setLoading] = useState(true);

// // //   useEffect(() => {
// // //     // Vérifier l'authentification au démarrage
// // //     const checkAuth = () => {
// // //       const currentUser = authService.getCurrentUser();
// // //       setUser(currentUser);
// // //       setLoading(false);
// // //     };

// // //     checkAuth();
// // //   }, []);

// // //   const login = async (email, password) => {
// // //     try {
// // //       const data = await authService.login(email, password);
// // //       setUser(data.user);
// // //       return { success: true, data };
// // //     } catch (error) {
// // //       return { success: false, error: error.message || 'Login failed' };
// // //     }
// // //   };

// // //   const register = async (userData) => {
// // //     try {
// // //       const data = await authService.register(userData);
// // //       setUser(data.user);
// // //       return { success: true, data };
// // //     } catch (error) {
// // //       return { success: false, error: error.message || 'Registration failed' };
// // //     }
// // //   };

// // //   const logout = async () => {
// // //     try {
// // //       await authService.logout();
// // //     } catch (error) {
// // //       console.error('Logout error:', error);
// // //     } finally {
// // //       setUser(null);
// // //       window.location.href = '/login';
// // //     }
// // //   };

// // //   const updateUser = (userData) => {
// // //     const updatedUser = { ...user, ...userData };
// // //     setUser(updatedUser);
// // //     localStorage.setItem('user', JSON.stringify(updatedUser));
// // //   };

// // //   const value = {
// // //     user,
// // //     loading,
// // //     login,
// // //     register,
// // //     logout,
// // //     updateUser,
// // //     isAuthenticated: !!user,
// // //     isFreelancer: user?.role === 'freelancer',
// // //     isClient: user?.role === 'client',
// // //     isAdmin: user?.role === 'admin',
// // //   };

// // //   return (
// // //     <AuthContext.Provider value={value}>
// // //       {!loading && children}
// // //     </AuthContext.Provider>
// // //   );
// // // };

// // import React, { createContext, useState, useContext, useEffect } from 'react';
// // import authService from '../services/authService';

// // const AuthContext = createContext({});

// // export const useAuth = () => useContext(AuthContext);

// // export const AuthProvider = ({ children }) => {
// //   const [user, setUser] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);

// //   // Vérifier l'authentification au chargement
// //   useEffect(() => {
// //     checkAuth();
// //   }, []);

// //   const checkAuth = async () => {
// //     try {
// //       const token = authService.getToken();
// //       if (token) {
// //         // Récupérer l'utilisateur depuis le localStorage d'abord
// //         const storedUser = authService.getCurrentUserFromStorage();
// //         if (storedUser) {
// //           setUser(storedUser);
// //         } else {
// //           // Sinon, récupérer depuis l'API
// //           const response = await authService.getCurrentUser();
// //           if (response.success) {
// //             setUser(response.data);
// //             localStorage.setItem('user', JSON.stringify(response.data));
// //           }
// //         }
// //       }
// //     } catch (error) {
// //       console.error('Auth check error:', error);
// //       // En cas d'erreur, nettoyer le localStorage
// //       localStorage.removeItem('token');
// //       localStorage.removeItem('refreshToken');
// //       localStorage.removeItem('user');
// //       setUser(null);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   // Inscription
// //   const register = async (userData) => {
// //     try {
// //       setError(null);
// //       const response = await authService.register(userData);
      
// //       if (response.success && response.user) {
// //         // Si le backend retourne directement l'utilisateur
// //         setUser(response.user);
// //         localStorage.setItem('user', JSON.stringify(response.user));
// //         return { success: true, data: response.user };
// //       } else if (response.user) {
// //         // Si le backend retourne { user: ... }
// //         setUser(response.user);
// //         localStorage.setItem('user', JSON.stringify(response.user));
// //         return { success: true, data: response.user };
// //       }
      
// //       return { success: true, data: response };
// //     } catch (error) {
// //       setError(error.message);
// //       return { success: false, error: error.message };
// //     }
// //   };

// //   // Connexion
// //   const login = async (credentials) => {
// //     try {
// //       setError(null);
// //       const response = await authService.login(credentials);
      
// //       if (response.success && response.user) {
// //         setUser(response.user);
// //         localStorage.setItem('user', JSON.stringify(response.user));
// //         return { success: true, data: response.user };
// //       }
      
// //       return { success: true, data: response };
// //     } catch (error) {
// //       setError(error.message);
// //       return { success: false, error: error.message };
// //     }
// //   };

// //   // Déconnexion
// //   const logout = async () => {
// //     try {
// //       await authService.logout();
// //       setUser(null);
// //       setError(null);
// //       return { success: true };
// //     } catch (error) {
// //       console.error('Logout error:', error);
// //       // Nettoyer même en cas d'erreur
// //       setUser(null);
// //       return { success: true };
// //     }
// //   };

// //   // Mettre à jour l'utilisateur
// //   const updateUser = (userData) => {
// //     setUser(userData);
// //     localStorage.setItem('user', JSON.stringify(userData));
// //   };

// //   const value = {
// //     user,
// //     loading,
// //     error,
// //     register,
// //     login,
// //     logout,
// //     updateUser,
// //     isAuthenticated: !!user,
// //     clearError: () => setError(null),
// //   };

// //   return (
// //     <AuthContext.Provider value={value}>
// //       {children}
// //     </AuthContext.Provider>
// //   );
// // };

// import { createContext, useState, useEffect, useContext } from 'react';
// import { useNavigate } from 'react-router-dom';

// const AuthContext = createContext();

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     const userData = localStorage.getItem('user');
    
//     if (token && userData) {
//       try {
//         setUser(JSON.parse(userData));
//       } catch (error) {
//         console.error('Error parsing user data:', error);
//         localStorage.removeItem('token');
//         localStorage.removeItem('user');
//       }
//     }
    
//     setLoading(false);
//   }, []);

//   const login = async (email, password) => {
//     try {
//       // Simulation d'API - remplace par ton appel réel
//       const response = await fetch('http://localhost:5000/api/users/login', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email, password }),
//       });
      
//       const data = await response.json();
      
//       if (data.success) {
//         localStorage.setItem('token', data.token);
//         localStorage.setItem('user', JSON.stringify(data.user));
//         setUser(data.user);
//         return { success: true, user: data.user };
//       } else {
//         return { success: false, error: data.error };
//       }
//     } catch (error) {
//       console.error('Login error:', error);
//       return { success: false, error: 'Erreur de connexion' };
//     }
//   };

//   const register = async (userData) => {
//     try {
//       const response = await fetch('http://localhost:5000/api/users/register', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(userData),
//       });
      
//       const data = await response.json();
      
//       if (data.success) {
//         // Si l'API retourne un token directement
//         if (data.token) {
//           localStorage.setItem('token', data.token);
//           localStorage.setItem('user', JSON.stringify(data.user || data.data?.user));
//           setUser(data.user || data.data?.user);
//         }
//         return { success: true, user: data.user || data.data?.user };
//       } else {
//         return { success: false, error: data.error };
//       }
//     } catch (error) {
//       console.error('Register error:', error);
//       return { success: false, error: 'Erreur d\'inscription' };
//     }
//   };

//   const logout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('user');
//     setUser(null);
//     navigate('/login');
//   };

//   const value = {
//     user,
//     loading,
//     login,
//     register,
//     logout,
//     isAuthenticated: !!user,
//   };

//   return (
//     <AuthContext.Provider value={value}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

import { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import { toast } from 'react-hot-toast';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = authService.getToken();
      const storedUser = authService.getUser();
      
      if (token && storedUser) {
        // Optionnel: Vérifier auprès du serveur si le token est valide
        // const userData = await authService.getCurrentUser();
        // setUser(userData);
        
        // Pour l'instant, utiliser l'utilisateur stocké
        setUser(storedUser);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      authService.logout();
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      setLoading(true);
      const result = await authService.login(email, password);
      
      if (result.success) {
        setUser(result.user);
        toast.success('Connexion réussie!');
        
        // Rediriger selon le rôle
        if (result.user.role === 'freelancer' || result.user.role === 'Freelancer') {
          navigate('/freelancer/dashboard');
        } else if (result.user.role === 'client' || result.user.role === 'Client') {
          navigate('/client/dashboard');
        } else {
          navigate('/');
        }
        
        return { success: true };
      }
    } catch (error) {
      toast.error(error.message || 'Erreur de connexion');
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      setLoading(true);
      const result = await authService.register(userData);
      
      if (result.success) {
        toast.success('Inscription réussie! Veuillez vous connecter.');
        navigate('/login');
        return { success: true };
      }
    } catch (error) {
      toast.error(error.message || 'Erreur d\'inscription');
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    toast.success('Déconnexion réussie');
    navigate('/login');
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};