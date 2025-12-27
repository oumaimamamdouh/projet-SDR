// import axiosInstance from './api/axiosConfig';
// import { API_ENDPOINTS } from './api/endpoints';

// export const categoryService = {
//   // Get all categories
//   getAllCategories: async () => {
//     try {
//       const response = await axiosInstance.get(API_ENDPOINTS.CATEGORIES.BASE);
//       return response.data;
//     } catch (error) {
//       throw error.response?.data || error;
//     }
//   },
  
//   // Get active categories
//   getActiveCategories: async () => {
//     try {
//       const response = await axiosInstance.get(API_ENDPOINTS.CATEGORIES.ACTIVE);
//       return response.data;
//     } catch (error) {
//       throw error.response?.data || error;
//     }
//   },
  
//   // Get category by ID
//   getCategoryById: async (categoryId) => {
//     try {
//       const response = await axiosInstance.get(API_ENDPOINTS.CATEGORIES.BY_ID(categoryId));
//       return response.data;
//     } catch (error) {
//       throw error.response?.data || error;
//     }
//   },
  
//   // Get category by slug
//   getCategoryBySlug: async (slug) => {
//     try {
//       const response = await axiosInstance.get(`${API_ENDPOINTS.CATEGORIES.BASE}/slug/${slug}`);
//       return response.data;
//     } catch (error) {
//       throw error.response?.data || error;
//     }
//   },
// };
import axiosInstance from './api/axiosConfig';

const categoryService = {
  // Récupérer toutes les catégories
  async getAllCategories() {
    try {
      const response = await axiosInstance.get('/categories');
      
      if (response.data.success) {
        return {
          success: true,
          categories: response.data.data,
          total: response.data.total
        };
      }
      throw new Error(response.data.error || 'Failed to fetch categories');
    } catch (error) {
      console.error('Get categories error:', error);
      return {
        success: false,
        error: error.response?.data?.error || error.message,
        categories: []
      };
    }
  },

  // Récupérer l'arbre des catégories
  async getCategoryTree() {
    try {
      const response = await axiosInstance.get('/categories/tree');
      
      if (response.data.success) {
        return {
          success: true,
          categories: response.data.data,
          total: response.data.total
        };
      }
      throw new Error(response.data.error || 'Failed to fetch category tree');
    } catch (error) {
      console.error('Get category tree error:', error);
      return {
        success: false,
        error: error.response?.data?.error || error.message,
        categories: []
      };
    }
  },

  // Récupérer une catégorie par ID
  async getCategoryById(id) {
    try {
      const response = await axiosInstance.get(`/categories/${id}`);
      
      if (response.data.success) {
        return {
          success: true,
          category: response.data.data
        };
      }
      throw new Error(response.data.error || 'Category not found');
    } catch (error) {
      console.error('Get category error:', error);
      return {
        success: false,
        error: error.response?.data?.error || error.message
      };
    }
  },

  // Rechercher des catégories
  async searchCategories(query) {
    try {
      const response = await axiosInstance.get(`/categories/search?query=${query}`);
      
      if (response.data.success) {
        return {
          success: true,
          categories: response.data.data,
          total: response.data.total
        };
      }
      throw new Error(response.data.error || 'Search failed');
    } catch (error) {
      console.error('Search categories error:', error);
      return {
        success: false,
        error: error.response?.data?.error || error.message,
        categories: []
      };
    }
  }
};

export default categoryService;