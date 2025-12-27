// // // import axios from 'axios';

// // // // Ton backend tourne sur le port 5000
// // // const API_URL = 'http://localhost:5000';

// // // const axiosInstance = axios.create({
// // //   baseURL: API_URL,
// // //   headers: {
// // //     'Content-Type': 'application/json',
// // //   },
// // //   withCredentials: true, // Important pour les cookies/sessions
// // // });

// // // // Intercepteur pour ajouter le token
// // // axiosInstance.interceptors.request.use(
// // //   (config) => {
// // //     const token = localStorage.getItem('token');
// // //     if (token) {
// // //       config.headers.Authorization = `Bearer ${token}`;
// // //     }
// // //     return config;
// // //   },
// // //   (error) => Promise.reject(error)
// // // );

// // // // Intercepteur pour gérer les erreurs
// // // axiosInstance.interceptors.response.use(
// // //   (response) => response,
// // //   (error) => {
// // //     if (error.response?.status === 401) {
// // //       // Non autorisé - Rediriger vers login
// // //       localStorage.removeItem('token');
// // //       localStorage.removeItem('user');
// // //       window.location.href = '/login';
// // //     }
    
// // //     if (error.response?.status === 403) {
// // //       // Accès interdit
// // //       console.error('Access forbidden:', error.response.data);
// // //     }
    
// // //     if (error.response?.status === 404) {
// // //       // Route non trouvée
// // //       console.error('Route not found:', error.config.url);
// // //     }
    
// // //     return Promise.reject(error);
// // //   }
// // // );

// // // export default axiosInstance;

// // import axios from 'axios';
// // import { API_BASE_URL } from './endpoints';

// // const axiosInstance = axios.create({
// //   baseURL: API_BASE_URL,
// //   headers: {
// //     'Content-Type': 'application/json',
// //   },
// //   withCredentials: true, // Pour les cookies/sessions
// // });

// // // Intercepteur pour ajouter le token
// // axiosInstance.interceptors.request.use(
// //   (config) => {
// //     const token = localStorage.getItem('accessToken');
// //     if (token) {
// //       config.headers.Authorization = `Bearer ${token}`;
// //     }
// //     return config;
// //   },
// //   (error) => Promise.reject(error)
// // );

// // // Intercepteur pour rafraîchir le token
// // axiosInstance.interceptors.response.use(
// //   (response) => response,
// //   async (error) => {
// //     const originalRequest = error.config;
    
// //     if (error.response?.status === 401 && !originalRequest._retry) {
// //       originalRequest._retry = true;
      
// //       try {
// //         const refreshToken = localStorage.getItem('refreshToken');
// //         if (refreshToken) {
// //           const response = await axios.post(`${API_BASE_URL}/auth/refresh-token`, {
// //             refreshToken,
// //           });
          
// //           const { accessToken } = response.data;
// //           localStorage.setItem('accessToken', accessToken);
          
// //           originalRequest.headers.Authorization = `Bearer ${accessToken}`;
// //           return axiosInstance(originalRequest);
// //         }
// //       } catch (refreshError) {
// //         // Rediriger vers login
// //         localStorage.removeItem('accessToken');
// //         localStorage.removeItem('refreshToken');
// //         window.location.href = '/login';
// //         return Promise.reject(refreshError);
// //       }
// //     }
    
// //     return Promise.reject(error);
// //   }
// // );

// // export default axiosInstance;

// import axios from 'axios';

// const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// // Créer une instance axios
// const axiosInstance = axios.create({
//   baseURL: API_URL,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// // Interceptor pour ajouter le token
// axiosInstance.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// // Interceptor pour gérer les réponses
// axiosInstance.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     // Si erreur 401 (non autorisé) et pas déjà en train de rafraîchir
//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;

//       try {
//         const refreshToken = localStorage.getItem('refreshToken');
//         if (refreshToken) {
//           const response = await axios.post(`${API_URL}/auth/refresh-token`, {
//             refreshToken,
//           });
          
//           const { token: newToken } = response.data;
//           localStorage.setItem('token', newToken);
          
//           // Retenter la requête originale
//           originalRequest.headers.Authorization = `Bearer ${newToken}`;
//           return axiosInstance(originalRequest);
//         }
//       } catch (refreshError) {
//         // Si le refresh échoue, déconnecter l'utilisateur
//         localStorage.removeItem('token');
//         localStorage.removeItem('refreshToken');
//         localStorage.removeItem('user');
//         window.location.href = '/login';
//       }
//     }

//     return Promise.reject(error);
//   }
// );

// export default axiosInstance;

import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds timeout
});

// Interceptor pour ajouter le token automatiquement
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor pour gérer les erreurs
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Server responded with error
      switch (error.response.status) {
        case 401:
          // Unauthorized - clear token and redirect
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          window.location.href = '/login';
          break;
        case 403:
          // Forbidden
          console.error('Forbidden access');
          break;
        case 404:
          // Not found
          console.error('API endpoint not found');
          break;
        case 500:
          // Server error
          console.error('Server error');
          break;
        default:
          console.error('API error:', error.response.status);
      }
    } else if (error.request) {
      // Request made but no response
      console.error('No response received:', error.request);
    } else {
      // Something else
      console.error('Request error:', error.message);
    }
    
    return Promise.reject(error);
  }
);

export default axiosInstance;