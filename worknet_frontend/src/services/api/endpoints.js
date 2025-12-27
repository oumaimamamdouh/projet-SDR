// export const API_BASE_URL = 'http://localhost:5000/api';

// export const API_ENDPOINTS = {
//   // Auth
//   AUTH: {
//     LOGIN: `${API_BASE_URL}/auth/login`,
//     REGISTER: `${API_BASE_URL}/auth/register`,
//     LOGOUT: `${API_BASE_URL}/auth/logout`,
//     VERIFY_EMAIL: `${API_BASE_URL}/auth/verify-email`,
//     FORGOT_PASSWORD: `${API_BASE_URL}/auth/forgot-password`,
//     RESET_PASSWORD: `${API_BASE_URL}/auth/reset-password`,
//     REFRESH_TOKEN: `${API_BASE_URL}/auth/refresh-token`,
//   },

//   // Gigs
//   GIGS: {
//     GET_ALL: `${API_BASE_URL}/gigs`,
//     GET_FEATURED: `${API_BASE_URL}/gigs/featured`,
//     SEARCH: `${API_BASE_URL}/gigs/search`,
//     GET_BY_ID: (id) => `${API_BASE_URL}/gigs/${id}`,
//     GET_BY_SLUG: (slug) => `${API_BASE_URL}/gigs/slug/${slug}`,
//     CREATE: `${API_BASE_URL}/gigs`,
//     UPDATE: (id) => `${API_BASE_URL}/gigs/${id}`,
//     DELETE: (id) => `${API_BASE_URL}/gigs/${id}`,
//     MY_GIGS: `${API_BASE_URL}/gigs/my-gigs/all`,
//   },

//   // Categories
//   CATEGORIES: {
//     GET_ALL: `${API_BASE_URL}/categories`,
//     GET_SUBCATEGORIES: (id) => `${API_BASE_URL}/categories/${id}/subcategories`,
//     GET_BY_ID: (id) => `${API_BASE_URL}/categories/${id}`,
//     GET_BY_SLUG: (slug) => `${API_BASE_URL}/categories/slug/${slug}`,
//     SEARCH: `${API_BASE_URL}/categories/search`,
//   },

//   // Users
//   USERS: {
//     PROFILE: `${API_BASE_URL}/users/profile`,
//     UPDATE: `${API_BASE_URL}/users/update`,
//     CHANGE_PASSWORD: `${API_BASE_URL}/users/change-password`,
//     UPLOAD_AVATAR: `${API_BASE_URL}/users/upload-avatar`,
//     GET_BY_ID: (id) => `${API_BASE_URL}/users/${id}`,
//   },

//   // Orders
//   ORDERS: {
//     GET_ALL: `${API_BASE_URL}/orders`,
//     CREATE: `${API_BASE_URL}/orders`,
//     GET_BY_ID: (id) => `${API_BASE_URL}/orders/${id}`,
//     UPDATE: (id) => `${API_BASE_URL}/orders/${id}`,
//     MY_ORDERS: `${API_BASE_URL}/orders/my-orders`,
//     MY_SELLER_ORDERS: `${API_BASE_URL}/orders/my-seller-orders`,
//   },

//   // Reviews
//   REVIEWS: {
//     GET_ALL: `${API_BASE_URL}/reviews`,
//     CREATE: `${API_BASE_URL}/reviews`,
//     GET_BY_GIG: (gigId) => `${API_BASE_URL}/reviews/gig/${gigId}`,
//     GET_BY_USER: (userId) => `${API_BASE_URL}/reviews/user/${userId}`,
//   },
// };

// // Alias pour compatibilité
// export const ENDPOINTS = API_ENDPOINTS;

// Endpoints API - EXPORTER "ENDPOINTS" (au pluriel)
export const ENDPOINTS = {
  // Auth
  REGISTER: '/auth/register',
  LOGIN: '/auth/login',
  LOGOUT: '/auth/logout',
  GET_ME: '/auth/me',
  FORGOT_PASSWORD: '/auth/forgot-password',
  RESET_PASSWORD: '/auth/reset-password',
  REFRESH_TOKEN: '/auth/refresh-token',
  
  // Users
  GET_USER: (id) => `/users/${id}`,
  UPDATE_USER: (id) => `/users/${id}`,
  UPLOAD_AVATAR: '/users/me/avatar',
  
  // Gigs
  GIGS: '/gigs',
  GIG_DETAIL: (id) => `/gigs/${id}`,
  MY_GIGS: '/gigs/my-gigs',
  CREATE_GIG: '/gigs',
  UPDATE_GIG: (id) => `/gigs/${id}`,
  DELETE_GIG: (id) => `/gigs/${id}`,
  
  // Orders
  ORDERS: '/orders',
  ORDER_DETAIL: (id) => `/orders/${id}`,
  MY_ORDERS: '/orders/my-orders',
  CREATE_ORDER: '/orders',
  UPDATE_ORDER: (id) => `/orders/${id}`,
  
  // Categories
  CATEGORIES: '/categories',
  
  // Messages
  MESSAGES: '/messages',
  CONVERSATIONS: '/messages/conversations',
  
  // Notifications
  NOTIFICATIONS: '/notifications',
  MARK_READ: (id) => `/notifications/${id}/read`,
  
  // Reviews
  REVIEWS: '/reviews',
  CREATE_REVIEW: '/reviews',
};

// Tu peux aussi exporter sous un autre nom si besoin
export const API_ENDPOINTS = ENDPOINTS; // Alias