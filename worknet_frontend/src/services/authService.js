
// import axiosInstance from './api/axiosConfig';
// import { ENDPOINTS } from './api/endpoints'; // Importer ENDPOINTS

// class AuthService {
//   // Inscription
//   async register(userData) {
//     try {
//       console.log('📝 Sending registration data:', userData);
      
//       const response = await axiosInstance.post(ENDPOINTS.REGISTER, userData); // Utiliser ENDPOINTS
//       console.log('✅ Registration successful:', response.data);
      
//       return response.data;
//     } catch (error) {
//       console.error('❌ Registration error:', {
//         message: error.message,
//         response: error.response?.data,
//         status: error.response?.status
//       });
//       throw this.handleError(error);
//     }
//   }

//   // Connexion
//   async login(credentials) {
//     try {
//       console.log('🔐 Sending login request:', { email: credentials.email });
      
//       const response = await axiosInstance.post(ENDPOINTS.LOGIN, credentials); // Utiliser ENDPOINTS
//       console.log('✅ Login successful:', response.data);
      
//       if (response.data.token) {
//         localStorage.setItem('token', response.data.token);
//         localStorage.setItem('refreshToken', response.data.refreshToken || '');
        
//         if (response.data.user) {
//           localStorage.setItem('user', JSON.stringify(response.data.user));
//         }
//       }
      
//       return response.data;
//     } catch (error) {
//       console.error('❌ Login error:', {
//         message: error.message,
//         response: error.response?.data,
//         status: error.response?.status
//       });
//       throw this.handleError(error);
//     }
//   }

//   // Déconnexion
//   async logout() {
//     try {
//       const response = await axiosInstance.post(ENDPOINTS.LOGOUT); // Utiliser ENDPOINTS
      
//       // Nettoyer le localStorage
//       localStorage.removeItem('token');
//       localStorage.removeItem('refreshToken');
//       localStorage.removeItem('user');
      
//       return response.data;
//     } catch (error) {
//       console.error('❌ Logout error:', error);
//       // Même en cas d'erreur, nettoyer localement
//       localStorage.removeItem('token');
//       localStorage.removeItem('refreshToken');
//       localStorage.removeItem('user');
//       throw this.handleError(error);
//     }
//   }

//   // Récupérer l'utilisateur courant
//   async getCurrentUser() {
//     try {
//       const response = await axiosInstance.get(ENDPOINTS.GET_ME); // Utiliser ENDPOINTS
//       return response.data;
//     } catch (error) {
//       console.error('❌ Get current user error:', error);
//       throw this.handleError(error);
//     }
//   }

//   // Mot de passe oublié
//   async forgotPassword(email) {
//     try {
//       const response = await axiosInstance.post(ENDPOINTS.FORGOT_PASSWORD, { email }); // Utiliser ENDPOINTS
//       return response.data;
//     } catch (error) {
//       console.error('❌ Forgot password error:', error);
//       throw this.handleError(error);
//     }
//   }

//   // Réinitialiser le mot de passe
//   async resetPassword(token, password) {
//     try {
//       const response = await axiosInstance.post(
//         `${ENDPOINTS.RESET_PASSWORD}/${token}`, // Utiliser ENDPOINTS
//         { password }
//       );
//       return response.data;
//     } catch (error) {
//       console.error('❌ Reset password error:', error);
//       throw this.handleError(error);
//     }
//   }

//   // Rafraîchir le token
//   async refreshToken(refreshToken) {
//     try {
//       const response = await axiosInstance.post(ENDPOINTS.REFRESH_TOKEN, { refreshToken }); // Utiliser ENDPOINTS
      
//       if (response.data.token) {
//         localStorage.setItem('token', response.data.token);
//       }
      
//       return response.data;
//     } catch (error) {
//       console.error('❌ Refresh token error:', error);
//       throw this.handleError(error);
//     }
//   }
//   // Vérifier si l'utilisateur est connecté
//   isAuthenticated() {
//     return !!localStorage.getItem('token');
//   }

//   // Récupérer l'utilisateur depuis localStorage
//   getCurrentUserFromStorage() {
//     const userStr = localStorage.getItem('user');
//     return userStr ? JSON.parse(userStr) : null;
//   }

//   // Récupérer le token
//   getToken() {
//     return localStorage.getItem('token');
//   }

//   // Gestion des erreurs
//   handleError(error) {
//     if (error.response) {
//       // Le serveur a répondu avec un statut d'erreur
//       const message = error.response.data?.message || error.response.data?.error || 'Une erreur est survenue';
//       return new Error(message);
//     } else if (error.request) {
//       // La requête a été faite mais aucune réponse n'a été reçue
//       return new Error('Impossible de contacter le serveur. Veuillez vérifier votre connexion internet.');
//     } else {
//       // Une erreur s'est produite lors de la configuration de la requête
//       return new Error('Une erreur est survenue. Veuillez réessayer.');
//     }
//   }
// }

// export default new AuthService();
import axios from './api/axiosConfig';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

class AuthService {
  // Login user
  async login(email, password) {
    try {
      console.log('🔐 Login attempt to:', `${API_URL}/users/login`);
      
      const response = await axios.post(`${API_URL}/users/login`, {
        email,
        password
      });

      console.log('📥 Login response:', response.data);

      if (response.data.success) {
        const { token, user } = response.data;
        
        // Stocker le token
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        
        return { success: true, user, token };
      } else {
        throw new Error(response.data.error || 'Login failed');
      }
    } catch (error) {
      console.error('❌ Login error:', error.response?.data || error.message);
      
      let errorMessage = 'Erreur de connexion';
      if (error.response?.data?.error) {
        errorMessage = error.response.data.error;
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      throw new Error(errorMessage);
    }
  }

  // Register user
  async register(userData) {
    try {
      console.log('📝 Register attempt to:', `${API_URL}/users/register`);
      console.log('📤 Data being sent:', userData);

      const response = await axios.post(`${API_URL}/users/register`, userData);

      console.log('📥 Register response:', response.data);

      if (response.data.success) {
        let user;
        
        // Ton backend retourne soit response.data.data.user soit response.data.user
        if (response.data.data?.user) {
          user = response.data.data.user;
        } else if (response.data.user) {
          user = response.data.user;
        } else {
          user = response.data.data;
        }
        
        return { success: true, user };
      } else {
        throw new Error(response.data.error || 'Registration failed');
      }
    } catch (error) {
      console.error('❌ Register error:', error.response?.data || error.message);
      
      let errorMessage = 'Erreur d\'inscription';
      if (error.response?.data?.error) {
        errorMessage = error.response.data.error;
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      throw new Error(errorMessage);
    }
  }

  // Get current user
  async getCurrentUser() {
    try {
      const response = await axios.get(`${API_URL}/users/me`);
      
      if (response.data.success) {
        return response.data.data || response.data.user;
      }
      throw new Error('Failed to get user');
    } catch (error) {
      console.error('❌ Get current user error:', error);
      throw error;
    }
  }

  // Logout
  async logout() {
    try {
      await axios.post(`${API_URL}/users/logout`);
    } catch (error) {
      console.error('❌ Logout error:', error);
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  }

  // Check if user is authenticated
  isAuthenticated() {
    return !!localStorage.getItem('token');
  }

  // Get token
  getToken() {
    return localStorage.getItem('token');
  }

  // Get user from localStorage
  getUser() {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        return JSON.parse(userStr);
      } catch (e) {
        return null;
      }
    }
    return null;
  }
}

export default new AuthService();